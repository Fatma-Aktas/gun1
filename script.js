// ==========================================
// DESINOVAL - Interactive JavaScript
// ==========================================

// ========== DOM Elements ==========
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const portfolioFilters = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const statNumbers = document.querySelectorAll('.stat-number');

// ========== Navbar Scroll Effect ==========
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class when page is scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    if (currentScroll > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    lastScroll = currentScroll;
});

// ========== Mobile Menu Toggle ==========
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ========== Active Navigation Link ==========
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    navObserver.observe(section);
});

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for just '#'
        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Navbar height offset

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Scroll to Top Button ==========
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== Counter Animation ==========
let counterAnimated = false;

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            statNumbers.forEach(stat => animateCounter(stat));
            counterAnimated = true;
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    counterObserver.observe(heroStats);
}

// ========== Portfolio Filter ==========
portfolioFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        portfolioFilters.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked filter
        filter.classList.add('active');

        const filterValue = filter.getAttribute('data-filter');

        // Filter portfolio items
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filterValue === 'all' || category.includes(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========== Portfolio Modal (Future Enhancement) ==========
const portfolioButtons = document.querySelectorAll('.portfolio-btn');

portfolioButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.getAttribute('data-project');

        // For now, just show an alert
        // In production, this would open a modal with project details
        alert(`Proje Detayları (ID: ${projectId})\n\nBu özellik yakında eklenecektir. Detaylı bilgi için lütfen iletişime geçin.`);
    });
});

// ========== Scroll Animations ==========
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
};

const scrollObserver = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Elements to animate on scroll
const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .spec-card');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

// ========== Contact Form Handling ==========
// Using FormSubmit.co - Free form backend service
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message')
    };

    // Validate
    if (!data.name || !data.email || !data.message) {
        showMessage('Lütfen tüm gerekli alanları doldurun.', 'error');
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    formMessage.style.display = 'none';

    try {
        // Using FormSubmit.co service
        // Replace 'YOUR_EMAIL' with actual email in production
        const response = await fetch('https://formsubmit.co/ajax/fatma@desinoval.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                phone: data.phone,
                service: data.service,
                message: data.message,
                _subject: 'Fatma Aktaş Portfolio - Yeni İletişim Formu Mesajı',
                _template: 'table'
            })
        });

        if (response.ok) {
            showMessage('✓ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Form gönderimi başarısız oldu.');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showMessage('✗ Bir hata oluştu. Lütfen doğrudan e-posta ile iletişime geçin: fatma@desinoval.com', 'error');
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Show form message
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ========== Form Input Animations ==========
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', (e) => {
        if (!e.target.value) {
            e.target.parentElement.classList.remove('focused');
        }
    });
});

// ========== Lazy Loading Images ==========
const images = document.querySelectorAll('img[data-src]');

const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imgObserver.observe(img));

// ========== Prevent Right Click on Images (Optional) ==========
// Uncomment if you want to protect images from right-click download
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// ========== Performance: Debounce Function ==========
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== Window Resize Handler ==========
const handleResize = debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
}, 250);

window.addEventListener('resize', handleResize);

// ========== Console Message ==========
console.log('%c🚀 Fatma Aktaş Portfolio', 'color: #f3140c; font-size: 20px; font-weight: bold;');
console.log('%cDijital Zirve Biletiniz!', 'color: #26262c; font-size: 14px;');
console.log('%c💻 Developed with ❤️ by Fatma Aktaş', 'color: #76767f; font-size: 12px;');
console.log('%c🌐 Powered by Desinoval', 'color: #f3140c; font-size: 12px;');

// ========== Page Load Animation ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========== Easter Egg: Konami Code ==========
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 Fatma Aktaş Easter Egg! Dijital dünyada her şey mümkün! 🚀');
        }, 2000);
    }
});

// Add rainbow animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ========== Accessibility: Focus Visible ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 3px solid #f3140c;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

// ========== Initialize ==========
console.log('✓ All scripts loaded successfully');
