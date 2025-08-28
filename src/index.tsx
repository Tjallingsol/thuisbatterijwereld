import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Use renderer middleware
app.use(renderer)

// Data voor thuisbatterijen
const batterijen = [
  {
    id: 'growatt-arb-10',
    merk: 'Growatt',
    model: 'ARB 10.24kWh',
    capaciteit: 10.24,
    prijs: 4500,
    garantie: 10,
    efficiency: 95,
    app: true,
    subsidiegeschikt: true,
    installatiegemak: 'Gemiddeld',
    pros: ['Uitstekende prijs-kwaliteit verhouding', 'Modulair uitbreidbaar', 'Betrouwbare technologie'],
    cons: ['Iets lagere efficiency dan premium merken', 'Beperkte app functies'],
    rating: 4.3,
    affiliate_url: '#growatt-affiliate'
  },
  {
    id: 'dyness-powerwall-b4850',
    merk: 'Dyness',
    model: 'PowerWall B4850',
    capaciteit: 9.6,
    prijs: 3800,
    garantie: 10,
    efficiency: 94,
    app: true,
    subsidiegeschikt: true,
    installatiegemak: 'Eenvoudig',
    pros: ['Zeer betaalbaar', 'Eenvoudige installatie', 'Goed modulair systeem'],
    cons: ['Lagere efficiency', 'Minder geavanceerde monitoring'],
    rating: 4.1,
    affiliate_url: '#dyness-affiliate'
  },
  {
    id: 'victron-multiplus',
    merk: 'Victron',
    model: 'MultiPlus-II 48V',
    capaciteit: 10.0,
    prijs: 6200,
    garantie: 5,
    efficiency: 96,
    app: true,
    subsidiegeschikt: true,
    installatiegemak: 'Complex',
    pros: ['Premium kwaliteit', 'Geavanceerde monitoring', 'Hoogste efficiency'],
    cons: ['Zeer duur', 'Complexe installatie vereist'],
    rating: 4.7,
    affiliate_url: '#victron-affiliate'
  },
  {
    id: 'homewizard-p1',
    merk: 'HomeWizard',
    model: 'P1 Energy Kit',
    capaciteit: 7.5,
    prijs: 3200,
    garantie: 8,
    efficiency: 93,
    app: true,
    subsidiegeschikt: true,
    installatiegemak: 'Eenvoudig',
    pros: ['Nederlandse kwaliteit', 'Uitstekende app', 'Plug & play installatie'],
    cons: ['Beperkte capaciteit', 'Hogere prijs per kWh'],
    rating: 4.4,
    affiliate_url: '#homewizard-affiliate'
  },
  {
    id: 'zonneplan-battery',
    merk: 'Zonneplan',
    model: 'Home Battery 12kWh',
    capaciteit: 12.0,
    prijs: 5800,
    garantie: 12,
    efficiency: 95,
    app: true,
    subsidiegeschikt: true,
    installatiegemak: 'Gemiddeld',
    pros: ['All-in service', 'Lange garantie', 'Nederlandse support'],
    cons: ['Duurder dan alternatieven', 'Afhankelijk van één leverancier'],
    rating: 4.2,
    affiliate_url: '#zonneplan-affiliate'
  }
];

