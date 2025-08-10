// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.neighborhood, .payment-method');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.neighborhood, .payment-method');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation
    setTimeout(animateOnScroll, 300);
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Create bubbles when 'b' key is pressed
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'b') {
        createBubbles(15); // Create 15 bubbles when 'b' is pressed
    }
});

function createBubbles(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // Random size between 20px and 80px for better visibility
            const size = Math.random() * 60 + 20;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            // Random position across the screen
            bubble.style.left = `${Math.random() * 100}%`;
            
            // Random animation duration between 2s and 5s
            const duration = Math.random() * 3 + 2;
            bubble.style.animationDuration = `${duration}s`;
            
            // Random opacity for visual interest
            bubble.style.opacity = Math.random() * 0.4 + 0.6;
            
            // Add slight horizontal movement
            bubble.style.setProperty('--x-movement', `${(Math.random() - 0.5) * 200}px`);
            
            document.body.appendChild(bubble);
            
            // Add hover effect
            bubble.addEventListener('mouseover', () => {
                bubble.style.transform = 'scale(1.2)';
            });
            
            bubble.addEventListener('mouseout', () => {
                bubble.style.transform = 'scale(1)';
            });
            
            // Remove bubble after animation completes
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.remove();
                }
            }, duration * 1000);
        }, i * 150); // Faster bubble creation
    }
}

// Add initial instructions
const instructions = document.createElement('div');
instructions.style.position = 'fixed';
instructions.style.bottom = '20px';
instructions.style.right = '20px';
instructions.style.backgroundColor = 'rgba(0,0,0,0.7)';
instructions.style.color = 'white';
instructions.style.padding = '10px 15px';
instructions.style.borderRadius = '5px';
instructions.style.zIndex = '1001';
instructions.style.fontSize = '14px';
instructions.textContent = 'Press "B" for bubbles!';
document.body.appendChild(instructions);

// Remove instructions after 10 seconds
setTimeout(() => {
    instructions.style.transition = 'opacity 1s';
    instructions.style.opacity = '0';
    setTimeout(() => instructions.remove(), 1000);
}, 10000);
