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

def _a(url, text):
    if url.startswith('http'):
        return '<a href="%s" target="_blank" rel="noopener">%s</a>' % (url, text)
    return '<a href="%s">%s</a>' % (url, text)

def md(s):
    """Escape, then turn [text](url) into links (external links open in a new tab)."""
    return re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', LINK.sub(lambda m: _a(m.group(2), m.group(1)), E(s)))

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
HX_LINK = '<link rel="stylesheet" href="/assets/css/hurfi-pages.css?v=20261020a">'

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

def hero(kicker, h1, lead, cta=('Book a Consultation', '/book-consultation/'), note=None, meta=None, cta2=None):
    n = '\n        <p class="hx-hero-note">%s</p>' % md(note) if note else ''
    m = '\n        <p class="hx-meta">%s</p>' % meta if meta else ''
    if cta2:
        btn = '<div class="cta-row hx-cta-row"><a class="btn" href="%s">%s</a><a class="btn btn-outline" href="%s">%s</a></div>' % (cta[1], E(cta[0]), cta2[1], E(cta2[0]))
    else:
        btn = '<a class="svc-cta" href="%s">%s <span aria-hidden="true">→</span></a>' % (cta[1], E(cta[0]))
    return f'''    <header class="about-hero hx-hero">
      <div class="container">
        <p class="about-kicker">{E(kicker)}</p>
        <h1>{E(h1)}</h1>
        <p class="about-hero-lead">{md(lead)}</p>{m}{n}
        {btn}
      </div>
    </header>
'''

