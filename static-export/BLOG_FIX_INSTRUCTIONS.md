# Blog Fix Instructies

## Probleem
De blog pagina geeft "Forbidden" fout omdat:
1. Er is zowel een `blog.html` bestand als een `blog/` directory
2. De .htaccess rewrite regels veroorzaken conflicten
3. Sommige blog artikel links bestaan nog niet

## Oplossingen (kies één):

### Oplossing 1: Gebruik alleen blog.html (AANBEVOLEN)
```bash
# Verwijder de blog directory
rm -rf blog/

# Upload de aangepaste .htaccess file die ik heb gemaakt
# Dit zorgt ervoor dat /blog naar blog.html gaat
```

### Oplossing 2: Gebruik alleen blog directory
```bash
# Verwijder blog.html
rm blog.html

# Gebruik blog/index.html (die ik al heb aangemaakt)
# Directory toegang zou dan moeten werken
```

### Oplossing 3: Hernoem blog naar iets anders
```bash
# Hernoem blog directory naar kennisbank
mv blog kennisbank

# Update alle links in de HTML files van /blog/ naar /kennisbank/
```

## Huidige status
✅ Aangepaste .htaccess file die directories beter afhandelt
✅ blog/index.html bestand aangemaakt als kopie van blog.html  
✅ energieonafhankelijkheid.html verplaatst naar root als energieonafhankelijkheid-blog.html

## Test na upload
- Ga naar yourdomain.nl/blog
- Controleer of de pagina laadt zonder "Forbidden" fout
- Test de navigatie links in het menu

## Als het nog steeds niet werkt
- Controleer server error logs
- Zorg dat directory permissions 755 zijn
- Zorg dat file permissions 644 zijn