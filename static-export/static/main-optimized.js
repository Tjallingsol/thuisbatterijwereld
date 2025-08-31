// Optimized main.js - Critical functionality only
(function() {
    'use strict';
    
    // Mobile menu toggle - High priority
    function initMobileMenu() {
        const button = document.getElementById('mobile-menu-button');
        const menu = document.getElementById('mobile-menu');
        
        if (!button || !menu) return;
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            menu.classList.toggle('hidden');
        }, { passive: false });
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!button.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.add('hidden');
            }
        });
    }
    
    // Cookie consent - Deferred
    function initCookieConsent() {
        const consent = localStorage.getItem('cookie-consent');
        const banner = document.getElementById('cookie-banner');
        
        if (consent || !banner) return;
        
        // Show after delay
        setTimeout(() => banner.classList.remove('translate-y-full'), 2000);
        
        const accept = document.getElementById('accept-cookies');
        const reject = document.getElementById('reject-cookies');
        
        if (accept) {
            accept.addEventListener('click', function() {
                localStorage.setItem('cookie-consent', 'accepted');
                banner.classList.add('translate-y-full');
                
                if (typeof gtag !== 'undefined') {
                    gtag('consent', 'update', { 'analytics_storage': 'granted' });
                }
            });
        }
        
        if (reject) {
            reject.addEventListener('click', function() {
                localStorage.setItem('cookie-consent', 'rejected');
                banner.classList.add('translate-y-full');
            });
        }
    }
    
    // Contact form - Only load if form exists
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        const messageDiv = document.getElementById('form-message');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
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
            
            const emailBody = `Naam: ${data.firstName} ${data.lastName}\nE-mail: ${data.email}\nTelefoon: ${data.phone}\nOnderwerp: ${data.subject}\nNewsletter: ${data.newsletter}\nTijdstip: ${data.timestamp}\n\nBericht:\n${data.message}`;
            const mailtoLink = `mailto:tjallingsol@gmail.com?subject=Contact thuisbatterijwereld.nl - ${data.subject}&body=${encodeURIComponent(emailBody)}`;
            
            window.location.href = mailtoLink;
            
            if (messageDiv) {
                messageDiv.className = 'mt-4 p-4 bg-green-50 border border-green-200 rounded-lg';
                messageDiv.innerHTML = '<div class="flex items-center"><i class="fas fa-check-circle text-green-600 mr-2"></i><span class="text-green-800">Je e-mailclient wordt geopend. Verstuur de e-mail om je bericht te verzenden.</span></div>';
            }
            
            form.reset();
        });
    }
    
    // Smooth scrolling - Low priority
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    
    // Initialize - Prioritized order
    function init() {
        // Critical - Execute immediately
        initMobileMenu();
        
        // Deferred - Execute after page is interactive
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(initContactForm, 50);
                setTimeout(initCookieConsent, 100);
                setTimeout(initSmoothScroll, 150);
            });
        } else {
            // Page already loaded
            setTimeout(initContactForm, 50);
            setTimeout(initCookieConsent, 100);  
            setTimeout(initSmoothScroll, 150);
        }
    }
    
    // Start initialization
    init();
})();