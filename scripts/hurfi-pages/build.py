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
    # every Book a Consultation link lands on the form heading (#book-form)
    out = out.replace('href="/book-consultation/"', 'href="/book-consultation/#book-form"')
    with open(p, 'w', encoding='utf-8', newline='') as f:
        f.write(out)
    print('wrote', rel)

E = lambda s: html.escape(s, quote=True)
LINK = re.compile(r'\[([^\]]+)\]\(([^)\s]+)\)')

def _a(url, text):
    if url.startswith('http'):
        rel = 'sponsored noopener' if 'REFERRALCODE=' in url else 'noopener'  # referral/affiliate links
        return '<a href="%s" target="_blank" rel="%s">%s</a>' % (url, rel, text)
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
from navdata import VER as _VER
HX_LINK = '<link rel="stylesheet" href="/assets/css/hurfi-pages.css?v=%s">' % _VER

ORG_ID, WEBSITE_ID = SITE + '/#organization', SITE + '/#website'
# same membership as the Hostinger Agency Partner badge
HOSTINGER_MEMBER = {"@type": "ProgramMembership", "programName": "Hostinger Partner Program",
                    "url": "https://www.hostinger.com/partner-program",
                    "hostingOrganization": {"@type": "Organization", "name": "Hostinger", "url": "https://www.hostinger.com"}}
LOGO = SITE + '/assets/img/hurfi-icon.png'  # 447x447 raster, the one logo used in all JSON-LD

def schema_data():
    """Parse assets/js/schema-data.js (window.HURFI_SCHEMA = {key: {json}, ...};) into a dict."""
    js = rd('assets/js/schema-data.js')
    body = js[js.index('window.HURFI_SCHEMA = ') + len('window.HURFI_SCHEMA = '):].strip().rstrip(';')
    return json.loads(re.sub(r'^  (\w+): ', r'"\1": ', body, flags=re.M))

def _with_id(node, node_id):
    node = dict(node)
    ctx, typ = node.pop('@context', None), node.pop('@type')
    head = ([('@context', ctx)] if ctx else []) + [('@type', typ), ('@id', node_id)]
    return dict(head + list(node.items()))

# The one full Organization, emitted (identically) on every page that has JSON-LD; everything else
# points at it by @id. Data comes from schema-data.js.
_sd_org = dict(schema_data()['organization'])
_sd_org.pop('@context')
ORG = _with_id(_sd_org, ORG_ID)
ORG['logo'] = LOGO
ORG['memberOf'] = HOSTINGER_MEMBER

def org_ld():
    return dict({"@context": "https://schema.org"}, **ORG)

def crumbs_ld(items):
    return {"@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + u} for i, (n, u) in enumerate(items)]}

def faq_ld(faq):
    return {"@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": plain(q), "acceptedAnswer": {"@type": "Answer", "text": plain(a)}} for q, a in faq]}

# GA4 Google tag, exactly as on every live page (right after <head>)
GTAG = """<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-T8MMZH7KBP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-T8MMZH7KBP');
</script>
"""

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
{GTAG}  <meta charset="UTF-8">
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

# Hostinger Agency Partner placements on the Chinese pages (same markup as the live pages)
ZH_PARTNER_PILL = '        <p><a class="rk-hero-partner rk-hero-partner--inline" href="https://www.hostinger.com?REFERRALCODE=DSZYASIRA579" target="_blank" rel="sponsored noopener">\n          <img src="/assets/img/partners/hostinger-partner-brand-dark.svg" alt="Hostinger 合作伙伴徽章" width="72" height="27" decoding="async">\n          <span class="rk-hero-partner-text"><strong>Hostinger® 官方合作伙伴机构</strong><span class="rk-hero-partner-sub"><span aria-hidden="true"> · </span>我们托管的网站享有 Hostinger 优先技术支持</span></span>\n        </a></p>\n'
ZH_PARTNER_WD = '    <section class="hx-partner" aria-labelledby="hx-partner-title">\n      <div class="hx-partner-card">\n        <a class="hx-partner-badge" href="https://www.hostinger.com?REFERRALCODE=DSZYASIRA579" target="_blank" rel="sponsored noopener"><img src="/assets/img/partners/hostinger-partner-brand-dark.svg" alt="Hostinger 官方合作伙伴机构徽章（Official Hostinger Agency Partner）" width="160" height="60" loading="lazy" decoding="async"></a>\n        <div class="hx-partner-copy">\n          <p class="hx-partner-kicker">主机托管</p>\n          <h2 id="hx-partner-title">由 Hostinger® 官方合作伙伴机构提供主机托管</h2>\n          <p>Hurfi 是 Hostinger® 合作伙伴计划（Hostinger Partner Program）经过认证的成员。我们建设的网站可以托管在 Hostinger 上，由我们的团队完成部署；作为合作伙伴，我们享有 Hostinger 的优先技术支持。</p>\n          <p class="hx-partner-link"><a href="https://www.hostinger.com?REFERRALCODE=DSZYASIRA579" target="_blank" rel="sponsored noopener">查看 Hostinger 为 Hurfi 提供的合作伙伴页面 <span aria-hidden="true">↗</span></a> <span class="hx-partner-note">推荐链接</span></p>\n        </div>\n      </div>\n    </section>\n\n'
ZH_PARTNER_FOOT = ('>Hostinger® 官方合作伙伴机构</a></p>', '>Hostinger® 官方合作伙伴机构（Official Hostinger Agency Partner）</a></p>')

def page(p, main):
    hdr, tail = HEADER, TAIL
    if p.get('lang', 'en').startswith('zh'):
        hdr = localize_zh(hdr).replace('data-lang="en" aria-pressed="true"', 'data-lang="en" aria-pressed="false"').replace('data-lang="zh" aria-pressed="false"', 'data-lang="zh" aria-pressed="true"')
        foot, scripts = tail.split('  </footer>', 1)
        tail = localize_zh(foot).replace(*ZH_PARTNER_FOOT) + '  </footer>' + scripts
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

