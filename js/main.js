// Main JavaScript for Flexia Premium NG

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only smooth scroll for same-page anchors
        if (href.startsWith('#') && href !== '#') {
            e.preventDefault();
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Animate stats on scroll
    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const originalText = stat.textContent;
            const target = originalText.includes('₦') ? 
                parseInt(originalText.replace(/[₦,KM+]/g, '').trim()) * 
                (originalText.includes('M') ? 1000000 : originalText.includes('K') ? 1000 : 1) :
                parseFloat(originalText.replace(/[%,+]/g, ''));
            
            if (!isNaN(target)) {
                let current = 0;
                const increment = target / 60; // 60 frames over 1 second
                const duration = 1000;
                const interval = duration / 60;
                
                const update = () => {
                    current += increment;
                    if (current < target) {
                        if (originalText.includes('₦')) {
                            const value = Math.ceil(current);
                            stat.textContent = value >= 1000000 ? 
                                '₦' + (value / 1000000).toFixed(1) + 'M+' :
                                value >= 1000 ? 
                                '₦' + (value / 1000).toFixed(1) + 'K+' :
                                '₦' + value.toLocaleString();
                        } else if (originalText.includes('%')) {
                            stat.textContent = Math.ceil(current) + '%';
                        } else {
                            stat.textContent = Math.ceil(current).toLocaleString() + '+';
                        }
                        setTimeout(update, interval);
                    } else {
                        stat.textContent = originalText;
                    }
                };
                
                update();
            }
        });
    };

    // Observe stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = null;
                }
            });
        }
    });

    // ROI Calculator functionality
    const roiCalculator = document.querySelector('.roi-calculator');
    if (roiCalculator) {
        const inputs = roiCalculator.querySelectorAll('input[type="number"]');
        const calculateBtn = roiCalculator.querySelector('.btn-calculate');
        const results = {
            tasks: roiCalculator.querySelector('.result-item:nth-child(1) .result-amount'),
            games: roiCalculator.querySelector('.result-item:nth-child(2) .result-amount'),
            referrals: roiCalculator.querySelector('.result-item:nth-child(3) .result-amount'),
            total: roiCalculator.querySelector('.result-item.total .result-amount'),
            percentage: roiCalculator.querySelector('.roi-percentage .percentage')
        };

        function calculateROI() {
            const days = parseInt(document.getElementById('dailyTasks')?.value) || 30;
            const apples = parseInt(document.getElementById('gameEarnings')?.value) || 50;
            const refs = parseInt(document.getElementById('referrals')?.value) || 2;

            const taskIncome = days * 150;
            const gameIncome = (apples * 200) * 30;
            const referralIncome = refs * 7500;
            const totalIncome = taskIncome + gameIncome + referralIncome;
            const roiPercentage = ((totalIncome - 8000) / 8000) * 100;

            // Update results
            if (results.tasks) results.tasks.textContent = '₦' + taskIncome.toLocaleString();
            if (results.games) results.games.textContent = '₦' + gameIncome.toLocaleString();
            if (results.referrals) results.referrals.textContent = '₦' + referralIncome.toLocaleString();
            if (results.total) results.total.textContent = '₦' + totalIncome.toLocaleString();
            if (results.percentage) results.percentage.textContent = Math.round(roiPercentage) + '%';
        }

        // Add event listeners
        inputs.forEach(input => {
            input.addEventListener('input', calculateROI);
        });

        if (calculateBtn) {
            calculateBtn.addEventListener('click', calculateROI);
        }

        // Initial calculation
        calculateROI();
    }

    // Countdown for urgency message
    function updateUrgencyMessage() {
        const urgencyMsg = document.querySelector('.urgency-message');
        if (urgencyMsg) {
            let slots = 87;
            const updateInterval = setInterval(() => {
                if (slots > 0) {
                    slots--;
                    urgencyMsg.querySelector('p').innerHTML = 
                        `<i class="fas fa-clock"></i> <strong>URGENT:</strong> Only ${slots} premium slots left at ₦8,000 price point.`;
                    
                    if (slots <= 10) {
                        urgencyMsg.style.background = 'rgba(255, 68, 68, 0.2)';
                        urgencyMsg.style.borderColor = '#ff4444';
                    }
                } else {
                    clearInterval(updateInterval);
                }
            }, 60000); // Update every minute
        }
    }

    // Initialize urgency message
    updateUrgencyMessage();

    // Add scroll effects to navigation
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.main-nav');
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.style.boxShadow = 'none';
        } else {
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }

        lastScroll = currentScroll;
    });

    // Form validation for newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email && email.includes('@')) {
                // Show success message
                const button = this.querySelector('button');
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                button.style.background = 'var(--success)';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }
        });
    }
});

