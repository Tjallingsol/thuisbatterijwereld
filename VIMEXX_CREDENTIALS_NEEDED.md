# 🔐 GitHub Secrets Setup Required

## ⚠️ Action Required
Je moet eerst je Vimexx hosting gegevens toevoegen aan GitHub Secrets voordat automatische deployment werkt.

## 📋 Benodigde Gegevens van Vimexx

Ga naar je **Vimexx Control Panel** en verzamel:

```
FTP Server: ftp.thuisbatterijwereld.nl (of web0111.zxcs.nl)
Username: [jouw-ftp-username]
Password: [jouw-ftp-password] 
```

## 🔐 Toevoegen aan GitHub

1. **Ga naar**: https://github.com/Tjallingsol/thuisbatterijwereld/settings/secrets/actions
2. **Klik**: "New repository secret"
3. **Voeg toe** (één voor één):

```
Name: VIMEXX_FTP_SERVER
Value: ftp.thuisbatterijwereld.nl

Name: VIMEXX_FTP_USERNAME  
Value: [jouw-vimexx-ftp-username]

Name: VIMEXX_FTP_PASSWORD
Value: [jouw-vimexx-ftp-password]
```

## 🚀 Na Setup

- **Push code** → Automatische deployment
- **Check Actions tab** voor deployment status
- **Website live** op https://thuisbatterijwereld.nl

## 📞 Hulp Nodig?

**Vimexx gegevens niet gevonden?**
- Log in op Vimexx control panel
- Zoek naar "FTP Accounts" of "File Manager"
- Maak nieuw FTP account aan als nodig

**GitHub Secrets problemen?**
- Controleer spelling van secret names
- Geen spaties voor/na values
- Test handmatige deployment via Actions tab