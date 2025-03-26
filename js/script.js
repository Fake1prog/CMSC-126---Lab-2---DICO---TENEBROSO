/**
 * Main site functionality
 * Includes theme switching, smooth scrolling, animations, and interactive elements
 */

// Theme management
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Initialize theme based on preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme);
  themeToggle.checked = savedTheme === 'light-theme';
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  body.classList.add('light-theme');
  themeToggle.checked = true;
}

// Theme toggle handler
themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark-theme');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]:not(.lets-connect):not(.logo-link)').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, observerOptions);

document.querySelectorAll('.project-item, .skills-content').forEach(el => {
  observer.observe(el);
});

// Navigation handlers
document.querySelector('.lets-connect').addEventListener('click', function(e) {
  e.preventDefault();

  document.querySelectorAll('section:not(#contact)').forEach(section => {
    section.style.display = 'none';
  });

  const contactSection = document.querySelector('#contact');
  contactSection.style.display = 'flex';
  document.querySelector('.contact-content').classList.add('in-view');

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

document.querySelector('.contact .logo-link').addEventListener('click', function(e) {
  e.preventDefault();

  document.querySelector('#contact').style.display = 'none';

  document.querySelectorAll('section:not(#contact)').forEach(section => {
    section.style.display = '';
  });

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Particle animation system
const particles = document.querySelectorAll('.particle');

particles.forEach(particle => {
  const initialTop = parseFloat(getComputedStyle(particle).top);
  const initialLeft = parseFloat(getComputedStyle(particle).left);

  particle.style.top = `${initialTop + (Math.random() * 20 - 10)}px`;
  particle.style.left = `${initialLeft + (Math.random() * 20 - 10)}px`;
});

function createAnimatedParticles() {
  const particlesContainer = document.querySelector('.particles-container');

  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle additional-particle';

    const randomTop = Math.random() * 100;
    const randomLeft = Math.random() * 100;
    particle.style.top = `${randomTop}%`;
    particle.style.left = `${randomLeft}%`;

    const size = 3 + Math.random() * 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    const duration = 15 + Math.random() * 20;
    const delay = Math.random() * 10;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    particlesContainer.appendChild(particle);
  }
}

window.addEventListener('load', createAnimatedParticles);

// Interactive elements
document.querySelectorAll('.cmd-icon').forEach(icon => {
  icon.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
    this.style.transform = 'scale(1.5)';
  });

  icon.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
    this.style.transform = '';
  });
});
