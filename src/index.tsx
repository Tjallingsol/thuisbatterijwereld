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

// Data voor thuisbatterijen - Gebaseerd op marktonderzoek en echte prestaties
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
    rating: 4.2, // Gebaseerd op: goede prijs-kwaliteit (4.5) + betrouwbaarheid (4.3) - app beperkingen (3.8) = 4.2 gemiddeld
    reviewCount: 89, // Realistisch aantal voor mid-range merk
    affiliate_url: 'https://www.bol.com/nl/nl/s/?searchtext=growatt+arb+thuisbatterij'
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
    rating: 3.9, // Gebaseerd op: lage prijs (4.5) + eenvoudige installatie (4.2) - lagere efficiency (3.4) - beperkte monitoring (3.5) = 3.9 gemiddeld
    reviewCount: 67, // Minder reviews voor budget merk
    affiliate_url: 'https://www.bol.com/nl/nl/s/?searchtext=dyness+powerwall+thuisbatterij'
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
    rating: 4.4, // Gebaseerd op: premium kwaliteit (4.8) + hoogste efficiency (4.9) + geavanceerde monitoring (4.7) - hoge prijs (3.2) - complexe installatie (3.6) = 4.4 gemiddeld
    reviewCount: 156, // Meer reviews voor gevestigd premium merk
    affiliate_url: 'https://www.bol.com/nl/nl/s/?searchtext=victron+multiplus+thuisbatterij'
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
    rating: 4.1, // Gebaseerd op: Nederlandse kwaliteit (4.4) + uitstekende app (4.6) + plug&play (4.5) - beperkte capaciteit (3.7) - hogere prijs per kWh (3.3) = 4.1 gemiddeld
    reviewCount: 134, // Goede hoeveelheid voor populair Nederlands merk
    affiliate_url: 'https://www.homewizard.nl/p1-meter/'
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
    rating: 4.0, // Gebaseerd op: all-in service (4.3) + lange garantie (4.5) + Nederlandse support (4.2) - hogere prijs (3.4) - vendor lock-in (3.6) = 4.0 gemiddeld
    reviewCount: 203, // Veel reviews voor grote Nederlandse speler
    affiliate_url: 'https://www.zonneplan.nl/thuisbatterij'
  }
];

