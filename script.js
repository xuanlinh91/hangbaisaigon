// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(245, 224, 194, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(245, 224, 194, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize EmailJS
(function() {
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('P1GJEV5z7eWwg0wBz');
})();

// Enhanced form validation functions
function validateName(name) {
    const trimmedName = name.trim();
    if (!trimmedName) {
        return { valid: false, message: 'Vui lòng nhập họ và tên' };
    }
    if (trimmedName.length < 2) {
        return { valid: false, message: 'Họ và tên phải có ít nhất 2 ký tự' };
    }
    if (trimmedName.length > 50) {
        return { valid: false, message: 'Họ và tên không được quá 50 ký tự' };
    }
    const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠưăâêôơ\s]+$/;
    if (!nameRegex.test(trimmedName)) {
        return { valid: false, message: 'Họ và tên chỉ được chứa chữ cái và khoảng trắng' };
    }
    return { valid: true, message: '' };
}

function validateEmail(email) {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
        return { valid: false, message: 'Vui lòng nhập địa chỉ email' };
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
        return { valid: false, message: 'Vui lòng nhập địa chỉ email hợp lệ (ví dụ: example@gmail.com)' };
    }
    if (trimmedEmail.length > 100) {
        return { valid: false, message: 'Địa chỉ email không được quá 100 ký tự' };
    }
    return { valid: true, message: '' };
}

function validatePhone(phone) {
    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
        return { valid: false, message: 'Vui lòng nhập số điện thoại' };
    }
    // Remove all spaces and special characters for validation
    const cleanPhone = trimmedPhone.replace(/[\s\-\(\)]/g, '');
    
    // Vietnamese phone number patterns
    const phoneRegex = /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
        return { valid: false, message: 'Vui lòng nhập số điện thoại Việt Nam hợp lệ (ví dụ: 0978788565 hoặc +84978788565)' };
    }
    return { valid: true, message: '' };
}

function validateMessage(message) {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
        return { valid: false, message: 'Vui lòng nhập nội dung tin nhắn' };
    }
    if (trimmedMessage.length < 10) {
        return { valid: false, message: 'Nội dung tin nhắn phải có ít nhất 10 ký tự' };
    }
    if (trimmedMessage.length > 1000) {
        return { valid: false, message: 'Nội dung tin nhắn không được quá 1000 ký tự' };
    }
    return { valid: true, message: '' };
}

// Add visual feedback for form fields
function addFieldValidation() {
    const form = document.getElementById('contactForm');
    const fields = form.querySelectorAll('input, textarea');
    
    fields.forEach(field => {
        // Add real-time validation on blur
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Add real-time validation on input (for better UX)
        field.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value;
    let validation = { valid: true, message: '' };
    
    switch(field.name) {
        case 'name':
            validation = validateName(value);
            break;
        case 'email':
            validation = validateEmail(value);
            break;
        case 'phone':
            validation = validatePhone(value);
            break;
        case 'message':
            validation = validateMessage(value);
            break;
    }
    
    if (!validation.valid) {
        showFieldError(field, validation.message);
    } else {
        clearFieldError(field);
    }
    
    return validation.valid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#ef4444';
    field.style.backgroundColor = '#fef2f2';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '#EBEBEB';
    field.style.backgroundColor = '';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Contact form handling with enhanced validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Validate all fields
    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);
    const phoneValidation = validatePhone(phone);
    const messageValidation = validateMessage(message);
    
    // Show errors for invalid fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');
    
    if (!nameValidation.valid) {
        showFieldError(nameField, nameValidation.message);
    } else {
        clearFieldError(nameField);
    }
    
    if (!emailValidation.valid) {
        showFieldError(emailField, emailValidation.message);
    } else {
        clearFieldError(emailField);
    }
    
    if (!phoneValidation.valid) {
        showFieldError(phoneField, phoneValidation.message);
    } else {
        clearFieldError(phoneField);
    }
    
    if (!messageValidation.valid) {
        showFieldError(messageField, messageValidation.message);
    } else {
        clearFieldError(messageField);
    }
    
    // If any validation fails, don't submit
    if (!nameValidation.valid || !emailValidation.valid || !phoneValidation.valid || !messageValidation.valid) {
        showNotification('Vui lòng kiểm tra và sửa các lỗi trong form!', 'error');
        return;
    }
    
    // Show loading notification
    showNotification('Đang gửi tin nhắn...', 'info');
    
    // Prepare email parameters
    const templateParams = {
        from_name: name.trim(),
        from_email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        to_email: 'nguyenxuanthinh.7275@gmail.com',
        company_name: 'Hàng Bãi Sài Gòn'
    };
    
    // Send email using EmailJS
    emailjs.send('service_a6dxguj', 'template_9vt9jmc', templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            showNotification('Cảm ơn bạn! Tin nhắn đã được gửi thành công. Chúng tôi sẽ liên hệ lại sớm nhất có thể.', 'success');
            document.getElementById('contactForm').reset();
            // Clear any remaining field errors
            const fields = document.querySelectorAll('#contactForm input, #contactForm textarea');
            fields.forEach(field => clearFieldError(field));
        }, function(error) {
            console.error('Email sending failed:', error);
            // Fallback to mailto link
            const subject = encodeURIComponent('Liên hệ từ website Hàng Bãi Sài Gòn');
            const body = encodeURIComponent(`Tên: ${name.trim()}\nEmail: ${email.trim()}\nSố điện thoại: ${phone.trim()}\n\nNội dung:\n${message.trim()}`);
            const mailtoLink = `mailto:nguyenxuanthinh.7275@gmail.com?subject=${subject}&body=${body}`;
            
            showNotification('Đang mở ứng dụng email...', 'info');
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 1000);
        });
});

