#!/usr/bin/env python3
"""Set each sitemap.xml <lastmod> to the date the page's content last really changed, from git history.

"Content" = <title>, meta description, canonical, JSON-LD blocks and everything inside <main>.
Sitewide chrome (header/nav, footer, analytics tag, asset ?v= cache-busting) is ignored, so a
version bump or a footer tweak does not make every URL look freshly modified.
If the working tree differs from HEAD in content, the page gets today's date (Asia/Dhaka).
Run after committing content changes, or just before the commit that makes them:
    python scripts/hurfi-pages/sitemap_lastmod.py           # rewrite sitemap.xml
    python scripts/hurfi-pages/sitemap_lastmod.py --check   # report only
"""
import datetime, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
SITE = 'https://hurfi.com'
TZ = datetime.timezone(datetime.timedelta(hours=6))  # Asia/Dhaka, no DST

def git(*args):
    return subprocess.run(['git', '-C', ROOT] + list(args), capture_output=True, check=True).stdout.decode('utf-8', 'replace')

def norm(s):
    if s is None:
        return None
    s = s.replace('\r\n', '\n')
    s = re.sub(r'\?v=\d{8}[a-z]?', '', s)
    parts = []
    for pat in (r'<title>.*?</title>', r'<meta name="description"[^>]*>', r'<link rel="canonical"[^>]*>',
                r'<script type="application/ld\+json">.*?</script>', r'<main\b.*?</main>'):
        parts += [re.sub(r'\s+', ' ', m) for m in re.findall(pat, s, re.S)]
    return '\n'.join(parts)

def show(rev, rel):
    try:
        return git('show', '%s:%s' % (rev, rel))
    except subprocess.CalledProcessError:
        return None

def lastmod(rel):
    """Date (YYYY-MM-DD, +06:00) of the newest commit that changed rel's content; None if untracked."""
    with open(os.path.join(ROOT, rel), encoding='utf-8', newline='') as f:
        work = norm(f.read())
    log = [l.split(' ', 1) for l in git('log', '--format=%H %cI', '--', rel).split('\n') if l]
    if not log:
        return None
    if work != norm(show('HEAD', rel)):
        return datetime.datetime.now(TZ).date().isoformat()
    for i, (h, when) in enumerate(log):
        prev = show(log[i + 1][0], rel) if i + 1 < len(log) else None
        if prev is None or norm(show(h, rel)) != norm(prev):
            return datetime.datetime.fromisoformat(when).astimezone(TZ).date().isoformat()
    return None

def main():
    check = '--check' in sys.argv
    path = os.path.join(ROOT, 'sitemap.xml')
    with open(path, encoding='utf-8', newline='') as f:
        xml = f.read()
    changed = 0
    def fix(m):
        nonlocal changed
        loc, old = m.group(2), m.group(4)
        rel = loc[len(SITE):].strip('/')
        rel = (rel + '/index.html') if rel else 'index.html'
        if not os.path.exists(os.path.join(ROOT, rel)):
            print('skip (no file):', loc); return m.group(0)
        new = lastmod(rel)
        if not new or new == old:
            return m.group(0)
        changed += 1
        print('%-70s %s -> %s' % (loc, old, new))
        return m.group(1) + m.group(2) + m.group(3) + new + m.group(5)
    out = re.sub(r'(<loc>)([^<]+)(</loc>\s*<lastmod>)([^<]+)(</lastmod>)', fix, xml)
    print('%d lastmod value(s) %s' % (changed, 'would change' if check else 'changed'))
    if not check and out != xml:
        with open(path, 'w', encoding='utf-8', newline='') as f:
            f.write(out)

if __name__ == '__main__':
    main()
