# Thuisbatterij – Bespaar energie en geld met slimme batterij-opslag

## Project Overview
- **Naam**: Thuisbatterij.nl
- **Doel**: Uitgebreide, gebruiksvriendelijke en SEO-geoptimaliseerde affiliate-website over thuisbatterijen
- **Features**: Complete vergelijkingstool, interactieve calculator, SEO-optimalisatie voor Google en LLM's

## Live URLs
- **Sandbox**: https://3000-ii430xqu9xa5cqd0nljqp.e2b.dev
- **GitHub**: (Nog te configureren)

## ✅ VOLLEDIG WERKENDE FEATURES
**Alle onderstaande pagina's zijn live en volledig functioneel:**

## Currently Completed Features

### ✅ Homepage
- SEO-geoptimaliseerde landing page met hero sectie
- Introductie over thuisbatterijen en voordelen
- Top 3 thuisbatterijen showcase
- Call-to-action voor vergelijking en subsidie check

### ✅ Slimme Vergelijkingstool (/vergelijken)
- Interactieve filters op capaciteit, prijs, merk, subsidie
- Grid en tabel weergave opties
- Real-time filtering en sortering
- Responsive design voor alle apparaten

### ✅ Productpagina's (/merken/[product-id])
- **Alle 5 batterijmerken volledig toegankelijk:** Growatt, Dyness, Victron, HomeWizard, Zonneplan
- **Gedetailleerde reviews** met sterren-ratings en klantreviews
- **Voor/nadelen overzicht** met duidelijke badges
- **Complete technische specificaties** in overzichtelijke tabellen
- **Product-specifieke FAQ** secties per merk
- **Strategisch geplaatste affiliate links** voor conversie optimalisatie

### ✅ Kosten & Besparing Calculator (/kosten)
- Interactieve calculator voor besparing berekening
- Inputs voor verbruik, energieprijs, zonnepanelen
- Real-time berekening van terugverdientijd
- Prijsoverzicht per capaciteit

### ✅ Subsidie Informatie (/subsidie)
- Nederlandse en Belgische subsidies 2025
- ISDE, gemeentelijke en BTW informatie
- Stap-voor-stap subsidie aanvraag handleiding
- FAQ over subsidies

### ✅ Blog/Kennisbank (/blog + /blog/[artikel])
- **Complete SEO-artikelen:** 4 volledig uitgewerkte gidsen (2000+ woorden each)
- **Praktische content:** Zonnepanelen combinatie, 2025 investeringsgids, dynamisch contract vergelijking
- **Individuele artikel pagina's** met breadcrumbs en social sharing
- **Related articles** functionaliteit
- **Professional layout** met author info en publish dates

### ✅ FAQ Pagina (/faq)
- LLM-vriendelijke FAQ structuur
- Categorieën: Algemeen, Kosten, Subsidie, Techniek
- Zoekfunctionaliteit in vragen
- Accordion interface voor gebruiksgemak

## Data Architecture
- **Data Models**: Batterij specificaties met alle eigenschappen (capaciteit, prijs, garantie, efficiency, etc.)
- **Storage Services**: Static data in applicatie (geschikt voor Cloudflare Pages)
- **Data Flow**: Server-side rendering met Hono, client-side filtering en interactie

## Tech Stack
- **Backend**: Hono framework (lightweight, fast)
- **Frontend**: HTML/CSS/JavaScript met Tailwind CSS
- **Deployment**: Cloudflare Pages optimized
- **Build System**: Vite
- **Runtime**: Cloudflare Workers

## SEO Optimization

### ✅ Technical SEO
- Semantic HTML structure met proper heading hierarchy
- Meta titles en descriptions voor alle pagina's
- Open Graph tags voor social media
- Mobile responsive design
- Fast loading times met Cloudflare edge deployment

### ✅ Content SEO
- Keyword optimization voor "thuisbatterij" en varianten
- Long-tail keywords in FAQ en content
- Internal linking tussen relevante pagina's
- Structured content voor featured snippets

### ✅ LLM Optimization
- Clear, informative content structuur
- FAQ's met directe antwoorden
- Consistent terminology en definities
- JSON-LD structured data (implementatie pending)

## User Guide
1. **Homepagina**: Start hier voor overzicht van thuisbatterijen en voordelen
2. **Vergelijken**: Gebruik filters om perfect passende batterij te vinden
3. **Calculator**: Bereken exact hoeveel je bespaart met een thuisbatterij
4. **Subsidie**: Check welke subsidies je kunt krijgen en hoe aan te vragen
5. **Product Reviews**: Lees gedetailleerde reviews van specifieke merken
6. **FAQ**: Vind antwoorden op veelgestelde vragen

## Features Not Yet Implemented
- [ ] JSON-LD Schema markup voor Google rich snippets
- [ ] Contact formulier en pagina
- [ ] Newsletter signup
- [ ] Cookie consent banner
- [ ] Advanced analytics tracking
- [ ] A/B testing voor CTA's
- [ ] Sitemap.xml generatie
- [ ] Robots.txt configuratie

## Recommended Next Steps
1. **Schema Markup**: Implementeer JSON-LD voor FAQ, Product en Review schema
2. **Blog Content**: Schrijf uitgebreide blog artikelen voor SEO
3. **Performance**: Optimaliseer loading times en Core Web Vitals
4. **Analytics**: Implementeer Google Analytics en Search Console
5. **Conversion**: A/B test verschillende CTA's en layouts

## Deployment Status
- **Platform**: Cloudflare Pages ready
- **Status**: ✅ Development server active op poort 3000
- **Tech Stack**: Hono + TypeScript + TailwindCSS + Cloudflare Workers
- **Last Updated**: 28 augustus 2025

## Development Commands
```bash
# Development
npm run build                    # Build voor productie
npm run dev:sandbox             # Start development server
npm run clean-port              # Ruim poort 3000 op
npm run test                    # Test server response

# PM2 Management
pm2 start ecosystem.config.cjs  # Start server als daemon
pm2 logs --nostream            # Check server logs
pm2 restart thuisbatterij-website  # Restart server
pm2 delete thuisbatterij-website   # Stop en verwijder

# Git
npm run git:commit "message"    # Commit changes
npm run git:status             # Check status
```

## Website Structuur
```
/                              # Homepage met hero en overzicht
/vergelijken                   # Slimme vergelijkingstool
/kosten                        # Calculator & prijsoverzicht  
/subsidie                      # Subsidie info & stappenplan
/blog                          # Kennisbank & artikelen
/faq                           # Veelgestelde vragen
/merken/[product-id]           # Individuele product reviews
/api/batterijen                # JSON API voor batterij data
```

## SEO Keywords Focus
- **Primair**: thuisbatterij, thuisbatterij kopen, wat kost thuisbatterij
- **Secundair**: subsidie thuisbatterij 2025, zonnepanelen batterij, energieopslag
- **Long-tail**: growatt thuisbatterij, dyness thuisbatterij, victron thuisbatterij
- **LLM Friendly**: Directe antwoorden, praktische informatie, complete gidsen