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

