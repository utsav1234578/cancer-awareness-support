// ============================================
// QUOTES SYSTEM - 10 LOCAL QUOTES
// ============================================

// 10 Inspirational Quotes
const QUOTES = [
    {
        content: "Hope is being able to see that there is light despite all of the darkness.",
        author: "Desmond Tutu"
    },
    {
        content: "You never know how strong you are until being strong is your only choice.",
        author: "Bob Marley"
    },
    {
        content: "The human spirit is stronger than anything that can happen to it.",
        author: "C.C. Scott"
    },
    {
        content: "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying, 'I will try again tomorrow.'",
        author: "Mary Anne Radmacher"
    },
    {
        content: "Every day may not be good, but there's something good in every day.",
        author: "Alice Morse Earle"
    },
    {
        content: "The only way out is through. Keep going, keep fighting, keep believing.",
        author: "Unknown"
    },
    {
        content: "You are braver than you believe, stronger than you seem, and smarter than you think.",
        author: "A.A. Milne"
    },
    {
        content: "In the middle of difficulty lies opportunity. Every challenge is a chance to grow stronger.",
        author: "Albert Einstein"
    },
    {
        content: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela"
    },
    {
        content: "Your present circumstances don't determine where you can go; they merely determine where you start.",
        author: "Nido Qubein"
    }
];

let currentQuoteIndex = 0;
let quoteTimer;
let timeRemaining = 10;

// DOM Elements
const quoteTextEl = document.getElementById('quoteText');
const quoteAuthorEl = document.getElementById('quoteAuthor');
const nextQuoteBtn = document.getElementById('nextQuoteBtn');
const timerTextEl = document.getElementById('timerText');

/**
 * Display a quote by index
 */
function displayQuote(index) {
    if (quoteTextEl && quoteAuthorEl) {
        const quote = QUOTES[index];
        quoteTextEl.textContent = `"${quote.content}"`;
        quoteAuthorEl.textContent = quote.author;
        
        // Add fade animation
        quoteTextEl.style.opacity = '0';
        quoteAuthorEl.style.opacity = '0';
        
        setTimeout(() => {
            quoteTextEl.style.transition = 'opacity 0.5s ease';
            quoteAuthorEl.style.transition = 'opacity 0.5s ease';
            quoteTextEl.style.opacity = '1';
            quoteAuthorEl.style.opacity = '1';
        }, 100);
    }
}

/**
 * Get next quote (rotates through all 10 quotes)
 */
function getNextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % QUOTES.length;
    displayQuote(currentQuoteIndex);
    resetTimer();
}

/**
 * Reset and start the auto-refresh timer
 */
function resetTimer() {
    timeRemaining = 10;
    updateTimerDisplay();
    
    // Clear existing timer
    if (quoteTimer) {
        clearInterval(quoteTimer);
    }
    
    // Start countdown
    quoteTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(quoteTimer);
            getNextQuote();
        }
    }, 1000);
}

/**
 * Update the timer display
 */
function updateTimerDisplay() {
    if (timerTextEl) {
        timerTextEl.textContent = `Next quote in ${timeRemaining}s`;
    }
}

// Event listener for "Next Quote" button
if (nextQuoteBtn) {
    nextQuoteBtn.addEventListener('click', () => {
        clearInterval(quoteTimer);
        getNextQuote();
    });
}

// Initialize quotes when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Start with random quote
    currentQuoteIndex = Math.floor(Math.random() * QUOTES.length);
    displayQuote(currentQuoteIndex);
    resetTimer();
});

// ============================================
// CONTACT FORM VALIDATION & HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const successMessage = document.getElementById('successMessage');

/**
 * Validate email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate name (at least 2 characters, letters and spaces only)
 */
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name.trim());
}

/**
 * Validate message (at least 10 characters)
 */
function validateMessage(message) {
    return message.trim().length >= 10;
}

/**
 * Clear all error messages
 */
function clearErrors() {
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (messageError) messageError.textContent = '';
    
    // Remove error styling
    [nameInput, emailInput, messageInput].forEach(input => {
        if (input) {
            input.style.borderColor = '';
        }
    });
}

/**
 * Show error message for a field
 */
function showError(input, errorEl, message) {
    if (errorEl) {
        errorEl.textContent = message;
    }
    if (input) {
        input.style.borderColor = '#dc3545';
    }
}

/**
 * Handle form submission
 */
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        let isValid = true;
        
        // Validate name
        if (!name) {
            showError(nameInput, nameError, 'Name is required');
            isValid = false;
        } else if (!validateName(name)) {
            showError(nameInput, nameError, 'Name must be at least 2 characters and contain only letters');
            isValid = false;
        }
        
        // Validate email
        if (!email) {
            showError(emailInput, emailError, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!message) {
            showError(messageInput, messageError, 'Message is required');
            isValid = false;
        } else if (!validateMessage(message)) {
            showError(messageInput, messageError, 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        // If form is valid, save to JSON and show success message
        if (isValid) {
            // Create form data object
            const formData = {
                id: Date.now().toString(),
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toISOString(),
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            };
            
            // Save to localStorage (client-side storage)
            saveFormDataToStorage(formData);
            
            // In a real application, you would also send this data to a server
            console.log('Form submitted and saved:', formData);
            
            // Show success message
            if (successMessage) {
                successMessage.textContent = `Thank you, ${name}! Your message has been received and saved successfully. We'll get back to you soon.`;
                successMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }
        }
    });
}

