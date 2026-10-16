#!/usr/bin/env python3
"""Hurfi page generator (Batches 1-3).

Idempotent: new pages are written whole; existing pages are only touched
inside <!-- hurfi:gen:NAME:start/end --> markers or via exact head-tag swaps.
Header/footer/scripts are copied from services/seo/index.html at build time,
so they always match the live site. Never touches pages it does not list.
Run from anywhere:  python scripts/hurfi-pages/build.py
"""
import difflib, html, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
CONTENT = os.path.join(HERE, 'content')
SITE = 'https://hurfi.com'
TODAY = os.environ.get('HURFI_BUILD_DATE', '2026-10-16')
OG_IMAGE = SITE + '/assets/img/og-default.png'

def load(name):
    with open(os.path.join(CONTENT, name), encoding='utf-8') as f:
        return json.load(f)

def rd(rel):
    with open(os.path.join(ROOT, rel), encoding='utf-8', newline='') as f:
        return f.read().replace('\r\n', '\n')

def wr(rel, text):
    """Write text (LF) to rel. Unchanged lines keep their original line endings,
    so files with CRLF or mixed endings produce minimal diffs."""
    p = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    out = text
    if os.path.exists(p):
        with open(p, encoding='utf-8', newline='') as f:
            raw = f.read()
        if raw.replace('\r\n', '\n') == text:
            return
        ol = raw.splitlines(keepends=True)
        on = [l.rstrip('\r\n') for l in ol]
        crlf = sum(l.endswith('\r\n') for l in ol) > len(ol) / 2
        eol = '\r\n' if crlf else '\n'
        nl = text.split('\n')
        last_eol = text.endswith('\n')
        if last_eol:
            nl = nl[:-1]
        parts = []
        sm = difflib.SequenceMatcher(None, on, nl, autojunk=False)
        for op, a1, a2, b1, b2 in sm.get_opcodes():
            if op == 'equal':
                parts.extend(ol[a1:a2])
            else:
                parts.extend(x + eol for x in nl[b1:b2])
        if parts and not last_eol:
            parts[-1] = parts[-1].rstrip('\r\n')
        out = ''.join(parts)
        # the last original line may have had no newline at all
        if ol and not ol[-1].endswith('\n') and parts and on[-1] == nl[-1] and last_eol is False:
            pass
    with open(p, 'w', encoding='utf-8', newline='') as f:
        f.write(out)
    print('wrote', rel)

E = lambda s: html.escape(s, quote=True)
LINK = re.compile(r'\[([^\]]+)\]\(([^)\s]+)\)')

def md(s):
    """Escape, then turn [text](url) into links."""
    return LINK.sub(lambda m: '<a href="%s">%s</a>' % (m.group(2), m.group(1)), E(s))

def plain(s):
    return LINK.sub(lambda m: m.group(1), s)

def jsonld(obj):
    # compact separators so site.js hasSchemaType() sees "@type":"X" and skips injecting duplicates
    return '<script type="application/ld+json">%s</script>' % json.dumps(obj, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')

# ---------------------------------------------------------------- template
TPL = rd('services/seo/index.html')
HEADER = TPL[TPL.index('  <header class="site-header">'):TPL.index('  <main>')]
TAIL = TPL[TPL.index('  <footer class="site-footer">'):]
CSS_LINK = re.search(r'<link rel="stylesheet" href="/assets/css/style\.css\?v=[^"]+">', TPL).group(0)
HX_LINK = '<link rel="stylesheet" href="/assets/css/hurfi-pages.css?v=20261016a">'

ORG = {"@type": "Organization", "@id": SITE + "/#organization", "name": "Hurfi", "url": SITE + "/",
       "logo": SITE + "/assets/img/hurfi-logo-for-whitebg.png", "email": "yasir@hurfi.com",
       "address": [{"@type": "PostalAddress", "addressLocality": "Xi'an", "addressRegion": "Shaanxi", "addressCountry": "CN"},
                   {"@type": "PostalAddress", "addressLocality": "Bogura", "addressCountry": "BD"}]}

def org_ld():
    return dict({"@context": "https://schema.org"}, **ORG)

def crumbs_ld(items):
    return {"@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + u} for i, (n, u) in enumerate(items)]}

def faq_ld(faq):
    return {"@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": plain(q), "acceptedAnswer": {"@type": "Answer", "text": plain(a)}} for q, a in faq]}

