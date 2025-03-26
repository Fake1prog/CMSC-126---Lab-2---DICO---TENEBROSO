/**
 * Parallax Overlap Scroll Effect
 * Creates smooth overlapping transitions between sections during scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section.home, section.projects, section.skills');
  const isDarkTheme = document.body.classList.contains('dark-theme');
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color') || '#DB704C';

  // Configure sections for parallax effect
  function initializeSections() {
    sections.forEach((section, index) => {
      if (index > 0) {
        section.style.position = 'relative';
        section.style.zIndex = 30 - (index * 10);

        // Create curved top edge effect for overlapping sections
        const sectionId = section.getAttribute('id');
        const existingStyle = document.getElementById(`${sectionId}-style`);

        if (!existingStyle) {
          const style = document.createElement('style');
          style.id = `${sectionId}-style`;
          style.textContent = `
            #${sectionId}::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 60px;
              background-color: inherit;
              border-radius: 30px 30px 0 0;
              transform: translateY(-30px);
              z-index: -1;
            }

            /* Dark mode and light mode compatibility */
            .dark-theme #${sectionId}::before {
              background-color: var(--dark-bg-color, #121212);
            }

            .light-theme #${sectionId}::before {
              background-color: var(--light-bg-color, #ffffff);
            }
          `;
          document.head.appendChild(style);
        }
      }
    });
  }

  // Core parallax animation logic
  function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Reset home section when scrolling back to top
    if (scrollY < 50) {
      const homeSection = document.querySelector('section.home');
      if (homeSection) {
        homeSection.style.transform = 'none';
        homeSection.style.opacity = '1';
      }
    }

    const isDarkMode = document.body.classList.contains('dark-theme');

    sections.forEach((section, index) => {
      if (index === 0) return;

      // Calculate section visibility progress
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const offsetFromTrigger = scrollY - (sectionTop - windowHeight * 0.8);
      const triggerProgress = Math.max(0, Math.min(1, offsetFromTrigger / (windowHeight * 0.4)));

      if (triggerProgress > 0) {
        // Apply transform animations based on scroll position
        const translateY = -80 * (1 - triggerProgress);
        const scale = 0.97 + (0.03 * triggerProgress);
        const opacity = 0.7 + (0.3 * triggerProgress);

        section.style.transform = `translateY(${translateY}px) scale(${scale})`;
        section.style.opacity = opacity;

        // Fade out home section border as project section appears
        if (index === 1) {
          const homeBorder = document.querySelector('.home::after');
          if (homeBorder) {
            const borderOpacity = Math.max(0, 0.8 - triggerProgress);
            homeBorder.style.opacity = borderOpacity.toString();
          }
        }

        // Create depth effect by scaling down previous section
        if (index > 1) {
          const prevSection = sections[index - 1];
          prevSection.style.transform = `scale(${1 - (triggerProgress * 0.03)})`;
        }
      }
    });
  }

  initializeSections();
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Update effect when theme changes
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', function() {
      setTimeout(handleScroll, 50);
    });
  }

  // Handle browser back button and page refresh correctly
  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      sections.forEach(section => {
        section.style.transform = 'none';
        section.style.opacity = '1';
      });

      setTimeout(() => {
        initializeSections();
        handleScroll();
      }, 100);
    }
  });

  // Integrate with smooth scrolling functionality
  if (!window.smoothScrollInitialized) {
    window.smoothScrollInitialized = true;

    document.querySelectorAll('a[href^="#"]:not(.handled-scroll)').forEach(anchor => {
      anchor.classList.add('handled-scroll');
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          e.preventDefault();

          const offset = targetSection.id === 'home' ? 0 : -50;
          const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY + offset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  handleScroll();
  window.addEventListener('resize', handleScroll, { passive: true });
});
