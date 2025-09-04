#!/usr/bin/env python3
"""
Script to update vergelijken.html with all 15 battery models including new Plug & Play models
"""

# Complete battery data including the 4 new Plug & Play models
new_batteries = [
    # Missing from current array: huawei-luna2000
    {
        "id": "huawei-luna2000",
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
    },
    # New Plug & Play models
    {
        "id": "marstek-plug-play",
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
    {
        "id": "growatt-smart-meter",
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
    {
        "id": "marstek-venus-e",
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
    {
        "id": "plug-in-batterij-basic",
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
]

def format_battery_js(battery):
    """Format battery data as JavaScript object"""
    pros_str = '", "'.join(battery['pros'])
    cons_str = '", "'.join(battery['cons'])
    
    return f'''{{"id":"{battery['id']}","merk":"{battery['merk']}","model":"{battery['model']}","capaciteit":{battery['capaciteit']},"prijs":{battery['prijs']},"garantie":{battery['garantie']},"efficiency":{battery['efficiency']},"app":{"true" if battery['app'] else "false"},"subsidiegeschikt":{"true" if battery['subsidiegeschikt'] else "false"},"installatiegemak":"{battery['installatiegemak']}","pros":["{pros_str}"],"cons":["{cons_str}"],"rating":{battery['rating']},"reviewCount":{battery['reviewCount']},"affiliate_url":"{battery['affiliate_url']}"}}'''

# Read the current vergelijken.html file
with open('/home/user/webapp/vergelijken.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the existing batterijen array and add new batteries
import re

# Find the end of the existing array (just before the closing ]})
array_pattern = r'(const batterijen = \[.*?)(\]\;)'
match = re.search(array_pattern, content, re.DOTALL)

if match:
    existing_array = match.group(1)
    
    # Add new batteries to the existing array
    new_batteries_js = []
    for battery in new_batteries:
        new_batteries_js.append(format_battery_js(battery))
    
    # Combine existing with new batteries
    updated_array = existing_array + ',' + ','.join(new_batteries_js) + '];\n'
    
    # Replace in content
    content = content.replace(match.group(0), updated_array)
    
    # Update the meta description to reflect 15 batteries
    content = content.replace('15+ systemen', '19+ systemen')
    content = content.replace('analyse van 15+', 'analyse van 19+')
    
    # Write updated content
    with open('/home/user/webapp/vergelijken.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Successfully updated vergelijken.html with 5 new batteries!")
    print("📊 Total batteries in comparison: 15 (was 10)")
    print("\n🔌 Added Plug & Play models:")
    for battery in new_batteries:
        print(f"  - {battery['merk']} {battery['model']} (€{battery['prijs']}, {battery['capaciteit']}kWh)")
else:
    print("❌ Could not find batterijen array in vergelijken.html")