def hero(kicker, h1, lead, cta=('Book a Consultation', '/book-consultation/#book-form'), note=None, meta=None, cta2=None):
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
        bc = city_crumbs(c, path)
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
            gds = list(dict.fromkeys(gds + c.get('insights', []) + ins_linking(ins, path)))
            pk = prov_of(c)
            pvl = [('%s province guide' % provinces()[pk]['name'], '/locations/china/%s/' % pk)] if pk else []
            main += f'''    <section class="brief hx-related-block" aria-labelledby="related-title">
      <h2 id="related-title">Related city guides and insights</h2>
      <div class="hx-related-cols">
        <div><h3>Province and city guides</h3>{link_list(pvl + [(cities[x]['city'], '/locations/china/%s/' % x) for x in sib if x in cities] + [('All city guides', '/locations/#city-guides')])}</div>
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
        others = [ins[x] for x in dict.fromkeys(V1_RELATED.get(a['slug'], []) + ins_linking(ins, '/insights/%s/' % a['slug'])) if x in ins] or [o for o in arts if o is not a][:5]
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
        <p><a class="svc-cta" href="/book-consultation/#book-form">Book a Consultation <span aria-hidden="true">→</span></a></p>
      </aside>
    </div>
'''
        if a.get('faq'):
            main += faq_block(a['faq'], title='Common questions')
        ld = [org_ld(), crumbs_ld(bc),
              {"@context": "https://schema.org", "@type": "Article", "headline": a['h1'], "description": a['description'], "url": SITE + path, "mainEntityOfPage": SITE + path,
               "datePublished": a['published'], "dateModified": a.get('modified', a['published']), "inLanguage": "en", "image": OG_IMAGE,
               "author": {"@id": SITE + "/#organization"}, "publisher": {"@id": SITE + "/#organization"}}]
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
        main = hero(z['kicker'], z['h1'], z['lead'], cta=('预约免费咨询', '/book-consultation/#book-form'),
                    note='本页为简体中文版。[查看英文版](%s)' % z['en']) + (crumbs_nav(bc, '面包屑导航') if key != 'home' else '')
        if key == 'home':  # partner pill right under the hero CTA
            cta = '        <a class="svc-cta" href="/book-consultation/#book-form">预约免费咨询 <span aria-hidden="true">→</span></a>\n'
            assert cta in main
            main = main.replace(cta, cta + ZH_PARTNER_PILL, 1)
        for n, s in enumerate(z['sections']):
            main += section(s, 'brief hx-prose' if not s.get('cards') else 'brief')
            if key == 'website-development' and n == 0:  # hosting partner block after the first section
                main += ZH_PARTNER_WD
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
            ld.append({"@context": "https://schema.org", "@type": "Service", "name": z['h1'], "serviceType": ZH_SVC[key], "url": SITE + z['path'], "description": z['description'],
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

REGIONS = [('Pearl River Delta (Guangdong)', ['shenzhen', 'guangzhou', 'dongguan', 'foshan', 'zhongshan', 'zhuhai', 'huizhou']),
           ('Yangtze River Delta and Anhui', ['shanghai', 'suzhou', 'nanjing', 'wuxi', 'changzhou', 'nantong', 'hangzhou', 'ningbo', 'wenzhou', 'jinhua', 'shaoxing', 'taizhou-zhejiang', 'jiaxing', 'hefei', 'wuhu']),
           ('Fujian', ['xiamen', 'quanzhou', 'fuzhou']),
           ('Bohai Rim and northeast China', ['beijing', 'tianjin', 'qingdao', 'jinan', 'yantai', 'weifang', 'dalian', 'shenyang']),
           ('Central and western China', ['wuhan', 'changsha', 'zhengzhou', 'chongqing', 'chengdu', 'xian'])]

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
    provs = provinces()
    if provs:
        body += '      <h3 class="hx-region" id="province-guides">Province guides</h3>\n      <p>Province guides summarise official figures, link to the city guides and profile smaller manufacturing cities from their own statistical bulletins.</p>\n      <div class="ind-grid">\n' + ''.join('        <a class="ind-card" href="/locations/china/%s/"><h3>%s</h3><p>Province guide · %d city guides</p><span class="ind-go" aria-hidden="true">→</span></a>\n' % (k, E(p['name']), len(p['guides'])) for k, p in provs.items()) + '      </div>\n'
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
            # a city that now has its own guide drops the earlier link to its province-hub profile
            li = re.sub(r'<p class="hx-cityguide"><a href="/locations/china/[a-z-]+/#hub-[a-z-]+">.*?</a></p>', '', s[i:j])
            s = s[:i] + li + s[j:]; j = i + len(li)
            if 'hx-cityguide' not in s[i:j]:
                s = s[:j] + '<p class="hx-cityguide"><a href="/locations/china/%s/">%s city guide <span aria-hidden="true">→</span></a></p>' % (c['slug'], E(c['city'])) + s[j:]
    for k, p in provinces().items():
        a = '<details class="cn-prov" id="%s">' % p['anchor']
        i = s.index(a); j = s.index('</summary>', i) + len('</summary>')
        if 'hx-provguide' not in s[j:j + 300]:
            s = s[:j] + '\n          <p class="hx-cityguide hx-provguide"><a href="/locations/china/%s/">%s province guide <span aria-hidden="true">→</span></a></p>' % (k, E(p['name'])) + s[j:]
        for c in p['smaller']:
            a = '<li id="%s">' % c['anchor']
            i = s.index(a); j = s.index('</li>', i)
            if 'hx-cityguide' not in s[i:j]:
                s = s[:j] + '<p class="hx-cityguide"><a href="/locations/china/%s/#hub-%s">%s in the %s guide <span aria-hidden="true">→</span></a></p>' % (k, c['city'].lower().replace(' ', '-'), E(c['city']), E(p['name'])) + s[j:]
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

# ---------------------------------------------------------------- static JSON-LD for the core pages
# These pages used to get all their schema from site.js at runtime (schema-data.js). The static
# block below is now their single source: site.js sees each "@type" already present and injects
# nothing for them. Organization (ORG, used on every page)/WebSite/ProfessionalService come from schema-data.js, so the
# data lives in one place. Rerun alone with:  python scripts/hurfi-pages/build.py core-ld
CORE_PAGES = [  # (path, page @type, breadcrumb trail after Home, has ProfessionalService)
    ('/about/', 'AboutPage', [('About', '/about/')], True),
    ('/services/', 'CollectionPage', [('Services', '/services/')], True),
    ('/projects/', 'CollectionPage', [('Projects', '/projects/')], True),
    ('/industries/', 'CollectionPage', [('Industries', '/industries/')], True),
    ('/locations/', 'CollectionPage', [('Locations', '/locations/')], True),
    ('/locations/china/', 'CollectionPage', [('Locations', '/locations/'), ('China', '/locations/china/')], True),
    ('/contact/', 'ContactPage', [('Contact', '/contact/')], True),
    ('/book-consultation/', 'WebPage', [('Book a Consultation', '/book-consultation/')], True),
    ('/privacy-policy/', 'WebPage', [('Privacy Policy', '/privacy-policy/')], False),
    ('/terms/', 'WebPage', [('Terms & Conditions', '/terms/')], False),
    ('/refund-policy/', 'WebPage', [('Refund & Return Policy', '/refund-policy/')], False),
]

def _text(fragment):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', fragment))).strip()

def page_faq(s):
    """FAQ Q&A exactly as site.js bootSchemas() reads it: .rk-faq details -> summary span / first p."""
    out = []
    for sec in re.finditer(r'<section class="rk-faq[^"]*".*?</section>', s, re.S):
        for d in re.finditer(r'<details[^>]*>(.*?)</details>', sec.group(0), re.S):
            q = re.search(r'<summary[^>]*>\s*<span[^>]*>(.*?)</span>', d.group(1), re.S)
            a = re.search(r'<p[^>]*>(.*?)</p>', d.group(1), re.S)
            if q and a and _text(q.group(1)) and _text(a.group(1)):
                out.append((_text(q.group(1)), _text(a.group(1))))
    return out

def website_ld():
    w = dict(schema_data()['website'], **{"publisher": {"@id": ORG_ID}})
    return _with_id(w, WEBSITE_ID)

def prof_ld():
    # schema-data.js puts serviceType/audience directly on ProfessionalService, which schema.org only
    # allows on Service; carry them on the offered Services instead, and give the LocalBusiness the
    # Organization's own addresses (Google requires address on LocalBusiness types)
    prof = dict(schema_data()['professionalService'])
    services, audience = prof.pop('serviceType'), prof.pop('audience')
    prof = _with_id(prof, SITE + '/#professionalservice')
    prof['address'] = ORG['address']
    prof['hasOfferCatalog'] = {"@type": "OfferCatalog", "name": "Hurfi services", "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": x, "serviceType": x, "audience": audience,
                                           "provider": {"@id": ORG_ID}}} for x in services]}
    return prof

