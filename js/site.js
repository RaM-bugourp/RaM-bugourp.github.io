/* ============================================================
 * js/site.js — ram-blog 统一前端引擎（单一真相源）
 *
 * 数据：window.POSTS 由 tools/build_posts.py 自动生成
 *       （扫描 posts/*.html 提取 h1/日期/标签/字数/阅读时长）
 * 职责：
 *   1. 首页文章列表动态渲染（含真实阅读时长/字数）
 *   2. 归档页按年/月分组动态渲染
 *   3. 侧边栏「站点统计」动态计算：文章数/标签数/字数/阅读时长
 *   4. 热门标签云（按标签使用频率 Top-N，字号按热度缩放）
 *   5. 友链统计（由 data/friends.json 驱动，全站共用）
 *   6. 站点访问量（localStorage 会话计数，仅统计，不影响数据）
 *   7. 页脚统一注入（版权年份 + 动态数据）
 *
 * 用法：页面中引入 <script src="js/posts.js"></script> 后引入本文件。
 * ============================================================ */
(function () {
    'use strict';

    var POSTS = (typeof window.POSTS !== 'undefined' && Array.isArray(window.POSTS)) ? window.POSTS : [];

    /* ---------------- 工具 ---------------- */

    function $(sel, root) { return (root || document).querySelector(sel); }

    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    /* 有效文章 = 正式文章 + 非重复（演示页/重复文章不进入任何统计） */
    function articles() {
        return POSTS.filter(function (p) {
            return p.type === 'post' && !p.duplicateOf && p.date;
        }).sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    }

    function uniqueTags() {
        var seen = {};
        articles().forEach(function (p) {
            (p.tags || []).forEach(function (t) { if (t) seen[t] = true; });
            if (p.tag && !seen[p.tag]) seen[p.tag] = true;
        });
        return Object.keys(seen);
    }

    function totalWords() {
        return articles().reduce(function (s, p) { return s + (p.words || 0); }, 0);
    }

    function totalMinutes() {
        return articles().reduce(function (s, p) { return s + (p.readMinutes || 0); }, 0);
    }

    /* 年份（含月份的日期间隔） */
    function activeYears() {
        var as = articles();
        if (!as.length) return 0;
        var years = as.map(function (p) { return parseInt(p.date.slice(0, 4), 10); });
        return Math.max.apply(null, years) - Math.min.apply(null, years) + 1;
    }

    /* ---------------- 数据源：友链 ---------------- */

    var FRIENDS = (typeof window.FRIENDS !== 'undefined' && Array.isArray(window.FRIENDS))
        ? window.FRIENDS : [];

    /* ---------------- 渲染：首页文章列表 ---------------- */

    function renderHomeList(container) {
        if (!container) return;
        var list = articles();
        if (!list.length) {
            container.innerHTML = '<p style="color:#9CA3AF;padding:24px 0;">暂无文章。</p>';
            return;
        }
        container.innerHTML = list.map(function (p) {
            var tagsHtml = (p.tags && p.tags.length)
                ? p.tags.map(function (t) { return '#' + esc(t); }).join(' ')
                : '';
            return '' +
                '<div class="post-card">' +
                    '<span class="post-tag"># ' + esc(p.tag || '未分类') + '</span>' +
                    '<h2 class="post-title"><a href="posts/' + encodeURIComponent(p.id) + '.html">' + esc(p.title) + '</a></h2>' +
                    '<div class="post-meta">📅 ' + esc(p.date) +
                        ' · 🕒 ' + p.readMinutes + ' 分钟阅读' +
                        ' · 📝 ' + p.words + ' 字</div>' +
                    (p.excerpt ? '<div class="post-excerpt">' + esc(p.excerpt) + '</div>' : '') +
                    '<div class="post-footer">' +
                        (tagsHtml ? '<span>🏷️ ' + tagsHtml + '</span>' : '<span></span>') +
                        '<a href="posts/' + encodeURIComponent(p.id) + '.html">阅读全文 →</a>' +
                    '</div>' +
                '</div>';
        }).join('');
    }

    /* ---------------- 渲染：归档页 ---------------- */

    function renderArchive(container) {
        if (!container) return;
        var grouped = {};
        articles().forEach(function (p) {
            var y = p.date.slice(0, 4), m = p.date.slice(5, 7);
            (grouped[y] = grouped[y] || {})[m] = (grouped[y][m] || []).concat(p);
        });
        var html = '<div class="archive-list">';
        var years = Object.keys(grouped).sort().reverse();
        if (!years.length) html += '<p style="color:#9CA3AF;">暂无文章。</p>';
        years.forEach(function (y) {
            html += '<div class="archive-year">' + y + ' 年</div>';
            Object.keys(grouped[y]).sort().reverse().forEach(function (m) {
                html += '<div class="archive-month">' +
                    '<div class="archive-month-title">' + parseInt(m, 10) + ' 月' +
                    '<span class="archive-month-count">' + grouped[y][m].length + ' 篇</span></div>' +
                    '<ul class="archive-items">';
                grouped[y][m].forEach(function (p) {
                    html += '<li><a href="posts/' + encodeURIComponent(p.id) + '.html">' + esc(p.title) + '</a>' +
                        '<span class="archive-date">' + esc(p.date) + ' · ' + p.readMinutes + ' 分钟</span></li>';
                });
                html += '</ul></div>';
            });
        });
        html += '</div>';
        container.innerHTML = html;
    }

    /* ---------------- 渲染：侧边栏统计 ---------------- */

    function renderStats() {
        var list = articles();
        var stats = [
            { label: '📄 文章总数', value: list.length },
            { label: '🏷️ 标签数量', value: uniqueTags().length },
            { label: '⏱️ 累计阅读', value: totalMinutes() + ' 分钟' },
            { label: '✍️ 总字数', value: totalWords().toLocaleString('zh-CN') },
            { label: '🔗 友情链接', value: FRIENDS.length },
            { label: '📅 更新于', value: list.length ? list[0].date : '—' }
        ];
        document.querySelectorAll('.stats-card').forEach(function (card) {
            var ul = card.querySelector('.stats-list');
            if (!ul) return;
            ul.innerHTML = stats.map(function (s) {
                return '<li><span>' + esc(s.label) + '</span><span class="stat-value">' + esc(s.value) + '</span></li>';
            }).join('');
        });
    }

    /* ---------------- 渲染：热门标签云 ---------------- */

    function renderTagCloud() {
        document.querySelectorAll('.tag-cloud').forEach(function (cloud) {
            var freq = {};
            articles().forEach(function (p) {
                (p.tags || []).forEach(function (t) {
                    if (t) freq[t] = (freq[t] || 0) + 1;
                });
                if (p.tag) freq[p.tag] = (freq[p.tag] || 0) + 1;
            });
            var entries = Object.keys(freq).sort(function (a, b) {
                return freq[b] - freq[a] || a.localeCompare(b, 'zh-CN');
            }).slice(0, 10);
            if (!entries.length) { cloud.innerHTML = ''; return; }
            var max = freq[entries[0]];
            cloud.innerHTML = entries.map(function (t) {
                var size = 0.85 + 0.5 * (freq[t] / max); // 0.85rem ~ 1.35rem
                return '<a class="tag" style="font-size:' + size.toFixed(2) + 'rem" ' +
                    'title="' + freq[t] + ' 篇" href="archive.html?tag=' + encodeURIComponent(t) + '">' +
                    '#' + esc(t) + '</a>';
            }).join('');
        });
    }

    /* ---------------- 渲染：友链网格（friends 页） ---------------- */

    function renderFriends(container) {
        if (!container) return;
        if (!FRIENDS.length) {
            container.innerHTML = '<p style="color:#9CA3AF;">暂无友链。</p>';
            return;
        }
        container.innerHTML = FRIENDS.map(function (f) {
            var avatar = f.avatar
                ? '<img src="' + esc(f.avatar) + '" alt="' + esc(f.name) + '" loading="lazy" ' +
                  'onerror="this.onerror=null;this.src=\'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27%23D9B48B%27%3E%3Cpath d=%27M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z%27/%3E%3C/svg%3E\'">'
                : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#D9B48B;font-size:22px;font-weight:600;">' + esc((f.name || '?').charAt(0)) + '</div>';
            var tagsHtml = (f.tags || []).map(function (t) { return '<span class="friend-tag">#' + esc(t) + '</span>'; }).join('');
            return '' +
                '<a href="' + esc(f.url) + '" target="_blank" class="friend-card" rel="noopener noreferrer">' +
                    '<div class="friend-avatar">' + avatar + '</div>' +
                    '<div class="friend-info">' +
                        '<h3 class="friend-name">' + esc(f.name) + '</h3>' +
                        '<p class="friend-desc">' + esc(f.desc || '') + '</p>' +
                        '<div class="friend-tags">' + tagsHtml + '</div>' +
                    '</div>' +
                '</a>';
        }).join('');
    }

    /* ---------------- 归档页：标签过滤 ---------------- */

    function applyTagFilter() {
        var m = /[?&]tag=([^&]+)/.exec(location.search);
        var tag = m ? decodeURIComponent(m[1]) : null;
        if (!tag) return;
        // 高亮命中文章：给归档里的每项打标记即可（简单版：标题旁加 tag 徽标）
        document.querySelectorAll('.archive-items li').forEach(function (li) {
            var link = li.querySelector('a');
            if (!link) return;
            var p = POSTS.filter(function (x) { return x.title === link.textContent.trim(); })[0];
            if (p && (p.tags || []).indexOf(tag) >= 0 || (p && p.tag === tag)) {
                li.classList.add('tag-match');
            } else {
                li.style.display = 'none';
            }
        });
    }

    /* ---------------- 文章详情页：动态覆盖阅读时长/字数 ---------------- */

    function renderPostMeta() {
        var meta = $('#postMeta');
        if (!meta) return;
        var idMatch = /([^/]+)\.html$/.exec(location.pathname);
        var id = idMatch ? idMatch[1] : '';
        var p = null;
        POSTS.forEach(function (x) { if (x.id === id) p = x; });
        if (!p) return;
        var date = p.date;
        var parts = [];
        if (date) parts.push('📅 ' + date);
        parts.push('🕒 约 ' + p.readMinutes + ' 分钟阅读');
        if (p.words) parts.push('📝 ' + p.words + ' 字');
        meta.innerHTML = parts.join(' · ');
    }

    /* ---------------- 页脚注入 ---------------- */

    function injectFooter() {
        document.querySelectorAll('.site-footer').forEach(function (footer) {
            var year = new Date().getFullYear();
            var count = articles().length;
            footer.innerHTML = '<p>© 2024-' + year + ' RaM\'s Blog · ' +
                count + ' 篇文章 · 累计约 ' + totalMinutes() + ' 分钟阅读量</p>';
        });
    }

    /* ---------------- 站点访问量（本地统计，仅作展示） ---------------- */

    function bumpVisits() {
        var key = 'ram_blog_visits';
        try {
            var n = parseInt(localStorage.getItem(key) || '0', 10) + 1;
            localStorage.setItem(key, String(n));
            document.querySelectorAll('.visit-count').forEach(function (el) {
                el.textContent = n;
            });
        } catch (e) { /* localStorage 不可用时静默 */ }
    }

    /* ---------------- 启动 ---------------- */

    function init() {
        renderHomeList($('#homePage'));
        renderArchive($('#archiveContent'));
        renderStats();
        renderTagCloud();
        renderFriends($('#friendsGrid'));
        renderPostMeta();
        injectFooter();
        bumpVisits();
        applyTagFilter();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
