
        // Sticky Header
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Mobile Menu Toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navLinks = document.querySelector('.nav-links');
        const closeMenu = document.querySelector('.close-menu');
        
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.add('active');
        });
        
        closeMenu.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
        
        // Scroll animations
        function checkFade() {
            const fadeElements = document.querySelectorAll('.fade-in');
            
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100 && elementBottom > 0) {
                    element.classList.add('visible');
                }
            });
        }
        
        window.addEventListener('scroll', checkFade);
        window.addEventListener('load', checkFade);
        
        // Load all properties from JSON and create dynamic listing cards
        async function loadAllProperties() {
            try {
                const response = await fetch('assets/property.json');
                const properties = await response.json();

                if (properties.length > 0) {
                    const listingsGrid = document.querySelector('.listings-grid');

                    // Clear existing dynamic content
                    const existingDynamicCards = listingsGrid.querySelectorAll('.dynamic-listing');
                    existingDynamicCards.forEach(card => card.remove());

                    // Create dynamic listing cards for each property
                    properties.forEach((property, index) => {
                        const listingCard = document.createElement('div');
                        listingCard.className = 'listing-card fade-in dynamic-listing';

                        // Limit description to 100 characters
                        const shortDescription = property.description.length > 100
                            ? property.description.substring(0, 100) + '...'
                            : property.description;

                        listingCard.innerHTML = `
                            <div class="listing-img">
                                <img src="${property.gallery && property.gallery.length > 0 ? property.gallery[0].src : ''}"
                                     alt="${property.gallery && property.gallery.length > 0 ? property.gallery[0].alt : 'Property Image'}"
                                     style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
                            </div>
                            <div class="listing-content">
                                <h3>${property.title}</h3>
                                <p class="listing-price">${property.price}</p>
                                <p>${shortDescription}</p>
                                <a href="listings/property.html?id=${property.id}" class="btn btn-primary">View Details</a>
                            </div>
                        `;

                        // Append to the listings grid
                        listingsGrid.appendChild(listingCard);
                    });
                }
            } catch (error) {
                console.error('Error loading properties:', error);
            }
        }

        // Load all properties when page loads
        if (document.querySelector('.listings-grid')) {
            loadAllProperties();
        }

        // Form submission
        const leadForm = document.getElementById('leadForm');
        if (leadForm) {
            leadForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for contacting Imperative Home Creation. Our expert will reach out to you shortly to assist with your property needs.');
                this.reset();
            });
        }

        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your inquiry. We will contact you shortly to schedule your property viewing.');
                this.reset();
            });
        }

        // Add this JavaScript at the end of your file, before the closing </script> tag

// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxDesc = document.querySelector('.lightbox-desc');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  
  let currentIndex = 0;
  
  // Open lightbox
  function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[currentIndex];
    const img = item.querySelector('img');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = item.querySelector('.gallery-item-title').textContent;
    lightboxDesc.textContent = item.querySelector('.gallery-item-desc').textContent;
    
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = ''; // Enable scrolling
  }
  
  // Navigate to next image
  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightbox();
  }
  
  // Navigate to previous image
  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
  }
  
  // Update lightbox content
  function updateLightbox() {
    const item = galleryItems[currentIndex];
    const img = item.querySelector('img');
    
    // Reset animation
    lightboxImg.style.opacity = 0;
    lightboxImg.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxTitle.textContent = item.querySelector('.gallery-item-title').textContent;
      lightboxDesc.textContent = item.querySelector('.gallery-item-desc').textContent;
      
      // Reapply animation
      lightboxImg.style.opacity = '';
      lightboxImg.style.transform = '';
    }, 300);
  }
  
  // Event listeners
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });
  
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', nextImage);
  lightboxPrev.addEventListener('click', prevImage);
  
  // Close lightbox when clicking on background
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
});
// Accordion functionality
const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        // Close all other items
        accordionItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});