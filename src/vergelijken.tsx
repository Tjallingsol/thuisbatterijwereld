import { Hono } from 'hono'
import { renderer } from './renderer'
import { batterijen } from './index'

const vergelijkenApp = new Hono()

vergelijkenApp.use(renderer)

// Vergelijkingspagina
vergelijkenApp.get('/vergelijken', (c) => {
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

          {/* Table View */}
          <div id="table-container" class="hidden overflow-x-auto">
            <table class="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capaciteit</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prijs</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">€/kWh</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Garantie</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subsidie</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acties</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {batterijen.map((batterij) => (
                  <tr key={batterij.id} class="battery-row hover:bg-gray-50"
                      data-merk={batterij.merk}
                      data-capaciteit={batterij.capaciteit}
                      data-prijs={batterij.prijs}
                      data-rating={batterij.rating}
                      data-garantie={batterij.garantie}
                      data-subsidie={batterij.subsidiegeschikt ? 'true' : 'false'}>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div class="text-sm font-medium text-gray-900">{batterij.merk}</div>
                        <div class="text-sm text-gray-500">{batterij.model}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{batterij.capaciteit} kWh</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-energy-green">€{batterij.prijs.toLocaleString()}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">€{Math.round(batterij.prijs / batterij.capaciteit)}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">{batterij.garantie} jaar</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <span class="text-sm font-medium mr-1">{batterij.rating}</span>
                        <div class="flex text-yellow-400 text-sm">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} class={`fas fa-star ${i < Math.floor(batterij.rating) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {batterij.subsidiegeschikt ? (
                        <span class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">Ja</span>
                      ) : (
                        <span class="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">Nee</span>
                      )}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <a href={`/merken/${batterij.id}`} class="text-energy-green hover:underline">Review</a>
                      <a href={batterij.affiliate_url} class="text-energy-blue hover:underline" target="_blank">Kopen</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Vergelijking tips */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">Tips voor het vergelijken van thuisbatterijen</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-lg font-semibold mb-3 text-gray-900">
                <i class="fas fa-calculator text-energy-green mr-2"></i>
                Capaciteit vs Verbruik
              </h3>
              <p class="text-gray-600">
                Kies een batterij met 30-50% van je dagelijkse verbruik. Voor een gemiddeld huishouden (10 kWh/dag) is 3-5 kWh vaak voldoende.
              </p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-lg font-semibold mb-3 text-gray-900">
                <i class="fas fa-euro-sign text-energy-green mr-2"></i>
                Totale kosten
              </h3>
              <p class="text-gray-600">
                Reken niet alleen de aanschafprijs, maar ook installatie, onderhoud en de waardevermindering mee in je berekening.
              </p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-lg font-semibold mb-3 text-gray-900">
                <i class="fas fa-shield-alt text-energy-green mr-2"></i>
                Garantie & Service
              </h3>
              <p class="text-gray-600">
                Kies voor merken met minimaal 8-10 jaar garantie en goede Nederlandse support. Dit voorkomt problemen later.
              </p>
            </div>
          </div>
        </div>
      </section>

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

          // Update grid view - show/hide cards based on filtering and sorting
          const gridContainer = document.getElementById('grid-container');
          if (gridContainer) {
            // Clear and rebuild grid with filtered and sorted results
            const cards = document.querySelectorAll('.battery-card');
            cards.forEach(card => {
              const merk = card.dataset.merk;
              const isVisible = filteredBatterijen.some(b => b.merk === merk);
              card.style.display = isVisible ? 'block' : 'none';
            });
            
            // Reorder cards based on sort order
            const sortedCards = Array.from(cards).sort((a, b) => {
              const merkA = a.dataset.merk;
              const merkB = b.dataset.merk;
              const batterijA = filteredBatterijen.find(b => b.merk === merkA);
              const batterijB = filteredBatterijen.find(b => b.merk === merkB);
              
              if (!batterijA || !batterijB) return 0;
              
              const sortValue = sortFilter.value;
              switch (sortValue) {
                case 'rating': return batterijB.rating - batterijA.rating;
                case 'prijs-laag': return batterijA.prijs - batterijB.prijs;
                case 'prijs-hoog': return batterijB.prijs - batterijA.prijs;
                case 'capaciteit': return batterijB.capaciteit - batterijA.capaciteit;
                case 'garantie': return batterijB.garantie - batterijA.garantie;
                default: return 0;
              }
            });
            
            // Reappend sorted cards
            sortedCards.forEach(card => {
              if (card.style.display !== 'none') {
                gridContainer.appendChild(card);
              }
            });
          }

          // Update table view (if exists)
          const rows = document.querySelectorAll('.battery-row');
          rows.forEach(row => {
            const merk = row.dataset.merk;
            const isVisible = filteredBatterijen.some(b => b.merk === merk);
            row.style.display = isVisible ? 'table-row' : 'none';
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

        // Initialize display
        filterBatterijen();

        // View toggle - currently only grid view is implemented
        gridView.addEventListener('click', () => {
          // Grid view is always active for now
        });

        // Disable table view for now since HTML table structure is not included
        if (tableView) {
          tableView.style.opacity = '0.5';
          tableView.style.cursor = 'not-allowed';
          tableView.title = 'Tabelweergave wordt binnenkort toegevoegd';
        }
      `}</script>
    </div>,
    {
      title: 'Thuisbatterij Vergelijken 2025 - Alle Merken & Prijzen',
      description: 'Vergelijk alle thuisbatterijen van 2025. ✓ Growatt ✓ Dyness ✓ Victron ✓ HomeWizard ✓ Zonneplan. Filter op prijs, capaciteit, subsidie. Onafhankelijke reviews.',
      keywords: 'thuisbatterij vergelijken, growatt thuisbatterij, dyness thuisbatterij, victron thuisbatterij, homewizard thuisbatterij, zonneplan thuisbatterij'
    }
  )
})

export default vergelijkenApp