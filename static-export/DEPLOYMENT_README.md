# 🚀 Thuisbatterijwereld.nl - Vimexx Hosting Deployment Gids

## 📋 **Stap-voor-Stap Upload naar Vimexx**

### **1. Voorbereidingen**
- Log in op je Vimexx hosting account
- Ga naar File Manager of gebruik FTP (FileZilla aanbevolen)
- Navigeer naar je `public_html` folder (of `htdocs` folder)

### **2. Upload Bestanden**
Upload **ALLE** bestanden uit deze `static-export` folder naar je webroot:

```
public_html/
├── index.html                    (Homepage)
├── vergelijken.html             (Vergelijking)
├── kopen.html                   (Thuisbatterij Kopen)
├── kosten.html                  (Kosten Calculator)
├── subsidie.html                (Subsidie Info)
├── blog.html                    (Blog overzicht)
├── faq.html                     (FAQ)
├── over-ons.html               (Over Ons)
├── zonneplan-thuisbatterij.html (Merk pagina)
├── growatt-thuisbatterij.html   (Merk pagina)
├── .htaccess                    (Apache configuratie)
├── gids/                        (Guide pagina's)
│   ├── kopers-gids.html
│   ├── installatie.html
│   ├── onderhoud-garantie.html
│   └── besparing-maximaliseren.html
├── blog/
│   └── energieonafhankelijkheid.html
├── merken/                      (Product pagina's)
│   ├── growatt-arb-10.html
│   ├── dyness-powerwall-b4850.html
│   ├── victron-multiplus.html
│   ├── homewizard-p1.html
│   └── zonneplan-battery.html
└── static/                      (CSS/JS bestanden)
    ├── style.css
    └── app.js
```

### **3. Domein Configuratie**
- Zorg dat je domein `thuisbatterijwereld.nl` naar deze hosting wijst
- DNS A-record moet wijzen naar je Vimexx server IP
- Wacht 24-48 uur voor DNS propagatie

### **4. SSL Certificaat**
- Activeer Let's Encrypt SSL in je Vimexx control panel
- Forceer HTTPS redirects (optioneel via .htaccess)

### **5. Test je Website**
Na upload, test deze URL's:
- `https://thuisbatterijwereld.nl/`
- `https://thuisbatterijwereld.nl/vergelijken`
- `https://thuisbatterijwereld.nl/kopen`
- `https://thuisbatterijwereld.nl/gids/kopers-gids`
- `https://thuisbatterijwereld.nl/blog/energieonafhankelijkheid`

### **6. SEO & Analytics (Optioneel)**
Voeg toe aan je HTML bestanden (in `<head>` sectie):

**Google Analytics:**
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Google Search Console:**
- Voeg je site toe aan Google Search Console
- Upload sitemap.xml (zie hieronder)

## 🔧 **Technische Details**

### **Clean URLs**
De `.htaccess` zorgt voor clean URLs:
- `thuisbatterijwereld.nl/vergelijken` → `vergelijken.html`
- `thuisbatterijwereld.nl/kopen` → `kopen.html`

### **Prestaties**
- **Compressie**: Gzip enabled voor snellere loading
- **Caching**: Browser caching voor CSS/JS/afbeeldingen
- **CDN**: Tailwind CSS en FontAwesome van CDN

### **Functionaliteit**
- ✅ **Alle pagina's werken** zonder JavaScript backend
- ✅ **Calculator functionaliteit** werkt client-side
- ✅ **Responsive design** voor alle devices
- ✅ **SEO geoptimaliseerd** met meta tags

### **Updates**
Voor toekomstige updates:
1. Pas source code aan in development
2. Genereer nieuwe static HTML export
3. Upload gewijzigde bestanden naar server

## 📞 **Support**
Bij problemen:
- Check Vimexx documentatie voor File Manager
- Controleer .htaccess syntax errors in error logs
- Test individuele pagina's direct (bijv. `index.html`)

---
*Generated on: $(date)*  
*Website: Thuisbatterijwereld.nl*  
*Hosting: Vimexx*