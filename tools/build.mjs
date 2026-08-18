import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const POSTS_DIR = path.join(ROOT, 'posts');
const OUT_JS = path.join(ROOT, 'js', 'posts.js');
const REPORT = path.join(ROOT, '_build_report.txt');
const SITE_SUFFIX = "RaM's Blog";

const CJK_RE = /[\u4e00-\u9fff]/g;
const WORD_RE = /[A-Za-z0-9]+/g;
const TAG_RE = /<[^>]+>/g;
const WS_RE = /\s+/g;

function stripHtml(value) {
    return String(value || '')
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(TAG_RE, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(WS_RE, ' ')
        .trim();
}

function extract(content, pattern) {
    const match = pattern.exec(content);
    return match ? match[1].trim() : '';
}

function countMatches(value, pattern) {
    return (String(value || '').match(pattern) || []).length;
}

function computeReadMinutes(text) {
    const cjk = countMatches(text, CJK_RE);
    const latin = countMatches(text, WORD_RE);
    return Math.max(1, Math.ceil(cjk / 350 + latin / 220));
}

function excerptOf(content) {
    const firstParagraph = extract(content, /<p[^>]*>([\s\S]*?)<\/p>/i);
    if (!firstParagraph) return '';
    const text = stripHtml(firstParagraph);
    return text.length > 120 ? `${text.slice(0, 120).trimEnd()}…` : text;
}

function listHtmlFiles(dir) {
    return fs.readdirSync(dir)
        .filter((name) => name.endsWith('.html'))
        .sort()
        .map((name) => path.join(dir, name));
}

function extractPost(file) {
    const content = fs.readFileSync(file, 'utf8');
    const id = path.basename(file, '.html');
    const isPost = content.includes('post-meta') && content.includes('post-content');

    if (!isPost) {
        const title = extract(content, /<title>([\s\S]*?)<\/title>/i);
        return {
            post: {
                id,
                title: stripHtml(title) || id,
                date: '',
                tag: '',
                tags: [],
                excerpt: '',
                words: 0,
                readMinutes: 0,
                headings: 0,
                type: 'page',
                duplicateOf: null,
                path: file
            },
            warnings: []
        };
    }

    const h1 = stripHtml(extract(content, /<h1[^>]*>([\s\S]*?)<\/h1>/i));
    let titleTag = stripHtml(extract(content, /<title>([\s\S]*?)<\/title>/i));
    titleTag = titleTag.replace(new RegExp(`\\s*·\\s*${SITE_SUFFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`), '');
    const title = h1 || titleTag || id;
    const date = extract(content, /(\d{4}-\d{2}-\d{2})/);
    const staticMinutes = extract(content, /(\d+)\s*分钟阅读/);
    const tag = stripHtml(extract(content, /post-tag[^>]*>\s*#?\s*([^<]+)<\/span>/i)).replace(/^#\s*/, '').trim();
    const footer = extract(content, /<div class="post-footer"[^>]*>([\s\S]*?)<\/div>/i);
    const hashtags = Array.from(footer.matchAll(/#([\w\u4e00-\u9fff.\-]+)/g), (match) => match[1]);
    const tags = tag ? [tag] : [];
    hashtags.forEach((item) => {
        if (item && !tags.includes(item)) tags.push(item);
    });

    const postContent = extract(content, /<div class="post-content">([\s\S]*?)<\/div>\s*<div class="post-footer"/i)
        || extract(content, /<div class="post-content">([\s\S]*?)<\/div>/i);
    const text = stripHtml(postContent);
    const words = countMatches(text, CJK_RE) + countMatches(text, WORD_RE);
    const readMinutes = computeReadMinutes(text);
    const headings = countMatches(postContent, /<h[23][^>]*>/gi);
    const warnings = [];
    const type = date ? 'post' : 'page';

    if (!date) warnings.push(`[${id}] 缺少日期 -> 已排除出文章统计（type=page）`);
    if (staticMinutes && Number(staticMinutes) !== readMinutes) {
        warnings.push(`[${id}] 静态阅读时长 ${staticMinutes} 分钟 != 实测 ${readMinutes} 分钟（以实测为准）`);
    }
    if (h1 && titleTag && h1 !== titleTag) {
        warnings.push(`[${id}] <title> 与 <h1> 不一致: 「${titleTag}」vs「${h1}」（以 h1 为准）`);
    }

    return {
        post: {
            id,
            title,
            date,
            tag,
            tags,
            excerpt: excerptOf(postContent),
            words,
            readMinutes,
            headings,
            type,
            duplicateOf: null,
            path: file
        },
        warnings
    };
}

function markDuplicates(posts, warnings) {
    const groups = new Map();
    posts.forEach((post) => {
        if (post.type !== 'post' || !post.date) return;
        const key = `${post.date}\n${post.title}`;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(post);
    });

    groups.forEach((group) => {
        if (group.length < 2) return;
        group.sort((a, b) => b.words - a.words);
        const canonical = group[0];
        group.slice(1).forEach((duplicate) => {
            duplicate.duplicateOf = canonical.id;
            warnings.push(`[${duplicate.id}] 与 ${canonical.id} 重复（同日同标题）-> 已标记 duplicateOf，列表/统计自动排除`);
        });
    });
}

function serializePosts(posts) {
    const rows = posts.map((post) => ({
        id: post.id,
        title: post.title,
        date: post.date,
        tag: post.tag,
        tags: post.tags,
        excerpt: post.excerpt,
        words: post.words,
        readMinutes: post.readMinutes,
        headings: post.headings,
        type: post.type,
        duplicateOf: post.duplicateOf
    }));

    const body = rows.map((post) => `  ${JSON.stringify(post)}`).join(',\n');
    return [
        '/* ============================================================',
        ' * js/posts.js — AUTO-GENERATED by tools/build.mjs',
        ' * 请勿手改！新增/修改文章后运行: npm run build',
        ' * 所有页面统计（文章数/标签/字数/阅读时长）以此文件为准',
        ' * ============================================================ */',
        'window.POSTS = [',
        body,
        '];',
        ''
    ].join('\n');
}

function writeReport(files, posts, warnings) {
    const articles = posts.filter((post) => post.type === 'post' && !post.duplicateOf);
    const tagCounter = new Map();
    articles.forEach((post) => {
        post.tags.filter(Boolean).forEach((tag) => {
            tagCounter.set(tag, (tagCounter.get(tag) || 0) + 1);
        });
    });
    const sortedTags = Object.fromEntries(Array.from(tagCounter.entries()).sort((a, b) => b[1] - a[1]));
    const lines = [
        `扫描: ${files.length} 个文件 | 文章: ${articles.length} | 演示页: ${posts.filter((p) => p.type === 'page').length} | 重复: ${posts.filter((p) => p.duplicateOf).length}`,
        `总字数: ${articles.reduce((sum, post) => sum + post.words, 0)} | 总阅读时长: ${articles.reduce((sum, post) => sum + post.readMinutes, 0)} 分钟`,
        `标签数: ${tagCounter.size} -> ${JSON.stringify(sortedTags)}`,
        ''
    ];

    posts.forEach((post) => {
        const flags = [];
        if (post.type !== 'post') flags.push('PAGE');
        if (post.duplicateOf) flags.push(`DUP->${post.duplicateOf}`);
        lines.push(`${post.id.padEnd(8)} ${(post.date || '--------').padEnd(10)} ${String(post.words).padStart(6)}字 ${String(post.readMinutes).padStart(3)}min  ${flags.join(' ').padEnd(20)} ${post.title.slice(0, 40)}`);
    });

    if (warnings.length) {
        lines.push('', '== WARNINGS ==', ...warnings);
    }
    fs.writeFileSync(REPORT, `${lines.join('\n')}\n`, 'utf8');
    return lines;
}

const files = listHtmlFiles(POSTS_DIR);
const warnings = [];
const posts = files.map((file) => {
    const result = extractPost(file);
    warnings.push(...result.warnings);
    return result.post;
});

markDuplicates(posts, warnings);
posts.sort((a, b) => `${b.date || '0000'}${b.id}`.localeCompare(`${a.date || '0000'}${a.id}`));

fs.writeFileSync(OUT_JS, serializePosts(posts), 'utf8');
const reportLines = writeReport(files, posts, warnings);
console.log(reportLines.join('\n'));
console.log(`\n[OK] 已生成 ${OUT_JS}`);