LD_TAG = re.compile(r'^  <script type="application/ld\+json">(\{.*?\})</script>\n', re.M)

def build_core_ld():
    org, site, prof = org_ld(), website_ld(), prof_ld()
    # homepage: Organization/WebSite/ProfessionalService move into the generated block (FAQPage stays as is)
    s = rd('index.html')
    s = LD_TAG.sub(lambda m: '' if json.loads(m.group(1)).get('@type') in ('Organization', 'WebSite', 'ProfessionalService') else m.group(0), s)
    wr('index.html', set_ld(s, [org, site, prof]))
    # brand guidelines (hand-written @graph block): add the Organization it was missing
    s = rd('brand-guidelines/index.html')
    wr('brand-guidelines/index.html', set_ld(s, [org]))
    for path, typ, trail, with_prof in CORE_PAGES:
        rel = path.strip('/') + '/index.html'
        s = rd(rel)
        url = SITE + path
        assert ('<link rel="canonical" href="%s">' % url) in s, rel
        title = _text(re.search(r'<title>(.*?)</title>', s, re.S).group(1))
        desc = html.unescape(re.search(r'<meta name="description" content="([^"]*)">', s).group(1))
        webpage = {"@context": "https://schema.org", "@type": typ, "@id": url + "#webpage", "url": url, "name": title,
                   "description": desc, "inLanguage": "en", "isPartOf": {"@id": WEBSITE_ID},
                   "publisher": {"@id": ORG_ID}, "breadcrumb": {"@id": url + "#breadcrumb"}}
        if typ in ('AboutPage', 'ContactPage'):
            webpage["mainEntity"] = {"@id": ORG_ID}
        if path == '/locations/china/':
            webpage["about"] = {"@type": "Country", "name": "China"}
        crumbs = crumbs_ld([('Home', '/')] + trail)
        crumbs = dict([('@context', crumbs.pop('@context')), ('@type', crumbs.pop('@type')), ('@id', url + '#breadcrumb')] + list(crumbs.items()))
        ld = [org, site, webpage, crumbs]
        if with_prof:
            ld.append(prof)
        faq = page_faq(s)
        if faq:
            ld.append({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
                {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faq]})
        wr(rel, set_ld(s, ld))

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
      <div class="cta-row hx-cta-row"><a class="btn" href="/book-consultation/#book-form">Book a Consultation</a><a class="btn btn-outline" href="/contact/">Contact us</a></div>
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


# ---------------------------------------------------------------- Hurfi's own social posts (brand work, not client results)
_POSTS = None
def posts():
    global _POSTS
    if _POSTS is None:
        _POSTS = load('posts.json')
    return _POSTS

def pick_posts(key, tags, n=3):
    import hashlib
    P = posts()
    pool = sorted(k for k, v in P.items() if v['tag'] in tags)
    h = int(hashlib.md5(key.encode()).hexdigest(), 16)
    out = []
    while len(out) < n and pool:
        out.append(pool.pop(h % len(pool))); h //= 7
    return out