_ids = {}
def sid(base):
    base = re.sub(r'[^a-z0-9]+', '-', base.lower()).strip('-')[:40] or 'sec'
    if base[0].isdigit():
        base = 's-' + base
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
def build_cities(cities, ins=None):
    for c in cities.values():
        if c.get('v') == 2:
            build_city2(c, cities, ins)
            continue
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
        srcs = ''.join('        <li id="src-%s"><span class="hx-src-n">[%d]</span> %s. <a href="%s" target="_blank" rel="noopener" lang="zh-Hans">%s</a>. Checked %s.</li>\n'
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
        if c['slug'] in V1_LINKS:
            sib, gds = V1_LINKS[c['slug']]
            main += f'''    <section class="brief hx-related-block" aria-labelledby="related-title">
      <h2 id="related-title">Related city guides and insights</h2>
      <div class="hx-related-cols">
        <div><h3>Other city guides</h3>{link_list([(cities[x]['city'], '/locations/china/%s/' % x) for x in sib if x in cities] + [('All city guides', '/locations/#city-guides')])}</div>
        <div><h3>Guides</h3>{link_list([(ins[x]['h1'], '/insights/%s/' % x) for x in gds if x in ins] + [('All insights', '/insights/')])}</div>
      </div>
    </section>
'''
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
def build_insights(ins, cities=None):
    hub = ins['_hub']
    arts = [ins[k] for k in ins if k != '_hub']
    reset_ids()
    bc = [('Home', '/'), ('Insights', '/insights/')]
    grid = '      <div class="ind-grid">\n' + ''.join(
        '        <a class="ind-card" href="/insights/%s/"><h3>%s</h3><p>%s</p><span class="ind-go" aria-hidden="true">→</span></a>\n' % (a['slug'], E(a['h1']), E(a['description'])) for a in arts) + '      </div>\n'
    main = hero('Insights', hub['h1'], hub['lead'], cta2=('Contact us', '/contact/')) + crumbs_nav(bc) + '    <section class="brief" aria-labelledby="list-title">\n      <h2 id="list-title">Guides</h2>\n' + grid + '    </section>\n'
    if cities:
        main += '    <section class="brief" aria-labelledby="hubcity-title">\n      <h2 id="hubcity-title">City guides</h2>\n      <p>Guides to the main industries of Chinese manufacturing cities, based on official statistics, and what they mean for an export website.</p>\n      ' + link_list(city_guides(cities)).replace('hx-linklist', 'hx-linklist hx-linklist-inline') + '\n      <p><a class="desk-link" href="/locations/#city-guides">All city guides</a> · <a class="desk-link" href="/locations/china/">China directory</a> · <a class="desk-link" href="/industries/">All industries</a></p>\n    </section>\n'
        main += cta_band('Not sure where to start?', 'Book a free consultation and we will tell you which of these guides matter most for your website.', 'hubcta-title')
    ld = [org_ld(), crumbs_ld(bc), {"@context": "https://schema.org", "@type": "CollectionPage", "name": hub['h1'], "url": SITE + "/insights/", "description": hub['description'], "inLanguage": "en",
          "hasPart": [{"@type": "Article", "headline": a['h1'], "url": SITE + "/insights/%s/" % a['slug']} for a in arts]}]
    wr('insights/index.html', page(dict(title=hub['title'], description=hub['description'], path='/insights/', data_page='insights', ld=ld), main))
    for a in arts:
        if a.get('v') == 2:
            build_insight2(a, ins, cities)
            continue
        reset_ids()
        path = '/insights/%s/' % a['slug']
        bc = [('Home', '/'), ('Insights', '/insights/'), (a['h1'], path)]
        secs = ''.join(section(s, 'hx-article-sec') for s in a['sections'])
        toc = ''.join('<li><a href="#%s">%s</a></li>' % (sid_peek(s), E(plain(s['h2']))) for s in a['sections'])
        others = [ins[x] for x in V1_RELATED.get(a['slug'], []) if x in ins] or [o for o in arts if o is not a][:5]
        rel = ''.join('<li><a href="/insights/%s/">%s</a></li>' % (o['slug'], E(o['h1'])) for o in others) + '<li><a href="/insights/">All insights</a></li>'
        v1s, v1c = V1_INSIGHT_LINKS.get(a['slug'], ([], []))
        rel_more = ''
        if v1s:
            rel_more += '\n        <p class="hx-toc-title">Industries</p>\n        <ul>%s</ul>' % ''.join('<li><a href="/industries/%s/">%s</a></li>' % (x, E(sector_names()[x])) for x in v1s)
        if v1c:
            rel_more += '\n        <p class="hx-toc-title">City guides</p>\n        <ul>%s<li><a href="/locations/#city-guides">All city guides</a></li></ul>' % ''.join('<li><a href="/locations/china/%s/">%s</a></li>' % (x, E(cities[x]['city'])) for x in v1c if x in cities)
        date_h = human_date(a['published'])
        main = hero('Insights', a['h1'], a['lead'], meta='By the Hurfi team · <time datetime="%s">%s</time>' % (a['published'], date_h)) + crumbs_nav(bc)
        main += f'''    <div class="hx-article">
      <nav class="hx-toc" aria-label="On this page"><p class="hx-toc-title">On this page</p><ol>{toc}</ol></nav>
      <article class="hx-article-body">
{secs}      </article>
      <aside class="hx-related" aria-label="Related">
        <p class="hx-toc-title">Related guides</p>
        <ul>{rel}</ul>{rel_more}
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
    b = re.sub(r'[^a-z0-9]+', '-', plain(s['h2']).lower()).strip('-')[:40]
    return 's-' + b if b[:1].isdigit() else b

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
CSM, ISM, INS = {}, {}, {}
def build_sectors(sectors, cities, ins=None):
    CSM.update(city_sector_map(cities)); INS.update(ins or {}); ISM.update(insight_sector_map(ins or {}))
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
        cl += [cty for cty in CSM.get(x['slug'], []) if cty not in cl]
        links = [('[%s](/locations/china/%s/)' % (PILOT[cty], cty)) for cty in cl]
        p2 = []
        if links:
            p2.append('Official statistics point to this sector among the main industries of ' + (', '.join(links[:-1]) + ' and ' + links[-1] if len(links) > 1 else links[0]) + '. Our city pages explain what that means for a manufacturer’s website.')
        p2.append('For a practical starting point, read [what overseas buyers check on a factory website](/insights/factory-website-trust-signals/) or the [RFQ checklist](/insights/manufacturer-website-rfq-checklist/).')
        il = [k for k in ISM.get(x['slug'], [])]
        if il:
            p2.append('More guides for this sector: ' + '; '.join('[%s](/insights/%s/)' % (INS[k]['h1'], k) for k in il) + '.')
        p2.append('Browse all [city guides](/locations/#city-guides) or the [China directory](/locations/china/).')
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

REGIONS = [('Pearl River Delta (Guangdong)', ['shenzhen', 'guangzhou', 'dongguan', 'zhongshan']),
           ('Yangtze River Delta and Anhui', ['shanghai', 'suzhou', 'wuxi', 'changzhou', 'hangzhou', 'ningbo', 'hefei']),
           ('Fujian', ['xiamen', 'quanzhou']),
           ('North, central and western China', ['tianjin', 'wuhan', 'xian'])]

def build_locations(pg, cities):
    l = pg['locations']
    s = rd('locations/index.html')
    s = set_head(s, l['title'], l['description'])
    s = s.replace('<header class="about-hero">', '<header class="about-hero hx-hero">', 1)
    s = s.replace('<h1>Locations</h1>', '<h1>China manufacturing regions we serve</h1>', 1)
    body = '    <section class="brief" id="city-guides" aria-labelledby="cityguide-title">\n      <h2 id="cityguide-title">City guides</h2>\n      <p>Guides for manufacturers in %d Chinese cities, based on official industry statistics. Hurfi’s China office is in Xi’an; we work with manufacturers in the other cities remotely, and we do not have local offices there.</p>\n' % len(cities)
    seen = set()
    for name, slugs in REGIONS:
        cs = [cities[x] for x in slugs if x in cities]
        seen.update(c['slug'] for c in cs)
        body += '      <h3 class="hx-region">%s</h3>\n      <div class="ind-grid">\n' % E(name) + ''.join('        <a class="ind-card" href="/locations/china/%s/"><h3>%s</h3><p>%s · city guide</p><span class="ind-go" aria-hidden="true">→</span></a>\n' % (c['slug'], E(c['city']), E(c['province'])) for c in cs) + '      </div>\n'
    assert seen == set(cities), set(cities) - seen
    body += '      <p><a class="desk-link" href="/locations/china/">Full China directory</a> · <a class="desk-link" href="/insights/">Insights for exporters</a></p>\n    </section>\n'
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
        if a in s:
            i = s.index(a); j = s.index('</article>', i)
            card = s[i:j]
            if 'hx-cityguide' not in card:
                card = card.rstrip() + '\n          <p class="hx-cityguide"><a href="/locations/china/%s/">%s city guide <span aria-hidden="true">→</span></a></p>\n        ' % (c['slug'], E(c['city']))
                s = s[:i] + card + s[j:]
        else:
            a = '<li id="%s">' % c['anchor']
            i = s.index(a); j = s.index('</li>', i)
            if 'hx-cityguide' not in s[i:j]:
                s = s[:j] + '<p class="hx-cityguide"><a href="/locations/china/%s/">%s city guide <span aria-hidden="true">→</span></a></p>' % (c['slug'], E(c['city'])) + s[j:]
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

# ---------------------------------------------------------------- batch 4: shared helpers
SRC = None
def sources():
    global SRC
    if SRC is None:
        SRC = load('sources.json')
    return SRC

SECTOR_NAMES = None
def sector_names():
    global SECTOR_NAMES
    if SECTOR_NAMES is None:
        hub = rd('industries/index.html')
        SECTOR_NAMES = {sl: html.unescape(n) for sl, n in re.findall(r'<a class="ind-card" href="/industries/([a-z0-9-]+)/"><h3>([^<]+)</h3>', hub)}
        SECTOR_NAMES['oem-odm'] = 'OEM & ODM Manufacturing'
    return SECTOR_NAMES

SVC_KEYS = [('Website Development', 'website-development', '外贸网站建设'), ('SEO', 'seo', '谷歌 SEO'),
            ('Digital Marketing', 'digital-marketing', '海外数字营销'), ('Social Media Management', 'social-media-management', '领英与社交媒体运营')]

def services_block(title, notes, lead=None, extra=None):
    out = '    <section class="brief hx-svc" aria-labelledby="svc-title">\n      <h2 id="svc-title">%s</h2>\n' % E(title)
    if lead:
        out += '      <p>%s</p>\n' % md(lead)
    if extra:
        out += ul(extra)
    out += '      <div class="brief-grid">\n'
    for (name, key, zh), note in zip(SVC_KEYS, notes):
        out += '        <article class="brief-card"><h3><a href="/services/%s/">%s</a></h3><p>%s</p><p class="hx-svc-zh"><a href="/zh/services/%s/" lang="zh-Hans" hreflang="zh-Hans">中文：%s</a></p></article>\n' % (key, E(name), md(note), key, zh)
    return out + '      </div>\n    </section>\n'

def cta_band(title, text, ident):
    return f'''    <section class="brief hx-cta-band" aria-labelledby="{ident}">
      <h2 id="{ident}">{E(title)}</h2>
      <p>{md(text)}</p>
      <div class="cta-row hx-cta-row"><a class="btn" href="/book-consultation/">Book a Consultation</a><a class="btn btn-outline" href="/contact/">Contact us</a></div>
    </section>
'''

def figure(src, alt, caption, w=1200, h=675):
    return f'''      <figure class="hx-figure">
        <img src="{src}" alt="{E(alt)}" width="{w}" height="{h}" loading="lazy" decoding="async">
        <figcaption>{md(caption)}</figcaption>
      </figure>
'''

PROCESS = [('Free consultation', 'We look at your current website, products and target markets, and tell you what we would fix first.'),
           ('Plan', 'We agree the first pages, searches and channels, and what will be measured.'),
           ('Build and write', 'We draft pages with your team; you approve every technical claim before it goes live.'),
           ('Measure and improve', 'We report from your own Search Console and analytics, and adjust the plan from the data.')]

def process_block(ident='process-title'):
    li = ''.join('        <li><strong>%s.</strong> %s</li>\n' % (E(t), E(b)) for t, b in PROCESS)
    return f'''    <section class="brief hx-prose" aria-labelledby="{ident}">
      <h2 id="{ident}">How we work</h2>
      <ol class="hx-list hx-steps">
{li}      </ol>
    </section>
'''

def sources_block(ids, intro, refs, back=None):
    S = sources()
    li = ''
    for i in ids:
        s = S[i]
        lang = ' lang="%s"' % s['lang'] if s.get('lang') and s['lang'] != 'en' else ''
        li += '        <li id="src-%s"><span class="hx-src-n">[%d]</span> %s. <a href="%s" target="_blank" rel="noopener"%s>%s</a>. Checked %s.</li>\n' % (i, refs[i], E(s['publisher']), E(s['url']), lang, E(s['label']), E(s['checked']))
    b = '      <p>%s</p>\n' % back if back else ''
    return f'''    <section class="brief hx-sources" aria-labelledby="src-title">
      <h2 id="src-title">Sources</h2>
      <p>{E(intro)}</p>
      <ol class="hx-src-list">
{li}      </ol>
{b}    </section>
'''

def link_list(items):
    return '<ul class="hx-linklist">%s</ul>' % ''.join('<li><a href="%s">%s</a></li>' % (u, E(n)) for n, u in items)

CITY_ALL = None
def city_guides(cities):
    return [(c['city'], '/locations/china/%s/' % c['slug']) for c in cities.values()]

# ---------------------------------------------------------------- batch 4: rich city pages
def build_city2(c, cities, ins):
    reset_ids()
    S = sources()
    path = '/locations/china/%s/' % c['slug']
    bc = [('Home', '/'), ('Locations', '/locations/'), ('China', '/locations/china/'), (c['city'], path)]
    refs = {sid: n + 1 for n, sid in enumerate(c['sources'])}
    facts = ''
    for text, ids in c['facts']:
        sup = ''.join('<sup><a href="#src-%s" aria-label="Source %d">[%d]</a></sup>' % (x, refs[x], refs[x]) for x in ids)
        facts += '        <li>%s%s</li>\n' % (md(text), sup)
    city = E(c['city'])
    def flist(items):
        out = ''
        for text, ids in items:
            sup = ''.join('<sup><a href="#src-%s" aria-label="Source %d">[%d]</a></sup>' % (x, refs[x], refs[x]) for x in ids)
            out += '        <li>%s%s</li>\n' % (md(text), sup)
        return out
    deep = 'zones' in c
    toc = [('ctx-title', 'Official figures'), ('clusters-title', 'Industries')]
    if deep:
        toc += [('zones-title', 'Zones and districts'), ('logi-title', 'Ports, logistics and fairs'), ('exp-title', 'Export markets'), ('chal-title', 'Online challenges')]
    toc += [('buyerq-title', 'Buyer questions'), ('play-title', 'Playbook'),
           ('svc-title', 'How Hurfi helps'), ('rk-faq-title', 'FAQ'), ('related-title', 'Related pages'), ('src-title', 'Sources')]
    main = hero('China · ' + c['province'] if c['province'] != c['city'] else 'China · ' + c['city'], c['h1'], c['lead'], note=c['remote'],
                cta2=('Contact us', '/contact/')) + crumbs_nav(bc)
    main += '    <nav class="brief hx-onpage" aria-label="On this page"><p class="hx-toc-title">On this page</p><ul>%s</ul></nav>\n' % ''.join('<li><a href="#%s">%s</a></li>' % (i, E(t)) for i, t in toc)
    tiles = '; '.join('%s %s' % (b, l) for b, l in c['tiles'])
    img = '/assets/img/guides/city-%s.webp' % c['slug']
    main += f'''    <section class="brief hx-prose" aria-labelledby="ctx-title">
      <h2 id="ctx-title">What {city} makes, according to official data</h2>
      <p>{md(c['context_intro'])}</p>
      <ul class="hx-list">
{facts}      </ul>
      <p>{md(c['context_after'])}</p>
{figure(img, 'Infographic of four 2025 official figures for %s: %s.' % (c['city'], tiles), 'Infographic by Hurfi, drawn from the official sources listed below (%s). Figures describe the city, not any Hurfi client.' % c['srcline'])}    </section>
'''
    cl = ''.join('        <article class="brief-card"><h3><a href="%s">%s</a></h3><p>%s</p></article>\n' % (u, E(t), md(b)) for t, b, u in c['clusters'])
    main += f'''    <section class="brief" aria-labelledby="clusters-title">
      <h2 id="clusters-title">{city}’s main industries and what buyers compare</h2>
      <p>The clusters below follow the official figures above. Each links to our page for that industry.</p>
      <div class="brief-grid">
{cl}      </div>
    </section>
'''
    if deep:
        main += f'''    <section class="brief hx-prose" aria-labelledby="zones-title">
      <h2 id="zones-title">Industrial zones and districts in {city}</h2>
      <ul class="hx-list">
{flist(c['zones'])}      </ul>
      <p>{md(c['zones_note'])}</p>
    </section>
    <section class="brief hx-prose" aria-labelledby="logi-title">
      <h2 id="logi-title">Ports, logistics and trade fairs</h2>
      <ul class="hx-list">
{flist(c['logistics'])}      </ul>
      <p>Buyers comparing suppliers ask how goods will reach them, how long it takes and on what trade terms. Shipping ports, typical lead times and Incoterms on your website answer that before it is asked.</p>
    </section>
    <section class="brief hx-prose" aria-labelledby="exp-title">
      <h2 id="exp-title">Export profile, typical products and buyer markets</h2>
      <ul class="hx-list">
{flist(c['exports'])}      </ul>
      <p>{md(c['markets'])}</p>
    </section>
    <section class="brief hx-prose" aria-labelledby="chal-title">
      <h2 id="chal-title">Challenges {city} manufacturers face online</h2>
      <p>These are common problems on manufacturers’ export websites, tied to the industry mix above. They are general observations, not statistics about {city}.</p>
      <ul class="hx-list">
''' + ''.join('        <li>%s</li>\n' % md(x) for x in c['challenges']) + '''      </ul>
    </section>
'''
    bq = ''.join('        <article class="brief-card"><h3>%s</h3><p>%s</p></article>\n' % (E(q), md(a)) for q, a in c['buyer_q'])
    main += f'''    <section class="brief" aria-labelledby="buyerq-title">
      <h2 id="buyerq-title">Questions overseas buyers ask {city} suppliers</h2>
      <p>These are typical questions in a first exchange with an overseas buyer, and what your website can show so the answer is already there.</p>
      <div class="brief-grid">
{bq}      </div>
    </section>
'''
    pb = ''.join('        <li>%s</li>\n' % md(x) for x in c['playbook'])
    main += f'''    <section class="brief hx-prose" aria-labelledby="play-title">
      <h2 id="play-title">A website, SEO and RFQ playbook for {city} manufacturers</h2>
      <ol class="hx-list">
{pb}      </ol>
    </section>
'''
    main += cta_band('Want this mapped to your factory?', 'Book a free consultation and we will look at your current site, products and markets, and suggest which of these steps to take first. Prefer to write first? Use the contact form.', 'midcta-title')
    main += services_block('How Hurfi helps %s manufacturers' % c['city'], c['svc'], extra=c['help'])
    main += process_block()
    main += faq_block(c['faq'], title='Questions from %s manufacturers' % c['city'])
    sn = sector_names()
    sect = [(sn[x], '/industries/%s/' % x) for x in c['sectors']]
    sib = [(cities[x]['city'], '/locations/china/%s/' % x) for x in c['siblings'] if x in cities]
    gd = [(ins[x]['h1'], '/insights/%s/' % x) for x in c['insights'] if x in ins]
    main += f'''    <section class="brief hx-related-block" aria-labelledby="related-title">
      <h2 id="related-title">Related industries, cities and guides</h2>
      <div class="hx-related-cols">
        <div><h3>Industries</h3>{link_list(sect)}</div>
        <div><h3>Other city guides</h3>{link_list(sib + [('All city guides', '/locations/#city-guides')])}</div>
        <div><h3>Guides</h3>{link_list(gd + [('All insights', '/insights/')])}</div>
      </div>
      <p><a class="desk-link" href="/locations/china/#{c['anchor']}">{city} in the China directory</a></p>
    </section>
'''
    main += sources_block(c['sources'], 'Figures are quoted from the official sources below and were checked on the date shown. They describe the city, not any Hurfi client. Guidance links are to the publisher’s own documentation.', refs)
    main += cta_band('Talk to us about %s' % c['city'], 'A first consultation is free and there is no obligation. Tell us what you make and where you want to sell.', 'endcta-title')
    ld = [org_ld(), crumbs_ld(bc),
          {"@context": "https://schema.org", "@type": "WebPage", "name": c['h1'], "url": SITE + path, "description": c['description'], "inLanguage": "en",
           "isPartOf": {"@type": "WebSite", "name": "Hurfi", "url": SITE + "/"}, "about": {"@type": "City", "name": c['city'], "containedInPlace": {"@type": "AdministrativeArea", "name": (c['province'] + ", China") if c['province'] != c['city'] else "China"}},
           "primaryImageOfPage": {"@type": "ImageObject", "url": SITE + img, "width": 1200, "height": 675},
           "provider": {"@id": SITE + "/#organization"}, "dateModified": TODAY},
          faq_ld(c['faq'])]
    wr(path.strip('/') + '/index.html', page(dict(title=c['title'], description=c['description'], path=path, data_page='location', ld=ld), main))
    import images
    images.city(os.path.join(ROOT, img.lstrip('/')), c['city'], c['province'], c['tiles'], c['srcline'])

# ---------------------------------------------------------------- batch 4: rich insight pages
def build_insight2(a, ins, cities):
    reset_ids()
    path = '/insights/%s/' % a['slug']
    bc = [('Home', '/'), ('Insights', '/insights/'), (a['h1'], path)]
    refs = {sid: n + 1 for n, sid in enumerate(a['sources'])}
    img = '/assets/img/guides/insight-%s.webp' % a['slug']
    secs = ''
    for n, s in enumerate(a['sections']):
        secs += section(s, 'hx-article-sec')
        if n == 0:
            secs += figure(img, 'Diagram of the steps covered in this guide: ' + '; '.join('%d. %s' % (i + 1, t) for i, t in enumerate(a['steps'])) + '.', 'Diagram by Hurfi summarising this guide.')
        if n == a.get('mid_after', 2):
            secs += cta_band('Want a second opinion on your site?', 'Book a free consultation and we will review your website against this guide, or send us a question through the contact form.', 'midcta-title').replace('<section class="brief hx-cta-band"', '<section class="hx-cta-band hx-cta-inline"')
    toc_items = [(sid_peek(s), plain(s['h2'])) for s in a['sections']] + [('svc-title', 'How Hurfi helps'), ('rk-faq-title', 'Common questions'), ('src-title', 'Sources')]
    toc = ''.join('<li><a href="#%s">%s</a></li>' % (i, E(t)) for i, t in toc_items)
    sn = sector_names()
    rel = ''.join('<li><a href="/insights/%s/">%s</a></li>' % (x, E(ins[x]['h1'])) for x in a['related'] if x in ins)
    sect = ''.join('<li><a href="/industries/%s/">%s</a></li>' % (x, E(sn[x])) for x in a['sectors'])
    cty = ''.join('<li><a href="/locations/china/%s/">%s</a></li>' % (x, E(cities[x]['city'])) for x in a['cities'] if x in cities)
    date_h = human_date(a['published'])
    main = hero('Insights', a['h1'], a['lead'], meta='By the Hurfi team · <time datetime="%s">%s</time>' % (a['published'], date_h), cta2=('Contact us', '/contact/')) + crumbs_nav(bc)
    main += f'''    <div class="hx-article">
      <nav class="hx-toc" aria-label="On this page"><p class="hx-toc-title">On this page</p><ol>{toc}</ol></nav>
      <article class="hx-article-body">
{secs}      </article>
      <aside class="hx-related" aria-label="Related">
        <p class="hx-toc-title">Related guides</p>
        <ul>{rel}<li><a href="/insights/">All insights</a></li></ul>
        <p class="hx-toc-title">Industries</p>
        <ul>{sect}</ul>
        <p class="hx-toc-title">City guides</p>
        <ul>{cty}<li><a href="/locations/#city-guides">All city guides</a></li></ul>
        <p><a class="svc-cta" href="/book-consultation/">Book a Consultation <span aria-hidden="true">→</span></a></p>
      </aside>
    </div>
'''
    main += services_block('How Hurfi helps with this', a['svc'], lead='Hurfi offers four services for manufacturers selling abroad. Here is how each one relates to this guide.')
    main += faq_block(a['faq'], title='Common questions')
    main += sources_block(a['sources'], 'External guidance quoted in this article, checked on the date shown. Links open the publisher’s own page.', refs)
    main += cta_band('Put this guide to work', 'A first consultation is free. We will look at your site and tell you which parts of this guide matter most for you.', 'endcta-title')
    ld = [org_ld(), crumbs_ld(bc),
          {"@context": "https://schema.org", "@type": "WebPage", "@id": SITE + path, "name": a['h1'], "url": SITE + path, "description": a['description'], "inLanguage": "en",
           "isPartOf": {"@type": "WebSite", "name": "Hurfi", "url": SITE + "/"}, "primaryImageOfPage": {"@type": "ImageObject", "url": SITE + img, "width": 1200, "height": 675}, "dateModified": a.get('modified', a['published'])},
          {"@context": "https://schema.org", "@type": "Article", "headline": a['h1'], "description": a['description'], "url": SITE + path, "mainEntityOfPage": SITE + path,
           "datePublished": a['published'], "dateModified": a.get('modified', a['published']), "inLanguage": "en", "image": SITE + img,
           "author": {"@type": "Organization", "name": "Hurfi", "url": SITE + "/"}, "publisher": {"@id": SITE + "/#organization"}},
          faq_ld(a['faq'])]
    wr(path.strip('/') + '/index.html', page(dict(title=a['title'], description=a['description'], path=path, data_page='insight', og_type='article', ld=ld), main))
    import images
    images.steps(os.path.join(ROOT, img.lstrip('/')), a['h1'], a['steps'])

# reverse maps used by hubs, sectors and services
def city_sector_map(cities):
    m = {}
    for c in cities.values():
        for x in c.get('sectors', []):
            m.setdefault(x, []).append(c['slug'])
    return m

def insight_sector_map(ins):
    m = {}
    for k, a in ins.items():
        if k == '_hub':
            continue
        for x in a.get('sectors', []):
            m.setdefault(x, []).append(k)
    return m

def build_sector_links(sectors, cities, ins):
    """'City guides and insights' block on every industry page (including those without enriched content)."""
    cm, im = city_sector_map(cities), insight_sector_map(ins)
    for x in cities.values():
        if x.get('v') != 2:
            for sl in x.get('_sectors_v1', []):
                pass
    for sl in sorted(set(sector_names()) - set(sectors)):
        rel = 'industries/%s/index.html' % sl
        if not os.path.exists(os.path.join(ROOT, rel)):
            continue
        cl = cm.get(sl, []); il = im.get(sl, [])
        if not cl and not il:
            continue
        s = rd(rel)
        reset_ids()
        p = []
        if cl:
            p.append('City guides for places where official statistics point to this industry: ' + ', '.join('[%s](/locations/china/%s/)' % (cities[c]['city'], c) for c in cl) + '.')
        if il:
            p.append('Related guides: ' + '; '.join('[%s](/insights/%s/)' % (ins[k]['h1'], k) for k in il) + '.')
        p.append('Browse all [city guides](/locations/#city-guides) or the [China directory](/locations/china/).')
        body = section(dict(h2='City guides and insights for this industry', p=p, id='sector-cities'))
        s = set_block(s, 'sector-cities', body, before='    <p class="brief"><a class="desk-link" href="/industries/">All industries</a></p>')
        s = add_hx_css(s)
        wr(rel, s)

SERVICE_GUIDES = {
 'website-development': ['manufacturer-website-rfq-checklist', 'industrial-product-page-seo', 'export-website-speed-for-overseas-buyers', 'factory-website-trust-signals'],
 'seo': ['international-seo-checklist-for-exporters', 'ai-search-for-manufacturers', 'industrial-product-page-seo', 'choosing-an-export-marketing-agency'],
 'digital-marketing': ['google-ads-for-exporters', 'overseas-buyer-inquiries', 'trade-show-follow-up-for-manufacturers', 'choosing-an-export-marketing-agency'],
 'social-media-management': ['linkedin-for-factory-export-sales', 'trade-show-follow-up-for-manufacturers', 'factory-website-trust-signals'],
}
SERVICE_CITIES = ['shenzhen', 'guangzhou', 'shanghai', 'suzhou', 'hangzhou', 'ningbo', 'wuhan', 'xian']

def build_service_links(ins, cities):
    for key, guides in SERVICE_GUIDES.items():
        rel = 'services/%s/index.html' % key
        s = rd(rel)
        reset_ids()
        g = '; '.join('[%s](/insights/%s/)' % (ins[k]['h1'], k) for k in guides if k in ins)
        cl = ', '.join('[%s](/locations/china/%s/)' % (cities[c]['city'], c) for c in SERVICE_CITIES if c in cities)
        body = section(dict(h2='Related guides and city pages', p=['Guides: ' + g + '.', 'City guides for manufacturers in ' + cl + ', and [all city guides](/locations/#city-guides).'], id='service-guides'))
        s = set_block(s, 'service-guides', body, before='    <section class="brief" aria-labelledby="other-title">')
        wr(rel, s)

V1_LINKS = {
 'shenzhen': (['guangzhou', 'dongguan', 'zhongshan', 'xiamen'], ['factory-website-trust-signals', 'industrial-product-page-seo', 'linkedin-for-factory-export-sales']),
 'dongguan': (['shenzhen', 'guangzhou', 'zhongshan', 'quanzhou'], ['manufacturer-website-rfq-checklist', 'trade-show-follow-up-for-manufacturers', 'industrial-product-page-seo']),
 'wuxi': (['suzhou', 'changzhou', 'shanghai', 'hangzhou'], ['industrial-product-page-seo', 'international-seo-checklist-for-exporters', 'manufacturer-website-rfq-checklist']),
 'hefei': (['wuhan', 'changzhou', 'hangzhou', 'shanghai'], ['international-seo-checklist-for-exporters', 'ai-search-for-manufacturers', 'overseas-buyer-inquiries']),
}
V1_INSIGHT_LINKS = {
 'overseas-buyer-inquiries': (['electronics-semiconductor', 'industrial-machinery-cnc', 'oem-odm'], ['guangzhou', 'shenzhen', 'dongguan', 'xian']),
 'factory-website-trust-signals': (['precision-manufacturing-components', 'industrial-machinery-cnc', 'medical-devices-diagnostics'], ['shenzhen', 'xiamen', 'zhongshan', 'shanghai']),
 'manufacturer-website-rfq-checklist': (['precision-manufacturing-components', 'industrial-machinery-cnc', 'electronics-semiconductor'], ['suzhou', 'ningbo', 'dongguan', 'wuxi']),
}
V1_RELATED = {
 'overseas-buyer-inquiries': ['factory-website-trust-signals', 'manufacturer-website-rfq-checklist', 'google-ads-for-exporters', 'linkedin-for-factory-export-sales', 'trade-show-follow-up-for-manufacturers'],
 'factory-website-trust-signals': ['manufacturer-website-rfq-checklist', 'overseas-buyer-inquiries', 'industrial-product-page-seo', 'export-website-speed-for-overseas-buyers'],
 'manufacturer-website-rfq-checklist': ['factory-website-trust-signals', 'industrial-product-page-seo', 'overseas-buyer-inquiries', 'international-seo-checklist-for-exporters'],
}

def main():
    sectors, cities, ins, zh, pg = load('sectors.json'), load('cities.json'), load('insights.json'), load('zh.json'), load('pages.json')
    build_cities(cities, ins)
    build_sectors(sectors, cities, ins)
    build_oem(pg)
    build_sector_links(sectors, cities, ins)
    build_services(pg)
    build_service_links(ins, cities)
    build_home(pg)
    build_locations(pg, cities)
    build_china(cities)
    build_industries_hub()
    build_insights(ins, cities)
    build_zh(zh)

if __name__ == '__main__':
    main()
