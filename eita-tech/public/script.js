// Product data (you can expand this as needed)
const products = [
    {
        name: "Stabilizer Card Model A",
        description: "High-performance micro controlled stabilizer card",
        image: "product-a.jpg"
    },
    // Add more products here
];

// Function to create product elements
function createProductElement(product) {
    const productEl = document.createElement('div');
    productEl.classList.add('product');
    productEl.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <img src="${product.image}" alt="${product.name}" loading="lazy">
    `;
    return productEl;
}

// Lazy loading function
function lazyLoadProducts() {
    const productSection = document.getElementById('products');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                products.forEach(product => {
                    const productEl = createProductElement(product);
                    productSection.appendChild(productEl);
                });
                observer.unobserve(entry.target);
            }
        });
    }, options);

    observer.observe(productSection);
}

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Here you would typically send this data to your server
    // For this example, we'll just log it to the console
    console.log(`Name: ${name}, Email: ${email}, Phone: ${phone}`);

    // You would need to implement the WhatsApp API integration on your server
    // and call that endpoint here
    try {
        const response = await fetch('/send-whatsapp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone }),
        });
        if (response.ok) {
            alert('Message sent successfully!');
        } else {
            alert('Failed to send message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadProducts);