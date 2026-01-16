// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Canvas animation for hero section (replaces video for better performance)
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system for lightweight animation
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 150;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: i % 3 === 0 ? '#8a2be2' : '#00eeff'
        });
    }
    
    function animate() {
        // Clear with semi-transparent overlay for trail effect
        ctx.fillStyle = 'rgba(10, 5, 20, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);        
        // Update and draw particles
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Animate stats on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/,/g, ''));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateStat = () => {
                current += increment;
                if (current < target) {
                    if (stat.textContent.includes('₦')) {
                        stat.textContent = '₦' + Math.ceil(current).toLocaleString();
                    } else if (stat.textContent.includes('%')) {
                        stat.textContent = Math.ceil(current) + '%';
                    } else {
                        stat.textContent = Math.ceil(current).toLocaleString();
                    }
                    requestAnimationFrame(updateStat);
                } else {
                    if (stat.textContent.includes('₦')) {
                        stat.textContent = '₦' + target.toLocaleString();
                    } else if (stat.textContent.includes('%')) {
                        stat.textContent = target + '%';
                    } else {                        stat.textContent = target.toLocaleString();
                    }
                }
            };
            
            updateStat();
        });
    };
    
    // Check if stats are in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.stats'));
});