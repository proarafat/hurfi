"""Single source for the main navigation (static header HTML and site-data.js)."""
VER = '20261020r'
# hurfi-pages.css changes on its own schedule; sharing VER with style.css made
# every build rewrite this cache-buster even when the file was untouched.
HX_VER = '20261017a'

SERVICES = [('Website Development', '/services/website-development/'), ('SEO', '/services/seo/'),
            ('Digital Marketing', '/services/digital-marketing/'), ('Social Media Management', '/services/social-media-management/', 'Hot')]
INDUSTRIES = [('Industrial Automation & Robotics', 'industrial-automation-robotics'), ('Electronics & Semiconductor', 'electronics-semiconductor'),
              ('EV & E-Mobility', 'ev-e-mobility'), ('Battery & Energy Storage', 'battery-energy-storage'),
              ('Power Grid & Electrical Equipment', 'power-grid-electrical-equipment'), ('Medical Devices & Diagnostics', 'medical-devices-diagnostics'),
              ('Laboratory & Scientific Equipment', 'laboratory-scientific-equipment'), ('Industrial Machinery & CNC', 'industrial-machinery-cnc'),
              ('Industrial Software & Data', 'industrial-software-data'), ('Data Centers & Digital Infrastructure', 'data-centers-digital-infrastructure'),
              ('Optics & Photonics', 'optics-photonics'), ('Pharma & Bioprocess Manufacturing', 'pharma-bioprocess-manufacturing')]
INDUSTRIES = [(n, '/industries/%s/' % s) for n, s in INDUSTRIES] + [('All industries', '/industries/')]
CITY_NAV = [('Changzhou', 'changzhou'), ('Dongguan', 'dongguan'), ('Guangzhou', 'guangzhou'), ('Hangzhou', 'hangzhou'), ('Hefei', 'hefei'),
            ('Ningbo', 'ningbo'), ('Quanzhou', 'quanzhou'), ('Shanghai', 'shanghai'), ('Shenzhen', 'shenzhen'), ('Suzhou', 'suzhou'),
            ('Tianjin', 'tianjin'), ('Wuhan', 'wuhan'), ('Wuxi', 'wuxi'), ('Xiamen', 'xiamen'), ('Xi\'an', 'xian'), ('Zhongshan', 'zhongshan')]
PROV_NAV = [('Guangdong', 'guangdong'), ('Zhejiang', 'zhejiang'), ('Jiangsu', 'jiangsu'), ('Shandong', 'shandong'), ('Fujian', 'fujian'), ('Anhui', 'anhui'),
            ('Hubei', 'hubei'), ('Hunan', 'hunan'), ('Henan', 'henan'), ('Sichuan', 'sichuan'), ('Liaoning', 'liaoning')]
MAJOR_NAV = [('Shenzhen', 'shenzhen'), ('Guangzhou', 'guangzhou'), ('Shanghai', 'shanghai'), ('Suzhou', 'suzhou'), ('Hangzhou', 'hangzhou'),
             ('Chengdu', 'chengdu'), ("Xi'an", 'xian')]
LOCATIONS = ([('China directory', '/locations/china/')] + [('%s province' % n, '/locations/china/%s/' % s) for n, s in PROV_NAV]
             + [(n, '/locations/china/%s/' % s) for n, s in MAJOR_NAV] + [('All city guides', '/locations/#city-guides')])
INSIGHTS = [('All insights', '/insights/'),
            ('Overseas buyer inquiries', '/insights/overseas-buyer-inquiries/'),
            ('Factory website trust signals', '/insights/factory-website-trust-signals/'),
            ('RFQ website checklist', '/insights/manufacturer-website-rfq-checklist/'),
            ('Industrial product page SEO', '/insights/industrial-product-page-seo/'),
            ('International SEO checklist', '/insights/international-seo-checklist-for-exporters/'),
            ('AI search for manufacturers', '/insights/ai-search-for-manufacturers/'),
            ('Google Ads for exporters', '/insights/google-ads-for-exporters/'),
            ('LinkedIn for export sales', '/insights/linkedin-for-factory-export-sales/'),
            ('Trade show follow-up', '/insights/trade-show-follow-up-for-manufacturers/'),
            ('Export website speed', '/insights/export-website-speed-for-overseas-buyers/'),
            ('2025 export markets', '/insights/china-export-markets-2025/'),
            ('ASEAN, Middle East & Africa pages', '/insights/market-pages-for-asean-middle-east-africa/'),
            ('Certifications page', '/insights/certifications-page-for-export-websites/'),
            ('Shipping & logistics page', '/insights/shipping-logistics-page-for-exporters/'),
            ('Standing out in a cluster', '/insights/standing-out-in-an-industrial-cluster/'),
            ('PDF catalogue to product pages', '/insights/pdf-catalogue-to-product-pages/'),
            ('Choosing an export agency', '/insights/choosing-an-export-marketing-agency/')]

NAV = [('Home', '/'), ('About', '/about/'), ('Services', '/services/', SERVICES), ('Projects', '/projects/'),
       ('Industries', '/industries/', INDUSTRIES), ('Locations', '/locations/', LOCATIONS), ('Insights', '/insights/', INSIGHTS), ('Contact Us', '/contact/')]

def _child(c):
    badge = ''
    if len(c) > 2 and c[2] == 'Hot':
        badge = '<span class="badge badge-hot" aria-label="Hot"><span class="badge-hot-icon" aria-hidden="true">âœ¦</span><span class="badge-hot-text">Hot</span></span>'
    return '<li><a href="%s"><span class="nav-link-text">%s</span>%s</a></li>' % (c[1], c[0].replace('&', '&amp;'), badge)

def nav_ul():
    out = '<ul class="nav">'
    for item in NAV:
        if len(item) == 2:
            out += '<li><a href="%s">%s</a></li>' % (item[1], item[0])
        elif item[0] == 'Services':
            out += ('<li class="has-dropdown has-alert"><a href="/services/" class="has-beep" aria-haspopup="true" aria-expanded="false">Services'
                    '<span class="nav-beep" title="New highlight in menu" aria-label="New highlight in menu"><span class="nav-beep-dot"></span></span>'
                    '<span class="nav-caret" aria-hidden="true"></span></a><ul class="dropdown" role="list">%s</ul></li>') % ''.join(_child(c) for c in item[2])
        else:
            cls = 'dropdown dropdown-cols' if item[0] == 'Locations' else 'dropdown'
            out += '<li class="has-dropdown"><a href="%s" aria-haspopup="true" aria-expanded="false">%s<span class="nav-caret" aria-hidden="true"></span></a><ul class="%s" role="list">%s</ul></li>' % (
                item[1], item[0], cls, ''.join(_child(c) for c in item[2]))
    out += '<li><a class="btn" href="/book-consultation/#book-form">Free Growth Strategy<span class="cta-free-tag">Limited</span></a></li></ul>'
    return out

def nav_json():
    out = []
    for item in NAV:
        d = {'label': item[0], 'path': item[1]}
        if len(item) > 2:
            d['children'] = [dict({'label': c[0], 'path': c[1]}, **({'badge': c[2]} if len(c) > 2 else {})) for c in item[2]]
        out.append(d)
    return out