def head(p):
    t, d, path = p['title'], p['description'], p['path']
    lang = p.get('lang', 'en')
    loc = 'zh_CN' if lang.startswith('zh') else 'en_US'
    alt = ''
    for hl, u in p.get('alternates', []):
        alt += '  <link rel="alternate" hreflang="%s" href="%s%s">\n' % (hl, SITE, u)
    ld = ''.join('  %s\n' % jsonld(o) for o in p.get('ld', []))
    return f'''<!DOCTYPE html>
<html lang="{lang}"{' data-static-lang="zh"' if lang.startswith('zh') else ''}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{E(t)}</title>
  <meta name="description" content="{E(d)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
  {CSS_LINK}
  {HX_LINK}
  <meta name="theme-color" content="#07090d">
  <link rel="icon" href="/assets/img/hurfi-icon.svg" type="image/svg+xml">
  <link rel="canonical" href="{SITE}{path}">
{alt}  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta property="og:site_name" content="Hurfi">
  <meta property="og:type" content="{p.get('og_type', 'website')}">
  <meta property="og:title" content="{E(t)}">
  <meta property="og:description" content="{E(d)}">
  <meta property="og:url" content="{SITE}{path}">
  <meta property="og:locale" content="{loc}">
  <meta property="og:image" content="{OG_IMAGE}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Hurfi — export marketing for Chinese manufacturers">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{E(t)}">
  <meta name="twitter:description" content="{E(d)}">
  <meta name="twitter:image" content="{OG_IMAGE}">
{ld}</head>
<body data-page="{p['data_page']}">
'''

ZH_UI = None
def zh_ui():
    """Static Chinese labels for the shared header/footer, taken from i18n.js so they stay in sync."""
    global ZH_UI
    if ZH_UI is None:
        js = rd('assets/js/i18n.js')
        block = js[js.index('var zh = {'):js.index('\n  };', js.index('var zh = {'))]
        ZH_UI = dict(re.findall(r'^\s*"((?:[^"\\]|\\.)*)":\s*"((?:[^"\\]|\\.)*)",?\s*$', block, re.M))
        # later additions such as zh["Brand Guidelines"] = "...";
        ZH_UI.update(re.findall(r'^\s*zh\["((?:[^"\\]|\\.)*)"\]\s*=\s*"((?:[^"\\]|\\.)*)";\s*$', js, re.M))
    return ZH_UI

def localize_zh(chunk):
    m = zh_ui()
    def txt(mo):
        raw = mo.group(1); core = raw.strip()
        if core and core in m:
            return '>' + raw.replace(core, m[core]) + '<'
        return mo.group(0)
    out = re.sub(r'>([^<>]+)<', txt, chunk)
    def attr(mo):
        v = html.unescape(mo.group(2))
        return '%s="%s"' % (mo.group(1), E(m[v])) if v in m else mo.group(0)
    out = re.sub(r'(aria-label|title)="([^"]*)"', attr, out)
    return out

def page(p, main):
    hdr, tail = HEADER, TAIL
    if p.get('lang', 'en').startswith('zh'):
        hdr = localize_zh(hdr).replace('data-lang="en" aria-pressed="true"', 'data-lang="en" aria-pressed="false"').replace('data-lang="zh" aria-pressed="false"', 'data-lang="zh" aria-pressed="true"')
        foot, scripts = tail.split('  </footer>', 1)
        tail = localize_zh(foot) + '  </footer>' + scripts
    return head(p) + hdr + '  <main>\n' + main + '  </main>\n' + tail

# ---------------------------------------------------------------- blocks
def crumbs_nav(items, label='Breadcrumb'):
    li = []
    for i, (n, u) in enumerate(items):
        if i == len(items) - 1:
            li.append('<li><span aria-current="page">%s</span></li>' % E(n))
        else:
            li.append('<li><a href="%s">%s</a></li>' % (u, E(n)))
    return '    <nav class="hx-crumbs" aria-label="%s"><ol>%s</ol></nav>\n' % (E(label), ''.join(li))

def hero(kicker, h1, lead, cta=('Book a Consultation', '/book-consultation/'), note=None, meta=None):
    n = '\n        <p class="hx-hero-note">%s</p>' % md(note) if note else ''
    m = '\n        <p class="hx-meta">%s</p>' % meta if meta else ''
    return f'''    <header class="about-hero hx-hero">
      <div class="container">
        <p class="about-kicker">{E(kicker)}</p>
        <h1>{E(h1)}</h1>
        <p class="about-hero-lead">{md(lead)}</p>{m}{n}
        <a class="svc-cta" href="{cta[1]}">{E(cta[0])} <span aria-hidden="true">→</span></a>
      </div>
    </header>
'''

