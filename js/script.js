document.addEventListener("DOMContentLoaded", function() {
  // Navbar scroll effect
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-links');
  
  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a nav link
  document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }));
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Animate on scroll initialization
  // Create intersection observer for skills animation
  const skillLevels = document.querySelectorAll('.skill-level');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.style.width;
      }
    });
  }, { threshold: 0.2 });
  
  skillLevels.forEach(skill => {
    skillObserver.observe(skill);
  });
  
  // Animate sections on scroll
  const animatedSections = document.querySelectorAll('section:not(.hero)');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  animatedSections.forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
  });
  
  // Form submission
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! This form is currently just a demo.');
      form.reset();
    });
  }

  // Animate skill bars when in viewport
  function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
      const bar = item.querySelector('.skill-level');
      const width = bar.style.width;
      
      // Reset width for animation
      bar.style.width = '0%';
      
      // Set a timeout to trigger animation
      setTimeout(() => {
        bar.style.width = width;
      }, 300);
    });
  }
  
  // Add CSS for section animations
  const style = document.createElement('style');
  style.textContent = `
    .section-hidden {
      opacity: 0;
      transform: translateY(50px);
      transition: all 1s;
    }
    
    .fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  // Call animate skill bars when skills section is in view
  const skillsSection = document.querySelector('.skills');
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillsObserver.observe(skillsSection);
});