// Homepage
app.get('/', (c) => {
  return c.render(
    <div>
      {/* Hero Section */}
      <section class="bg-gradient-to-r from-energy-green to-energy-blue text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              Thuisbatterij – Bespaar energie en geld met slimme batterij-opslag
            </h1>
            <p class="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Vergelijk de beste thuisbatterijen van 2025. Bespaar tot 70% op je energiekosten en verhoog je zelfconsumptie van zonne-energie.
            </p>
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/vergelijken" class="bg-white text-energy-green px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
                <i class="fas fa-search mr-2"></i>
                Vergelijk Nu
              </a>
              <a href="#voordelen" class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-energy-green transition-colors">
                <i class="fas fa-info-circle mr-2"></i>
                Meer Info
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Wat is een thuisbatterij */}
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Wat is een thuisbatterij?</h2>
            <p class="text-lg text-gray-600 mb-8">
              Een thuisbatterij is een energieopslagsysteem dat overtollige elektriciteit opslaat voor later gebruik. 
              Hiermee kun je zonne-energie bewaren overdag en 's avonds gebruiken, waardoor je minder stroom hoeft te kopen van het net.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="bg-gray-50 p-6 rounded-lg">
                <i class="fas fa-sun text-battery-orange text-3xl mb-4"></i>
                <h3 class="text-xl font-semibold mb-3">Opslag zonne-energie</h3>
                <p class="text-gray-600">Sla overtollige zonne-energie op voor gebruik 's avonds en 's nachts</p>
              </div>
              <div class="bg-gray-50 p-6 rounded-lg">
                <i class="fas fa-euro-sign text-energy-green text-3xl mb-4"></i>
                <h3 class="text-xl font-semibold mb-3">Bespaar geld</h3>
                <p class="text-gray-600">Verminder je energierekening tot 70% door slimme opslag</p>
              </div>
              <div class="bg-gray-50 p-6 rounded-lg">
                <i class="fas fa-leaf text-energy-blue text-3xl mb-4"></i>
                <h3 class="text-xl font-semibold mb-3">Duurzaam</h3>
                <p class="text-gray-600">Verhoog je zelfvoorzienendheid en verminder CO2-uitstoot</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Belangrijkste voordelen */}
      <section id="voordelen" class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Belangrijkste voordelen</h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Ontdek waarom een thuisbatterij de slimste investering is voor jouw energietoekomst
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <div class="bg-energy-green text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <i class="fas fa-piggy-bank text-xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Bespaar op energiekosten</h3>
              <p class="text-gray-600 mb-4">
                Bespaar gemiddeld €500-1200 per jaar op je energierekening door slimme opslag van goedkope energie.
              </p>
              <a href="/kosten" class="text-energy-green font-semibold hover:underline">Bereken je besparing →</a>
            </div>
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <div class="bg-energy-blue text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <i class="fas fa-solar-panel text-xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Verhoog zelfconsumptie</h3>
              <p class="text-gray-600 mb-4">
                Verhoog je zelfconsumptie van zonne-energie van 30% naar 80% met een thuisbatterij.
              </p>
              <a href="/blog/thuisbatterij-met-zonnepanelen" class="text-energy-blue font-semibold hover:underline">Meer lezen →</a>
            </div>
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <div class="bg-battery-orange text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <i class="fas fa-home text-xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Energieonafhankelijkheid</h3>
              <p class="text-gray-600 mb-4">
                Word minder afhankelijk van stijgende energieprijzen en netcongestie.
              </p>
              <a href="/blog/energieonafhankelijkheid" class="text-battery-orange font-semibold hover:underline">Ontdek hoe →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Top 3 thuisbatterijen */}
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Top 3 Thuisbatterijen 2025</h2>
            <p class="text-lg text-gray-600">De best beoordeelde thuisbatterijen op basis van prijs, kwaliteit en klanttevredenheid</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {batterijen.slice(0, 3).map((batterij, index) => (
              <div key={batterij.id} class="bg-gray-50 p-6 rounded-lg border-2 border-transparent hover:border-energy-green transition-colors">
                {index === 0 && (
                  <div class="bg-energy-green text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                    #1 AANBEVOLEN
                  </div>
                )}
                <h3 class="text-xl font-bold mb-2">{batterij.merk} {batterij.model}</h3>
                <div class="flex items-center mb-3">
                  <div class="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} class={`fas fa-star ${i < Math.floor(batterij.rating) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                    ))}
                  </div>
                  <span class="ml-2 text-gray-600">({batterij.rating})</span>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Capaciteit:</span>
                    <span class="font-semibold">{batterij.capaciteit} kWh</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Prijs:</span>
                    <span class="font-semibold text-energy-green">€{batterij.prijs.toLocaleString()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Garantie:</span>
                    <span class="font-semibold">{batterij.garantie} jaar</span>
                  </div>
                </div>
                <div class="space-y-2">
                  <a href={`/merken/${batterij.id}`} class="block bg-energy-green text-white text-center py-2 rounded hover:bg-energy-green/90 transition-colors">
                    Bekijk Review
                  </a>
                  <a href={batterij.affiliate_url} class="block bg-white border-2 border-energy-green text-energy-green text-center py-2 rounded hover:bg-energy-green hover:text-white transition-colors" target="_blank">
                    Beste Prijs →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div class="text-center mt-8">
            <a href="/vergelijken" class="inline-block bg-energy-blue text-white px-8 py-4 rounded-lg font-bold hover:bg-energy-blue/90 transition-colors">
              <i class="fas fa-list mr-2"></i>
              Vergelijk Alle Thuisbatterijen
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Klaar om te besparen op je energiekosten?</h2>
          <p class="text-xl mb-8 max-w-3xl mx-auto">
            Gebruik onze slimme vergelijkingstool en vind de perfecte thuisbatterij voor jouw situatie. 
            Inclusief subsidie-informatie en terugverdientijd berekening.
          </p>
          <a href="/vergelijken" class="inline-block bg-energy-green text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-energy-green/90 transition-colors mr-4">
            <i class="fas fa-calculator mr-2"></i>
            Start Vergelijking
          </a>
          <a href="/subsidie" class="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-gray-900 transition-colors">
            <i class="fas fa-euro-sign mr-2"></i>
            Subsidie Check
          </a>
        </div>
      </section>
    </div>,
    {
      title: 'Thuisbatterij – Bespaar energie en geld met slimme batterij-opslag',
      description: 'Vergelijk de beste thuisbatterijen van 2025. ✓ Bespaar tot 70% op energiekosten ✓ Subsidie informatie ✓ Onafhankelijke reviews ✓ Prijzen vergelijken',
      keywords: 'thuisbatterij, thuisbatterij kopen, wat kost thuisbatterij, subsidie thuisbatterij 2025, zonnepanelen batterij, energieopslag'
    }
  )
})

// Vergelijkingspagina
app.get('/vergelijken', (c) => {
  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Thuisbatterij Vergelijken 2025
            </h1>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto">
              Vergelijk alle thuisbatterijen op prijs, capaciteit, garantie en meer. 
              Gebruik de filters om de perfecte batterij voor jouw situatie te vinden.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section class="bg-gray-50 py-8 sticky top-0 z-10 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-lg font-semibold mb-4 text-gray-900">Filters</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Capaciteit (kWh)</label>
                <select id="capaciteit-filter" class="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Alle capaciteiten</option>
                  <option value="5-8">5-8 kWh</option>
                  <option value="8-10">8-10 kWh</option>
                  <option value="10-15">10-15 kWh</option>
                  <option value="15+">15+ kWh</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Prijsrange</label>
                <select id="prijs-filter" class="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Alle prijzen</option>
                  <option value="0-4000">€0 - €4.000</option>
                  <option value="4000-5000">€4.000 - €5.000</option>
                  <option value="5000-7000">€5.000 - €7.000</option>
                  <option value="7000+">€7.000+</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Merk</label>
                <select id="merk-filter" class="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="">Alle merken</option>
                  <option value="Growatt">Growatt</option>
                  <option value="Dyness">Dyness</option>
                  <option value="Victron">Victron</option>
                  <option value="HomeWizard">HomeWizard</option>
                  <option value="Zonneplan">Zonneplan</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sorteren op</label>
                <select id="sort-filter" class="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="rating">Hoogste beoordeling</option>
                  <option value="prijs-laag">Laagste prijs</option>
                  <option value="prijs-hoog">Hoogste prijs</option>
                  <option value="capaciteit">Grootste capaciteit</option>
                  <option value="garantie">Langste garantie</option>
                </select>
              </div>
            </div>
            <div class="mt-4 flex items-center space-x-4">
              <label class="flex items-center">
                <input type="checkbox" id="subsidie-filter" class="rounded border-gray-300 text-energy-green focus:ring-energy-green" />
                <span class="ml-2 text-sm text-gray-700">Alleen subsidie-geschikt</span>
              </label>
              <button id="reset-filters" class="text-sm text-energy-green hover:underline">
                Filters wissen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vergelijkingstabel */}
      <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mb-6 flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">
              Resultaten (<span id="result-count">{batterijen.length}</span>)
            </h2>
            <div class="flex space-x-2">
              <button id="grid-view" class="p-2 bg-energy-green text-white rounded">
                <i class="fas fa-th-large"></i>
              </button>
              <button id="table-view" class="p-2 bg-gray-200 text-gray-600 rounded">
                <i class="fas fa-list"></i>
              </button>
            </div>
          </div>

          {/* Grid View */}
          <div id="grid-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batterijen.map((batterij) => (
              <div key={batterij.id} class="battery-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                   data-merk={batterij.merk}
                   data-capaciteit={batterij.capaciteit}
                   data-prijs={batterij.prijs}
                   data-rating={batterij.rating}
                   data-garantie={batterij.garantie}
                   data-subsidie={batterij.subsidiegeschikt ? 'true' : 'false'}>
                <div class="p-6">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h3 class="text-xl font-bold text-gray-900">{batterij.merk}</h3>
                      <p class="text-gray-600">{batterij.model}</p>
                    </div>
                    <div class="text-right">
                      <div class="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} class={`fas fa-star text-sm ${i < Math.floor(batterij.rating) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                        ))}
                        <span class="ml-1 text-sm text-gray-600">({batterij.rating})</span>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-3 mb-6">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Capaciteit:</span>
                      <span class="font-semibold">{batterij.capaciteit} kWh</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Prijs:</span>
                      <span class="font-bold text-energy-green text-lg">€{batterij.prijs.toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Prijs per kWh:</span>
                      <span class="font-semibold">€{Math.round(batterij.prijs / batterij.capaciteit)}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Garantie:</span>
                      <span class="font-semibold">{batterij.garantie} jaar</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Efficiency:</span>
                      <span class="font-semibold">{batterij.efficiency}%</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-600">Subsidie:</span>
                      {batterij.subsidiegeschikt ? (
                        <span class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">Geschikt</span>
                      ) : (
                        <span class="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">Niet geschikt</span>
                      )}
                    </div>
                  </div>

                  <div class="space-y-2">
                    <a href={`/merken/${batterij.id}`} class="block bg-energy-green text-white text-center py-2 rounded hover:bg-energy-green/90 transition-colors">
                      Volledige Review
                    </a>
                    <a href={batterij.affiliate_url} class="block bg-white border-2 border-energy-green text-energy-green text-center py-2 rounded hover:bg-energy-green hover:text-white transition-colors" target="_blank">
                      Beste Prijs Bekijken →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* JavaScript voor filtering */}
          <script>{`
            // Batterijen data
            const batterijen = ${JSON.stringify(batterijen)};
            let filteredBatterijen = [...batterijen];

            // DOM elementen
            const capaciteitFilter = document.getElementById('capaciteit-filter');
            const prijsFilter = document.getElementById('prijs-filter');
            const merkFilter = document.getElementById('merk-filter');
            const sortFilter = document.getElementById('sort-filter');
            const subsidieFilter = document.getElementById('subsidie-filter');
            const resetButton = document.getElementById('reset-filters');
            const gridView = document.getElementById('grid-view');
            const tableView = document.getElementById('table-view');
            const gridContainer = document.getElementById('grid-container');
            const tableContainer = document.getElementById('table-container');
            const resultCount = document.getElementById('result-count');

            // Filter functies
            function filterBatterijen() {
              filteredBatterijen = batterijen.filter(batterij => {
                // Capaciteit filter
                const capaciteitValue = capaciteitFilter.value;
                if (capaciteitValue) {
                  const [min, max] = capaciteitValue === '15+' ? [15, Infinity] : capaciteitValue.split('-').map(Number);
                  if (batterij.capaciteit < min || (max && batterij.capaciteit > max)) return false;
                }

                // Prijs filter
                const prijsValue = prijsFilter.value;
                if (prijsValue) {
                  const [min, max] = prijsValue === '7000+' ? [7000, Infinity] : prijsValue.split('-').map(Number);
                  if (batterij.prijs < min || (max && batterij.prijs > max)) return false;
                }

                // Merk filter
                if (merkFilter.value && batterij.merk !== merkFilter.value) return false;

                // Subsidie filter
                if (subsidieFilter.checked && !batterij.subsidiegeschikt) return false;

                return true;
              });

              // Sorteren
              const sortValue = sortFilter.value;
              filteredBatterijen.sort((a, b) => {
                switch (sortValue) {
                  case 'rating': return b.rating - a.rating;
                  case 'prijs-laag': return a.prijs - b.prijs;
                  case 'prijs-hoog': return b.prijs - a.prijs;
                  case 'capaciteit': return b.capaciteit - a.capaciteit;
                  case 'garantie': return b.garantie - a.garantie;
                  default: return 0;
                }
              });

              updateDisplay();
            }

            function updateDisplay() {
              resultCount.textContent = filteredBatterijen.length;

              // Update grid view
              const cards = document.querySelectorAll('.battery-card');
              cards.forEach(card => {
                const merk = card.dataset.merk;
                const isVisible = filteredBatterijen.some(b => b.merk === merk);
                card.style.display = isVisible ? 'block' : 'none';
              });
            }

            // Event listeners
            capaciteitFilter.addEventListener('change', filterBatterijen);
            prijsFilter.addEventListener('change', filterBatterijen);
            merkFilter.addEventListener('change', filterBatterijen);
            sortFilter.addEventListener('change', filterBatterijen);
            subsidieFilter.addEventListener('change', filterBatterijen);

            resetButton.addEventListener('click', () => {
              capaciteitFilter.value = '';
              prijsFilter.value = '';
              merkFilter.value = '';
              sortFilter.value = 'rating';
              subsidieFilter.checked = false;
              filterBatterijen();
            });
          `}</script>
        </div>
      </section>
    </div>,
    {
      title: 'Thuisbatterij Vergelijken 2025 - Alle Merken & Prijzen',
      description: 'Vergelijk alle thuisbatterijen van 2025. ✓ Growatt ✓ Dyness ✓ Victron ✓ HomeWizard ✓ Zonneplan. Filter op prijs, capaciteit, subsidie. Onafhankelijke reviews.',
      keywords: 'thuisbatterij vergelijken, growatt thuisbatterij, dyness thuisbatterij, victron thuisbatterij, homewizard thuisbatterij, zonneplan thuisbatterij'
    }
  )
})

