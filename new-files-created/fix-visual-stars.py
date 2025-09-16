#!/usr/bin/env python3
"""
Script to fix visual stars representation to be accurate
"""

import re
import glob

def generate_accurate_stars(rating):
    """Generate accurate star HTML based on rating"""
    full_stars = int(rating)
    partial_star = rating - full_stars
    
    stars_html = ""
    
    # Full stars
    for i in range(full_stars):
        stars_html += '<i class="fas fa-star text-yellow-400"></i>'
    
    # Partial star (if rating has decimal >= 0.3)
    if partial_star >= 0.3:
        stars_html += '<i class="fas fa-star-half-alt text-yellow-400"></i>'
        remaining_empty = 4 - full_stars
    else:
        remaining_empty = 5 - full_stars
    
    # Empty stars
    for i in range(remaining_empty):
        stars_html += '<i class="far fa-star text-gray-300"></i>'
    
    return stars_html

# Rating mapping
ratings = {
    "growatt-arb-10": 4.2,
    "dyness-powerwall-b4850": 4.0,
    "victron-multiplus": 4.4,
    "homewizard-p1": 4.1,
    "zonneplan-battery": 4.0,
    "tesla-powerwall-2": 4.0,
    "lg-resu": 4.0,
    "byd-battery-box": 4.1,
    "solax-triple-power": 4.0,
    "pylontech-us3000c": 4.3,
    "huawei-luna2000": 4.1,
    "marstek-plug-play": 4.0,
    "growatt-smart-meter": 4.1,
    "marstek-venus-e": 4.0,
    "plug-in-batterij-basic": 4.0
}

print("🌟 Fixing visual star representations...")

for battery_id, rating in ratings.items():
    file_path = f'/home/user/webapp/merken/{battery_id}.html'
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Generate accurate stars
        new_stars = generate_accurate_stars(rating)
        
        # Find and replace star displays in different contexts
        
        # Pattern 1: Main rating display with yellow stars
        star_pattern1 = r'<div class="flex text-yellow-400[^>]*">.*?</div>'
        replacement1 = f'<div class="flex text-yellow-400 text-xl mr-3">{new_stars}</div>'
        
        if re.search(star_pattern1, content):
            content = re.sub(star_pattern1, replacement1, content)
        
        # Pattern 2: Score section stars
        star_pattern2 = r'(<div class="flex text-yellow-400 text-xl">).*?(</div>)'
        replacement2 = f'\\1{new_stars}\\2'
        
        if re.search(star_pattern2, content):
            content = re.sub(star_pattern2, replacement2, content)
        
        # Pattern 3: Any other star displays
        # Look for sequences of fa-star icons and replace them
        existing_stars_pattern = r'<i class="fa[sr] fa-star[^>]*></i>(\s*<i class="fa[sr] fa-star[^>]*></i>)*'
        
        def replace_stars(match):
            return new_stars
        
        content = re.sub(existing_stars_pattern, replace_stars, content)
        
        # Also update the displayed rating number if it's incorrect
        content = re.sub(r'\b[0-9]\.[0-9]\b(?=.*\) - Gebaseerd)', str(rating), content)
        content = re.sub(r'\([0-9]\.[0-9]\)', f'({rating})', content)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Fixed stars for {battery_id}: {rating} → {new_stars}")
        
    except Exception as e:
        print(f"❌ Error fixing {battery_id}: {e}")

print(f"\n🎉 Visual star representations updated!")
print("\n📊 Star mapping:")
for battery_id, rating in sorted(ratings.items()):
    stars_display = generate_accurate_stars(rating)
    full_count = stars_display.count('fas fa-star')
    half_count = stars_display.count('star-half-alt')
    empty_count = stars_display.count('far fa-star')
    print(f"  {battery_id}: {rating} → {full_count} full + {half_count} half + {empty_count} empty")