// Utility function for loading page content
function loadPageContent(pageId) {
    const pages = {
        'investment-value': `
            <div class="page-content">
                <div class="container">
                    <div class="page-header">
                        <h1>Investment Value</h1>
                        <p>Discover the premium features your ₦8,000 investment unlocks</p>
                    </div>
                    
                    <div class="value-grid">
                        <div class="value-card premium">
                            <div class="value-icon">
                                <i class="fas fa-money-bill-wave"></i>
                            </div>
                            <h3>₦150 Daily TikTok Tasks</h3>
                            <p>Earn ₦150 every day by completing simple TikTok tasks. That's ₦4,500 monthly from tasks alone!</p>
                            <div class="value-tag">DAILY INCOME</div>
                        </div>
                        
                        <div class="value-card premium">
                            <div class="value-icon">
                                <i class="fas fa-gamepad"></i>
                            </div>
                            <h3>Unlimited Game Earnings</h3>
                            <p>Earn ₦200 per apple in Snake Master + other games. No limits on how much you can earn daily.</p>
                            <div class="value-tag">UNLIMITED EARNINGS</div>
                        </div>
                        
                        <div class="value-card premium">
                            <div class="value-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3>₦7,500 Referral Bonus</h3>
                            <p>Earn ₦7,500 for every person you refer. Build your team and multiply your income.</p>
                            <div class="value-tag">TEAM BUILDING</div>
                        </div>
                        
                        <div class="value-card premium">
                            <div class="value-icon">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <h3>VIP Achievement Rewards</h3>
                            <p>Unlock special VIP achievements with automatic cash rewards up to ₦50,000.</p>
                            <div class="value-tag">EXCLUSIVE REWARDS</div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'roi-calculator': `
            <div class="page-content">
                <div class="container">
                    <div class="page-header">
                        <h1>ROI Calculator</h1>
                        <p>Calculate your potential earnings based on your investment</p>
                    </div>
                    
                    <div class="calculator-container">
                        <div class="calculator-inputs">
                            <h3>Your Investment Scenario</h3>
                            
                            <div class="input-group">
                                <label for="dailyTasks">
                                    <i class="fas fa-tiktok"></i> Daily TikTok Tasks (₦150/day)
                                </label>
                                <input type="number" id="dailyTasks" value="30" min="0" max="365">
                                <span class="input-unit">days/month</span>
                            </div>
                            
                            <div class="input-group">
                                <label for="gameEarnings">
                                    <i class="fas fa-gamepad"></i> Game Earnings (₦200/apple)
                                </label>
                                <input type="number" id="gameEarnings" value="50" min="0" max="1000">
                                <span class="input-unit">apples/day</span>
                            </div>
                            
                            <div class="input-group">
                                <label for="referrals">
                                    <i class="fas fa-users"></i> Referrals (₦7,500 each)
                                </label>
                                <input type="number" id="referrals" value="2" min="0" max="20">
                                <span class="input-unit">people/month</span>
                            </div>
                            
                            <button class="btn btn-calculate">
                                <i class="fas fa-calculator"></i> Calculate My ROI
                            </button>
                        </div>
                        
                        <div class="calculator-results">
                            <div class="results-header">
                                <h3>YOUR MONTHLY EARNING POTENTIAL</h3>
                                <p class="results-subtitle">Based on your inputs</p>
                            </div>
                            
                            <div class="results-breakdown">
                                <div class="result-item">
                                    <span class="result-label">Daily Tasks Income:</span>
                                    <span class="result-amount">₦4,500</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Game Earnings:</span>
                                    <span class="result-amount">₦30,000</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Referral Bonuses:</span>
                                    <span class="result-amount">₦15,000</span>
                                </div>
                                <div class="result-item total">
                                    <span class="result-label">TOTAL MONTHLY EARNINGS:</span>
                                    <span class="result-amount">₦49,500</span>
                                </div>
                            </div>
                            
                            <div class="roi-highlight-box">
                                <div class="roi-percentage">
                                    <span class="percentage">519%</span>
                                    <span class="percentage-label">MONTHLY ROI</span>
                                </div>
                                <div class="roi-explanation">
                                    <p>Your ₦8,000 investment could generate <strong>₦49,500 monthly</strong>.<br>
                                    That's <strong>₦1,650 daily</strong> average earnings.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'faq': `
            <div class="page-content">
                <div class="container">
                    <div class="page-header">
                        <h1>Frequently Asked Questions</h1>
                        <p>Find answers to common questions about your investment</p>
                    </div>
                    
                    <div class="faq-grid">
                        <div class="faq-item">
                            <h3>
                                <i class="fas fa-question-circle"></i> 
                                Is the ₦8,000 registration fee refundable?
                                <i class="fas fa-chevron-down"></i>
                            </h3>
                            <div class="faq-answer">
                                <p>The ₦8,000 registration fee is a one-time investment that gives you lifetime access to our premium earning platform. 
                                It is non-refundable because it provides immediate access to earning opportunities.</p>
                            </div>
                        </div>
                        
                        <div class="faq-item">
                            <h3>
                                <i class="fas fa-question-circle"></i> 
                                How quickly can I recover my investment?
                                <i class="fas fa-chevron-down"></i>
                            </h3>
                            <div class="faq-answer">
                                <p>Most members recover their investment within 12-15 days through daily TikTok tasks alone. 
                                With additional earnings, some recover in as little as 5-7 days.</p>
                            </div>
                        </div>
                        
                        <div class="faq-item">
                            <h3>
                                <i class="fas fa-question-circle"></i> 
                                Are there any hidden fees?
                                <i class="fas fa-chevron-down"></i>
                            </h3>
                            <div class="faq-answer">
                                <p>No hidden fees. The ₦8,000 is a one-time registration fee. 
                                You keep 100% of your earnings with no commission deducted.</p>
                            </div>
                        </div>
                        
                        <div class="faq-item">
                            <h3>
                                <i class="fas fa-question-circle"></i> 
                                How do withdrawals work?
                                <i class="fas fa-chevron-down"></i>
                            </h3>
                            <div class="faq-answer">
                                <p>As a premium investor, you get priority withdrawals. Minimum withdrawal is ₦500, 
                                processed within 24 hours to your Nigerian bank account.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'success-stories': `
            <div class="page-content">
                <div class="container">
                    <div class="page-header">
                        <h1>Success Stories</h1>
                        <p>Real returns from real Flexia Premium investors</p>
                    </div>
                    
                    <div class="testimonials-grid">
                        <div class="testimonial-card premium">
                            <div class="testimonial-header">
                                <div class="investor-badge">
                                    <i class="fas fa-crown"></i> PREMIUM INVESTOR
                                </div>
                                <div class="investor-roi">
                                    <span class="roi-badge">523% ROI</span>
                                </div>
                            </div>
                            <div class="testimonial-content">
                                <p>"Invested ₦8,000 in January. By March, I was earning ₦52,000 monthly. 
                                This isn't just gaming - it's a legitimate income stream!"</p>
                                <div class="user-info">
                                    <h4>Emeka C. - Lagos Businessman</h4>
                                    <div class="earnings">
                                        <span class="earning-amount">₦156,000</span>
                                        <span class="earning-period">3 Months Earnings</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="testimonial-card premium">
                            <div class="testimonial-header">
                                <div class="investor-badge">
                                    <i class="fas fa-crown"></i> PREMIUM INVESTOR
                                </div>
                                <div class="investor-roi">
                                    <span class="roi-badge">480% ROI</span>
                                </div>
                            </div>
                            <div class="testimonial-content">
                                <p>"The ₦8,000 registration paid for itself in 2 weeks. 
                                Now I'm earning ₦48,000 monthly from games and referrals!"</p>
                                <div class="user-info">
                                    <h4>Chioma O. - Student, UNILAG</h4>
                                    <div class="earnings">
                                        <span class="earning-amount">₦192,000</span>
                                        <span class="earning-period">4 Months Earnings</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="testimonial-card premium">
                            <div class="testimonial-header">
                                <div class="investor-badge">
                                    <i class="fas fa-crown"></i> PREMIUM INVESTOR
                                </div>
                                <div class="investor-roi">
                                    <span class="roi-badge">600% ROI</span>
                                </div>
                            </div>
                            <div class="testimonial-content">
                                <p>"Built a team of 15 referrals earning me ₦112,500 monthly. 
                                Flexia Premium changed my financial life!"</p>
                                <div class="user-info">
                                    <h4>Tunde A. - Entrepreneur, PH</h4>
                                    <div class="earnings">
                                        <span class="earning-amount">₦450,000</span>
                                        <span class="earning-period">3 Months Earnings</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'payment-methods': `
            <div class="page-content">
                <div class="container">
                    <div class="page-header">
                        <h1>Payment Methods</h1>
                        <p>Secure payment options for your investment</p>
                    </div>
                    
                    <div class="payment-methods">
                        <div class="content-card">
                            <h3><i class="fas fa-university"></i> Bank Transfer</h3>
                            <p>Transfer directly to our corporate bank account. Details will be provided after registration.</p>
                        </div>
                        
                        <div class="content-card">
                            <h3><i class="fas fa-mobile-alt"></i> USSD</h3>
                            <p>Use *737# or other USSD codes from your bank to make instant payments.</p>
                        </div>
                        
                        <div class="content-card">
                            <h3><i class="fas fa-qrcode"></i> QR Payment</h3>
                            <p>Scan QR code with your banking app for instant payment.</p>
                        </div>
                        
                        <div class="content-card">
                            <h3><i class="fas fa-credit-card"></i> Debit Card</h3>
                            <p>Pay securely with your Visa, Mastercard, or Verve card.</p>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'withdrawal-info': `
            <div class="page-content">
                <div class="container">
                    <div class="page-header">
                        <h1>Withdrawal Process</h1>
                        <p>How to withdraw your earnings easily</p>
                    </div>
                    
                    <div class="content-card">
                        <h3><i class="fas fa-wallet"></i> Withdrawal Steps</h3>
                        <ol style="margin-left: 20px; line-height: 2;">
                            <li>Login to your Flexia Premium account</li>
                            <li>Navigate to "Withdraw Funds" section</li>
                            <li>Enter amount (minimum ₦500)</li>
                            <li>Select your bank account</li>
                            <li>Confirm withdrawal request</li>
                            <li>Receive funds within 24 hours</li>
                        </ol>
                    </div>
                    
                    <div class="content-card">
                        <h3><i class="fas fa-clock"></i> Processing Times</h3>
                        <ul style="margin-left: 20px; line-height: 2;">
                            <li><strong>Priority Members:</strong> 2-6 hours</li>
                            <li><strong>Standard Members:</strong> 12-24 hours</li>
                            <li><strong>Weekends:</strong> Next business day</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    };

    return pages[pageId] || '';
}
