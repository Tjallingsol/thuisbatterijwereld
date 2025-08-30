// Main JavaScript voor alle pagina's
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
    
    // Cookie Consent Management
    function checkCookieConsent() {
        const consent = localStorage.getItem('cookie-consent');
        const banner = document.getElementById('cookie-banner');
        
        if (!consent && banner) {
            // Show banner after 1 second delay
            setTimeout(() => {
                banner.classList.remove('translate-y-full');
            }, 1000);
        }
    }

    // Handle cookie consent
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');
    
    if (acceptButton) {
        acceptButton.addEventListener('click', function() {
            localStorage.setItem('cookie-consent', 'accepted');
            document.getElementById('cookie-banner').classList.add('translate-y-full');
            
            // Enable Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        });
    }

    if (rejectButton) {
        rejectButton.addEventListener('click', function() {
            localStorage.setItem('cookie-consent', 'rejected');
            document.getElementById('cookie-banner').classList.add('translate-y-full');
            
            // Disable Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }
        });
    }

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

    // Initialize cookie consent check
    checkCookieConsent();
    
    // Contact form handling (als het bestaat)
    const contactForm = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');
    
    if (contactForm && messageDiv) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
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
            const emailBody = 'Naam: ' + data.firstName + ' ' + data.lastName + '\n' +
                             'E-mail: ' + data.email + '\n' +
                             'Telefoon: ' + data.phone + '\n' +
                             'Onderwerp: ' + data.subject + '\n' +
                             'Newsletter: ' + data.newsletter + '\n' +
                             'Tijdstip: ' + data.timestamp + '\n\n' +
                             'Bericht:\n' + data.message;

            const mailtoLink = 'mailto:tjallingsol@gmail.com?subject=Contact thuisbatterijwereld.nl - ' + data.subject + '&body=' + encodeURIComponent(emailBody);
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            messageDiv.className = 'mt-4 p-4 bg-green-50 border border-green-200 rounded-lg';
            messageDiv.innerHTML = '<div class="flex items-center">' +
                                   '<i class="fas fa-check-circle text-green-600 mr-2"></i>' +
                                   '<span class="text-green-800">Je e-mailclient wordt geopend. Verstuur de e-mail om je bericht te verzenden.</span>' +
                                   '</div>';
            messageDiv.classList.remove('hidden');
            
            // Reset form
            contactForm.reset();
        });
    }
});