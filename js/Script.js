// Main JavaScript for Flexia Premium NG

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const mobileNav = document.getElementById('mobileNav');
    const navToggle = document.getElementById('navToggle');
    const navBack = document.getElementById('navBack');
    const navOverlay = document.getElementById('navOverlay');
    const floatingMenuBtn = document.getElementById('floatingMenuBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageLinks = document.querySelectorAll('.page-link');
    const mainContent = document.getElementById('mainContent');
    const pageContentWrapper = document.getElementById('pageContent');
    
    // ROI Calculator elements
    const calculateBtn = document.getElementById('calculateBtn');
    const dailyTasksInput = document.getElementById('dailyTasks');
    const gameEarningsInput = document.getElementById('gameEarnings');
    const referralsInput = document.getElementById('referrals');
    
    // FAQ elements
    const faqItems = document.querySelectorAll('.faq-item h3');
    
    // Current page state
    let currentPage = 'home';
    
    // Initialize
    initNavigation();
    initROICalculator();
    initFAQ();
    initStatsAnimation();
    initSlotsCountdown();
    initSmoothScrolling();
    
    // Navigation Functions
    function initNavigation() {
        // Toggle mobile menu
        navToggle.addEventListener('click', toggleMenu);
        floatingMenuBtn.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', closeMenu);
        
        // Handle back button
        navBack.addEventListener('click', goBackToHome);
        
        // Handle navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const page = this.getAttribute('data-page');
                
                if (page) {
                    e.preventDefault();
                    showPage(page);
                } else if (href.startsWith('#') && href !== '#') {
                    // Anchor links within home page
                    e.preventDefault();
                    closeMenu();
                    const target = document.querySelector(href);
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Handle page links in footer
        pageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                if (page) {
                    showPage(page);
                }
            });
        });
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', function(e) {
            if (e.state && e.state.page) {
                if (e.state.page === 'home') {
                    goBackToHome();
                } else {
                    showPage(e.state.page, false);
                }
            } else {
                goBackToHome();
            }
        });
    }
    
    function toggleMenu() {
        mobileNav.classList.toggle('expanded');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('expanded') ? 'hidden' : '';
        
        // Update floating button icon
        const icon = floatingMenuBtn.querySelector('i');
        if (mobileNav.classList.contains('expanded')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    }
    
    function closeMenu() {
        mobileNav.classList.remove('expanded');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        floatingMenuBtn.querySelector('i').className = 'fas fa-bars';
    }
    
    function showPage(pageId) {
        closeMenu();
        
        // Hide main content
        mainContent.style.display = 'none';
        
        // Show page content wrapper
        pageContentWrapper.classList.add('active');
        
        // Clear previous content
        pageContentWrapper.innerHTML = '';
        
        // Load page content
        const pageContent = createPageContent(pageId);
        pageContentWrapper.appendChild(pageContent);
        
        // Update current page
        currentPage = pageId;
        
        // Update browser history
        history.pushState({ page: pageId }, pageId, `#${pageId}`);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function goBackToHome() {
        // Hide page content
        pageContentWrapper.classList.remove('active');
        pageContentWrapper.innerHTML = '';
        
        // Show main content
        mainContent.style.display = 'block';
        
        // Update current page
        currentPage = 'home';
        
        // Update browser history
        history.pushState({ page: 'home' }, 'Home', '#');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function createPageContent(pageId) {
        const pages = {
            'terms': createTermsPage(),
            'privacy': createPrivacyPage(),
            'about': createAboutPage(),
            'contact': createContactPage()
        };
        
        return pages[pageId] || createNotFoundPage();
    }
    
    function createTermsPage() {
        const div = document.createElement('div');
        div.className = 'page-content';
        div.innerHTML = `
            <div class="page-header">
                <h1><i class="fas fa-file-contract"></i> Terms & Conditions</h1>
                <button class="page-back-btn" onclick="goBackToHome()">
                    <i class="fas fa-arrow-left"></i> Back to Home
                </button>
            </div>
            
            <div class="page-section">
                <h2>Investment Terms</h2>
                <p>By registering with ₦8,000, you agree to the following terms:</p>
                
                <ul class="terms-list">
                    <li>
                        <h3>Registration Fee</h3>
                        <p>The ₦8,000 registration fee is a one-time payment providing lifetime access to our premium gaming investment platform.</p>
                    </li>
                    <li>
                        <h3>Earnings & Payouts</h3>
                        <p>All earnings are calculated based on your activities. Minimum withdrawal is ₦500. Payouts are processed within 24 hours on business days.</p>
                    </li>
                    <li>
                        <h3>Account Security</h3>
                        <p>You are responsible for maintaining the security of your account credentials. Report any suspicious activity immediately.</p>
                    </li>
                    <li>
                        <h3>Platform Usage</h3>
                        <p>Use of automated tools or bots is strictly prohibited. All earnings must be generated through legitimate user activities.</p>
                    </li>
                    <li>
                        <h3>Amendments</h3>
                        <p>We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of updated terms.</p>
                    </li>
                </ul>
                
                <div class="contact-item" style="max-width: 400px; margin: 40px auto;">
                    <i class="fas fa-question-circle"></i>
                    <h3>Questions?</h3>
                    <p>Contact our support team for clarification on any term.</p>
                </div>
            </div>
        `;
        return div;
    }
    
    function createPrivacyPage() {
        const div = document.createElement('div');
        div.className = 'page-content';
        div.innerHTML = `
            <div class="page-header">
                <h1><i class="fas fa-shield-alt"></i> Privacy Policy</h1>
                <button class="page-back-btn" onclick="goBackToHome()">
                    <i class="fas fa-arrow-left"></i> Back to Home
                </button>
            </div>
            
            <div class="page-section">
                <h2>Your Privacy Matters</h2>
                <p>We are committed to protecting your personal information and being transparent about how we use it.</p>
                
                <ul class="privacy-list">
                    <li>
                        <h3>Information Collection</h3>
                        <p>We collect only necessary information for account creation and transaction processing. This includes name, email, and payment details.</p>
                    </li>
                    <li>
                        <h3>Data Protection</h3>
                        <p>Your data is protected with 256-bit SSL encryption. We never share your personal information with third parties without your consent.</p>
                    </li>
                    <li>
                        <h3>Payment Security</h3>
                        <p>All financial transactions are processed through secure, verified payment gateways with bank-level security.</p>
                    </li>
                    <li>
                        <h3>Cookies & Tracking</h3>
                        <p>We use essential cookies for platform functionality. No intrusive tracking or data mining practices are employed.</p>
                    </li>
                    <li>
                        <h3>Your Rights</h3>
                        <p>You have the right to access, modify, or delete your personal data at any time through your account settings.</p>
                    </li>
                </ul>
                
                <div class="contact-item" style="max-width: 400px; margin: 40px auto;">
                    <i class="fas fa-lock"></i>
                    <h3>Data Protection Officer</h3>
                    <p>For privacy concerns, contact: privacy@flexiapremium.ng</p>
                </div>
            </div>
        `;
        return div;
    }
    
    function createAboutPage() {
        const div = document.createElement('div');
        div.className = 'page-content';
        div.innerHTML = `
            <div class="page-header">
                <h1><i class="fas fa-info-circle"></i> About Flexia Premium NG</h1>
                <button class="page-back-btn" onclick="goBackToHome()">
                    <i class="fas fa-arrow-left"></i> Back to Home
                </button>
            </div>
            
            <div class="page-section">
                <h2>Our Mission</h2>
                <p>Empowering Nigerians with legitimate, high-return investment opportunities through innovative gaming technology.</p>
                
                <div class="about-highlights">
                    <div class="contact-item">
                        <i class="fas fa-rocket"></i>
                        <h3>Founded 2023</h3>
                        <p>Started with a vision to revolutionize gaming investments in Nigeria</p>
                    </div>
                    
                    <div class="contact-item">
                        <i class="fas fa-users"></i>
                        <h3>2,150+ Investors</h3>
                        <p>Trusted by a growing community of premium investors</p>
                    </div>
                    
                    <div class="contact-item">
                        <i class="fas fa-trophy"></i>
                        <h3>₦48M+ Paid Out</h3>
                        <p>Proven track record of reliable payouts to our investors</p>
                    </div>
                </div>
                
                <h2 style="margin-top: 40px;">Our Values</h2>
                <ul class="terms-list">
                    <li>
                        <h3>Transparency</h3>
                        <p>Clear earning structures, no hidden fees, open communication</p>
                    </li>
                    <li>
                        <h3>Security</h3>
                        <p>Bank-level security measures for all transactions and data</p>
                    </li>
                    <li>
                        <h3>Innovation</h3>
                        <p>Constantly evolving platform with new earning opportunities</p>
                    </li>
                    <li>
                        <h3>Community</h3>
                        <p>Building a supportive network of successful investors</p>
                    </li>
                </ul>
            </div>
        `;
        return div;
    }
    
    function createContactPage() {
        const div = document.createElement('div');
        div.className = 'page-content';
        div.innerHTML = `
            <div class="page-header">
                <h1><i class="fas fa-envelope"></i> Contact & Support</h1>
                <button class="page-back-btn" onclick="goBackToHome()">
                    <i class="fas fa-arrow-left"></i> Back to Home
                </button>
            </div>
            
            <div class="page-section">
                <h2>24/7 Customer Support</h2>
                <p>We're here to help you succeed with your investment. Reach out to us anytime.</p>
                
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-headset"></i>
                        <h3>Customer Support</h3>
                        <p>Email: support@flexiapremium.ng</p>
                        <p>Phone: +234-800-FLEXIA</p>
                        <p>Available: 24/7</p>
                    </div>
                    
                    <div class="contact-item">
                        <i class="fas fa-handshake"></i>
                        <h3>Investment Inquiries</h3>
                        <p>Email: investment@flexiapremium.ng</p>
                        <p>For premium investment guidance</p>
                    </div>
                    
                    <div class="contact-item">
                        <i class="fas fa-shield-alt"></i>
                        <h3>Security Issues</h3>
                        <p>Email: security@flexiapremium.ng</p>
                        <p>Report any security concerns immediately</p>
                    </div>
                </div>
                
                <h2>Response Time</h2>
                <p>We pride ourselves on quick response times:</p>
                
                <ul class="terms-list">
                    <li>
                        <h3>Urgent Issues</h3>
                        <p>Response within 1-2 hours</p>
                    </li>
                    <li>
                        <h3>General Inquiries</h3>
                        <p>Response within 6 hours</p>
                    </li>
                    <li>
                        <h3>Withdrawal Requests</h3>
                        <p>Processed within 24 business hours</p>
                    </li>
                </ul>
                
                <div class="contact-item" style="max-width: 500px; margin: 40px auto; background: rgba(0, 238, 255, 0.1);">
                    <i class="fas fa-lightbulb"></i>
                    <h3>Need Help Now?</h3>
                    <p>Check our <a href="#faq" style="color: var(--premium-blue); text-decoration: underline;">FAQ section</a> for quick answers to common questions.</p>
                </div>
            </div>
        `;
        return div;
    }
    
    function createNotFoundPage() {
        const div = document.createElement('div');
        div.className = 'page-content';
        div.innerHTML = `
            <div class="page-header">
                <h1><i class="fas fa-exclamation-triangle"></i> Page Not Found</h1>
                <button class="page-back-btn" onclick="goBackToHome()">
                    <i class="fas fa-arrow-left"></i> Back to Home
                </button>
            </div>
            
            <div class="page-section" style="text-align: center;">
                <div class="contact-item" style="max-width: 500px; margin: 0 auto;">
                    <i class="fas fa-search" style="font-size: 4rem; color: var(--warning-orange);"></i>
                    <h3>Page Not Found</h3>
                    <p>The page you're looking for doesn't exist or has been moved.</p>
                    <button class="btn btn-premium" onclick="goBackToHome()" style="margin-top: 20px;">
                        <i class="fas fa-home"></i> Return to Home
                    </button>
                </div>
            </div>
        `;
        return div;
    }
    
    // ROI Calculator Functions
    function initROICalculator() {
        if (calculateBtn) {
            calculateBtn.addEventListener('click', calculateROI);
            
            // Auto-calculate on input change
            [dailyTasksInput, gameEarningsInput, referralsInput].forEach(input => {
                if (input) {
                    input.addEventListener('input', calculateROI);
                }
            });
            
            // Initial calculation
            calculateROI();
        }
    }
    
    function calculateROI() {
        const dailyTasks = parseInt(dailyTasksInput.value) || 0;
        const gameEarnings = parseInt(gameEarningsInput.value) || 0;
        const referrals = parseInt(referralsInput.value) || 0;
        
        // Calculations
        const taskIncome = dailyTasks * 150; // ₦150 per day
        const gameIncome = (gameEarnings * 200) * 30; // ₦200 per apple, 30 days
        const referralIncome = referrals * 7500; // ₦7,500 per referral
        
        const totalIncome = taskIncome + gameIncome + referralIncome;
        
        // Update UI
        const taskResult = document.getElementById('taskResult');
        const gameResult = document.getElementById('gameResult');
        const referralResult = document.getElementById('referralResult');
        const totalResult = document.getElementById('totalResult');
        const roiPercentage = document.getElementById('roiPercentage');
        const monthlyEarning = document.getElementById('monthlyEarning');
        const dailyEarning = document.getElementById('dailyEarning');
        
        if (taskResult) taskResult.textContent = '₦' + taskIncome.toLocaleString();
        if (gameResult) gameResult.textContent = '₦' + gameIncome.toLocaleString();
        if (referralResult) referralResult.textContent = '₦' + referralIncome.toLocaleString();
        if (totalResult) totalResult.textContent = '₦' + totalIncome.toLocaleString();
        
        // Calculate ROI percentage (based on ₦8,000 investment)
        const roi = ((totalIncome - 8000) / 8000) * 100;
        if (roiPercentage) roiPercentage.textContent = Math.round(roi) + '%';
        
        if (monthlyEarning) monthlyEarning.textContent = '₦' + totalIncome.toLocaleString() + ' monthly';
        if (dailyEarning) dailyEarning.textContent = '₦' + Math.round(totalIncome / 30).toLocaleString() + ' daily';
    }
    
    // FAQ Functions
    function initFAQ() {
        faqItems.forEach(item => {
            item.addEventListener('click', function() {
                const parent = this.parentElement;
                parent.classList.toggle('active');
                
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== this) {
                        otherItem.parentElement.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Stats Animation
    function initStatsAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsSection = document.querySelector('.stats-section');
        
        if (!statsSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats(statNumbers);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    function animateStats(statElements) {
        statElements.forEach(stat => {
            const target = getStatValue(stat.textContent);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateStat = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = formatStatValue(stat.textContent, current);
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = formatStatValue(stat.textContent, target);
                }
            };
            
            updateStat();
        });
    }
    
    function getStatValue(text) {
        // Extract numeric value from stat text
        const match = text.match(/[\d,.]+/);
        if (!match) return 0;
        
        const value = parseFloat(match[0].replace(/,/g, ''));
        
        // Handle percentage values
        if (text.includes('%')) return value;
        
        // Handle currency values
        if (text.includes('₦')) return value;
        
        // Handle plain numbers
        return value;
    }
    
    function formatStatValue(originalText, value) {
        if (originalText.includes('₦')) {
            return '₦' + Math.ceil(value).toLocaleString() + '+';
        } else if (originalText.includes('%')) {
            return Math.ceil(value) + '%';
        } else {
            return Math.ceil(value).toLocaleString() + '+';
        }
    }
    
    // Slots Countdown
    function initSlotsCountdown() {
        const slotsCount = document.getElementById('slotsCount');
        if (!slotsCount) return;
        
        let slots = 87;
        
        // Update slots every 30 minutes (for demo purposes)
        setInterval(() => {
            if (slots > 0) {
                slots--;
                slotsCount.textContent = slots;
                
                // Update urgency message color when slots are low
                if (slots <= 10) {
                    slotsCount.parentElement.style.color = '#FF4444';
                }
            }
        }, 1800000); // 30 minutes
    }
    
    // Smooth Scrolling for Anchor Links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Skip for page navigation links
                if (this.classList.contains('page-link') || this.hasAttribute('data-page')) {
                    return;
                }
                
                // Skip for empty hash
                if (href === '#') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Make functions available globally
    window.goBackToHome = goBackToHome;
    window.toggleMenu = toggleMenu;
    window.showPage = showPage;
    
    // Check initial URL for page
    const hash = window.location.hash.substring(1);
    if (hash && ['terms', 'privacy', 'about', 'contact'].includes(hash)) {
        showPage(hash);
    }
});
