// Color data
const colors = [
    { name: 'Midnight Black', type: 'gloss', hex: '#000000' },
    { name: 'Pearl White', type: 'gloss', hex: '#FFFFFF' },
    { name: 'Gunmetal Grey', type: 'metallic', hex: '#2C3539' },
    { name: 'Racing Red', type: 'gloss', hex: '#FF0000' },
    { name: 'Electric Blue', type: 'metallic', hex: '#0066CC' },
    { name: 'Emerald Green', type: 'metallic', hex: '#50C878' },
    { name: 'Matte Black', type: 'matte', hex: '#242424' },
    { name: 'Satin Silver', type: 'satin', hex: '#C0C0C0' },
    // Add more colors as needed
];

// Initialize color grid
function initializeColorGrid() {
    const colorGrid = document.querySelector('.color-grid');
    const colorSelect = document.getElementById('color');

    colors.forEach(color => {
        // Create color swatch
        const swatch = document.createElement('div');
        swatch.className = `color-swatch ${color.type}`;
        swatch.style.backgroundColor = color.hex;
        swatch.setAttribute('data-color', color.name);
        swatch.setAttribute('data-type', color.type);

        // Add hover effect
        const info = document.createElement('div');
        info.className = 'color-info';
        info.innerHTML = `
            <h4>${color.name}</h4>
            <p>${color.type.charAt(0).toUpperCase() + color.type.slice(1)}</p>
        `;
        swatch.appendChild(info);
        colorGrid.appendChild(swatch);

        // Add to form select
        const option = document.createElement('option');
        option.value = color.name;
        option.textContent = color.name;
        colorSelect.appendChild(option);
    });
}

// Color filter functionality
function initializeColorFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const colorSwatches = document.querySelectorAll('.color-swatch');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter swatches
            colorSwatches.forEach(swatch => {
                if (filter === 'all' || swatch.getAttribute('data-type') === filter) {
                    swatch.style.display = 'block';
                } else {
                    swatch.style.display = 'none';
                }
            });
        });
    });
}

// Form submission
function initializeForm() {
    const form = document.getElementById('leadForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Here you would typically send the data to your backend
            console.log('Form submitted:', data);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you! We will connect you with a certified installer soon.';
            
            form.innerHTML = '';
            form.appendChild(successMessage);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your request. Please try again.');
        }
    });
}

// Smooth scroll functionality
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.feature, .step, .testimonial');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeColorGrid();
    initializeColorFilters();
    initializeForm();
    initializeSmoothScroll();
    initializeAnimations();
}); 