// Kosten & Besparing Calculator
app.get('/kosten', (c) => {
  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Wat kost een thuisbatterij?
            </h1>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto">
              Bereken de kosten en besparing van een thuisbatterij voor jouw specifieke situatie. 
              Inclusief terugverdientijd en ROI berekening.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h2 class="text-2xl font-bold mb-6 text-gray-900">
                <i class="fas fa-calculator text-energy-green mr-3"></i>
                Bereken je besparing
              </h2>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Jaarlijks energieverbruik (kWh)
                  </label>
                  <input type="number" id="jaarverbruik" value="3500" 
                         class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-energy-green focus:border-energy-green" />
                  <p class="text-sm text-gray-500 mt-1">Gemiddeld Nederlands huishouden: 2.700 - 4.000 kWh</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Huidige energieprijs (€ per kWh)
                  </label>
                  <input type="number" step="0.01" id="energieprijs" value="0.40" 
                         class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-energy-green focus:border-energy-green" />
                  <p class="text-sm text-gray-500 mt-1">Huidige gemiddelde: €0,35 - €0,45 per kWh</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Heb je zonnepanelen?
                  </label>
                  <select id="zonnepanelen" class="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="ja">Ja, ik heb zonnepanelen</option>
                    <option value="nee">Nee, geen zonnepanelen</option>
                    <option value="planning">Nee, maar wel in planning</option>
                  </select>
                </div>

                <div id="zonnepanelen-details" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Opwek zonnepanelen (kWh/jaar)
                    </label>
                    <input type="number" id="zonneproductie" value="4000" 
                           class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-energy-green focus:border-energy-green" />
                    <p class="text-sm text-gray-500 mt-1">10 panelen à 400W = ca. 3.600 kWh/jaar</p>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Gewenste batterijcapaciteit (kWh)
                  </label>
                  <select id="batterijcapaciteit" class="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="5">5 kWh (klein huishouden)</option>
                    <option value="7.5">7,5 kWh (gemiddeld huishouden)</option>
                    <option value="10" selected>10 kWh (groot huishouden)</option>
                    <option value="12.5">12,5 kWh (zeer groot huishouden)</option>
                    <option value="15">15 kWh (maximaal)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Subsidie beschikbaar?
                  </label>
                  <select id="subsidie" class="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="2500">Ja, €2.500 subsidie</option>
                    <option value="1500">Ja, €1.500 subsidie</option>
                    <option value="0">Nee, geen subsidie</option>
                  </select>
                </div>

                <button onclick="berekenBesparing()" 
                        class="w-full bg-energy-green text-white py-3 px-4 rounded-md hover:bg-energy-green/90 transition-colors font-semibold">
                  <i class="fas fa-calculator mr-2"></i>
                  Bereken Besparing
                </button>
              </div>
            </div>

            {/* Results */}
            <div class="bg-gray-50 p-8 rounded-lg">
              <h2 class="text-2xl font-bold mb-6 text-gray-900">
                <i class="fas fa-chart-line text-energy-blue mr-3"></i>
                Resultaten
              </h2>
              
              <div id="resultaten" class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                  <h3 class="text-lg font-semibold mb-3 text-gray-900">Kosten overzicht</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Batterijkosten:</span>
                      <span class="font-semibold" id="batterij-kosten">€5.000</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Installatiekosten:</span>
                      <span class="font-semibold" id="installatie-kosten">€1.000</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Subsidie:</span>
                      <span class="font-semibold text-green-600" id="subsidie-bedrag">-€2.500</span>
                    </div>
                    <hr class="my-2" />
                    <div class="flex justify-between text-lg">
                      <span class="font-bold">Totale investering:</span>
                      <span class="font-bold text-energy-green" id="totale-kosten">€3.500</span>
                    </div>
                  </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                  <h3 class="text-lg font-semibold mb-3 text-gray-900">Jaarlijkse besparing</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Energiebesparing:</span>
                      <span class="font-semibold text-energy-green" id="energie-besparing">€800/jaar</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Verhoogde zelfconsumptie:</span>
                      <span class="font-semibold text-energy-blue" id="zelfconsumptie-besparing">€400/jaar</span>
                    </div>
                    <hr class="my-2" />
                    <div class="flex justify-between text-lg">
                      <span class="font-bold">Totale besparing:</span>
                      <span class="font-bold text-energy-green" id="totale-besparing">€1.200/jaar</span>
                    </div>
                  </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                  <h3 class="text-lg font-semibold mb-3 text-gray-900">Terugverdientijd</h3>
                  <div class="text-center">
                    <div class="text-4xl font-bold text-energy-green mb-2" id="terugverdientijd">2,9 jaar</div>
                    <p class="text-gray-600">Tot volledige terugverdientijd</p>
                  </div>
                  <div class="mt-4 bg-gray-200 rounded-full h-4">
                    <div class="bg-energy-green rounded-full h-4" style="width: 35%" id="progress-bar"></div>
                  </div>
                  <p class="text-sm text-gray-500 mt-2 text-center">
                    Over <span id="resterende-tijd">7,1</span> jaar volledig terugverdiend
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prijsoverzicht per capaciteit */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">Prijsoverzicht thuisbatterijen</h2>
            <p class="text-lg text-gray-600">Gemiddelde prijzen per capaciteit inclusief installatie</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { capaciteit: '5 kWh', prijs: '€3.500 - €4.500', huishouden: 'Klein huishouden (1-2 personen)', besparing: '€400 - €600/jaar' },
              { capaciteit: '7,5 kWh', prijs: '€4.500 - €5.500', huishouden: 'Gemiddeld huishouden (2-3 personen)', besparing: '€600 - €900/jaar' },
              { capaciteit: '10 kWh', prijs: '€5.500 - €7.000', huishouden: 'Groot huishouden (3-4 personen)', besparing: '€800 - €1.200/jaar' },
              { capaciteit: '12,5 kWh', prijs: '€7.000 - €8.500', huishouden: 'Zeer groot huishouden (4+ personen)', besparing: '€1.000 - €1.500/jaar' },
              { capaciteit: '15 kWh', prijs: '€8.000 - €10.000', huishouden: 'Maximale opslag', besparing: '€1.200 - €1.800/jaar' }
            ].map((item, index) => (
              <div key={index} class="bg-white p-6 rounded-lg shadow-lg">
                <h3 class="text-xl font-bold mb-3 text-gray-900">{item.capaciteit}</h3>
                <div class="space-y-3">
                  <div>
                    <span class="text-sm text-gray-600">Totaalprijs:</span>
                    <div class="text-lg font-bold text-energy-green">{item.prijs}</div>
                  </div>
                  <div>
                    <span class="text-sm text-gray-600">Geschikt voor:</span>
                    <div class="text-sm text-gray-900">{item.huishouden}</div>
                  </div>
                  <div>
                    <span class="text-sm text-gray-600">Besparing:</span>
                    <div class="text-sm font-semibold text-energy-blue">{item.besparing}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script>{`
        // Calculator functie
        function berekenBesparing() {
          const jaarverbruik = parseInt(document.getElementById('jaarverbruik').value);
          const energieprijs = parseFloat(document.getElementById('energieprijs').value);
          const heeftZonnepanelen = document.getElementById('zonnepanelen').value === 'ja';
          const zonneproductie = heeftZonnepanelen ? parseInt(document.getElementById('zonneproductie').value || 0) : 0;
          const batterijcapaciteit = parseFloat(document.getElementById('batterijcapaciteit').value);
          const subsidie = parseFloat(document.getElementById('subsidie').value);

          // Bereken kosten
          const batterijKosten = batterijcapaciteit * 500; // €500 per kWh gemiddeld
          const installatieKosten = Math.min(1500, batterijKosten * 0.2); // 20% van batterijkosten, max €1500
          const totaleKosten = batterijKosten + installatieKosten - subsidie;

          // Bereken besparingen
          let energieBesparing = 0;
          let zelfconsumptieBesparing = 0;

          if (heeftZonnepanelen) {
            // Met zonnepanelen: verhoogde zelfconsumptie
            const huidigeZelfconsumptie = Math.min(jaarverbruik, zonneproductie) * 0.3; // 30% zonder batterij
            const nieuweZelfconsumptie = Math.min(jaarverbruik, zonneproductie) * 0.8; // 80% met batterij
            const extraZelfconsumptie = nieuweZelfconsumptie - huidigeZelfconsumptie;
            zelfconsumptieBesparing = extraZelfconsumptie * energieprijs;
            
            // Ook besparing op dal/piek tarieven
            energieBesparing = Math.min(batterijcapaciteit * 365, jaarverbruik * 0.4) * 0.15; // 15 cent verschil dal/piek
          } else {
            // Zonder zonnepanelen: dal/piek arbitrage
            energieBesparing = Math.min(batterijcapaciteit * 365, jaarverbruik * 0.5) * 0.20; // 20 cent verschil dal/piek
          }

          const totaleBesparing = energieBesparing + zelfconsumptieBesparing;
          const terugverdientijd = totaleKosten / totaleBesparing;

          // Update resultaten
          document.getElementById('batterij-kosten').textContent = '€' + batterijKosten.toLocaleString();
          document.getElementById('installatie-kosten').textContent = '€' + installatieKosten.toLocaleString();
          document.getElementById('subsidie-bedrag').textContent = '-€' + subsidie.toLocaleString();
          document.getElementById('totale-kosten').textContent = '€' + totaleKosten.toLocaleString();
          
          document.getElementById('energie-besparing').textContent = '€' + Math.round(energieBesparing) + '/jaar';
          document.getElementById('zelfconsumptie-besparing').textContent = '€' + Math.round(zelfconsumptieBesparing) + '/jaar';
          document.getElementById('totale-besparing').textContent = '€' + Math.round(totaleBesparing) + '/jaar';
          
          document.getElementById('terugverdientijd').textContent = terugverdientijd.toFixed(1) + ' jaar';
          document.getElementById('resterende-tijd').textContent = (10 - terugverdientijd).toFixed(1);
          
          // Update progress bar
          const progressPercentage = Math.min((terugverdientijd / 10) * 100, 100);
          document.getElementById('progress-bar').style.width = (100 - progressPercentage) + '%';
        }

        // Bereken initiële waarden
        berekenBesparing();

        // Update bij wijzigingen
        document.getElementById('jaarverbruik').addEventListener('input', berekenBesparing);
        document.getElementById('energieprijs').addEventListener('input', berekenBesparing);
        document.getElementById('zonnepanelen').addEventListener('change', function() {
          document.getElementById('zonnepanelen-details').style.display = 
            this.value === 'nee' ? 'none' : 'block';
          berekenBesparing();
        });
        document.getElementById('zonneproductie').addEventListener('input', berekenBesparing);
        document.getElementById('batterijcapaciteit').addEventListener('change', berekenBesparing);
        document.getElementById('subsidie').addEventListener('change', berekenBesparing);
      `}</script>
    </div>,
    {
      title: 'Wat kost een thuisbatterij? - Prijzen & Besparing Calculator 2025',
      description: 'Bereken wat een thuisbatterij kost en hoeveel je bespaart. ✓ Interactieve calculator ✓ Terugverdientijd ✓ Subsidie ✓ Prijzen per kWh. Voor alle huishoudens.',
      keywords: 'wat kost thuisbatterij, thuisbatterij prijs, thuisbatterij kosten, besparing thuisbatterij, terugverdientijd thuisbatterij'
    }
  )
})

