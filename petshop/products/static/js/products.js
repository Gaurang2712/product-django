// products.js
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter products
            productCards.forEach(card => {
                // Add fade-out class first
                card.classList.add('fade-out');
                
                // Wait for animation to complete before changing display
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue || 
                        (card.getAttribute('data-category') === 'both' && (filterValue === 'cat' || filterValue === 'dog'))) {
                        card.style.display = 'block';
                        // Then add fade-in class
                        setTimeout(() => {
                            card.classList.remove('fade-out');
                            card.classList.add('fade-in');
                        }, 50);
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('fade-in');
                    }
                }, 300);
            });
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product info
            const card = this.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            
            // Animation effect
            const notification = document.createElement('div');
            notification.classList.add('add-to-cart-notification');
            notification.textContent = `${productName} added to cart!`;
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Remove notification after animation completes
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 2000);
            
            // Here you would normally send AJAX request to add item to cart
            console.log(`Added ${productName} to cart`);
        });
    });
    
    // Add animation classes for the filter transitions
    const style = document.createElement('style');
    style.textContent = `
        .product-card {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .fade-out {
            opacity: 0;
            transform: translateY(10px);
        }
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        .add-to-cart-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 1000;
        }
        .add-to-cart-notification.show {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});