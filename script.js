// Get DOM elements
const barkButton = document.getElementById('barkButton');
const barkCount = document.getElementById('barkCount');

// Initialize bark count
let barks = 0;

// Play bark sound and increment counter
function bark() {
    barks++;
    barkCount.textContent = barks;
    
    // Add animation to the button
    barkButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        barkButton.style.transform = 'scale(1)';
    }, 100);

    // Optional: Add a bark sound
    // const barkSound = new Audio('bark.mp3');
    // barkSound.play();
}

// Add click event listener
barkButton.addEventListener('click', bark);

// Save barks to localStorage
function saveBarks() {
    localStorage.setItem('barkCount', barks);
}

// Load barks from localStorage
function loadBarks() {
    const savedBarks = localStorage.getItem('barkCount');
    if (savedBarks !== null) {
        barks = parseInt(savedBarks);
        barkCount.textContent = barks;
    }
}

// Save barks before page unload
window.addEventListener('beforeunload', saveBarks);

// Load saved barks when page loads
document.addEventListener('DOMContentLoaded', loadBarks);

// Gallery tab functionality
const tabButtons = document.querySelectorAll('.tab-button');
const photoGrid = document.querySelector('.photo-grid');

// Sample photo data - replace with actual photos
const photos = {
    puppy: [],
    holiday: [],
    adventures: [],
    sleepy: [],
    mischief: []
};

function switchTab(category) {
    // Remove active class from all buttons
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Add active class to clicked button
    const activeButton = document.querySelector(`[data-category="${category}"]`);
    activeButton.classList.add('active');
    
    // Update photo grid
    // This is where you'll load the actual photos for each category
    photoGrid.innerHTML = photos[category].length > 0 
        ? photos[category].map(photo => `
            <div class="photo-card">
                <img src="${photo.src}" alt="${photo.alt}">
            </div>
        `).join('')
        : '<div class="placeholder-image">Photos coming soon!</div>';
}

// Add click handlers to tab buttons
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        switchTab(category);
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Here you would typically send this data to your server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thanks for your message! Goose will get back to you with lots of snorts and wiggle butts!');
    contactForm.reset();
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a, .footer-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Lazy loading for videos
const videoCards = document.querySelectorAll('.video-card');

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // This is where you'll load the actual video
            // For now, we'll just change the placeholder text
            const placeholder = entry.target.querySelector('.placeholder-video');
            if (placeholder) {
                placeholder.style.backgroundColor = '#F7B1AB';
            }
        }
    });
}, {
    threshold: 0.5
});

videoCards.forEach(card => videoObserver.observe(card));

// Add hover effects to product cards
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
}); 