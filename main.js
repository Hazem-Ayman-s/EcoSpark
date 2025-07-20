// Burger Menu Toggle
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Update ARIA attribute
    const isExpanded = navLinks.classList.contains('active');
    burgerMenu.setAttribute('aria-expanded', isExpanded);
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = isExpanded ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        burgerMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        burgerMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        burgerMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-input');
const body = document.body;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
themeToggle.checked = savedTheme === 'dark';

themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .testimonial').forEach(el => {
    observer.observe(el);
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = answer.classList.contains('active');
        
        // Close all other answers
        document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
            otherAnswer.classList.remove('active');
        });
        
        document.querySelectorAll('.faq-question').forEach(otherQuestion => {
            otherQuestion.setAttribute('aria-expanded', 'false');
        });
        
        // Toggle current answer
        if (!isActive) {
            answer.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// Email Form Validation
document.querySelector('.email-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    const errorDiv = document.getElementById('email-error');
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError('Please enter your email address.');
        return;
    }
    
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    showSuccess('Thanks! Check your email for your 15% discount code.');
    emailInput.value = '';
    
    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.marginTop = '1rem';
    }
    
    function showSuccess(message) {
        errorDiv.textContent = message;
        errorDiv.style.color = '#4CAF50';
        errorDiv.style.marginTop = '1rem';
    }
});

// Add loading states and micro-interactions
document.querySelectorAll('.cta-button, .email-submit').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            const originalText = this.textContent;
            this.classList.add('loading');
            this.textContent = 'Loading...';
            
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = originalText;
            }, 1500);
        }
    });
});
