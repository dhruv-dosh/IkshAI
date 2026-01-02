/**
 * IKSH AI Website - Interactive Features
 * Smooth scrolling, animations, and mobile menu
 */

// ============================================
// Smooth Scroll Navigation
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navLinks = document.getElementById('nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navbar.classList.remove('menu-open');
            }
        }
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================

const navbar = document.getElementById('navbar');
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    }, 10);
}, { passive: true });

// ============================================
// Mobile Menu Toggle
// ============================================

const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    navbar.classList.toggle('menu-open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        navbar.classList.remove('menu-open');
    }
});

// ============================================
// Intersection Observer for Scroll Animations
// ============================================

const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-in class
const animateElements = document.querySelectorAll('.animate-in');
animateElements.forEach(element => {
    observer.observe(element);
});

// ============================================
// Enhanced Blob Animation on Mouse Move
// ============================================

let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;
let mouseMoveTimeout;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;

    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
        isMouseMoving = false;
    }, 100);
}, { passive: true });

// Subtle blob movement based on mouse position
function updateBlobPositions() {
    if (isMouseMoving && window.innerWidth > 768) {
        const blobs = document.querySelectorAll('.blob');
        const moveX = (mouseX / window.innerWidth - 0.5) * 30;
        const moveY = (mouseY / window.innerHeight - 0.5) * 30;

        blobs.forEach((blob, index) => {
            const multiplier = (index + 1) * 0.3;
            blob.style.transform = `translate(${moveX * multiplier}px, ${moveY * multiplier}px)`;
        });
    }

    requestAnimationFrame(updateBlobPositions);
}

// Start blob animation
updateBlobPositions();

// ============================================
// Performance Optimization
// ============================================

// Debounce function for scroll events
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

// ============================================
// Page Load Animation
// ============================================

window.addEventListener('load', () => {
    // Trigger initial animations for hero section
    const heroElements = document.querySelectorAll('.hero .animate-in');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, 100 * index);
    });
});

// ============================================
// Smooth Scroll to Top on Page Load
// ============================================

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// ============================================
// Console Welcome Message
// ============================================

console.log(
    '%c👋 Welcome to IKSH AI!',
    'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
);

console.log(
    '%cInterested in our AI solutions? Visit us at: Iksh.AI.Tech@gmail.com',
    'font-size: 14px; color: #6B6B6B;'
);

// ============================================
// Display Current Date in Hero Section (Dotted LED Style)
// ============================================

function updateHeroDate() {
    const heroDate = document.getElementById('heroDate');
    const navbarDate = document.getElementById('navbarDate');
    const dateCounter = document.getElementById('dateCounter');

    const navbarYear = document.getElementById('navbarYear');

    if (heroDate || dateCounter || navbarDate || navbarYear) {
        const now = new Date();
        const dayNumber = String(now.getDate()).padStart(2, '0');
        const year = String(now.getFullYear()).slice(-2);

        // Update date display
        if (heroDate) {
            heroDate.textContent = dayNumber;
        }

        // Update date counter
        if (dateCounter) {
            dateCounter.textContent = dayNumber;
        }

        // Update navbar date
        if (navbarDate) {
            navbarDate.textContent = dayNumber;
        }

        // Update navbar year
        if (navbarYear) {
            navbarYear.textContent = year;
        }
    }
}