// Initialize field validation when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    addFieldValidation();
    
    // Load products first, then initialize navigation and modal
    await loadProducts();
    initializeProductNavigation();
    initializeProductModal();
});

// Global variables for product data
let productData = {};
let allProducts = [];

// Load products from JSON file
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allProducts = await response.json();
        
        // Group products by category
        productData = {};
        allProducts.forEach(product => {
            const categoryKey = getCategoryKey(product.category);
            if (!productData[categoryKey]) {
                productData[categoryKey] = {
                    name: product.category,
                    products: []
                };
            }
            
            // Add unique ID and convert photos array to image
            const productWithId = {
                ...product,
                id: generateProductId(product.name, product.category),
                image: product.photos && product.photos.length > 0 ? product.photos[0] : 'https://hangbaisaigon.com/product/unnamed.jpg',
                tags: generateTags(product.name, product.category)
            };
            
            productData[categoryKey].products.push(productWithId);
        });
        
        console.log('Products loaded successfully:', productData);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Helper function to generate category key from category name
function getCategoryKey(categoryName) {
    const categoryMap = {
        'Đe': 'de',
        'Eto': 'eto',
        'Máy Cắt': 'may-cat',
        'Máy Khoan Bàn': 'may-khoan',
        'Máy Mài': 'may-mai'
    };
    return categoryMap[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
}

// Helper function to generate product ID
function generateProductId(name, category) {
    const categoryKey = getCategoryKey(category);
    const nameKey = name.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
    return `${categoryKey}-${nameKey}`;
}

// Helper function to generate tags
function generateTags(name, category) {
    const categoryTags = {
        'Đe': 'đe rèn, thiết bị rèn',
        'Eto': 'eto, thiết bị kẹp',
        'Máy Cắt': 'máy cắt, plasma',
        'Máy Khoan Bàn': 'máy khoan, khoan bàn',
        'Máy Mài': 'máy mài, mài góc'
    };
    return categoryTags[category] || category.toLowerCase();
}

// Product navigation functionality
function initializeProductNavigation() {
    const viewButtons = document.querySelectorAll('.view-products-btn');
    const backButton = document.querySelector('.back-to-categories');
    const productNavigation = document.querySelector('.product-navigation');
    const productsGrid = document.querySelector('.products-grid');
    const currentCategorySpan = document.querySelector('.category-name');
    
    // Check if productData is loaded
    if (!productData || Object.keys(productData).length === 0) {
        console.warn('Product data not loaded yet, retrying...');
        setTimeout(() => initializeProductNavigation(), 100);
        return;
    }
    
    // Add click handlers to entire product cards
    const productCards = document.querySelectorAll('.product-card[data-category]');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the button itself (let button handle it)
            if (e.target.closest('.view-products-btn')) {
                return;
            }
            
            const category = this.dataset.category;
            const categoryData = productData[category];
            
            if (categoryData) {
                showProductGrid(categoryData);
            } else {
                console.error('Category data not found for:', category);
            }
        });
    });
    
    // Keep button click handlers for explicit button clicks
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            const category = productCard.dataset.category;
            const categoryData = productData[category];
            
            if (categoryData) {
                showProductGrid(categoryData);
            } else {
                console.error('Category data not found for:', category);
            }
        });
    });
    
    backButton.addEventListener('click', function() {
        showCategoryView();
    });
    
    function showProductGrid(categoryData) {
        // Hide category grid and show navigation
        productsGrid.style.display = 'none';
        productNavigation.style.display = 'flex';
        currentCategorySpan.textContent = categoryData.name;
        
        // Create product grid
        const productGrid = document.querySelector('.products-grid-view') || createProductGrid();
        productGrid.innerHTML = '';
        
        categoryData.products.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
        
        productGrid.classList.add('active');
        
        // Scroll to products section
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    }
    
    function showCategoryView() {
        // Show category grid and hide navigation
        productsGrid.style.display = 'grid';
        productNavigation.style.display = 'none';
        
        // Hide product grid
        const productGrid = document.querySelector('.products-grid-view');
        if (productGrid) {
            productGrid.classList.remove('active');
        }
    }
    
    function createProductGrid() {
        const grid = document.createElement('div');
        grid.className = 'products-grid-view';
        productsGrid.parentNode.insertBefore(grid, productsGrid.nextSibling);
        return grid;
    }
    
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-item-card';
        card.dataset.productId = product.id;
        
        // Use first photo as main image, fallback to image property
        const mainImageSrc = (product.photos && product.photos.length > 0) ? product.photos[0] : product.image;
        
        card.innerHTML = `
            <div class="product-item-image">
                <img src="${mainImageSrc}" alt="${product.name}">
                <div class="product-item-overlay">
                    <i class="fas fa-eye"></i>
                </div>
            </div>
            <div class="product-item-content">
                <h4>${product.name}</h4>
                <p>${product.description.substring(0, 100)}...</p>
                <div class="product-item-price">${product.price}</div>
            </div>
        `;
        
        card.addEventListener('click', function() {
            showProductModal(product);
        });
        
        return card;
    }
}

