const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // Inline clip player: YouTube plays in-place, Instagram opens the reel
    document.querySelectorAll('.clip').forEach((clip) => {
      clip.addEventListener('click', () => {
        const thumb = clip.querySelector('.clip-thumb');
        if (thumb.classList.contains('playing')) return;
        const yt = clip.getAttribute('data-yt');
        if (yt) {
          thumb.classList.add('playing');
          thumb.innerHTML = '';
          const f = document.createElement('iframe');
          f.src = 'https://www.youtube.com/embed/' + yt + '?autoplay=1&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=' + yt;
          f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
          f.setAttribute('allowfullscreen', '');
          thumb.appendChild(f);
        } else {
          const href = clip.getAttribute('data-href');
          if (href) window.open(href, '_blank', 'noopener');
        }
      });
    });