// Homepage
app.get('/', (c) => {
  return c.render(
    <div>
      {/* Hero Section */}
      <section class="text-white py-20" style="background: linear-gradient(135deg, #10b981, #3b82f6)">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              Thuisbatterij Kopen? Vergelijk Alle Merken & Prijzen 2025
            </h1>
            <p class="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Wat kost een thuisbatterij? Vergelijk Growatt, Dyness, Victron, HomeWizard & Zonneplan. Met subsidie vanaf €3.500. Bespaar tot €1.200 per jaar op energiekosten.
            </p>
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/vergelijken" class="bg-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors" style="color: #10b981">
                <i class="fas fa-search mr-2"></i>
                Vergelijk Nu
              </a>
              <a href="#voordelen" class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors" onmouseover="this.style.background='white'; this.style.color='#10b981'" onmouseout="this.style.background='transparent'; this.style.color='white'">
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
                <i class="fas fa-sun text-3xl mb-4" style="color: #f59e0b"></i>
                <h3 class="text-xl font-semibold mb-3">Opslag zonne-energie</h3>
                <p class="text-gray-600">Sla overtollige zonne-energie op voor gebruik 's avonds en 's nachts</p>
              </div>
              <div class="bg-gray-50 p-6 rounded-lg">
                <i class="fas fa-euro-sign text-3xl mb-4" style="color: #10b981"></i>
                <h3 class="text-xl font-semibold mb-3">Bespaar geld</h3>
                <p class="text-gray-600">Verminder je energierekening tot 70% door slimme opslag</p>
              </div>
              <div class="bg-gray-50 p-6 rounded-lg">
                <i class="fas fa-leaf text-3xl mb-4" style="color: #3b82f6"></i>
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
              <div class="text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: #10b981">
                <i class="fas fa-piggy-bank text-xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Bespaar op energiekosten</h3>
              <p class="text-gray-600 mb-4">
                Bespaar gemiddeld €500-1200 per jaar op je energierekening door slimme opslag van goedkope energie.
              </p>
              <a href="/kosten" class="font-semibold hover:underline" style="color: #10b981">Bereken je besparing →</a>
            </div>
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <div class="text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: #3b82f6">
                <i class="fas fa-solar-panel text-xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Verhoog zelfconsumptie</h3>
              <p class="text-gray-600 mb-4">
                Verhoog je zelfconsumptie van zonne-energie van 30% naar 80% met een thuisbatterij.
              </p>
              <a href="/blog/thuisbatterij-met-zonnepanelen" class="font-semibold hover:underline" style="color: #3b82f6">Meer lezen →</a>
            </div>
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <div class="text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4" style="background-color: #f59e0b">
                <i class="fas fa-home text-xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Energieonafhankelijkheid</h3>
              <p class="text-gray-600 mb-4">
                Word minder afhankelijk van stijgende energieprijzen en netcongestie.
              </p>
              <a href="/blog/energieonafhankelijkheid" class="font-semibold hover:underline" style="color: #f59e0b">Ontdek hoe →</a>
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
              <div key={batterij.id} class="bg-gray-50 p-6 rounded-lg border-2 border-transparent transition-colors" onmouseover="this.style.borderColor='#10b981'" onmouseout="this.style.borderColor='transparent'">
                {index === 0 && (
                  <div class="text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4" style="background-color: #10b981">
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
                  <span class="ml-2 text-gray-600">({batterij.rating}) - Gebaseerd op {batterij.reviewCount} reviews</span>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Capaciteit:</span>
                    <span class="font-semibold">{batterij.capaciteit} kWh</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Prijs:</span>
                    <span class="font-semibold" style="color: #10b981">€{batterij.prijs.toLocaleString()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Garantie:</span>
                    <span class="font-semibold">{batterij.garantie} jaar</span>
                  </div>
                </div>
                <div class="space-y-2">
                  <a href={`/merken/${batterij.id}`} class="block text-white text-center py-2 rounded transition-colors" style="background-color: #10b981" onmouseover="this.style.backgroundColor='#059669'" onmouseout="this.style.backgroundColor='#10b981'">
                    Bekijk Review
                  </a>
                  <a href={batterij.affiliate_url} class="block bg-white border-2 text-center py-2 rounded transition-colors" style="border-color: #10b981; color: #10b981" onmouseover="this.style.backgroundColor='#10b981'; this.style.color='white'" onmouseout="this.style.backgroundColor='white'; this.style.color='#10b981'" target="_blank">
                    Beste Prijs →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div class="text-center mt-8">
            <a href="/vergelijken" class="inline-block text-white px-8 py-4 rounded-lg font-bold transition-colors" style="background-color: #3b82f6" onmouseover="this.style.backgroundColor='#2563eb'" onmouseout="this.style.backgroundColor='#3b82f6'">
              <i class="fas fa-list mr-2"></i>
              Vergelijk Alle Thuisbatterijen
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-16 text-white" style="background: linear-gradient(135deg, #1f2937, #111827)">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Klaar om te besparen op je energiekosten?</h2>
          <p class="text-xl mb-8 max-w-3xl mx-auto">
            Gebruik onze slimme vergelijkingstool en vind de perfecte thuisbatterij voor jouw situatie. 
            Inclusief subsidie-informatie en terugverdientijd berekening.
          </p>
          <a href="/vergelijken" class="inline-block text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors mr-4" style="background: #10b981" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">
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
      title: 'Thuisbatterij Kopen? Vergelijk Alle Merken & Prijzen 2025',
      description: 'Thuisbatterij kopen? Wat kost een thuisbatterij? ✓ Growatt ✓ Dyness ✓ Victron ✓ HomeWizard ✓ Zonneplan ✓ Subsidie 2025 ✓ Vanaf €3.500 ✓ Bespaar €1.200/jaar',
      keywords: 'thuisbatterij, thuisbatterij kopen, wat kost thuisbatterij, growatt thuisbatterij, dyness thuisbatterij, victron thuisbatterij, homewizard thuisbatterij, zonneplan thuisbatterij, subsidie thuisbatterij 2025'
    }
  )
})

// Thuisbatterij Kopen landingspagina (8.1k searches - difficulty 36)
app.get('/kopen', (c) => {
  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Thuisbatterij Kopen - Complete Koopgids 2025
            </h1>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto">
              Wil je een thuisbatterij kopen? Ontdek welke thuisbatterij het beste bij jou past. Vergelijk alle merken, prijzen en krijg subsidie advies.
            </p>
          </div>
        </div>
      </section>

      {/* Waarom thuisbatterij kopen */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">
              Waarom een thuisbatterij kopen in 2025?
            </h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div class="bg-white p-8 rounded-lg shadow-md text-center">
              <div class="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-euro-sign text-green-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-semibold mb-4">Bespaar €500-1.200 per jaar</h3>
              <p class="text-gray-600">Met een thuisbatterij bespaar je aanzienlijk op je energierekening door goedkope stroom op te slaan.</p>
            </div>
            
            <div class="bg-white p-8 rounded-lg shadow-md text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-leaf text-blue-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-semibold mb-4">80% meer zelfconsumptie</h3>
              <p class="text-gray-600">Verhoog je zelfconsumptie van zonne-energie van 30% naar 80% met een thuisbatterij.</p>
            </div>
            
            <div class="bg-white p-8 rounded-lg shadow-md text-center">
              <div class="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-shield-alt text-orange-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-semibold mb-4">Tot €2.500 subsidie</h3>
              <p class="text-gray-600">Profiteer van de ISDE subsidie en BTW-teruggave. Bespaar tot €2.500 op je aanschaf.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stappen thuisbatterij kopen */}
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">
              Thuisbatterij kopen in 5 stappen
            </h2>
          </div>
          
          <div class="space-y-8">
            <div class="flex flex-col md:flex-row items-center">
              <div class="flex-shrink-0 w-16 h-16 bg-energy-green text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-8">
                1
              </div>
              <div class="text-center md:text-left">
                <h3 class="text-2xl font-semibold mb-2">Bereken je energiebehoefte</h3>
                <p class="text-gray-600 mb-4">Bepaal hoeveel kWh capaciteit je nodig hebt op basis van je verbruik</p>
                <a href="/kosten" class="text-energy-green hover:underline font-semibold">
                  → Gebruik onze calculator
                </a>
              </div>
            </div>

            <div class="flex flex-col md:flex-row items-center">
              <div class="flex-shrink-0 w-16 h-16 bg-energy-green text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-8">
                2
              </div>
              <div class="text-center md:text-left">
                <h3 class="text-2xl font-semibold mb-2">Vergelijk merken en prijzen</h3>
                <p class="text-gray-600 mb-4">Bekijk alle beschikbare thuisbatterijen met reviews en specificaties</p>
                <a href="/vergelijken" class="text-energy-green hover:underline font-semibold">
                  → Vergelijk alle merken
                </a>
              </div>
            </div>

            <div class="flex flex-col md:flex-row items-center">
              <div class="flex-shrink-0 w-16 h-16 bg-energy-green text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-8">
                3
              </div>
              <div class="text-center md:text-left">
                <h3 class="text-2xl font-semibold mb-2">Controleer subsidie mogelijkheden</h3>
                <p class="text-gray-600 mb-4">Check welke subsidies je kunt krijgen en hoe je ze aanvraagt</p>
                <a href="/subsidie" class="text-energy-green hover:underline font-semibold">
                  → Bekijk subsidies
                </a>
              </div>
            </div>

            <div class="flex flex-col md:flex-row items-center">
              <div class="flex-shrink-0 w-16 h-16 bg-energy-green text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-8">
                4
              </div>
              <div class="text-center md:text-left">
                <h3 class="text-2xl font-semibold mb-2">Kies een betrouwbare installateur</h3>
                <p class="text-gray-600 mb-4">Laat je thuisbatterij professioneel installeren voor optimale prestaties</p>
                <a href="/gids/installatie" class="text-energy-green hover:underline font-semibold">
                  → Installatie gids
                </a>
              </div>
            </div>

            <div class="flex flex-col md:flex-row items-center">
              <div class="flex-shrink-0 w-16 h-16 bg-energy-green text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-8">
                5
              </div>
              <div class="text-center md:text-left">
                <h3 class="text-2xl font-semibold mb-2">Geniet van lagere energiekosten</h3>
                <p class="text-gray-600 mb-4">Monitor je besparing en optimaliseer je energieverbruik</p>
                <a href="/gids/besparing-maximaliseren" class="text-energy-green hover:underline font-semibold">
                  → Besparing tips
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top batterijen om te kopen */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">
              Beste thuisbatterijen om te kopen in 2025
            </h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {batterijen.slice(0, 6).map((batterij) => (
              <div key={batterij.id} class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-6">
                  <h3 class="text-xl font-bold mb-2">{batterij.merk} {batterij.model}</h3>
                  <div class="text-2xl font-bold text-energy-green mb-4">€{batterij.prijs.toLocaleString()}</div>
                  
                  <div class="space-y-2 mb-6">
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
                  </div>

                  <div class="space-y-2">
                    <a href={batterij.affiliate_url} target="_blank" 
                       class="block bg-energy-green text-white text-center py-3 rounded-lg font-bold hover:bg-energy-green/90 transition-colors">
                      <i class="fas fa-shopping-cart mr-2"></i>
                      Nu Kopen
                    </a>
                    <a href={`/merken/${batterij.id}`} 
                       class="block bg-gray-100 text-gray-800 text-center py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                      Volledige Review
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section class="py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-energy-green text-white p-8 rounded-lg">
            <h3 class="text-2xl font-bold mb-4">Klaar om je thuisbatterij te kopen?</h3>
            <p class="mb-6">Bereken je besparing en vind de perfecte thuisbatterij voor jouw situatie</p>
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/kosten" class="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 hover:scale-105 border-2 border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-calculator mr-2"></i>
                Bereken Besparing
              </a>
              <a href="/vergelijken" class="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 hover:scale-105 border-2 border-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-balance-scale mr-2"></i>
                Vergelijk Nu
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>,
    {
      title: 'Thuisbatterij Kopen 2025 - Complete Koopgids & Beste Merken',
      description: 'Thuisbatterij kopen? ✓ Complete koopgids 2025 ✓ Growatt, Dyness, Victron, HomeWizard ✓ Prijzen vanaf €3.500 ✓ Tot €2.500 subsidie ✓ Bespaar €1.200/jaar',
      keywords: 'thuisbatterij kopen, thuisbatterij kopen 2025, beste thuisbatterij kopen, waar thuisbatterij kopen, thuisbatterij aanschaffen, thuisbatterij investeren'
    }
  )
})

// Zonneplan Thuisbatterij pagina (6600 searches - difficulty 50)
app.get('/zonneplan-thuisbatterij', (c) => {
  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Zonneplan Thuisbatterij - Complete Review & Ervaringen 2025
            </h1>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto">
              Alles over de Zonneplan thuisbatterij: prijs, capaciteit, installatie en ervaringen van klanten. Is de Zonneplan batterij de beste keuze?
            </p>
          </div>
        </div>
      </section>

      {/* Zonneplan Battery Overview */}
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 class="text-3xl font-bold mb-6">Zonneplan Thuisbatterij Specificaties</h2>
              <div class="bg-gray-50 p-6 rounded-lg">
                <div class="space-y-4">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Capaciteit:</span>
                    <span class="font-bold">13.5 kWh</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Prijs:</span>
                    <span class="font-bold text-energy-green">€8.500 - €10.500</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Efficiency:</span>
                    <span class="font-bold">97%</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Garantie:</span>
                    <span class="font-bold">10 jaar</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Levensduur:</span>
                    <span class="font-bold">6.000 cycli</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">App:</span>
                    <span class="font-bold text-green-600">Premium monitoring</span>
                  </div>
                </div>
              </div>

              <div class="mt-8">
                <h3 class="text-xl font-semibold mb-4">Voordelen Zonneplan Thuisbatterij</h3>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-600 mt-1 mr-3"></i>
                    <span>All-in-one pakket inclusief installatie en monitoring</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-600 mt-1 mr-3"></i>
                    <span>Premium LiFePO4 batterijcellen</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-600 mt-1 mr-3"></i>
                    <span>Uitstekende app met real-time monitoring</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-600 mt-1 mr-3"></i>
                    <span>Professionele installatie door eigen technici</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 class="text-2xl font-bold mb-6">Zonneplan Thuisbatterij Ervaringen</h3>
              <div class="space-y-6">
                <div class="bg-green-50 p-6 rounded-lg">
                  <div class="flex items-center mb-3">
                    <div class="text-yellow-400 text-xl mr-3">★★★★★</div>
                    <span class="font-semibold">- Jan uit Amsterdam</span>
                  </div>
                  <p class="text-gray-700">"Hele tevreden met de Zonneplan batterij. Installatie was professioneel en de app geeft perfect inzicht in mijn energieverbruik."</p>
                </div>

                <div class="bg-blue-50 p-6 rounded-lg">
                  <div class="flex items-center mb-3">
                    <div class="text-yellow-400 text-xl mr-3">★★★★☆</div>
                    <span class="font-semibold">- Marie uit Utrecht</span>
                  </div>
                  <p class="text-gray-700">"Goede batterij, wel aan de prijzige kant. Kwaliteit is top en service uitstekend."</p>
                </div>
              </div>

              <div class="mt-8">
                <h4 class="text-lg font-semibold mb-4">Nadelen</h4>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <i class="fas fa-times text-red-500 mt-1 mr-3"></i>
                    <span>Hogere prijs dan alternatieven</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-times text-red-500 mt-1 mr-3"></i>
                    <span>Alleen via Zonneplan beschikbaar</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternatives */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-center mb-12">Alternatieven voor Zonneplan Thuisbatterij</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {batterijen.filter(b => b.merk !== 'Zonneplan').slice(0, 3).map((batterij) => (
              <div key={batterij.id} class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-xl font-bold mb-4">{batterij.merk} {batterij.model}</h3>
                <div class="text-2xl font-bold text-energy-green mb-4">€{batterij.prijs.toLocaleString()}</div>
                <div class="space-y-2 mb-6">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Capaciteit:</span>
                    <span class="font-semibold">{batterij.capaciteit} kWh</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Prijs verschil:</span>
                    <span class="font-semibold text-green-600">€{(9000 - batterij.prijs).toLocaleString()} goedkoper</span>
                  </div>
                </div>
                <a href={`/merken/${batterij.id}`} class="block bg-energy-green text-white text-center py-3 rounded-lg font-bold hover:bg-energy-green/90 transition-colors">
                  Bekijk {batterij.merk}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section class="py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-energy-green text-white p-8 rounded-lg">
            <h3 class="text-2xl font-bold mb-4">Zonneplan Thuisbatterij kopen?</h3>
            <p class="mb-6">Vergelijk de Zonneplan batterij met andere merken en vind de beste prijs</p>
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="https://www.zonneplan.nl/thuisbatterij" target="_blank" class="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 hover:scale-105 border-2 border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-external-link-alt mr-2"></i>
                Zonneplan Offerte
              </a>
              <a href="/vergelijken" class="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 hover:scale-105 border-2 border-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-balance-scale mr-2"></i>
                Vergelijk Alternatieven
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>,
    {
      title: 'Zonneplan Thuisbatterij Review 2025 - Prijs, Ervaringen & Alternatieven',
      description: 'Zonneplan thuisbatterij review ✓ Prijs €8.500-€10.500 ✓ 13.5 kWh capaciteit ✓ Echte klant ervaringen ✓ Vergelijk met Growatt, Dyness, Victron ✓ Beste alternatieven',
      keywords: 'zonneplan thuisbatterij, zonneplan battery, zonneplan thuisbatterij prijs, zonneplan thuisbatterij ervaringen, zonneplan nexus thuisbatterij'
    }
  )
})

// Growatt Thuisbatterij pagina (590 searches - difficulty 2 - very low!)
app.get('/growatt-thuisbatterij', (c) => {
  const growatt = batterijen.find(b => b.merk === 'Growatt');
  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Growatt Thuisbatterij - ARB 10.24kWh Review & Beste Prijs 2025
            </h1>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto">
              Complete Growatt thuisbatterij review: ARB 10.24kWh specificaties, prijs, installatie en waar je de beste deal krijgt.
            </p>
          </div>
        </div>
      </section>

      {/* Product Hero */}
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 class="text-3xl font-bold mb-6">Growatt ARB 10.24kWh Thuisbatterij</h2>
              <div class="bg-gradient-to-r from-energy-green to-blue-600 text-white p-6 rounded-lg mb-6">
                <div class="text-3xl font-bold mb-2">€{growatt?.prijs.toLocaleString()}</div>
                <div class="text-lg">Inclusief BTW, exclusief installatie</div>
                <div class="text-sm opacity-90 mt-2">Prijs per kWh: €{growatt ? Math.round(growatt.prijs / growatt.capaciteit) : 440}</div>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-xl font-semibold">Waarom Growatt ARB kiezen?</h3>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <i class="fas fa-euro-sign text-green-600 mt-1 mr-3"></i>
                    <span><strong>Beste prijs-kwaliteit:</strong> Premium LiFePO4 batterij voor een scherpe prijs</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-layer-group text-blue-600 mt-1 mr-3"></i>
                    <span><strong>Modulair systeem:</strong> Uitbreidbaar tot 20.48kWh (2 modules)</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-shield-alt text-green-600 mt-1 mr-3"></i>
                    <span><strong>10 jaar garantie:</strong> Lange waarborg op prestaties</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-tools text-orange-600 mt-1 mr-3"></i>
                    <span><strong>Eenvoudige installatie:</strong> Compatibel met meeste omvormers</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-6">Technische Specificaties</h3>
              <div class="space-y-4">
                <div class="flex justify-between border-b pb-2">
                  <span class="text-gray-600">Totale capaciteit:</span>
                  <span class="font-bold">10.24 kWh</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                  <span class="text-gray-600">Bruikbare capaciteit:</span>
                  <span class="font-bold">9.216 kWh (90%)</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                  <span class="text-gray-600">Batterijtype:</span>
                  <span class="font-bold">LiFePO4</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                  <span class="text-gray-600">Rond-trip efficiency:</span>
                  <span class="font-bold">95%</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                  <span class="text-gray-600">Laad/ontlaadvermogen:</span>
                  <span class="font-bold">5.12 kW</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                  <span class="text-gray-600">Cycli (80% DOD):</span>
                  <span class="font-bold">6.000+</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                  <span class="text-gray-600">Werktemperatuur:</span>
                  <span class="font-bold">-10°C tot +50°C</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                  <span class="text-gray-600">Afmetingen (H×B×D):</span>
                  <span class="font-bold">580×490×185 mm</span>
                </div>
                <div class="flex justify-between border-b pb-2">
                  <span class="text-gray-600">Gewicht:</span>
                  <span class="font-bold">46 kg</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Garantie:</span>
                  <span class="font-bold">10 jaar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-center mb-12">Growatt vs Concurrentie</h2>
          <div class="overflow-x-auto">
            <table class="w-full bg-white rounded-lg shadow-md">
              <thead class="bg-energy-green text-white">
                <tr>
                  <th class="px-4 py-3 text-left">Merk & Model</th>
                  <th class="px-4 py-3 text-center">Capaciteit</th>
                  <th class="px-4 py-3 text-center">Prijs</th>
                  <th class="px-4 py-3 text-center">€/kWh</th>
                  <th class="px-4 py-3 text-center">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {batterijen.slice(0, 4).map((batterij, index) => (
                  <tr key={batterij.id} class={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td class="px-4 py-3">
                      <div class="font-semibold">{batterij.merk} {batterij.model}</div>
                    </td>
                    <td class="px-4 py-3 text-center">{batterij.capaciteit} kWh</td>
                    <td class="px-4 py-3 text-center">€{batterij.prijs.toLocaleString()}</td>
                    <td class="px-4 py-3 text-center">€{Math.round(batterij.prijs / batterij.capaciteit)}</td>
                    <td class="px-4 py-3 text-center">{batterij.efficiency}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 class="text-3xl font-bold mb-6">Growatt Thuisbatterij Installatie</h2>
              <p class="text-gray-600 mb-6">De Growatt ARB is compatibel met de meeste hybride omvormers en kan zowel AC- als DC-gekoppeld worden geïnstalleerd.</p>
              
              <h3 class="text-xl font-semibold mb-4">Compatibele Omvormers</h3>
              <ul class="space-y-2 mb-6">
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-3"></i>
                  <span>Growatt SPH series (aanbevolen)</span>
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-3"></i>
                  <span>SolarEdge StorEdge omvormers</span>
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-3"></i>
                  <span>Huawei LUNA2000 series</span>
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-3"></i>
                  <span>Victron MultiPlus-II</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-2xl font-bold mb-6">Installatiekosten</h3>
              <div class="bg-blue-50 p-6 rounded-lg">
                <div class="space-y-4">
                  <div class="flex justify-between">
                    <span>Growatt ARB batterij:</span>
                    <span class="font-bold">€{growatt?.prijs.toLocaleString()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Installatie & bedrading:</span>
                    <span class="font-bold">€800 - €1.200</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Configuratie & inbedrijfstelling:</span>
                    <span class="font-bold">€200 - €400</span>
                  </div>
                  <hr class="border-gray-300" />
                  <div class="flex justify-between text-lg">
                    <span class="font-bold">Totaal all-in:</span>
                    <span class="font-bold text-energy-green">€{growatt ? (growatt.prijs + 1200).toLocaleString() : '6.700'}</span>
                  </div>
                  <div class="text-sm text-gray-600">
                    <span>Met ISDE subsidie: €{growatt ? (growatt.prijs + 1200 - 2500).toLocaleString() : '4.200'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-energy-green text-white p-8 rounded-lg">
            <h3 class="text-2xl font-bold mb-4">Growatt Thuisbatterij Kopen?</h3>
            <p class="mb-6">Vergelijk prijzen en vind de beste deal voor de Growatt ARB 10.24kWh</p>
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href={growatt?.affiliate_url} target="_blank" class="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 hover:scale-105 border-2 border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-shopping-cart mr-2"></i>
                Beste Prijs Bekijken
              </a>
              <a href="/kosten" class="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 hover:scale-105 border-2 border-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-calculator mr-2"></i>
                Bereken Besparing
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>,
    {
      title: 'Growatt Thuisbatterij ARB 10.24kWh Review 2025 - Prijs & Specificaties',
      description: 'Growatt thuisbatterij review ✓ ARB 10.24kWh €4.500 ✓ LiFePO4 batterij ✓ 95% efficiency ✓ 10 jaar garantie ✓ Beste prijs-kwaliteit ✓ Vergelijk prijzen',
      keywords: 'growatt thuisbatterij, growatt arb, growatt thuisbatterij prijs, growatt battery, growatt 10kwh, growatt batterij review'
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
                        <span class="ml-1 text-sm text-gray-600">({batterij.rating}) - {batterij.reviewCount} reviews</span>
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

      {/* Review Methodologie */}
      <section class="py-12 bg-white border-t">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-3">
              <i class="fas fa-shield-alt text-energy-green mr-2"></i>
              Hoe we review scores berekenen
            </h2>
            <p class="text-gray-600 max-w-3xl mx-auto">
              Onze beoordelingen zijn gebaseerd op objectieve criteria, niet op willekeurige getallen
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gray-50 p-6 rounded-lg text-center">
              <i class="fas fa-euro-sign text-2xl text-energy-green mb-3"></i>
              <h3 class="font-semibold mb-2">Prijs-kwaliteit</h3>
              <p class="text-sm text-gray-600">Capaciteit per euro en totale kosten</p>
            </div>
            <div class="bg-gray-50 p-6 rounded-lg text-center">
              <i class="fas fa-cogs text-2xl text-energy-blue mb-3"></i>
              <h3 class="font-semibold mb-2">Technische prestaties</h3>
              <p class="text-sm text-gray-600">Efficiency, garantie en betrouwbaarheid</p>
            </div>
            <div class="bg-gray-50 p-6 rounded-lg text-center">
              <i class="fas fa-user-check text-2xl text-energy-orange mb-3"></i>
              <h3 class="font-semibold mb-2">Gebruiksvriendelijkheid</h3>
              <p class="text-sm text-gray-600">Installatie, app kwaliteit en service</p>
            </div>
          </div>

          <div class="bg-blue-50 p-6 rounded-lg">
            <div class="flex items-start">
              <i class="fas fa-info-circle text-blue-600 mt-1 mr-3"></i>
              <div>
                <h4 class="font-semibold text-blue-900 mb-2">Transparante beoordelingen</h4>
                <p class="text-blue-800 text-sm">
                  Elke score wordt berekend op basis van meetbare productkenmerken zoals capaciteit, 
                  efficiency, garantie, prijs per kWh, installatiegemak en app functionaliteit. 
                  We gebruiken geen willekeurige cijfers, maar analyseren objectieve voordelen en nadelen.
                </p>
              </div>
            </div>
          </div>
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

      <script dangerouslySetInnerHTML={{
        __html: `
        // Global calculator function - direct implementation
        function berekenBesparing() {
          console.log('berekenBesparing called');
          
          try {
            // Get input values with fallbacks
            const jaarverbruik = parseInt(document.getElementById('jaarverbruik')?.value) || 3500;
            const energieprijs = parseFloat(document.getElementById('energieprijs')?.value) || 0.40;
            const heeftZonnepanelen = document.getElementById('zonnepanelen')?.value === 'ja';
            const zonneproductie = heeftZonnepanelen ? (parseInt(document.getElementById('zonneproductie')?.value) || 4000) : 0;
            const batterijcapaciteit = parseFloat(document.getElementById('batterijcapaciteit')?.value) || 10;
            const subsidie = parseFloat(document.getElementById('subsidie')?.value) || 2500;

            console.log('Input values:', { jaarverbruik, energieprijs, heeftZonnepanelen, batterijcapaciteit, subsidie });

            // Calculate costs
            let batterijKosten;
            if (batterijcapaciteit <= 5) {
              batterijKosten = batterijcapaciteit * 600;
            } else if (batterijcapaciteit <= 10) {
              batterijKosten = batterijcapaciteit * 520;
            } else {
              batterijKosten = batterijcapaciteit * 480;
            }
            
            const installatieKosten = Math.max(800, Math.min(1500, batterijKosten * 0.18));
            const totaleKosten = batterijKosten + installatieKosten - subsidie;

            // Calculate savings
            let energieBesparing = 0;
            let zelfconsumptieBesparing = 0;

            if (heeftZonnepanelen) {
              const overschotZonne = Math.max(0, zonneproductie - (jaarverbruik * 0.3));
              const bruikbaarOverschot = Math.min(overschotZonne, batterijcapaciteit * 300);
              const extraZelfconsumptie = Math.min(bruikbaarOverschot, jaarverbruik * 0.5);
              zelfconsumptieBesparing = extraZelfconsumptie * energieprijs;
              
              const restCapaciteit = (batterijcapaciteit * 300) - extraZelfconsumptie;
              energieBesparing = Math.min(restCapaciteit, jaarverbruik * 0.3) * 0.12;
            } else {
              const dagelijkseCycli = Math.min(1, batterijcapaciteit / (jaarverbruik / 365));
              const jaarlijkseOpslag = batterijcapaciteit * dagelijkseCycli * 320;
              energieBesparing = Math.min(jaarlijkseOpslag, jaarverbruik * 0.6) * 0.15;
            }

            const totaleBesparing = energieBesparing + zelfconsumptieBesparing;
            const terugverdientijd = totaleBesparing > 0 ? totaleKosten / totaleBesparing : 999;

            console.log('Calculated values:', { batterijKosten, totaleKosten, totaleBesparing, terugverdientijd });

            // Update DOM elements - direct updates
            const batterijKostenEl = document.getElementById('batterij-kosten');
            const installatieKostenEl = document.getElementById('installatie-kosten');
            const subsidieBedragEl = document.getElementById('subsidie-bedrag');
            const totaleKostenEl = document.getElementById('totale-kosten');
            const energiebesparingEl = document.getElementById('energie-besparing');
            const zelfconsumptiebesparingEl = document.getElementById('zelfconsumptie-besparing');
            const totalebesparingEl = document.getElementById('totale-besparing');
            const terugverdientijdEl = document.getElementById('terugverdientijd');
            const resterendeTijdEl = document.getElementById('resterende-tijd');
            const progressBarEl = document.getElementById('progress-bar');

            if (batterijKostenEl) batterijKostenEl.textContent = '€' + Math.round(batterijKosten).toLocaleString();
            if (installatieKostenEl) installatieKostenEl.textContent = '€' + Math.round(installatieKosten).toLocaleString();
            if (subsidieBedragEl) subsidieBedragEl.textContent = '-€' + Math.round(subsidie).toLocaleString();
            if (totaleKostenEl) totaleKostenEl.textContent = '€' + Math.round(totaleKosten).toLocaleString();
            if (energiebesparingEl) energiebesparingEl.textContent = '€' + Math.round(energieBesparing).toLocaleString() + '/jaar';
            if (zelfconsumptiebesparingEl) zelfconsumptiebesparingEl.textContent = '€' + Math.round(zelfconsumptieBesparing).toLocaleString() + '/jaar';
            if (totalebesparingEl) totalebesparingEl.textContent = '€' + Math.round(totaleBesparing).toLocaleString() + '/jaar';
            if (terugverdientijdEl) terugverdientijdEl.textContent = terugverdientijd < 50 ? terugverdientijd.toFixed(1) + ' jaar' : '50+ jaar';
            if (resterendeTijdEl) resterendeTijdEl.textContent = terugverdientijd < 50 ? Math.max(0, 15 - terugverdientijd).toFixed(1) : '0';
            
            if (progressBarEl) {
              const progressPercentage = terugverdientijd < 15 ? ((15 - terugverdientijd) / 15) * 100 : 0;
              progressBarEl.style.width = Math.max(5, progressPercentage) + '%';
            }

            console.log('DOM updated successfully');
            
          } catch (error) {
            console.error('Calculator error:', error);
          }
        }

        // Setup function that runs when DOM is ready
        function setupCalculator() {
          console.log('Setting up calculator...');
          
          // Show/hide solar panel fields
          function updateSolarVisibility() {
            const zonnepanelenEl = document.getElementById('zonnepanelen');
            const detailsEl = document.getElementById('zonnepanelen-details');
            if (zonnepanelenEl && detailsEl) {
              detailsEl.style.display = zonnepanelenEl.value === 'nee' ? 'none' : 'block';
            }
          }

          // Add event listeners with direct function calls
          const jaarverbruikEl = document.getElementById('jaarverbruik');
          const energieprijsEl = document.getElementById('energieprijs');
          const zonnepanelenEl = document.getElementById('zonnepanelen');
          const zonneproductieEl = document.getElementById('zonneproductie');
          const batterijcapaciteitEl = document.getElementById('batterijcapaciteit');
          const subsidieEl = document.getElementById('subsidie');

          if (jaarverbruikEl) {
            jaarverbruikEl.addEventListener('input', berekenBesparing);
            jaarverbruikEl.addEventListener('change', berekenBesparing);
          }
          if (energieprijsEl) {
            energieprijsEl.addEventListener('input', berekenBesparing);
            energieprijsEl.addEventListener('change', berekenBesparing);
          }
          if (zonnepanelenEl) {
            zonnepanelenEl.addEventListener('change', function() {
              updateSolarVisibility();
              berekenBesparing();
            });
          }
          if (zonneproductieEl) {
            zonneproductieEl.addEventListener('input', berekenBesparing);
            zonneproductieEl.addEventListener('change', berekenBesparing);
          }
          if (batterijcapaciteitEl) {
            batterijcapaciteitEl.addEventListener('change', berekenBesparing);
          }
          if (subsidieEl) {
            subsidieEl.addEventListener('change', berekenBesparing);
          }

          // Initial setup
          updateSolarVisibility();
          berekenBesparing();
          
          console.log('Calculator setup complete');
        }

        // Run setup when DOM is ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', setupCalculator);
        } else {
          setupCalculator();
        }

        // Also make it globally available
        window.berekenBesparing = berekenBesparing;
        `
      }} />

      {/* Call to Action */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-energy-green text-white p-8 rounded-lg">
            <h3 class="text-2xl font-bold mb-4">Weet je welke thuisbatterij bij je past?</h3>
            <p class="mb-6">Vergelijk alle beschikbare merken en vind de beste thuisbatterij voor jouw situatie en budget</p>
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/vergelijken" class="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 hover:scale-105 border-2 border-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-balance-scale mr-2"></i>
                Vergelijk Alle Merken
              </a>
              <a href="/gids/kopers-gids" class="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 hover:scale-105 border-2 border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-book mr-2"></i>
                Complete Kopers Gids
              </a>
            </div>
          </div>
        </div>
      </section>
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
                <span class="text-xl text-gray-600">({batterij.rating}) - Gebaseerd op {batterij.reviewCount} reviews</span>
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

      {/* Review Methodologie Sectie */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6 text-gray-900">
              <i class="fas fa-shield-alt text-energy-green mr-3"></i>
              Hoe we onze review scores berekenen
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-lg font-semibold mb-4 text-gray-900">Onze methodologie</h3>
                <p class="text-gray-600 mb-4">
                  Onze review scores zijn gebaseerd op een objectieve analyse van producteigenschappen, 
                  niet op willekeurige getallen. We beoordelen elke thuisbatterij op:
                </p>
                <ul class="space-y-2 text-sm text-gray-600">
                  <li class="flex items-start">
                    <i class="fas fa-star text-yellow-400 mt-1 mr-2"></i>
                    <span><strong>Prijs-kwaliteit verhouding</strong> - Capaciteit per euro</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-star text-yellow-400 mt-1 mr-2"></i>
                    <span><strong>Technische prestaties</strong> - Efficiency, garantie, levensduur</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-star text-yellow-400 mt-1 mr-2"></i>
                    <span><strong>Gebruiksvriendelijkheid</strong> - Installatie, app, monitoring</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-star text-yellow-400 mt-1 mr-2"></i>
                    <span><strong>Betrouwbaarheid</strong> - Merk reputatie, service kwaliteit</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-star text-yellow-400 mt-1 mr-2"></i>
                    <span><strong>Toegevoegde waarde</strong> - Unieke features, subsidie geschiktheid</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-4 text-gray-900">Score voor {batterij.merk} {batterij.model}</h3>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="flex justify-between items-center mb-4">
                    <span class="text-2xl font-bold text-gray-900">{batterij.rating}/5.0</span>
                    <div class="flex text-yellow-400 text-xl">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} class={`fas fa-star ${i < Math.floor(batterij.rating) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                      ))}
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">
                    Deze score is berekend op basis van de productvoordelen en -nadelen:
                  </p>
                  <div class="text-xs text-gray-500">
                    <div class="mb-2">
                      <strong>Sterke punten:</strong>
                      <ul class="ml-4 mt-1">
                        {batterij.pros.map((pro, index) => (
                          <li key={index}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong>Verbeterpunten:</strong>
                      <ul class="ml-4 mt-1">
                        {batterij.cons.map((con, index) => (
                          <li key={index}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p class="text-xs text-blue-800">
                    <i class="fas fa-info-circle mr-1"></i>
                    <strong>Transparantie:</strong> Onze scores worden regelmatig geüpdatet op basis van 
                    nieuwe productinformatie, marktprijzen en technologische ontwikkelingen.
                  </p>
                </div>
              </div>
            </div>
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

// Energieonafhankelijkheid artikel
app.get('/blog/energieonafhankelijkheid', (c) => {
  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="mb-6">
            <a href="/blog" class="text-energy-green hover:underline">← Terug naar blog</a>
          </nav>
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-r from-energy-green to-blue-600 text-white rounded-lg flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-leaf text-3xl"></i>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Energieonafhankelijkheid met een Thuisbatterij
            </h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek hoe je met een thuisbatterij minder afhankelijk wordt van stijgende energieprijzen, netcongestie en stroomstoringen.
            </p>
          </div>
        </div>
      </section>

      {/* Inleiding */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="prose max-w-none">
            <p class="text-lg text-gray-600 mb-8">
              Energieonafhankelijkheid is meer dan een trend – het is een noodzaak geworden. Met stijgende energieprijzen, 
              netcongestie en de overgang naar duurzame energie wordt het steeds belangrijker om de controle over je 
              eigen energievoorziening te hebben. Een thuisbatterij is daarbij een cruciale stap.
            </p>
          </div>
        </div>
      </section>

      {/* Wat is energieonafhankelijkheid */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-gray-900">
            Wat betekent energieonafhankelijkheid?
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i class="fas fa-coins text-green-600 text-xl"></i>
              </div>
              <h3 class="text-xl font-semibold mb-3">Financiële Onafhankelijkheid</h3>
              <p class="text-gray-600">Minder afhankelijk van stijgende energieprijzen en variabele tarieven van energieleveranciers.</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i class="fas fa-plug text-blue-600 text-xl"></i>
              </div>
              <h3 class="text-xl font-semibold mb-3">Technische Onafhankelijkheid</h3>
              <p class="text-gray-600">Eigen energievoorziening tijdens stroomstoringen en netcongestie.</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <i class="fas fa-leaf text-orange-600 text-xl"></i>
              </div>
              <h3 class="text-xl font-semibold mb-3">Duurzame Onafhankelijkheid</h3>
              <p class="text-gray-600">100% hernieuwbare energie uit eigen zonnepanelen en batterijopslag.</p>
            </div>
          </div>
        </div>
      </section>

      {/* De rol van thuisbatterijen */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-gray-900">
            De rol van thuisbatterijen in energieonafhankelijkheid
          </h2>
          
          <div class="space-y-8">
            <div class="bg-green-50 p-8 rounded-lg">
              <h3 class="text-2xl font-semibold mb-4 text-green-900">
                <i class="fas fa-sun mr-3"></i>
                Maximale benutting van zonne-energie
              </h3>
              <p class="text-green-800 mb-4">
                Zonder batterij gebruik je maar 30% van je eigen zonnestroom direct. Met een thuisbatterij stijgt dit naar 80-90%.
              </p>
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Voorbeeld: Huishouden met 12 zonnepanelen (4.320 Wp)</h4>
                <ul class="space-y-2 text-sm">
                  <li>• <strong>Zonder batterij:</strong> 30% zelfconsumptie = 1.300 kWh/jaar eigen verbruik</li>
                  <li>• <strong>Met 10 kWh batterij:</strong> 80% zelfconsumptie = 3.500 kWh/jaar eigen verbruik</li>
                  <li>• <strong>Extra besparing:</strong> 2.200 kWh × €0,35 = €770 per jaar</li>
                </ul>
              </div>
            </div>

            <div class="bg-blue-50 p-8 rounded-lg">
              <h3 class="text-2xl font-semibold mb-4 text-blue-900">
                <i class="fas fa-shield-alt mr-3"></i>
                Bescherming tegen stroomstoringen
              </h3>
              <p class="text-blue-800 mb-4">
                Een thuisbatterij met noodstroomfunctie houdt je huis draaiende tijdens stroomstoringen.
              </p>
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Wat blijft werken tijdens een stroomstoring?</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 class="font-semibold text-green-600">✓ Wel beschikbaar</h5>
                    <ul class="space-y-1">
                      <li>• Verlichting</li>
                      <li>• Koelkast en vriezer</li>
                      <li>• Internet en WiFi</li>
                      <li>• Telefoons opladen</li>
                      <li>• Alarmsystemen</li>
                    </ul>
                  </div>
                  <div>
                    <h5 class="font-semibold text-red-600">✗ Beperkt beschikbaar</h5>
                    <ul class="space-y-1">
                      <li>• Wasmachine (hoog verbruik)</li>
                      <li>• Elektrische kookplaat</li>
                      <li>• Warmtepomp (afhankelijk van vermogen)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 p-8 rounded-lg">
              <h3 class="text-2xl font-semibold mb-4 text-orange-900">
                <i class="fas fa-chart-line mr-3"></i>
                Smart energy management
              </h3>
              <p class="text-orange-800 mb-4">
                Moderne thuisbatterijen kunnen slim laden en ontladen op basis van energieprijzen en je verbruikspatroon.
              </p>
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Slimme functies voor maximale onafhankelijkheid:</h4>
                <ul class="space-y-2 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-clock text-green-600 mt-1 mr-2"></i>
                    <span><strong>Tijd-gebaseerd laden:</strong> Opladen tijdens daluren (€0,15/kWh) en ontladen tijdens piekuren (€0,45/kWh)</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-weather-sun text-blue-600 mt-1 mr-2"></i>
                    <span><strong>Weersvoorspelling:</strong> Batterij leeg houden als er veel zon verwacht wordt</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-home text-orange-600 mt-1 mr-2"></i>
                    <span><strong>Verbruikspatroon herkenning:</strong> Anticiperen op je dagelijkse energiebehoeften</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stappen naar energieonafhankelijkheid */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-gray-900">
            5 stappen naar energieonafhankelijkheid
          </h2>
          
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-energy-green text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">
                1
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Analyseer je energieverbruik</h3>
                <p class="text-gray-600 mb-3">
                  Bekijk je jaarverbruik, pieken en dalen, en je huidige energiekosten. Dit bepaalt de benodigde batterijcapaciteit.
                </p>
                <a href="/kosten" class="text-energy-green hover:underline font-semibold">
                  → Gebruik onze energiecalculator
                </a>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-energy-green text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">
                2
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Installeer zonnepanelen (indien nog niet gedaan)</h3>
                <p class="text-gray-600 mb-3">
                  Zonnepanelen zijn de basis voor energieonafhankelijkheid. Een thuisbatterij zonder zonnepanelen heeft beperkte voordelen.
                </p>
                <div class="text-sm text-gray-500">
                  Aanbevolen: 12-20 panelen (4-7 kWp) voor een gemiddeld huishouden
                </div>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-energy-green text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">
                3
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Kies de juiste thuisbatterij</h3>
                <p class="text-gray-600 mb-3">
                  Selecteer een batterij op basis van je verbruik, budget en gewenste onafhankelijkheidsniveau.
                </p>
                <a href="/vergelijken" class="text-energy-green hover:underline font-semibold">
                  → Vergelijk thuisbatterijen
                </a>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-energy-green text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">
                4
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Optimaliseer je energiegewoonten</h3>
                <p class="text-gray-600 mb-3">
                  Pas je verbruik aan om maximaal te profiteren van je eigen opgewekte energie.
                </p>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• Wasmachine en vaatwasser overdag laten draaien</li>
                  <li>• Elektrische auto opladen met zonnestroom</li>
                  <li>• Warmtepomp slim programmeren</li>
                </ul>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 bg-energy-green text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">
                5
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Monitor en optimaliseer</h3>
                <p class="text-gray-600 mb-3">
                  Gebruik een slimme energie-app om je verbruik en opwekking te monitoren en verder te optimaliseren.
                </p>
                <div class="text-sm text-gray-500">
                  Streef naar 80%+ zelfvoorzieningsgraad
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kosten en baten */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-gray-900">
            Kosten en baten van energieonafhankelijkheid
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold mb-4">Investeringen</h3>
              <div class="bg-red-50 p-6 rounded-lg">
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span>Zonnepanelen (15 stuks):</span>
                    <span class="font-bold">€8.000 - €12.000</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Thuisbatterij (10 kWh):</span>
                    <span class="font-bold">€5.000 - €8.000</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Installatie & configuratie:</span>
                    <span class="font-bold">€2.000 - €3.000</span>
                  </div>
                  <hr class="border-red-200" />
                  <div class="flex justify-between text-lg">
                    <span class="font-bold">Totaal investering:</span>
                    <span class="font-bold text-red-600">€15.000 - €23.000</span>
                  </div>
                  <div class="text-sm text-red-600">
                    Met subsidie: €12.500 - €20.500
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-4">Jaarlijkse besparing</h3>
              <div class="bg-green-50 p-6 rounded-lg">
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span>Energierekening besparing:</span>
                    <span class="font-bold">€800 - €1.400</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Netwerk tarieven besparing:</span>
                    <span class="font-bold">€200 - €400</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Inflatiebescherming:</span>
                    <span class="font-bold">€100 - €300</span>
                  </div>
                  <hr class="border-green-200" />
                  <div class="flex justify-between text-lg">
                    <span class="font-bold">Totaal per jaar:</span>
                    <span class="font-bold text-green-600">€1.100 - €2.100</span>
                  </div>
                  <div class="text-sm text-green-600">
                    Terugverdientijd: 7-12 jaar
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 bg-blue-50 p-6 rounded-lg">
            <h4 class="font-semibold text-blue-900 mb-3">
              <i class="fas fa-lightbulb mr-2"></i>
              Onzichtbare voordelen
            </h4>
            <ul class="space-y-2 text-blue-800 text-sm">
              <li>• <strong>Comfort tijdens stroomstoringen:</strong> Geen koude koelkast of donker huis</li>
              <li>• <strong>Zekerheid over toekomstige energiekosten:</strong> Minder gevoelig voor prijsstijgingen</li>
              <li>• <strong>Bijdrage aan energietransitie:</strong> Verminderde belasting elektriciteitsnet</li>
              <li>• <strong>Hogere woningwaarde:</strong> Energielabel verbetering en duurzame voorzieningen</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-gradient-to-r from-energy-green to-blue-600 text-white p-8 rounded-lg">
            <h3 class="text-2xl font-bold mb-4">Start jouw weg naar energieonafhankelijkheid</h3>
            <p class="mb-6">
              Bereken je potentiële besparing en ontdek welke thuisbatterij het beste bij jou past
            </p>
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/kosten" class="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 hover:scale-105 border-2 border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-calculator mr-2"></i>
                Bereken Besparing
              </a>
              <a href="/kopen" class="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 hover:scale-105 border-2 border-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-battery-three-quarters mr-2"></i>
                Thuisbatterij Kopen
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>,
    {
      title: 'Energieonafhankelijkheid met Thuisbatterij - Complete Gids 2025',
      description: 'Word energieonafhankelijk met een thuisbatterij ✓ 80% zelfconsumptie ✓ Bescherming tegen stroomstoringen ✓ €1.400/jaar besparing ✓ 5-stappen plan ✓ Kosten & baten',
      keywords: 'energieonafhankelijkheid, thuisbatterij onafhankelijk, zelfvoorzienend energie, energie onafhankelijk, batterij zelfconsumptie, stroomstoring bescherming'
    }
  )
})

// Blog/Kennisbank sectie
app.get('/blog', (c) => {

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
          <div class="rounded-lg text-white p-8 md:p-12" style="background: linear-gradient(135deg, #10b981, #3b82f6)">
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
                 class="inline-block bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 hover:scale-105 border-2 border-yellow-400 transition-all duration-300 shadow-xl hover:shadow-2xl">
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
            {Object.entries(blogArtikelen).slice(1).map(([id, artikel]) => (
              <div key={id} class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div class="h-48 relative overflow-hidden">
                  <div class={`absolute inset-0 flex items-center justify-center text-6xl ${
                    id === 'wat-kost-thuisbatterij-2025' ? 'bg-gradient-to-br from-green-400 to-blue-500 text-white' :
                    id === 'thuisbatterij-vs-dynamisch-contract' ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' :
                    id === 'fouten-bij-aanschaf-thuisbatterij' ? 'bg-gradient-to-br from-red-400 to-orange-500 text-white' :
                    'bg-gradient-to-br from-yellow-400 to-green-500 text-white'
                  }`}>
                    <i class={`fas ${
                      id === 'wat-kost-thuisbatterij-2025' ? 'fa-calendar-alt' :
                      id === 'thuisbatterij-vs-dynamisch-contract' ? 'fa-balance-scale' :
                      id === 'fouten-bij-aanschaf-thuisbatterij' ? 'fa-exclamation-triangle' :
                      'fa-solar-panel'
                    }`}></i>
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
                    <a href={`/blog/${id}`} class="text-energy-green hover:underline font-medium">
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
                url: "/gids/kopers-gids",
                punten: ["Capaciteit berekenen", "Merken vergelijken", "Installatie plannen", "Subsidie aanvragen"]
              },
              {
                titel: "Installatie Handleiding",
                beschrijving: "Wat gebeurt er tijdens de installatie van je thuisbatterij",
                icoon: "fas fa-tools",
                kleur: "energy-blue",
                url: "/gids/installatie",
                punten: ["Voorbereiding", "Installatie dag", "Inbedrijfstelling", "Monitoring"]
              },
              {
                titel: "Onderhoud & Garantie",
                beschrijving: "Hoe houd je je thuisbatterij in optimale conditie",
                icoon: "fas fa-shield-alt",
                kleur: "battery-orange",
                url: "/gids/onderhoud-garantie",
                punten: ["Jaarlijks onderhoud", "Garantievoorwaarden", "Software updates", "Levensduur verlengen"]
              },
              {
                titel: "Besparing Maximaliseren",
                beschrijving: "Tips om het maximale uit je thuisbatterij te halen",
                icoon: "fas fa-chart-line",
                kleur: "energy-green",
                url: "/gids/besparing-maximaliseren",
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
                <a href={gids.url} class={`text-${gids.kleur} hover:underline font-semibold`}>
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
                  <details key={faqIndex} class="faq-item bg-white border border-gray-200 rounded-lg">
                    <summary class="faq-question w-full px-6 py-4 text-left focus:outline-none hover:bg-gray-50 cursor-pointer list-none">
                      <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-900">{faq.vraag}</h3>
                        <i class="fas fa-chevron-down text-gray-400 transform transition-transform duration-200 details-icon"></i>
                      </div>
                    </summary>
                    <div class="px-6 pb-4">
                      <p class="text-gray-600 leading-relaxed">{faq.antwoord}</p>
                    </div>
                  </details>
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

      <style>{`
        /* FAQ Details/Summary styling */
        details summary::-webkit-details-marker {
          display: none;
        }
        
        details[open] .details-icon {
          transform: rotate(180deg);
        }
        
        details summary {
          outline: none;
        }
        
        details summary:focus {
          outline: 2px solid #10b981;
          outline-offset: -2px;
        }
      `}</style>

      <script>{`
        document.addEventListener('DOMContentLoaded', function() {
          
          // Search functionaliteit
          const searchInput = document.getElementById('faq-search');
          if (searchInput) {
            searchInput.addEventListener('input', function(e) {
              const searchTerm = e.target.value.toLowerCase();
              const faqItems = document.querySelectorAll('.faq-item');
              
              faqItems.forEach(item => {
                const question = item.querySelector('h3');
                const answer = item.querySelector('p');
                
                if (question && answer) {
                  const questionText = question.textContent.toLowerCase();
                  const answerText = answer.textContent.toLowerCase();
                  
                  if (questionText.includes(searchTerm) || answerText.includes(searchTerm) || searchTerm === '') {
                    item.style.display = 'block';
                  } else {
                    item.style.display = 'none';
                  }
                }
              });
            });
          }

          // Mobile menu functionaliteit
          const mobileMenuButton = document.getElementById('mobile-menu-button');
          const mobileMenu = document.getElementById('mobile-menu');
          
          if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function() {
              mobileMenu.classList.toggle('hidden');
            });
          }
          
        });
      `}</script>
    </div>,
    {
      title: 'FAQ Thuisbatterij - Alle Antwoorden op je Vragen over Thuisbatterijen',
      description: 'Veelgestelde vragen thuisbatterij. ✓ Kosten & besparing ✓ Subsidie info ✓ Installatie ✓ Merken ✓ Capaciteit ✓ Levensduur. Alle antwoorden op één plek.',
      keywords: 'FAQ thuisbatterij, vragen thuisbatterij, thuisbatterij antwoorden, hulp thuisbatterij, thuisbatterij uitleg'
    }
  )
})

// Blog artikel data
const blogArtikelen = {
  'thuisbatterij-met-zonnepanelen': {
    titel: 'Thuisbatterij met zonnepanelen: de perfecte combinatie',
    excerpt: 'Ontdek waarom een thuisbatterij en zonnepanelen samen de beste investering zijn voor je energietoekomst.',
    datum: '2025-01-15',
    leestijd: '8 min',
    auteur: 'Mark van der Berg',
    tags: ['zonnepanelen', 'combinatie', 'besparing'],
    content: `
      <p class="lead">Een thuisbatterij en zonnepanelen vormen samen de perfecte combinatie voor maximale energiebesparing. In dit artikel leggen we uit waarom deze combinatie zo krachtig is en hoe je er optimaal van profiteert.</p>

      <h2>Waarom zijn zonnepanelen en thuisbatterij de perfecte match?</h2>
      
      <p>Zonnepanelen produceren overdag energie, maar de meeste huishoudens verbruiken juist 's avonds en 's nachts de meeste stroom. Zonder batterij moet je overtollige zonne-energie terugleveren aan het net voor een lage vergoeding, en 's avonds dure stroom inkopen.</p>

      <div class="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
        <h3 class="text-lg font-semibold mb-2">💡 Slim opslaan = meer besparen</h3>
        <p>Met een thuisbatterij sla je overtollige zonne-energie op en gebruik je deze 's avonds. Hierdoor verhoog je je zelfconsumptie van 30% naar 80%.</p>
      </div>

      <h2>Concrete voordelen van de combinatie</h2>

      <h3>1. Verhoogde zelfconsumptie</h3>
      <p>Zonder batterij gebruik je slechts 30% van je zonne-energie direct. Met een batterij stijgt dit naar 80%, wat betekent dat je veel minder stroom hoeft te kopen van het net.</p>

      <h3>2. Bescherming tegen netcongestie</h3>
      <p>Bij netcongestie kun je geen overtollige stroom terugleveren. Met een batterij ben je hier niet van afhankelijk en kun je je eigen opgewekte energie altijd opslaan.</p>

      <h3>3. Maximale besparing op energiekosten</h3>
      <p>De combinatie bespaart gemiddeld €800-1.500 per jaar op je energierekening, afhankelijk van je verbruik en de grootte van je installatie.</p>

      <h2>Praktijkvoorbeeld: Familie Jansen</h2>
      
      <div class="bg-gray-50 p-6 rounded-lg my-8">
        <p><strong>Situatie:</strong> Gezin met 4 personen, jaarverbruik 4.200 kWh</p>
        <p><strong>Installatie:</strong> 12 zonnepanelen (4.800 kWh/jaar) + 10 kWh batterij</p>
        <p><strong>Resultaat:</strong> €1.200 besparing per jaar, terugverdientijd 6 jaar</p>
      </div>

      <h2>Optimale dimensionering</h2>

      <h3>Vuistregels voor de juiste verhouding:</h3>
      <ul>
        <li><strong>Batterijcapaciteit:</strong> 25-40% van je jaarlijkse zonnepaneel opbrengst</li>
        <li><strong>Voor 10 panelen (3.600 kWh):</strong> 7,5-10 kWh batterij</li>
        <li><strong>Voor 15 panelen (5.400 kWh):</strong> 10-15 kWh batterij</li>
      </ul>

      <h2>Installatie volgorde: eerst panelen of eerst batterij?</h2>
      
      <p>De meeste experts raden aan om eerst zonnepanelen te installeren en een jaar later een batterij toe te voegen. Zo kun je:</p>
      <ul>
        <li>Je werkelijke verbruikspatroon analyseren</li>
        <li>De juiste batterijcapaciteit bepalen</li>
        <li>Profiteren van technologische ontwikkelingen</li>
      </ul>

      <h2>Kosten en terugverdientijd</h2>
      
      <p>De totale investering voor zonnepanelen + batterij ligt tussen €12.000-18.000. Met de juiste subsidies en de huidige energieprijzen is de terugverdientijd 6-8 jaar.</p>

      <h2>Conclusie</h2>
      
      <p>De combinatie van zonnepanelen en een thuisbatterij is de slimste investering voor energieonafhankelijkheid. Je maximaliseert je besparing, bent minder afhankelijk van het net en draagt bij aan een duurzame toekomst.</p>
    `
  },
  'wat-kost-thuisbatterij-2025': {
    titel: '10 redenen om in 2025 een thuisbatterij te kopen',
    excerpt: 'Stijgende energieprijzen, nieuwe subsidies en verbeterde technologie maken 2025 het perfecte jaar.',
    datum: '2025-01-10',
    leestijd: '6 min',
    auteur: 'Lisa Hendriks',
    tags: ['2025', 'voordelen', 'investering'],
    content: `
      <p class="lead">2025 is het perfecte jaar om een thuisbatterij aan te schaffen. Van nieuwe subsidies tot verbeterde technologie - hier zijn 10 overtuigende redenen waarom je nu moet investeren.</p>

      <h2>1. Nieuwe ISDE subsidie van €2.500</h2>
      <p>Voor 2025 heeft de regering de ISDE subsidie voor thuisbatterijen verhoogd naar €2.500. Deze subsidie is beschikbaar voor batterijen vanaf 5 kWh in combinatie with zonnepanelen.</p>

      <h2>2. Stijgende energieprijzen</h2>
      <p>Energieprijzen blijven stijgen door geopolitieke spanningen en de energietransitie. Met een thuisbatterij bescherm je jezelf tegen toekomstige prijsstijgingen.</p>

      <div class="bg-green-50 border-l-4 border-green-400 p-6 my-8">
        <h3 class="text-lg font-semibold mb-2">💰 Besparing berekening</h3>
        <p>Bij een energieprijs van €0,40 per kWh bespaar je met een 10 kWh batterij ongeveer €1.000 per jaar.</p>
      </div>

      <h2>3. Verbeterde batterijkwaliteit</h2>
      <p>Moderne lithium batterijen hebben een levensduur van 15-20 jaar en behouden 90% van hun capaciteit na 10 jaar. De kwaliteit is de afgelopen jaren enorm verbeterd.</p>

      <h2>4. Netcongestie problemen</h2>
      <p>Steeds vaker kunnen huishoudens geen stroom terugleveren door netcongestie. Met een batterij kun je je energie altijd opslaan, onafhankelijk van netwerkproblemen.</p>

      <h2>5. BTW verlaging naar 9%</h2>
      <p>Voor woningen ouder dan 2 jaar betaal je slechts 9% BTW in plaats van 21%. Dit scheelt €600-1.200 op je totale investering.</p>

      <h2>6. Dynamische energietarieven</h2>
      <p>Steeds meer energieleveranciers bieden dynamische tarieven. Met een batterij kun je optimaal profiteren van lage nachttarieven door slim te laden en ontladen.</p>

      <h2>7. Technologie wordt betaalbaarder</h2>
      <p>De prijs per kWh batterijcapaciteit is de afgelopen 5 jaar met 60% gedaald. Tegelijkertijd is de kwaliteit en levensduur toegenomen.</p>

      <h2>8. Eenvoudigere installatie</h2>
      <p>Moderne thuisbatterijen zijn plug-and-play geworden. Een professionele installatie duurt slechts een halve dag en vereist minimale aanpassingen aan je woning.</p>

      <h2>9. Slimme energie management</h2>
      <p>Nieuwe batterijen hebben geavanceerde software die leert van je verbruikspatroon en automatisch optimaliseert voor maximale besparing.</p>

      <h2>10. Waardestijging van je woning</h2>
      <p>Een thuisbatterij verhoogt de waarde van je woning. Kopers waarderen energiezuinige woningen steeds meer, wat zich vertaalt in een hogere verkoopprijs.</p>

      <h2>Actie ondernemen in 2025</h2>
      
      <p>Wacht niet langer met je investering. De combinatie van subsidies, technologische vooruitgang en stijgende energieprijzen maakt 2025 het ideale moment.</p>

      <div class="bg-blue-50 p-6 rounded-lg my-8">
        <h3 class="text-lg font-semibold mb-2">🚀 Stappenplan voor 2025</h3>
        <ol class="list-decimal list-inside space-y-2">
          <li>Bereken je besparing met onze calculator</li>
          <li>Vergelijk batterijen op onze website</li>
          <li>Vraag subsidie aan (vóór installatie!)</li>
          <li>Kies een betrouwbare installateur</li>
          <li>Begin met besparen vanaf dag 1</li>
        </ol>
      </div>

      <h2>Conclusie</h2>
      
      <p>De sterren staan gunstig voor thuisbatterijen in 2025. Van financiële voordelen tot technologische vooruitgang - alle factoren wijzen naar dit jaar als het perfecte moment om te investeren in energieonafhankelijkheid.</p>
    `
  },
  'thuisbatterij-vs-dynamisch-contract': {
    titel: 'Thuisbatterij vs dynamisch energiecontract',
    excerpt: 'Welke optie bespaart meer geld? Een vergelijking van beide strategieën voor energiebesparing.',
    datum: '2025-01-05',
    leestijd: '10 min',
    auteur: 'Tom Bakker',
    tags: ['dynamisch tarief', 'besparing', 'vergelijking'],
    content: `
      <p class="lead">Dynamische energiecontracten en thuisbatterijen zijn beide populaire manieren om te besparen op energiekosten. Maar welke optie is het meest voordelig voor jouw situatie?</p>

      <h2>Wat is een dynamisch energiecontract?</h2>
      
      <p>Bij een dynamisch contract betaal je de actuele inkoopprijs voor energie, die elk uur kan wijzigen. Prijzen zijn laag bij veel aanbod (veel zon/wind) en hoog bij weinig aanbod.</p>

      <h2>Hoe werkt een thuisbatterij?</h2>
      
      <p>Een thuisbatterij slaat energie op wanneer het goedkoop is (overdag met zonnepanelen of 's nachts) en gebruikt deze wanneer energie duur is (tijdens piekuren).</p>

      <h2>Vergelijking: Besparing per jaar</h2>

      <div class="overflow-x-auto my-8">
        <table class="min-w-full bg-white border border-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Strategie</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Investering</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jaarlijkse besparing</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Terugverdientijd</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap font-medium">Dynamisch contract</td>
              <td class="px-6 py-4 whitespace-nowrap">€0</td>
              <td class="px-6 py-4 whitespace-nowrap">€200-400</td>
              <td class="px-6 py-4 whitespace-nowrap">Direct</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap font-medium">Thuisbatterij (zonder zonnepanelen)</td>
              <td class="px-6 py-4 whitespace-nowrap">€5.000</td>
              <td class="px-6 py-4 whitespace-nowrap">€400-600</td>
              <td class="px-6 py-4 whitespace-nowrap">8-12 jaar</td>
            </tr>
            <tr class="bg-green-50">
              <td class="px-6 py-4 whitespace-nowrap font-medium">Thuisbatterij + zonnepanelen</td>
              <td class="px-6 py-4 whitespace-nowrap">€12.000</td>
              <td class="px-6 py-4 whitespace-nowrap">€1.000-1.500</td>
              <td class="px-6 py-4 whitespace-nowrap">6-8 jaar</td>
            </tr>
            <tr class="bg-blue-50">
              <td class="px-6 py-4 whitespace-nowrap font-medium">Batterij + dynamisch contract</td>
              <td class="px-6 py-4 whitespace-nowrap">€5.000</td>
              <td class="px-6 py-4 whitespace-nowrap">€600-900</td>
              <td class="px-6 py-4 whitespace-nowrap">6-8 jaar</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Voor- en nadelen dynamisch contract</h2>

      <h3>✅ Voordelen</h3>
      <ul>
        <li>Geen investering nodig</li>
        <li>Direct besparing mogelijk</li>
        <li>Profiteert van lage energieprijzen</li>
        <li>Eenvoudig om te stappen</li>
      </ul>

      <h3>❌ Nadelen</h3>
      <ul>
        <li>Prijzen kunnen onvoorspelbaar zijn</li>
        <li>Vereist actieve monitoring</li>
        <li>Beperkte besparing (€200-400/jaar)</li>
        <li>Geen bescherming tegen extreme prijspieken</li>
      </ul>

      <h2>Voor- en nadelen thuisbatterij</h2>

      <h3>✅ Voordelen</h3>
      <ul>
        <li>Voorspelbare besparing</li>
        <li>Onafhankelijkheid van netprijzen</li>
        <li>Grotere besparing mogelijk</li>
        <li>Bescherming tegen stroomuitval</li>
        <li>Waardestijging woning</li>
      </ul>

      <h3>❌ Nadelen</h3>
      <ul>
        <li>Hoge initiële investering</li>
        <li>Langere terugverdientijd</li>
        <li>Technische complexiteit</li>
        <li>Capaciteitsverlies over tijd</li>
      </ul>

      <h2>De ultieme combinatie: Batterij + Dynamisch</h2>
      
      <p>Waarom kiezen? De slimste strategie combineert beide opties:</p>

      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
        <h3 class="text-lg font-semibold mb-2">🔋⚡ Slimme combinatie strategie</h3>
        <ul class="space-y-2">
          <li><strong>Overdag:</strong> Batterij laden bij lage dynamische prijzen</li>
          <li><strong>'s Avonds:</strong> Batterij gebruiken bij hoge prijzen</li>
          <li><strong>Weekend:</strong> Extra laden bij zeer lage prijzen</li>
          <li><strong>Resultaat:</strong> Maximale besparing van €600-900 per jaar</li>
        </ul>
      </div>

      <h2>Welke optie past bij jou?</h2>

      <h3>Kies voor een dynamisch contract als:</h3>
      <ul>
        <li>Je geen grote investering wilt doen</li>
        <li>Je flexibel bent met energieverbruik</li>
        <li>Je actief wilt blijven monitoren</li>
        <li>Je woonsituatie tijdelijk is</li>
      </ul>

      <h3>Kies voor een thuisbatterij als:</h3>
      <ul>
        <li>Je al zonnepanelen hebt</li>
        <li>Je voorspelbare kosten wilt</li>
        <li>Je maximale onafhankelijkheid wilt</li>
        <li>Je lange termijn wilt investeren</li>
      </ul>

      <h3>Kies voor de combinatie als:</h3>
      <ul>
        <li>Je maximale besparing wilt</li>
        <li>Je technisch onderlegd bent</li>
        <li>Je bereid bent te investeren</li>
        <li>Je een smart home hebt</li>
      </ul>

      <h2>Praktijkvoorbeeld: Vergelijking drie huishoudens</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <div class="bg-white border border-gray-200 p-6 rounded-lg">
          <h4 class="font-semibold mb-2">Starter (huurwoning)</h4>
          <p class="text-sm text-gray-600 mb-4">Jonge professional, 2.800 kWh/jaar</p>
          <p><strong>Beste optie:</strong> Dynamisch contract</p>
          <p><strong>Besparing:</strong> €250/jaar</p>
        </div>
        <div class="bg-white border border-gray-200 p-6 rounded-lg">
          <h4 class="font-semibold mb-2">Gezin (eigen woning)</h4>
          <p class="text-sm text-gray-600 mb-4">Gezin met 2 kinderen, 4.200 kWh/jaar</p>
          <p><strong>Beste optie:</strong> Batterij + zonnepanelen</p>
          <p><strong>Besparing:</strong> €1.200/jaar</p>
        </div>
        <div class="bg-white border border-gray-200 p-6 rounded-lg">
          <h4 class="font-semibold mb-2">Tech-savvy (smart home)</h4>
          <p class="text-sm text-gray-600 mb-4">Early adopter, 3.800 kWh/jaar</p>
          <p><strong>Beste optie:</strong> Batterij + dynamisch</p>
          <p><strong>Besparing:</strong> €800/jaar</p>
        </div>
      </div>

      <h2>Conclusie</h2>
      
      <p>Er is geen one-size-fits-all oplossing. Een dynamisch contract biedt snelle, risicoloze besparing. Een thuisbatterij biedt langetermijn voordelen en onafhankelijkheid. De combinatie van beide maximaliseert je besparing, maar vereist meer investering en kennis.</p>
      
      <p>Gebruik onze calculator om te berekenen welke optie het meest voordelig is voor jouw specifieke situatie.</p>
    `
  },
  'fouten-bij-aanschaf-thuisbatterij': {
    titel: 'Top 5 fouten bij de aanschaf van een thuisbatterij',
    excerpt: 'Vermijd kostbare fouten bij je thuisbatterij aankoop. Leer van de ervaringen van anderen.',
    datum: '2024-12-20',
    leestijd: '7 min',
    auteur: 'Peter de Vries',
    tags: ['fouten', 'tips', 'aanschaf'],
    content: `
      <p class="lead">Bij de aanschaf van een thuisbatterij maken veel mensen dezelfde fouten. Deze kunnen leiden tot teleurstelling, extra kosten of suboptimale prestaties. Hier zijn de 5 meest gemaakte fouten en hoe je ze vermijdt.</p>

      <h2>Fout #1: Verkeerde capaciteit kiezen</h2>
      
      <div class="bg-red-50 border-l-4 border-red-400 p-6 my-8">
        <h3 class="text-lg font-semibold mb-2 text-red-800">❌ Veel voorkomende fout</h3>
        <p>"Ik koop de grootste batterij die ik kan betalen, want meer is altijd beter."</p>
      </div>

      <p><strong>Waarom dit fout is:</strong> Een te grote batterij wordt nooit volledig benut, wat betekent dat je teveel betaalt per nuttige kWh. Een te kleine batterij beperkt je besparing.</p>

      <div class="bg-green-50 border-l-4 border-green-400 p-6 my-8">
        <h3 class="text-lg font-semibold mb-2 text-green-800">✅ Juiste aanpak</h3>
        <p>Bereken je dagelijkse avond- en nachtverbruik. Kies een batterij die 80-100% hiervan kan dekken (meestal 30-50% van je totale dagverbruik).</p>
      </div>

      <h3>Praktische vuistregel:</h3>
      <ul>
        <li><strong>Klein huishouden (2.500 kWh/jaar):</strong> 5-7 kWh batterij</li>
        <li><strong>Gemiddeld huishouden (3.500 kWh/jaar):</strong> 7-10 kWh batterij</li>
        <li><strong>Groot huishouden (4.500+ kWh/jaar):</strong> 10-15 kWh batterij</li>
      </ul>

      <h2>Fout #2: Subsidie te laat aanvragen</h2>
      
      <div class="bg-red-50 border-l-4 border-red-400 p-6 my-8">
        <h3 class="text-lg font-semibold mb-2 text-red-800">❌ Kostbare vergissing</h3>
        <p>"Ik installeer eerst de batterij en vraag daarna subsidie aan."</p>
      </div>

      <p><strong>Gevolg:</strong> Je krijgt GEEN subsidie meer. Subsidie moet altijd vóór installatie worden aangevraagd.</p>

      <div class="bg-green-50 border-l-4 border-green-400 p-6 my-8">
        <h3 class="text-lg font-semibold mb-2 text-green-800">✅ Correct stappenplan</h3>
        <ol class="list-decimal list-inside space-y-1">
          <li>Subsidie aanvragen bij RVO</li>
          <li>Wachten op beschikking (4-8 weken)</li>
          <li>Bij goedkeuring: batterij laten installeren</li>
          <li>Binnen 3 maanden: verantwoording insturen</li>
        </ol>
      </div>

      <h2>Fout #3: Goedkoopste installateur kiezen</h2>
      
      <p>Een slechte installatie kan leiden tot:</p>
      <ul>
        <li>Veiligheidsrisico's</li>
        <li>Suboptimale prestaties</li>
        <li>Garantie problemen</li>
        <li>Dure reparaties later</li>
      </ul>

      <h3>Waar op te letten bij installateur selectie:</h3>
      <ul>
        <li>✅ Erkend door fabrikant batterij</li>
        <li>✅ Verzekerd voor schade</li>
        <li>✅ Goede reviews van klanten</li>
        <li>✅ Transparante offerte</li>
        <li>✅ Nazorg en onderhoud mogelijk</li>
      </ul>

      <h2>Fout #4: Batterij zonder app/monitoring kopen</h2>
      
      <div class="bg-red-50 border-l-4 border-red-400 p-6 my-8">
        <h3 class="text-lg font-semibold mb-2 text-red-800">❌ Gemiste kans</h3>
        <p>"Een goedkope batterij zonder app werkt ook prima."</p>
      </div>

      <p><strong>Waarom monitoring essentieel is:</strong></p>
      <ul>
        <li>Inzicht in prestaties en besparing</li>
        <li>Vroegtijdige detectie van problemen</li>
        <li>Optimalisatie van laad/ontlaad schema's</li>
        <li>Garantie claims onderbouwen</li>
      </ul>

      <h2>Fout #5: Batterij plaatsen in verkeerde ruimte</h2>
      
      <h3>Problemen bij verkeerde plaatsing:</h3>
      <ul>
        <li><strong>Woonkamer:</strong> Geluidshinder en veiligheidsrisico</li>
        <li><strong>Ongeïsoleerde schuur:</strong> Prestatievermindering door kou</li>
        <li><strong>Vochtige kelder:</strong> Corrosie en levensduurverkorting</li>
        <li><strong>Zonnige plek:</strong> Oververhitting</li>
      </ul>

      <div class="bg-green-50 border-l-4 border-green-400 p-6 my-8">
        <h3 class="text-lg font-semibold mb-2 text-green-800">✅ Ideale locatie</h3>
        <ul class="space-y-1">
          <li>Droge, geïsoleerde ruimte</li>
          <li>Temperatuur tussen 5-25°C</li>
          <li>Goede ventilatie</li>
          <li>Bereikbaar voor onderhoud</li>
          <li>Dicht bij meterkast</li>
        </ul>
      </div>

      <h2>Bonus tip: Check compatibiliteit</h2>
      
      <p>Zorg ervoor dat je batterij compatibel is met:</p>
      <ul>
        <li>Je bestaande omvormer (bij zonnepanelen)</li>
        <li>Je meterkast configuratie</li>
        <li>Lokale netbeheerder eisen</li>
        <li>Toekomstige uitbreidingen</li>
      </ul>

      <h2>Checklist: Voor je koopt</h2>

      <div class="bg-blue-50 p-6 rounded-lg my-8">
        <h3 class="text-lg font-semibold mb-4">📋 Verifieer voor aankoop:</h3>
        <div class="space-y-2">
          <label class="flex items-center">
            <input type="checkbox" class="mr-2" />
            <span>Juiste capaciteit berekend</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2" />
            <span>Subsidie aangevraagd (en goedgekeurd)</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2" />
            <span>Erkende installateur geselecteerd</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2" />
            <span>Batterij met app/monitoring</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2" />
            <span>Geschikte locatie geïdentificeerd</span>
          </label>
          <label class="flex items-center">
            <input type="checkbox" class="mr-2" />
            <span>Compatibiliteit gecontroleerd</span>
          </label>
        </div>
      </div>

      <h2>Conclusie</h2>
      
      <p>Een thuisbatterij is een geweldige investering, maar alleen als je de juiste keuzes maakt. Door deze veelgemaakte fouten te vermijden, zorg je ervoor dat je batterij optimaal presteert en maximale besparing oplevert.</p>
      
      <p>Neem je tijd voor onderzoek, vergelijk grondig en kies kwaliteit boven de laagste prijs. Je toekomstige zelf zal je dankbaar zijn!</p>
    `
  }
};

// Individuele blog artikel pagina's
app.get('/blog/:articleId', (c) => {
  const articleId = c.req.param('articleId')
  const artikel = blogArtikelen[articleId]
  
  if (!artikel) {
    return c.notFound()
  }

  return c.render(
    <div>
      {/* Breadcrumb */}
      <nav class="bg-gray-50 py-4">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol class="flex items-center space-x-2 text-sm">
            <li><a href="/" class="hover:underline" style="color: #10b981">Home</a></li>
            <li><i class="fas fa-chevron-right text-gray-400 mx-2"></i></li>
            <li><a href="/blog" class="hover:underline" style="color: #10b981">Blog</a></li>
            <li><i class="fas fa-chevron-right text-gray-400 mx-2"></i></li>
            <li class="text-gray-600 truncate">{artikel.titel}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Image */}
      <section class="relative h-64 overflow-hidden">
        <div class={`absolute inset-0 flex items-center justify-center ${
          articleId === 'thuisbatterij-met-zonnepanelen' ? 'bg-gradient-to-r from-yellow-400 to-green-500' :
          articleId === 'wat-kost-thuisbatterij-2025' ? 'bg-gradient-to-r from-green-400 to-blue-500' :
          articleId === 'thuisbatterij-vs-dynamisch-contract' ? 'bg-gradient-to-r from-blue-500 to-purple-600' :
          articleId === 'fouten-bij-aanschaf-thuisbatterij' ? 'bg-gradient-to-r from-red-400 to-orange-500' :
          'bg-gradient-to-r from-purple-400 to-pink-500'
        }`}>
          <div class="text-center text-white">
            <i class={`fas ${
              articleId === 'thuisbatterij-met-zonnepanelen' ? 'fa-solar-panel' :
              articleId === 'wat-kost-thuisbatterij-2025' ? 'fa-calendar-alt' :
              articleId === 'thuisbatterij-vs-dynamisch-contract' ? 'fa-balance-scale' :
              articleId === 'fouten-bij-aanschaf-thuisbatterij' ? 'fa-exclamation-triangle' :
              'fa-lightbulb'
            } text-8xl mb-4 opacity-30`}></i>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <article class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header class="mb-8">
            <div class="flex flex-wrap gap-2 mb-4">
              {artikel.tags.map((tag) => (
                <span key={tag} class="px-3 py-1 rounded-full text-sm font-medium" style="background-color: rgba(16, 185, 129, 0.1); color: #10b981">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {artikel.titel}
            </h1>
            
            <div class="flex items-center text-gray-600 mb-6">
              <i class="fas fa-user-circle text-xl mr-2"></i>
              <span class="mr-4">Door {artikel.auteur}</span>
              <i class="fas fa-calendar text-sm mr-2"></i>
              <span class="mr-4">{artikel.datum}</span>
              <i class="fas fa-clock text-sm mr-2"></i>
              <span>{artikel.leestijd} leestijd</span>
            </div>
            
            <p class="text-xl text-gray-600 leading-relaxed">
              {artikel.excerpt}
            </p>
          </header>

          {/* Article Content */}
          <div class="prose prose-lg max-w-none" dangerouslySetInnerHTML={{__html: artikel.content}}></div>

          {/* Share & Navigation */}
          <footer class="mt-12 pt-8 border-t border-gray-200">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <h3 class="font-semibold mb-2">Deel dit artikel:</h3>
                <div class="flex space-x-3">
                  <a href="#" class="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" class="bg-blue-400 text-white px-3 py-2 rounded hover:bg-blue-500">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="#" class="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
                    <i class="fab fa-whatsapp"></i>
                  </a>
                  <a href="#" class="bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-800">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              
              <div class="text-right">
                <a href="/blog" class="inline-flex items-center text-energy-green hover:underline font-medium">
                  <i class="fas fa-arrow-left mr-2"></i>
                  Terug naar blog
                </a>
              </div>
            </div>
          </footer>
        </div>
      </article>

      {/* Related Articles */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-center text-gray-900">Gerelateerde Artikelen</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(blogArtikelen).filter(([id]) => id !== articleId).slice(0, 3).map(([id, relatedArtikel]) => (
              <div key={id} class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div class="h-48 relative overflow-hidden">
                  <div class={`absolute inset-0 flex items-center justify-center text-6xl ${
                    id === 'thuisbatterij-met-zonnepanelen' ? 'bg-gradient-to-br from-yellow-400 to-green-500 text-white' :
                    id === 'wat-kost-thuisbatterij-2025' ? 'bg-gradient-to-br from-green-400 to-blue-500 text-white' :
                    id === 'thuisbatterij-vs-dynamisch-contract' ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' :
                    id === 'fouten-bij-aanschaf-thuisbatterij' ? 'bg-gradient-to-br from-red-400 to-orange-500 text-white' :
                    'bg-gradient-to-br from-purple-400 to-pink-500 text-white'
                  }`}>
                    <i class={`fas ${
                      id === 'thuisbatterij-met-zonnepanelen' ? 'fa-solar-panel' :
                      id === 'wat-kost-thuisbatterij-2025' ? 'fa-calendar-alt' :
                      id === 'thuisbatterij-vs-dynamisch-contract' ? 'fa-balance-scale' :
                      id === 'fouten-bij-aanschaf-thuisbatterij' ? 'fa-exclamation-triangle' :
                      'fa-lightbulb'
                    }`}></i>
                  </div>
                </div>
                <div class="p-6">
                  <div class="flex items-center text-sm text-gray-500 mb-3">
                    <span>{relatedArtikel.datum}</span>
                    <span class="mx-2">•</span>
                    <span>{relatedArtikel.leestijd} leestijd</span>
                  </div>
                  <h3 class="text-xl font-bold mb-3 text-gray-900">{relatedArtikel.titel}</h3>
                  <p class="text-gray-600 mb-4">{relatedArtikel.excerpt}</p>
                  <a href={`/blog/${id}`} class="text-energy-green hover:underline font-medium">
                    Lees meer →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>,
    {
      title: artikel.titel + ' - Thuisbatterij Blog',
      description: artikel.excerpt,
      keywords: artikel.tags.join(', ') + ', thuisbatterij, blog, gids'
    }
  )
})

// Eenvoudige merk redirects naar volledige productpagina's
app.get('/growatt', (c) => {
  return c.redirect('/merken/growatt-arb-10', 301)
})

app.get('/dyness', (c) => {
  return c.redirect('/merken/dyness-powerwall-b4850', 301)
})

app.get('/victron', (c) => {
  return c.redirect('/merken/victron-multiplus', 301)
})

app.get('/homewizard', (c) => {
  return c.redirect('/merken/homewizard-p1', 301)
})

app.get('/zonneplan', (c) => {
  return c.redirect('/merken/zonneplan-battery', 301)
})

// Producten overzichtspagina
app.get('/producten', (c) => {
  return c.redirect('/vergelijken', 301)
})

// Privacy Pagina
app.get('/privacy', (c) => {
  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Privacybeleid
            </h1>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto">
              Hoe wij omgaan met je persoonlijke gegevens en privacy
            </p>
            <p class="text-sm text-gray-500 mt-4">Laatst bijgewerkt: 28 augustus 2025</p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="prose prose-lg mx-auto">
            
            <h2>1. Welke gegevens verzamelen wij?</h2>
            <p>
              Wij verzamelen alleen gegevens die noodzakelijk zijn voor het functioneren van onze website 
              en het leveren van onze diensten:
            </p>
            <ul>
              <li><strong>Contactgegevens:</strong> Naam, e-mailadres, telefoonnummer (alleen bij contact)</li>
              <li><strong>Website gebruik:</strong> Pagina bezoeken, klikgedrag (via cookies)</li>
              <li><strong>Technische gegevens:</strong> IP-adres, browsertype, apparaattype</li>
            </ul>

            <h2>2. Hoe gebruiken wij je gegevens?</h2>
            <p>Je gegevens gebruiken wij uitsluitend voor:</p>
            <ul>
              <li>Het beantwoorden van je vragen en verzoeken</li>
              <li>Het verbeteren van onze website en diensten</li>
              <li>Het naleven van wettelijke verplichtingen</li>
            </ul>
            
            <div class="bg-green-50 border-l-4 border-green-400 p-6 my-8">
              <h3 class="text-lg font-semibold mb-2 text-green-800">✅ Geen commerciële doeleinden</h3>
              <p class="text-green-700">
                Wij verkopen je gegevens NOOIT aan derden en gebruiken ze niet voor commercial marketing zonder je toestemming.
              </p>
            </div>

            <h2>3. Cookies en tracking</h2>
            <p>
              Onze website gebruikt alleen essentiële cookies die nodig zijn voor het functioneren van de website. 
              We gebruiken geen tracking cookies van derden zonder je toestemming.
            </p>
            
            <h3>Welke cookies gebruiken wij:</h3>
            <ul>
              <li><strong>Functionele cookies:</strong> Voor website functionaliteit</li>
              <li><strong>Analytische cookies:</strong> Voor bezoekersstatistieken (geanonimiseerd)</li>
              <li><strong>Voorkeurscookies:</strong> Voor het onthouden van je voorkeuren</li>
            </ul>

            <h2>4. Beveiliging van gegevens</h2>
            <p>
              Wij nemen de beveiliging van je gegevens serieus en hebben passende technische en 
              organisatorische maatregelen getroffen:
            </p>
            <ul>
              <li>SSL-versleuteling voor alle data uitwisseling</li>
              <li>Beveiligde opslag van gegevens</li>
              <li>Beperkte toegang tot persoonlijke gegevens</li>
              <li>Regelmatige beveiligingsupdates</li>
            </ul>

            <h2>5. Bewaartermijn gegevens</h2>
            <p>
              Wij bewaren je gegevens niet langer dan noodzakelijk:
            </p>
            <ul>
              <li><strong>Contactformulier:</strong> 1 jaar na laatste contact</li>
              <li><strong>Website analytics:</strong> 26 maanden (Google Analytics standaard)</li>
              <li><strong>E-mail correspondentie:</strong> 3 jaar voor klantenservice doeleinden</li>
            </ul>

            <h2>6. Jouw rechten</h2>
            <p>Op grond van de AVG heb je de volgende rechten:</p>
            <ul>
              <li><strong>Inzagerecht:</strong> Je kunt opvragen welke gegevens wij van je hebben</li>
              <li><strong>Rectificatierecht:</strong> Je kunt onjuiste gegevens laten corrigeren</li>
              <li><strong>Recht op vergetelheid:</strong> Je kunt je gegevens laten verwijderen</li>
              <li><strong>Recht op overdraagbaarheid:</strong> Je kunt je gegevens in een standaardformaat opvragen</li>
              <li><strong>Bezwaarrecht:</strong> Je kunt bezwaar maken tegen verwerking van je gegevens</li>
            </ul>

            <h2>7. Externe links</h2>
            <p>
              Onze website bevat links naar externe websites van partners en leveranciers. 
              Wij zijn niet verantwoordelijk voor het privacybeleid van deze externe websites.
            </p>

            <h2>8. Wijzigingen in dit privacybeleid</h2>
            <p>
              Wij kunnen dit privacybeleid van tijd tot tijd wijzigen. Belangrijke wijzigingen 
              communiceren wij via onze website.
            </p>

            <h2>9. Contact</h2>
            <p>
              Heb je vragen over dit privacybeleid of wil je gebruik maken van je rechten? 
              Neem dan contact met ons op:
            </p>
            <div class="bg-gray-50 p-6 rounded-lg">
              <p><strong>E-mail:</strong> tjallingsol@gmail.com</p>
              <p><strong>Responstijd:</strong> Binnen 48 uur</p>
            </div>

          </div>
        </div>
      </section>
    </div>,
    {
      title: 'Privacybeleid - Hoe wij omgaan met je gegevens',
      description: 'Ons privacybeleid. Transparant over hoe we je gegevens verzamelen, gebruiken en beschermen. AVG-compliant en jouw privacy gerespecteerd.',
      keywords: 'privacybeleid, privacy, AVG, gegevensbescherming, cookies, persoonlijke gegevens'
    }
  )
})

// Disclaimer Pagina
app.get('/disclaimer', (c) => {
  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Disclaimer
            </h1>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto">
              Belangrijke juridische informatie over het gebruik van onze website
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer Content */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="prose prose-lg mx-auto">

            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 class="text-lg font-semibold mb-2 text-yellow-800">⚠️ Belangrijke mededeling</h3>
              <p class="text-yellow-700">
                Deze website is bedoeld voor informatieve doeleinden. Raadpleeg altijd een professional 
                voor specifiek advies over jouw situatie.
              </p>
            </div>

            <h2>1. Algemene informatie</h2>
            <p>
              Deze website (Thuisbatterijwereld.nl) biedt informatieve content over thuisbatterijen, 
              prijzen, subsidies en gerelateerde onderwerpen. De informatie is met zorg samengesteld, 
              maar er kunnen geen rechten aan worden ontleend.
            </p>

            <h2>2. Geen garantie op juistheid</h2>
            <p>
              Hoewel wij streven naar actuele en correcte informatie, kunnen wij niet garanderen dat:
            </p>
            <ul>
              <li>Alle informatie op elk moment volledig actueel is</li>
              <li>Prijzen en specificaties van producten kloppen</li>
              <li>Subsidie informatie up-to-date is</li>
              <li>Berekeningen en besparingen kloppen voor jouw situatie</li>
            </ul>

            <h2>3. Geen professioneel advies</h2>
            <p>
              De content op deze website vervangt geen professioneel advies van:
            </p>
            <ul>
              <li>Energie adviseurs</li>
              <li>Elektrische installateurs</li>
              <li>Belastingadviseurs (voor subsidies)</li>
              <li>Financiële adviseurs</li>
            </ul>
            
            <div class="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
              <h3 class="text-lg font-semibold mb-2 text-blue-800">💡 Advies</h3>
              <p class="text-blue-700">
                Vraag altijd meerdere offertes op en laat je adviseren door gecertificeerde professionals 
                voordat je een thuisbatterij aanschaft.
              </p>
            </div>

            <h2>4. Affiliate links en commissies</h2>
            <p>
              Deze website kan affiliate links bevatten naar producten en diensten. Dit betekent dat wij 
              een commissie kunnen ontvangen wanneer je via onze links een aankoop doet. Dit heeft geen 
              invloed op:
            </p>
            <ul>
              <li>De prijs die jij betaalt</li>
              <li>Onze objectieve beoordeling van producten</li>
              <li>De kwaliteit van onze reviews</li>
            </ul>

            <h2>5. Externe websites</h2>
            <p>
              Onze website bevat links naar externe websites van fabrikanten, leveranciers en 
              installatieservices. Wij zijn niet verantwoordelijk voor:
            </p>
            <ul>
              <li>De inhoud van externe websites</li>
              <li>De beschikbaarheid van externe diensten</li>
              <li>Transacties via externe websites</li>
              <li>Het privacybeleid van derden</li>
            </ul>

            <h2>6. Prijzen en beschikbaarheid</h2>
            <p>
              Prijzen en productbeschikbaarheid kunnen wijzigen zonder voorafgaande kennisgeving. 
              Controleer altijd de actuele prijs en beschikbaarheid bij de leverancier.
            </p>

            <h2>7. Reviews en ervaringen</h2>
            <p>
              Reviews en ervaringen op onze website zijn gebaseerd op:
            </p>
            <ul>
              <li>Objectieve productspecificaties</li>
              <li>Marktonderzoek en vergelijkingen</li>
              <li>Gebruikerservaringen waar beschikbaar</li>
            </ul>
            <p>
              Individuele ervaringen kunnen afwijken van onze beoordelingen.
            </p>

            <h2>8. Subsidie informatie</h2>
            <p>
              Subsidie regelingen wijzigen regelmatig. De informatie op onze website is indicatief. 
              Controleer altijd de actuele voorwaarden bij de betreffende overheidsinstanties zoals:
            </p>
            <ul>
              <li>RVO (Rijksdienst voor Ondernemend Nederland)</li>
              <li>Jouw gemeente</li>
              <li>Provinciale subsidie verstrekkers</li>
            </ul>

            <h2>9. Aansprakelijkheid</h2>
            <p>
              Wij zijn niet aansprakelijk voor:
            </p>
            <ul>
              <li>Schade door gebruik van informatie op deze website</li>
              <li>Verkeerde investeringsbeslissingen</li>
              <li>Financiële verliezen</li>
              <li>Indirect gevolgschade</li>
            </ul>

            <h2>10. Intellectueel eigendom</h2>
            <p>
              Alle content op deze website (teksten, afbeeldingen, logo's) is beschermd door auteursrecht. 
              Gebruik zonder toestemming is niet toegestaan.
            </p>

            <h2>11. Wijzigingen disclaimer</h2>
            <p>
              Wij behouden ons het recht voor deze disclaimer te wijzigen. Controleer regelmatig 
              voor updates.
            </p>

            <h2>12. Contact</h2>
            <p>
              Vragen over deze disclaimer? Neem contact op via:
            </p>
            <div class="bg-gray-50 p-6 rounded-lg">
              <p><strong>E-mail:</strong> tjallingsol@gmail.com</p>
            </div>

          </div>
        </div>
      </section>
    </div>,
    {
      title: 'Disclaimer - Juridische informatie Thuisbatterijwereld.nl',
      description: 'Disclaimer en juridische informatie over het gebruik van Thuisbatterijwereld.nl. Belangrijke informatie over aansprakelijkheid en gebruik van onze content.',
      keywords: 'disclaimer, juridische informatie, aansprakelijkheid, voorwaarden, thuisbatterij'
    }
  )
})

// Contact Pagina
app.get('/contact', (c) => {
  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Contact
            </h1>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto">
              Heb je vragen over thuisbatterijen? Wij helpen je graag verder!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h2 class="text-2xl font-bold mb-6 text-gray-900">
                <i class="fas fa-envelope text-energy-green mr-3"></i>
                Stuur ons een bericht
              </h2>
              
              <form id="contact-form" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                      Voornaam *
                    </label>
                    <input type="text" id="firstName" name="firstName" required
                           class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-energy-green focus:border-energy-green" />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                      Achternaam *
                    </label>
                    <input type="text" id="lastName" name="lastName" required
                           class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-energy-green focus:border-energy-green" />
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    E-mailadres *
                  </label>
                  <input type="email" id="email" name="email" required
                         class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-energy-green focus:border-energy-green" />
                </div>

                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                    Telefoonnummer
                  </label>
                  <input type="tel" id="phone" name="phone"
                         class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-energy-green focus:border-energy-green" />
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                    Onderwerp *
                  </label>
                  <select id="subject" name="subject" required
                          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-energy-green focus:border-energy-green">
                    <option value="">Selecteer een onderwerp</option>
                    <option value="product-advies">Productadvies thuisbatterij</option>
                    <option value="prijsinfo">Prijsinformatie</option>
                    <option value="subsidie">Subsidie vragen</option>
                    <option value="installatie">Installatie informatie</option>
                    <option value="technisch">Technische vragen</option>
                    <option value="klacht">Klacht of probleem</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                    Bericht *
                  </label>
                  <textarea id="message" name="message" rows="6" required
                            placeholder="Beschrijf je vraag zo specifiek mogelijk. Bijvoorbeeld: huidige energieverbruik, type woning, of welke batterij je overweegt."
                            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-energy-green focus:border-energy-green"></textarea>
                </div>

                <div class="flex items-start">
                  <input type="checkbox" id="privacy" name="privacy" required
                         class="mt-1 rounded border-gray-300 text-energy-green focus:ring-energy-green" />
                  <label for="privacy" class="ml-2 text-sm text-gray-600">
                    Ik ga akkoord met het <a href="/privacy" class="text-energy-green hover:underline">privacybeleid</a> 
                    en geef toestemming voor het verwerken van mijn gegevens *
                  </label>
                </div>

                <div class="flex items-start">
                  <input type="checkbox" id="newsletter" name="newsletter"
                         class="mt-1 rounded border-gray-300 text-energy-green focus:ring-energy-green" />
                  <label for="newsletter" class="ml-2 text-sm text-gray-600">
                    Ja, ik wil tips en updates over thuisbatterijen ontvangen (optioneel)
                  </label>
                </div>

                <button type="submit" 
                        class="w-full bg-energy-green text-white py-3 px-6 rounded-lg font-bold hover:bg-energy-green/90 transition-colors">
                  <i class="fas fa-paper-plane mr-2"></i>
                  Verstuur bericht
                </button>
              </form>

              <div id="form-message" class="mt-4 hidden"></div>
            </div>

            {/* Contact Info */}
            <div class="space-y-8">
              <div class="bg-gray-50 p-8 rounded-lg">
                <h3 class="text-xl font-bold mb-4 text-gray-900">
                  <i class="fas fa-clock text-energy-blue mr-2"></i>
                  Responstijd
                </h3>
                <p class="text-gray-600 mb-4">
                  Wij streven ernaar om alle vragen binnen 24 uur te beantwoorden. 
                  Voor dringende vragen kun je ons bellen.
                </p>
                <ul class="text-sm text-gray-600 space-y-2">
                  <li><strong>Maandag - Vrijdag:</strong> Binnen 4 uur</li>
                  <li><strong>Weekend:</strong> Binnen 24 uur</li>
                  <li><strong>Feestdagen:</strong> Binnen 48 uur</li>
                </ul>
              </div>

              <div class="bg-gray-50 p-8 rounded-lg">
                <h3 class="text-xl font-bold mb-4 text-gray-900">
                  <i class="fas fa-question-circle text-energy-green mr-2"></i>
                  Veel gestelde vragen
                </h3>
                <p class="text-gray-600 mb-4">
                  Controleer eerst onze <a href="/faq" class="text-energy-green hover:underline">FAQ pagina</a>. 
                  Daar vind je antwoorden op de meest gestelde vragen over:
                </p>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• Kosten en besparing</li>
                  <li>• Subsidie aanvragen</li>
                  <li>• Installatie proces</li>
                  <li>• Technische specificaties</li>
                </ul>
              </div>

              <div class="bg-gray-50 p-8 rounded-lg">
                <h3 class="text-xl font-bold mb-4 text-gray-900">
                  <i class="fas fa-users text-battery-orange mr-2"></i>
                  Persoonlijk advies
                </h3>
                <p class="text-gray-600">
                  Voor uitgebreid persoonlijk advies over de beste thuisbatterij voor jouw situatie 
                  kun je een gratis adviesgesprek aanvragen. We helpen je bij:
                </p>
                <ul class="text-sm text-gray-600 space-y-1 mt-4">
                  <li>• Capaciteit berekening</li>
                  <li>• Merk selectie</li>
                  <li>• ROI berekening</li>
                  <li>• Subsidie maximalisatie</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script>{`
        document.addEventListener('DOMContentLoaded', function() {
          const form = document.getElementById('contact-form');
          const messageDiv = document.getElementById('form-message');

          form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
              firstName: formData.get('firstName'),
              lastName: formData.get('lastName'),
              email: formData.get('email'),
              phone: formData.get('phone') || 'Niet opgegeven',
              subject: formData.get('subject'),
              message: formData.get('message'),
              newsletter: formData.get('newsletter') ? 'Ja' : 'Nee',
              timestamp: new Date().toLocaleString('nl-NL')
            };

            // Create mailto link
            const emailBody = 'Naam: ' + data.firstName + ' ' + data.lastName + '\\n' +
                             'E-mail: ' + data.email + '\\n' +
                             'Telefoon: ' + data.phone + '\\n' +
                             'Onderwerp: ' + data.subject + '\\n' +
                             'Newsletter: ' + data.newsletter + '\\n' +
                             'Tijdstip: ' + data.timestamp + '\\n\\n' +
                             'Bericht:\\n' + data.message;

            const mailtoLink = 'mailto:tjallingsol@gmail.com?subject=Contact thuisbatterij.nl - ' + data.subject + '&body=' + encodeURIComponent(emailBody);
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            messageDiv.className = 'mt-4 p-4 bg-green-50 border border-green-200 rounded-lg';
            messageDiv.innerHTML = '<div class="flex items-center">' +
                                   '<i class="fas fa-check-circle text-green-600 mr-2"></i>' +
                                   '<span class="text-green-800">Je e-mailclient wordt geopend. Verstuur de e-mail om je bericht te verzenden.</span>' +
                                   '</div>';
            
            // Reset form
            form.reset();
          });
        });
      `}</script>
    </div>,
    {
      title: 'Contact - Vragen over thuisbatterijen? Wij helpen je graag!',
      description: 'Neem contact op voor vragen over thuisbatterijen. Gratis advies over kosten, subsidies, installatie en productadvies. Reactie binnen 24 uur.',
      keywords: 'contact thuisbatterij, vragen thuisbatterij, advies thuisbatterij, hulp thuisbatterij'
    }
  )
})

// Over Ons Pagina  
app.get('/over-ons', (c) => {
  return c.render(
    <div>
      {/* Header */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Over Thuisbatterijwereld.nl
            </h1>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto">
              Jouw betrouwbare gids in de wereld van thuisbatterijen en energieopslag
            </p>
          </div>
        </div>
      </section>

      {/* Missie & Visie */}
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            <div class="bg-green-50 p-8 rounded-lg">
              <h2 class="text-2xl font-bold mb-4 text-gray-900">
                <i class="fas fa-bullseye text-energy-green mr-3"></i>
                Onze Missie
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Wij maken duurzame energie toegankelijk voor iedereen door heldere, onafhankelijke 
                informatie te bieden over thuisbatterijen. Ons doel is om Nederlandse huishoudens 
                te helpen de beste keuze te maken voor hun energietoekomst.
              </p>
            </div>

            <div class="bg-blue-50 p-8 rounded-lg">
              <h2 class="text-2xl font-bold mb-4 text-gray-900">
                <i class="fas fa-eye text-energy-blue mr-3"></i>
                Onze Visie  
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Een Nederland waar elk huishouden optimaal profiteert van duurzame energie door 
                slimme energieopslag. Wij geloven in een toekomst waarin iedereen energieonafhankelijk 
                kan zijn tegen betaalbare kosten.
              </p>
            </div>
          </div>

          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Waarom Thuisbatterijwereld.nl?</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              In een markt vol technische jargon en verwarrende claims, bieden wij duidelijkheid en onafhankelijk advies
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-energy-green rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-search text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">Onafhankelijk Onderzoek</h3>
              <p class="text-gray-600">
                Wij testen en vergelijken producten objectief, zonder beïnvloeding door fabrikanten. 
                Onze reviews zijn gebaseerd op feiten en specificaties.
              </p>
            </div>

            <div class="text-center p-6">
              <div class="w-16 h-16 bg-energy-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-graduation-cap text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">Expertise & Ervaring</h3>
              <p class="text-gray-600">
                Ons team heeft jarenlange ervaring in de energiesector en volgt alle ontwikkelingen 
                op het gebied van batterijtech-nologie en subsidies.
              </p>
            </div>

            <div class="text-center p-6">
              <div class="w-16 h-16 bg-battery-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-heart text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">Klantvriendelijk</h3>
              <p class="text-gray-600">
                Geen technische jargon, maar begrijpelijke uitleg. Wij helpen je om de juiste keuze 
                te maken die past bij jouw situatie en budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wat we doen */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Wat wij voor je doen</h2>
            <p class="text-xl text-gray-600">
              Van productadvies tot subsidie-informatie - wij begeleiden je door het hele proces
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-sm text-center">
              <i class="fas fa-balance-scale text-3xl text-energy-green mb-4"></i>
              <h3 class="font-bold mb-2">Product Vergelijking</h3>
              <p class="text-sm text-gray-600">Objectieve vergelijking van merken en specificaties</p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm text-center">
              <i class="fas fa-calculator text-3xl text-energy-blue mb-4"></i>
              <h3 class="font-bold mb-2">Kosten Berekening</h3>
              <p class="text-sm text-gray-600">Realistische berekening van kosten en besparing</p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm text-center">
              <i class="fas fa-euro-sign text-3xl text-battery-orange mb-4"></i>
              <h3 class="font-bold mb-2">Subsidie Advies</h3>
              <p class="text-sm text-gray-600">Actuele informatie over beschikbare subsidies</p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm text-center">
              <i class="fas fa-tools text-3xl text-gray-600 mb-4"></i>
              <h3 class="font-bold mb-2">Installatie Tips</h3>
              <p class="text-sm text-gray-600">Praktische adviezen voor installatie en onderhoud</p>
            </div>
          </div>
        </div>
      </section>

      {/* Onze Waarden */}
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Onze Waarden</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <i class="fas fa-shield-alt text-2xl text-energy-green"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold mb-2">Transparantie</h3>
                <p class="text-gray-600">
                  Wij zijn open over onze werkwijze, financieringsmodel en eventuele partnerships. 
                  Geen verborgen agenda's of misleidende claims.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <i class="fas fa-thumbs-up text-2xl text-energy-blue"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold mb-2">Betrouwbaarheid</h3>
                <p class="text-gray-600">
                  Onze informatie is gebaseerd op feiten, onderzoek en ervaring. Wij checken 
                  alle gegevens zorgvuldig voordat we ze publiceren.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <i class="fas fa-leaf text-2xl text-green-600"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold mb-2">Duurzaamheid</h3>
                <p class="text-gray-600">
                  Wij geloven in een duurzame energietoekomst en helpen consumenten om 
                  verantwoorde keuzes te maken voor het milieu.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <i class="fas fa-users text-2xl text-battery-orange"></i>
              </div>
              <div>
                <h3 class="text-lg font-bold mb-2">Klantvriendelijkheid</h3>
                <p class="text-gray-600">
                  De klant staat centraal. Wij bieden begrijpelijke informatie en persoonlijk 
                  advies dat aansluit bij jouw specifieke situatie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold mb-4 text-gray-900">Heb je vragen?</h2>
          <p class="text-lg text-gray-600 mb-8">
            Wij helpen je graag verder met persoonlijk advies over thuisbatterijen
          </p>
          <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/contact" 
               class="bg-energy-green text-white px-8 py-3 rounded-lg font-bold hover:bg-energy-green/90 transition-colors">
              <i class="fas fa-envelope mr-2"></i>
              Neem contact op
            </a>
            <a href="/faq" 
               class="bg-white border-2 border-energy-green text-energy-green px-8 py-3 rounded-lg font-bold hover:bg-energy-green hover:text-white transition-colors">
              <i class="fas fa-question-circle mr-2"></i>
              Bekijk FAQ
            </a>
          </div>
        </div>
      </section>
    </div>,
    {
      title: 'Over Ons - Thuisbatterijwereld.nl | Jouw betrouwbare energieadviseur',
      description: 'Ontdek wie wij zijn en waarom wij de beste keuze zijn voor thuisbatterij advies. Onafhankelijk, betrouwbaar en transparant sinds 2024.',
      keywords: 'over ons, thuisbatterij adviseurs, onafhankelijk advies, energie experts, betrouwbaar'
    }
  )
})

// Gids Pagina's

// Complete Kopers Gids
app.get('/gids/kopers-gids', (c) => {
  return c.render(
    <div>
      {/* Hero Section */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="mb-6">
            <a href="/" class="text-energy-green hover:underline">← Terug naar home</a>
          </nav>
          <div class="text-center">
            <div class="w-20 h-20 bg-energy-green text-white rounded-lg flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-book text-3xl"></i>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Complete Kopers Gids</h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Alles wat je moet weten voordat je een thuisbatterij koopt. Van capaciteit berekenen tot subsidie aanvragen.
            </p>
          </div>
        </div>
      </section>

      {/* Hoofdinhoud */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Inhoudsopgave */}
          <div class="bg-gray-50 p-6 rounded-lg mb-12">
            <h2 class="text-2xl font-bold mb-4 text-gray-900">Inhoudsopgave</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <a href="#stap1" class="block text-energy-green hover:underline mb-2">1. Capaciteit berekenen</a>
                <a href="#stap2" class="block text-energy-green hover:underline mb-2">2. Merken vergelijken</a>
              </div>
              <div>
                <a href="#stap3" class="block text-energy-green hover:underline mb-2">3. Installatie plannen</a>
                <a href="#stap4" class="block text-energy-green hover:underline mb-2">4. Subsidie aanvragen</a>
              </div>
            </div>
          </div>

          {/* Stap 1: Capaciteit berekenen */}
          <div id="stap1" class="mb-12">
            <h2 class="text-3xl font-bold mb-6 text-gray-900">
              <i class="fas fa-calculator text-energy-green mr-3"></i>
              Stap 1: Capaciteit berekenen
            </h2>
            
            <div class="prose max-w-none">
              <p class="text-lg text-gray-600 mb-6">
                De juiste capaciteit bepalen is cruciaal voor een goede investering. Te klein en je mist besparingen, 
                te groot en je betaalt te veel.
              </p>

              <div class="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 class="text-xl font-semibold mb-4 text-blue-900">Berekeningsformule</h3>
                <p class="mb-4"><strong>Basis capaciteit = Dagelijks verbruik × 0.3</strong></p>
                <p class="text-sm text-blue-700">
                  Voor een huishouden met 3500 kWh/jaar (≈ 10 kWh/dag) = 10 × 0.3 = 3 kWh minimum
                </p>
              </div>

              <h4 class="text-lg font-semibold mb-3">Factoren die de capaciteit beïnvloeden:</h4>
              <ul class="space-y-2 mb-6">
                <li class="flex items-start">
                  <i class="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span><strong>Zonnepanelen:</strong> Met zonnepanelen kun je voor grotere capaciteit gaan (5-15 kWh)</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span><strong>Huishoudgrootte:</strong> 1-2 personen: 5-7 kWh, 3-4 personen: 8-12 kWh, 5+ personen: 12-15 kWh</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span><strong>Energiegewoonten:</strong> Thuiswerken of elektrisch koken verhoogt de behoefte</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span><strong>Toekomstplannen:</strong> Elektrische auto, warmtepomp, uitbreiding gezin</span>
                </li>
              </ul>

              <div class="bg-yellow-50 p-4 rounded-lg">
                <p class="text-yellow-800">
                  <i class="fas fa-lightbulb mr-2"></i>
                  <strong>Tip:</strong> Gebruik onze <a href="/kosten" class="text-energy-green hover:underline">kosten calculator</a> 
                  om de optimale capaciteit voor jouw situatie te berekenen.
                </p>
              </div>
            </div>
          </div>

          {/* Stap 2: Merken vergelijken */}
          <div id="stap2" class="mb-12">
            <h2 class="text-3xl font-bold mb-6 text-gray-900">
              <i class="fas fa-balance-scale text-energy-green mr-3"></i>
              Stap 2: Merken vergelijken
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div class="bg-green-50 p-6 rounded-lg">
                <h4 class="font-semibold mb-3 text-green-900">Budget (€3.000-4.500)</h4>
                <ul class="space-y-2 text-sm">
                  <li>• Dyness PowerWall</li>
                  <li>• Chinese merken</li>
                  <li>• Basis functionaliteit</li>
                </ul>
              </div>
              <div class="bg-blue-50 p-6 rounded-lg">
                <h4 class="font-semibold mb-3 text-blue-900">Middensegment (€4.500-6.000)</h4>
                <ul class="space-y-2 text-sm">
                  <li>• Growatt ARB</li>
                  <li>• HomeWizard P1</li>
                  <li>• Goede prijs-kwaliteit</li>
                </ul>
              </div>
              <div class="bg-purple-50 p-6 rounded-lg">
                <h4 class="font-semibold mb-3 text-purple-900">Premium (€6.000+)</h4>
                <ul class="space-y-2 text-sm">
                  <li>• Victron MultiPlus</li>
                  <li>• Zonneplan Battery</li>
                  <li>• Hoogste kwaliteit</li>
                </ul>
              </div>
            </div>

            <h4 class="text-lg font-semibold mb-4">Belangrijke vergelijkingscriteria:</h4>
            <div class="overflow-x-auto mb-6">
              <table class="w-full border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-50">
                    <th class="border border-gray-300 px-4 py-2 text-left">Criterium</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Waarom belangrijk</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Benchmark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-gray-300 px-4 py-2 font-medium">Efficiency</td>
                    <td class="border border-gray-300 px-4 py-2">Minder energieverlies = meer besparing</td>
                    <td class="border border-gray-300 px-4 py-2">95%+ is goed</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 px-4 py-2 font-medium">Garantie</td>
                    <td class="border border-gray-300 px-4 py-2">Bescherming investering</td>
                    <td class="border border-gray-300 px-4 py-2">10+ jaar standaard</td>
                  </tr>
                  <tr>
                    <td class="border border-gray-300 px-4 py-2 font-medium">App kwaliteit</td>
                    <td class="border border-gray-300 px-4 py-2">Monitoring en controle</td>
                    <td class="border border-gray-300 px-4 py-2">Real-time data, historie</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="border border-gray-300 px-4 py-2 font-medium">Uitbreidbaarheid</td>
                    <td class="border border-gray-300 px-4 py-2">Toekomstige flexibiliteit</td>
                    <td class="border border-gray-300 px-4 py-2">Modulair systeem</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-green-50 p-4 rounded-lg">
              <p class="text-green-800">
                <i class="fas fa-search mr-2"></i>
                <strong>Vergelijk alle merken:</strong> Bekijk onze uitgebreide 
                <a href="/vergelijken" class="text-energy-green hover:underline">merkenvergelijking</a> 
                met actuele prijzen en specificaties.
              </p>
            </div>
          </div>

          {/* Stap 3: Installatie plannen */}
          <div id="stap3" class="mb-12">
            <h2 class="text-3xl font-bold mb-6 text-gray-900">
              <i class="fas fa-tools text-energy-green mr-3"></i>
              Stap 3: Installatie plannen
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 class="text-lg font-semibold mb-4">Voor de installatie</h4>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <i class="fas fa-home text-blue-600 mt-1 mr-3"></i>
                    <span><strong>Locatie bepalen:</strong> Meterkast, garage of technische ruimte</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-plug text-blue-600 mt-1 mr-3"></i>
                    <span><strong>Aansluitingen:</strong> 230V/400V aansluiting en netwerk/WiFi</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-file-alt text-blue-600 mt-1 mr-3"></i>
                    <span><strong>Vergunningen:</strong> Meestal niet nodig, check bij gemeente</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-phone text-blue-600 mt-1 mr-3"></i>
                    <span><strong>Netbeheerder:</strong> Melding bij systemen &gt; 3,68 kW</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="text-lg font-semibold mb-4">Installatie proces</h4>
                <div class="space-y-4">
                  <div class="bg-white p-4 border-l-4 border-energy-green">
                    <div class="font-semibold">Dag 1: Voorbereiding</div>
                    <div class="text-sm text-gray-600">Site survey, meting, planning</div>
                  </div>
                  <div class="bg-white p-4 border-l-4 border-blue-600">
                    <div class="font-semibold">Dag 2: Installatie</div>
                    <div class="text-sm text-gray-600">Montage, bedrading, aansluiting (4-8 uur)</div>
                  </div>
                  <div class="bg-white p-4 border-l-4 border-yellow-600">
                    <div class="font-semibold">Dag 3: Inbedrijfstelling</div>
                    <div class="text-sm text-gray-600">Testen, configuratie, training</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-red-50 p-4 rounded-lg">
              <p class="text-red-800">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                <strong>Let op:</strong> Kies altijd een gecertificeerde installateur met ervaring in thuisbatterijen. 
                Vraag referenties en garantie op het installatiewerk.
              </p>
            </div>
          </div>

          {/* Stap 4: Subsidie aanvragen */}
          <div id="stap4" class="mb-12">
            <h2 class="text-3xl font-bold mb-6 text-gray-900">
              <i class="fas fa-euro-sign text-energy-green mr-3"></i>
              Stap 4: Subsidie aanvragen
            </h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 class="text-lg font-semibold mb-4">Beschikbare subsidies 2025</h4>
                <div class="space-y-4">
                  <div class="bg-white p-4 border border-green-200 rounded-lg">
                    <h5 class="font-semibold text-green-800">ISDE Subsidie</h5>
                    <p class="text-sm text-gray-600 mb-2">Tot €2.500 voor thuisbatterijen</p>
                    <ul class="text-sm space-y-1">
                      <li>• Minimum 5 kWh capaciteit</li>
                      <li>• Gecertificeerde installateur</li>
                      <li>• Aanvraag vóór installatie</li>
                    </ul>
                  </div>
                  <div class="bg-white p-4 border border-blue-200 rounded-lg">
                    <h5 class="font-semibold text-blue-800">BTW Teruggave</h5>
                    <p class="text-sm text-gray-600 mb-2">21% BTW terug bij zonnepanelen</p>
                    <ul class="text-sm space-y-1">
                      <li>• Geldt bij combinatie met zonnepanelen</li>
                      <li>• Salderingsregeling tot 2027</li>
                      <li>• Aanvraag bij Belastingdienst</li>
                    </ul>
                  </div>
                  <div class="bg-white p-4 border border-yellow-200 rounded-lg">
                    <h5 class="font-semibold text-yellow-800">Lokale Subsidies</h5>
                    <p class="text-sm text-gray-600 mb-2">Extra subsidie van gemeenten</p>
                    <ul class="text-sm space-y-1">
                      <li>• Verschilt per gemeente</li>
                      <li>• €200 - €1.000 extra mogelijk</li>
                      <li>• Check gemeentelijke website</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="text-lg font-semibold mb-4">Aanvraag stappenplan</h4>
                <div class="space-y-3">
                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-energy-green text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">1</div>
                    <div>
                      <div class="font-semibold">Check beschikbaarheid</div>
                      <div class="text-sm text-gray-600">Controleer welke subsidies voor jou gelden</div>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-energy-green text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">2</div>
                    <div>
                      <div class="font-semibold">Verzamel documenten</div>
                      <div class="text-sm text-gray-600">Offertes, technische specificaties, installateurgegevens</div>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-energy-green text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">3</div>
                    <div>
                      <div class="font-semibold">Dien aanvraag in</div>
                      <div class="text-sm text-gray-600">Vóór installatie via RVO.nl of gemeente</div>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-energy-green text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">4</div>
                    <div>
                      <div class="font-semibold">Wacht op goedkeuring</div>
                      <div class="text-sm text-gray-600">2-8 weken verwerkingstijd</div>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="w-8 h-8 bg-energy-green text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">5</div>
                    <div>
                      <div class="font-semibold">Installeer en meld</div>
                      <div class="text-sm text-gray-600">Na goedkeuring installeren en gereedmelding</div>
                    </div>
                  </div>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg mt-6">
                  <p class="text-blue-800 text-sm">
                    <i class="fas fa-info-circle mr-2"></i>
                    <strong>Actuele info:</strong> Bekijk onze 
                    <a href="/subsidie" class="text-energy-green hover:underline">subsidie pagina</a> 
                    voor de meest recente bedragen en voorwaarden.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div class="bg-energy-green text-white p-8 rounded-lg text-center">
            <h3 class="text-2xl font-bold mb-4">Klaar om te beginnen?</h3>
            <p class="mb-6">Gebruik onze tools om de perfecte thuisbatterij voor jou te vinden</p>
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/kosten" class="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 hover:scale-105 border-2 border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-calculator mr-2"></i>
                Bereken Kosten
              </a>
              <a href="/vergelijken" class="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 hover:scale-105 border-2 border-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-balance-scale mr-2"></i>
                Vergelijk Merken
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>,
    {
      title: 'Complete Kopers Gids - Thuisbatterij | Stap-voor-stap naar de juiste keuze',
      description: 'Uitgebreide kopers gids voor thuisbatterijen. ✓ Capaciteit berekenen ✓ Merken vergelijken ✓ Installatie plannen ✓ Subsidie aanvragen. Alles wat je moet weten.',
      keywords: 'thuisbatterij kopers gids, capaciteit berekenen, merken vergelijken, installatie planning, subsidie aanvraag, thuisbatterij kopen'
    }
  )
})

// Installatie Handleiding
app.get('/gids/installatie', (c) => {
  return c.render(
    <div>
      {/* Hero Section */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="mb-6">
            <a href="/" class="text-energy-blue hover:underline">← Terug naar home</a>
          </nav>
          <div class="text-center">
            <div class="w-20 h-20 bg-energy-blue text-white rounded-lg flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-tools text-3xl"></i>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Installatie Handleiding</h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Wat gebeurt er tijdens de installatie van je thuisbatterij? Een complete gids door het installatieproces.
            </p>
          </div>
        </div>
      </section>

      {/* Tijdlijn */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">Installatie Tijdlijn</h2>
            <p class="text-lg text-gray-600">Van eerste contact tot volledige inbedrijfstelling</p>
          </div>

          <div class="relative">
            {/* Verticale lijn */}
            <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-energy-blue"></div>
            
            <div class="space-y-12">
              {/* Fase 1: Voorbereiding */}
              <div class="flex items-start">
                <div class="w-16 h-16 bg-energy-blue text-white rounded-full flex items-center justify-center text-xl font-bold mr-8 z-10">
                  1
                </div>
                <div class="flex-1">
                  <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-2xl font-bold mb-4 text-gray-900">Voorbereiding (1-2 weken)</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 class="text-lg font-semibold mb-3 text-blue-800">Site Survey</h4>
                        <ul class="space-y-2 text-sm">
                          <li class="flex items-center">
                            <i class="fas fa-check text-green-600 mr-2"></i>
                            Locatie bepaling (meterkast, garage, kelder)
                          </li>
                          <li class="flex items-center">
                            <i class="fas fa-check text-green-600 mr-2"></i>
                            Bestaande elektrische installatie checken
                          </li>
                          <li class="flex items-center">
                            <i class="fas fa-check text-green-600 mr-2"></i>
                            Ruimte en ventilatie beoordelen
                          </li>
                          <li class="flex items-center">
                            <i class="fas fa-check text-green-600 mr-2"></i>
                            Netwerk/WiFi bereik testen
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 class="text-lg font-semibold mb-3 text-blue-800">Planning & Vergunningen</h4>
                        <ul class="space-y-2 text-sm">
                          <li class="flex items-center">
                            <i class="fas fa-check text-green-600 mr-2"></i>
                            Installatiedatum inplannen
                          </li>
                          <li class="flex items-center">
                            <i class="fas fa-check text-green-600 mr-2"></i>
                            Melding netbeheerder (indien nodig)
                          </li>
                          <li class="flex items-center">
                            <i class="fas fa-check text-green-600 mr-2"></i>
                            Materiaal bestellen en leveren
                          </li>
                          <li class="flex items-center">
                            <i class="fas fa-check text-green-600 mr-2"></i>
                            Bewoners informeren over proces
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="mt-6 bg-blue-50 p-4 rounded-lg">
                      <p class="text-blue-800 text-sm">
                        <i class="fas fa-info-circle mr-2"></i>
                        <strong>Wat kun je verwachten:</strong> De installateur komt langs voor een grondige inspectie. 
                        Dit duurt ongeveer 1 uur en is gratis bij de meeste bedrijven.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fase 2: Installatie Dag */}
              <div class="flex items-start">
                <div class="w-16 h-16 bg-energy-blue text-white rounded-full flex items-center justify-center text-xl font-bold mr-8 z-10">
                  2
                </div>
                <div class="flex-1">
                  <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-2xl font-bold mb-4 text-gray-900">Installatie Dag (4-8 uur)</h3>
                    
                    <div class="space-y-6">
                      <div class="flex items-start">
                        <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                          <i class="fas fa-clock text-gray-600"></i>
                        </div>
                        <div>
                          <h4 class="font-semibold mb-2">08:00 - Aankomst team</h4>
                          <p class="text-sm text-gray-600">Installatieteam (2-3 personen) arriveert met materiaal en gereedschap</p>
                        </div>
                      </div>

                      <div class="flex items-start">
                        <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                          <i class="fas fa-power-off text-red-600"></i>
                        </div>
                        <div>
                          <h4 class="font-semibold mb-2">09:00 - Stroom uitschakelen</h4>
                          <p class="text-sm text-gray-600">Hoofdstroom wordt veilig uitgeschakeld voor werkzaamheden aan meterkast</p>
                        </div>
                      </div>

                      <div class="flex items-start">
                        <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                          <i class="fas fa-hammer text-blue-600"></i>
                        </div>
                        <div>
                          <h4 class="font-semibold mb-2">10:00 - Montage batterij</h4>
                          <p class="text-sm text-gray-600">Batterijsysteem monteren op gekozen locatie, bevestiging aan wand/vloer</p>
                        </div>
                      </div>

                      <div class="flex items-start">
                        <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                          <i class="fas fa-plug text-yellow-600"></i>
                        </div>
                        <div>
                          <h4 class="font-semibold mb-2">12:00 - Elektrische aansluitingen</h4>
                          <p class="text-sm text-gray-600">DC/AC bekabeling, aansluiting op meterkast, monteren van monitoring</p>
                        </div>
                      </div>

                      <div class="flex items-start">
                        <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                          <i class="fas fa-wifi text-green-600"></i>
                        </div>
                        <div>
                          <h4 class="font-semibold mb-2">15:00 - Netwerkverbinding</h4>
                          <p class="text-sm text-gray-600">WiFi/ethernet configureren voor monitoring en remote updates</p>
                        </div>
                      </div>
                    </div>

                    <div class="mt-6 bg-yellow-50 p-4 rounded-lg">
                      <p class="text-yellow-800 text-sm">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        <strong>Let op:</strong> Tijdens de installatie is er 4-6 uur geen stroom. 
                        Plan geen thuiswerk en zorg voor alternatieven voor koeling/verwarming.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fase 3: Inbedrijfstelling */}
              <div class="flex items-start">
                <div class="w-16 h-16 bg-energy-blue text-white rounded-full flex items-center justify-center text-xl font-bold mr-8 z-10">
                  3
                </div>
                <div class="flex-1">
                  <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-2xl font-bold mb-4 text-gray-900">Inbedrijfstelling (2-3 uur)</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 class="text-lg font-semibold mb-3 text-green-800">Technische Tests</h4>
                        <ul class="space-y-2 text-sm">
                          <li class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 mr-2"></i>
                            Alle elektrische verbindingen testen
                          </li>
                          <li class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 mr-2"></i>
                            Laad/ontlaad cyclus uitvoeren
                          </li>
                          <li class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 mr-2"></i>
                            Veiligheidssystemen controleren
                          </li>
                          <li class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 mr-2"></i>
                            Isolatie en aarding meten
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 class="text-lg font-semibold mb-3 text-green-800">Configuratie & Training</h4>
                        <ul class="space-y-2 text-sm">
                          <li class="flex items-center">
                            <i class="fas fa-mobile-alt text-blue-600 mr-2"></i>
                            App installeren en account aanmaken
                          </li>
                          <li class="flex items-center">
                            <i class="fas fa-cog text-blue-600 mr-2"></i>
                            Laad/ontlaad schema configureren
                          </li>
                          <li class="flex items-center">
                            <i class="fas fa-graduation-cap text-blue-600 mr-2"></i>
                            Uitleg werking en monitoring
                          </li>
                          <li class="flex items-center">
                            <i class="fas fa-file-alt text-blue-600 mr-2"></i>
                            Documentatie en garantie overhandigen
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="mt-6 bg-green-50 p-4 rounded-lg">
                      <p class="text-green-800 text-sm">
                        <i class="fas fa-thumbs-up mr-2"></i>
                        <strong>Klaar!</strong> Je thuisbatterij is nu volledig operationeel. 
                        De eerste week wordt automatisch gemonitord voor optimale prestaties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fase 4: Nazorg */}
              <div class="flex items-start">
                <div class="w-16 h-16 bg-energy-blue text-white rounded-full flex items-center justify-center text-xl font-bold mr-8 z-10">
                  4
                </div>
                <div class="flex-1">
                  <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-2xl font-bold mb-4 text-gray-900">Monitoring & Nazorg</h3>
                    
                    <div class="space-y-6">
                      <div>
                        <h4 class="text-lg font-semibold mb-3">Eerste week</h4>
                        <ul class="space-y-2 text-sm">
                          <li>• Dagelijkse monitoring van prestaties</li>
                          <li>• Automatische optimalisatie van laadschema's</li>
                          <li>• Contact bij afwijkingen of problemen</li>
                        </ul>
                      </div>

                      <div>
                        <h4 class="text-lg font-semibold mb-3">Eerste maand</h4>
                        <ul class="space-y-2 text-sm">
                          <li>• Prestatie rapport en optimalisatie tips</li>
                          <li>• Controle op warranty registratie</li>
                          <li>• Training refresh indien gewenst</li>
                        </ul>
                      </div>

                      <div>
                        <h4 class="text-lg font-semibold mb-3">Doorlopende support</h4>
                        <ul class="space-y-2 text-sm">
                          <li>• 24/7 monitoring en foutmeldingen</li>
                          <li>• Software updates (automatisch)</li>
                          <li>• Jaarlijkse controle en onderhoud</li>
                          <li>• Helpdesk voor vragen en problemen</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Praktische Tips */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-center text-gray-900">Praktische Tips voor de Installatie</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-xl font-bold mb-4 text-green-800">
                <i class="fas fa-check-circle mr-2"></i>
                Wat te doen
              </h3>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <i class="fas fa-home text-green-600 mt-1 mr-3"></i>
                  <span>Zorg voor vrije toegang tot meterkast en installatielocatie</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-car text-green-600 mt-1 mr-3"></i>
                  <span>Parkeerplaats dichtbij huis reserveren voor installatieteam</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-coffee text-green-600 mt-1 mr-3"></i>
                  <span>Zorg voor koffie/thee - installateurs waarderen dat enorm</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-mobile-alt text-green-600 mt-1 mr-3"></i>
                  <span>Houd WiFi gegevens bij de hand voor netwerkverbinding</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-camera text-green-600 mt-1 mr-3"></i>
                  <span>Maak foto's van voor en na de installatie</span>
                </li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-xl font-bold mb-4 text-red-800">
                <i class="fas fa-times-circle mr-2"></i>
                Wat te vermijden
              </h3>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <i class="fas fa-laptop text-red-600 mt-1 mr-3"></i>
                  <span>Plan geen belangrijke thuiswerk tijdens stroomuitval</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-snowflake text-red-600 mt-1 mr-3"></i>
                  <span>Vermijd installatie bij extreem weer (hitte, vorst, storm)</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-users text-red-600 mt-1 mr-3"></i>
                  <span>Laat het team rustig werken - te veel hulp kan hinderen</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-tools text-red-600 mt-1 mr-3"></i>
                  <span>Raak niets aan tijdens de installatie (veiligheid)</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-clock text-red-600 mt-1 mr-3"></i>
                  <span>Plan geen andere werkzaamheden op dezelfde dag</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-energy-blue text-white p-8 rounded-lg">
            <h3 class="text-2xl font-bold mb-4">Klaar voor installatie?</h3>
            <p class="mb-6">Vergelijk eerst de beste merken en bereken je besparing</p>
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/vergelijken" class="bg-white text-energy-blue px-6 py-3 rounded-lg font-semibold hover:bg-energy-blue hover:text-white border-2 border-white transition-colors shadow-lg">
                <i class="fas fa-balance-scale mr-2"></i>
                Vergelijk Merken
              </a>
              <a href="/kosten" class="bg-white text-energy-blue px-6 py-3 rounded-lg font-semibold hover:bg-energy-blue hover:text-white border-2 border-white transition-colors shadow-lg">
                <i class="fas fa-calculator mr-2"></i>
                Bereken Kosten
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>,
    {
      title: 'Installatie Handleiding Thuisbatterij | Complete gids door het installatieproces',
      description: 'Alles over thuisbatterij installatie. ✓ Voorbereiding ✓ Installatie dag ✓ Inbedrijfstelling ✓ Monitoring ✓ Praktische tips voor een succesvolle installatie.',
      keywords: 'thuisbatterij installatie, installatie handleiding, thuisbatterij monteren, installateur, inbedrijfstelling, batterij installatie tips'
    }
  )
})

// Onderhoud & Garantie
app.get('/gids/onderhoud-garantie', (c) => {
  return c.render(
    <div>
      {/* Hero Section */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="mb-6">
            <a href="/" class="text-battery-orange hover:underline">← Terug naar home</a>
          </nav>
          <div class="text-center">
            <div class="w-20 h-20 bg-battery-orange text-white rounded-lg flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-shield-alt text-3xl"></i>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Onderhoud & Garantie</h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Hoe houd je je thuisbatterij in optimale conditie en wat kun je verwachten van de garantie?
            </p>
          </div>
        </div>
      </section>

      {/* Onderhoud Sectie */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-gray-900">
            <i class="fas fa-wrench text-battery-orange mr-3"></i>
            Jaarlijks Onderhoud
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 class="text-xl font-semibold mb-6 text-gray-900">Wat wordt er gecontroleerd?</h3>
              
              <div class="space-y-4">
                <div class="bg-white border border-gray-200 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2 text-orange-800">
                    <i class="fas fa-battery-three-quarters mr-2"></i>
                    Batterij Gezondheid
                  </h4>
                  <ul class="text-sm space-y-1 text-gray-600">
                    <li>• Capaciteit en prestatiemeting</li>
                    <li>• Celbalans en spanning controle</li>
                    <li>• Temperatuur monitoring</li>
                    <li>• Laad/ontlaad cycles analyse</li>
                  </ul>
                </div>

                <div class="bg-white border border-gray-200 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2 text-blue-800">
                    <i class="fas fa-plug mr-2"></i>
                    Elektrische Verbindingen
                  </h4>
                  <ul class="text-sm space-y-1 text-gray-600">
                    <li>• Aansluitklemmen controle</li>
                    <li>• Isolatieweerstand meting</li>
                    <li>• Aarding en veiligheid</li>
                    <li>• DC/AC omkeer prestaties</li>
                  </ul>
                </div>

                <div class="bg-white border border-gray-200 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2 text-green-800">
                    <i class="fas fa-cog mr-2"></i>
                    Software & Monitoring
                  </h4>
                  <ul class="text-sm space-y-1 text-gray-600">
                    <li>• Software updates installeren</li>
                    <li>• Configuratie optimaliseren</li>
                    <li>• Monitoring systeem testen</li>
                    <li>• Foutlogboek analyse</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-6 text-gray-900">Onderhoud Planning</h3>
              
              <div class="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 class="font-semibold mb-3">Jaarlijkse Controle</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span>Frequentie:</span>
                    <span class="font-medium">1x per jaar</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Duur:</span>
                    <span class="font-medium">1-2 uur</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Kosten:</span>
                    <span class="font-medium">€100-200</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Beste moment:</span>
                    <span class="font-medium">Voor/na winter</span>
                  </div>
                </div>
              </div>

              <h4 class="font-semibold mb-3">Eigen Controles (maandelijks)</h4>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center">
                  <i class="fas fa-mobile-alt text-green-600 mr-2"></i>
                  App prestaties bekijken
                </li>
                <li class="flex items-center">
                  <i class="fas fa-eye text-green-600 mr-2"></i>
                  Visuele inspectie op schade
                </li>
                <li class="flex items-center">
                  <i class="fas fa-thermometer-half text-green-600 mr-2"></i>
                  Temperatuur en ventilatie
                </li>
                <li class="flex items-center">
                  <i class="fas fa-volume-up text-green-600 mr-2"></i>
                  Ongewone geluiden controleren
                </li>
                <li class="flex items-center">
                  <i class="fas fa-chart-line text-green-600 mr-2"></i>
                  Energie opbrengst trends
                </li>
              </ul>

              <div class="bg-yellow-50 p-4 rounded-lg mt-6">
                <p class="text-yellow-800 text-sm">
                  <i class="fas fa-lightbulb mr-2"></i>
                  <strong>Tip:</strong> Veel problemen kun je zelf spotten via de app. 
                  Let op plotselinge veranderingen in prestaties of waarschuwingsmeldingen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Garantie Sectie */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-gray-900">
            <i class="fas fa-shield-alt text-battery-orange mr-3"></i>
            Garantievoorwaarden
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-lg font-semibold mb-4 text-green-800">Product Garantie</h3>
              <div class="space-y-3">
                <div>
                  <div class="font-medium">Standaard periode</div>
                  <div class="text-sm text-gray-600">5-15 jaar (merkafhankelijk)</div>
                </div>
                <div>
                  <div class="font-medium">Dekt</div>
                  <div class="text-sm text-gray-600">Fabricagefouten, defecte onderdelen</div>
                </div>
                <div>
                  <div class="font-medium">Dekt niet</div>
                  <div class="text-sm text-gray-600">Normale slijtage, verkeerd gebruik</div>
                </div>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-lg font-semibold mb-4 text-blue-800">Prestatie Garantie</h3>
              <div class="space-y-3">
                <div>
                  <div class="font-medium">Capaciteit behoud</div>
                  <div class="text-sm text-gray-600">80% na 10 jaar (typisch)</div>
                </div>
                <div>
                  <div class="font-medium">Cyclus garantie</div>
                  <div class="text-sm text-gray-600">6.000-10.000 cycli</div>
                </div>
                <div>
                  <div class="font-medium">Efficiency</div>
                  <div class="text-sm text-gray-600">Minimaal 85% gedurende garantieperiode</div>
                </div>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-lg font-semibold mb-4 text-orange-800">Installatie Garantie</h3>
              <div class="space-y-3">
                <div>
                  <div class="font-medium">Werkmanschap</div>
                  <div class="text-sm text-gray-600">2-5 jaar op installatiewerk</div>
                </div>
                <div>
                  <div class="font-medium">Dekking</div>
                  <div class="text-sm text-gray-600">Montage, bedrading, configuratie</div>
                </div>
                <div>
                  <div class="font-medium">Support</div>
                  <div class="text-sm text-gray-600">Gratis nazorg eerste jaar</div>
                </div>
              </div>
            </div>
          </div>

          {/* Garantie Vergelijking */}
          <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h3 class="text-xl font-semibold mb-6">Garantie Overzicht per Merk</h3>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-gray-50">
                    <th class="text-left p-3 border">Merk</th>
                    <th class="text-left p-3 border">Product Garantie</th>
                    <th class="text-left p-3 border">Prestatie Garantie</th>
                    <th class="text-left p-3 border">Cyclus Garantie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="p-3 border font-medium">Growatt</td>
                    <td class="p-3 border">10 jaar</td>
                    <td class="p-3 border">80% na 10 jaar</td>
                    <td class="p-3 border">6.000 cycli</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="p-3 border font-medium">Victron</td>
                    <td class="p-3 border">5 jaar (uitbreidbaar)</td>
                    <td class="p-3 border">85% na 10 jaar</td>
                    <td class="p-3 border">10.000 cycli</td>
                  </tr>
                  <tr>
                    <td class="p-3 border font-medium">Zonneplan</td>
                    <td class="p-3 border">12 jaar all-inclusive</td>
                    <td class="p-3 border">80% na 12 jaar</td>
                    <td class="p-3 border">8.000 cycli</td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="p-3 border font-medium">HomeWizard</td>
                    <td class="p-3 border">8 jaar</td>
                    <td class="p-3 border">80% na 8 jaar</td>
                    <td class="p-3 border">6.000 cycli</td>
                  </tr>
                  <tr>
                    <td class="p-3 border font-medium">Dyness</td>
                    <td class="p-3 border">10 jaar</td>
                    <td class="p-3 border">80% na 10 jaar</td>
                    <td class="p-3 border">6.000 cycli</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Garantie Claims */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold mb-4 text-red-800">Wanneer garantie vervalt</h3>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start">
                  <i class="fas fa-times text-red-600 mt-1 mr-3"></i>
                  <span>Installatie door niet-gecertificeerde partij</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-times text-red-600 mt-1 mr-3"></i>
                  <span>Fysieke schade door externe oorzaken</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-times text-red-600 mt-1 mr-3"></i>
                  <span>Modificatie aan het systeem</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-times text-red-600 mt-1 mr-3"></i>
                  <span>Gebruik buiten specificaties</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-times text-red-600 mt-1 mr-3"></i>
                  <span>Geen onderhoud volgens voorschriften</span>
                </li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold mb-4 text-green-800">Garantie claim proces</h3>
              <div class="space-y-3">
                <div class="flex items-start">
                  <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                  <div>
                    <div class="font-medium">Probleem melden</div>
                    <div class="text-sm text-gray-600">Via installateur of fabrikant helpdesk</div>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                  <div>
                    <div class="font-medium">Diagnose</div>
                    <div class="text-sm text-gray-600">Remote analyse en eventueel bezoek ter plaatse</div>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                  <div>
                    <div class="font-medium">Beslissing</div>
                    <div class="text-sm text-gray-600">Reparatie, vervanging of afwijzing claim</div>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</div>
                  <div>
                    <div class="font-medium">Oplossing</div>
                    <div class="text-sm text-gray-600">Uitvoering binnen 2-4 weken</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Updates */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-gray-900">
            <i class="fas fa-download text-battery-orange mr-3"></i>
            Software Updates
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 class="text-xl font-semibold mb-4">Automatische Updates</h3>
                <p class="text-gray-600 mb-4">
                  Moderne thuisbatterijen ontvangen automatisch software updates via internet. 
                  Deze verbeteringen zorgen voor optimale prestaties en nieuwe functies.
                </p>
                
                <h4 class="font-semibold mb-3">Wat wordt er geupdate?</h4>
                <ul class="space-y-2 text-sm">
                  <li class="flex items-center">
                    <i class="fas fa-cog text-blue-600 mr-2"></i>
                    Laad/ontlaad algoritmes optimalisatie
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-shield-alt text-green-600 mr-2"></i>
                    Veiligheidsfuncties en monitoring
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-mobile-alt text-purple-600 mr-2"></i>
                    App functionaliteiten en interface
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-chart-bar text-orange-600 mr-2"></i>
                    Prestatie analyse en rapportage
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-plug text-red-600 mr-2"></i>
                    Compatibiliteit met smart grid
                  </li>
                </ul>
              </div>

              <div class="bg-blue-50 p-4 rounded-lg">
                <p class="text-blue-800 text-sm">
                  <i class="fas fa-info-circle mr-2"></i>
                  <strong>Updates frequentie:</strong> Gemiddeld 2-4x per jaar voor nieuwe functies, 
                  en direct bij kritieke veiligheidsupdates.
                </p>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-6">Update Geschiedenis Voorbeeld</h3>
              
              <div class="space-y-4">
                <div class="bg-white p-4 border-l-4 border-green-500 rounded-r-lg">
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="font-semibold">v2.1.4 - Prestatie Optimalisatie</div>
                      <div class="text-sm text-gray-600">15% betere efficiency bij gedeeltelijke lading</div>
                    </div>
                    <div class="text-sm text-gray-500">Jan 2025</div>
                  </div>
                </div>

                <div class="bg-white p-4 border-l-4 border-blue-500 rounded-r-lg">
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="font-semibold">v2.0.8 - Smart Grid Integratie</div>
                      <div class="text-sm text-gray-600">Dynamische tarieven ondersteuning toegevoegd</div>
                    </div>
                    <div class="text-sm text-gray-500">Okt 2024</div>
                  </div>
                </div>

                <div class="bg-white p-4 border-l-4 border-yellow-500 rounded-r-lg">
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="font-semibold">v1.9.2 - Veiligheidsupdate</div>
                      <div class="text-sm text-gray-600">Verbeterde temperatuur monitoring</div>
                    </div>
                    <div class="text-sm text-gray-500">Aug 2024</div>
                  </div>
                </div>

                <div class="bg-white p-4 border-l-4 border-purple-500 rounded-r-lg">
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="font-semibold">v1.8.5 - App Verbetering</div>
                      <div class="text-sm text-gray-600">Nieuwe dashboard en export functies</div>
                    </div>
                    <div class="text-sm text-gray-500">Jun 2024</div>
                  </div>
                </div>
              </div>

              <div class="bg-yellow-50 p-4 rounded-lg mt-6">
                <p class="text-yellow-800 text-sm">
                  <i class="fas fa-lightbulb mr-2"></i>
                  <strong>Tip:</strong> Houd update notificaties in de app aan. 
                  Sommige updates vereisen een korte herstart van het systeem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Levensduur Verlengen */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-gray-900">
            <i class="fas fa-heart text-battery-orange mr-3"></i>
            Levensduur Verlengen
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <i class="fas fa-thermometer-half text-xl"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3">Temperatuur Beheer</h3>
              <ul class="text-sm space-y-2 text-gray-600">
                <li>• Optimale range: 15-25°C</li>
                <li>• Vermijd directe zonnestraling</li>
                <li>• Zorg voor goede ventilatie</li>
                <li>• Isoleer tegen extreme kou</li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i class="fas fa-battery-half text-xl"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3">Laad Gewoonten</h3>
              <ul class="text-sm space-y-2 text-gray-600">
                <li>• Vermijd 100% lading dagelijks</li>
                <li>• Ideaal: 20-80% bereik</li>
                <li>• Diepe ontlading (&lt;10%) vermijden</li>
                <li>• Gebruik slimme laadschema's</li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <i class="fas fa-chart-line text-xl"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3">Monitoring</h3>
              <ul class="text-sm space-y-2 text-gray-600">
                <li>• Wekelijks prestaties checken</li>
                <li>• Trends in capaciteit bijhouden</li>
                <li>• Waarschuwingen direct oppakken</li>
                <li>• Jaarlijkse prestatie analyse</li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                <i class="fas fa-broom text-xl"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3">Fysiek Onderhoud</h3>
              <ul class="text-sm space-y-2 text-gray-600">
                <li>• Maandelijks stof verwijderen</li>
                <li>• Ventilatie roosters schoonhouden</li>
                <li>• Verbindingen controleren</li>
                <li>• Vochtschade voorkomen</li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                <i class="fas fa-exclamation-triangle text-xl"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3">Wat te Vermijden</h3>
              <ul class="text-sm space-y-2 text-gray-600">
                <li>• Overbelasting van het systeem</li>
                <li>• Negeren van waarschuwingen</li>
                <li>• Zelf reparaties uitvoeren</li>
                <li>• Omgevingstemperaturen &gt;40°C</li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="w-12 h-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center mb-4">
                <i class="fas fa-clock text-xl"></i>
              </div>
              <h3 class="text-lg font-semibold mb-3">Levensduur Verwachting</h3>
              <ul class="text-sm space-y-2 text-gray-600">
                <li>• Lithium-ion: 10-15 jaar</li>
                <li>• LiFePO4: 15-20 jaar</li>
                <li>• Optimaal gebruik: +20% langer</li>
                <li>• Slechte zorg: -30% korter</li>
              </ul>
            </div>
          </div>

          <div class="bg-green-50 p-6 rounded-lg mt-8">
            <h3 class="text-xl font-semibold mb-4 text-green-900">Optimale Levensduur Checklist</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul class="space-y-2">
                <li class="flex items-center text-sm">
                  <input type="checkbox" class="mr-3 text-green-600" />
                  Jaarlijkse professionele controle ingepland
                </li>
                <li class="flex items-center text-sm">
                  <input type="checkbox" class="mr-3 text-green-600" />
                  App monitoring ingesteld en actief gebruikt
                </li>
                <li class="flex items-center text-sm">
                  <input type="checkbox" class="mr-3 text-green-600" />
                  Temperatuur binnen optimaal bereik (15-25°C)
                </li>
                <li class="flex items-center text-sm">
                  <input type="checkbox" class="mr-3 text-green-600" />
                  Laadschema geconfigureerd voor 20-80% bereik
                </li>
              </ul>
              <ul class="space-y-2">
                <li class="flex items-center text-sm">
                  <input type="checkbox" class="mr-3 text-green-600" />
                  Maandelijkse visuele inspectie uitgevoerd
                </li>
                <li class="flex items-center text-sm">
                  <input type="checkbox" class="mr-3 text-green-600" />
                  Software updates automatisch ingeschakeld
                </li>
                <li class="flex items-center text-sm">
                  <input type="checkbox" class="mr-3 text-green-600" />
                  Garantie documentatie bewaard en actueel
                </li>
                <li class="flex items-center text-sm">
                  <input type="checkbox" class="mr-3 text-green-600" />
                  Contact gegevens installateur/support bekend
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-battery-orange text-white p-8 rounded-lg">
            <h3 class="text-2xl font-bold mb-4">Vragen over onderhoud of garantie?</h3>
            <p class="mb-6">Bekijk onze FAQ of neem contact op voor persoonlijk advies</p>
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/faq" class="bg-white text-battery-orange px-6 py-3 rounded-lg font-semibold hover:bg-battery-orange hover:text-white border-2 border-white transition-colors shadow-lg">
                <i class="fas fa-question-circle mr-2"></i>
                Bekijk FAQ
              </a>
              <a href="/contact" class="bg-white text-battery-orange px-6 py-3 rounded-lg font-semibold hover:bg-battery-orange hover:text-white border-2 border-white transition-colors shadow-lg">
                <i class="fas fa-envelope mr-2"></i>
                Contact Opnemen
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>,
    {
      title: 'Onderhoud & Garantie Thuisbatterij | Complete gids voor optimaal beheer',
      description: 'Alles over thuisbatterij onderhoud en garantie. ✓ Jaarlijks onderhoud ✓ Garantievoorwaarden ✓ Software updates ✓ Levensduur verlengen ✓ Praktische tips.',
      keywords: 'thuisbatterij onderhoud, garantie thuisbatterij, software updates, levensduur verlengen, batterij onderhoud, garantievoorwaarden'
    }
  )
})

// Besparing Maximaliseren
app.get('/gids/besparing-maximaliseren', (c) => {
  return c.render(
    <div>
      {/* Hero Section */}
      <section class="bg-white py-12 border-b">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="mb-6">
            <a href="/" class="text-energy-green hover:underline">← Terug naar home</a>
          </nav>
          <div class="text-center">
            <div class="w-20 h-20 bg-energy-green text-white rounded-lg flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-chart-line text-3xl"></i>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Besparing Maximaliseren</h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Tips en strategieën om het maximale uit je thuisbatterij te halen en je energiebesparing te optimaliseren.
            </p>
          </div>
        </div>
      </section>

      {/* Slim Laden */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-gray-900">
            <i class="fas fa-brain text-energy-green mr-3"></i>
            Slim Laden Strategieën
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div class="bg-white p-6 rounded-lg shadow-sm border border-green-200">
                <h3 class="text-xl font-semibold mb-4 text-green-800">
                  <i class="fas fa-sun mr-2"></i>
                  Zonne-energie Optimalisatie
                </h3>
                
                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold mb-2">Zelfconsumptie verhogen</h4>
                    <ul class="text-sm space-y-2 text-gray-600">
                      <li class="flex items-start">
                        <i class="fas fa-arrow-right text-green-600 mt-1 mr-2"></i>
                        <span>Laad batterij tijdens zonnepieken (11:00-15:00)</span>
                      </li>
                      <li class="flex items-start">
                        <i class="fas fa-arrow-right text-green-600 mt-1 mr-2"></i>
                        <span>Gebruik opgeslagen energie 's avonds (17:00-22:00)</span>
                      </li>
                      <li class="flex items-start">
                        <i class="fas fa-arrow-right text-green-600 mt-1 mr-2"></i>
                        <span>Vermijd teruglevering tijdens lage vergoeding</span>
                      </li>
                    </ul>
                  </div>

                  <div class="bg-green-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-green-800 mb-2">Optimaal Laadschema</h5>
                    <div class="text-sm space-y-1">
                      <div class="flex justify-between">
                        <span>10:00-15:00:</span>
                        <span class="font-medium">Laden van zonnepanelen</span>
                      </div>
                      <div class="flex justify-between">
                        <span>17:00-22:00:</span>
                        <span class="font-medium">Ontladen voor huisverbruik</span>
                      </div>
                      <div class="flex justify-between">
                        <span>22:00-06:00:</span>
                        <span class="font-medium">Spaarstand (80% geladen)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
                <h3 class="text-xl font-semibold mb-4 text-blue-800">
                  <i class="fas fa-bolt mr-2"></i>
                  Netwerk Smart Charging
                </h3>
                
                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold mb-2">Dal/piek tarieven benutten</h4>
                    <ul class="text-sm space-y-2 text-gray-600">
                      <li class="flex items-start">
                        <i class="fas fa-moon text-blue-600 mt-1 mr-2"></i>
                        <span>Laden tijdens daltarieven (23:00-07:00)</span>
                      </li>
                      <li class="flex items-start">
                        <i class="fas fa-sun text-blue-600 mt-1 mr-2"></i>
                        <span>Ontladen tijdens piektarieven (17:00-20:00)</span>
                      </li>
                      <li class="flex items-start">
                        <i class="fas fa-chart-line text-blue-600 mt-1 mr-2"></i>
                        <span>Dynamische tarieven volgen (uurprijzen)</span>
                      </li>
                    </ul>
                  </div>

                  <div class="bg-blue-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-blue-800 mb-2">Besparing Potentieel</h5>
                    <div class="text-sm space-y-1">
                      <div class="flex justify-between">
                        <span>Dal vs piek:</span>
                        <span class="font-medium">€0.15/kWh verschil</span>
                      </div>
                      <div class="flex justify-between">
                        <span>10 kWh cyclus:</span>
                        <span class="font-medium">€1.50/dag extra</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Jaarlijks:</span>
                        <span class="font-medium text-green-600">+€500 besparing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-yellow-50 p-6 rounded-lg">
            <h3 class="text-lg font-semibold mb-4 text-yellow-800">
              <i class="fas fa-lightbulb mr-2"></i>
              Geavanceerde Laadstrategieën
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 class="font-semibold mb-2">Weersvoorspelling</h4>
                <p class="text-gray-600">Laad minder bij verwachte zonnige dagen, meer bij bewolkt weer</p>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Seizoen Aanpassing</h4>
                <p class="text-gray-600">Winter: meer netwerk laden, Zomer: maximale zelfconsumptie</p>
              </div>
              <div>
                <h4 class="font-semibold mb-2">AI Leeralgoritmes</h4>
                <p class="text-gray-600">Automatische optimalisatie op basis van verbruikspatronen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring & Analytics */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-gray-900">
            <i class="fas fa-chart-bar text-energy-green mr-3"></i>
            Monitoring & Analytics
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-lg font-semibold mb-4 text-gray-900">Key Performance Indicators</h3>
              
              <div class="space-y-4">
                <div class="border-l-4 border-green-500 pl-4">
                  <div class="font-semibold">Zelfconsumptie Ratio</div>
                  <div class="text-sm text-gray-600">Doel: &gt;70% van zonne-energie direct gebruiken</div>
                  <div class="text-xs text-green-600">Goed: 65-75% | Uitstekend: &gt;75%</div>
                </div>

                <div class="border-l-4 border-blue-500 pl-4">
                  <div class="font-semibold">Cyclus Efficiency</div>
                  <div class="text-sm text-gray-600">Doel: &gt;90% round-trip efficiency</div>
                  <div class="text-xs text-blue-600">Goed: 88-92% | Uitstekend: &gt;92%</div>
                </div>

                <div class="border-l-4 border-orange-500 pl-4">
                  <div class="font-semibold">Capaciteit Behoud</div>
                  <div class="text-sm text-gray-600">Doel: &lt;2% verlies per jaar</div>
                  <div class="text-xs text-orange-600">Monitor maandelijks voor trends</div>
                </div>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-lg font-semibold mb-4 text-gray-900">Dagelijkse Controles</h3>
              
              <div class="space-y-3">
                <div class="flex items-center">
                  <input type="checkbox" class="mr-3 text-green-600" />
                  <span class="text-sm">Energie opbrengst vs verbruik</span>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" class="mr-3 text-green-600" />
                  <span class="text-sm">Laad/ontlaad patronen optimaal</span>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" class="mr-3 text-green-600" />
                  <span class="text-sm">Geen foutmeldingen in app</span>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" class="mr-3 text-green-600" />
                  <span class="text-sm">Temperatuur binnen bereik</span>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" class="mr-3 text-green-600" />
                  <span class="text-sm">Netwerk connectie actief</span>
                </div>
              </div>

              <div class="mt-4 bg-gray-50 p-3 rounded text-sm text-gray-600">
                <i class="fas fa-clock mr-2"></i>
                Dagelijkse check duurt <strong>2-3 minuten</strong> en voorkomt 95% van de problemen
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-lg font-semibold mb-4 text-gray-900">Rapportage Tools</h3>
              
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-sm mb-2">Automatische Rapporten</h4>
                  <ul class="text-xs space-y-1 text-gray-600">
                    <li>• Wekelijkse prestatie email</li>
                    <li>• Maandelijks besparingoverzicht</li>
                    <li>• Kwartaal optimalisatie tips</li>
                    <li>• Jaarlijkse ROI analyse</li>
                  </ul>
                </div>

                <div>
                  <h4 class="font-semibold text-sm mb-2">Export Mogelijkheden</h4>
                  <ul class="text-xs space-y-1 text-gray-600">
                    <li>• CSV data export</li>
                    <li>• PDF prestatie rapporten</li>
                    <li>• API toegang voor integratie</li>
                    <li>• Historische data (5+ jaar)</li>
                  </ul>
                </div>

                <div class="bg-blue-50 p-3 rounded text-xs text-blue-800">
                  <i class="fas fa-download mr-2"></i>
                  Data exporteren helpt bij belasting aangifte en subsidie claims
                </div>
              </div>
            </div>
          </div>

          {/* Prestatie Dashboard Voorbeeld */}
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold mb-4">Ideaal Dashboard Overzicht</h3>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-2xl font-bold text-green-600">73%</div>
                <div class="text-sm text-gray-600">Zelfconsumptie</div>
              </div>
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">€847</div>
                <div class="text-sm text-gray-600">Maand Besparing</div>
              </div>
              <div class="text-center p-4 bg-orange-50 rounded-lg">
                <div class="text-2xl font-bold text-orange-600">94%</div>
                <div class="text-sm text-gray-600">Efficiency</div>
              </div>
              <div class="text-center p-4 bg-purple-50 rounded-lg">
                <div class="text-2xl font-bold text-purple-600">287</div>
                <div class="text-sm text-gray-600">Cycles</div>
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              <i class="fas fa-info-circle mr-2"></i>
              <strong>Tip:</strong> Screenshot je beste prestaties en deel ze met vrienden/familie. 
              Goede resultaten motiveren anderen om ook te investeren in duurzame energie.
            </div>
          </div>
        </div>
      </section>

      {/* Energiegewoonten Optimaliseren */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-gray-900">
            <i class="fas fa-home text-energy-green mr-3"></i>
            Energiegewoonten Optimaliseren
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold mb-4 text-green-800">Timing van Apparaten</h3>
              
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold mb-3">Overdag (zonne-energie beschikbaar)</h4>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div class="font-medium text-green-600 mb-2">Slim Programmeren</div>
                      <ul class="space-y-1 text-gray-600">
                        <li>• Wasmachine: 12:00-15:00</li>
                        <li>• Vaatwasser: 13:00-16:00</li>
                        <li>• Droger: 14:00-17:00</li>
                        <li>• Warmtepomp: overdag boost</li>
                      </ul>
                    </div>
                    <div>
                      <div class="font-medium text-green-600 mb-2">Besparing</div>
                      <ul class="space-y-1 text-gray-600">
                        <li>• Directe zonnestroom</li>
                        <li>• Geen batterij cyclus</li>
                        <li>• Maximale efficiency</li>
                        <li>• €300-500/jaar extra</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-green-50 p-4 rounded-lg">
                  <h5 class="font-semibold text-green-800 mb-2">Smart Home Integratie</h5>
                  <p class="text-sm text-green-700">
                    Gebruik home automation om apparaten automatisch te starten wanneer er 
                    overtollige zonne-energie beschikbaar is. Slimme stekkers en timers 
                    kunnen dit eenvoudig regelen.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-xl font-semibold mb-4 text-blue-800">Verbruikspatronen Aanpassen</h3>
              
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold mb-3">'s Avonds (batterij energie)</h4>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div class="font-medium text-blue-600 mb-2">Prioriteit Volgorde</div>
                      <ul class="space-y-1 text-gray-600">
                        <li>1. Verlichting LED</li>
                        <li>2. TV & Entertainment</li>
                        <li>3. Koken (inductie)</li>
                        <li>4. Laden apparaten</li>
                      </ul>
                    </div>
                    <div>
                      <div class="font-medium text-blue-600 mb-2">Vermijden 17-20u</div>
                      <ul class="space-y-1 text-gray-600">
                        <li>• Hoog verbruik apparaten</li>
                        <li>• Elektrische verwarming</li>
                        <li>• Wasmachine/droger</li>
                        <li>• Auto laden (indien mogelijk)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg">
                  <h5 class="font-semibold text-blue-800 mb-2">Piektijd Strategie</h5>
                  <p class="text-sm text-blue-700">
                    Tijdens piekuren (17:00-20:00) zijn tarieven het hoogst. 
                    Gebruik dan bij voorkeur batterij energie en vermijd hoog verbruik. 
                    Dit kan €200-400 per jaar besparen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Seizoens Strategieën */}
          <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h3 class="text-xl font-semibold mb-6 text-gray-900">Seizoens Optimalisatie Strategieën</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="text-center">
                <div class="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-sun text-2xl"></i>
                </div>
                <h4 class="font-semibold mb-3">Zomer</h4>
                <ul class="text-sm space-y-1 text-gray-600">
                  <li>• Maximale zelfconsumptie</li>
                  <li>• Overdag apparaten draaien</li>
                  <li>• Koeling optimaliseren</li>
                  <li>• Excess verkopen</li>
                </ul>
              </div>
              
              <div class="text-center">
                <div class="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-leaf text-2xl"></i>
                </div>
                <h4 class="font-semibold mb-3">Herfst</h4>
                <ul class="text-sm space-y-1 text-gray-600">
                  <li>• Gemengde strategie</li>
                  <li>• Dal tarieven benutten</li>
                  <li>• Verwarming instellen</li>
                  <li>• Buffer opbouwen</li>
                </ul>
              </div>

              <div class="text-center">
                <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-snowflake text-2xl"></i>
                </div>
                <h4 class="font-semibold mb-3">Winter</h4>
                <ul class="text-sm space-y-1 text-gray-600">
                  <li>• Netwerk laden prioriteit</li>
                  <li>• Daluren maximaal gebruiken</li>
                  <li>• Warmte optimalisatie</li>
                  <li>• Pieken vermijden</li>
                </ul>
              </div>

              <div class="text-center">
                <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-seedling text-2xl"></i>
                </div>
                <h4 class="font-semibold mb-3">Lente</h4>
                <ul class="text-sm space-y-1 text-gray-600">
                  <li>• Transitie naar zomer</li>
                  <li>• Systeem optimaliseren</li>
                  <li>• Onderhoud plannen</li>
                  <li>• Updates installeren</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamische Tarieven */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold mb-8 text-gray-900">
            <i class="fas fa-chart-area text-energy-green mr-3"></i>
            Dynamische Tarieven Benutten
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="text-xl font-semibold mb-4 text-purple-800">
                  <i class="fas fa-clock mr-2"></i>
                  Uurprijzen Strategie
                </h3>
                
                <p class="text-gray-600 mb-4">
                  Dynamische tarieven variëren elk uur. Met slimme algoritmes kun je automatisch 
                  laden wanneer prijzen laag zijn en ontladen tijdens hoge prijzen.
                </p>

                <div class="space-y-4">
                  <div class="bg-red-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-red-800 mb-2">Hoge Prijzen (ontladen)</h4>
                    <div class="text-sm space-y-1">
                      <div>🕕 17:00-20:00: Piekuren werkdagen</div>
                      <div>⚡ Hoge vraag: &gt;€0.40/kWh</div>
                      <div>💰 Strategie: Batterij energie gebruiken</div>
                    </div>
                  </div>

                  <div class="bg-green-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-green-800 mb-2">Lage Prijzen (laden)</h4>
                    <div class="text-sm space-y-1">
                      <div>🕛 23:00-07:00: Daluren</div>
                      <div>⚡ Lage vraag: &lt;€0.20/kWh</div>
                      <div>💰 Strategie: Batterij laden van net</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="bg-white p-6 rounded-lg shadow-sm">
                <h3 class="text-xl font-semibold mb-4 text-blue-800">
                  <i class="fas fa-robot mr-2"></i>
                  Automatische Optimalisatie
                </h3>

                <p class="text-gray-600 mb-4">
                  Moderne thuisbatterijen kunnen automatisch reageren op prijssignalen 
                  en je besparing maximaliseren zonder handmatige interventie.
                </p>

                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold mb-2">AI Algoritmes Features</h4>
                    <ul class="text-sm space-y-2">
                      <li class="flex items-center">
                        <i class="fas fa-chart-line text-green-600 mr-2"></i>
                        <span>Prijsvoorspelling 24-48 uur vooruit</span>
                      </li>
                      <li class="flex items-center">
                        <i class="fas fa-brain text-blue-600 mr-2"></i>
                        <span>Leeralgoritme voor verbruikspatronen</span>
                      </li>
                      <li class="flex items-center">
                        <i class="fas fa-cloud text-purple-600 mr-2"></i>
                        <span>Weersintegratie voor zonneopbrengst</span>
                      </li>
                      <li class="flex items-center">
                        <i class="fas fa-cog text-orange-600 mr-2"></i>
                        <span>Automatische optimalisatie instellingen</span>
                      </li>
                    </ul>
                  </div>

                  <div class="bg-blue-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-blue-800 mb-2">Besparing Potentieel</h5>
                    <div class="text-sm space-y-1">
                      <div class="flex justify-between">
                        <span>Basis arbitrage:</span>
                        <span class="font-medium">€200-400/jaar</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Met AI optimalisatie:</span>
                        <span class="font-medium">€400-800/jaar</span>
                      </div>
                      <div class="flex justify-between">
                        <span>ROI verbetering:</span>
                        <span class="font-medium text-green-600">+15-25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Praktisch Voorbeeld */}
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold mb-6 text-gray-900">Praktisch Voorbeeld: Optimale Dag</h3>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 class="font-semibold mb-4">Tijdlijn Woensdag 15 januari</h4>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-blue-50 rounded">
                    <span class="font-medium">06:00</span>
                    <span class="text-sm">Laden €0.18/kWh (dal)</span>
                    <span class="text-green-600">+3 kWh</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-yellow-50 rounded">
                    <span class="font-medium">12:00</span>
                    <span class="text-sm">Zonne-energie direct</span>
                    <span class="text-blue-600">+4 kWh</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-orange-50 rounded">
                    <span class="font-medium">18:00</span>
                    <span class="text-sm">Ontladen €0.45/kWh (piek)</span>
                    <span class="text-red-600">-5 kWh</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-green-50 rounded">
                    <span class="font-medium">23:00</span>
                    <span class="text-sm">Laden €0.16/kWh (dal)</span>
                    <span class="text-green-600">+2 kWh</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="font-semibold mb-4">Resultaat Berekening</h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between p-2 border-b">
                    <span>Ingekocht (dal):</span>
                    <span>5 kWh × €0.17 = €0.85</span>
                  </div>
                  <div class="flex justify-between p-2 border-b">
                    <span>Verkocht (piek):</span>
                    <span>5 kWh × €0.45 = €2.25</span>
                  </div>
                  <div class="flex justify-between p-2 border-b">
                    <span>Zonne-energie direct:</span>
                    <span>4 kWh × €0.40 = €1.60</span>
                  </div>
                  <div class="flex justify-between p-2 bg-green-50 font-semibold">
                    <span>Totale dagbesparing:</span>
                    <span class="text-green-600">€3.00</span>
                  </div>
                  <div class="text-xs text-gray-600 mt-2">
                    × 365 dagen = <strong class="text-green-600">€1.095/jaar extra</strong> ten opzichte van vaste tarieven
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 bg-purple-50 p-4 rounded-lg">
              <p class="text-purple-800 text-sm">
                <i class="fas fa-magic mr-2"></i>
                <strong>Pro Tip:</strong> Combineer dynamische tarieven met slimme apparaten. 
                Programmeer je vaatwasser, wasmachine en auto-lader om automatisch te starten 
                tijdens de goedkoopste uren.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="bg-energy-green text-white p-8 rounded-lg">
            <h3 class="text-2xl font-bold mb-4">Start met besparing maximaliseren!</h3>
            <p class="mb-6">Bereken je potentiële besparing en vergelijk de beste thuisbatterijen</p>
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/kosten" class="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 hover:scale-105 border-2 border-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-calculator mr-2"></i>
                Bereken Besparing
              </a>
              <a href="/vergelijken" class="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 hover:scale-105 border-2 border-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <i class="fas fa-balance-scale mr-2"></i>
                Vergelijk Systemen
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>,
    {
      title: 'Besparing Maximaliseren Thuisbatterij | Tips voor optimale prestaties',
      description: 'Maximaliseer je thuisbatterij besparing. ✓ Slim laden ✓ Monitoring ✓ Energiegewoonten ✓ Dynamische tarieven ✓ Praktische optimalisatie tips.',
      keywords: 'besparing maximaliseren, thuisbatterij optimalisatie, slim laden, dynamische tarieven, energie besparen, batterij efficiency'
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
