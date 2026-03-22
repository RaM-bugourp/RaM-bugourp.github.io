// 文章列表数据（用于统计和归档）
const articleList = [
    { id: "post1", title: "Django Vue AdminX 框架开发实战", date: "2026-03-22" },
    { id: "post2", title: "从零搭建极简校园社区网站", date: "2026-03-20" },
    { id: "post3", title: "AI辅助开发：我的工作流实践", date: "2026-03-18" }
];

// 友情链接数量
const FRIENDS_COUNT = 1;

// 更新统计（如果页面中有这些元素）
function updateStats() {
    const postCountEl = document.getElementById('postCount');
    if (postCountEl) postCountEl.innerText = articleList.length;
    const friendCountEl = document.getElementById('friendCount');
    if (friendCountEl) friendCountEl.innerText = FRIENDS_COUNT;
}

// 页面加载时更新统计
document.addEventListener('DOMContentLoaded', updateStats);