// Product modal functionality
function initializeProductModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.modal-close');
    const contactBtn = document.querySelector('.contact-btn');
    const callBtn = document.querySelector('.call-btn');
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Contact button (Send message)
    contactBtn.addEventListener('click', function() {
        const productName = document.getElementById('modalProductName').textContent;
        const quantity = quantityInput.value;
        
        const subject = encodeURIComponent(`Liên hệ về sản phẩm: ${productName}`);
        const body = encodeURIComponent(`Tôi quan tâm đến sản phẩm: ${productName}\nSố lượng: ${quantity}\n\nVui lòng liên hệ lại để tư vấn chi tiết.`);
        const mailtoLink = `mailto:nguyenxuanthinh.7275@gmail.com?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
    });
    
    // Call button
    callBtn.addEventListener('click', function() {
        const phoneNumber = '0978788565';
        const productName = document.getElementById('modalProductName').textContent;
        
        // Create a confirmation dialog
        const confirmCall = confirm(`Bạn có muốn gọi điện đến số ${phoneNumber} để tư vấn về sản phẩm "${productName}"?`);
        
        if (confirmCall) {
            window.location.href = `tel:${phoneNumber}`;
        }
    });
    
    // Quantity controls
    decreaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
    
    // Thumbnail navigation
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            // Only handle click if thumbnail is visible
            if (this.style.display !== 'none') {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                // Add active class to clicked thumbnail
                this.classList.add('active');
                // Update main image
                const mainImage = document.getElementById('modalMainImage');
                mainImage.src = this.src;
            }
        });
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Make closeModal available globally
    window.closeModal = closeModal;
}

function showProductModal(product) {
    const modal = document.getElementById('productModal');
    
    // Update modal content
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = product.price;
    document.getElementById('modalCategory').textContent = product.category;
    document.getElementById('modalTags').textContent = product.tags;
    document.getElementById('modalDescription').textContent = product.description;
    
    // Update specifications
    const specsList = document.getElementById('modalSpecs');
    specsList.innerHTML = '';
    product.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
    });
    
    // Update images
    const mainImage = document.getElementById('modalMainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Use first photo as main image, fallback to image property
    const mainImageSrc = (product.photos && product.photos.length > 0) ? product.photos[0] : product.image;
    mainImage.src = mainImageSrc;
    
    // Update thumbnails with available photos
    thumbnails.forEach((thumb, index) => {
        if (product.photos && product.photos.length > index) {
            thumb.src = product.photos[index];
            thumb.style.display = 'block';
        } else {
            thumb.style.display = 'none';
        }
        thumb.classList.toggle('active', index === 0);
    });
    
    // Reset quantity
    document.getElementById('quantity').value = 1;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Scroll to top of modal
    modal.scrollTop = 0;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.product-card, .service-card, .contact-item, .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Product card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Service card click effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(245, 224, 194, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Lazy loading for images (if any are added later)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #8B281B;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(139, 40, 27, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Back to top functionality
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for back to top button
backToTopButton.addEventListener('mouseenter', function() {
    this.style.background = '#6B1F15';
    this.style.transform = 'translateY(-2px)';
});

backToTopButton.addEventListener('mouseleave', function() {
    this.style.background = '#8B281B';
    this.style.transform = 'translateY(0)';
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(245, 224, 194, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(245, 224, 194, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    // Back to top button visibility
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical resources
document.addEventListener('DOMContentLoaded', function() {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
    
    // Preload Font Awesome
    const faLink = document.createElement('link');
    faLink.rel = 'preload';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    faLink.as = 'style';
    document.head.appendChild(faLink);
});

// Error handling for external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT') {
        console.warn('Failed to load external resource:', e.target.src || e.target.href);
    }
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