_ids = {}
def sid(base):
    base = re.sub(r'[^a-z0-9]+', '-', base.lower()).strip('-')[:40] or 'sec'
    k = base; i = 2
    while k in _ids.get('cur', set()):
        k = '%s-%d' % (base, i); i += 1
    _ids.setdefault('cur', set()).add(k)
    return k

def reset_ids():
    _ids['cur'] = set()

def ul(items, cls='hx-list'):
    return '      <ul class="%s">\n%s      </ul>\n' % (cls, ''.join('        <li>%s</li>\n' % md(x) for x in items))

def cards(items):
    out = '      <div class="brief-grid">\n'
    for c in items:
        t, u, body = c[0], c[1], c[2]
        h = '<a href="%s">%s</a>' % (u, E(t)) if u else E(t)
        out += '        <article class="brief-card"><h3>%s</h3><p>%s</p></article>\n' % (h, md(body))
    return out + '      </div>\n'

def section(s, cls='brief hx-prose'):
    i = sid(s.get('id') or plain(s['h2']))
    out = '    <section class="%s" aria-labelledby="%s">\n      <h2 id="%s">%s</h2>\n' % (cls, i, i, md(s['h2']))
    for x in s.get('p', []):
        out += '      <p>%s</p>\n' % md(x)
    if s.get('ul'):
        out += ul(s['ul'])
    if s.get('ol'):
        out += '      <ol class="hx-list">\n%s      </ol>\n' % ''.join('        <li>%s</li>\n' % md(x) for x in s['ol'])
    if s.get('cards'):
        out += cards(s['cards'])
    for x in s.get('p2', []):
        out += '      <p>%s</p>\n' % md(x)
    return out + '    </section>\n'

def faq_block(faq, kicker='Questions', title='Questions factories ask', lead=None):
    d = ''
    for i, (q, a) in enumerate(faq):
        d += '            <details%s>\n              <summary><span>%s</span><span class="rk-faq-icon" aria-hidden="true"></span></summary>\n              <p>%s</p>\n            </details>\n' % (' open' if i == 0 else '', E(q), md(a))
    lead = '\n          <p class="rk-faq-lead">%s</p>' % E(lead) if lead else ''
    return f'''    <section class="rk-faq rk-faq-split hx-faq" aria-labelledby="rk-faq-title">
      <div class="rk-faq-grid">
        <div class="rk-faq-copy">
          <p class="rk-kicker">{E(kicker)}</p>
          <h2 id="rk-faq-title">{E(title)}</h2>{lead}
          <div class="rk-faq-list">
{d}          </div>
        </div>
      </div>
    </section>
'''

SERVICES = [('Website Development', '/services/website-development/', 'English B2B websites with product specifications, factory proof and a clear RFQ path.'),
            ('SEO', '/services/seo/', 'Google SEO aimed at the specification and application searches overseas buyers use.'),
            ('Digital Marketing', '/services/digital-marketing/', 'Search, content and paid campaigns aimed at qualified inquiries, reported from your own accounts.'),
            ('Social Media Management', '/services/social-media-management/', 'LinkedIn and social media that show real production, engineering and people.')]