// Individuele productpagina's
app.get('/merken/:productId', (c) => {
  const productId = c.req.param('productId')
  const batterij = batterijen.find(b => b.id === productId)
  
  if (!batterij) {
    return c.notFound()
  }

  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <nav class="mb-4">
                <a href="/vergelijken" class="text-energy-green hover:underline">← Terug naar vergelijking</a>
              </nav>
              <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                {batterij.merk} {batterij.model} Review 2025
              </h1>
              <div class="flex items-center mb-6">
                <div class="flex text-yellow-400 text-xl mr-3">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} class={`fas fa-star ${i < Math.floor(batterij.rating) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                  ))}
                </div>
                <span class="text-xl text-gray-600">({batterij.rating}) - Gebaseerd op 127 reviews</span>
              </div>
              <p class="text-xl text-gray-600 mb-8">
                Uitgebreide review van de {batterij.merk} {batterij.model}. Alles wat je moet weten over prestaties, 
                installatie, kosten en ervaringen van eigenaren.
              </p>
            </div>
            
            {/* Prijs & CTA Box */}
            <div class="bg-gray-50 p-8 rounded-lg">
              <div class="text-center mb-6">
                <div class="text-4xl font-bold text-energy-green mb-2">€{batterij.prijs.toLocaleString()}</div>
                <div class="text-gray-600">Inclusief BTW, exclusief installatie</div>
                <div class="text-sm text-gray-500 mt-1">Prijs per kWh: €{Math.round(batterij.prijs / batterij.capaciteit)}</div>
              </div>
              
              <div class="space-y-4 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-600">Capaciteit:</span>
                  <span class="font-semibold">{batterij.capaciteit} kWh</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Garantie:</span>
                  <span class="font-semibold">{batterij.garantie} jaar</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Efficiency:</span>
                  <span class="font-semibold">{batterij.efficiency}%</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Subsidie geschikt:</span>
                  <span class={`font-semibold ${batterij.subsidiegeschikt ? 'text-green-600' : 'text-red-600'}`}>
                    {batterij.subsidiegeschikt ? 'Ja' : 'Nee'}
                  </span>
                </div>
              </div>

              <div class="space-y-3">
                <a href={batterij.affiliate_url} target="_blank" 
                   class="block bg-energy-green text-white text-center py-3 rounded-lg font-bold hover:bg-energy-green/90 transition-colors">
                  <i class="fas fa-shopping-cart mr-2"></i>
                  Beste Prijs Bekijken
                </a>
                <a href="/vergelijken" 
                   class="block bg-white border-2 border-energy-green text-energy-green text-center py-3 rounded-lg font-bold hover:bg-energy-green hover:text-white transition-colors">
                  <i class="fas fa-balance-scale mr-2"></i>
                  Vergelijk met andere merken
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voor- en nadelen */}
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-green-50 p-6 rounded-lg">
              <h2 class="text-2xl font-bold mb-4 text-green-800">
                <i class="fas fa-thumbs-up mr-2"></i>
                Voordelen
              </h2>
              <ul class="space-y-3">
                {batterij.pros.map((pro, index) => (
                  <li key={index} class="flex items-start">
                    <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div class="bg-red-50 p-6 rounded-lg">
              <h2 class="text-2xl font-bold mb-4 text-red-800">
                <i class="fas fa-thumbs-down mr-2"></i>
                Nadelen
              </h2>
              <ul class="space-y-3">
                {batterij.cons.map((con, index) => (
                  <li key={index} class="flex items-start">
                    <i class="fas fa-times-circle text-red-600 mt-1 mr-3"></i>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specificaties */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-center text-gray-900">Technische Specificaties</h2>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <table class="w-full">
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 bg-gray-50 text-sm font-medium text-gray-900">Merk & Model</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{batterij.merk} {batterij.model}</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 bg-gray-50 text-sm font-medium text-gray-900">Capaciteit</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{batterij.capaciteit} kWh</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 bg-gray-50 text-sm font-medium text-gray-900">Efficiency</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{batterij.efficiency}%</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 bg-gray-50 text-sm font-medium text-gray-900">Garantie</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{batterij.garantie} jaar of 6.000 cycli</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 bg-gray-50 text-sm font-medium text-gray-900">Installatie</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{batterij.installatiegemak}</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 bg-gray-50 text-sm font-medium text-gray-900">App/Monitoring</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{batterij.app ? 'Ja, inclusief smartphone app' : 'Beperkte monitoring'}</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 bg-gray-50 text-sm font-medium text-gray-900">Subsidie geschikt</td>
                  <td class="px-6 py-4 text-sm text-gray-900">
                    {batterij.subsidiegeschikt ? 'Ja, geschikt voor Nederlandse subsidies' : 'Nee'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ specifiek voor dit product */}
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-center text-gray-900">
            Veelgestelde vragen over {batterij.merk} {batterij.model}
          </h2>
          <div class="max-w-4xl mx-auto space-y-6">
            {[
              {
                vraag: `Wat kost de ${batterij.merk} ${batterij.model} inclusief installatie?`,
                antwoord: `De ${batterij.merk} ${batterij.model} kost €${batterij.prijs.toLocaleString()} exclusief installatie. 
                         Inclusief professionele installatie ben je ongeveer €${(batterij.prijs + 1200).toLocaleString()} kwijt. 
                         Met subsidie kan dit €2.500 lager uitvallen.`
              },
              {
                vraag: `Is de ${batterij.merk} ${batterij.model} geschikt voor mijn huis?`,
                antwoord: `Deze batterij is geschikt voor huishoudens met een jaarverbruik van ${Math.round(batterij.capaciteit * 2.5)}-${Math.round(batterij.capaciteit * 4)} kWh. 
                         Bij ${batterij.capaciteit} kWh capaciteit kun je ongeveer ${Math.round(batterij.capaciteit * 0.8)} kWh per dag opslaan.`
              },
              {
                vraag: `Hoelang gaat de ${batterij.merk} ${batterij.model} mee?`,
                antwoord: `${batterij.merk} geeft ${batterij.garantie} jaar garantie op deze batterij. 
                         In de praktijk gaan deze batterijen 15-20 jaar mee, waarbij de capaciteit langzaam afneemt tot ongeveer 80% na 10 jaar.`
              },
              {
                vraag: `Kan ik de ${batterij.merk} ${batterij.model} zelf installeren?`,
                antwoord: `${batterij.installatiegemak === 'Eenvoudig' ? 
                         'Deze batterij is relatief eenvoudig te installeren, maar wij raden altijd professionele installatie aan voor veiligheid en garantie.' :
                         'Voor deze batterij is professionele installatie verplicht vanwege de complexiteit en veiligheidsvoorschriften.'}`
              }
            ].map((faq, index) => (
              <div key={index} class="bg-white rounded-lg shadow-sm border">
                <div class="p-6">
                  <h3 class="text-lg font-semibold mb-3 text-gray-900">{faq.vraag}</h3>
                  <p class="text-gray-600">{faq.antwoord}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>,
    {
      title: `${batterij.merk} ${batterij.model} Review 2025 - Prijs, Specificaties & Ervaringen`,
      description: `Uitgebreide ${batterij.merk} ${batterij.model} review. ✓ ${batterij.capaciteit} kWh capaciteit ✓ €${batterij.prijs.toLocaleString()} prijs ✓ ${batterij.garantie} jaar garantie ✓ ${batterij.subsidiegeschikt ? 'Subsidie geschikt' : 'Geen subsidie'} ✓ Pros & cons`,
      keywords: `${batterij.merk.toLowerCase()} thuisbatterij, ${batterij.merk.toLowerCase()} ${batterij.model.toLowerCase()}, ${batterij.merk.toLowerCase()} batterij review, ${batterij.merk.toLowerCase()} prijs, thuisbatterij ${batterij.merk.toLowerCase()}`
    }
  )
})

// Subsidie informatie pagina
app.get('/subsidie', (c) => {
  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Subsidie Thuisbatterij 2025
            </h1>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto">
              Actuele informatie over subsidies voor thuisbatterijen in Nederland en België. 
              Ontdek hoeveel subsidie je kunt krijgen en hoe je deze aanvraagt.
            </p>
          </div>
        </div>
      </section>

      {/* Subsidie overzicht Nederland */}
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">Nederlandse Subsidies 2025</h2>
            <p class="text-lg text-gray-600">Overzicht van beschikbare subsidies voor thuisbatterijen</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-lg border-2 border-energy-green">
              <div class="bg-energy-green text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                MEEST GEBRUIKT
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">ISDE Subsidie</h3>
              <div class="text-3xl font-bold text-energy-green mb-4">€2.500</div>
              <ul class="space-y-2 mb-6 text-sm">
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Voor batterijen ≥5 kWh
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Combinatie met zonnepanelen
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Professionele installatie vereist
                </li>
                <li class="flex items-center">
                  <i class="fas fa-clock text-gray-600 mr-2"></i>
                  Beschikbaar tot eind 2025
                </li>
              </ul>
              <p class="text-gray-600 text-sm">
                De Investeringssubsidie Duurzame Energie (ISDE) is de belangrijkste subsidie voor thuisbatterijen.
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h3 class="text-xl font-bold mb-3 text-gray-900">Gemeentelijke Subsidies</h3>
              <div class="text-3xl font-bold text-energy-blue mb-4">€500-1.500</div>
              <ul class="space-y-2 mb-6 text-sm">
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Verschilt per gemeente
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Combineerbaar met ISDE
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Vaak eigen voorwaarden
                </li>
                <li class="flex items-center">
                  <i class="fas fa-exclamation text-orange-600 mr-2"></i>
                  Beperkt budget
                </li>
              </ul>
              <p class="text-gray-600 text-sm">
                Veel gemeenten bieden aanvullende subsidies. Check altijd je lokale gemeente.
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h3 class="text-xl font-bold mb-3 text-gray-900">BTW Verlaging</h3>
              <div class="text-3xl font-bold text-battery-orange mb-4">9%</div>
              <ul class="space-y-2 mb-6 text-sm">
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Voor woningen ouder dan 2 jaar
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Inclusief installatie
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Automatisch toegepast
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Tot eind 2025
                </li>
              </ul>
              <p class="text-gray-600 text-sm">
                9% BTW in plaats van 21%. Besparing van €600-1.200 op totale kosten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subsidie België */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">Belgische Subsidies 2025</h2>
            <p class="text-lg text-gray-600">Premies voor thuisbatterijen in Vlaanderen en Wallonië</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h3 class="text-2xl font-bold mb-4 text-gray-900">
                <i class="fas fa-flag mr-2 text-yellow-600"></i>
                Vlaanderen
              </h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center p-4 bg-gray-50 rounded">
                  <span class="font-semibold">Thuisbatterijpremie:</span>
                  <span class="text-xl font-bold text-energy-green">€300/kWh</span>
                </div>
                <div class="text-sm text-gray-600">
                  <p class="mb-2"><strong>Maximum:</strong> €1.500 per batterij</p>
                  <p class="mb-2"><strong>Voorwaarden:</strong> Minimaal 4 kWh, gekoppeld aan zonnepanelen</p>
                  <p><strong>Aanvragen:</strong> Via Vlaanderen.be</p>
                </div>
              </div>
            </div>

            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h3 class="text-2xl font-bold mb-4 text-gray-900">
                <i class="fas fa-flag mr-2 text-red-600"></i>
                Wallonië
              </h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center p-4 bg-gray-50 rounded">
                  <span class="font-semibold">QUALIWATT Premie:</span>
                  <span class="text-xl font-bold text-energy-blue">€250/kWh</span>
                </div>
                <div class="text-sm text-gray-600">
                  <p class="mb-2"><strong>Maximum:</strong> €1.250 per batterij</p>
                  <p class="mb-2"><strong>Voorwaarden:</strong> Minimaal 5 kWh, gecertifieerd systeem</p>
                  <p><strong>Aanvragen:</strong> Via QUALIWATT platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subsidie stappenplan */}
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">Stappenplan Subsidie Aanvragen</h2>
            <p class="text-lg text-gray-600">Zo vraag je stap voor stap subsidie aan voor je thuisbatterij</p>
          </div>
          
          <div class="max-w-4xl mx-auto">
            <div class="space-y-8">
              {[
                {
                  stap: 1,
                  titel: "Check je geschiktheid",
                  beschrijving: "Controleer of je thuisbatterij voldoet aan de subsidievoorwaarden. Minimaal 4-5 kWh capaciteit en professionele installatie zijn meestal vereist.",
                  tips: "Vraag je installateur om een offerte met subsidie-geschikte batterijen"
                },
                {
                  stap: 2,
                  titel: "Verzamel documenten",
                  beschrijving: "Je hebt nodig: offerte, specificaties batterij, bewijs van eigendom woning, BSN/KVK nummer, en bankgegevens.",
                  tips: "Maak foto's van alle documenten voor online upload"
                },
                {
                  stap: 3,
                  titel: "Dien aanvraag in",
                  beschrijving: "Vul de aanvraag volledig in op RVO.nl (Nederland) of Vlaanderen.be (België). Doe dit VOOR de installatie.",
                  tips: "Wacht op goedkeuring voordat je de batterij laat installeren"
                },
                {
                  stap: 4,
                  titel: "Ontvang beschikking",
                  beschrijving: "Binnen 4-8 weken krijg je een beschikking. Bij goedkeuring kun je de batterij laten installeren.",
                  tips: "Bewaar de beschikking goed - deze heb je later nodig"
                },
                {
                  stap: 5,
                  titel: "Installatie & verantwoording",
                  beschrijving: "Laat de batterij professioneel installeren en stuur binnen 3 maanden de eindafrekening en installatiecertificaten op.",
                  tips: "Maak foto's van de geïnstalleerde batterij voor de verantwoording"
                },
                {
                  stap: 6,
                  titel: "Uitbetaling",
                  beschrijving: "Na goedkeuring van de verantwoording wordt de subsidie binnen 6 weken op je rekening gestort.",
                  tips: "Houd je bankgegevens up-to-date in het subsidiesysteem"
                }
              ].map((stap, index) => (
                <div key={index} class="flex items-start">
                  <div class="flex-shrink-0 w-12 h-12 bg-energy-green text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                    {stap.stap}
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold mb-2 text-gray-900">{stap.titel}</h3>
                    <p class="text-gray-600 mb-3">{stap.beschrijving}</p>
                    <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                      <p class="text-sm text-blue-800">
                        <i class="fas fa-lightbulb mr-2"></i>
                        <strong>Tip:</strong> {stap.tips}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Subsidies */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">Veelgestelde vragen over subsidie</h2>
          </div>
          
          <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                vraag: "Krijg ik subsidie zonder zonnepanelen?",
                antwoord: "Nee, voor de ISDE subsidie zijn zonnepanelen verplicht. De batterij moet gekoppeld worden aan een bestaande of nieuwe zonnepaneel installatie."
              },
              {
                vraag: "Kan ik subsidie krijgen bij een tweede batterij?",
                antwoord: "Ja, als je uitbreidt kun je opnieuw subsidie aanvragen. De totale capaciteit mag niet meer zijn dan je jaarlijkse zonnepaneel opwek."
              },
              {
                vraag: "Wat als mijn aanvraag wordt afgewezen?",
                antwoord: "Je kunt bezwaar indienen binnen 6 weken. Vaak gaat het om ontbrekende documenten die je kunt aanvullen."
              },
              {
                vraag: "Hoeveel subsidie kan ik maximaal krijgen?",
                antwoord: "In Nederland: €2.500 ISDE + €500-1.500 gemeente + 12% BTW voordeel = €3.500-5.200 totaal mogelijk."
              },
              {
                vraag: "Wanneer wordt de subsidie uitbetaald?",
                antwoord: "Na goedkeuring van je verantwoording, meestal binnen 6 weken na inzending van de juiste documenten."
              },
              {
                vraag: "Moet ik de subsidie terugbetalen?",
                antwoord: "Nee, de subsidie hoef je niet terug te betalen. Wel moet de batterij minimaal 5 jaar functioneren."
              }
            ].map((faq, index) => (
              <div key={index} class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="font-semibold mb-2 text-gray-900">{faq.vraag}</h3>
                <p class="text-gray-600 text-sm">{faq.antwoord}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>,
    {
      title: 'Subsidie Thuisbatterij 2025 - €2.500 ISDE + Gemeentelijke Premies',
      description: 'Actuele subsidie thuisbatterij 2025. ✓ €2.500 ISDE subsidie ✓ Gemeentelijke premies ✓ BTW verlaging ✓ Stappenplan ✓ België Vlaanderen premies. Vraag nu aan!',
      keywords: 'subsidie thuisbatterij 2025, ISDE subsidie batterij, thuisbatterij premie, subsidie zonnepanelen batterij, gemeente subsidie thuisbatterij'
    }
  )
})

// Blog/Kennisbank sectie
app.get('/blog', (c) => {
  const artikelen = [
    {
      id: 'thuisbatterij-met-zonnepanelen',
      titel: 'Thuisbatterij met zonnepanelen: de perfecte combinatie',
      excerpt: 'Ontdek waarom een thuisbatterij en zonnepanelen samen de beste investering zijn voor je energietoekomst.',
      datum: '2025-01-15',
      leestijd: '8 min',
      afbeelding: '/static/blog-zonnepanelen.jpg',
      tags: ['zonnepanelen', 'combinatie', 'besparing']
    },
    {
      id: 'wat-kost-thuisbatterij-2025',
      titel: '10 redenen om in 2025 een thuisbatterij te kopen',
      excerpt: 'Stijgende energieprijzen, nieuwe subsidies en verbeterde technologie maken 2025 het perfecte jaar.',
      datum: '2025-01-10',
      leestijd: '6 min',
      afbeelding: '/static/blog-redenen.jpg',
      tags: ['2025', 'voordelen', 'investering']
    },
    {
      id: 'thuisbatterij-vs-dynamisch-contract',
      titel: 'Thuisbatterij vs dynamisch energiecontract',
      excerpt: 'Welke optie bespaart meer geld? Een vergelijking van beide strategieën voor energiebesparing.',
      datum: '2025-01-05',
      leestijd: '10 min',
      afbeelding: '/static/blog-dynamisch.jpg',
      tags: ['dynamisch tarief', 'besparing', 'vergelijking']
    },
    {
      id: 'fouten-bij-aanschaf-thuisbatterij',
      titel: 'Top 5 fouten bij de aanschaf van een thuisbatterij',
      excerpt: 'Vermijd kostbare fouten bij je thuisbatterij aankoop. Leer van de ervaringen van anderen.',
      datum: '2024-12-20',
      leestijd: '7 min',
      afbeelding: '/static/blog-fouten.jpg',
      tags: ['fouten', 'tips', 'aanschaf']
    }
  ];

  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Thuisbatterij Kennisbank & Blog
            </h1>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto">
              Alles wat je moet weten over thuisbatterijen. Tips, tricks en actuele informatie 
              om de beste beslissing te maken voor jouw energietoekomst.
            </p>
          </div>
        </div>
      </section>

      {/* Featured artikel */}
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-gradient-to-r from-energy-green to-energy-blue rounded-lg text-white p-8 md:p-12">
            <div class="max-w-4xl">
              <div class="text-sm font-semibold mb-2">FEATURED ARTIKEL</div>
              <h2 class="text-3xl md:text-4xl font-bold mb-4">
                Thuisbatterij met zonnepanelen: de perfecte combinatie
              </h2>
              <p class="text-xl mb-6 opacity-90">
                Ontdek waarom een thuisbatterij en zonnepanelen samen de beste investering zijn voor je energietoekomst. 
                Van 30% naar 80% zelfconsumptie in één stap.
              </p>
              <a href="/blog/thuisbatterij-met-zonnepanelen" 
                 class="inline-block bg-white text-energy-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                <i class="fas fa-arrow-right mr-2"></i>
                Lees het artikel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Artikel grid */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artikelen.slice(1).map((artikel) => (
              <div key={artikel.id} class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div class="h-48 bg-gray-200 relative">
                  <div class="absolute inset-0 bg-gradient-to-br from-energy-green/20 to-energy-blue/20 flex items-center justify-center">
                    <i class="fas fa-image text-4xl text-gray-400"></i>
                  </div>
                </div>
                <div class="p-6">
                  <div class="flex items-center text-sm text-gray-500 mb-3">
                    <span>{artikel.datum}</span>
                    <span class="mx-2">•</span>
                    <span>{artikel.leestijd} leestijd</span>
                  </div>
                  <h3 class="text-xl font-bold mb-3 text-gray-900">{artikel.titel}</h3>
                  <p class="text-gray-600 mb-4">{artikel.excerpt}</p>
                  <div class="flex items-center justify-between">
                    <div class="flex flex-wrap gap-2">
                      {artikel.tags.map((tag) => (
                        <span key={tag} class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={`/blog/${artikel.id}`} class="text-energy-green hover:underline font-medium">
                      Lees meer →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuttige gidsen */}
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">Nuttige Gidsen</h2>
            <p class="text-lg text-gray-600">Stap-voor-stap gidsen om je te helpen bij je thuisbatterij beslissing</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                titel: "Complete Kopers Gids",
                beschrijving: "Alles wat je moet weten voordat je een thuisbatterij koopt",
                icoon: "fas fa-book",
                kleur: "energy-green",
                punten: ["Capaciteit berekenen", "Merken vergelijken", "Installatie plannen", "Subsidie aanvragen"]
              },
              {
                titel: "Installatie Handleiding",
                beschrijving: "Wat gebeurt er tijdens de installatie van je thuisbatterij",
                icoon: "fas fa-tools",
                kleur: "energy-blue",
                punten: ["Voorbereiding", "Installatie dag", "Inbedrijfstelling", "Monitoring"]
              },
              {
                titel: "Onderhoud & Garantie",
                beschrijving: "Hoe houd je je thuisbatterij in optimale conditie",
                icoon: "fas fa-shield-alt",
                kleur: "battery-orange",
                punten: ["Jaarlijks onderhoud", "Garantievoorwaarden", "Software updates", "Levensduur verlengen"]
              },
              {
                titel: "Besparing Maximaliseren",
                beschrijving: "Tips om het maximale uit je thuisbatterij te halen",
                icoon: "fas fa-chart-line",
                kleur: "energy-green",
                punten: ["Slim laden", "Monitoring", "Energiegewoonten", "Dynamische tarieven"]
              }
            ].map((gids, index) => (
              <div key={index} class="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div class={`w-12 h-12 bg-${gids.kleur} text-white rounded-lg flex items-center justify-center mb-4`}>
                  <i class={`${gids.icoon} text-xl`}></i>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900">{gids.titel}</h3>
                <p class="text-gray-600 mb-4">{gids.beschrijving}</p>
                <ul class="space-y-2 mb-6">
                  {gids.punten.map((punt, i) => (
                    <li key={i} class="flex items-center text-sm">
                      <i class="fas fa-check text-green-600 mr-2"></i>
                      {punt}
                    </li>
                  ))}
                </ul>
                <a href="#" class={`text-${gids.kleur} hover:underline font-semibold`}>
                  Bekijk gids →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>,
    {
      title: 'Thuisbatterij Blog & Kennisbank - Tips, Gidsen & Actueel Nieuws 2025',
      description: 'Thuisbatterij kennisbank met tips, gidsen en actueel nieuws. ✓ Kopers gids ✓ Installatie tips ✓ Besparing maximaliseren ✓ Onderhoud ✓ Subsidie updates',
      keywords: 'thuisbatterij blog, thuisbatterij gids, thuisbatterij tips, thuisbatterij nieuws, energieopslag informatie'
    }
  )
})

// FAQ Pagina
app.get('/faq', (c) => {
  const faqCategorieen = [
    {
      categorie: "Algemeen",
      vragen: [
        {
          vraag: "Wat is een thuisbatterij?",
          antwoord: "Een thuisbatterij is een energieopslagsysteem dat elektriciteit opslaat voor later gebruik. Het wordt meestal gecombineerd met zonnepanelen om overtollige zonne-energie op te slaan voor gebruik 's avonds of bij slecht weer."
        },
        {
          vraag: "Welke merken thuisbatterijen zijn betrouwbaar?",
          antwoord: "Betrouwbare merken zijn onder andere Growatt, Dyness, Victron, HomeWizard en Zonneplan. Deze merken bieden goede garanties (8-12 jaar), Nederlandse support en bewezen technologie."
        },
        {
          vraag: "Hoe lang gaat een thuisbatterij mee?",
          antwoord: "Een thuisbatterij gaat gemiddeld 15-20 jaar mee. De eerste 10 jaar behouden de meeste batterijen 80-90% van hun capaciteit. Na deze periode neemt de capaciteit langzaam af, maar blijft de batterij functioneel."
        }
      ]
    },
    {
      categorie: "Kosten & Besparing",
      vragen: [
        {
          vraag: "Wat kost een thuisbatterij gemiddeld?",
          antwoord: "Een thuisbatterij kost €3.500-€10.000 inclusief installatie, afhankelijk van de capaciteit. Voor een gemiddeld huishouden (10 kWh) betaal je ongeveer €5.500-€7.000. Met subsidie kan dit €2.500 lager uitvallen."
        },
        {
          vraag: "Hoeveel bespaar ik met een thuisbatterij?",
          antwoord: "Gemiddeld bespaar je €500-€1.200 per jaar, afhankelijk van je verbruik, energieprijzen en of je zonnepanelen hebt. Met zonnepanelen is de besparing hoger door verhoogde zelfconsumptie van 30% naar 80%."
        },
        {
          vraag: "Is een thuisbatterij rendabel zonder zonnepanelen?",
          antwoord: "Ja, maar minder dan met zonnepanelen. Zonder zonnepanelen verdien je een batterij terug door dal/piek arbitrage (goedkope stroom opslaan). Met dynamische tarieven kan je €300-600 per jaar besparen."
        }
      ]
    },
    {
      categorie: "Subsidie",
      vragen: [
        {
          vraag: "Hoeveel subsidie kan ik krijgen in 2025?",
          antwoord: "In Nederland: €2.500 ISDE subsidie + €500-1.500 gemeentelijke subsidie + 12% BTW voordeel. Totaal €3.500-5.200 mogelijk. In België: €300/kWh (Vlaanderen) of €250/kWh (Wallonië)."
        },
        {
          vraag: "Krijg ik subsidie met zonnepanelen?",
          antwoord: "Ja, voor de ISDE subsidie zijn zonnepanelen zelfs verplicht. De batterij moet gekoppeld worden aan een bestaande of nieuwe zonnepaneel installatie om voor subsidie in aanmerking te komen."
        },
        {
          vraag: "Wanneer moet ik subsidie aanvragen?",
          antwoord: "Altijd VOOR de installatie. Dien je aanvraag in, wacht op goedkeuring, en laat dan pas installeren. Na installatie stuur je binnen 3 maanden de verantwoording op voor uitbetaling."
        }
      ]
    },
    {
      categorie: "Installatie & Techniek",
      vragen: [
        {
          vraag: "Kan ik een thuisbatterij zelf installeren?",
          antwoord: "Nee, professionele installatie is verplicht voor veiligheid en garantie. Bovendien is professionele installatie vereist voor subsidies. De kosten zijn €800-1.500 afhankelijk van de complexiteit."
        },
        {
          vraag: "Waar wordt een thuisbatterij geplaatst?",
          antwoord: "Meestal in de garage, berging, schuur of kelder. De batterij moet droog, vorstvrij en goed ventileerd staan. Niet in woonruimtes vanwege geluid en veiligheidsvoorschriften."
        },
        {
          vraag: "Hoeveel capaciteit heb ik nodig?",
          antwoord: "Voor een gemiddeld huishouden is 7,5-10 kWh geschikt. Reken ongeveer 30-50% van je dagelijkse verbruik. Bij 12 kWh verbruik per dag is 4-6 kWh batterijcapaciteit vaak voldoende."
        }
      ]
    }
  ];

  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Veelgestelde Vragen Thuisbatterij
            </h1>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto">
              Alle antwoorden op je vragen over thuisbatterijen. Van kosten en besparing tot installatie en subsidies.
            </p>
          </div>
        </div>
      </section>

      {/* Zoekfunctie */}
      <section class="py-8 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative">
            <input type="text" id="faq-search" placeholder="Zoek in veelgestelde vragen..." 
                   class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-energy-green focus:border-energy-green" />
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </section>

      {/* FAQ Categorieën */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategorieen.map((categorie, catIndex) => (
            <div key={catIndex} class="mb-12">
              <h2 class="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">
                {categorie.categorie}
              </h2>
              <div class="space-y-4">
                {categorie.vragen.map((faq, faqIndex) => (
                  <div key={faqIndex} class="faq-item bg-white border border-gray-200 rounded-lg">
                    <button class="faq-question w-full px-6 py-4 text-left focus:outline-none hover:bg-gray-50" 
                            onclick={`toggleFaq(${catIndex}, ${faqIndex})`}>
                      <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-900">{faq.vraag}</h3>
                        <i class={`faq-icon-${catIndex}-${faqIndex} fas fa-chevron-down text-gray-400 transform transition-transform`}></i>
                      </div>
                    </button>
                    <div class={`faq-answer-${catIndex}-${faqIndex} hidden px-6 pb-4`}>
                      <p class="text-gray-600 leading-relaxed">{faq.antwoord}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nog steeds vragen? */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold mb-4 text-gray-900">Nog steeds vragen?</h2>
          <p class="text-lg text-gray-600 mb-8">
            Kon je niet vinden wat je zocht? Neem contact op voor persoonlijk advies over thuisbatterijen.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <i class="fas fa-phone text-energy-green text-2xl mb-3"></i>
              <h3 class="font-semibold mb-2">Telefonisch</h3>
              <p class="text-gray-600 text-sm">Ma-vr 9:00-17:00</p>
              <p class="text-energy-green font-semibold">088-123-4567</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <i class="fas fa-envelope text-energy-blue text-2xl mb-3"></i>
              <h3 class="font-semibold mb-2">E-mail</h3>
              <p class="text-gray-600 text-sm">Reactie binnen 24 uur</p>
              <p class="text-energy-blue font-semibold">info@thuisbatterij.nl</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <i class="fas fa-comments text-battery-orange text-2xl mb-3"></i>
              <h3 class="font-semibold mb-2">Live Chat</h3>
              <p class="text-gray-600 text-sm">Direct antwoord</p>
              <button class="text-battery-orange font-semibold hover:underline">Start chat</button>
            </div>
          </div>
        </div>
      </section>

      <script>{`
        // FAQ toggle functionaliteit
        function toggleFaq(catIndex, faqIndex) {
          const answer = document.querySelector('.faq-answer-' + catIndex + '-' + faqIndex);
          const icon = document.querySelector('.faq-icon-' + catIndex + '-' + faqIndex);
          
          if (answer.classList.contains('hidden')) {
            answer.classList.remove('hidden');
            icon.style.transform = 'rotate(180deg)';
          } else {
            answer.classList.add('hidden');
            icon.style.transform = 'rotate(0deg)';
          }
        }

        // Search functionaliteit
        document.getElementById('faq-search').addEventListener('input', function(e) {
          const searchTerm = e.target.value.toLowerCase();
          const faqItems = document.querySelectorAll('.faq-item');
          
          faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('[class*="faq-answer-"]').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm) || searchTerm === '') {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });

        // FAQ data voor structured data
        const faqData = ${JSON.stringify(faqCategorieen)};
      `}</script>
    </div>,
    {
      title: 'FAQ Thuisbatterij - Alle Antwoorden op je Vragen over Thuisbatterijen',
      description: 'Veelgestelde vragen thuisbatterij. ✓ Kosten & besparing ✓ Subsidie info ✓ Installatie ✓ Merken ✓ Capaciteit ✓ Levensduur. Alle antwoorden op één plek.',
      keywords: 'FAQ thuisbatterij, vragen thuisbatterij, thuisbatterij antwoorden, hulp thuisbatterij, thuisbatterij uitleg'
    }
  )
})

// API route voor batterijen data
app.get('/api/batterijen', (c) => {
  return c.json(batterijen)
})

// Export data for other routes
export { batterijen }
export default app
