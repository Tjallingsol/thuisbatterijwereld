# 🚀 GitHub Automatic Deployment Setup voor Vimexx

## 📋 Overzicht
Dit document helpt je om automatische deployment van GitHub naar je Vimexx hosting in te stellen, zodat elke keer als je code pusht naar de `main` branch, je website automatisch wordt bijgewerkt.

## 🔧 Stap 1: Vimexx FTP/SFTP Gegevens Verkrijgen

### Via Vimexx Control Panel:
1. Log in op je Vimexx hosting control panel
2. Ga naar **"FTP Accounts"** of **"File Manager"**
3. Noteer de volgende gegevens:

```
FTP Server: ftp.thuisbatterijwereld.nl (of web0111.zxcs.nl)
SFTP Server: thuisbatterijwereld.nl (poort 22)
Username: [jouw-ftp-username]
Password: [jouw-ftp-password]
Remote Path: /domains/thuisbatterijwereld.nl/public_html
```

### Als je geen FTP account hebt:
1. Maak een nieuw FTP account aan in je Vimexx control panel
2. Geef het account toegang tot de `public_html` directory
3. Noteer de inloggegevens

## 🔐 Stap 2: GitHub Secrets Instellen

1. Ga naar je GitHub repository: https://github.com/Tjallingsol/thuisbatterijwereld
2. Klik op **Settings** (rechtsboven)
3. Ga naar **Secrets and variables** → **Actions**
4. Klik **"New repository secret"** voor elk van deze secrets:

### Voor FTP Deployment:
```
VIMEXX_FTP_SERVER = ftp.thuisbatterijwereld.nl
VIMEXX_FTP_USERNAME = [jouw-ftp-username]
VIMEXX_FTP_PASSWORD = [jouw-ftp-password]
```

### Voor SFTP Deployment (aanbevolen):
```
VIMEXX_SFTP_SERVER = thuisbatterijwereld.nl
VIMEXX_SFTP_USERNAME = [jouw-ftp-username] 
VIMEXX_SFTP_PASSWORD = [jouw-ftp-password]
```

## 🚀 Stap 3: Deployment Activeren

### Automatische Deployment:
- **Elke push naar `main`** triggert automatisch deployment
- **Workflow duurt ~2-3 minuten** (build + upload)
- **23 HTML pagina's** worden geüpload naar `public_html`

### Handmatige Deployment:
1. Ga naar **Actions** tab in je GitHub repository
2. Selecteer **"Deploy to Vimexx Hosting"** workflow
3. Klik **"Run workflow"** → **"Run workflow"**

## 📁 Wat wordt er gedeployed?

```
public_html/
├── index.html                    # Homepage
├── vergelijken.html             # Vergelijkingspagina  
├── kosten.html                  # Kosten calculator
├── subsidie.html                # Subsidie informatie
├── merken/                      # Product pagina's
│   ├── growatt-arb-10.html
│   ├── dyness-powerwall-b4850.html
│   ├── victron-multiplus.html
│   ├── homewizard-p1.html
│   └── zonneplan-battery.html
├── gids/                        # Handleidingen
│   ├── kopers-gids.html
│   ├── installatie.html
│   ├── onderhoud-garantie.html
│   └── besparing-maximaliseren.html
├── blog/                        # Blog artikelen
│   └── energieonafhankelijkheid.html
├── .htaccess                    # URL rewriting & security
├── sitemap.xml                  # SEO sitemap
└── robots.txt                   # Search engine instructions
```

## ✅ Stap 4: Verificatie & Testing

### Na eerste deployment:
1. **Test je website**: https://thuisbatterijwereld.nl
2. **Controleer alle pagina's** werken correct
3. **Verificeer .htaccess** URL rewriting werkt
4. **Test schema markup** met [Google Rich Results Test](https://search.google.com/test/rich-results)

### GitHub Actions Monitoring:
- Ga naar **Actions** tab om deployment status te zien
- **Groene vinkjes** = succesvolle deployment
- **Rode kruisjes** = error (check logs voor details)

## 🔧 Troubleshooting

### Als deployment faalt:
1. **Check FTP/SFTP credentials** in GitHub Secrets
2. **Verify server hostnames** (soms verandert Vimexx deze)
3. **Check Vimexx control panel** voor FTP account status
4. **Try SFTP workflow** als FTP niet werkt

### Vimexx specifieke instellingen:
- **Server**: Mogelijk `web0111.zxcs.nl` i.p.v. `thuisbatterijwereld.nl`
- **Port**: FTP poort 21, SFTP poort 22
- **Path**: Controleer exact pad in je Vimexx file manager

### Manual backup optie:
Als automatische deployment niet werkt, kun je altijd:
1. **Download static-export folder** van GitHub
2. **Upload handmatig** via Vimexx File Manager
3. **Unzip** in public_html directory

## 🎯 Voordelen van Automatische Deployment

✅ **Altijd up-to-date**: Website wordt automatisch bijgewerkt bij code changes  
✅ **Zero downtime**: Nieuwe versie overschrijft oude files naadloos  
✅ **Backup in GitHub**: Volledige versiegeschiedenis bewaard  
✅ **Schema markup**: Alle SEO optimalisaties automatisch mee gedeployed  
✅ **Security**: .htaccess en robots.txt automatisch bijgewerkt  

## 📞 Support

**Vimexx Support**: Voor FTP/hosting problemen  
**GitHub Actions**: Check workflow logs voor deployment errors  
**Schema Testing**: [Google Structured Data Testing Tool](https://developers.google.com/search/docs/appearance/structured-data)

---

**Laatste update**: 28 augustus 2025  
**Status**: Klaar voor automatische deployment 🚀