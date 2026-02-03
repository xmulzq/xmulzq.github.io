/* ============================================
   VeloEdit Project Page Scripts
   ============================================ */

// Demo image mappings - map slider values to images
const demoConfigs = {
    demo1: {
        // Style transfer demo - anime style
        images: [
            'assets/page1_img1.jpeg',   // α = 0.0
            'assets/page1_img1.jpeg',   // α = 0.2
            'assets/page1_img2.jpeg',   // α = 0.4
            'assets/page1_img2.jpeg',   // α = 0.6
            'assets/page1_img2.jpeg',   // α = 0.8
            'assets/page1_img2.jpeg'    // α = 1.0
        ]
    },
    demo2: {
        // Color change demo - red hair
        images: [
            'assets/page1_img28.jpeg',  // α = 0.0
            'assets/page1_img28.jpeg',  // α = 0.2
            'assets/page1_img29.jpeg',  // α = 0.4
            'assets/page1_img29.jpeg',  // α = 0.6
            'assets/page1_img29.jpeg',  // α = 0.8
            'assets/page1_img29.jpeg'   // α = 1.0
        ]
    }
};

// Initialize sliders
document.addEventListener('DOMContentLoaded', function() {
    initializeSliders();
    initializeBackToTop();
    initializeSmoothScroll();
    preloadImages();
});

// Initialize all demo sliders
function initializeSliders() {
    const sliders = document.querySelectorAll('.strength-slider');
    
    sliders.forEach(slider => {
        const demoId = slider.dataset.demo;
        if (!demoId) return;
        
        slider.addEventListener('input', function() {
            updateDemo(demoId, this.value);
        });
        
        // Initialize with current value
        updateDemo(demoId, slider.value);
    });
}

// Update demo based on slider value
function updateDemo(demoId, value) {
    const config = demoConfigs[demoId];
    if (!config) return;
    
    const imageElement = document.getElementById(`${demoId}-image`);
    const valueElement = document.getElementById(`${demoId}-value`);
    
    if (!imageElement) return;
    
    // Calculate alpha value (0-1)
    const alpha = value / 100;
    
    // Update value display
    if (valueElement) {
        valueElement.textContent = alpha.toFixed(2);
    }
    
    // Determine which image to show based on alpha
    const imageIndex = Math.min(Math.floor(alpha * config.images.length), config.images.length - 1);
    const newSrc = config.images[imageIndex];
    
    // Only update if source changed
    if (imageElement.src !== newSrc) {
        // Add fade effect
        imageElement.style.opacity = '0.7';
        
        setTimeout(() => {
            imageElement.src = newSrc;
            imageElement.style.opacity = '1';
        }, 100);
    }
}

// Preload images for smoother transitions
function preloadImages() {
    const allImages = new Set();
    
    Object.values(demoConfigs).forEach(config => {
        config.images.forEach(src => allImages.add(src));
    });
    
    allImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Back to top button functionality
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexCode = document.querySelector('.bibtex-code');
    if (!bibtexCode) return;
    
    const text = bibtexCode.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        const btn = document.querySelector('.copy-bibtex-btn');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        fallbackCopyTextToClipboard(text);
    });
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        const btn = document.querySelector('.copy-bibtex-btn');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 2000);
    } catch (err) {
        console.error('Fallback: Could not copy text:', err);
    }
    
    document.body.removeChild(textArea);
}

// Image lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <img src="" alt="Enlarged image">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        #lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
        }
        #lightbox.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .lightbox-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
        }
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        .lightbox-content img {
            max-width: 100%;
            max-height: 90vh;
            border-radius: 8px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 0.5rem;
            line-height: 1;
        }
        .lightbox-close:hover {
            color: #60a5fa;
        }
    `;
    document.head.appendChild(style);
    
    // Add click handlers to gallery images
    const galleryImages = document.querySelectorAll('.gallery-grid img, .results-grid img, .continuous-images img');
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.src = this.src;
            lightbox.classList.add('active');
        });
    });
    
    // Close lightbox on click
    lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
    }
});

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// Console welcome message
console.log('%c VeloEdit Project Page ', 'background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;');
console.log('A Training-Free Consistent and Continuous Image Editing Method via Velocity Field Decomposition');
console.log('Authors: Zongqing Li, Zhihui Liu, Songzhi Su');
