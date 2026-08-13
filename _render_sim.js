// 模拟浏览器渲染逻辑，验证 site.js 统计输出
const fs = require('fs');
global.window = {};
eval(fs.readFileSync('js/posts.js', 'utf8'));

const posts = window.POSTS.filter(p => p.type === 'post' && !p.duplicateOf)
    .sort((a, b) => a.date < b.date ? 1 : -1);

function esc(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

console.log('=== 首页将渲染的文章卡片（按日期倒序） ===');
posts.forEach(p => {
    console.log(`  ${p.date} | ${p.title} | ${p.readMinutes}min | ${p.words}字 | #${p.tag}`);
});

console.log('\n=== 统计卡将显示 ===');
const tags = new Set(posts.flatMap(p => [p.tag, ...(p.tags || [])]));
console.log('  文章总数:', posts.length);
console.log('  标签数量:', tags.size);
console.log('  累计阅读:', posts.reduce((s, p) => s + p.readMinutes, 0) + ' 分钟');
console.log('  总字数:', posts.reduce((s, p) => s + p.words, 0).toLocaleString('zh-CN'));
console.log('  友链:', window.FRIENDS ? window.FRIENDS.length : 0);
console.log('  最新更新:', posts[0].date);

// 归档分组验证
console.log('\n=== 归档分组 ===');
const grouped = {};
posts.forEach(p => {
    const y = p.date.slice(0, 4), m = p.date.slice(5, 7);
    (grouped[y] = grouped[y] || {})[m] = (grouped[y][m] || 0) + 1;
});
Object.keys(grouped).sort().reverse().forEach(y => {
    Object.keys(grouped[y]).sort().reverse().forEach(m => {
        console.log(`  ${y}年${parseInt(m, 10)}月: ${grouped[y][m]} 篇`);
    });
});
