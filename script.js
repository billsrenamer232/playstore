/* =====================================================
   GOOGLE PLAY STORE - JAVASCRIPT INTERACTIONS
   ===================================================== */

(function() {
  'use strict';

  // ── SIDEBAR TOGGLE ──────────────────────────────────
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');

  if (hamburgerBtn && sidebar) {
    hamburgerBtn.addEventListener('click', () => {
      const isVisible = sidebar.style.display !== 'none' && sidebar.style.display !== '';
      sidebar.style.display = isVisible ? 'none' : 'block';
    });
  }

  // ── SIDEBAR ACTIVE STATE ─────────────────────────────
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ── TABS ─────────────────────────────────────────────
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(content => {
        const contentId = content.id.replace('tab-', '');
        if (contentId === targetTab) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });

  // ── READ MORE / LESS ─────────────────────────────────
  const readMoreBtn = document.getElementById('readMoreBtn');
  const readLessBtn = document.getElementById('readLessBtn');
  const shortText = document.getElementById('aboutTextShort');
  const fullText = document.getElementById('aboutTextFull');

  if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
      shortText.classList.add('hidden');
      fullText.classList.remove('hidden');
    });
  }

  if (readLessBtn) {
    readLessBtn.addEventListener('click', () => {
      fullText.classList.add('hidden');
      shortText.classList.remove('hidden');
    });
  }

  // ── SCREENSHOT SCROLL ─────────────────────────────────
  const track = document.getElementById('screenshotsTrack');
  const scrollLeftBtn = document.getElementById('scrollLeft');
  const scrollRightBtn = document.getElementById('scrollRight');

  if (track) {
    const SCROLL_AMOUNT = 230;

    if (scrollLeftBtn) {
      scrollLeftBtn.addEventListener('click', () => {
        track.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
      });
    }

    if (scrollRightBtn) {
      scrollRightBtn.addEventListener('click', () => {
        track.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
      });
    }

    // Hide/show arrows based on scroll position
    const updateArrows = () => {
      if (scrollLeftBtn) scrollLeftBtn.style.opacity = track.scrollLeft > 10 ? '1' : '0.3';
      if (scrollRightBtn) {
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
        scrollRightBtn.style.opacity = atEnd ? '0.3' : '1';
      }
    };

    track.addEventListener('scroll', updateArrows);
    updateArrows();
  }

  // ── TOAST NOTIFICATION ───────────────────────────────
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  function showToast(message, duration = 3000) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }

  // ── INSTALL BUTTON ────────────────────────────────────
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.addEventListener('click', function(e) {
      // Allow the download to proceed (href="app.apk")
      showToast('Downloading vdesi.apk...');

      // Simulate install progress animation
      const originalText = this.textContent;
      this.textContent = 'Downloading...';
      this.style.background = '#34a853';

      setTimeout(() => {
        this.textContent = '✓ Downloaded';
        this.style.background = '#34a853';
      }, 1500);

      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = '';
      }, 4000);
    });
  }

  // ── SIM INSTALL BUTTONS ───────────────────────────────
  document.querySelectorAll('.sim-install-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const appName = this.closest('.similar-app-card').querySelector('.sim-name').textContent;
      showToast(`Downloading ${appName}.apk...`);
    });
  });

  // ── WISHLIST BUTTON ───────────────────────────────────
  const wishlistBtn = document.getElementById('wishlistBtn');
  if (wishlistBtn) {
    let wishlisted = false;
    wishlistBtn.addEventListener('click', function() {
      wishlisted = !wishlisted;
      this.style.background = wishlisted ? '#fce4ec' : '';
      this.style.borderColor = wishlisted ? '#e91e63' : '';
      this.style.color = wishlisted ? '#e91e63' : '';
      showToast(wishlisted ? 'Added to wishlist' : 'Removed from wishlist');
    });
  }

  // ── SHARE BUTTON ─────────────────────────────────────
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: 'vdesi – Social & Chat',
          text: 'Check out vdesi on Google Play!',
          url: window.location.href
        }).catch(() => {});
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Link copied to clipboard!');
        }).catch(() => {
          showToast('Share link copied!');
        });
      }
    });
  }

  // ── HELPFUL BUTTONS ───────────────────────────────────
  document.querySelectorAll('.helpful-btns button').forEach(btn => {
    btn.addEventListener('click', function() {
      const parent = this.closest('.helpful-btns');
      parent.querySelectorAll('button').forEach(b => {
        b.style.borderColor = '';
        b.style.color = '';
        b.style.background = '';
      });
      this.style.borderColor = '#1a73e8';
      this.style.color = '#1a73e8';
      this.style.background = '#e8f0fe';
      showToast('Thanks for your feedback!');
    });
  });

  // ── SEE ALL REVIEWS ───────────────────────────────────
  const seeAllBtn = document.getElementById('seeAllReviews');
  if (seeAllBtn) {
    seeAllBtn.addEventListener('click', () => {
      showToast('Loading all reviews...');
    });
  }

  // ── AVATAR MENU ───────────────────────────────────────
  const avatarBtn = document.getElementById('avatarBtn');
  if (avatarBtn) {
    avatarBtn.addEventListener('click', () => {
      showToast('Account: user@example.com');
    });
  }

  // ── TOPBAR SCROLL SHADOW ──────────────────────────────
  const topbar = document.getElementById('topbar');
  window.addEventListener('scroll', () => {
    if (topbar) {
      if (window.scrollY > 0) {
        topbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
      } else {
        topbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      }
    }
  });

  // ── RATING BARS ANIMATION ─────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.bar-fill').forEach(bar => {
    const currentWidth = bar.style.width;
    bar.dataset.width = currentWidth;
    bar.style.width = '0%';
    observer.observe(bar);
  });

  // ── SEARCH ────────────────────────────────────────────
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) showToast(`Searching for "${query}"...`);
      }
    });
  }

  // ── SCREENSHOT CLICK TO ZOOM ──────────────────────────
  document.querySelectorAll('.screenshot-item img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.85);
        display: flex; align-items: center; justify-content: center;
        z-index: 9998; cursor: zoom-out; animation: fadeIn 0.2s ease;
      `;
      const zoomedImg = document.createElement('img');
      zoomedImg.src = this.src;
      zoomedImg.alt = this.alt;
      zoomedImg.style.cssText = `
        max-height: 90vh; max-width: 90vw;
        border-radius: 12px; box-shadow: 0 16px 48px rgba(0,0,0,0.5);
      `;
      overlay.appendChild(zoomedImg);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  console.log('%c vdesi Play Store Page Loaded ', 
    'background: #1a73e8; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;');

  // ── MOBILE BOTTOM NAV ─────────────────────────────────
  document.querySelectorAll('.mob-nav-item').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.mob-nav-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ── TOUCH SWIPE FOR SCREENSHOTS ───────────────────────
  if (track) {
    let touchStartX = 0;
    let touchScrollStart = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchScrollStart = track.scrollLeft;
    }, { passive: true });
    track.addEventListener('touchmove', (e) => {
      const diff = touchStartX - e.touches[0].clientX;
      track.scrollLeft = touchScrollStart + diff;
    }, { passive: true });
  }

  // ── PREVENT ZOOM ON DOUBLE TAP (iOS) ──────────────────
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
  }, { passive: false });

})();