def posts_strip(slugs, title='Hurfi on social media', lead=None, ident='posts-title'):
    P = posts()
    lead = lead or 'A few of Hurfi’s own social media posts for manufacturers. They show our brand work and how we talk to factories; they are not client results.'
    figs = ''.join('        <figure class="hx-post"><img src="/assets/img/hurfi-post/web/%s.webp" alt="%s" width="%d" height="%d" loading="lazy" decoding="async"></figure>\n' % (k, E(P[k]['alt']), P[k]['w'], P[k]['h']) for k in slugs)
    return f'''    <section class="brief hx-posts" aria-labelledby="{ident}">
      <h2 id="{ident}">{E(title)}</h2>
      <p>{md(lead)}</p>
      <div class="hx-post-grid">
{figs}      </div>
      <p class="hx-post-note">Want posts like these for your factory? See <a href="/services/social-media-management/">social media management</a>.</p>
    </section>
'''

CITY_ALL = None
def city_guides(cities):
    return [(c['city'], '/locations/china/%s/' % c['slug']) for c in cities.values()]

# ---------------------------------------------------------------- batch 4: rich city pages
def build_city2(c, cities, ins):
    reset_ids()
    S = sources()
    path = '/locations/china/%s/' % c['slug']
    bc = city_crumbs(c, path)
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
    deep = 'exports' in c
    toc = [('ctx-title', 'Official figures'), ('clusters-title', 'Industries')]
    if deep:
        toc += [x for x, ok in ((('zones-title', 'Zones and districts'), bool(c.get('zones'))), (('logi-title', 'Ports, logistics and fairs'), bool(c.get('logistics'))),
                                (('exp-title', 'Export markets'), True), (('chal-title', 'Online challenges'), True)) if ok]
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
    if deep and c.get('zones'):
        main += f'''    <section class="brief hx-prose" aria-labelledby="zones-title">
      <h2 id="zones-title">Industrial zones and districts in {city}</h2>
      <ul class="hx-list">
{flist(c['zones'])}      </ul>
      <p>{md(c['zones_note'])}</p>
    </section>
'''
    if deep and c.get('logistics'):
        main += f'''    <section class="brief hx-prose" aria-labelledby="logi-title">
      <h2 id="logi-title">Ports, logistics and trade fairs</h2>
      <ul class="hx-list">
{flist(c['logistics'])}      </ul>
      <p>Buyers comparing suppliers ask how goods will reach them, how long it takes and on what trade terms. Shipping ports, typical lead times and Incoterms on your website answer that before it is asked.</p>
    </section>
'''
    if deep:
        main += f'''    <section class="brief hx-prose" aria-labelledby="exp-title">
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
    main += posts_strip(pick_posts(c['slug'], ('mfg', 'seo', 'web')))
    main += process_block()
    main += faq_block(c['faq'], title='Questions from %s manufacturers' % c['city'])
    sn = sector_names()
    sect = [(sn[x], '/industries/%s/' % x) for x in c['sectors']]
    sib = [(cities[x]['city'], '/locations/china/%s/' % x) for x in c['siblings'] if x in cities]
    gd = [(ins[x]['h1'], '/insights/%s/' % x) for x in dict.fromkeys(c['insights'] + ins_linking(ins, path)) if x in ins]
    pk = prov_of(c)
    if pk:
        sib = [('%s province guide' % provinces()[pk]['name'], '/locations/china/%s/' % pk)] + sib
    main += f'''    <section class="brief hx-related-block" aria-labelledby="related-title">
      <h2 id="related-title">Related industries, cities and guides</h2>
      <div class="hx-related-cols">
        <div><h3>Industries</h3>{link_list(sect)}</div>
        <div><h3>{'Province and city guides' if pk else 'Other city guides'}</h3>{link_list(sib + [('All city guides', '/locations/#city-guides')])}</div>
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
    rel = ''.join('<li><a href="/insights/%s/">%s</a></li>' % (x, E(ins[x]['h1'])) for x in dict.fromkeys(a['related'] + ins_linking(ins, path)) if x in ins)
    sect = ''.join('<li><a href="/industries/%s/">%s</a></li>' % (x, E(sn[x])) for x in a['sectors'])
    mpv, mcs = mentioned_places(a)
    cty = ''.join('<li><a href="/locations/china/%s/">%s</a></li>' % (x, E(cities[x]['city'])) for x in dict.fromkeys(a['cities'] + mcs) if x in cities)
    pvs = provinces()
    pvl = ''.join('<li><a href="/locations/china/%s/">%s</a></li>' % (x, E(pvs[x]['name'])) for x in mpv)
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
{('        <p class="hx-toc-title">Province guides</p>\n        <ul>' + pvl + '</ul>\n') if pvl else ''}        <p><a class="svc-cta" href="/book-consultation/#book-form">Book a Consultation <span aria-hidden="true">→</span></a></p>
      </aside>
    </div>
