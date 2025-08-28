# 🚀 Thuisbatterijwereld.nl - GitHub to Vimexx Deployment

## 📋 **Deployment vanuit GitHub Repository**

### **Repository**: https://github.com/Tjallingsol/thuisbatterijwereld

---

## 🎯 **Methode 1: Automatische Build via GitHub Actions (Aanbevolen)**

### **Setup (Eénmalig)**
1. **Push naar GitHub** (zie stappen hieronder)
2. **GitHub Actions** bouwt automatisch static files bij elke push
3. **Download** de gegenereerde bestanden
4. **Upload** naar Vimexx

### **Voordelen:**
- ✅ Automatische builds bij code wijzigingen
- ✅ Altijd de laatste versie
- ✅ Geen lokale setup nodig
- ✅ Versie controle en backup

---

## 🔧 **Methode 2: Direct vanuit Repository (Simpel)**

### **Download Static Files:**
1. Ga naar: https://github.com/Tjallingsol/thuisbatterijwereld
2. Klik op **"Code" → "Download ZIP"**
3. Extract het ZIP bestand
4. Navigeer naar `static-export/` folder
5. Upload inhoud naar je Vimexx `public_html/`

---

## 📦 **Wat zit er in de Repository**

```
thuisbatterijwereld/
├── 📁 src/                          # Source code (Hono/TypeScript)
├── 📁 static-export/                # ✅ KLAAR VOOR UPLOAD
│   ├── index.html                   # Homepage
│   ├── vergelijken.html             # Vergelijking
│   ├── kopen.html                   # Kopen pagina
│   ├── kosten.html                  # Calculator
│   ├── subsidie.html                # Subsidie info
│   ├── 📁 gids/                     # Guide pagina's
│   ├── 📁 blog/                     # Blog artikelen
│   ├── 📁 merken/                   # Product reviews
│   ├── 📁 static/                   # CSS/JS bestanden
│   ├── .htaccess                    # Apache config
│   ├── sitemap.xml                  # SEO sitemap
│   ├── robots.txt                   # SEO robots
│   └── DEPLOYMENT_README.md         # Upload instructies
├── 📁 .github/workflows/            # Automatische builds
└── package.json                    # Dependencies
```

---

## 🚀 **Stap-voor-Stap: GitHub naar Vimexx**

### **Stap 1: Repository Klonen/Downloaden**
```bash
# Optie A: Git clone (als je Git hebt)
git clone https://github.com/Tjallingsol/thuisbatterijwereld.git

# Optie B: Download ZIP van GitHub website
```

### **Stap 2: Static Files Uploaden**
1. **Lokaal**: Open `static-export/` folder
2. **Vimexx**: Log in op File Manager
3. **Upload**: Alle bestanden uit `static-export/` → `public_html/`

### **Stap 3: Domain & SSL**
1. **DNS**: Wijs `thuisbatterijwereld.nl` naar Vimexx
2. **SSL**: Activeer Let's Encrypt certificaat
3. **Test**: Ga naar https://thuisbatterijwereld.nl

---

## 🔄 **Updates Maken**

### **Voor Toekomstige Wijzigingen:**

1. **Edit code** in de repository
2. **Push naar GitHub**
3. **GitHub Actions** bouwt nieuwe static files
4. **Download** nieuwe build van GitHub
5. **Upload** geüpdatete bestanden naar Vimexx

### **GitHub Actions Workflow:**
- ✅ Automatisch triggeren bij push naar `main`
- ✅ Bouwt alle HTML pagina's
- ✅ Optimaliseert voor productie
- ✅ Maakt download klaar via "Actions" tab

---

## 📋 **Test Checklist na Upload**

Controleer deze URLs na deployment:

- ✅ `https://thuisbatterijwereld.nl/` (Homepage)
- ✅ `https://thuisbatterijwereld.nl/vergelijken` (Vergelijking)
- ✅ `https://thuisbatterijwereld.nl/kopen` (Kopen)  
- ✅ `https://thuisbatterijwereld.nl/kosten` (Calculator)
- ✅ `https://thuisbatterijwereld.nl/gids/kopers-gids` (Gids)
- ✅ `https://thuisbatterijwereld.nl/blog/energieonafhankelijkheid` (Blog)
- ✅ `https://thuisbatterijwereld.nl/zonneplan-thuisbatterij` (Merk pagina)

---

## 🛠️ **Technische Details**

### **Server Requirements:**
- ✅ **Apache webserver** (standard bij Vimexx)
- ✅ **PHP niet nodig** (pure HTML/CSS/JS)
- ✅ **SSL certificaat** (Let's Encrypt via Vimexx)

### **Features:**
- ✅ **Responsive design** - werkt op alle devices
- ✅ **SEO geoptimaliseerd** - meta tags, sitemap, clean URLs
- ✅ **Calculator functionaliteit** - JavaScript werkt client-side
- ✅ **Snelle loading** - geoptimaliseerd voor prestaties

### **Browser Support:**
- ✅ Chrome, Firefox, Safari, Edge (laatste versies)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📞 **Support & Maintenance**

### **Voor Hulp:**
1. **GitHub Issues**: Maak een issue in de repository
2. **Documentation**: Lees `DEPLOYMENT_README.md` in static-export/
3. **Vimexx Support**: Voor hosting gerelateerde vragen

### **Backup:**
- ✅ **GitHub Repository**: Automatische backup van alle code
- ✅ **Versie Controle**: Volledige geschiedenis van wijzigingen
- ✅ **Rollback**: Eenvoudig terug naar vorige versie

---

**🎉 Succes met je deployment!**