# ---------------------------------------------------------------- city pages
def build_cities(cities):
    for c in cities.values():
        reset_ids()
        path = '/locations/china/%s/' % c['slug']
        bc = [('Home', '/'), ('Locations', '/locations/'), ('China', '/locations/china/'), (c['city'], path)]
        refs = {s['id']: n + 1 for n, s in enumerate(c['sources'])}
        facts = ''
        for text, ids in c['facts']:
            sup = ''.join('<sup><a href="#src-%s" aria-label="Source %d">[%d]</a></sup>' % (x, refs[x], refs[x]) for x in ids)
            facts += '        <li>%s%s</li>\n' % (md(text), sup)
        meaning = '      <div class="brief-grid">\n' + ''.join(
            '        <article class="brief-card"><h3><a href="%s">%s</a></h3><p>%s</p></article>\n' % (u, E(t), md(b)) for t, b, u in c['meaning']) + '      </div>\n'
        srcs = ''.join('        <li id="src-%s"><span class="hx-src-n">[%d]</span> %s. <a href="%s" rel="noopener" lang="zh-Hans">%s</a>. Checked %s.</li>\n'
                       % (s['id'], refs[s['id']], E(s['publisher']), E(s['url']), E(s['label']), E(s['checked'])) for s in c['sources'])
        main = hero('China · ' + c['province'], c['h1'], c['lead'], note=c['remote']) + crumbs_nav(bc)
        main += f'''    <section class="brief hx-prose" aria-labelledby="ctx-title">
      <h2 id="ctx-title">What {E(c['city'])} makes, according to official data</h2>
      <p>{md(c['context_intro'])}</p>
      <ul class="hx-list">
{facts}      </ul>
    </section>
    <section class="brief" aria-labelledby="mean-title">
      <h2 id="mean-title">What this means for a {E(c['city'])} manufacturer’s website</h2>
{meaning}    </section>
    <section class="brief hx-prose" aria-labelledby="appr-title">
      <h2 id="appr-title">How Hurfi works with {E(c['city'])} manufacturers</h2>
{ul(c['approach'])}{cards(SERVICES)}    </section>
'''
        if c.get('start'):
            main += section(dict(h2='Where we would usually start', p=['For a %s manufacturer selling abroad, the first pages and search topics usually follow the city’s industrial mix:' % c['city']], ul=c['start'], id='start'))
        main += faq_block(c['faq'], title='Questions from %s manufacturers' % c['city'])
        main += f'''    <section class="brief hx-sources" aria-labelledby="src-title">
      <h2 id="src-title">Sources</h2>
      <p>Figures are quoted from the official sources below and were checked on the date shown. They describe the city, not any Hurfi client.</p>
      <ol class="hx-src-list">
{srcs}      </ol>
      <p><a class="desk-link" href="/locations/china/#{c['anchor']}">Back to the China directory</a></p>
    </section>
'''
        ld = [org_ld(), crumbs_ld(bc),
              {"@context": "https://schema.org", "@type": "WebPage", "name": c['h1'], "url": SITE + path, "description": c['description'], "inLanguage": "en",
               "isPartOf": {"@type": "WebSite", "name": "Hurfi", "url": SITE + "/"}, "about": {"@type": "City", "name": c['city'], "containedInPlace": {"@type": "AdministrativeArea", "name": c['province'] + ", China"}},
               "provider": {"@id": SITE + "/#organization"}, "dateModified": TODAY},
              faq_ld(c['faq'])]
        wr(path.strip('/') + '/index.html', page(dict(title=c['title'], description=c['description'], path=path, data_page='location', ld=ld), main))

# ---------------------------------------------------------------- insights
def build_insights(ins):
    hub = ins['_hub']
    arts = [ins[k] for k in ins if k != '_hub']
    reset_ids()
    bc = [('Home', '/'), ('Insights', '/insights/')]
    grid = '      <div class="ind-grid">\n' + ''.join(
        '        <a class="ind-card" href="/insights/%s/"><h3>%s</h3><p>%s</p><span class="ind-go" aria-hidden="true">→</span></a>\n' % (a['slug'], E(a['h1']), E(a['description'])) for a in arts) + '      </div>\n'
    main = hero('Insights', hub['h1'], hub['lead']) + crumbs_nav(bc) + '    <section class="brief" aria-labelledby="list-title">\n      <h2 id="list-title">Guides</h2>\n' + grid + '    </section>\n'
    ld = [org_ld(), crumbs_ld(bc), {"@context": "https://schema.org", "@type": "CollectionPage", "name": hub['h1'], "url": SITE + "/insights/", "description": hub['description'], "inLanguage": "en",
          "hasPart": [{"@type": "Article", "headline": a['h1'], "url": SITE + "/insights/%s/" % a['slug']} for a in arts]}]
    wr('insights/index.html', page(dict(title=hub['title'], description=hub['description'], path='/insights/', data_page='insights', ld=ld), main))
    for a in arts:
        reset_ids()
        path = '/insights/%s/' % a['slug']
        bc = [('Home', '/'), ('Insights', '/insights/'), (a['h1'], path)]
        secs = ''.join(section(s, 'hx-article-sec') for s in a['sections'])
        toc = ''.join('<li><a href="#%s">%s</a></li>' % (sid_peek(s), E(plain(s['h2']))) for s in a['sections'])
        others = [o for o in arts if o is not a]
        rel = ''.join('<li><a href="/insights/%s/">%s</a></li>' % (o['slug'], E(o['h1'])) for o in others)
        date_h = human_date(a['published'])
        main = hero('Insights', a['h1'], a['lead'], meta='By the Hurfi team · <time datetime="%s">%s</time>' % (a['published'], date_h)) + crumbs_nav(bc)
        main += f'''    <div class="hx-article">
      <nav class="hx-toc" aria-label="On this page"><p class="hx-toc-title">On this page</p><ol>{toc}</ol></nav>
      <article class="hx-article-body">
{secs}      </article>
      <aside class="hx-related" aria-label="Related">
        <p class="hx-toc-title">Related guides</p>
        <ul>{rel}</ul>
        <p><a class="svc-cta" href="/book-consultation/">Book a Consultation <span aria-hidden="true">→</span></a></p>
      </aside>
    </div>
'''
        if a.get('faq'):
            main += faq_block(a['faq'], title='Common questions')
        ld = [org_ld(), crumbs_ld(bc),
              {"@context": "https://schema.org", "@type": "Article", "headline": a['h1'], "description": a['description'], "url": SITE + path, "mainEntityOfPage": SITE + path,
               "datePublished": a['published'], "dateModified": a.get('modified', a['published']), "inLanguage": "en", "image": OG_IMAGE,
               "author": {"@type": "Organization", "name": "Hurfi", "url": SITE + "/"}, "publisher": {"@id": SITE + "/#organization"}}]
        if a.get('faq'):
            ld.append(faq_ld(a['faq']))
        wr(path.strip('/') + '/index.html', page(dict(title=a['title'], description=a['description'], path=path, data_page='insight', og_type='article', ld=ld), main))

