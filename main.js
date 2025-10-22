emailjs.init("wNgJScqm55RlA4RqG");
// ===================================
// Language Switcher
// ===================================
let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    updateLanguage();
}

function updateLanguage() {
    const html = document.documentElement;
    const langBtn = document.getElementById('langText');
    
    // Update HTML attributes
    html.lang = currentLang;
    html.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update language button text
    langBtn.textContent = currentLang === 'en' ? 'العربية' : 'English';
    
    // Update all elements with data-en and data-ar attributes
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLang}`);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
            // For buttons and links, preserve child elements like icons
            const icon = element.querySelector('i');
            if (icon) {
                element.innerHTML = '';
                element.appendChild(icon);
                element.appendChild(document.createTextNode(' ' + text));
            } else {
                element.textContent = text;
            }
        } else {
            element.textContent = text;
        }
    });
    
    // Store preference
    localStorage.setItem('preferred-language', currentLang);
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage();
    }
}

// ===================================
// Mobile Menu Toggle
// ===================================
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = currentLang === 'en' ? 'Sending...' : 'جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual backend integration)
    // ✅ إرسال البيانات عبر EmailJS
emailjs.send("service_5fe1erg", "template_r5wbs2w", formData)
  .then(() => {
      formMessage.className = 'form-message success';
      formMessage.textContent = currentLang === 'en' 
          ? 'Thank you for your message! I will get back to you soon.' 
          : 'شكراً لرسالتك! سأتواصل معك قريباً.';
      contactForm.reset();
  }, (error) => {
      formMessage.className = 'form-message error';
      formMessage.textContent = currentLang === 'en' 
          ? 'An error occurred while sending. Please try again.' 
          : 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.';
      console.error('EmailJS Error:', error);
  })
  .finally(() => {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
  });

});

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe stat items
document.querySelectorAll('.stat-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// ===================================
// Initialize on Page Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    loadLanguagePreference();
    
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    setTimeout(() => {
        heroContent.style.opacity = '1';
    }, 100);
});

// ===================================
// Prevent form resubmission on refresh
// ===================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
