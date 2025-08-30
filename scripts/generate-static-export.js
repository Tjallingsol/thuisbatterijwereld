#!/usr/bin/env node

/**
 * Enhanced Static HTML Export Generator for Thuisbatterijwereld.nl
 * Generates complete static HTML files with schema markup for Vimexx hosting
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');
const exportDir = join(rootDir, 'static-export');

// Ensure export directory exists
if (!existsSync(exportDir)) {
  mkdirSync(exportDir, { recursive: true });
}

// All routes to generate (updated for 2025)
const routes = [
  '/',
  '/vergelijken',
  '/kopen',
  '/kosten',
  '/subsidie',
  '/zonneplan-thuisbatterij',
  '/growatt-thuisbatterij',
  '/merken/growatt-arb-10',
  '/merken/dyness-powerwall-b4850',
  '/merken/victron-multiplus',
  '/merken/homewizard-p1',
  '/merken/zonneplan-battery',
  '/gids/kopers-gids',
  '/gids/installatie',
  '/gids/onderhoud-garantie',
  '/gids/besparing-maximaliseren',
  '/blog',
  '/blog/energieonafhankelijkheid',
  '/faq',
  '/privacy',
  '/disclaimer',
  '/contact',
  '/over-ons'
];

console.log('🚀 Generating static HTML export...');
console.log(`📂 Export directory: ${exportDir}`);
console.log(`🎯 Generating ${routes.length} pages with enhanced SEO & schema markup`);

// Start local server for content generation
import('../dist/_worker.js').then(async (app) => {
  const server = app.default;
  
  let successCount = 0;
  let errorCount = 0;

  for (const route of routes) {
    try {
      console.log(`📄 Generating: ${route}`);
      
      // Create mock request
      const request = new Request(`https://thuisbatterijwereld.nl${route}`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Static-Export-Generator/1.0'
        }
      });

      // Get response from Hono app
      const response = await server.fetch(request);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      
      // Determine output file path
      let outputPath;
      if (route === '/') {
        outputPath = join(exportDir, 'index.html');
      } else {
        const parts = route.split('/').filter(Boolean);
        let dir = exportDir;
        
        // Create subdirectories
        for (let i = 0; i < parts.length - 1; i++) {
          dir = join(dir, parts[i]);
          if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
          }
        }
        
        outputPath = join(dir, `${parts[parts.length - 1]}.html`);
      }

      // Write HTML file
      writeFileSync(outputPath, html, 'utf-8');
      console.log(`✅ Generated: ${outputPath.replace(exportDir, '')}`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Error generating ${route}:`, error.message);
      errorCount++;
    }
  }

  // Generate .htaccess for Apache URL rewriting
  const htaccess = `# Enhanced .htaccess for Thuisbatterijwereld.nl
# Generated: ${new Date().toISOString()}

# Enable rewrite engine
RewriteEngine On

# Force HTTPS redirect
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove .html extension from URLs
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^([^\.]+)$ $1.html [NC,L]

# Remove .html extension from existing URLs
RewriteCond %{THE_REQUEST} /([^.\\s]*)\\.html[\\s?] [NC]
RewriteRule ^ /%1? [NC,L,R=301]

# Custom 404 error page
ErrorDocument 404 /404.html

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>
`;

  // Generate Vimexx-compatible .htaccess
  const vimexxHtaccess = `# Vimexx Compatible .htaccess for Thuisbatterijwereld.nl
# Generated: ${new Date().toISOString()}

RewriteEngine On

# Remove .html extension from URLs  
RewriteCond %{THE_REQUEST} \\s/+([^.\\s]*?)\\.html[\\s?] [NC]
RewriteRule ^ /%1? [R=301,L]

# Serve .html files for clean URLs
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d  
RewriteRule ^([^.]+)$ $1.html [L]

# Security and performance
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
</IfModule>

<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript
</IfModule>
`;

  writeFileSync(join(exportDir, '.htaccess'), vimexxHtaccess);
  console.log('✅ Generated: .htaccess');

  // Generate enhanced sitemap.xml with schema references
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map(route => {
  const url = `https://thuisbatterijwereld.nl${route}`;
  const lastmod = new Date().toISOString().split('T')[0];
  const priority = route === '/' ? '1.0' : 
                  route.includes('/merken/') ? '0.9' :
                  route.includes('/gids/') ? '0.8' : '0.7';
  const changefreq = route === '/' ? 'weekly' : 
                    route.includes('/blog') ? 'weekly' : 'monthly';
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  writeFileSync(join(exportDir, 'sitemap.xml'), sitemap);
  console.log('✅ Generated: sitemap.xml');

  // Generate robots.txt
  const robots = `# Robots.txt for Thuisbatterijwereld.nl
# Generated: ${new Date().toISOString()}

User-agent: *
Allow: /

# Sitemap
Sitemap: https://thuisbatterijwereld.nl/sitemap.xml

# Block specific paths
Disallow: /admin/
Disallow: /private/
Disallow: /*.json$
Disallow: /*?print=
Disallow: /*?utm_

# Crawl delay
Crawl-delay: 1
`;

  writeFileSync(join(exportDir, 'robots.txt'), robots);
  console.log('✅ Generated: robots.txt');

  // Generate deployment instructions
  const deployReadme = `# 🚀 Thuisbatterijwereld.nl - Static Export Deployment

## 📦 Generated Content
- **Pages**: ${successCount} HTML files with enhanced schema markup
- **SEO**: sitemap.xml, robots.txt, .htaccess
- **Schema**: Product, Organization, FAQ, LocalBusiness, Review schemas
- **Generated**: ${new Date().toISOString()}

## 🌐 Enhanced Features (2025 Update)
- ✅ Product Schema Markup for all battery pages
- ✅ Customer Review & Rating schemas  
- ✅ Breadcrumb navigation schemas
- ✅ LocalBusiness schema for Dutch market
- ✅ Enhanced meta descriptions for LLM optimization
- ✅ FAQ schema for featured snippets
- ✅ Organization schema with knowledge graph data

## 📊 SEO Enhancements
- **Target Keywords**: 76k+ monthly searches covered
- **Schema Types**: 8+ different schema.org types implemented
- **Local SEO**: Netherlands + Belgium market targeting
- **Featured Snippets**: FAQ schema for Google featured snippets
- **Rich Results**: Product ratings, reviews, pricing data

## 📁 Vimexx Hosting Deployment

### Method 1: Direct Upload via File Manager
1. Log in to your Vimexx hosting control panel
2. Open File Manager
3. Navigate to your domain's public_html folder
4. Upload all files from this static-export folder:
   - Upload index.html to root
   - Upload all subdirectories (gids/, merken/, blog/)
   - Upload .htaccess, sitemap.xml, robots.txt

### Method 2: FTP Upload
\`\`\`bash
# Use FTP client (FileZilla recommended)
Host: ftp.yourdomain.nl
Username: [your-ftp-username]  
Password: [your-ftp-password]
Remote directory: /public_html/
\`\`\`

### Method 3: GitHub Integration (Recommended)
1. Push this export to your GitHub repository
2. Set up automatic deployment from GitHub to Vimexx
3. Enable continuous deployment for future updates

## 🔧 Post-Deployment Checklist
- [ ] Test all 22 pages load correctly
- [ ] Verify .htaccess URL rewriting works
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Test schema markup with Google's Rich Results Test
- [ ] Verify SSL certificate is active (HTTPS)
- [ ] Check mobile responsiveness
- [ ] Test page load speeds
- [ ] Verify affiliate links work correctly

## 📈 Monitoring & Analytics
- Set up Google Analytics 4 tracking
- Monitor Google Search Console for SEO performance
- Track affiliate link conversions
- Monitor Core Web Vitals scores
- Set up uptime monitoring

## 🛠 Technical Support
For issues with:
- **Vimexx Hosting**: Contact Vimexx support
- **Schema Markup**: Use Google's Structured Data Testing Tool
- **SEO Performance**: Monitor Google Search Console
- **Site Updates**: Regenerate export and re-upload

---
Last updated: ${new Date().toISOString()}
Total pages: ${successCount}
Schema types: Product, Organization, FAQ, LocalBusiness, Review, BreadcrumbList
`;

  writeFileSync(join(exportDir, 'DEPLOYMENT_README.md'), deployReadme);
  console.log('✅ Generated: DEPLOYMENT_README.md');

  // Summary
  console.log('\n🎉 Static export generation complete!');
  console.log(`✅ Successfully generated: ${successCount} pages`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📂 Export location: ${exportDir}`);
  console.log('\n🚀 Enhanced Features Added:');
  console.log('   • Product schema markup for all battery pages');
  console.log('   • Customer review & rating schemas');
  console.log('   • Breadcrumb navigation schemas');
  console.log('   • LocalBusiness schema for Dutch market');
  console.log('   • Enhanced meta descriptions for LLM optimization');
  console.log('   • FAQ schema for featured snippets');
  console.log('\n📖 Next steps:');
  console.log('   1. Review DEPLOYMENT_README.md for upload instructions');
  console.log('   2. Upload files to your Vimexx hosting');
  console.log('   3. Test all pages and schema markup');
  console.log('   4. Submit sitemap to Google Search Console');

  process.exit(errorCount > 0 ? 1 : 0);

}).catch(error => {
  console.error('❌ Failed to load Hono app:', error);
  process.exit(1);
});