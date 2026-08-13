# -*- coding: utf-8 -*-
"""集成冒烟测试：静态检查所有页面引用与 JS 语法"""
import io
import os
import re
import subprocess
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ok = True


def check(cond, msg):
    global ok
    mark = 'PASS' if cond else 'FAIL'
    if not cond:
        ok = False
    print(f'[{mark}] {msg}')


# 1. 所有页面都引入 posts.js + site.js（演示页 3d.html 除外）
for page in ['index.html', 'archive.html', 'friends.html', 'about.html'] + \
            [f'posts/{f}' for f in os.listdir(os.path.join(ROOT, 'posts')) if f.startswith('post')]:
    c = open(os.path.join(ROOT, page), encoding='utf-8').read()
    check('posts.js' in c, f'{page} 引入 posts.js')
    check('site.js' in c, f'{page} 引入 site.js')

# 2. 文章页有统计卡 + postMeta
for f in os.listdir(os.path.join(ROOT, 'posts')):
    if not f.startswith('post'):
        continue
    c = open(os.path.join(ROOT, 'posts', f), encoding='utf-8').read()
    check('stats-card' in c, f'posts/{f} 含统计卡')
    check('id="postMeta"' in c, f'posts/{f} 含 postMeta')

# 3. 没有残留 main.js 引用
for root, dirs, files in os.walk(ROOT):
    for f in files:
        if f.endswith('.html'):
            c = open(os.path.join(root, f), encoding='utf-8').read()
            if 'main.js' in c:
                check(False, f'{os.path.join(root, f)} 残留 main.js 引用')

# 4. JS 语法检查（node）
for js in ['js/site.js', 'js/posts.js', 'js/data/friends.js', 'js/toc.js']:
    path = os.path.join(ROOT, js)
    r = subprocess.run(['node', '--check', path], capture_output=True, text=True, encoding='utf-8', errors='replace')
    check(r.returncode == 0, f'{js} 语法 OK' + ('' if r.returncode == 0 else f' -> {r.stderr.strip()}'))

# 5. 无旧账号链接残留
for root, dirs, files in os.walk(ROOT):
    for f in files:
        if f.endswith('.html'):
            c = open(os.path.join(root, f), encoding='utf-8').read()
            if 'LeJennnn' in c:
                check(False, f'{os.path.join(root, f)} 残留旧 GitHub 账号')

# 6. JSON 有效（用 node 加载并模拟统计）
r = subprocess.run(['node', '-e', '''
const fs = require('fs');
global.window = {};
eval(fs.readFileSync('js/posts.js', 'utf8'));
eval(fs.readFileSync('js/data/friends.js', 'utf8'));
const posts = window.POSTS.filter(p => p.type === 'post' && !p.duplicateOf);
console.log('articles:', posts.length);
console.log('friends:', window.FRIENDS.length);
console.log('tags:', new Set(posts.flatMap(p => [p.tag, ...(p.tags||[])])).size);
console.log('words:', posts.reduce((s,p)=>s+(p.words||0),0));
console.log('minutes:', posts.reduce((s,p)=>s+(p.readMinutes||0),0));
'''], capture_output=True, text=True, cwd=ROOT, encoding='utf-8', errors='replace')
check(r.returncode == 0 and 'articles: 11' in r.stdout, 'posts.js 数据加载 & 统计计算 OK')
print('   ', r.stdout.replace('\n', '\n    '))
if r.returncode != 0:
    print('    stderr:', r.stderr[:500])

print()
print('总体: ' + ('✅ 全部通过' if ok else '❌ 存在失败项'))
sys.exit(0 if ok else 1)