'''
    main += services_block('How Hurfi helps with this', a['svc'], lead='Hurfi offers four services for manufacturers selling abroad. Here is how each one relates to this guide.')
    main += posts_strip(pick_posts(a['slug'], INS_POST_TAGS.get(a['slug'], ('seo', 'web'))))
    main += faq_block(a['faq'], title='Common questions')
    main += sources_block(a['sources'], 'External guidance quoted in this article, checked on the date shown. Links open the publisher’s own page.', refs)
    main += cta_band('Put this guide to work', 'A first consultation is free. We will look at your site and tell you which parts of this guide matter most for you.', 'endcta-title')
    ld = [org_ld(), crumbs_ld(bc),
          {"@context": "https://schema.org", "@type": "WebPage", "@id": SITE + path, "name": a['h1'], "url": SITE + path, "description": a['description'], "inLanguage": "en",
           "isPartOf": {"@type": "WebSite", "name": "Hurfi", "url": SITE + "/"}, "primaryImageOfPage": {"@type": "ImageObject", "url": SITE + img, "width": 1200, "height": 675}, "dateModified": a.get('modified', a['published'])},
          {"@context": "https://schema.org", "@type": "Article", "headline": a['h1'], "description": a['description'], "url": SITE + path, "mainEntityOfPage": SITE + path,
           "datePublished": a['published'], "dateModified": a.get('modified', a['published']), "inLanguage": "en", "image": SITE + img,
           "author": {"@id": SITE + "/#organization"}, "publisher": {"@id": SITE + "/#organization"}},
          faq_ld(a['faq'])]
    wr(path.strip('/') + '/index.html', page(dict(title=a['title'], description=a['description'], path=path, data_page='insight', og_type='article', ld=ld), main))
    import images
    images.steps(os.path.join(ROOT, img.lstrip('/')), a['h1'], a['steps'])

# ---------------------------------------------------------------- chunk 3: deepened sector pages (v2)
def sectors2():
    try:
        return load('sectors2.json')
    except FileNotFoundError:
        return {}

def build_sector2(x, cities, provs, ins):
    reset_ids()
    sl = x['slug']
    path = '/industries/%s/' % sl
    bc = [('Home', '/'), ('Industries', '/industries/'), (x['name'], path)]
    refs = {s: n + 1 for n, s in enumerate(x['sources'])}
    def sup(ids):
        return ''.join('<sup><a href="#src-%s" aria-label="Source %d">[%d]</a></sup>' % (i, refs[i], refs[i]) for i in ids)
    def flist(items):
        return ''.join('        <li>%s%s</li>\n' % (md(t), sup(ids)) for t, ids in items)
    short = E(x['short'])
    toc = [('figs-title', 'Sector figures'), ('groups-title', 'What buyers compare'), ('std-title', 'Standards and documents'),
           ('buyerq-title', 'Buyer questions'), ('play-title', 'Playbook'), ('where-title', 'Where it is made'),
           ('svc-title', 'How Hurfi helps'), ('niche-title', 'Niches'), ('rk-faq-title', 'FAQ'), ('related-title', 'Related pages'), ('src-title', 'Sources')]
    main = hero('Industries', x['h1'], x['lead'], note=x.get('note'), cta2=('Contact us', '/contact/')) + crumbs_nav(bc)
    main += '    <nav class="brief hx-onpage" aria-label="On this page"><p class="hx-toc-title">On this page</p><ul>%s</ul></nav>\n' % ''.join('<li><a href="#%s">%s</a></li>' % (i, E(t)) for i, t in toc)
    img = '/assets/img/guides/sector-%s.webp' % sl
    tiles = '; '.join('%s %s' % (b, l) for b, l in x['tiles'])
    main += f'''    <section class="brief hx-prose" aria-labelledby="figs-title">
      <h2 id="figs-title">{E(x['figs_h2'])}</h2>
      <p>{md(x['figs_intro'])}</p>
      <ul class="hx-list">
{flist(x['facts'])}      </ul>
      <p>{md(x['figs_after'])}</p>
{figure(img, 'Infographic of four figures for %s: %s.' % (x['name'], tiles), 'Infographic by Hurfi, drawn from the sources listed below (%s). Figures describe the sector, not any Hurfi client.' % x['srcline'])}    </section>
'''
    gr = ''.join('        <article class="brief-card"><h3>%s</h3><p>%s</p></article>\n' % (E(t), md(b)) for t, b in x['groups'])
    main += f'''    <section class="brief" aria-labelledby="groups-title">
      <h2 id="groups-title">What overseas buyers compare in {short}</h2>
      <p>{md(x['groups_intro'])}</p>
      <div class="brief-grid">
{gr}      </div>
    </section>
'''
    main += f'''    <section class="brief hx-prose" aria-labelledby="std-title">
      <h2 id="std-title">Standards, rules and documents buyers ask about</h2>
      <p>{md(x['std_intro'])}</p>
      <ul class="hx-list">
{flist(x['standards'])}      </ul>
      <p>{md(x['std_note'])}</p>
    </section>
'''
    bq = ''.join('        <article class="brief-card"><h3>%s</h3><p>%s</p></article>\n' % (E(q), md(a)) for q, a in x['buyer_q'])
    main += f'''    <section class="brief" aria-labelledby="buyerq-title">
      <h2 id="buyerq-title">Questions overseas buyers ask {short} suppliers</h2>
      <p>What buyers ask first, and what your website can show so the answer is already there.</p>
      <div class="brief-grid">
{bq}      </div>
    </section>
'''
    pb = ''.join('        <li>%s</li>\n' % md(s) for s in x['playbook'])
    main += f'''    <section class="brief hx-prose" aria-labelledby="play-title">
      <h2 id="play-title">A website, SEO and RFQ playbook for {short} manufacturers</h2>
      <p>{md(x['play_intro'])}</p>
      <ol class="hx-list">
{pb}      </ol>
    </section>
'''
    main += cta_band('Want this playbook applied to your products?', 'Book a free consultation and we will look at your current site, product range and target markets, and tell you which steps to take first. Prefer to write first? Use the contact form.', 'midcta-title')
    cl = ''.join('        <li><a href="/locations/china/%s/">%s</a>: %s%s</li>\n' % (c, E(cities[c]['city']), md(t), sup(ids)) for c, t, ids in x['where'] if c in cities)
    pv = [(provs[p]['name'], '/locations/china/%s/' % p) for p in x['provinces'] if p in provs]
    main += f'''    <section class="brief hx-prose" aria-labelledby="where-title">
      <h2 id="where-title">Where in China {short} is made</h2>
      <p>{md(x['where_intro'])}</p>
      <ul class="hx-list">
{cl}      </ul>
      <p>Province guides: {', '.join('<a href="%s">%s</a>' % (u, E(n)) for n, u in pv)}. These pages describe the places, not Hurfi offices; Hurfi works remotely from Xi’an and Bogura.</p>
    </section>
