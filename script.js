        // Floating Navbar Scroll Effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.querySelector('.nav-menu');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Active link highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        function updateActiveLink() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink();

        // Typewriter Effect
        const typingText = document.querySelector('.typing-text');
        const phrases = [
            'Kumar - Creative Developer',
            'UI/UX Engineer',
            'Creative Technologist',
            'Web Designer',
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, 500);
            } else {
                setTimeout(typeEffect, isDeleting ? 50 : 100);
            }
        }

        typeEffect();

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const cloudIcon = document.getElementById('cloudIcon');
        let isDark = true;

        function setTheme(theme) {
            if (theme === 'light') {
                document.body.classList.add('light-theme');
                isDark = false;
            } else {
                document.body.classList.remove('light-theme');
                isDark = true;
            }
            localStorage.setItem('theme', theme);
            
            cloudIcon.style.transform = 'scale(0.8) rotate(10deg)';
            setTimeout(() => {
                cloudIcon.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        }

        themeToggle.addEventListener('click', () => {
            setTheme(isDark ? 'light' : 'dark');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setTheme('light');
        }

        // Intersection Observer for animations
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

        document.querySelectorAll('.project-card, .about-content, .contact-card, .hero-content').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });

// Carousel Functions
function changeSlide(direction, carouselId) {
    event.stopPropagation();
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    
    let currentIndex = 0;
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;
    
    slides[newIndex].classList.add('active');
    dots[newIndex].classList.add('active');
}

function goToSlide(index, carouselId) {
    event.stopPropagation();
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Auto carousel functionality
function startAutoCarousel(carouselId, interval = 3000) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    let autoInterval = setInterval(() => {
        // Check if carousel is still visible in viewport
        const rect = carousel.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            changeSlide(1, carouselId);
        }
    }, interval);
    
    // Store interval on carousel element to clear if needed
    carousel.autoInterval = autoInterval;
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carousel.autoInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        carousel.autoInterval = setInterval(() => {
            changeSlide(1, carouselId);
        }, interval);
    });
}

// Start auto carousel for each carousel when page loads
document.addEventListener('DOMContentLoaded', () => {
    startAutoCarousel('carousel-1', 3000);
});