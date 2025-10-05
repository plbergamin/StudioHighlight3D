//hamburger-menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = navLinks.querySelectorAll('a');

  function closeMenu() {
    navLinks.classList.remove('active');
    hamburger.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  });

  // Close menu when clicking any link
  navItems.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});




//hero section
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtext = document.querySelector('.hero-subtext');
  const heroCtas = document.querySelector('.hero-ctas');
  const header = document.querySelector('header');

  // Wrap letters per word to preserve word wrapping
  const text = heroTitle.textContent;
  heroTitle.textContent = '';

  // Split into words
  const words = text.split(' ');
  words.forEach((word, wIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.whiteSpace = 'nowrap'; // keep word together
    word.split('').forEach((char, i) => {
      const charSpan = document.createElement('span');
      charSpan.textContent = char;
      charSpan.style.display = 'inline-block';
      charSpan.style.opacity = 0;
      charSpan.style.transform = 'translateX(-20px)';
      charSpan.style.animation = 'letterFade 0.5s forwards';
      // Delay is calculated across words for smooth sequence
      charSpan.style.animationDelay = `${(wIndex * word.length + i) * 0.08}s`;
      wordSpan.appendChild(charSpan);
    });
    heroTitle.appendChild(wordSpan);
    heroTitle.appendChild(document.createTextNode(' ')); // space between words
  });

  // Fade in hero-copy
  setTimeout(() => {
    heroTitle.parentElement.style.opacity = 1;
  }, 100);

  // After letters animate, fade in subtext, CTAs, and header
  const totalDuration = text.replace(/\s/g,'').length * 80 + 500;
  setTimeout(() => {
    heroSubtext.style.opacity = 1;
    heroSubtext.style.transform = 'translateY(0)';
    heroCtas.style.opacity = 1;
    heroCtas.style.transform = 'translateY(0)';
    if(header) header.style.opacity = 1;
  }, totalDuration);
});




// header-scroll.js
// Adds a "scrolled" class to the header when the user scrolls down

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');

  if (!header) return; // safety check

  const scrollThreshold = 50; // pixels before header changes

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});


// portfolio.js
document.addEventListener('DOMContentLoaded', () => {
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  const lightbox = document.createElement('div');
  lightbox.className = 'portfolio-lightbox';
  lightbox.innerHTML = `
    <div class="portfolio-lightbox-info">
      <h3></h3>
      <p></p>
    </div>
    <button class="portfolio-lightbox-close" aria-label="Close">×</button>
    <button class="nav-arrow left" aria-label="Previous">&#10094;</button>
    <div class="portfolio-lightbox-content"><img src="" alt=""></div>
    <button class="nav-arrow right" aria-label="Next">&#10095;</button>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const lightboxTitle = lightbox.querySelector('.portfolio-lightbox-info h3');
  const lightboxLoc = lightbox.querySelector('.portfolio-lightbox-info p');
  const closeBtn = lightbox.querySelector('.portfolio-lightbox-close');
  const prevBtn = lightbox.querySelector('.nav-arrow.left');
  const nextBtn = lightbox.querySelector('.nav-arrow.right');

  let currentIndex = 0;
  let currentImages = [];

  portfolioCards.forEach((card) => {
    card.addEventListener('click', () => {
      const placeholders = card.querySelectorAll('.image-placeholders img');
      currentImages = [...placeholders].map(img => img.src);
      currentIndex = 0;

      const infoH3 = card.querySelector('.portfolio-info h3');
      const infoP = card.querySelector('.portfolio-info p');
      lightboxTitle.textContent = infoH3 ? infoH3.textContent : '';
      lightboxLoc.textContent = infoP ? infoP.textContent : '';

      lightbox.classList.add('active');
      showImage(currentIndex, true);
    });
  });

  function showImage(index, immediate = false) {
    if (!currentImages.length) return;
    if (index < 0) index = currentImages.length - 1;
    if (index >= currentImages.length) index = 0;
    currentIndex = index;

    if (immediate) {
      lightboxImg.style.opacity = 1;
      lightboxImg.src = currentImages[currentIndex];
      return;
    }

    // Fade out
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = currentImages[currentIndex];
      // Fade in
      lightboxImg.style.opacity = 1;
    }, 300); // matches CSS transition
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
});





// value-prop.js
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".value-card");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach(card => observer.observe(card));
});


// process.js
// Adds "animate" to .process-steps (enables CSS animation mode), then reveals steps as they enter view.

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.process-steps');
  if (!container) return;

  // Enable animation mode (makes steps start hidden via CSS)
  container.classList.add('animate');

  const steps = Array.from(container.querySelectorAll('.step'));

  // If IntersectionObserver is available, reveal steps when visible (staggered)
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const index = steps.indexOf(el);
          // Stagger reveal for nicer effect
          setTimeout(() => {
            el.classList.add('reveal');
          }, Math.min(300, index * 120));
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    steps.forEach(s => io.observe(s));
  } else {
    // Fallback: reveal all with a tiny stagger
    steps.forEach((el, i) => {
      setTimeout(() => el.classList.add('reveal'), i * 120);
    });
  }
});

// testimonials.js
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = [
    {
      text: "“These visuals helped us pre-sell 80% of units before construction even started — incredible ROI.”",
      author: "Maria Torres",
      role: "Real Estate Developer, UrbanRise"
    },
    {
      text: "“The clarity and realism impressed our investors so much that we secured funding in record time.”",
      author: "David Chen",
      role: "Architect, D&C Studio"
    },
    {
      text: "“Fast turnaround, beautiful results. Our competition presentation was elevated to a whole new level.”",
      author: "Elena Rossi",
      role: "Interior Designer, Rossi Atelier"
    }
  ];

  const card = document.getElementById("testimonialCard");
  let currentIndex = 0;

  function showTestimonial(index) {
    const t = testimonials[index];
    card.classList.remove("active");

    setTimeout(() => {
      card.innerHTML = `
        <p>${t.text}</p>
        <span class="author">${t.author}</span>
        <span class="role">${t.role}</span>
      `;
      requestAnimationFrame(() => card.classList.add("active"));
    }, 300);
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }

  // Initialize first testimonial
  showTestimonial(currentIndex);

  // Rotate automatically every 6 seconds
  setInterval(nextTestimonial, 6000);
});


// process.js
document.addEventListener("DOMContentLoaded", () => {
  const processSection = document.querySelector("#process");
  const steps = document.querySelectorAll(".step-circle");
  const line = document.querySelector(".process-steps::after"); // pseudo can't be selected directly
  const stepsContainer = document.querySelector(".process-steps");

  // We'll simulate the animated line with inline style
  const progressLine = document.createElement("div");
  progressLine.classList.add("progress-line");
  stepsContainer.appendChild(progressLine);

  // style it like the ::after
  Object.assign(progressLine.style, {
    position: "absolute",
    top: "50px",
    left: "0",
    height: "3px",
    width: "0%",
    background: "var(--color-accent, #ffcc00)",
    zIndex: "1",
    transition: "width 2s ease"
  });

  function animateProcess() {
    const rect = processSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {


      // Activate circles step by step
      steps.forEach((circle, index) => {
        setTimeout(() => {
          circle.classList.add("active");
        }, index * 600); // delay each
      });

      window.removeEventListener("scroll", animateProcess);
    }
  }

  window.addEventListener("scroll", animateProcess);
});
