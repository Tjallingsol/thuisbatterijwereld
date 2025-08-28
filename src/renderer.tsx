import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title, description, keywords }) => {
  return (
    <html lang="nl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || 'Thuisbatterij – Bespaar energie en geld met slimme batterij-opslag'}</title>
        <meta name="description" content={description || 'Vergelijk de beste thuisbatterijen van 2025. Bespaar op energiekosten, verhoog zelfconsumptie zonne-energie. ✓ Subsidie ✓ Reviews ✓ Prijzen'} />
        <meta name="keywords" content={keywords || 'thuisbatterij, thuisbatterij kopen, wat kost thuisbatterij, growatt thuisbatterij, dyness thuisbatterij, victron thuisbatterij, zonneplan thuisbatterij, subsidie thuisbatterij 2025, terugverdientijd thuisbatterij'} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={title || 'Thuisbatterij – Bespaar energie en geld met slimme batterij-opslag'} />
        <meta property="og:description" content={description || 'Vergelijk de beste thuisbatterijen van 2025. Bespaar op energiekosten, verhoog zelfconsumptie zonne-energie.'} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="nl_NL" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Thuisbatterij Vergelijken",
            "description": "De beste thuisbatterijen vergelijken en kopen. Reviews, prijzen en subsidie informatie.",
            "url": "https://thuisbatterij.pages.dev",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://thuisbatterij.pages.dev/vergelijken?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}</script>
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script>{`
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'energy-green': '#10b981',
                  'energy-blue': '#3b82f6',
                  'battery-orange': '#f59e0b'
                }
              }
            }
          }
        `}</script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Custom CSS */}
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-50 text-gray-900">
        {/* Navigation */}
        <nav class="bg-white shadow-lg border-b-2 border-energy-green">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <a href="/" class="flex items-center space-x-2">
                  <i class="fas fa-battery-three-quarters text-energy-green text-2xl"></i>
                  <span class="text-xl font-bold text-gray-900">Thuisbatterij.nl</span>
                </a>
              </div>
              <div class="hidden md:flex items-center space-x-8">
                <a href="/" class="text-gray-700 hover:text-energy-green font-medium">Home</a>
                <a href="/vergelijken" class="text-gray-700 hover:text-energy-green font-medium">Vergelijken</a>
                <a href="/kopen" class="text-gray-700 hover:text-energy-green font-medium">Kopen</a>
                <a href="/kosten" class="text-gray-700 hover:text-energy-green font-medium">Kosten</a>
                <a href="/subsidie" class="text-gray-700 hover:text-energy-green font-medium">Subsidie</a>
                
                {/* Gidsen Dropdown */}
                <div class="relative group">
                  <button class="text-gray-700 hover:text-energy-green font-medium flex items-center">
                    Gidsen
                    <i class="fas fa-chevron-down ml-1 text-sm"></i>
                  </button>
                  <div class="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div class="py-2">
                      <a href="/gids/kopers-gids" class="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-energy-green border-b border-gray-100">
                        <div class="flex items-start">
                          <i class="fas fa-book text-energy-green mr-3 mt-1"></i>
                          <div>
                            <div class="font-semibold">Complete Kopers Gids</div>
                            <div class="text-xs text-gray-500">Capaciteit, merken, installatie, subsidie</div>
                          </div>
                        </div>
                      </a>
                      <a href="/gids/installatie" class="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-energy-blue border-b border-gray-100">
                        <div class="flex items-start">
                          <i class="fas fa-tools text-energy-blue mr-3 mt-1"></i>
                          <div>
                            <div class="font-semibold">Installatie Handleiding</div>
                            <div class="text-xs text-gray-500">Van voorbereiding tot inbedrijfstelling</div>
                          </div>
                        </div>
                      </a>
                      <a href="/gids/onderhoud-garantie" class="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-battery-orange border-b border-gray-100">
                        <div class="flex items-start">
                          <i class="fas fa-shield-alt text-battery-orange mr-3 mt-1"></i>
                          <div>
                            <div class="font-semibold">Onderhoud &amp; Garantie</div>
                            <div class="text-xs text-gray-500">Optimale conditie en levensduur</div>
                          </div>
                        </div>
                      </a>
                      <a href="/gids/besparing-maximaliseren" class="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-energy-green">
                        <div class="flex items-start">
                          <i class="fas fa-chart-line text-energy-green mr-3 mt-1"></i>
                          <div>
                            <div class="font-semibold">Besparing Maximaliseren</div>
                            <div class="text-xs text-gray-500">Slim laden en energiegewoonten</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                
                <a href="/blog" class="text-gray-700 hover:text-energy-green font-medium">Blog</a>
                <a href="/faq" class="text-gray-700 hover:text-energy-green font-medium">FAQ</a>
              </div>
              <div class="md:hidden flex items-center">
                <button id="mobile-menu-button" class="text-gray-700 hover:text-energy-green focus:outline-none focus:text-energy-green">
                  <i class="fas fa-bars text-xl"></i>
                </button>
              </div>
            </div>
          </div>
          {/* Mobile menu */}
          <div id="mobile-menu" class="md:hidden bg-white border-t border-gray-200 hidden">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="/" class="block px-3 py-2 text-gray-700 hover:text-energy-green font-medium">Home</a>
              <a href="/vergelijken" class="block px-3 py-2 text-gray-700 hover:text-energy-green font-medium">Vergelijken</a>
              <a href="/kopen" class="block px-3 py-2 text-gray-700 hover:text-energy-green font-medium">Kopen</a>
              <a href="/kosten" class="block px-3 py-2 text-gray-700 hover:text-energy-green font-medium">Kosten</a>
              <a href="/subsidie" class="block px-3 py-2 text-gray-700 hover:text-energy-green font-medium">Subsidie</a>
              
              {/* Gidsen section voor mobiel */}
              <div class="px-3 py-2">
                <div class="text-gray-500 text-sm font-semibold uppercase mb-2">Gidsen</div>
                <div class="space-y-1 pl-4">
                  <a href="/gids/kopers-gids" class="block py-2 text-gray-600 hover:text-energy-green text-sm">
                    <i class="fas fa-book mr-2"></i>Complete Kopers Gids
                  </a>
                  <a href="/gids/installatie" class="block py-2 text-gray-600 hover:text-energy-blue text-sm">
                    <i class="fas fa-tools mr-2"></i>Installatie Handleiding
                  </a>
                  <a href="/gids/onderhoud-garantie" class="block py-2 text-gray-600 hover:text-battery-orange text-sm">
                    <i class="fas fa-shield-alt mr-2"></i>Onderhoud &amp; Garantie
                  </a>
                  <a href="/gids/besparing-maximaliseren" class="block py-2 text-gray-600 hover:text-energy-green text-sm">
                    <i class="fas fa-chart-line mr-2"></i>Besparing Maximaliseren
                  </a>
                </div>
              </div>
              
              <a href="/blog" class="block px-3 py-2 text-gray-700 hover:text-energy-green font-medium">Blog</a>
              <a href="/faq" class="block px-3 py-2 text-gray-700 hover:text-energy-green font-medium">FAQ</a>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer class="bg-gray-900 text-white mt-16">
          <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div class="col-span-1 md:col-span-2">
                <div class="flex items-center space-x-2 mb-4">
                  <i class="fas fa-battery-three-quarters text-energy-green text-2xl"></i>
                  <span class="text-xl font-bold">Thuisbatterij.nl</span>
                </div>
                <p class="text-gray-300 mb-4">
                  De beste thuisbatterijen vergelijken en kopen. Onafhankelijke reviews, actuele prijzen en subsidie-informatie.
                </p>
                <p class="text-sm text-gray-400">
                  © 2025 Thuisbatterij.nl - Alle rechten voorbehouden
                </p>
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-4">Producten</h3>
                <ul class="space-y-2 text-gray-300">
                  <li><a href="/merken/growatt-arb-10" class="hover:text-white">Growatt</a></li>
                  <li><a href="/merken/dyness-powerwall-b4850" class="hover:text-white">Dyness</a></li>
                  <li><a href="/merken/victron-multiplus" class="hover:text-white">Victron</a></li>
                  <li><a href="/merken/homewizard-p1" class="hover:text-white">HomeWizard</a></li>
                  <li><a href="/merken/zonneplan-battery" class="hover:text-white">Zonneplan</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-4">Informatie</h3>
                <ul class="space-y-2 text-gray-300">
                  <li><a href="/privacy" class="hover:text-white">Privacy</a></li>
                  <li><a href="/disclaimer" class="hover:text-white">Disclaimer</a></li>
                  <li><a href="/contact" class="hover:text-white">Contact</a></li>
                  <li><a href="/over-ons" class="hover:text-white">Over ons</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

        {/* JavaScript */}
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>{`
          // Mobile menu toggle
          document.getElementById('mobile-menu-button')?.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
          });

          // Smooth scrolling for anchor links
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const target = document.querySelector(this.getAttribute('href'));
              if (target) {
                target.scrollIntoView({
                  behavior: 'smooth'
                });
              }
            });
          });
        `}</script>
      </body>
    </html>
  )
})
