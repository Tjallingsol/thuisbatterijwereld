#!/usr/bin/env python3
"""
Script to fix mobile hamburger menu in all HTML files
"""

import re
import glob

def fix_mobile_menu(file_path):
    """Fix mobile menu in the given HTML file"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Only fix if the file has the old mobile-menu-button
    if 'mobile-menu-button' not in content:
        return None  # No changes needed
    
    # 1. Fix the hamburger button
    old_button = r'<button id="mobile-menu-button" class="text-gray-700 hover:text-energy-green focus:outline-none focus:text-energy-green"><i class="fas fa-bars text-xl"></i></button>'
    new_button = '<button id="menuBtn" aria-controls="mobileMenu" aria-expanded="false" aria-label="Menu" class="text-gray-700 hover:text-energy-green focus:outline-none focus:text-energy-green"><i class="fas fa-bars text-xl"></i></button>'
    
    content = content.replace(old_button, new_button)
    
    # 2. Replace the mobile menu div
    mobile_menu_pattern = r'<div id="mobile-menu"[^>]*>.*?</div></div></nav>'
    
    new_mobile_menu = '''<nav id="mobileMenu" hidden class="mobile-menu-nav">
    <a href="/" class="mobile-menu-link">Home</a>
    <a href="/vergelijken" class="mobile-menu-link">Vergelijken</a>
    <a href="/kopen" class="mobile-menu-link">Kopen</a>
    <a href="/kosten" class="mobile-menu-link">Kosten</a>
    <a href="/subsidie" class="mobile-menu-link">Subsidie</a>
    <div class="mobile-menu-section">
        <div class="mobile-menu-section-title">Gidsen</div>
        <a href="/gids/kopers-gids" class="mobile-menu-sublink"><i class="fas fa-book mr-2"></i>Complete Kopers Gids</a>
        <a href="/gids/installatie" class="mobile-menu-sublink"><i class="fas fa-tools mr-2"></i>Installatie Handleiding</a>
        <a href="/gids/onderhoud-garantie" class="mobile-menu-sublink"><i class="fas fa-shield-alt mr-2"></i>Onderhoud & Garantie</a>
        <a href="/gids/besparing-maximaliseren" class="mobile-menu-sublink"><i class="fas fa-chart-line mr-2"></i>Besparing Maximaliseren</a>
    </div>
    <a href="/blog" class="mobile-menu-link">Blog</a>
    <a href="/faq" class="mobile-menu-link">FAQ</a>
</nav></div></div></nav>'''
    
    content = re.sub(mobile_menu_pattern, new_mobile_menu, content, flags=re.DOTALL)
    
    # 3. Add CSS if not present
    if 'mobile-menu-nav' not in content:
        css_insertion_point = r'(</script><link href="https://cdn\.jsdelivr\.net/npm/@fortawesome/fontawesome-free@[^>]+rel="stylesheet"/>)'
        
        mobile_css = '''<style>
/* Mobile Menu Styles */
#mobileMenu {
  position: fixed; 
  top: 64px; 
  left: 0; 
  right: 0;
  background: #fff; 
  padding: 16px; 
  z-index: 1000;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
  border-top: 1px solid #e5e7eb;
}
.mobile-menu-nav { display: flex; flex-direction: column; gap: 8px; }
.mobile-menu-link { display: block; padding: 12px 16px; color: #374151; font-weight: 500; text-decoration: none; border-radius: 8px; transition: all 0.2s; }
.mobile-menu-link:hover { background-color: #f3f4f6; color: #10b981; }
.mobile-menu-section { padding: 8px 0; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; margin: 8px 0; }
.mobile-menu-section-title { font-size: 14px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin-bottom: 8px; padding: 0 16px; }
.mobile-menu-sublink { display: block; padding: 8px 24px; color: #4b5563; font-size: 14px; text-decoration: none; border-radius: 6px; transition: all 0.2s; }
.mobile-menu-sublink:hover { background-color: #f3f4f6; color: #10b981; }
nav.bg-white { position: relative; z-index: 1001; }
@media (min-width: 768px) { #mobileMenu { display: none !important; } }
</style>'''
        
        replacement = mobile_css + r'\1'
        content = re.sub(css_insertion_point, replacement, content)
    
    # 4. Replace or add the JavaScript
    js_pattern = r'// Mobile menu toggle.*?(?=</script>|// [A-Z]|$)'
    
    new_js = '''// Mobile Menu Toggle - Working Solution
(function () {
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    var open = menu.hasAttribute('hidden');
    if (open) {
      menu.removeAttribute('hidden');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      menu.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('click', function(e) {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !menu.hasAttribute('hidden')) {
      menu.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();'''
    
    if re.search(js_pattern, content, flags=re.DOTALL):
        content = re.sub(js_pattern, new_js, content, flags=re.DOTALL)
    else:
        # Add JS before closing body tag if not found
        content = content.replace('</body>', f'<script>{new_js}</script>\n</body>')
    
    return content

# Get all HTML files to fix
files_to_fix = []
files_to_fix.extend(glob.glob('/home/user/webapp/*.html'))
files_to_fix.extend(glob.glob('/home/user/webapp/merken/*.html'))
files_to_fix.extend(glob.glob('/home/user/webapp/gids/*.html'))

print("🔧 Fixing mobile hamburger menu in all HTML files...")

fixed_count = 0
skipped_count = 0

for file_path in files_to_fix:
    try:
        fixed_content = fix_mobile_menu(file_path)
        if fixed_content is not None:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            print(f"✅ Fixed: {file_path}")
            fixed_count += 1
        else:
            print(f"⏭️ Skipped: {file_path} (already fixed or no mobile menu)")
            skipped_count += 1
    except Exception as e:
        print(f"❌ Error fixing {file_path}: {e}")

print(f"\n🎉 Mobile menu fix completed!")
print(f"✅ Fixed: {fixed_count} files")
print(f"⏭️ Skipped: {skipped_count} files")
print("\n📱 Mobile hamburger menu should now work on all pages!")