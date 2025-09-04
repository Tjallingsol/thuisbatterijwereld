#!/usr/bin/env python3
"""
Script to create missing brand pages based on the Growatt template
"""

import re

# Battery data from live site
batteries = {
    "tesla-powerwall-2": {
        "merk": "Tesla",
        "model": "Powerwall 2", 
        "capaciteit": 13.5,
        "prijs": 8500,
        "garantie": 10,
        "efficiency": 90,
        "app": True,
        "subsidiegeschikt": True,
        "installatiegemak": "Complex",
        "pros": ["Bekende merknaam", "Grote capaciteit", "Goede app"],
        "cons": ["Zeer duur", "Beperkte beschikbaarheid", "Lagere efficiency"],
        "rating": 3.8,
        "reviewCount": 245,
        "affiliate_url": "https://www.bol.com/nl/nl/s/?searchtext=tesla+powerwall+thuisbatterij"
    },
    "lg-resu": {
        "merk": "LG",
        "model": "RESU 10H",
        "capaciteit": 9.8,
        "prijs": 5200,
        "garantie": 10,
        "efficiency": 95,
        "app": False,
        "subsidiegeschikt": True,
        "installatiegemak": "Gemiddeld",
        "pros": ["Betrouwbare kwaliteit", "Compacte afmetingen", "Goede garantie"],
        "cons": ["Geen eigen app", "Middenklasse prijs", "Beperkte uitbreidbaarheid"],
        "rating": 4.0,
        "reviewCount": 178,
        "affiliate_url": "https://www.bol.com/nl/nl/s/?searchtext=lg+resu+thuisbatterij"
    },
    "byd-battery-box": {
        "merk": "BYD",
        "model": "Battery-Box Premium LVS",
        "capaciteit": 8.0,
        "prijs": 4200,
        "garantie": 10,
        "efficiency": 96,
        "app": True,
        "subsidiegeschikt": True,
        "installatiegemak": "Gemiddeld",
        "pros": ["Modulair systeem", "Hoge efficiency", "Goede prijs-kwaliteit"],
        "cons": ["Minder bekende merknaam", "Beperkte capaciteit per module", "Complexe configuratie"],
        "rating": 3.7,
        "reviewCount": 92,
        "affiliate_url": "https://www.bol.com/nl/nl/s/?searchtext=byd+battery+box+thuisbatterij"
    },
    "solax-triple-power": {
        "merk": "Solax",
        "model": "Triple Power T58",
        "capaciteit": 11.6,
        "prijs": 5600,
        "garantie": 10,
        "efficiency": 94,
        "app": True,
        "subsidiegeschikt": True,
        "installatiegemak": "Eenvoudig",
        "pros": ["All-in-one systeem", "Eenvoudige installatie", "Goede monitoring"],
        "cons": ["Beperkte merknaam bekendheid", "Gemiddelde efficiency", "Hogere prijs per kWh"],
        "rating": 3.6,
        "reviewCount": 73,
        "affiliate_url": "https://www.bol.com/nl/nl/s/?searchtext=solax+triple+power+thuisbatterij"
    },
    "pylontech-us3000c": {
        "merk": "Pylontech",
        "model": "US3000C",
        "capaciteit": 7.4,
        "prijs": 3400,
        "garantie": 5,
        "efficiency": 95,
        "app": False,
        "subsidiegeschikt": True,
        "installatiegemak": "Complex",
        "pros": ["Zeer betaalbaar", "Modulair uitbreidbaar", "Betrouwbare technologie"],
        "cons": ["Kortere garantie", "Geen eigen app", "Technische installatie vereist"],
        "rating": 4.3,
        "reviewCount": 156,
        "affiliate_url": "https://www.bol.com/nl/nl/s/?searchtext=pylontech+us3000c+thuisbatterij"
    },
    "huawei-luna2000": {
        "merk": "Huawei",
        "model": "LUNA2000-5kWh",
        "capaciteit": 5.0,
        "prijs": 2900,
        "garantie": 10,
        "efficiency": 97,
        "app": True,
        "subsidiegeschikt": True,
        "installatiegemak": "Gemiddeld",
        "pros": ["Hoogste efficiency", "Compacte afmetingen", "Uitstekende app"],
        "cons": ["Kleine capaciteit", "Beperkte uitbreidbaarheid", "Hogere prijs per kWh"],
        "rating": 4.1,
        "reviewCount": 89,
        "affiliate_url": "https://www.bol.com/nl/nl/s/?searchtext=huawei+luna2000+thuisbatterij"
    }
}

# Load template
with open('/home/user/webapp/merken/growatt-arb-10.html', 'r', encoding='utf-8') as f:
    template = f.read()

def replace_battery_data(template, battery_id, data):
    """Replace Growatt data with new battery data"""
    content = template
    
    # Replace title and meta
    old_title = "Growatt ARB 10.24kWh Review 2025 - Prijs, Specificaties & Ervaringen"
    new_title = f"{data['merk']} {data['model']} Review 2025 - Prijs, Specificaties & Ervaringen"
    content = content.replace(old_title, new_title)
    
    # Replace description
    old_desc = "Uitgebreide Growatt ARB 10.24kWh review. ✓ 10.24 kWh capaciteit ✓ €4,500 prijs ✓ 10 jaar garantie ✓ Subsidie geschikt ✓ Pros & cons"
    new_desc = f"Uitgebreide {data['merk']} {data['model']} review. ✓ {data['capaciteit']} kWh capaciteit ✓ €{data['prijs']} prijs ✓ {data['garantie']} jaar garantie ✓ {'Subsidie geschikt' if data['subsidiegeschikt'] else 'Niet subsidiabel'} ✓ Pros & cons"
    content = content.replace(old_desc, new_desc)
    
    # Replace keywords
    old_keywords = "growatt thuisbatterij, growatt arb 10.24kwh, growatt batterij review, growatt prijs, thuisbatterij growatt"
    new_keywords = f"{data['merk'].lower()} thuisbatterij, {data['merk'].lower()} {data['model'].lower()}, {data['merk'].lower()} batterij review, {data['merk'].lower()} prijs, thuisbatterij {data['merk'].lower()}"
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
    
    # Rating stars - convert to integer stars for display
    stars = int(round(data['rating']))
    star_html = "★" * stars + "☆" * (5 - stars)
    # This is a simple replacement - you might want to make this more sophisticated
    
    # Specs table
    content = content.replace('{"merk": "Growatt"', f'{{"merk": "{data["merk"]}"')
    content = content.replace('"model": "ARB 10.24kWh"', f'"model": "{data["model"]}"')
    content = content.replace('"capaciteit": 10.24', f'"capaciteit": {data["capaciteit"]}')
    content = content.replace('"prijs": 4500', f'"prijs": {data["prijs"]}')
    content = content.replace('"garantie": 10', f'"garantie": {data["garantie"]}')
    content = content.replace('"efficiency": 95', f'"efficiency": {data["efficiency"]}')
    
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
    
    return content

# Create each missing brand page
for battery_id, data in batteries.items():
    new_content = replace_battery_data(template, battery_id, data)
    
    filename = f"/home/user/webapp/merken/{battery_id}.html"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ Created {filename}")

print(f"\n🎉 Successfully created {len(batteries)} missing brand pages!")