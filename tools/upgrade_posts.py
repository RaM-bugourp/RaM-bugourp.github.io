# -*- coding: utf-8 -*-
"""升级所有文章页：统一引擎 + 动态统计卡 + 实测阅读时长"""
import glob
import io
import os
import re
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS_DIR = os.path.join(ROOT, "posts")

SCRIPT_OLD = '<script src="../js/main.js"></script>'
SCRIPT_NEW = (
    '<script src="../js/posts.js"></script>\n'
    '<script src="../js/data/friends.js"></script>\n'
    '<script src="../js/site.js"></script>'
)

STATS_CARD = '''            <div class="stats-card">
                <div class="card-title">📊 站点统计</div>
                <ul class="stats-list">
                    <!-- 由 js/site.js 动态计算注入 -->
                </ul>
            </div>
'''

for f in sorted(glob.glob(os.path.join(POSTS_DIR, "post*.html"))):
    c = open(f, encoding="utf-8").read()
    changed = []

    # 1) 替换脚本引用
    if SCRIPT_OLD in c:
        c = c.replace(SCRIPT_OLD, SCRIPT_NEW)
        changed.append("脚本引用 main.js -> site.js 全家桶")

    # 2) post1 旧 GitHub 账号修正
    if "LeJennnn" in c:
        c = c.replace("LeJennnn", "RaM-bugourp")
        changed.append("GitHub 链接旧账号 -> RaM-bugourp")

    # 3) 侧边栏加统计卡（profile-card 之后，TOC 之前）
    if 'stats-card' not in c:
        m = re.search(r'(<aside class="sidebar">\s*<div class="profile-card">.*?</div>\s*</div>)', c, re.S)
        if m:
            anchor_end = m.end()
            c = c[:anchor_end] + "\n" + STATS_CARD + c[anchor_end:]
            changed.append("侧边栏新增统计卡")

    # 4) post-meta 加 id（供实测时长动态覆盖）
    c = c.replace('<div class="post-meta">', '<div class="post-meta" id="postMeta">', 1)

    open(f, "w", encoding="utf-8").write(c)
    print(f"{os.path.basename(f)}: {'; '.join(changed) if changed else '无需修改'}")

print("完成")
