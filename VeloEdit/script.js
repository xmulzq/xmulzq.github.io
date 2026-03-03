// VeloEdit Website JavaScript

// Configuration: Define your image folders and prompts here
const IMAGE_CONFIGS = {
    'Add a graffiti to the girl\'s face': {
        folder: 'assets/Add a graffiti to the girl\'s face_20260302_192112',
        prompt: 'Add a graffiti to the girl\'s face',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    },
    'Add flowers to the helmet': {
        folder: 'assets/Add flowers to the helmet_20260302_195350',
        prompt: 'Add flowers to the helmet',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    },
    'Convert to color image': {
        folder: 'assets/Convert to color image_20260302_200728',
        prompt: 'Convert to color image',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    },
    'Convert to pixel style': {
        folder: 'assets/Convert to pixel style_20260302_195247',
        prompt: 'Convert to pixel style',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    },
    'It is raining now': {
        folder: 'assets/It is raining now_20260302_200910',
        prompt: 'It is raining now',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    },
    'Make the bird fluffy': {
        folder: 'assets/Make the bird fluffy_20260302_212226',
        prompt: 'Make the bird fluffy',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    },
    'The lake is frozen': {
        folder: 'assets/The lake is frozen_20260302_201211',
        prompt: 'The lake is frozen',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    },
    'Turn into Van Gogh\'s style': {
        folder: 'assets/Turn into Van Gogh\'s style_20260302_180845',
        prompt: 'Turn into Van Gogh\'s style',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    },
    'Turn into a simple line drawing': {
        folder: 'assets/Turn into a simple line drawing_20260302_195307',
        prompt: 'Turn into a simple line drawing',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    },
    'Turn off the light': {
        folder: 'assets/Turn off the light_20260302_174555',
        prompt: 'Turn off the light',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.10,
        count: 11
    },
    'Turn the horse into a bronze horse': {
        folder: 'assets/Turn the horse into a bronze horse_20260302_193455',
        prompt: 'Turn the horse into a bronze horse',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    },
    'Make her hair curly': {
        folder: 'assets/Make her hair curly_20260302_215106',
        prompt: 'Make her hair curly',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    },
    'make the car shiny and brand-new': {
        folder: 'assets/make the car shiny and brand-new_20260302_221737',
        prompt: 'make the car shiny and brand-new',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    },
    'It is daytime now.': {
        folder: 'assets/It is daytime now._20260303_093214',
        prompt: 'It is daytime now.',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    }
};

/**
 * Generate image mapping based on configuration
 * @param {string} folderPath - Path to the image folder
 * @param {string} promptName - Name of the prompt (used in filename)
 * @param {number} minStrength - Minimum strength value
 * @param {number} maxStrength - Maximum strength value
 * @param {number} step - Step size between images
 * @param {number} count - Total number of images
 * @returns {Object} - Mapping of slider positions to image paths
 */
function generateImageMapping(folderPath, promptName, minStrength, maxStrength, step, count) {
    const images = [];
    
    // Generate all image paths from minStrength to maxStrength
    for (let i = 0; i < count; i++) {
        let strength = (minStrength + i * step).toFixed(2);
        let imagePath = `${folderPath}/${promptName}_strength${strength}.png`;
        images.push({ strength: parseFloat(strength), path: imagePath });
    }
    
    // Sort by strength descending (highest strength first)
    images.sort((a, b) => b.strength - a.strength);
    
    // Create mapping: index 0 = highest strength, last index = lowest strength
    const mapping = {};
    images.forEach((img, index) => {
        mapping[index] = img.path;
    });
    
    return mapping;
}

/**
 * Setup a slider with automatic image detection
 * @param {string} sliderId - ID of the slider element
 * @param {string} imageId - ID of the image element
 * @param {string} configKey - Key in IMAGE_CONFIGS
 */
function setupAutoSlider(sliderId, imageId, configKey) {
    const slider = document.getElementById(sliderId);
    const image = document.getElementById(imageId);
    
    if (!slider || !image) return;
    
    const config = IMAGE_CONFIGS[configKey];
    if (!config) {
        console.error(`Configuration not found for: ${configKey}`);
        return;
    }
    
    // Generate image mapping
    const imageMapping = generateImageMapping(
        config.folder, 
        config.prompt, 
        config.minStrength, 
        config.maxStrength, 
        config.step, 
        config.count
    );
    const maxIndex = config.count - 1;
    
    // Update slider max value
    slider.max = maxIndex;
    
    // Setup event listener
    slider.addEventListener('input', function() {
        const sliderValue = parseInt(this.value);
        if (imageMapping[sliderValue]) {
            image.src = imageMapping[sliderValue];
        }
    });
    
    // Initialize with first image (highest strength)
    if (imageMapping[0]) {
        image.src = imageMapping[0];
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Handle teaser video
    const teaserVideo = document.getElementById('teaser-video');
    if (teaserVideo) {
        teaserVideo.addEventListener('ended', function() {
            setTimeout(() => {
                teaserVideo.currentTime = 0;
                teaserVideo.play();
            }, 2000);
        });
    }

    // Setup all sliders with auto-detection
    setupAutoSlider('slider-1', 'image-1', "Add a graffiti to the girl's face");
    setupAutoSlider('slider-2', 'image-2', "Add flowers to the helmet");
    setupAutoSlider('slider-3', 'image-3', "Convert to color image");
    setupAutoSlider('slider-4', 'image-4', "Convert to pixel style");
    setupAutoSlider('slider-5', 'image-5', "It is raining now");
    setupAutoSlider('slider-6', 'image-6', "Make the bird fluffy");
    setupAutoSlider('slider-7', 'image-7', "The lake is frozen");
    setupAutoSlider('slider-8', 'image-8', "Turn into Van Gogh's style");
    setupAutoSlider('slider-9', 'image-9', "Turn into a simple line drawing");
    setupAutoSlider('slider-10', 'image-10', "Turn off the light");
    setupAutoSlider('slider-11', 'image-11', "Turn the horse into a bronze horse");
    setupAutoSlider('slider-12', 'image-12', "Make her hair curly");
    setupAutoSlider('slider-13', 'image-13', "make the car shiny and brand-new");
    setupAutoSlider('slider-14', 'image-14', "It is daytime now.");
});

// Copy BibTeX function
function copyBibTeX() {
    const bibtexText = document.querySelector('.bibtex-code').textContent;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(bibtexText).then(() => {
            showCopyFeedback();
        }).catch(() => {
            fallbackCopyToClipboard(bibtexText);
        });
    } else {
        fallbackCopyToClipboard(bibtexText);
    }
}

function fallbackCopyToClipboard(text) {
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
        showCopyFeedback();
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

function showCopyFeedback() {
    const button = document.querySelector('.copy-bibtex-btn');
    const originalText = button.textContent;
    
    button.textContent = 'Copied!';
    button.style.background = '#27ae60';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#3498db';
    }, 2000);
}

// Handle image loading errors gracefully
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'block';
            this.style.backgroundColor = '#f8f9fa';
            this.style.border = '2px dashed #ddd';
            this.style.minHeight = '200px';
        });
    });
});
