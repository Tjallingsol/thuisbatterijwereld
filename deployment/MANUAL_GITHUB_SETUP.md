# 📋 Handmatige GitHub Actions Setup voor Vimexx Deployment

## ⚠️ Permissions Issue Oplossing

Vanwege GitHub App permissions kunnen workflows niet automatisch worden toegevoegd. Hier is de handmatige setup:

## 🔧 Stap 1: Workflow Files Toevoegen

1. **Ga naar je GitHub repository**: https://github.com/Tjallingsol/thuisbatterijwereld
2. **Klik op "Create new file"**
3. **Bestandsnaam**: `.github/workflows/deploy-to-vimexx.yml`
4. **Kopieer de inhoud** van `deployment/github-workflows/deploy-to-vimexx.yml`
5. **Commit** het bestand

## 🔐 Stap 2: GitHub Secrets Instellen

**Ga naar**: Repository → Settings → Secrets and variables → Actions

**Voeg toe**:
```
VIMEXX_FTP_SERVER = ftp.thuisbatterijwereld.nl
VIMEXX_FTP_USERNAME = [jouw-vimexx-username]
VIMEXX_FTP_PASSWORD = [jouw-vimexx-password]
```

## 📍 Stap 3: Vimexx FTP Gegevens Verkrijgen

### Via je Vimexx Control Panel:
1. **Log in** op web0111.zxcs.nl:2222 (of je eigen control panel URL)
2. **Ga naar** "File Manager" of "FTP Accounts"  
3. **Server details**:
   ```
   Server: ftp.thuisbatterijwereld.nl (of web0111.zxcs.nl)
   Username: [staat in je Vimexx panel]
   Password: [maak aan of gebruik bestaande]
   Directory: /domains/thuisbatterijwereld.nl/public_html
   ```

### Als je geen FTP account hebt:
1. **Maak nieuw FTP account** in Vimexx control panel
2. **Geef toegang** tot thuisbatterijwereld.nl domain  
3. **Noteer** username en password

## 🚀 Stap 4: Test Deployment

### Automatisch (na setup):
- **Push code** naar main branch → Automatische deployment
- **Check Actions tab** voor status

### Handmatig:
1. **Ga naar Actions** tab in GitHub
2. **Selecteer** "Deploy to Vimexx Hosting"
3. **Klik** "Run workflow"

## 📁 Alternatieve Deployment Methodes

### Methode 1: Direct Upload (Meest Betrouwbaar)
1. **Download** `static-export` folder van GitHub
2. **Log in** op je Vimexx File Manager
3. **Upload** alle bestanden naar `public_html`

### Methode 2: Lokaal Genereren + Upload
```bash
npm run export
# Upload inhoud van ./static-export/ naar Vimexx
```

### Methode 3: FTP Client (FileZilla)
```
Host: ftp.thuisbatterijwereld.nl
Username: [jouw-vimexx-username]  
Password: [jouw-vimexx-password]
Remote directory: /domains/thuisbatterijwereld.nl/public_html/
Local directory: ./static-export/
```

## ✅ Verificatie

**Na deployment check**:
- ✅ https://thuisbatterijwereld.nl laadt correct
- ✅ Alle 23 pagina's zijn toegankelijk  
- ✅ .htaccess URL rewriting werkt
- ✅ Sitemap.xml is beschikbaar
- ✅ Schema markup is actief

## 🎯 Doel Structuur in Vimexx

```
public_html/
├── index.html                    # Homepage
├── vergelijken.html             # Alle batterijen
├── kosten.html                  # Calculator  
├── subsidie.html                # ISDE info
├── merken/                      # Product pages
│   ├── growatt-arb-10.html
│   ├── dyness-powerwall-b4850.html
│   └── [andere producten].html
├── gids/                        # Handleidingen
├── blog/                        # Artikelen
├── .htaccess                    # URL rewriting
├── sitemap.xml                  # SEO
└── robots.txt                   # Crawl rules
```

## 📞 Troubleshooting

**Deployment errors?**
- Controleer FTP credentials in GitHub Secrets
- Test FTP verbinding met FileZilla eerst
- Check Vimexx control panel voor account status

**Website niet bereikbaar?**
- Controleer of bestanden in juiste `public_html` directory staan
- Verify .htaccess is geüpload
- Check Vimexx DNS instellingen

**Schema markup problemen?**
- Test met [Google Rich Results Test](https://search.google.com/test/rich-results)
- Alle schema markup zit in de HTML head sectie

---
**Setup door**: GitHub Actions + Vimexx FTP  
**Doelmap**: `/domains/thuisbatterijwereld.nl/public_html/`  
**Status**: Klaar voor handmatige activatie 🚀