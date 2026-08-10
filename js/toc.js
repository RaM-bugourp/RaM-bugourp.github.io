/* ============================================================
 * TOC (Table of Contents) for article pages
 *
 * Uses React Bits "LineSidebar" (JS-CSS variant) as the visual
 * component: https://reactbits.dev/r/LineSidebar-JS-CSS
 * The original is a React component (LineSidebar.jsx); this site
 * is a framework-free static site, so the component logic is
 * ported 1:1 to vanilla JavaScript with the same CSS classes and
 * behavior (cursor-proximity line marker + active highlighting).
 * ============================================================ */
(function () {
    'use strict';

    // Only run on article pages (pages with .post-content).
    var content = document.querySelector('.post-content');
    if (!content) return;

    var headings = Array.prototype.slice.call(content.querySelectorAll('h2, h3'));
    if (headings.length === 0) return;

    var sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    /* ---------- 1. Build the TOC from the article headings ---------- */

    // Give every heading a stable anchor id so TOC clicks can jump to it.
    headings.forEach(function (heading, i) {
        if (!heading.id) heading.id = 'toc-' + (i + 1);
    });

    var card = document.createElement('div');
    card.className = 'toc-card';

    var title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = '📖 目录';
    card.appendChild(title);

    var nav = document.createElement('nav');
    nav.className = 'line-sidebar line-sidebar--markers line-sidebar--scale-tick';
    nav.setAttribute('aria-label', '文章目录');
    nav.style.setProperty('--accent-color', '#D9B48B');
    nav.style.setProperty('--text-color', '#9CA3AF');
    nav.style.setProperty('--marker-color', '#6B7280');
    nav.style.setProperty('--marker-length', '44px');
    nav.style.setProperty('--marker-gap', '8px');
    nav.style.setProperty('--tick-scale', '0.55');
    nav.style.setProperty('--max-shift', '24px');
    nav.style.setProperty('--item-gap', '12px');
    nav.style.setProperty('--font-size', '0.92rem');
    nav.style.setProperty('--smoothing', '100ms');

    var list = document.createElement('ul');
    list.className = 'line-sidebar__list';

    var itemEls = headings.map(function (heading, i) {
        var li = document.createElement('li');
        li.className = 'line-sidebar__item' + (heading.tagName === 'H3' ? ' line-sidebar__item--sub' : '');
        li.innerHTML =
            '<span class="line-sidebar__marker" aria-hidden="true"></span>' +
            '<span class="line-sidebar__label">' +
            '<span class="line-sidebar__index"></span>' +
            '<span class="line-sidebar__text"></span>' +
            '</span>';
        li.querySelector('.line-sidebar__index').textContent = String(i + 1).padStart(2, '0');
        li.querySelector('.line-sidebar__text').textContent = heading.textContent.trim();
        list.appendChild(li);
        return li;
    });

    nav.appendChild(list);
    card.appendChild(nav);

    // Insert the TOC card right below the profile card in the right column.
    var profileCard = sidebar.querySelector('.profile-card');
    if (profileCard) {
        sidebar.insertBefore(card, profileCard.nextSibling);
    } else {
        sidebar.appendChild(card);
    }

    /* ---------- 2. LineSidebar effect engine (ported from React Bits) ---------- */

    var FALLOFF_CURVES = {
        linear: function (p) { return p; },
        smooth: function (p) { return p * p * (3 - 2 * p); },
        sharp: function (p) { return p * p * p; }
    };

    var falloff = FALLOFF_CURVES.smooth; // default falloff
    var proximityRadius = 100;           // px, default proximityRadius
    var smoothing = 100;                 // ms, default smoothing
    var targets = new Array(itemEls.length).fill(0);
    var current = new Array(itemEls.length).fill(0);
    var activeIndex = -1;                // -1 so the first setActive() applies aria-current
    var rafId = null;
    var lastTime = performance.now();
    var STICKY_OFFSET = 96;              // px from viewport top where a heading counts as current

    // Single rAF loop that eases every item's --effect toward its target using
    // frame-rate independent exponential smoothing (same as the React version).
    function runFrame(now) {
        var dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;
        var tau = Math.max(smoothing, 1) / 1000;
        var k = 1 - Math.exp(-dt / tau);

        var moving = false;
        for (var i = 0; i < itemEls.length; i++) {
            var el = itemEls[i];
            if (!el) continue;
            var target = Math.max(targets[i] || 0, activeIndex === i ? 1 : 0);
            var cur = current[i] || 0;
            var next = cur + (target - cur) * k;
            var settled = Math.abs(target - next) < 0.0015;
            var value = settled ? target : next;
            current[i] = value;
            el.style.setProperty('--effect', value.toFixed(4));
            if (!settled) moving = true;
        }

        rafId = moving ? requestAnimationFrame(runFrame) : null;
    }

    function startLoop() {
        if (rafId != null) cancelAnimationFrame(rafId);
        lastTime = performance.now();
        rafId = requestAnimationFrame(runFrame);
    }

    function handlePointerMove(event) {
        var rect = list.getBoundingClientRect();
        var pointerY = event.clientY - rect.top;
        for (var i = 0; i < itemEls.length; i++) {
            var el = itemEls[i];
            var center = el.offsetTop + el.offsetHeight / 2;
            var distance = Math.abs(pointerY - center);
            targets[i] = falloff(Math.max(0, 1 - distance / proximityRadius));
        }
        startLoop();
    }

    function handlePointerLeave() {
        targets = targets.map(function () { return 0; });
        startLoop();
    }

    list.addEventListener('pointermove', handlePointerMove, { passive: true });
    list.addEventListener('pointerleave', handlePointerLeave);

    function setActive(index) {
        if (activeIndex === index) return;
        activeIndex = index;
        itemEls.forEach(function (el, i) {
            if (i === index) el.setAttribute('aria-current', 'true');
            else el.removeAttribute('aria-current');
        });
        startLoop();

        // Keep the active entry visible inside the TOC's own scroll area
        // (only scrolls the card, never the page).
        var li = itemEls[index];
        var cardTop = card.getBoundingClientRect().top;
        var liTop = li.getBoundingClientRect().top - cardTop + card.scrollTop;
        if (liTop < card.scrollTop) {
            card.scrollTop = liTop - 4;
        } else if (liTop + li.offsetHeight > card.scrollTop + card.clientHeight) {
            card.scrollTop = liTop + li.offsetHeight - card.clientHeight + 4;
        }
    }

    /* ---------- 3. Click a TOC entry -> smooth scroll to the heading ---------- */

    itemEls.forEach(function (li, i) {
        li.addEventListener('click', function () {
            setActive(i);
            headings[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* ---------- 4. Scroll spy: highlight the heading in the window's range ---------- */

    function updateActiveFromScroll() {
        var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        var index = 0;
        if (atBottom) {
            index = headings.length - 1;
        } else {
            for (var i = 0; i < headings.length; i++) {
                if (headings[i].getBoundingClientRect().top <= STICKY_OFFSET) index = i;
            }
        }
        setActive(index);
    }

    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    window.addEventListener('resize', updateActiveFromScroll, { passive: true });
    updateActiveFromScroll();
})();
