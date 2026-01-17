// ========================================
// Theme Toggle Functionality
// ========================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ========================================
// Smooth Scrolling
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Navbar Background on Scroll
// ========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'var(--bg-primary)';
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.style.background = 'var(--bg-primary)';
        navbar.style.boxShadow = 'var(--shadow-md)';
    }
});

// ========================================
// Animate Elements on Scroll
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');

            if (entry.target.tagName === 'SECTION') {
                const overlay = entry.target.querySelector('.section-floating-icons');
                if (overlay) overlay.classList.add('active');
            }
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.getAttribute('data-progress');
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .skill-card, .certification-card, .project-card, .edu-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// ========================================
// Typing Effect
// ========================================
const typingText = document.querySelector('.typing-text');
const texts = ['Full Stack Developer', 'Web Designer', 'UI/UX Enthusiast', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// Start typing effect
setTimeout(typeEffect, 1000);

// ========================================
// Certification Modal
// ========================================
const modal = document.getElementById('certModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const viewButtons = document.querySelectorAll('.view-btn');

viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const certNumber = btn.getAttribute('data-cert');
        const img = btn.closest('.certification-card').querySelector('img');
        modalImage.src = img.src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ========================================
// Contact Form Handling with EmailJS
// ========================================
// Always attach the form listener and guard EmailJS usage
let emailjsReady = false;
let emailjsLoadPromise = null;

function ensureEmailJS() {
    if (typeof emailjs === 'undefined') {
        return false;
    }
    if (!emailjsReady) {
        emailjs.init("XBG9dW79xVsv2LWai"); // EmailJS Public Key
        emailjsReady = true;
        console.log('EmailJS initialized');
    }
    return true;
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        console.log('Contact form submit fired');
        e.preventDefault();
        e.stopPropagation();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const from_name = contactForm.querySelector('input[name="from_name"]').value;
        const from_email = contactForm.querySelector('input[name="from_email"]').value;
        const subject = contactForm.querySelector('input[name="subject"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;

        function doSend() {
            console.log('Sending email via EmailJS', { from_name, from_email, subject, message });
            const combinedMessage = `Name: ${from_name}\nEmail: ${from_email}\nSubject: ${subject}\n\nMessage:\n${message}`;
            emailjs.send("service_gxus969", "template_03clqps", {
                to_email: "chanduchandavath934@gmail.com",
                from_name,
                from_email,
                subject,
                message: combinedMessage,
                reply_to: from_email,
                // Add common alias variables to support prebuilt templates
                user_name: from_name,
                user_email: from_email,
                user_subject: subject,
                user_message: combinedMessage
            }).then(
                function(response) {
                    console.log('Email sent successfully:', response);
                    showNotification('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                },
                function(error) {
                    console.error('Email send error:', error);
                    showNotification('✗ Failed to send message. Please try again or contact directly.', 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            );
        }

        // Ensure EmailJS is available; if not, load it dynamically
        if (!ensureEmailJS()) {
            console.warn('EmailJS not loaded; attempting dynamic load...');
            if (!emailjsLoadPromise) {
                emailjsLoadPromise = new Promise((resolve, reject) => {
                    const s = document.createElement('script');
                    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
                    s.async = true;
                    s.onload = () => {
                        console.log('EmailJS CDN loaded');
                        resolve();
                    };
                    s.onerror = () => {
                        reject(new Error('Failed to load EmailJS CDN'));
                    };
                    document.head.appendChild(s);
                });
            }

            emailjsLoadPromise.then(() => {
                if (!ensureEmailJS()) {
                    console.error('EmailJS still unavailable after CDN load');
                    showNotification('Email service failed to initialize. Try again later.', 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    return;
                }
                doSend();
            }).catch((err) => {
                console.error(err);
                showNotification('Could not load email service. Check your network.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
        } else {
            doSend();
        }

        return false;
    }, false);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupContactForm);
} else {
    setupContactForm();
}

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Choose background color based on type
    let bgColor = '#6366f1'; // default info
    if (type === 'success') bgColor = '#10b981'; // green
    if (type === 'error') bgColor = '#ef4444'; // red
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @media (max-width: 968px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--bg-primary);
            padding: 2rem;
            box-shadow: var(--shadow-lg);
            animation: slideDown 0.3s ease;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Parallax Effect for Hero Section
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const shapes = document.querySelectorAll('.shape');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 700;
    }
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// Active Navigation Link
// ========================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = 'var(--text-primary)';
            });
            if (navLink) {
                navLink.style.color = 'var(--primary-color)';
            }
        }
    });
});

// ========================================
// Counter Animation for Stats
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(start) + '+';
        }
    }, 16);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h4');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ========================================
// Cursor Reactive Motion for Icons
// ========================================
const floatingIcons = document.querySelectorAll('.floating-icon');
const sectionIcons = document.querySelectorAll('.section-icon');
const largeIcons = document.querySelectorAll('.section-large-icon');

window.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const xRatio = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
    const yRatio = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

    floatingIcons.forEach((icon, idx) => {
        const strength = 6 + idx; // staggered movement
        icon.style.transform = `translate(${xRatio * strength}px, ${yRatio * strength}px)`;
    });

    sectionIcons.forEach((icon, idx) => {
        const strength = 4 + (idx % 5);
        icon.style.transform = `translate(${xRatio * strength}px, ${yRatio * strength}px) rotate(${xRatio * 5}deg)`;
    });

    largeIcons.forEach((icon, idx) => {
        const strength = 12 + (idx % 3) * 4;
        icon.style.transform = `translate(${xRatio * strength}px, ${yRatio * strength}px) rotate(${xRatio * 10}deg)`;
    });
});

// ========================================
// Load More Projects (Example)
// ========================================
console.log('Portfolio website loaded successfully!');
console.log('Theme:', localStorage.getItem('theme') || 'light');