def sid_peek(s):
    # ids are assigned in section(); recompute the same slug deterministically
    return re.sub(r'[^a-z0-9]+', '-', plain(s['h2']).lower()).strip('-')[:40]

def human_date(iso):
    y, m, d = iso.split('-')
    return '%d %s %s' % (int(d), ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][int(m) - 1], y)

# ---------------------------------------------------------------- zh pages
ZH_SVC = {'website-development': '外贸网站建设', 'seo': '谷歌 SEO', 'digital-marketing': '海外数字营销', 'social-media-management': '领英与社交媒体运营'}
def build_zh(zh):
    for key, z in zh.items():
        reset_ids()
        bc = [('首页', '/zh/')] + ([] if key == 'home' else [(ZH_SVC[key], z['path'])])
        if key == 'home':
            bc = [('首页', '/zh/')]
        main = hero(z['kicker'], z['h1'], z['lead'], cta=('预约免费咨询', '/book-consultation/'),
                    note='本页为简体中文版。[查看英文版](%s)' % z['en']) + (crumbs_nav(bc, '面包屑导航') if key != 'home' else '')
        for s in z['sections']:
            main += section(s, 'brief hx-prose' if not s.get('cards') else 'brief')
        if key != 'home':
            others = [(ZH_SVC[k], zh[k]['path'], zh[k]['description']) for k in ZH_SVC if k != key]
            main += section(dict(h2='其他服务', cards=others, id='other'), 'brief')
        main += faq_block(z['faq'], kicker='常见问题', title='制造企业常问的问题')
        alts = [('zh-Hans', z['path']), ('en', z['en']), ('x-default', z['en'])]
        ld = [org_ld()]
        if key == 'home':
            ld.append({"@context": "https://schema.org", "@type": "WebPage", "name": z['h1'], "url": SITE + z['path'], "description": z['description'], "inLanguage": "zh-Hans", "isPartOf": {"@type": "WebSite", "name": "Hurfi", "url": SITE + "/"}})
        else:
            ld.append(crumbs_ld(bc))
            ld.append({"@context": "https://schema.org", "@type": "Service", "name": z['h1'], "serviceType": ZH_SVC[key], "url": SITE + z['path'], "description": z['description'], "inLanguage": "zh-Hans",
                       "provider": {"@id": SITE + "/#organization"}, "areaServed": {"@type": "Country", "name": "China"}})
        ld.append(faq_ld(z['faq']))
        wr(z['path'].strip('/') + '/index.html', page(dict(title=z['title'], description=z['description'], path=z['path'], lang='zh-Hans', alternates=alts,
                                                           data_page=z['data_page'], ld=ld), main))