// Update date when page loads
updateHeroDate();
// ============================================
// Contact Form Handling with Web3Forms
// ============================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        formMessage.classList.remove('success', 'error');
        formMessage.style.display = 'none';

        try {
            const formData = new FormData(contactForm);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                // Show success message
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
                formMessage.classList.add('success');
                formMessage.style.display = 'block';

                // Reset form
                contactForm.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                throw new Error(data.message || 'Form submission failed');
            }
        } catch (error) {
            // Show error message
            formMessage.textContent = 'Oops! Something went wrong. Please try again or email us directly at Iksh.AI.Tech@gmail.com';
            formMessage.classList.add('error');
            formMessage.style.display = 'block';

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
// ============================================
// Magnifying Glass Effect for About Page
// ============================================
// Magnifying Glass Effect - DISABLED

document.addEventListener('DOMContentLoaded', () => {
    // Only run on actual About page
    const isAboutPage = window.location.pathname.includes('about.html');
    if (!isAboutPage) return;

    const aboutSection = document.querySelector('.about-hero');
    if (!aboutSection) return;

    // Create magnifier lens
    const lens = document.createElement('div');
    lens.classList.add('magnifier-lens');
    document.body.appendChild(lens);

    const ZOOM_LEVEL = 2;
    const LENS_SIZE = 150;

    // Text elements to magnify
    const textElements = document.querySelectorAll('.about-hero p, .about-hero h1, .about-card p, .about-card h3');

    document.addEventListener('mousemove', (e) => {
        // Check if hovering over text elements
        let target = e.target;
        let validHover = false;

        while (target && target !== document.body) {
            if (target.matches('.about-hero p, .about-hero h1, .about-card p, .about-card h3')) {
                validHover = true;
                break;
            }
            target = target.parentElement;
        }

        if (validHover && target) {
            lens.style.display = 'block';
            lens.style.opacity = '1';

            // Position lens at cursor
            const lensX = e.pageX - LENS_SIZE / 2;
            const lensY = e.pageY - LENS_SIZE / 2;

            lens.style.left = lensX + 'px';
            lens.style.top = lensY + 'px';

            // Get target element position
            const rect = target.getBoundingClientRect();

            // Calculate the area of the target that should be visible in the lens
            const sourceX = e.clientX - rect.left;
            const sourceY = e.clientY - rect.top;

            // Clone the target element
            const clone = target.cloneNode(true);
            lens.innerHTML = '';
            lens.appendChild(clone);

            // Style the clone
            const computedStyle = window.getComputedStyle(target);
            clone.style.position = 'absolute';
            clone.style.margin = '0';
            clone.style.padding = computedStyle.padding;
            clone.style.width = rect.width + 'px';
            clone.style.fontSize = computedStyle.fontSize;
            clone.style.fontFamily = computedStyle.fontFamily;
            clone.style.fontWeight = computedStyle.fontWeight;
            clone.style.color = computedStyle.color;
            clone.style.lineHeight = computedStyle.lineHeight;
            clone.style.letterSpacing = computedStyle.letterSpacing;
            clone.style.textAlign = computedStyle.textAlign;
            clone.style.whiteSpace = computedStyle.whiteSpace;

            // Apply zoom
            clone.style.transform = `scale(${ZOOM_LEVEL})`;
            clone.style.transformOrigin = 'top left';

            // Position the clone so the point under cursor appears centered
            const offsetX = LENS_SIZE / 2 - (sourceX * ZOOM_LEVEL);
            const offsetY = LENS_SIZE / 2 - (sourceY * ZOOM_LEVEL);

            clone.style.left = offsetX + 'px';
            clone.style.top = offsetY + 'px';

        } else {
            lens.style.opacity = '0';
            setTimeout(() => {
                if (lens.style.opacity === '0') {
                    lens.style.display = 'none';
                }
            }, 200);
        }
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     // Only run on About page - check if we're on about.html
//     const isAboutPage = window.location.pathname.endsWith('about.html');

//     if (!isAboutPage) return; // Exit if not on about page

//     // Create magnifier lens
//     const lens = document.createElement('div');
//     lens.classList.add('magnifier-lens');
//     document.body.appendChild(lens);

//     const ZOOM_LEVEL = 2;
//     const LENS_SIZE = 150;

//     document.addEventListener('mousemove', (e) => {
//         // Check if hovering over a button or interactive element
//         let target = e.target;
//         let isExcluded = false;

//         // Check if target or any parent is a button or excluded element
//         while (target && target !== document.body) {
//             if (target.matches('button, a, input, textarea, select, .btn, [role="button"]')) {
//                 isExcluded = true;
//                 break;
//             }
//             target = target.parentElement;
//         }

//         // Reset target to actual element
//         target = e.target;

//         // Find the closest text-containing element
//         while (target && target !== document.body) {
//             const hasText = target.childNodes && Array.from(target.childNodes).some(
//                 node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
//             );

//             if (hasText || target.matches('p, h1, h2, h3, h4, h5, h6, span, div, li, td, th')) {
//                 break;
//             }
//             target = target.parentElement;
//         }

//         const validHover = !isExcluded && target && target !== document.body;

//         if (validHover) {
//             lens.style.display = 'block';
//             lens.style.opacity = '1';

//             // Position lens at cursor
//             const lensX = e.pageX - LENS_SIZE / 2;
//             const lensY = e.pageY - LENS_SIZE / 2;

//             lens.style.left = lensX + 'px';
//             lens.style.top = lensY + 'px';

//             // Get target element position
//             const rect = target.getBoundingClientRect();

//             // Calculate the area of the target that should be visible in the lens
//             const sourceX = e.clientX - rect.left;
//             const sourceY = e.clientY - rect.top;

//             // Clone the target element
//             const clone = target.cloneNode(true);
//             lens.innerHTML = '';
//             lens.appendChild(clone);

//             // Style the clone
//             const computedStyle = window.getComputedStyle(target);
//             clone.style.position = 'absolute';
//             clone.style.margin = '0';
//             clone.style.padding = computedStyle.padding;
//             clone.style.width = rect.width + 'px';
//             clone.style.fontSize = computedStyle.fontSize;
//             clone.style.fontFamily = computedStyle.fontFamily;
//             clone.style.fontWeight = computedStyle.fontWeight;
//             clone.style.color = computedStyle.color;
//             clone.style.lineHeight = computedStyle.lineHeight;
//             clone.style.letterSpacing = computedStyle.letterSpacing;
//             clone.style.textAlign = computedStyle.textAlign;
//             clone.style.whiteSpace = computedStyle.whiteSpace;
//             clone.style.backgroundColor = computedStyle.backgroundColor;

//             // Apply zoom
//             clone.style.transform = `scale(${ZOOM_LEVEL})`;
//             clone.style.transformOrigin = 'top left';

//             // Position the clone so the point under cursor appears centered
//             const offsetX = LENS_SIZE / 2 - (sourceX * ZOOM_LEVEL);
//             const offsetY = LENS_SIZE / 2 - (sourceY * ZOOM_LEVEL);

//             clone.style.left = offsetX + 'px';
//             clone.style.top = offsetY + 'px';

//         } else {
//             lens.style.opacity = '0';
//             setTimeout(() => {
//                 if (lens.style.opacity === '0') {
//                     lens.style.display = 'none';
//                 }
//             }, 200);
//         }
//     });
// });




//Contact hover in index page
document.addEventListener('DOMContentLoaded', () => {
    // Only run on Index page
    const isIndexPage = window.location.pathname.endsWith('index.html') ||
        window.location.pathname.endsWith('home.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/');

    if (!isIndexPage) return;

    // Create the "Let's Connect" popup
    const connectPopup = document.createElement('div');
    connectPopup.classList.add('connect-popup');
    connectPopup.innerHTML = `
        <div class="connect-content">
            <div class="connect-icon">▶ </div>
            <div class="connect-text"> EXPLORE MORE</div>
        </div>
    `;
    document.body.appendChild(connectPopup);

    const OFFSET_X = 30; // Distance from cursor horizontally
    const OFFSET_Y = 30; // Distance from cursor vertically

    // Show popup and follow cursor
    document.addEventListener('mousemove', (e) => {
        // Check if hovering over "Know More" button or any link/button
        let target = e.target;
        let isOverButton = false;

        while (target && target !== document.body) {
            if (target.matches('a, button, .btn, [role="button"]')) {
                isOverButton = true;
                break;
            }
            target = target.parentElement;
        }

        if (isOverButton) {
            // Hide popup when over button
            connectPopup.style.opacity = '0';
            connectPopup.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (connectPopup.style.opacity === '0') {
                    connectPopup.style.display = 'none';
                }
            }, 200);
        } else {
            // Show popup
            connectPopup.style.display = 'flex';

            // Position popup with more distance from cursor
            connectPopup.style.left = (e.clientX + OFFSET_X) + 'px';
            connectPopup.style.top = (e.clientY + OFFSET_Y) + 'px';

            connectPopup.style.opacity = '1';
            connectPopup.style.transform = 'scale(1)';
        }
    });

    // Redirect to contact page on any click (but not on buttons/links)
    document.addEventListener('click', (e) => {
        let target = e.target;
        let isButton = false;

        while (target && target !== document.body) {
            if (target.matches('a, button, .btn, [role="button"]')) {
                isButton = true;
                break;
            }
            target = target.parentElement;
        }

        // Only redirect if not clicking on a button/link
        if (!isButton) {
            window.location.href = 'about.html';
        }
    });

    // Hide popup when mouse leaves the page
    document.addEventListener('mouseleave', () => {
        connectPopup.style.opacity = '0';
        connectPopup.style.transform = 'scale(0.8)';
        setTimeout(() => {
            connectPopup.style.display = 'none';
        }, 200);
    });
});

// ============================================
// Contact Form Popup Toggle for About Page
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const contactTrigger = document.getElementById('contactTrigger');
    const navContactLink = document.getElementById('navContactLink'); // Navbar link
    const contactCard = document.getElementById('contactCard');
    const contactOverlay = document.getElementById('contactOverlay');
    const closeContact = document.getElementById('closeContact');

    if (contactCard && closeContact) {
        // Function to open popup
        const openPopup = (e) => {
            e.preventDefault();
            contactCard.classList.remove('hidden');
            if (contactOverlay) contactOverlay.classList.remove('hidden');
        };

        // Trigger 1: All elements with class 'about-message-button' or ID 'contactTrigger'
        const triggers = document.querySelectorAll('.about-message-button, #contactTrigger');
        triggers.forEach(trigger => {
            trigger.addEventListener('click', openPopup);
        });

        // Trigger 2: Navbar Link
        if (navContactLink) {
            navContactLink.addEventListener('click', openPopup);
        }

        // Close Popup
        closeContact.addEventListener('click', (e) => {
            e.preventDefault();
            contactCard.classList.add('hidden');
            if (contactOverlay) contactOverlay.classList.add('hidden');
        });

        // Close if clicking the overlay
        if (contactOverlay) {
            contactOverlay.addEventListener('click', () => {
                contactCard.classList.add('hidden');
                contactOverlay.classList.add('hidden');
            });
        }
    }
});

// ============================================
// Horizontal Service List Observer
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.service-scroll-container');
    const serviceItems = document.querySelectorAll('.service-item');

    if (scrollContainer && serviceItems.length > 0) {

        const observerOptions = {
            root: scrollContainer,
            threshold: 0.5,
            rootMargin: "0px -25% 0px -25%" // Focus on center 50% horizontally
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    serviceItems.forEach(item => item.classList.remove('active'));
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        serviceItems.forEach(item => {
            observer.observe(item);
        });

        // Default to second card on load - ONLY ON SERVICES PAGE
        if (serviceItems.length > 1 && window.location.pathname.includes('services.html')) {
            setTimeout(() => {
                serviceItems[1].scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest'
                });
            }, 100);
        }
    }
});