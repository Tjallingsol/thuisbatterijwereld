#!/usr/bin/env node

/**
 * Direct FTP Upload Script naar Vimexx Hosting
 * Voor als GitHub Actions niet werkt
 */

import { readFileSync } from 'fs';
import { execSync } from 'child_process';

console.log('🚀 Vimexx Deployment Script');
console.log('==========================');

// Check if static-export exists
try {
  const files = execSync('find ./static-export -name "*.html" | wc -l', { encoding: 'utf8' });
  const htmlCount = files.trim();
  
  if (parseInt(htmlCount) === 0) {
    console.log('❌ No static export found. Running export first...');
    console.log('🔨 Building and generating static export...');
    
    execSync('npm run build', { stdio: 'inherit' });
    execSync('node scripts/generate-static-export.js', { stdio: 'inherit' });
    
    console.log('✅ Static export generated!');
  } else {
    console.log(`✅ Found ${htmlCount} HTML files in static-export`);
  }
} catch (error) {
  console.error('❌ Error checking static export:', error.message);
  process.exit(1);
}

console.log('\n📋 Deployment Options:');
console.log('1. 📁 Manual Upload (Recommended)');  
console.log('2. 🔧 FTP Client (FileZilla)');
console.log('3. 🤖 GitHub Actions (Setup Required)');

console.log('\n📁 Option 1: Manual Upload via Vimexx File Manager');
console.log('1. Go to: https://web0111.zxcs.nl:2222/CMD_FILE_MANAGER/domains/thuisbatterijwereld.nl/public%5Fhtml');
console.log('2. Upload ALL files from ./static-export/ to public_html');  
console.log('3. Make sure .htaccess, sitemap.xml, robots.txt are included');

console.log('\n🔧 Option 2: FTP Client Setup (FileZilla)');
console.log('Host: ftp.thuisbatterijwereld.nl (or web0111.zxcs.nl)');
console.log('Username: [your-vimexx-ftp-username]');
console.log('Password: [your-vimexx-ftp-password]');  
console.log('Remote directory: /domains/thuisbatterijwereld.nl/public_html/');
console.log('Local directory: ./static-export/');

console.log('\n🤖 Option 3: GitHub Actions');
console.log('See: deployment/MANUAL_GITHUB_SETUP.md for complete instructions');

console.log('\n📊 Files Ready for Deployment:');
try {
  const files = execSync('ls -la ./static-export/ | grep -E "\\.(html|xml|txt|htaccess)$"', { encoding: 'utf8' });
  console.log(files);
} catch (error) {
  console.log('Run: ls ./static-export/ to see all files');
}

console.log('\n✅ Next Steps:');
console.log('1. Choose deployment method above');
console.log('2. Upload ./static-export/ contents to public_html');  
console.log('3. Test: https://thuisbatterijwereld.nl');
console.log('4. Verify all 23 pages work correctly');

console.log('\n🎯 Target: /domains/thuisbatterijwereld.nl/public_html/');
console.log('🌐 Result: https://thuisbatterijwereld.nl');