# ---------------------------------------------------------------- existing-page edits
def set_head(s, title=None, desc=None, og_title_fix=True):
    if title:
        s = re.sub(r'<title>.*?</title>', '<title>%s</title>' % E(title), s, count=1, flags=re.S)
        s = re.sub(r'(<meta property="og:title" content=")[^"]*(">)', lambda m: m.group(1) + E(title) + m.group(2), s, count=1)
        s = re.sub(r'(<meta name="twitter:title" content=")[^"]*(">)', lambda m: m.group(1) + E(title) + m.group(2), s, count=1)
    if desc:
        for pat in (r'(<meta name="description" content=")[^"]*(">)', r'(<meta property="og:description" content=")[^"]*(">)', r'(<meta name="twitter:description" content=")[^"]*(">)'):
            s = re.sub(pat, lambda m: m.group(1) + E(desc) + m.group(2), s, count=1)
    return s

def set_block(s, name, content, before=None, after=None):
    """Insert or replace a marked generated block."""
    start, end = '<!-- hurfi:gen:%s:start -->' % name, '<!-- hurfi:gen:%s:end -->' % name
    block = '    %s\n%s    %s\n' % (start, content, end)
    if start in s:
        return re.sub(r'    %s\n.*?    %s\n' % (re.escape(start), re.escape(end)), lambda m: block, s, count=1, flags=re.S)
    anchor = before or after
    if anchor not in s:
        raise SystemExit('anchor not found for %s: %r' % (name, anchor))
    i = s.index(anchor)
    if after:
        i += len(after)
    return s[:i] + block + s[i:]

def set_ld(s, objs):
    block = '  <!-- hurfi:gen:jsonld:start -->\n%s  <!-- hurfi:gen:jsonld:end -->\n' % ''.join('  %s\n' % jsonld(o) for o in objs)
    if '<!-- hurfi:gen:jsonld:start -->' in s:
        return re.sub(r'  <!-- hurfi:gen:jsonld:start -->\n.*?  <!-- hurfi:gen:jsonld:end -->\n', lambda m: block, s, count=1, flags=re.S)
    return s.replace('</head>', block + '</head>', 1)

def set_alternates(s, alts):
    block = '  <!-- hurfi:gen:hreflang:start -->\n%s  <!-- hurfi:gen:hreflang:end -->\n' % ''.join('  <link rel="alternate" hreflang="%s" href="%s%s">\n' % (h, SITE, u) for h, u in alts)
    if '<!-- hurfi:gen:hreflang:start -->' in s:
        return re.sub(r'  <!-- hurfi:gen:hreflang:start -->\n.*?  <!-- hurfi:gen:hreflang:end -->\n', lambda m: block, s, count=1, flags=re.S)
    m = re.search(r'  <link rel="canonical"[^>]*>\n', s)
    return s[:m.end()] + block + s[m.end():]

def add_hx_css(s):
    if 'hurfi-pages.css' in s:
        return re.sub(r'<link rel="stylesheet" href="/assets/css/hurfi-pages\.css\?v=[^"]+">', HX_LINK, s)
    m = re.search(r'<link rel="stylesheet" href="/assets/css/style\.css\?v=[^"]+">', s)
    return s[:m.end()] + '\n  ' + HX_LINK + s[m.end():]

def existing_faq(s):
    return [(html.unescape(re.sub('<[^>]+>', '', q)).strip(), html.unescape(re.sub('<[^>]+>', '', a)).strip())
            for q, a in re.findall(r'<summary><span>(.*?)</span>.*?</summary>\s*<p>(.*?)</p>', s, re.S)]