'''
    main += services_block('How Hurfi helps %s manufacturers' % x['short'], x['svc'], lead='Four services, each set up for how buyers in this sector search and compare.')
    if x.get('post'):
        P = posts(); k = x['post'][0]
        main += f'''    <section class="brief hx-posts" aria-labelledby="posts-title">
      <h2 id="posts-title">From Hurfi’s own social media</h2>
      <div class="hx-post-single">
        <figure class="hx-post"><img src="/assets/img/hurfi-post/web/{k}.webp" alt="{E(P[k]['alt'])}" width="{P[k]['w']}" height="{P[k]['h']}" loading="lazy" decoding="async"></figure>
        <div>
          <p>{md(x['post'][1])} It is Hurfi’s own brand work, not a client result.</p>
          <p class="hx-post-note">Want posts like this for your factory? See <a href="/services/social-media-management/">social media management</a>.</p>
        </div>
      </div>
    </section>
'''
    nl = ''.join('          <li id="%s">%s</li>\n' % (i, E(n)) for i, n in x['niches'])
    main += f'''    <section class="brief" aria-labelledby="niche-title">
      <h2 id="niche-title">Niches in this sector</h2>
      <p>Specialist product areas this page covers:</p>
      <ul class="ind-niches">
{nl}      </ul>
    </section>
'''
    main += process_block()
    main += faq_block(x['faq'], title='Questions from %s manufacturers' % x['short'])
    sn = sector_names()
    sect = [(sn[s], '/industries/%s/' % s) for s in x['related'] if s in sn]
    cg = [(cities[c]['city'], '/locations/china/%s/' % c) for c in dict.fromkeys([c for c, _, _ in x['where']] + CSM.get(sl, [])) if c in cities]
    gd = [(ins[k]['h1'], '/insights/%s/' % k) for k in dict.fromkeys(x['insights'] + ISM.get(sl, [])) if k in ins]
    main += f'''    <section class="brief hx-related-block" aria-labelledby="related-title">
      <h2 id="related-title">Related industries, places and guides</h2>
      <div class="hx-related-cols">
        <div><h3>Industries</h3>{link_list(sect + [('All industries', '/industries/')])}</div>
        <div><h3>City and province guides</h3>{link_list(cg + pv + [('China directory', '/locations/china/')])}</div>
        <div><h3>Guides</h3>{link_list(gd + [('All insights', '/insights/')])}</div>
      </div>
    </section>
