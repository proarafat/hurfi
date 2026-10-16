"""Site-wide header/footer/asset-version updates (idempotent). Run before build.py."""
import os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from navdata import nav_ul, VER

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))

def files():
    for d, ds, fs in os.walk(ROOT):
        ds[:] = [x for x in ds if x not in ('.git', 'scripts', 'node_modules')]
        for f in fs:
            if f.endswith('.html'):
                yield os.path.join(d, f)

def main():
    for p in files():
        raw = open(p, encoding='utf-8', newline='').read()
        crlf = '\r\n' in raw
        s = raw.replace('\r\n', '\n')
        o = s
        rel = os.path.relpath(p, ROOT)
        if not rel.startswith('zh' + os.sep):
            s = re.sub(r'<ul class="nav">.*?</ul>(?=\n      </nav>)', lambda m: nav_ul(), s, count=1, flags=re.S)
            if 'href="/insights/">Insights</a>' not in s.split('<footer class="site-footer">')[-1]:
                s = s.replace('      <a href="/locations/china/">China</a>\n', '      <a href="/locations/china/">China</a>\n      <a href="/insights/">Insights</a>\n', 1)
        for a in ('style.css', 'site.js', 'i18n.js', 'site-data.js'):
            s = re.sub(r'(/assets/(?:css|js)/%s\?v=)[0-9a-z]+' % re.escape(a), r'\g<1>' + VER, s)
        if s != o:
            out = s.replace('\n', '\r\n') if crlf else s
            # keep mixed files' original endings where unchanged: simple approach, files here are uniform per file
            open(p, 'w', encoding='utf-8', newline='').write(out)
            print('sitewide', rel)

if __name__ == '__main__':
    main()