PILOT = {}
def build_sectors(sectors, cities):
    for sl, c in cities.items():
        PILOT[sl] = c['city']
    for x in sectors.values():
        reset_ids()
        rel = 'industries/%s/index.html' % x['slug']
        s = rd(rel)
        path = '/industries/%s/' % x['slug']
        s = set_head(s, x['title'], x['description'])
        s = s.replace('<header class="about-hero">', '<header class="about-hero hx-hero">', 1)
        s = re.sub(r'(<header class="about-hero hx-hero">.*?<h1>).*?(</h1>\s*<p class="about-hero-lead">).*?(</p>)',
                   lambda m: m.group(1) + E(x['h1']) + m.group(2) + md(x['lead']) + m.group(3), s, count=1, flags=re.S)
        body = section(dict(h2='What overseas buyers check before they contact a %s supplier' % x['short'], ul=x['checks'], id='buyer-checks'))
        body += section(dict(h2='What the website and search work should include', ul=x['site'], id='site-work'))
        body += section(dict(h2='Gaps we often see', ul=x['gaps'], id='gaps'))
        if x.get('topics'):
            body += section(dict(h2='Search topics worth their own page', p=['Overseas %s buyers rarely search for a supplier by company type alone. They search for the product, the specification or the problem. These are the pages we usually plan first:' % x['short']], ul=x['topics'], id='topics'))
        cl = [cty for cty in x.get('cities', []) if cty in PILOT]
        links = [('[%s](/locations/china/%s/)' % (PILOT[cty], cty)) for cty in cl]
        p2 = []
        if links:
            p2.append('Official statistics name this sector among the main industries of ' + ' and '.join(links) + '. Our city pages explain what that means for a manufacturer’s website.')
        p2.append('For a practical starting point, read [what overseas buyers check on a factory website](/insights/factory-website-trust-signals/) or the [RFQ checklist](/insights/manufacturer-website-rfq-checklist/).')
        body += section(dict(h2='Related cities and guides', p=p2, id='related'))
        s = set_block(s, 'sector-body', body, after='    </header>\n')
        s = set_block(s, 'sector-faq', faq_block(x['faq']), before='    <p class="brief"><a class="desk-link" href="/industries/">All industries</a></p>')
        s = add_hx_css(s)
        bc = [('Home', '/'), ('Industries', '/industries/'), (x['name'], path)]
        s = set_ld(s, [org_ld(), crumbs_ld(bc), {"@context": "https://schema.org", "@type": "WebPage", "name": x['h1'], "url": SITE + path, "description": x['description'], "inLanguage": "en",
                       "isPartOf": {"@type": "WebSite", "name": "Hurfi", "url": SITE + "/"}, "provider": {"@id": SITE + "/#organization"}, "dateModified": TODAY}, faq_ld(x['faq'])])
        wr(rel, s)

ZH_OF = {'/': '/zh/', '/services/website-development/': '/zh/services/website-development/', '/services/seo/': '/zh/services/seo/',
         '/services/digital-marketing/': '/zh/services/digital-marketing/', '/services/social-media-management/': '/zh/services/social-media-management/'}

def build_services(pages):
    for key, v in pages['services'].items():
        reset_ids()
        rel = 'services/%s/index.html' % key
        path = '/services/%s/' % key
        s = rd(rel)
        s = set_head(s, v['title'], v['description'])
        s = s.replace('<header class="about-hero">', '<header class="about-hero hx-hero">', 1)
        s = re.sub(r'(<header class="about-hero hx-hero">.*?<h1>).*?(</h1>)', lambda m: m.group(1) + E(v['h1']) + m.group(2), s, count=1, flags=re.S)
        body = ''.join(section(x) for x in v['sections'])
        s = set_block(s, 'service-body', body, before='    <section class="brief" aria-labelledby="other-title">')
        s = add_hx_css(s)
        s = set_alternates(s, [('en', path), ('zh-Hans', ZH_OF[path]), ('x-default', path)])
        name = re.sub(r' \| Hurfi$', '', v['title'])
        bc = [('Home', '/'), ('Services', '/services/'), (name, path)]
        s = set_ld(s, [org_ld(), crumbs_ld(bc), {"@context": "https://schema.org", "@type": "Service", "name": v['h1'], "url": SITE + path, "description": v['description'],
                       "provider": {"@id": SITE + "/#organization"}, "areaServed": {"@type": "Country", "name": "China"}, "audience": {"@type": "BusinessAudience", "name": "Chinese manufacturers, suppliers and exporters"}},
                       faq_ld(existing_faq(s))])
        wr(rel, s)

def build_oem(pg):
    reset_ids()
    o = pg['oem-odm']
    path = o['path']
    bc = [('Home', '/'), ('Industries', '/industries/'), ('OEM & ODM', path)]
    main = hero(o['kicker'], o['h1'], o['lead']) + crumbs_nav(bc)
    for s in o['sections']:
        main += section(s, 'brief' if s.get('cards') else 'brief hx-prose')
    main += faq_block(o['faq'])
    main += '    <p class="brief"><a class="desk-link" href="/industries/">All industries</a></p>\n'
    ld = [org_ld(), crumbs_ld(bc), {"@context": "https://schema.org", "@type": "WebPage", "name": o['h1'], "url": SITE + path, "description": o['description'], "inLanguage": "en",
          "isPartOf": {"@type": "WebSite", "name": "Hurfi", "url": SITE + "/"}, "provider": {"@id": SITE + "/#organization"}, "dateModified": TODAY}, faq_ld(o['faq'])]
    wr('industries/oem-odm/index.html', page(dict(title=o['title'], description=o['description'], path=path, data_page='industry', ld=ld), main))