'''
    main += sources_block(x['sources'], 'Figures and rules are quoted from the sources below and were checked on the date shown. Industry figures describe the sector, not any Hurfi client; check the current text of any regulation or standard before relying on it.', refs)
    main += cta_band('Talk to us about your %s products' % x['short'], 'A first consultation is free and there is no obligation. Tell us what you make, who buys it and where you want to sell.', 'endcta-title')
    ld = [org_ld(), crumbs_ld(bc),
          {"@context": "https://schema.org", "@type": "WebPage", "name": x['h1'], "url": SITE + path, "description": x['description'], "inLanguage": "en",
           "isPartOf": {"@type": "WebSite", "name": "Hurfi", "url": SITE + "/"}, "about": {"@type": "Thing", "name": x['name']},
           "primaryImageOfPage": {"@type": "ImageObject", "url": SITE + img, "width": 1200, "height": 675},
           "provider": {"@id": SITE + "/#organization"}, "dateModified": TODAY},
          faq_ld(x['faq'])]
    wr(path.strip('/') + '/index.html', page(dict(title=x['title'], description=x['description'], path=path, data_page='industry', ld=ld), main))
    import images
    images.city(os.path.join(ROOT, img.lstrip('/')), x['name'], x['name'], x['tiles'], x['srcline'], kicker='Industry guide · official and industry figures')

def build_sectors2(cities, ins):
    S2 = sectors2()
    provs = provinces()
    CSM.update(city_sector_map(cities)); INS.update(ins or {}); ISM.update(insight_sector_map(ins or {}))
    for x in S2.values():
        build_sector2(x, cities, provs, ins)

INS_POST_TAGS = {
 'google-ads-for-exporters': ('ads', 'seo'), 'linkedin-for-factory-export-sales': ('smm', 'brand'), 'trade-show-follow-up-for-manufacturers': ('mfg', 'brand'),
 'choosing-an-export-marketing-agency': ('svc', 'brand'), 'ai-search-for-manufacturers': ('seo', 'ins'), 'export-website-speed-for-overseas-buyers': ('web',),
 'industrial-product-page-seo': ('seo', 'web'), 'international-seo-checklist-for-exporters': ('seo', 'ins'),
}

def build_smm_posts():
    rel = 'services/social-media-management/index.html'
    s = rd(rel)
    reset_ids()
    P = posts()
    car = sorted(k for k in P if P[k]['tag'] == 'carousel')
    single = ['normal-people-vs-digital-marketer', 'attract-the-right-global-buyers', 'global-buyers-dont-just-search-they-verify', 'brand-not-built-by-one-thread', 'make-your-brand-stand-tall-globally', 'your-factory-builds-what-the-world-needs']
    body = posts_strip(single, title='Examples of Hurfi’s own posts', lead='These are posts from Hurfi’s own social media, shown as examples of the visual style and messages we write for manufacturers. They are our brand work, not client results.', ident='posts-title')
    body += posts_strip(car, title='A five-slide carousel from Hurfi’s feed', lead='Carousels let a factory explain who it is, what it does and how it works in one swipeable post. This is one of ours.', ident='carousel-title').replace('      <p class="hx-post-note">Want posts like these for your factory? See <a href="/services/social-media-management/">social media management</a>.</p>\n', '')
    s = set_block(s, 'smm-posts', body, before='    <section class="brief" aria-labelledby="other-title">')
    wr(rel, s)

# reverse maps used by hubs, sectors and services
_IO = {}
def ins_out(ins):
    """Internal targets each insight links to (body links, related lists, sector and city lists)."""
    if _IO or not ins:
        return _IO
    for k, a in ins.items():
        if k == '_hub':
            continue
        t = json.dumps(a, ensure_ascii=False)
        o = set(re.findall(r'\]\((/(?:insights|industries|locations/china)/[a-z0-9-]+/)\)', t))
        o |= {'/insights/%s/' % x for x in a.get('related', []) + V1_RELATED.get(k, [])}
        o |= {'/industries/%s/' % x for x in a.get('sectors', []) + V1_INSIGHT_LINKS.get(k, ([], []))[0]}
        o |= {'/locations/china/%s/' % x for x in a.get('cities', []) + V1_INSIGHT_LINKS.get(k, ([], []))[1]}
        o |= {'/locations/china/%s/' % x for x in mentioned_places(a)[0] + mentioned_places(a)[1]}
        o.discard('/insights/%s/' % k)
        _IO[k] = o
    return _IO

def mentioned_places(a):
    """Province hubs and city guides named in an insight's own text (not its sources), so the
    aside can link them now that the guides exist. Xi'an is skipped: it is named as Hurfi's office."""
    body = json.dumps([a.get('lead'), a.get('sections'), a.get('faq')], ensure_ascii=False).replace('\u2019', "'")
    pv = [k for k, p in provinces().items() if re.search(r'\b%s\b' % re.escape(p['name']), body)]
    cs = []
    for k, c in load('cities.json').items():
        if k == 'xian':
            continue
        n = c['city'].replace('\u2019', "'")
        if k == 'taizhou-zhejiang':
            if re.search(r'Taizhou \(Zhejiang\)|Taizhou in Zhejiang', body):
                cs.append(k)
        elif re.search(r'\b%s\b' % re.escape(n), body):
            cs.append(k)
    return pv, cs

def ins_linking(ins, path):
    """Insights that link to path, so the page can link back."""
    return [k for k, o in ins_out(ins).items() if path in o]

def prov_of(c):
    """Province hub slug for a city, if a hub exists."""
    pv = provinces()
    for k, p in pv.items():
        if p['name'].lower() == (c.get('province') or '').lower() and p['name'] != c.get('city'):
            return k
    return None

def city_crumbs(c, path):
    bc = [('Home', '/'), ('Locations', '/locations/'), ('China', '/locations/china/')]
    k = prov_of(c)
    if k:
        bc.append((provinces()[k]['name'], '/locations/china/%s/' % k))
    return bc + [(c['city'], path)]

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
    for k, o in ins_out(ins).items():
        for u in sorted(o):
            if u.startswith('/industries/'):
                x = u.split('/')[2]
                if k not in m.get(x, []):
                    m.setdefault(x, []).append(k)
    return m

def build_sector_links(sectors, cities, ins):
    """'City guides and insights' block on every industry page (including those without enriched content)."""
    cm, im = city_sector_map(cities), insight_sector_map(ins)
    for x in cities.values():
        if x.get('v') != 2:
            for sl in x.get('_sectors_v1', []):
                pass
    for sl in sorted(set(sector_names()) - set(sectors) - set(sectors2())):
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

# ---------------------------------------------------------------- locations-all: province hubs
def provinces():
    try:
        return load('provinces.json')
    except FileNotFoundError:
        return {}

def build_province(p, provs, cities, ins):
    reset_ids()
    S = sources()
    path = '/locations/china/%s/' % p['slug']
    name = E(p['name'])
    bc = [('Home', '/'), ('Locations', '/locations/'), ('China', '/locations/china/'), (p['name'], path)]
    refs = {sid: n + 1 for n, sid in enumerate(p['sources'])}
    def flist(items):
        out = ''
        for text, ids in items:
            sup = ''.join('<sup><a href="#src-%s" aria-label="Source %d">[%d]</a></sup>' % (x, refs[x], refs[x]) for x in ids)
            out += '        <li>%s%s</li>\n' % (md(text), sup)
        return out
    toc = [('ctx-title', 'Official figures'), ('guides-title', 'City guides')] + ([('more-title', 'More manufacturing cities')] if p['smaller'] else []) + [
           ('dir-title', 'Other cities'), ('play-title', 'Priorities'), ('svc-title', 'How Hurfi helps'), ('rk-faq-title', 'FAQ'), ('related-title', 'Related pages'), ('src-title', 'Sources')]
    main = hero('China · Province guide', p['h1'], p['lead'], note='Hurfi’s offices are in Xi’an (Shaanxi) and Bogura (Bangladesh). We do not have an office or staff in %s; we work with manufacturers there remotely.' % p['name'], cta2=('Contact us', '/contact/')) + crumbs_nav(bc)
    main += '    <nav class="brief hx-onpage" aria-label="On this page"><p class="hx-toc-title">On this page</p><ul>%s</ul></nav>\n' % ''.join('<li><a href="#%s">%s</a></li>' % (i, E(t)) for i, t in toc)
    img = '/assets/img/guides/province-%s.webp' % p['slug']
    tiles = '; '.join('%s %s' % (b, l) for b, l in p['tiles'])
    main += f'''    <section class="brief hx-prose" aria-labelledby="ctx-title">
      <h2 id="ctx-title">{name}’s manufacturing economy in official figures</h2>
      <p>{md(p['intro'])}</p>
      <ul class="hx-list">
{flist(p['facts'])}      </ul>
      <p>{md(p['after'])}</p>
{figure(img, 'Infographic of four 2025 official figures for %s: %s.' % (p['name'], tiles), 'Infographic by Hurfi, drawn from the official sources listed below (%s). Figures describe the province, not any Hurfi client.' % p['srcline'])}    </section>
'''
    gl = ''.join('        <a class="ind-card" href="/locations/china/%s/"><h3>%s</h3><p>%s</p><span class="ind-go" aria-hidden="true">→</span></a>\n' % (sl, E(cities[sl]['city']), md(b)) for sl, b in p['guides'] if sl in cities)
    main += f'''    <section class="brief" aria-labelledby="guides-title">
      <h2 id="guides-title">City guides in {name}</h2>
      <p>Each guide covers the city’s official industry figures, what overseas buyers compare and a website, SEO and RFQ playbook.</p>
      <div class="ind-grid">
{gl}      </div>
    </section>
