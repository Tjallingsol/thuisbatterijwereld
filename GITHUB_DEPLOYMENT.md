# 🚀 GitHub Deployment naar Vimexx - Thuisbatterijwereld.nl

## 📋 **Setup Instructies**

### **1. GitHub Repository Setup** ✅
- Repository: `https://github.com/Tjallingsol/thuisbatterijwereld`  
- Branch: `main`
- Workflow: `.github/workflows/deploy-to-vimexx.yml`

### **2. Vimexx FTP Credentials Setup** 🔑

Je moet **GitHub Secrets** toevoegen voor automatische deployment:

#### **Ga naar GitHub Repository → Settings → Secrets and Variables → Actions**

Voeg deze **3 secrets** toe:

```
VIMEXX_FTP_SERVER     = je-domain.nl (of FTP server adres van Vimexx)
VIMEXX_FTP_USERNAME   = je FTP username van Vimexx  
VIMEXX_FTP_PASSWORD   = je FTP password van Vimexx
```

#### **Vimexx FTP Details vinden:**
1. Log in op je Vimexx klantpaneel
2. Ga naar **Hosting → FTP Accounts** 
3. Kopieer de FTP gegevens:
   - **Server**: meestal `thuisbatterijwereld.nl` of `ftp.thuisbatterijwereld.nl`
   - **Username**: je FTP gebruikersnaam
   - **Password**: je FTP wachtwoord

### **3. Automatische Deployment** 🤖

#### **Hoe het werkt:**
- **Push naar `main` branch** → Automatische deployment
- **Manual trigger** mogelijk via GitHub Actions tab

#### **Deployment proces:**
1. Code checkout van GitHub
2. Node.js dependencies installeren  
3. Website bouwen (`npm run build`)
4. Static HTML genereren van alle pagina's
5. Upload naar Vimexx via FTP
6. Website live op `thuisbatterijwereld.nl`

### **4. Manual Push Commands** 💻

```bash
# Wijzigingen committen
git add .
git commit -m "Update website content"

# Pushen naar GitHub (triggert automatische deployment)
git push origin main
```

### **5. Deployment Status Checken** 📊

#### **GitHub Actions:**
- Ga naar je repository → **Actions** tab
- Bekijk de deployment status
- Check logs bij problemen

#### **Website testen na deployment:**
```
✅ https://thuisbatterijwereld.nl/
✅ https://thuisbatterijwereld.nl/vergelijken
✅ https://thuisbatterijwereld.nl/kopen  
✅ https://thuisbatterijwereld.nl/kosten
✅ https://thuisbatterijwereld.nl/gids/kopers-gids
✅ https://thuisbatterijwereld.nl/blog/energieonafhankelijkheid
```

## 🔧 **Troubleshooting**

### **Deployment Fails:**
1. **Check FTP credentials** in GitHub Secrets
2. **Verify Vimexx FTP access** (test with FileZilla)
3. **Check GitHub Actions logs** for specific errors

### **Website niet bereikbaar:**
1. **DNS check**: Is domein correct ingesteld?
2. **SSL certificaat**: Activeer Let's Encrypt in Vimexx
3. **File permissions**: Check of bestanden correct geüpload zijn

### **Pagina's laden niet:**
1. **Check .htaccess** in public_html folder
2. **Verify clean URLs** werken correct
3. **Test individual HTML files** direct

## 📂 **File Structure na Deployment**

```
public_html/
├── index.html                    # Homepage
├── vergelijken.html             # Vergelijking  
├── kopen.html                   # Thuisbatterij Kopen
├── kosten.html                  # Kosten Calculator
├── .htaccess                    # Apache configuratie
├── sitemap.xml                  # SEO sitemap
├── robots.txt                   # Search engine rules
├── gids/                        # Guide pagina's
│   ├── kopers-gids.html
│   ├── installatie.html  
│   └── ...
├── blog/
│   └── energieonafhankelijkheid.html
├── merken/                      # Product reviews
└── static/                      # CSS/JS assets
```

## 🌟 **Voordelen GitHub Deployment**

- ✅ **Automatisch** - Push code, website wordt geüpdatet
- ✅ **Versie controle** - Alle wijzigingen worden bijgehouden  
- ✅ **Rollback mogelijk** - Terug naar vorige versie indien nodig
- ✅ **Team collaboration** - Meerdere mensen kunnen bijdragen
- ✅ **Backup** - Code staat veilig op GitHub
- ✅ **Professional workflow** - Zoals grote tech bedrijven

## 🎯 **Next Steps**

1. **Push naar GitHub** → Eerste deployment
2. **Test website** → Controleer alle functionaliteit  
3. **SSL activeren** → Enable HTTPS in Vimexx
4. **Google Analytics** → Toevoegen voor tracking (optioneel)
5. **Google Search Console** → Website toevoegen voor SEO

---

**🚀 Klaar voor professionele website deployment via GitHub!**