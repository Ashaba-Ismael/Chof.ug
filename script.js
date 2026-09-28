// ============================================
// POPUP NOTIFICATION SYSTEM
// ============================================
class PopupNotification {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        let container = document.getElementById('popupContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'popupContainer';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 400px;
            `;
            document.body.appendChild(container);
        }
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const popup = document.createElement('div');
        const bgColor = {
            'success': '#4CAF50',
            'error': '#f44336',
            'info': '#2196F3',
            'warning': '#ff9800'
        }[type] || '#2196F3';

        popup.style.cssText = `
            background-color: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
        `;
        popup.textContent = message;
        this.container.appendChild(popup);

        setTimeout(() => {
            popup.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => popup.remove(), 300);
        }, duration);
    }
}

// Initialize popup system
const popupNotification = new PopupNotification();

// Add popup animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .animate-on-scroll {
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SCROLL ANIMATIONS
// ============================================
function observeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards, project items, and about sections
    document.querySelectorAll('.service-card, .project-item, .about-content').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// RIPPLE BUTTON EFFECT
// ============================================
function addRippleEffect() {
    const buttons = document.querySelectorAll('button, .btn, [class*="Btn"]');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = ripple.style.height = size + 'px';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ============================================
// MENU TOGGLE FUNCTIONALITY
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', function() {
    navbar.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navbar.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// INTERACTIVE BUTTONS - LEARN MORE, QUOTE, GET INVOLVED
// ============================================

// Home page Learn More button
const learnMoreBtn = document.getElementById('learnMoreBtn');
const learnMorePanel = document.getElementById('learnMorePanel');

learnMoreBtn.addEventListener('click', function() {
    const isActive = learnMorePanel.classList.toggle('active');
    learnMoreBtn.textContent = isActive ? 'HIDE INFO' : 'LEARN MORE';
    popupNotification.show('Contact information displayed!', 'info', 2000);
});

// About page Learn More button
const aboutLearnBtn = document.getElementById('aboutLearnBtn');
if (aboutLearnBtn) {
    aboutLearnBtn.addEventListener('click', function() {
        const isActive = learnMorePanel.classList.toggle('active');
        learnMoreBtn.textContent = isActive ? 'HIDE INFO' : 'LEARN MORE';
        popupNotification.show('Want to learn more about us? Get in touch!', 'info', 2000);
        if (learnMorePanel.classList.contains('active')) {
            learnMorePanel.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Services "Get a Quote" button
const quoteBtn = document.getElementById('quoteBtn');
if (quoteBtn) {
    quoteBtn.addEventListener('click', function() {
        const isActive = learnMorePanel.classList.toggle('active');
        if (learnMoreBtn) {
            learnMoreBtn.textContent = isActive ? 'HIDE INFO' : 'LEARN MORE';
        }
        quoteBtn.textContent = isActive ? 'HIDE INFO' : 'GET A QUOTE';
        popupNotification.show('We\'ll provide you with a quote shortly!', 'success', 2500);
        if (learnMorePanel.classList.contains('active')) {
            learnMorePanel.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Projects "Get Involved" button
const getInvolvedBtn = document.getElementById('getInvolvedBtn');
const involvedPanel = document.getElementById('involvedPanel');
if (getInvolvedBtn) {
    getInvolvedBtn.addEventListener('click', function() {
        const isActive = involvedPanel.classList.toggle('active');
        getInvolvedBtn.textContent = isActive ? 'HIDE INFO' : 'GET INVOLVED';
        popupNotification.show('Thank you for your interest in our projects!', 'success', 2500);
        if (involvedPanel.classList.contains('active')) {
            involvedPanel.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================
// DYNAMIC FORM HANDLING (WITHOUT PAGE RELOAD)
// ============================================
function setupFormHandlers() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate server request
            setTimeout(() => {
                popupNotification.show('Message sent successfully! We will contact you soon.', 'success', 3000);
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    });
}

// ============================================
// BUTTON HOVER ANIMATIONS
// ============================================
function addButtonAnimations() {
    const buttons = document.querySelectorAll('button, .btn, [id*="Btn"]');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// DYNAMIC CONTENT UPDATE (WITHOUT RELOAD)
// ============================================
function addDynamicUpdates() {
    // Example: Update counter or live data
    const updateElements = document.querySelectorAll('[data-update]');
    updateElements.forEach(element => {
        const updateType = element.getAttribute('data-update');
        if (updateType === 'time') {
            try {
                setInterval(() => {
                    const now = new Date();
                    element.textContent = now.toLocaleTimeString();
                }, 1000);
            } catch (e) {
                // Element not found or invalid
            }
        }
    });
}

// ============================================
// ACTIVE SECTION HIGHLIGHTING
// ============================================
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// ADVANCED BUTTON INTERACTIONS
// ============================================

// Tooltip System
class ButtonTooltip {
    show(button, message) {
        // Remove existing tooltip
        const existing = document.querySelector('.button-tooltip');
        if (existing) existing.remove();

        const tooltip = document.createElement('div');
        tooltip.className = 'button-tooltip';
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            margin-bottom: 8px;
            z-index: 10000;
            animation: tooltipFade 0.3s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.style.animation = 'tooltipFade 0.3s ease-out reverse';
            setTimeout(() => tooltip.remove(), 300);
        }, 2000);
    }
}

const buttonTooltip = new ButtonTooltip();

// Button State Manager
class ButtonStateManager {
    constructor(button) {
        this.button = button;
        this.originalText = button.textContent;
        this.originalHTML = button.innerHTML;
        this.clickCount = 0;
        this.isDisabled = false;
        this.clickHistory = [];
    }

    disable() {
        this.isDisabled = true;
        this.button.disabled = true;
        this.button.style.opacity = '0.6';
        this.button.style.cursor = 'not-allowed';
        this.button.style.pointerEvents = 'none';
    }

    enable() {
        this.isDisabled = false;
        this.button.disabled = false;
        this.button.style.opacity = '1';
        this.button.style.cursor = 'pointer';
        this.button.style.pointerEvents = 'auto';
    }

    setLoading(isLoading) {
        if (isLoading) {
            this.button.innerHTML = `<span class="loader"></span> Processing...`;
            this.disable();
        } else {
            this.button.innerHTML = this.originalHTML;
            this.enable();
        }
    }

    pulse() {
        this.button.style.animation = 'buttonPulse 0.5s ease-out';
        setTimeout(() => {
            this.button.style.animation = '';
        }, 500);
    }

    shake() {
        this.button.style.animation = 'buttonShake 0.4s ease-out';
        setTimeout(() => {
            this.button.style.animation = '';
        }, 400);
    }

    bounce() {
        this.button.style.animation = 'buttonBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            this.button.style.animation = '';
        }, 600);
    }

    incrementClicks() {
        this.clickCount++;
        this.clickHistory.push(Date.now());
        return this.clickCount;
    }

    resetClicks() {
        this.clickCount = 0;
        this.clickHistory = [];
    }
}

// Double-click handler
function addDoubleClickAction(buttonId, action) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    let clickCount = 0;
    let clickTimer;

    button.addEventListener('click', function(e) {
        clickCount++;
        
        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 300);
        } else if (clickCount === 2) {
            clearTimeout(clickTimer);
            clickCount = 0;
            action(button);
        }
    });
}

// Long-press handler
function addLongPressAction(buttonId, onLongPress, duration = 1000) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    let pressTimer = null;
    let isLongPress = false;

    button.addEventListener('mousedown', function() {
        isLongPress = false;
        pressTimer = setTimeout(() => {
            isLongPress = true;
            onLongPress(button);
            popupNotification.show('Long press detected!', 'info', 2000);
        }, duration);
    });

    button.addEventListener('mouseup', function() {
        if (pressTimer) clearTimeout(pressTimer);
    });

    button.addEventListener('mouseleave', function() {
        if (pressTimer) clearTimeout(pressTimer);
    });
}

// Confirmation dialog
function addConfirmationDialog(buttonId) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener('click', function(e) {
        const originalAction = button.onclick;
        button.onclick = null;

        const confirmed = confirm('Are you sure you want to proceed?');
        if (!confirmed) {
            e.preventDefault();
            e.stopPropagation();
            popupNotification.show('Action cancelled', 'warning', 2000);
        } else {
            popupNotification.show('Action confirmed!', 'success', 2000);
        }
        button.onclick = originalAction;
    });
}

// Button click counter display
function addClickCounter(buttonId) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    let count = 0;
    const counter = document.createElement('span');
    counter.className = 'button-counter';
    counter.style.cssText = `
        display: inline-block;
        background: #b4a01b;
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 12px;
        margin-left: 8px;
        opacity: 0;
        transition: opacity 0.3s;
    `;

    button.addEventListener('click', function() {
        count++;
        counter.textContent = count;
        counter.style.opacity = '1';

        // Auto-hide after 3 seconds
        setTimeout(() => {
            counter.style.opacity = '0';
        }, 3000);
    });

    button.appendChild(counter);
}

// Progress button with completion percentage
function addProgressButton(buttonId, duration = 3000) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    const progressBar = document.createElement('div');
    progressBar.className = 'button-progress';
    progressBar.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #b4a01b, #ffd700);
        width: 0;
        border-radius: 2px;
        display: none;
    `;

    button.style.position = 'relative';
    button.appendChild(progressBar);

    button.addEventListener('click', function() {
        progressBar.style.display = 'block';
        progressBar.style.width = '0';
        
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            progressBar.style.width = progress + '%';

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    progressBar.style.display = 'none';
                }, 500);
            }
        }, 50);
    });
}