// Real-time validation feedback
if (nameInput) {
    nameInput.addEventListener('blur', () => {
        const name = nameInput.value.trim();
        if (name && !validateName(name)) {
            showError(nameInput, nameError, 'Name must be at least 2 characters and contain only letters');
        } else if (name) {
            clearErrors();
        }
    });
}

if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email && !validateEmail(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
        } else if (email) {
            clearErrors();
        }
    });
}

if (messageInput) {
    messageInput.addEventListener('blur', () => {
        const message = messageInput.value.trim();
        if (message && !validateMessage(message)) {
            showError(messageInput, messageError, 'Message must be at least 10 characters long');
        } else if (message) {
            clearErrors();
        }
    });
}

// Clear errors when user starts typing
[nameInput, emailInput, messageInput].forEach(input => {
    if (input) {
        input.addEventListener('input', () => {
            if (input.style.borderColor === 'rgb(220, 53, 69)') {
                const errorEl = document.getElementById(input.id + 'Error');
                if (errorEl) {
                    errorEl.textContent = '';
                }
                input.style.borderColor = '';
            }
        });
    }
});

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
}

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

window.addEventListener('scroll', toggleBackToTop);

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================
const observerOptions = {
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

// Observe all fade-in-up elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
});

// ============================================
// ANIMATED COUNTERS FOR STATISTICS
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

// ============================================
// TESTIMONIALS SLIDER
// ============================================
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected testimonial
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
    }
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }
    
    currentTestimonial = index;
}

// Auto-rotate testimonials
function autoRotateTestimonials() {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000); // Change every 5 seconds
}

// Dot click handlers
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Initialize testimonials slider
if (testimonialCards.length > 0) {
    showTestimonial(0);
    autoRotateTestimonials();
}

// ============================================
// NEWSLETTER FORM HANDLING
// ============================================
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMessage = document.getElementById('newsletterMessage');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterEmail.value.trim();
        
        // Simple email validation
        if (!validateEmail(email)) {
            newsletterMessage.textContent = 'Please enter a valid email address.';
            newsletterMessage.className = 'newsletter-message error show';
            return;
        }
        
        // Simulate subscription (in real app, send to server)
        console.log('Newsletter subscription:', email);
        
        // Show success message
        newsletterMessage.textContent = 'Thank you for subscribing! Check your inbox for confirmation.';
        newsletterMessage.className = 'newsletter-message success show';
        newsletterForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            newsletterMessage.classList.remove('show');
        }, 5000);
    });
}

// ============================================
// FORM DATA STORAGE (JSON)
// ============================================

/**
 * Save form data to localStorage and update JSON file
 */
function saveFormDataToStorage(formData) {
    try {
        // Get existing data from localStorage
        let storedData = localStorage.getItem('contactFormSubmissions');
        let submissions = storedData ? JSON.parse(storedData) : [];
        
        // Add new submission
        submissions.push(formData);
        
        // Save back to localStorage
        localStorage.setItem('contactFormSubmissions', JSON.stringify(submissions, null, 2));
        
        // Update the JSON file
        updateJSONFile(submissions);
        
        console.log('Form data saved to localStorage and JSON file');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

/**
 * Update the contact-form-submissions.json file
 */
async function updateJSONFile(submissions) {
    try {
        // Try to update via server endpoint first (if server.js is running)
        try {
            const response = await fetch('/update-json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissions)
            });
            
            if (response.ok) {
                console.log('JSON file updated on server');
                return;
            }
        } catch (e) {
            // Server endpoint not available, continue with download method
        }
        
        // Fallback: Download the updated JSON file
        // This will download contact-form-submissions.json which you can save to your project
        downloadJSONFile(submissions);
    } catch (error) {
        console.error('Error updating JSON file:', error);
    }
}

/**
 * Download/update JSON file
 */
function downloadJSONFile(submissions) {
    try {
        const jsonString = JSON.stringify(submissions, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'contact-form-submissions.json';
        link.style.display = 'none';
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        
        // Remove after a short delay
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
        
        console.log('JSON file downloaded - save it to your project folder');
    } catch (error) {
        console.error('Error downloading JSON file:', error);
    }
}

/**
 * Export form data to JSON file (manual download - call this function when needed)
 * This function can be called manually if you want to download the JSON file
 * Usage: exportFormDataToJSON() in browser console
 */
function exportFormDataToJSON() {
    try {
        // Get all stored submissions
        let storedData = localStorage.getItem('contactFormSubmissions');
        let allSubmissions = storedData ? JSON.parse(storedData) : [];
        
        if (allSubmissions.length === 0) {
            console.log('No form submissions to export');
            return;
        }
        
        // Create JSON string
        const jsonString = JSON.stringify(allSubmissions, null, 2);
        
        // Create blob and download link
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `contact-form-submissions-${new Date().toISOString().split('T')[0]}.json`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        console.log('Form data exported to JSON file');
    } catch (error) {
        console.error('Error exporting to JSON:', error);
    }
}

/**
 * Get all stored form submissions
 */
function getAllFormSubmissions() {
    try {
        const storedData = localStorage.getItem('contactFormSubmissions');
        return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
}

/**
 * Clear all stored form submissions (utility function)
 */
function clearAllFormSubmissions() {
    localStorage.removeItem('contactFormSubmissions');
    console.log('All form submissions cleared');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Set current year in footer
 */
document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    
    // Initialize counters
    initCounters();
});

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

