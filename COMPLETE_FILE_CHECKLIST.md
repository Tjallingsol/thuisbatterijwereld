# ✅ Complete File Checklist - Vimexx Upload

## 📁 Alle Bestanden Die In public_html/ Moeten Staan

### **Root Directory Bestanden:**
```
✅ index.html                    # Homepage
✅ blog.html                     # Blog overzicht  
✅ contact.html                  # Contact pagina
✅ disclaimer.html               # Disclaimer
✅ faq.html                     # FAQ pagina
✅ growatt-thuisbatterij.html    # Growatt product
✅ kopen.html                   # Kopers gids
✅ kosten.html                  # Kosten calculator
✅ over-ons.html                # Over ons pagina
✅ privacy.html                 # Privacy policy  
✅ subsidie.html                # Subsidie informatie
✅ vergelijken.html             # Vergelijking
✅ zonneplan-thuisbatterij.html # Zonneplan product
✅ .htaccess                    # URL rewriting (GEEN .txt!)
✅ robots.txt                   # SEO crawl rules
✅ sitemap.xml                  # SEO sitemap
```

### **merken/ Directory:**
```
merken/growatt-arb-10.html
merken/dyness-powerwall-b4850.html  
merken/victron-multiplus.html
merken/homewizard-p1.html
merken/zonneplan-battery.html
```

### **gids/ Directory:**
```  
gids/kopers-gids.html
gids/installatie.html
gids/onderhoud-garantie.html
gids/besparing-maximaliseren.html
```

### **blog/ Directory:**
```
blog/energieonafhankelijkheid.html
```

## 🔧 **Upload Instructies**

### **Methode 1: Selectieve Upload (Snelst)**
Upload alleen ontbrekende bestanden:
1. Check welke bestanden missen in je Vimexx File Manager
2. Download ontbrekende bestanden van GitHub static-export/
3. Upload alleen die bestanden

### **Methode 2: Complete Re-upload (Meest Betrouwbaar)**  
1. Download HELE static-export/ folder van GitHub
2. Upload ALLE bestanden naar public_html/ (overschrijf alles)
3. Zorg dat directories (merken/, gids/, blog/) ook worden geüpload

## 🧪 **Test URLs Na Upload**

Alle deze URLs zouden moeten werken:
```
✅ https://thuisbatterijwereld.nl/
✅ https://thuisbatterijwereld.nl/blog
✅ https://thuisbatterijwereld.nl/subsidie  
✅ https://thuisbatterijwereld.nl/privacy
✅ https://thuisbatterijwereld.nl/over-ons
✅ https://thuisbatterijwereld.nl/vergelijken
✅ https://thuisbatterijwereld.nl/kosten
✅ https://thuisbatterijwereld.nl/merken/growatt-arb-10
✅ https://thuisbatterijwereld.nl/gids/kopers-gids
```

## 🚨 **Veelgemaakte Upload Fouten**

❌ **Directory structuur vergeten**: merken/ en gids/ folders niet geüpload
❌ **Bestandsnamen verkeerd**: .htaccess.txt i.p.v. .htaccess  
❌ **Incomplete upload**: Upload gestopt halverwege
❌ **Cache issues**: Browser cache, wacht 5 minuten en probeer opnieuw

## 📊 **Totaal Aantal Bestanden**

**Verwacht in public_html/:**
- 16 HTML bestanden in root
- 5 HTML bestanden in merken/  
- 4 HTML bestanden in gids/
- 1 HTML bestand in blog/
- 3 SEO bestanden (.htaccess, robots.txt, sitemap.xml)

**Totaal: 29 bestanden** in de juiste directory structuur