// Keyboard accessibility for buttons
function addKeyboardSupport() {
    document.addEventListener('keydown', function(e) {
        const focusedElement = document.activeElement;
        
        if ((e.key === 'Enter' || e.key === ' ') && 
            (focusedElement.tagName === 'BUTTON' || focusedElement.id.includes('Btn'))) {
            e.preventDefault();
            focusedElement.click();
        }
    });
}

// Button combination sequences (Konami code style)
function addButtonSequence(sequence, callback) {
    let currentIndex = 0;
    const sequenceMap = new Map();

    sequence.forEach(id => {
        if (!sequenceMap.has(id)) {
            sequenceMap.set(id, []);
        }
        sequenceMap.get(id).push(currentIndex);
        currentIndex++;
    });

    Object.keys(sequenceMap).forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', function() {
                const indices = sequenceMap.get(id);
                if (indices.includes(currentIndex)) {
                    currentIndex++;
                    if (currentIndex >= sequence.length) {
                        callback();
                        currentIndex = 0;
                        popupNotification.show('Sequence Complete! 🎉', 'success', 2500);
                    }
                } else {
                    currentIndex = 0;
                }
            });
        }
    });
}

// Add button glow effect
function addGlowEffect(buttonId) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 20px rgba(180, 160, 27, 0.6)';
    });

    button.addEventListener('blur', function() {
        this.style.boxShadow = '';
    });
}

