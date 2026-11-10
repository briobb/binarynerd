"""確定した公開URLで実行: python3 scripts/configure-seo.py https://example.jp/"""
from pathlib import Path
from urllib.parse import urlparse
from xml.sax.saxutils import escape
import sys, re
url = sys.argv[1]
parsed = urlparse(url)
if parsed.scheme != 'https' or not parsed.netloc or parsed.query or parsed.fragment:
    raise SystemExit('クエリ・フラグメントのない確定したHTTPS URLを指定してください。')
root = Path(__file__).resolve().parent.parent
html = (root / 'index.html').read_text()
html = re.sub(r'<link rel="canonical"[^>]*>|<meta property="og:url"[^>]*>', '', html)
html = html.replace('</head>', f'<link rel="canonical" href="{escape(url, {chr(34): "&quot;"})}"><meta property="og:url" content="{escape(url, {chr(34): "&quot;"})}"></head>')
(root / 'index.html').write_text(html)
(root / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {url.rstrip("/")}/sitemap.xml\n')
(root / 'sitemap.xml').write_text(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>{escape(url)}</loc></url></urlset>\n')
config = (root / 'site-config.js').read_text()
import json
config = re.sub(r'productionUrl: (?:null|"[^"]*"),', 'productionUrl: ' + json.dumps(url) + ',', config)
(root / 'site-config.js').write_text(config)
print('canonical・OG URL・robots・sitemap を設定しました。')
