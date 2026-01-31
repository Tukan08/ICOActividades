/**
 * ICO Kids Portal - JavaScript
 * Enhanced interactivity and animations
 */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeNavigation();
});

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
