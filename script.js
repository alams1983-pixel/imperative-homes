
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
        
        // Form submission
        document.getElementById('leadForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send this data to a server
            // For demonstration, we'll show an alert
            alert('Thank you for contacting Imperative Home Creation. Our expert will reach out to you shortly to assist with your property needs.');
            this.reset();
        });

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