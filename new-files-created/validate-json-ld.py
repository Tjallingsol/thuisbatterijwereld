#!/usr/bin/env python3
"""
JSON-LD Validator for thuisbatterijwereld.nl
Validates all JSON-LD structured data in HTML files
"""

import json
import re
import os
from pathlib import Path

def extract_json_ld_from_html(html_content):
    """Extract all JSON-LD scripts from HTML content"""
    pattern = r'<script type="application/ld\+json"[^>]*>(.*?)</script>'
    matches = re.findall(pattern, html_content, re.DOTALL)
    return matches

def validate_json_ld(json_string, filename, script_num):
    """Validate a single JSON-LD string"""
    try:
        # Clean up the JSON string
        json_string = json_string.strip()
        
        # Parse JSON
        parsed = json.loads(json_string)
        
        print(f"✅ {filename} - Script {script_num}: Valid JSON-LD")
        return True
        
    except json.JSONDecodeError as e:
        print(f"❌ {filename} - Script {script_num}: JSON Error - {e}")
        print(f"   Near: {json_string[max(0, e.pos-50):e.pos+50]}")
        return False
    except Exception as e:
        print(f"❌ {filename} - Script {script_num}: Error - {e}")
        return False

def validate_html_file(filepath):
    """Validate all JSON-LD in a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        json_ld_scripts = extract_json_ld_from_html(html_content)
        
        if not json_ld_scripts:
            print(f"⚠️  {filepath.name}: No JSON-LD found")
            return True
        
        all_valid = True
        for i, script in enumerate(json_ld_scripts, 1):
            valid = validate_json_ld(script, filepath.name, i)
            if not valid:
                all_valid = False
        
        return all_valid
        
    except Exception as e:
        print(f"❌ {filepath}: File Error - {e}")
        return False

def main():
    """Main validation function"""
    base_path = Path('/home/user/webapp')
    
    # Files to validate
    files_to_check = [
        'index.html',
        'kopen.html',
        'gids/besparing-maximaliseren.html',
        'gids/kopers-gids.html', 
        'gids/installatie.html',
        'gids/onderhoud-garantie.html',
        'merken/dyness-powerwall-b4850.html',
        'merken/growatt-arb-10.html',
        'merken/victron-multiplus.html'
    ]
    
    print("🔍 JSON-LD Structured Data Validation")
    print("=" * 50)
    
    total_files = 0
    valid_files = 0
    
    for file_path in files_to_check:
        full_path = base_path / file_path
        if full_path.exists():
            total_files += 1
            if validate_html_file(full_path):
                valid_files += 1
        else:
            print(f"⚠️  {file_path}: File not found")
    
    print("\n" + "=" * 50)
    print(f"📊 Results: {valid_files}/{total_files} files valid")
    
    if valid_files == total_files:
        print("✅ All JSON-LD structured data is valid!")
        return True
    else:
        print("❌ Some files have JSON-LD errors")
        return False

if __name__ == "__main__":
    main()