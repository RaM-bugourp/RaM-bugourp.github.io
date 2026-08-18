import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
let ok = true;

function check(condition, message) {
    const mark = condition ? 'PASS' : 'FAIL';
    if (!condition) ok = false;
    console.log(`[${mark}] ${message}`);
}

function read(relativePath) {
    return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function listPostPages() {
    return fs.readdirSync(path.join(ROOT, 'posts'))
        .filter((name) => /^post.*\.html$/.test(name))
        .sort()
        .map((name) => `posts/${name}`);
}

const rootPages = ['index.html', 'archive.html', 'friends.html', 'about.html'];
const pages = [...rootPages, ...listPostPages()];

pages.forEach((page) => {
    const content = read(page);
    check(content.includes('posts.js'), `${page} 引入 posts.js`);
    check(content.includes('site.js'), `${page} 引入 site.js`);
});

listPostPages().forEach((page) => {
    const content = read(page);
    check(content.includes('stats-card'), `${page} 含统计卡`);
    check(content.includes('id="postMeta"'), `${page} 含 postMeta`);
});

rootPages.forEach((page) => {
    const content = read(page);
    check(content.includes('class="nav-toggle"'), `${page} 含移动端导航按钮`);
});

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name !== '.git') walk(full);
            return;
        }
        if (!entry.name.endsWith('.html')) return;
        const content = fs.readFileSync(full, 'utf8');
        check(!content.includes('main.js'), `${path.relative(ROOT, full)} 无 main.js 旧引用`);
        check(!content.includes('LeJennnn'), `${path.relative(ROOT, full)} 无旧 GitHub 账号`);
    });
}
walk(ROOT);

['js/site.js', 'js/posts.js', 'js/data/friends.js', 'js/toc.js', 'tools/build.mjs', 'tools/smoke.mjs', 'tools/serve.mjs'].forEach((file) => {
    try {
        execFileSync('node', ['--check', path.join(ROOT, file)], { stdio: 'pipe' });
        check(true, `${file} 语法 OK`);
    } catch (error) {
        check(false, `${file} 语法错误 -> ${String(error.stderr || error.message).slice(0, 300)}`);
    }
});

const context = { window: {}, console };
vm.createContext(context);
vm.runInContext(read('js/posts.js'), context, { filename: 'js/posts.js' });
vm.runInContext(read('js/data/friends.js'), context, { filename: 'js/data/friends.js' });

const posts = context.window.POSTS.filter((post) => post.type === 'post' && !post.duplicateOf);
const tags = new Set(posts.flatMap((post) => [post.tag, ...(post.tags || [])].filter(Boolean)));
const words = posts.reduce((sum, post) => sum + (post.words || 0), 0);
const minutes = posts.reduce((sum, post) => sum + (post.readMinutes || 0), 0);

check(posts.length > 0, `posts.js 数据加载 OK，文章 ${posts.length} 篇`);
check(tags.size > 0, `标签统计 OK，标签 ${tags.size} 个`);
check(words > 0 && minutes > 0, `阅读统计 OK，${words} 字 / ${minutes} 分钟`);
check(context.window.FRIENDS.length >= 0, `友链数据加载 OK，友链 ${context.window.FRIENDS.length} 个`);

console.log();
console.log(`总体: ${ok ? '全部通过' : '存在失败项'}`);
process.exit(ok ? 0 : 1);
