// Main JavaScript for Flexia Premium NG

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            
            // Update active link
            navLinkItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // ROI Calculator Functionality
    const dailyTasksSlider = document.getElementById('dailyTasks');
    const gameEarningsSlider = document.getElementById('gameEarnings');
    const referralsSlider = document.getElementById('referrals');
    
    const tasksEarningsElement = document.getElementById('tasksEarnings');
    const gameEarningsElement = document.getElementById('gameEarningsResult');
    const referralEarningsElement = document.getElementById('referralEarnings');
    const totalEarningsElement = document.getElementById('totalEarnings');
    const roiPercentageElement = document.getElementById('roiPercentage');
    
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
        const roi = ((totalEarnings - investment) / investment) * 100;
        
        // Update display values
        tasksEarningsElement.textContent = '₦' + tasksEarnings.toLocaleString();
        gameEarningsElement.textContent = '₦' + gameEarningsTotal.toLocaleString();
        referralEarningsElement.textContent = '₦' + referralEarnings.toLocaleString();
        totalEarningsElement.textContent = '₦' + totalEarnings.toLocaleString();
        roiPercentageElement.textContent = Math.round(roi) + '%';
        
        // Update slider value displays
        document.querySelector('#dailyTasks + .input-value').textContent = dailyTasks + ' days';
        document.querySelector('#gameEarnings + .input-value').textContent = gameEarnings + ' apples/day';
        document.querySelector('#referrals + .input-value').textContent = referrals + ' referrals';
    }
    
    // Add event listeners to sliders
    [dailyTasksSlider, gameEarningsSlider, referralsSlider].forEach(slider => {
        slider.addEventListener('input', updateCalculator);
    });
    
    // Initial calculation
    updateCalculator();
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
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
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
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
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
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
    document.querySelectorAll('.value-card, .testimonial-card, .faq-item').forEach(el => {
        observer.observe(el);
    });
    
    // Countdown timer for urgency note (demo)
    let slotsLeft = 87;
    const urgencyNote = document.querySelector('.urgency-note span');
    
    setInterval(() => {
        if (slotsLeft > 0) {
            slotsLeft--;
            urgencyNote.textContent = `Only ${slotsLeft} premium slots left at ₦8,000 price`;
            
            // Change color when slots are low
            if (slotsLeft < 10) {
                urgencyNote.parentElement.style.background = 'rgba(255, 101, 132, 0.2)';
                urgencyNote.parentElement.style.color = 'var(--secondary)';
            }
        }
    }, 30000); // Update every 30 seconds for demo
    
    // Form validation for newsletter (if added later)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email && email.includes('@')) {
                // Show success message
                alert('Thank you for subscribing! You will receive investment updates.');
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Add animation class to hero elements
    setTimeout(() => {
        document.querySelector('.hero-logo').classList.add('animate');
        document.querySelector('.hero-title').classList.add('animate');
        document.querySelector('.hero-subtitle').classList.add('animate');
    }, 300);
});
