// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false
  });

  // Preloader
  window.addEventListener('load', function() {
    document.querySelector('#preloader').style.display = 'none';
  });

  // Navbar scroll effect
  const navbar = document.querySelector('#mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    
    // Active link based on scroll position
    let scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Typewriter effect
  const typewriterText = document.getElementById('typewriter-text');
  const phrases = ['Full Stack Developer', 'AI Enthusiast', 'Problem Solver', 'Creative Thinker'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeDelay = 150;
  
  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeDelay = 100;
    } else {
      typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeDelay = 150;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeDelay = 2000; // Wait before deleting
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
      typeDelay = 500; // Wait before typing new phrase
    }
    
    setTimeout(typeWriter, typeDelay);
  }
  
  // Start the typewriter effect
  setTimeout(typeWriter, 1000);
  
  // Back to top button
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });
  
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Projects filter
  const filterButtons = document.querySelectorAll('.project-filter button');
  const projectItems = document.querySelectorAll('.project-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 200);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Load more projects (demo functionality)
  const loadMoreBtn = document.getElementById('loadMoreProjects');
  let projectsVisible = true;
  
  loadMoreBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (projectsVisible) {
      this.textContent = 'Show Less';
      // In a real implementation, you would load more projects here
      // For demo purposes, we're just changing the button text
      projectsVisible = false;
      
      // Example of showing a toast notification
      showToast('No more projects to load!', 'info');
    } else {
      this.textContent = 'Load More Projects';
      projectsVisible = true;
    }
  });
  
  // Resume download (demo functionality)
  const downloadResumeBtn = document.getElementById('downloadResume');
  
  downloadResumeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // In a real implementation, this would trigger a file download
    // For demo purposes, show a notification
    showToast('Resume download started!', 'success');
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  const submitButton = document.getElementById('submitButton');
  const submitText = submitButton.querySelector('.submit-text');
  const spinner = submitButton.querySelector('.spinner-border');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    submitText.textContent = 'Sending...';
    spinner.classList.remove('d-none');
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(function() {
      // Hide loading state
      submitText.textContent = 'Send Message';
      spinner.classList.add('d-none');
      submitButton.disabled = false;
      
      // Show success modal
      const successModal = new bootstrap.Modal(document.getElementById('successModal'));
      successModal.show();
      
      // Reset form
      contactForm.reset();
    }, 2000);
  });
  
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Dark mode toggle
  const themeSwitcher = document.getElementById('themeSwitcher');
  const themeIcon = document.getElementById('themeIcon');
  let isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Apply initial theme based on localStorage
  if (isDarkMode) {
    document.body.setAttribute('data-theme', 'dark');
    themeIcon.classList.remove('bi-moon-fill');
    themeIcon.classList.add('bi-sun-fill');
  }
  
  themeSwitcher.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
      themeIcon.classList.remove('bi-moon-fill');
      themeIcon.classList.add('bi-sun-fill');
    } else {
      document.body.removeAttribute('data-theme');
      themeIcon.classList.remove('bi-sun-fill');
      themeIcon.classList.add('bi-moon-fill');
    }
  });
  
  // Progress bar animation
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const animateProgressBars = () => {
    progressBars.forEach(bar => {
      const width = bar.getAttribute('aria-valuenow') + '%';
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  };
  
  // Trigger progress bar animation when skills section is visible
  const skillsSection = document.getElementById('skills');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgressBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  if (skillsSection) {
    observer.observe(skillsSection);
  }
  
  // Utility function to show toast notifications
  function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center text-white bg-${type}" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    // Initialize and show toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
    
    // Remove toast after it's hidden
    toastElement.addEventListener('hidden.bs.toast', function() {
      this.remove();
    });
  }
});