# 🚀 Vimexx Deployment Guide

## 🎯 Doel
Upload je website naar: `/domains/thuisbatterijwereld.nl/public_html/`

## ⚡ Quick Start (Meest Eenvoudig)

### Methode 1: Direct Upload via Vimexx File Manager ⭐ AANBEVOLEN
1. **Run**: `npm run deploy:vimexx` (genereert fresh files)
2. **Open**: https://web0111.zxcs.nl:2222/CMD_FILE_MANAGER/domains/thuisbatterijwereld.nl/public%5Fhtml  
3. **Upload**: Alle bestanden uit `./static-export/` naar `public_html`
4. **Test**: https://thuisbatterijwereld.nl

## 🤖 Automatische Deployment (GitHub Actions)

### Setup Vereist:
1. **Kopieer** `deployment/github-workflows/deploy-to-vimexx.yml`
2. **Maak** `.github/workflows/deploy-to-vimexx.yml` in je repo
3. **Stel in** GitHub Secrets (zie MANUAL_GITHUB_SETUP.md)

### Na Setup:
- **Push code** → Automatische deployment
- **Check** Actions tab voor status

## 📁 Wat wordt er gedeployed?

```
public_html/
├── index.html              # Homepage met SEO
├── vergelijken.html        # Batterij vergelijking  
├── kosten.html            # Calculator
├── subsidie.html          # ISDE subsidie info
├── merken/                # Product pagina's
│   ├── growatt-arb-10.html
│   ├── dyness-powerwall-b4850.html
│   ├── victron-multiplus.html
│   ├── homewizard-p1.html
│   └── zonneplan-battery.html
├── gids/                  # Handleidingen
├── blog/                  # Artikelen
├── .htaccess             # URL rewriting
├── sitemap.xml           # SEO sitemap
└── robots.txt            # Search engine rules
```

## 🔍 SEO Features Inbegrepen

✅ **Schema Markup**: Product, Organization, FAQ, Reviews  
✅ **Meta Descriptions**: LLM geoptimaliseerd  
✅ **Sitemap**: 23 pagina's met prioriteiten  
✅ **Robots.txt**: Crawl optimalisatie  
✅ **Security Headers**: .htaccess beveiliging  

## 📞 Hulp Nodig?

- **Vimexx Login**: web0111.zxcs.nl:2222
- **Target Directory**: `/domains/thuisbatterijwereld.nl/public_html/`
- **File Count**: 23 HTML + 3 SEO files
- **Website Test**: https://thuisbatterijwereld.nl