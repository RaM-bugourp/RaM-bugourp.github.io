# -*- coding: utf-8 -*-
"""临时检查脚本：扫描 posts/ 下所有文章的元信息"""
import re, glob, io, sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

for f in sorted(glob.glob('posts/*.html')):
    c = open(f, encoding='utf-8').read()
    title = re.search(r'<title>(.*?)</title>', c, re.S)
    tag = re.search(r'post-tag[^>]*>\s*#?\s*(.*?)</span>', c, re.S)
    meta = re.search(r'post-meta[^>]*>(.*?)</div>', c, re.S)
    h1 = re.search(r'<h1>(.*?)</h1>', c, re.S)
    print('=' * 70)
    print(f)
    print('  title:', (title.group(1).replace(' · RaM\'s Blog', '') if title else 'NONE'))
    print('  h1   :', (h1.group(1).strip() if h1 else 'NONE'))
    print('  tag  :', (tag.group(1).strip() if tag else 'NONE'))
    print('  meta :', (meta.group(1).strip() if meta else 'NONE'))