'''
    sm = ''
    for c in p['smaller']:
        cid = 'hub-' + c['city'].lower().replace(' ', '-')
        sm += f'''      <article class="hx-subcity" id="{cid}" aria-labelledby="{cid}-t">
        <h3 id="{cid}-t">{E(c['city'])}</h3>
        <ul class="hx-list">
{flist(c['facts'])}        </ul>
        <p>{md(c['note'])} Related: <a href="/industries/{c['sector'][0]}/">{E(c['sector'][1])}</a> · <a href="/locations/china/#{c['anchor']}">{E(c['city'])} in the China directory</a>.</p>
      </article>
'''
    if sm:
        main += f'''    <section class="brief hx-prose" aria-labelledby="more-title">
      <h2 id="more-title">More {name} manufacturing cities, from their 2025 bulletins</h2>
      <p>These cities do not have a full guide yet. The figures come from each city’s 2025 statistical bulletin, listed in the sources below.</p>
{sm}    </section>
'''
    others = [x for x in p['others'] if x[0] not in [c['city'] for c in p['smaller']]]
    ol = ''.join('<li><a href="/locations/china/#%s">%s</a></li>' % (a, E(n)) for n, a in others)
    main += f'''    <section class="brief hx-prose" aria-labelledby="dir-title">
      <h2 id="dir-title">Other {name} cities we work with</h2>
      <p>We work with manufacturers in every {name} city, remotely. We have not yet checked official figures for the cities below, so we do not quote any; each links to its entry in the China directory.</p>
      <ul class="hx-linklist hx-cols">{ol}</ul>
    </section>
'''
    pb = ''.join('        <li>%s</li>\n' % md(x) for x in p['playbook'])
    main += f'''    <section class="brief hx-prose" aria-labelledby="play-title">
      <h2 id="play-title">Website and search priorities for {name} exporters</h2>
      <ol class="hx-list">
{pb}      </ol>
    </section>
'''
    main += cta_band('Want this mapped to your factory?', 'Book a free consultation and we will look at your current site, products and markets, and suggest which of these steps to take first.', 'midcta-title')
    main += services_block('How Hurfi helps %s manufacturers' % p['name'], p['svc'])
    main += process_block()
    main += faq_block(p['faq'], title='Questions from %s manufacturers' % p['name'])
    sn = sector_names()
    sect = [(sn[x], '/industries/%s/' % x) for x in p['sectors']]
    gd = [(ins[x]['h1'], '/insights/%s/' % x) for x in dict.fromkeys(p['insights'] + ins_linking(ins, '/locations/china/%s/' % p['slug'])) if x in ins]
    op = [(q['name'], '/locations/china/%s/' % k) for k, q in provs.items() if k != p['slug']]
    main += f'''    <section class="brief hx-related-block" aria-labelledby="related-title">
      <h2 id="related-title">Related industries, provinces and guides</h2>
      <div class="hx-related-cols">
        <div><h3>Industries</h3>{link_list(sect)}</div>
        <div><h3>Other province guides</h3>{link_list(op + [('All city guides', '/locations/#city-guides')])}</div>
        <div><h3>Guides</h3>{link_list(gd + [('All insights', '/insights/')])}</div>
      </div>
      <p><a class="desk-link" href="/locations/china/#{p['anchor']}">{name} in the China directory</a></p>
    </section>
'''
    main += sources_block(p['sources'], 'Figures are quoted from the official sources below and were checked on the date shown. They describe the province or city, not any Hurfi client.', refs)
    main += cta_band('Talk to us about %s' % p['name'], 'A first consultation is free and there is no obligation. Tell us what you make and where you want to sell.', 'endcta-title')
    items = [{"@type": "ListItem", "position": n + 1, "name": cities[sl]['city'], "url": SITE + '/locations/china/%s/' % sl} for n, (sl, _) in enumerate(x for x in p['guides'] if x[0] in cities)]
    ld = [org_ld(), crumbs_ld(bc),
          {"@context": "https://schema.org", "@type": "CollectionPage", "name": p['h1'], "url": SITE + path, "description": p['description'], "inLanguage": "en",
           "isPartOf": {"@type": "WebSite", "name": "Hurfi", "url": SITE + "/"}, "about": {"@type": "AdministrativeArea", "name": p['name'] + ", China"},
           "primaryImageOfPage": {"@type": "ImageObject", "url": SITE + img, "width": 1200, "height": 675},
           "mainEntity": {"@type": "ItemList", "name": "City guides in " + p['name'], "itemListElement": items},
           "provider": {"@id": SITE + "/#organization"}, "dateModified": TODAY},
          faq_ld(p['faq'])]
    wr(path.strip('/') + '/index.html', page(dict(title=p['title'], description=p['description'], path=path, data_page='location', ld=ld), main))
    import images
    images.city(os.path.join(ROOT, img.lstrip('/')), p['name'], 'China', p['tiles'], p['srcline'], kicker='Province guide · 2025 official figures')

def build_provinces(cities, ins):
    provs = provinces()
    for p in provs.values():
        build_province(p, provs, cities, ins)

def main():
    sectors, cities, ins, zh, pg = load('sectors.json'), load('cities.json'), load('insights.json'), load('zh.json'), load('pages.json')
    build_cities(cities, ins)
    build_provinces(cities, ins)
    build_sectors(sectors, cities, ins)
    build_oem(pg)
    build_sector_links(sectors, cities, ins)
    build_sectors2(cities, ins)
    build_services(pg)
    build_service_links(ins, cities)
    build_smm_posts()
    build_home(pg)
    build_locations(pg, cities)
    build_china(cities)
    build_industries_hub()
    build_insights(ins, cities)
    build_zh(zh)
    build_core_ld()

if __name__ == '__main__':
    if sys.argv[1:] == ['core-ld']:
        build_core_ld()
    else:
        main()
