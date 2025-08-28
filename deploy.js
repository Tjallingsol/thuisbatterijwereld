#!/usr/bin/env node

/**
 * Simple deployment script for Thuisbatterijwereld.nl
 * Generates static HTML and creates deployment package
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting deployment build...');

// Ensure static-export directory exists
const exportDir = './static-export';
if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
}

// Create subdirectories
['gids', 'blog', 'merken'].forEach(dir => {
    const fullPath = path.join(exportDir, dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
});

console.log('📁 Directories created');

// Note: This script is for local use
// For GitHub deployment, you'll need to set up the workflow manually
// See GITHUB_DEPLOYMENT.md for instructions

console.log('✅ Deployment structure ready');
console.log('📖 See GITHUB_DEPLOYMENT.md for GitHub setup instructions');

module.exports = {
    exportDir,
    pages: [
        '/',
        '/vergelijken',
        '/kopen', 
        '/kosten',
        '/subsidie',
        '/blog',
        '/faq',
        '/over-ons',
        '/gids/kopers-gids',
        '/gids/installatie',
        '/gids/onderhoud-garantie',  
        '/gids/besparing-maximaliseren',
        '/blog/energieonafhankelijkheid',
        '/zonneplan-thuisbatterij',
        '/growatt-thuisbatterij',
        '/merken/growatt-arb-10',
        '/merken/dyness-powerwall-b4850',
        '/merken/victron-multiplus',
        '/merken/homewizard-p1',
        '/merken/zonneplan-battery'
    ]
};