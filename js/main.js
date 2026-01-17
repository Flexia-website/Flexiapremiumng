// Main JavaScript for Flexia Premium NG

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Flexia Premium NG - Page Loaded');
    
    // ===== Loading Screen =====
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== Update active nav link on scroll =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link:not(.btn-register)');
        
        let currentSection = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // ===== ROI Calculator Functionality =====
    function initROICalculator() {
        const dailyTasksSlider = document.getElementById('dailyTasks');
        const gameEarningsSlider = document.getElementById('gameEarnings');
        const referralsSlider = document.getElementById('referrals');
        
        const tasksEarningsElement = document.getElementById('tasksEarnings');
        const gameEarningsElement = document.getElementById('gameEarningsResult');
        const referralEarningsElement = document.getElementById('referralEarnings');
        const totalEarningsElement = document.getElementById('totalEarnings');
        const roiPercentageElement = document.getElementById('roiPercentage');
        
        const dailyTasksValue = document.getElementById('dailyTasksValue');
        const gameEarningsValue = document.getElementById('gameEarningsValue');
        const referralsValue = document.getElementById('referralsValue');
        
        function formatCurrency(amount) {
            return '₦' + amount.toLocaleString('en-NG');
        }
        
        function updateCalculator() {
            const dailyTasks = parseInt(dailyTasksSlider.value);
            const gameEarnings = parseInt(gameEarningsSlider.value);
            const referrals = parseInt(referralsSlider.value);
            
            // Calculate earnings
            const tasksEarnings = dailyTasks * 150; // ₦150 per day
            const gameEarningsTotal = (gameEarnings * 200) * 30; // ₦200 per apple, 30 days
            const referralEarnings = referrals * 7500; // ₦7,500 per referral
            const totalEarnings = tasksEarnings + gameEarningsTotal + referralEarnings;
            
            // Calculate ROI percentage
            const investment = 8000;
            const roi = totalEarnings > 0 ? ((totalEarnings - investment) / investment) * 100 : 0;
            
            // Update display values
            tasksEarningsElement.textContent = formatCurrency(tasksEarnings);
            gameEarningsElement.textContent = formatCurrency(gameEarningsTotal);
            referralEarningsElement.textContent = formatCurrency(referralEarnings);
            totalEarningsElement.textContent = formatCurrency(totalEarnings);
            roiPercentageElement.textContent = Math.round(roi) + '%';
            
            // Update slider value displays
            dailyTasksValue.textContent = dailyTasks + ' days';
            gameEarningsValue.textContent = gameEarnings + ' apples/day';
            referralsValue.textContent = referrals + ' referrals';
            
            // Animate numbers
            animateValue(tasksEarningsElement, tasksEarnings);
            animateValue(gameEarningsElement, gameEarningsTotal);
            animateValue(referralEarningsElement, referralEarnings);
            animateValue(totalEarningsElement, totalEarnings);
        }
        
        function animateValue(element, finalValue) {
            const currentText = element.textContent.replace('₦', '').replace(/,/g, '');
            const currentValue = parseInt(currentText) || 0;
            
            if (currentValue === finalValue) return;
            
            const duration = 500;
            const startTime = Date.now();
            const startValue = currentValue;
            
            function update() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = Math.floor(startValue + (finalValue - startValue) * progress);
                
                element.textContent = '₦' + current.toLocaleString('en-NG');
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            
            requestAnimationFrame(update);
        }
        
        // Add event listeners to sliders
        [dailyTasksSlider, gameEarningsSlider, referralsSlider].forEach(slider => {
            if (slider) {
                slider.addEventListener('input', updateCalculator);
                slider.addEventListener('change', updateCalculator);
            }
        });
        
        // Initial calculation
        if (dailyTasksSlider && gameEarningsSlider && referralsSlider) {
            updateCalculator();
        }
    }
    
    initROICalculator();

    // ===== FAQ Accordion =====
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', function() {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            }
        });
    }
    
    initFAQAccordion();

    // ===== Back to Top Button =====
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (backToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    initBackToTop();

    // ===== Smooth scrolling for anchor links =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#' || targetId === '#!') {
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        if (mobileMenuBtn) {
                            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                        }
                        document.body.style.overflow = '';
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    initSmoothScroll();

    // ===== Animate elements on scroll =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);
        
        // Observe elements to animate
        document.querySelectorAll('.value-card, .testimonial-card, .calculator-container, .faq-item').forEach(el => {
            observer.observe(el);
        });
        
        // Hero animation
        setTimeout(() => {
            document.querySelector('.hero-logo')?.classList.add('animate');
            document.querySelector('.hero-title')?.classList.add('animate');
            document.querySelector('.hero-subtitle')?.classList.add('animate');
        }, 300);
    }
    
    initScrollAnimations();

    // ===== Urgency Timer (Countdown) =====
    function initUrgencyTimer() {
        const urgencyNote = document.getElementById('urgencyNote');
        
        if (urgencyNote) {
            let slotsLeft = 87;
            const urgencyText = urgencyNote.querySelector('span');
            
            // Update every 30 seconds (for demo)
            setInterval(() => {
                if (slotsLeft > 0) {
                    slotsLeft--;
                    
                    // Random fluctuation for realism
                    if (Math.random() > 0.7 && slotsLeft > 10) {
                        slotsLeft += Math.floor(Math.random() * 3);
                    }
                    
                    if (slotsLeft < 0) slotsLeft = 0;
                    
                    if (urgencyText) {
                        urgencyText.textContent = `Only ${slotsLeft} premium slots left at ₦8,000 price`;
                    }
                    
                    // Change color when slots are low
                    if (slotsLeft < 10) {
                        urgencyNote.style.background = 'rgba(255, 101, 132, 0.2)';
                        urgencyNote.style.color = '#FF6584';
                        urgencyNote.style.animation = 'pulse 1s infinite';
                    }
                    
                    // Blink when very low
                    if (slotsLeft < 5) {
                        urgencyNote.style.animation = 'pulse 0.5s infinite';
                    }
                }
            }, 30000); // Update every 30 seconds
        }
    }
    
    initUrgencyTimer();

    // ===== Image error handling =====
    function handleImageErrors() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                if (this.classList.contains('logo') || this.classList.contains('hero-logo-img')) {
                    this.src = 'https://placehold.co/120/6C63FF/FFFFFF?text=FP';
                } else if (this.classList.contains('testimonial-avatar')) {
                    const name = this.alt.split(' ')[0] || 'User';
                    this.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
                }
            });
        });
    }
    
    handleImageErrors();

    // ===== Video fallback handling =====
    function handleVideoFallback() {
        const heroVideo = document.querySelector('.hero-video');
        const heroFallback = document.querySelector('.hero-fallback');
        
        if (heroVideo && heroFallback) {
            heroVideo.addEventListener('error', function() {
                this.style.display = 'none';
                heroFallback.style.display = 'block';
            });
            
            // Check if video can play
            if (heroVideo.readyState >= 3) {
                heroVideo.play().catch(() => {
                    heroVideo.style.display = 'none';
                    heroFallback.style.display = 'block';
                });
            }
        }
    }
    
    handleVideoFallback();

    // ===== Form validation (if forms added later) =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email && email.includes('@') && email.includes('.')) {
                // Show success message
                showNotification('Thank you for subscribing! You will receive investment updates.', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    // ===== Notification function =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }

    // ===== Performance optimization =====
    // Debounce function for scroll/resize events
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

    // Optimize scroll events
    const optimizedScroll = debounce(updateActiveNavLink, 100);
    window.addEventListener('scroll', optimizedScroll);

    // ===== Initialize all functions =====
    console.log('All JavaScript functions initialized successfully');
});

// ===== Service Worker for PWA (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// ===== Add CSS for notifications =====
const notificationCSS = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        background: #1A1A2E;
        border-left: 4px solid #6C63FF;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left-color: #00D4AA;
    }
    
    .notification-error {
        border-left-color: #FF6584;
    }
    
    .notification i {
        font-size: 20px;
    }
    
    .notification-success i {
        color: #00D4AA;
    }
    
    .notification-error i {
        color: #FF6584;
    }
    
    .notification span {
        color: white;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #8A8AA3;
        cursor: pointer;
        padding: 4px;
        font-size: 14px;
        transition: color 0.3s ease;
    }
    
    .notification-close:hover {
        color: white;
    }
`;

// Inject notification CSS
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);
