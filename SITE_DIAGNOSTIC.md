# 🔍 Site Diagnostic - Thuisbatterijwereld.nl

## ✅ Site Status: ONLINE
**Homepage werkt!** Nu alle andere pagina's fixen...

## 🧪 **Test Deze URLs Om Het Probleem Te Identificeren**

### **Test 1: Directe .html bestanden**
```
✅ Test: https://thuisbatterijwereld.nl/vergelijken.html
✅ Test: https://thuisbatterijwereld.nl/kosten.html  
✅ Test: https://thuisbatterijwereld.nl/subsidie.html
✅ Test: https://thuisbatterijwereld.nl/merken/growatt-arb-10.html
```
**Als deze werken** → .htaccess URL rewriting probleem

### **Test 2: Clean URLs (zonder .html)**
```
❓ Test: https://thuisbatterijwereld.nl/vergelijken
❓ Test: https://thuisbatterijwereld.nl/kosten
❓ Test: https://thuisbatterijwereld.nl/subsidie  
❓ Test: https://thuisbatterijwereld.nl/merken/growatt-arb-10
```
**Als deze NIET werken** → .htaccess moet gefixed worden

## 🔧 **Snelle Oplossingen**

### **Oplossing 1: Upload Nieuwe .htaccess** ⭐ PROBEER DIT EERST
1. **Download** de nieuwe .htaccess uit `./static-export/.htaccess`
2. **Upload** naar je Vimexx public_html (overschrijf de oude)
3. **Test** clean URLs opnieuw

### **Oplossing 2: Controleer Bestandsstructuur**
Log in Vimexx File Manager en controleer:
```
public_html/
├── index.html              ← MOET ER ZIJN
├── vergelijken.html        ← MOET ER ZIJN
├── kosten.html             ← MOET ER ZIJN  
├── subsidie.html           ← MOET ER ZIJN
├── .htaccess               ← BELANGRIJK!
├── merken/                 ← DIRECTORY
│   ├── growatt-arb-10.html
│   ├── dyness-powerwall-b4850.html
│   └── [andere producten]
└── gids/                   ← DIRECTORY
    ├── kopers-gids.html
    └── [andere gidsen]
```

### **Oplossing 3: Re-upload Alle Bestanden**
Als bestanden missen:
1. **Download** hele `./static-export/` folder  
2. **Upload ALLES** naar public_html (overschrijf alles)
3. **Zorg ervoor** dat directories (merken/, gids/, blog/) ook worden geüpload

## 🚨 **Veelvoorkomende Vimexx Problemen**

### **Probleem**: 500 Internal Server Error
**Oorzaak**: mod_rewrite uitgeschakeld of .htaccess syntaxfout
**Oplossing**: 
- Verwijder .htaccess tijdelijk
- Test of site dan werkt met /pagina.html URLs
- Contact Vimexx support voor mod_rewrite

### **Probleem**: Alleen homepage werkt
**Oorzaak**: Alleen index.html geüpload, andere bestanden missen
**Oplossing**: Upload ALLE bestanden uit static-export/

### **Probleem**: 404 op subdirectories
**Oorzaak**: merken/ en gids/ directories niet geüpload  
**Oplossing**: Upload directories met inhoud

## 🎯 **Verwachte Werkende URLs**

Na fix zouden deze ALLEMAAL moeten werken:
```
✅ https://thuisbatterijwereld.nl/
✅ https://thuisbatterijwereld.nl/vergelijken
✅ https://thuisbatterijwereld.nl/kosten
✅ https://thuisbatterijwereld.nl/subsidie
✅ https://thuisbatterijwereld.nl/merken/growatt-arb-10
✅ https://thuisbatterijwereld.nl/merken/dyness-powerwall-b4850
✅ https://thuisbatterijwereld.nl/gids/kopers-gids
✅ https://thuisbatterijwereld.nl/blog
```

## 📞 **Als Niks Werkt**

**Plan B - Simpele Oplossing**:
1. **Verwijder** .htaccess tijdelijk
2. **Update** alle links in menu naar .html versies
3. **Website werkt** met URLs zoals /vergelijken.html

**Plan C - Vimexx Support**:
- Vraag of mod_rewrite actief is
- Vraag naar Apache configuratie
- Stuur .htaccess inhoud mee

---
**Status**: Site online, fixing URL routing 🔧