// Hover delay tooltip
function addHoverTooltip(buttonId, message) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    let hoverTimeout;

    button.addEventListener('mouseenter', function() {
        hoverTimeout = setTimeout(() => {
            buttonTooltip.show(button, message);
        }, 500);
    });

    button.addEventListener('mouseleave', function() {
        clearTimeout(hoverTimeout);
    });
}

// Add animations to CSS
const advancedStyle = document.createElement('style');
advancedStyle.textContent = `
    @keyframes buttonPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    @keyframes buttonShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    @keyframes buttonBounce {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }

    @keyframes tooltipFade {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .loader {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 8px;
    }

    .button-tooltip {
        animation: tooltipFade 0.3s ease-out;
    }

    .button-counter {
        animation: countPop 0.3s ease-out;
    }

    @keyframes countPop {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }

    button:focus-visible {
        outline: 3px solid rgba(180, 160, 27, 0.5);
        outline-offset: 2px;
    }

    .button-progress {
        box-shadow: 0 0 5px rgba(180, 160, 27, 0.5);
    }
`;
document.head.appendChild(advancedStyle);

// ============================================
// INITIALIZE ALL FEATURES ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    observeScrollAnimations();
    addRippleEffect();
    setupFormHandlers();
    addButtonAnimations();
    addDynamicUpdates();
    highlightActiveSection();
    addKeyboardSupport();
    popupNotification.show('Welcome to Chof Ug!', 'success', 2000);

    // ============================================
    // ENHANCED BUTTON INTERACTIONS
    // ============================================

    // Learn More Button - Advanced Interactions
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        const learnMoreState = new ButtonStateManager(learnMoreBtn);
        
        // Add glow effect on focus
        addGlowEffect('learnMoreBtn');
        
        // Add hover tooltip
        addHoverTooltip('learnMoreBtn', 'Click to reveal contact information');
        
        // Add progress bar
        addProgressButton('learnMoreBtn', 2500);
        
        // Add click counter
        addClickCounter('learnMoreBtn');

        // Double-click for special action
        addDoubleClickAction('learnMoreBtn', function(btn) {
            learnMoreState.bounce();
            popupNotification.show('Double-click detected! Panel toggled!', 'warning', 2000);
        });

        // Long-press effect
        addLongPressAction('learnMoreBtn', function(btn) {
            learnMoreState.pulse();
        }, 1500);
    }

    // About Learn Button - Advanced Interactions
    const aboutLearnBtn = document.getElementById('aboutLearnBtn');
    if (aboutLearnBtn) {
        const aboutState = new ButtonStateManager(aboutLearnBtn);
        addGlowEffect('aboutLearnBtn');
        addHoverTooltip('aboutLearnBtn', 'Learn more about our mission and values');
        addProgressButton('aboutLearnBtn', 2500);
        addClickCounter('aboutLearnBtn');

        addDoubleClickAction('aboutLearnBtn', function(btn) {
            aboutState.bounce();
            popupNotification.show('Special: Fast navigation activated!', 'info', 2000);
        });
    }

    // Quote Button - Advanced Interactions
    const quoteBtn = document.getElementById('quoteBtn');
    if (quoteBtn) {
        const quoteState = new ButtonStateManager(quoteBtn);
        addGlowEffect('quoteBtn');
        addHoverTooltip('quoteBtn', 'Get a personalized quote for our services');
        addProgressButton('quoteBtn', 3000);
        addClickCounter('quoteBtn');

        // Long-press animation
        addLongPressAction('quoteBtn', function(btn) {
            quoteState.shake();
            popupNotification.show('Quote request initiated!', 'success', 2000);
        }, 1200);

        // Double-click effect
        addDoubleClickAction('quoteBtn', function(btn) {
            quoteState.bounce();
            popupNotification.show('Express quote requested!', 'warning', 2000);
        });
    }

    // Get Involved Button - Advanced Interactions
    const getInvolvedBtn = document.getElementById('getInvolvedBtn');
    if (getInvolvedBtn) {
        const involvedState = new ButtonStateManager(getInvolvedBtn);
        addGlowEffect('getInvolvedBtn');
        addHoverTooltip('getInvolvedBtn', 'Join us in making a difference');
        addProgressButton('getInvolvedBtn', 3000);
        addClickCounter('getInvolvedBtn');

        // Long-press effect
        addLongPressAction('getInvolvedBtn', function(btn) {
            involvedState.pulse();
            popupNotification.show('Interest in volunteering noted!', 'success', 2000);
        }, 1500);

        // Double-click for quick action
        addDoubleClickAction('getInvolvedBtn', function(btn) {
            involvedState.bounce();
            popupNotification.show('Quick involvement option selected!', 'info', 2000);
        });
    }

    // Donate Now button behavior
    const donateNowBtn = document.getElementById('donateNowBtn');
    const donatePanel = document.getElementById('donatePanel');
    if (donateNowBtn && donatePanel) {
        addGlowEffect('donateNowBtn');
        addHoverTooltip('donateNowBtn', 'View donation instructions and bank details');

        donateNowBtn.addEventListener('click', function() {
            const isActive = donatePanel.classList.toggle('active');
            donateNowBtn.classList.toggle('active', isActive);
            donateNowBtn.textContent = 'DONATE NOW';
            if (isActive) {
                donatePanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                popupNotification.show('Donation details are now visible.', 'success', 2200);
            } else {
                popupNotification.show('Donation details hidden.', 'info', 2000);
            }
        });
    }

    // Thank You button behavior
    const thankYouBtn = document.getElementById('thankYouBtn');
    if (thankYouBtn) {
        addGlowEffect('thankYouBtn');
        addHoverTooltip('thankYouBtn', 'Send your appreciation to the Chof team');

        thankYouBtn.addEventListener('click', function() {
            this.classList.add('active');
            popupNotification.show('Thank you for supporting Chof Ug!', 'success', 2500);
            setTimeout(() => {
                this.classList.remove('active');
            }, 800);
        });
    }

    // Menu Toggle - Enhanced Interactions
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        const menuState = new ButtonStateManager(menuToggle);
        addGlowEffect('menuToggle');

        menuToggle.addEventListener('click', function() {
            menuState.pulse();
        });
    }

    // ============================================
    // BUTTON SEQUENCE (Easter Egg)
    // ============================================
    // Example: Click buttons in sequence for Easter egg
    try {
        addButtonSequence(
            ['learnMoreBtn', 'aboutLearnBtn', 'quoteBtn', 'getInvolvedBtn'],
            function() {
                popupNotification.show('🎊 You discovered the secret sequence! Amazing!', 'success', 3000);
            }
        );
    } catch (e) {
        console.log('Sequence feature ready');
    }

    // ============================================
    // NAVIGATION LINK INTERACTIONS
    // ============================================
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + L for Learn More
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            const btn = document.getElementById('learnMoreBtn');
            if (btn) {
                btn.click();
                popupNotification.show('Keyboard shortcut: Learn More activated!', 'info', 2000);
            }
        }

        // Ctrl/Cmd + Q for Quote
        if ((e.ctrlKey || e.metaKey) && e.key === 'q') {
            e.preventDefault();
            const btn = document.getElementById('quoteBtn');
            if (btn) {
                btn.click();
                popupNotification.show('Keyboard shortcut: Get a Quote activated!', 'info', 2000);
            }
        }

        // Ctrl/Cmd + I for Get Involved
        if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
            e.preventDefault();
            const btn = document.getElementById('getInvolvedBtn');
            if (btn) {
                btn.click();
                popupNotification.show('Keyboard shortcut: Get Involved activated!', 'info', 2000);
            }
        }
    });

    // ============================================
    // SCROLL-TRIGGERED BUTTON ANIMATIONS
    // ============================================
    window.addEventListener('scroll', function() {
        const buttons = document.querySelectorAll('button, [id*="Btn"]');
        buttons.forEach(button => {
            const rect = button.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !button.hasAttribute('data-animated')) {
                button.style.animation = 'fadeInUp 0.6s ease-out';
                button.setAttribute('data-animated', 'true');
            }
        });
    });
});