def build_home(pg):
    h = pg['home']
    s = rd('index.html')
    s = set_head(s, h['title'], h['description'])
    if 'rk-hero-eyebrow' not in s:
        s = s.replace('<h1 id="rk-hero-title">\n', '<h1 id="rk-hero-title">\n          <span class="rk-hero-eyebrow">%s</span>\n' % E(h['eyebrow']), 1)
    s = set_alternates(s, [('en', '/'), ('zh-Hans', '/zh/'), ('x-default', '/')])
    s = add_hx_css(s)
    wr('index.html', s)

def build_locations(pg, cities):
    l = pg['locations']
    s = rd('locations/index.html')
    s = set_head(s, l['title'], l['description'])
    s = s.replace('<header class="about-hero">', '<header class="about-hero hx-hero">', 1)
    s = s.replace('<h1>Locations</h1>', '<h1>China manufacturing regions we serve</h1>', 1)
    grid = '      <div class="ind-grid">\n' + ''.join('        <a class="ind-card" href="/locations/china/%s/"><h3>%s</h3><p>%s · city guide</p><span class="ind-go" aria-hidden="true">→</span></a>\n' % (c['slug'], E(c['city']), E(c['province'])) for c in cities.values()) + '      </div>\n'
    body = '    <section class="brief" aria-labelledby="cityguide-title">\n      <h2 id="cityguide-title">City guides</h2>\n      <p>Short guides for manufacturers in four cities, based on official industry statistics. Hurfi works with them remotely from Xi’an and Bogura; we do not have local offices there.</p>\n' + grid + '    </section>\n'
    s = set_block(s, 'city-guides', body, before='  </main>')
    s = add_hx_css(s)
    wr('locations/index.html', s)

def build_china(cities):
    s = rd('locations/china/index.html')
    # display-name spelling only; ids stay as city-anhui-lu-an / city-anhui-maanshan
    s = s.replace('<strong>Lu an</strong>', '<strong>Lu’an</strong>').replace('suppliers in Lu an, Anhui', 'suppliers in Lu’an, Anhui')
    s = s.replace('<strong>Maanshan</strong>', '<strong>Ma’anshan</strong>').replace('suppliers in Maanshan, Anhui', 'suppliers in Ma’anshan, Anhui')
    s = s.replace('<a href="/industries/furniture/">Furniture</a>', '<a href="/industries/furniture-interior-manufacturing/">Furniture &amp; Interior Manufacturing</a>')
    for c in cities.values():
        a = '<article class="cn-city" id="%s">' % c['anchor']
        i = s.index(a); j = s.index('</article>', i)
        card = s[i:j]
        if 'hx-cityguide' not in card:
            card = card.rstrip() + '\n          <p class="hx-cityguide"><a href="/locations/china/%s/">%s city guide <span aria-hidden="true">→</span></a></p>\n        ' % (c['slug'], E(c['city']))
            s = s[:i] + card + s[j:]
    s = add_hx_css(s)
    wr('locations/china/index.html', s)

def build_industries_hub():
    s = rd('industries/index.html')
    body = '''    <section class="brief" aria-labelledby="xsector-title">
      <h2 id="xsector-title">Across sectors</h2>
      <p>Some work depends on how the factory sells rather than what it makes.</p>
      <div class="ind-grid">
        <a class="ind-card" href="/industries/oem-odm/"><h3>OEM &amp; ODM manufacturing</h3><p>For factories that build products for other brands.</p><span class="ind-go" aria-hidden="true">→</span></a>
      </div>
    </section>
'''
    s = set_block(s, 'cross-sector', body, before='    <section class="brief" aria-labelledby="chal-title">')
    s = add_hx_css(s)
    wr('industries/index.html', s)

def main():
    sectors, cities, ins, zh, pg = load('sectors.json'), load('cities.json'), load('insights.json'), load('zh.json'), load('pages.json')
    build_cities(cities)
    build_sectors(sectors, cities)
    build_oem(pg)
    build_services(pg)
    build_home(pg)
    build_locations(pg, cities)
    build_china(cities)
    build_industries_hub()
    build_insights(ins)
    build_zh(zh)

if __name__ == '__main__':
    main()
