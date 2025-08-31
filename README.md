# 🔋 Thuisbatterijwereld.nl

**De beste thuisbatterijen vergelijken en kopen**

⚡ **LAATSTE UPDATE: 31 Aug 2025 - Plug & Play Thuisbatterij artikel toegevoegd**

## 🌐 **Website**
- **Production**: https://thuisbatterijwereld.nl
- **GitHub**: https://github.com/Tjallingsol/thuisbatterijwereld

## 🚀 **Deployment naar Vimexx**

### **Optie 1: Manual Upload (Eenvoudigste)**
1. Download de static export: [Backup Link](https://page.gensparksite.com/project_backups/tooluse_Z233AfqWSZ2OJi6QbjtJng.tar.gz)
2. Extract de `static-export` folder  
3. Upload alle bestanden naar je `public_html` folder op Vimexx
4. Klaar! ✅

### **Optie 2: GitHub Workflow Setup**
Voor automatische deployment bij elke code wijziging:

1. **GitHub Secrets toevoegen** (Repository → Settings → Secrets):
   ```
   VIMEXX_FTP_SERVER    = je-domain.nl
   VIMEXX_FTP_USERNAME  = je-ftp-username  
   VIMEXX_FTP_PASSWORD  = je-ftp-password
   ```

2. **Workflow bestand aanmaken**:
   - Ga naar `.github/workflows/` folder 
   - Maak `deploy.yml` aan (zie `GITHUB_DEPLOYMENT.md`)

3. **Push naar main branch** → Automatische deployment

**Uitgebreide instructies**: Zie `GITHUB_DEPLOYMENT.md`

## 📊 **Website Features**

### **📄 Pagina's (22 totaal)**
- **Homepage** - SEO geoptimaliseerd voor "thuisbatterij"
- **Vergelijken** - Alle merken vergelijking met filters  
- **Kopen** - Complete koopgids (8.1k maandelijkse zoekopdrachten)
- **Kosten Calculator** - Interactieve besparingsberekening
- **Subsidie** - 2025 subsidie informatie
- **4 Guide pagina's** - Complete gidsen voor kopers
- **Blog** + Energieonafhankelijkheid artikel
- **Merk pagina's** - Zonneplan, Growatt reviews
- **Product reviews** - Growatt, Dyness, Victron, HomeWizard, Zonneplan

### **⚡ Technische Specs**
- **Framework**: Hono + TypeScript (Cloudflare Workers compatible)
- **Frontend**: TailwindCSS + FontAwesome + Pure JavaScript
- **SEO**: Geoptimaliseerd voor 76k+ maandelijkse zoekopdrachten
- **Performance**: Static HTML export voor snelle loading
- **Mobile**: Volledig responsive design

### **🎯 SEO Optimalisatie**
Gebaseerd op keyword research (1.001 keywords geanalyseerd):

- **Hoofdkeywords**: thuisbatterij (60.5k), thuisbatterij kopen (8.1k)  
- **Merk keywords**: zonneplan thuisbatterij (6.6k), growatt (590 - difficulty 2)
- **Longtail**: 20+ keywords met difficulty < 10
- **Metadata**: Geoptimaliseerde titels, descriptions, schema markup
- **Sitemap**: Volledig voor Google indexering

## 🔧 **Development**

### **Local Development**
```bash
# Dependencies installeren
npm install

# Development server starten  
npm run dev:sandbox

# Website beschikbaar op http://localhost:3000
```

### **Build & Export**
```bash
# Project bouwen
npm run build

# Static export genereren (zie static-export/ folder)
node deploy.js
```

### **Project Structuur**
```
webapp/
├── src/
│   ├── index.tsx           # Hoofdapplicatie (Hono routes)
│   └── renderer.tsx        # HTML renderer + nav
├── public/
│   └── static/             # CSS/JS assets
├── static-export/          # Static HTML voor hosting
├── .github/
│   └── workflows/          # GitHub Actions (optioneel)
├── package.json
├── wrangler.jsonc          # Cloudflare config  
└── README.md
```

## 📈 **Content Highlights**

### **Energieonafhankelijkheid Artikel**
- **5-stappen plan** naar energie-onafhankelijkheid
- **Kosten/baten analyse**: €15k-€23k investering, €1.1k-€2.1k/jaar besparing  
- **Smart features**: tijd-gebaseerd laden, weersvoorspelling
- **Noodstroom**: wat werkt wel/niet tijdens stroomstoringen

### **Brand Reviews**  
- **Zonneplan**: €8.5k-€10.5k, 13.5 kWh, premium LiFePO4
- **Growatt ARB**: €4.5k, 10.24 kWh, beste prijs-kwaliteit
- **Volledige specs** en concurrentievergelijkingen

### **Kosten Calculator**
- **Real-time berekeningen** - JavaScript client-side
- **Subsidie integratie** - ISDE en BTW teruggave
- **Terugverdientijd** - ROI berekening
- **Zonnepanelen optimalisatie** - Verhoog zelfconsumptie naar 80%

## 🎨 **Design & UX**

### **Kleuren**
- **Primary**: Energy Green (#10b981)
- **Secondary**: Energy Blue (#3b82f6)  
- **Accent**: Battery Orange (#f59e0b)
- **CTA Buttons**: Oranje (Bereken) + Blauw (Vergelijk) voor maximum contrast

### **Navigation**
- **Desktop**: Dropdown menu voor Gidsen
- **Mobile**: Hamburger menu met collapsed sections
- **Clean URLs**: `/kopen`, `/gids/kopers-gids` (via .htaccess)

### **Performance**
- **CDN assets**: TailwindCSS, FontAwesome
- **Gzip compression**: .htaccess configuratie
- **Browser caching**: 1 jaar voor static assets
- **Image optimization**: WebP waar mogelijk

---

**🚀 Ready for production deployment to Thuisbatterijwereld.nl!**

*Laatste update: 28 augustus 2025*