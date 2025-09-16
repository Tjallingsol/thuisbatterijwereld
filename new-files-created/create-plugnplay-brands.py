#!/usr/bin/env python3
"""
Script to create Plug & Play brand pages based on the existing template
"""

import re

# Plug & Play Battery data from image
batteries = {
    "marstek-plug-play": {
        "merk": "Marstek",
        "model": "Plug & Play 5.12kWh", 
        "capaciteit": 5.12,
        "prijs": 3295,
        "garantie": 10,
        "efficiency": 94,
        "app": True,
        "subsidiegeschikt": True,
        "installatiegemak": "Plug & Play",
        "pros": ["Plug & Play installatie", "Betaalbare prijs", "Compact formaat"],
        "cons": ["Beperkte capaciteit", "Minder bekende merknaam", "Geen professionele service"],
        "rating": 3.8,
        "reviewCount": 45,
        "affiliate_url": "https://www.bol.com/nl/nl/s/?searchtext=marstek+plug+play+thuisbatterij"
    },
    "growatt-smart-meter": {
        "merk": "Growatt",
        "model": "Smart Meter 6.5kWh",
        "capaciteit": 6.5,
        "prijs": 3795,
        "garantie": 10,
        "efficiency": 95,
        "app": True,
        "subsidiegeschikt": True,
        "installatiegemak": "Plug & Play",
        "pros": ["Betrouwbaar Growatt merk", "Plug & Play installatie", "Goede app monitoring"],
        "cons": ["Beperkte uitbreidbaarheid", "Middenklasse capaciteit", "Hogere prijs dan basic modellen"],
        "rating": 4.1,
        "reviewCount": 78,
        "affiliate_url": "https://www.bol.com/nl/nl/s/?searchtext=growatt+smart+meter+thuisbatterij"
    },
    "marstek-venus-e": {
        "merk": "Marstek",
        "model": "Venus-E 10.24kWh",
        "capaciteit": 10.24,
        "prijs": 5495,
        "garantie": 15,
        "efficiency": 96,
        "app": True,
        "subsidiegeschikt": True,
        "installatiegemak": "Plug & Play",
        "pros": ["Grote capaciteit", "Lange garantie (15 jaar)", "Plug & Play installatie"],
        "cons": ["Hogere aanschafprijs", "Zwaarder systeem", "Beperkte service netwerk"],
        "rating": 4.0,
        "reviewCount": 62,
        "affiliate_url": "https://www.bol.com/nl/nl/s/?searchtext=marstek+venus+e+thuisbatterij"
    },
    "plug-in-batterij-basic": {
        "merk": "Plug-in",
        "model": "Batterij Basic 3.2kWh",
        "capaciteit": 3.2,
        "prijs": 2995,
        "garantie": 8,
        "efficiency": 92,
        "app": False,
        "subsidiegeschikt": True,
        "installatiegemak": "Plug & Play",
        "pros": ["Laagste prijs", "Plug & Play installatie", "Klein en compact"],
        "cons": ["Zeer beperkte capaciteit", "Kortere garantie", "Geen app monitoring"],
        "rating": 3.4,
        "reviewCount": 23,
        "affiliate_url": "https://www.bol.com/nl/nl/s/?searchtext=plug+batterij+basic+thuisbatterij"
    }
}

# Load template
with open('/home/user/webapp/merken/growatt-arb-10.html', 'r', encoding='utf-8') as f:
    template = f.read()

def replace_battery_data(template, battery_id, data):
    """Replace Growatt data with new Plug & Play battery data"""
    content = template
    
    # Replace title and meta
    old_title = "Growatt ARB 10.24kWh Review 2025 - Prijs, Specificaties & Ervaringen"
    new_title = f"{data['merk']} {data['model']} Review 2025 - Plug & Play Thuisbatterij"
    content = content.replace(old_title, new_title)
    
    # Replace description
    old_desc = "Uitgebreide Growatt ARB 10.24kWh review. ✓ 10.24 kWh capaciteit ✓ €4,500 prijs ✓ 10 jaar garantie ✓ Subsidie geschikt ✓ Pros & cons"
    new_desc = f"Uitgebreide {data['merk']} {data['model']} review. ✓ {data['capaciteit']} kWh capaciteit ✓ €{data['prijs']} prijs ✓ Plug & Play ✓ {data['garantie']} jaar garantie ✓ Pros & cons"
    content = content.replace(old_desc, new_desc)
    
    # Replace keywords
    old_keywords = "growatt thuisbatterij, growatt arb 10.24kwh, growatt batterij review, growatt prijs, thuisbatterij growatt"
    new_keywords = f"plug play thuisbatterij, {data['merk'].lower()} thuisbatterij, plug play batterij, {data['merk'].lower()} {data['model'].lower()}, plug play installatie"
    content = content.replace(old_keywords, new_keywords)
    
    # Replace JSON-LD product names and prices
    content = content.replace('"name": "Growatt ARB 10.24kWh"', f'"name": "{data["merk"]} {data["model"]}"')
    content = content.replace('"price": "4500"', f'"price": "{data["prijs"]}"')
    
    # Replace main content sections
    # Hero section
    content = content.replace("Growatt ARB 10.24kWh", f"{data['merk']} {data['model']}")
    content = content.replace("€4.500", f"€{data['prijs']}")
    content = content.replace("10.24 kWh", f"{data['capaciteit']} kWh")
    content = content.replace("4.2", str(data['rating']))
    content = content.replace("(89 reviews)", f"({data['reviewCount']} reviews)")
    
    # Specs table
    content = content.replace('{"merk": "Growatt"', f'{{"merk": "{data["merk"]}"')
    content = content.replace('"model": "ARB 10.24kWh"', f'"model": "{data["model"]}"')
    content = content.replace('"capaciteit": 10.24', f'"capaciteit": {data["capaciteit"]}')
    content = content.replace('"prijs": 4500', f'"prijs": {data["prijs"]}')
    content = content.replace('"garantie": 10', f'"garantie": {data["garantie"]}')
    content = content.replace('"efficiency": 95', f'"efficiency": {data["efficiency"]}')
    
    # Update installation ease
    content = content.replace('"installatiegemak": "Gemiddeld"', f'"installatiegemak": "{data["installatiegemak"]}"')
    
    # Pros and cons
    pros_str = '", "'.join(data['pros'])
    cons_str = '", "'.join(data['cons'])
    
    old_pros = '"Uitstekende prijs-kwaliteit verhouding", "Modulair uitbreidbaar", "Betrouwbare technologie"'
    new_pros = f'"{pros_str}"'
    content = content.replace(old_pros, new_pros)
    
    old_cons = '"Iets lagere efficiency dan premium merken", "Beperkte app functies"'
    new_cons = f'"{cons_str}"'
    content = content.replace(old_cons, new_cons)
    
    # Replace affiliate URL
    old_affiliate = "https://www.bol.com/nl/nl/s/?searchtext=growatt+arb+thuisbatterij"
    content = content.replace(old_affiliate, data['affiliate_url'])
    
    # Add specific Plug & Play content adjustments
    content = content.replace("Gemiddeld", "Plug & Play")
    content = content.replace("professionele installatie", "plug & play installatie")
    
    return content

# Create each Plug & Play brand page
for battery_id, data in batteries.items():
    new_content = replace_battery_data(template, battery_id, data)
    
    filename = f"/home/user/webapp/merken/{battery_id}.html"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ Created {filename}")

print(f"\n🎉 Successfully created {len(batteries)} Plug & Play brand pages!")