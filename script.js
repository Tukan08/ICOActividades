/**
 * ICO Kids Portal - JavaScript
 * Enhanced interactivity and animations
 */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeNavigation();
    initializeWeekTabs();
});

/**
 * Initialize week tab system (Juego / Actividades)
 */
function initializeWeekTabs() {
    // Tab switching
    const tabs = document.querySelectorAll('.week-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');
            // Remove active from all tabs and contents
            document.querySelectorAll('.week-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            // Activate clicked tab and its content
            this.classList.add('active');
            const targetContent = document.getElementById('tab-' + targetTab);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // Session buttons
    const sessionBtns = document.querySelectorAll('.session-btn');
    sessionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const sessionId = this.getAttribute('data-session');
            // Hide sessions list, show session content
            const sessionsList = document.getElementById('sessions-list');
            if (sessionsList) sessionsList.style.display = 'none';
            const sessionContent = document.getElementById(sessionId);
            if (sessionContent) sessionContent.classList.add('active');
        });
    });

    // Back to sessions buttons
    const backBtns = document.querySelectorAll('.back-to-sessions');
    backBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Hide all session contents, show sessions list
            document.querySelectorAll('.session-content').forEach(sc => sc.classList.remove('active'));
            const sessionsList = document.getElementById('sessions-list');
            if (sessionsList) sessionsList.style.display = '';
        });
    });
}

/**
 * Initialize card animations
 */
function initializeAnimations() {
    const cards = document.querySelectorAll('.subject-card, .week-button');

    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Add ripple effect
            createRipple(e, this);
        });
    });
}

/**
 * Create ripple effect on click
 */
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Add ripple styles if not already in CSS
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Initialize navigation enhancements
 */
function initializeNavigation() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Navigate to a specific week page
 */
function navigateToWeek(subjectSlug, weekNumber) {
    const weekPage = `../weeks/${subjectSlug}-semana-${weekNumber}.html`;
    window.location.href = weekPage;
}

/**
 * Navigate back to home
 */
function navigateHome() {
    window.location.href = '../index.html';
}

/**
 * Navigate back to subject
 */
function navigateToSubject(subjectSlug) {
    window.location.href = `../subjects/${subjectSlug}.html`;
}

/**
 * Add smooth scroll behavior
 */
document.documentElement.style.scrollBehavior = 'smooth';
