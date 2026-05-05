document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Basic)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
            // In a real production app, we'd use a class and handle transitions in CSS
        });
    }

    // Scroll Animation (Intersection Observer)
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a counter, start counting
                if (entry.target.querySelector('.counter')) {
                    startCounters(entry.target);
                }
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // Counter Animation
    function startCounters(container) {
        const counters = container.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 50; // Speed of counting

            if (count < target) {
                const updateCount = () => {
                    const current = +counter.innerText;
                    if (current < target) {
                        counter.innerText = Math.ceil(current + increment);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target + (target >= 50000 ? '+' : '');
                    }
                };
                updateCount();
            }
        });
    }

    // Smooth Scrolling for Nav Links
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

    // Form Submission (Simulated)
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = volunteerForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Thank you for reaching out! InAmigos Foundation will contact you soon.');
                volunteerForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // Payment Modal Logic
    const supportBtn = document.getElementById('open-support-btn');
    const paymentModal = document.getElementById('payment-modal');
    const closeModal = document.querySelector('.close-modal');
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount-input');
    const payAmountDisplay = document.getElementById('pay-amount-display');
    const paymentForm = document.getElementById('payment-form');

    if (supportBtn && paymentModal) {
        supportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            paymentModal.classList.add('active');
        });

        closeModal.addEventListener('click', () => {
            paymentModal.classList.remove('active');
        });

        // Close on clicking outside the modal content
        paymentModal.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                paymentModal.classList.remove('active');
            }
        });

        // Amount selection
        let currentAmount = 1000;
        
        amountBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                amountBtns.forEach(b => b.classList.remove('active'));
                customAmountInput.value = ''; // clear custom
                // Add active to clicked
                btn.classList.add('active');
                currentAmount = btn.getAttribute('data-amount');
                payAmountDisplay.innerText = currentAmount;
            });
        });

        // Custom amount input
        customAmountInput.addEventListener('input', (e) => {
            amountBtns.forEach(b => b.classList.remove('active'));
            if (e.target.value) {
                currentAmount = e.target.value;
            } else {
                currentAmount = 0;
            }
            payAmountDisplay.innerText = currentAmount;
        });

        // Payment submission
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (currentAmount < 100) {
                alert('Minimum donation amount is ₹100.');
                return;
            }
            const btn = paymentForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;

            // Simulate Payment Gateway Redirect
            setTimeout(() => {
                alert(`Thank you for your generous donation of ₹${currentAmount}!`);
                paymentModal.classList.remove('active');
                paymentForm.reset();
                amountBtns[1].click(); // reset to 1000
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        });
    }

    // Know More Modal Logic
    const knowMoreBtn = document.getElementById('open-knowmore-btn');
    const knowMoreModal = document.getElementById('knowmore-modal');
    const closeKnowMore = document.querySelector('.close-knowmore');

    if (knowMoreBtn && knowMoreModal) {
        knowMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            knowMoreModal.classList.add('active');
        });

        closeKnowMore.addEventListener('click', () => {
            knowMoreModal.classList.remove('active');
        });

        knowMoreModal.addEventListener('click', (e) => {
            if (e.target === knowMoreModal) {
                knowMoreModal.classList.remove('active');
            }
        });
    }
});
