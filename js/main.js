/* ==========================================================================
   PORTFOLIO — main.js
   Renders all content from siteData (js/data.js) and wires up interactions.
   No inline handlers are used anywhere; everything is addEventListener.
   ========================================================================== */

(function () {
  'use strict';

  var D = window.siteData || {};
  var personal = D.personal || {};
  var contact = D.contact || {};
  var meta = D.meta || {};

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- tiny helpers ---------- */

  function $(id) { return document.getElementById(id); }
  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function setText(id, text) {
    var el = $(id);
    if (el && text != null) el.textContent = text;
  }

  /* Allow only safe URLs: https, mailto, and site-relative paths. */
  function safeUrl(url) {
    if (!url) return '';
    var u = String(url).trim();
    if (/^(javascript|data|vbscript):/i.test(u)) return '';
    if (/^[a-z][a-z0-9+.-]*:/i.test(u) && !/^(https?|mailto):/i.test(u)) return '';
    return u;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function showSection(name, show) {
    var section = $(name);
    if (section) section.hidden = !show;
    var navItem = document.querySelector('li[data-nav="' + name + '"]');
    if (navItem) navItem.hidden = !show;
  }

  function isNonEmptyString(v) {
    return typeof v === 'string' && v.trim().length > 0;
  }

  function isNonEmptyArray(v) {
    return Array.isArray(v) && v.length > 0;
  }

  /* ---------- metadata ---------- */

  function renderMeta() {
    if (meta.title) document.title = meta.title;
    function setMetaContent(selector, value) {
      if (!value) return;
      var m = document.querySelector(selector);
      if (m) m.setAttribute('content', value);
    }
    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[property="og:image"]', safeUrl(meta.ogImage));
    setMetaContent('meta[name="twitter:title"]', meta.title);
    setMetaContent('meta[name="twitter:description"]', meta.description);
  }

  /* ---------- personal / hero ---------- */

  function renderPersonal() {
    var name = personal.name || '';
    setText('heroName', name);
    setText('logoText', '[' + (name || 'YOUR NAME') + ']');
    setText('footerName', name);
    setText('heroSubtitle', personal.title);
    setText('heroLocation', personal.location);
    $('heroLocation').hidden = !isNonEmptyString(personal.location);

    var img = $('profileImage');
    if (img) {
      img.alt = name ? 'Portrait of ' + name : 'Profile photo';
      var fallback = personal.profileImageFallback || 'assets/profile-placeholder.svg';
      img.addEventListener('error', function onImageError() {
        if (img.getAttribute('src') !== fallback) {
          img.setAttribute('src', fallback);
        } else {
          var wrap = $('portraitWrap');
          if (wrap) wrap.hidden = true;
          img.removeEventListener('error', onImageError);
        }
      });
      img.setAttribute('src', safeUrl(personal.profileImage) || fallback);
    }

    var btnProjects = $('btnProjects');
    if (btnProjects) btnProjects.hidden = false;

    startTyping(personal.taglines);
  }

  function startTyping(lines) {
    var target = $('heroTagline');
    if (!target) return;
    var list = (Array.isArray(lines) ? lines : []).filter(isNonEmptyString);
    if (!list.length) { target.textContent = ''; return; }
    if (reducedMotion || list.length === 1) {
      target.textContent = list[0];
      return;
    }
    var li = 0, ci = 0, deleting = false;
    function tick() {
      var text = list[li];
      if (!deleting) {
        ci++;
        target.textContent = text.slice(0, ci);
        if (ci === text.length) {
          deleting = true;
          return setTimeout(tick, 2400);
        }
        return setTimeout(tick, 55);
      }
      ci--;
      target.textContent = text.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        li = (li + 1) % list.length;
        return setTimeout(tick, 450);
      }
      return setTimeout(tick, 28);
    }
    tick();
  }

  /* ---------- about ---------- */

  function renderAbout() {
    var bio = (D.about && D.about.bio) || '';
    var highlights = (D.about && D.about.highlights) || [];
    var list = $('aboutHighlights');
    if (list) {
      list.innerHTML = '';
      highlights.forEach(function (item) {
        if (isNonEmptyString(item)) list.appendChild(el('li', null, item));
      });
      list.hidden = list.children.length === 0;
    }
    var hasContent = isNonEmptyString(bio) || list.children.length > 0;
    setText('aboutBio', bio);
    $('aboutBio').hidden = !isNonEmptyString(bio);
    showSection('about', hasContent);
  }

  /* ---------- skills ---------- */

  function renderSkillGroup(groupId, listId, items) {
    var list = $(listId);
    var group = $(groupId);
    if (!list || !group) return;
    list.innerHTML = '';
    (Array.isArray(items) ? items : []).forEach(function (item) {
      if (isNonEmptyString(item)) list.appendChild(el('li', null, item));
    });
    group.hidden = list.children.length === 0;
  }

  // Development card: sub-groups with small labels above each tag group.
  function renderDevelopmentGroup(groupId, containerId, subgroups) {
    var container = $(containerId);
    var group = $(groupId);
    if (!container || !group) return;
    container.innerHTML = '';
    (Array.isArray(subgroups) ? subgroups : []).forEach(function (sub) {
      if (!sub || !isNonEmptyString(sub.label)) return;
      var wrap = el('div', 'skills-subgroup');
      wrap.appendChild(el('span', 'skills-subgroup-label', sub.label));
      var list = el('ul', 'skills-list');
      (Array.isArray(sub.items) ? sub.items : []).forEach(function (item) {
        if (isNonEmptyString(item)) list.appendChild(el('li', null, item));
      });
      wrap.appendChild(list);
      container.appendChild(wrap);
    });
    group.hidden = container.children.length === 0;
  }

  function renderSkills() {
    var skills = D.skills || {};
    renderSkillGroup('groupSecurity', 'skillsSecurity', skills.security);
    renderDevelopmentGroup('groupDevelopment', 'skillsDevelopment', skills.development);
    renderSkillGroup('groupTools', 'skillsTools', skills.tools);
    var anyVisible = ['groupSecurity', 'groupDevelopment', 'groupTools'].some(function (id) {
      var g = $(id);
      return g && !g.hidden;
    });
    showSection('skills', anyVisible);
  }

  /* ---------- web projects ---------- */

  function renderWebProjects() {
    var grid = $('webProjectsGrid');
    var projects = Array.isArray(D.webProjects) ? D.webProjects : [];
    grid.innerHTML = '';

    projects.forEach(function (p) {
      if (!p || !isNonEmptyString(p.name)) return;
      var card = el('article', 'card web-card reveal');

      // Screenshot(s) — accepts a single path or an array of paths.
      // Multiple screenshots become a click-to-cycle gallery.
      var shotWrap = el('div', 'web-shot');
      var shotPh = el('div', 'web-shot-placeholder');
      shotPh.appendChild(el('span', 'web-shot-ph-icon', '▦'));
      shotPh.appendChild(el('span', 'web-shot-ph-text', 'Screenshot placeholder'));
      shotWrap.appendChild(shotPh);

      var rawImages = Array.isArray(p.image) ? p.image : [p.image];
      var shotImages = [];
      var shotIndex = 0;
      var shotBadge = null;

      function showShot(index) {
        shotIndex = ((index % shotImages.length) + shotImages.length) % shotImages.length;
        shotImages.forEach(function (entry, i) {
          entry.img.hidden = i !== shotIndex;
        });
        if (shotBadge) shotBadge.textContent = (shotIndex + 1) + ' / ' + shotImages.length;
      }

      rawImages.forEach(function (rawSrc) {
        var src = safeUrl(rawSrc);
        if (!src) return;
        var img = el('img', 'web-shot-img');
        img.setAttribute('alt', 'Screenshot of ' + p.name);
        img.hidden = shotImages.length > 0;
        img.setAttribute('src', src);
        img.addEventListener('error', function onShotError() {
          img.removeEventListener('error', onShotError);
          var pos = shotImages.findIndex(function (e) { return e.img === img; });
          if (pos !== -1) {
            var wasVisible = pos === shotIndex;
            shotImages.splice(pos, 1);
            if (shotImages.length === 0) {
              if (shotBadge) shotBadge.remove();
              shotBadge = null;
              shotWrap.classList.remove('has-multi');
            } else if (wasVisible || shotIndex >= shotImages.length) {
              showShot(0);
            }
          }
          img.remove();
        });
        shotWrap.appendChild(img);
        shotImages.push({ img: img });
      });

      if (shotImages.length > 1) {
        shotBadge = el('span', 'web-shot-badge', '1 / ' + shotImages.length);
        shotWrap.appendChild(shotBadge);
        shotWrap.classList.add('has-multi');
        shotWrap.addEventListener('click', function () {
          showShot(shotIndex + 1);
        });
      }

      card.appendChild(shotWrap);

      // Title row: name + year
      var titleRow = el('div', 'web-title-row');
      titleRow.appendChild(el('span', 'card-title', p.name));
      if (isNonEmptyString(p.year)) {
        titleRow.appendChild(el('span', 'web-year', p.year));
      }
      card.appendChild(titleRow);

      if (isNonEmptyString(p.description)) {
        card.appendChild(el('p', 'card-text', p.description));
      }

      // What I built
      if (isNonEmptyString(p.built)) {
        var builtBlock = el('div', 'web-built');
        builtBlock.appendChild(el('span', 'detail-label', 'What I built'));
        builtBlock.appendChild(el('p', 'detail-text', p.built));
        card.appendChild(builtBlock);
      }

      if (isNonEmptyArray(p.tech)) {
        var tags = el('ul', 'tag-list');
        p.tech.forEach(function (t) {
          if (isNonEmptyString(t)) tags.appendChild(el('li', null, t));
        });
        card.appendChild(tags);
      }

      // Live URL + code URL (buttons only show when the URL exists)
      var url = safeUrl(p.url);
      var code = safeUrl(p.code);
      if (url || code) {
        var actions = el('div', 'card-actions');
        if (url) {
          var live = el('a', 'btn btn-ghost btn-small', 'Visit Site');
          live.setAttribute('href', url);
          live.setAttribute('target', '_blank');
          live.setAttribute('rel', 'noopener noreferrer');
          actions.appendChild(live);
        }
        if (code) {
          var codeLink = el('a', 'btn btn-ghost btn-small', 'View Code');
          codeLink.setAttribute('href', code);
          codeLink.setAttribute('target', '_blank');
          codeLink.setAttribute('rel', 'noopener noreferrer');
          actions.appendChild(codeLink);
        }
        card.appendChild(actions);
      }

      grid.appendChild(card);
    });

    // The Web Projects section is always shown.
    showSection('web-projects', true);
  }

  /* ---------- security engagements ---------- */

  var CHEVRON_SVG =
    '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">' +
    '<path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function renderEngagements() {
    var grid = $('engagementsGrid');
    var engagements = Array.isArray(D.engagements) ? D.engagements : [];
    grid.innerHTML = '';

    engagements.forEach(function (p, index) {
      if (!p || !isNonEmptyString(p.title)) return;
      var card = el('article', 'card project-card reveal');

      // Clickable header (button = keyboard accessible toggle)
      var toggle = el('button', 'project-toggle');
      toggle.setAttribute('type', 'button');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', 'project-details-' + index);
      toggle.setAttribute('aria-label', 'Toggle details for ' + p.title);

      var head = el('span', 'project-head');
      head.appendChild(el('span', 'card-title', p.title));
      var meta = el('span', 'project-meta');
      if (isNonEmptyString(p.sector)) meta.appendChild(el('span', 'sector-badge', p.sector));
      if (isNonEmptyString(p.type)) meta.appendChild(el('span', 'project-type', p.type));
      head.appendChild(meta);
      toggle.appendChild(head);

      var chevron = el('span', 'project-chevron');
      chevron.innerHTML = CHEVRON_SVG;
      toggle.appendChild(chevron);
      card.appendChild(toggle);

      if (isNonEmptyString(p.description)) {
        card.appendChild(el('p', 'card-text', p.description));
      }
      if (isNonEmptyArray(p.tech)) {
        var tags = el('ul', 'tag-list');
        p.tech.forEach(function (t) {
          if (isNonEmptyString(t)) tags.appendChild(el('li', null, t));
        });
        card.appendChild(tags);
      }

      // Expandable details (role / outcome)
      var details = el('div', 'project-details');
      details.id = 'project-details-' + index;
      details.hidden = true;
      if (isNonEmptyString(p.role)) {
        var roleBlock = el('div', 'project-detail');
        roleBlock.appendChild(el('span', 'detail-label', 'My role'));
        roleBlock.appendChild(el('p', 'detail-text', p.role));
        details.appendChild(roleBlock);
      }
      if (isNonEmptyString(p.outcome)) {
        var outcomeBlock = el('div', 'project-detail');
        outcomeBlock.appendChild(el('span', 'detail-label', 'Outcome'));
        outcomeBlock.appendChild(el('p', 'detail-text', p.outcome));
        details.appendChild(outcomeBlock);
      }
      card.appendChild(details);

      // Whole card toggles the details; clicks inside the details
      // (e.g. selecting text) do not toggle.
      card.addEventListener('click', function (event) {
        if (event.target.closest && event.target.closest('.project-details')) return;
        var expand = details.hidden;
        details.hidden = !expand;
        toggle.setAttribute('aria-expanded', expand ? 'true' : 'false');
        card.classList.toggle('expanded', expand);
      });

      grid.appendChild(card);
    });

    // The Security Engagements section is always shown.
    showSection('engagements', true);
  }

  /* ---------- experience & education (timeline) ---------- */

  function renderTimeline(containerId, items, kind) {
    var container = $(containerId);
    container.innerHTML = '';
    (Array.isArray(items) ? items : []).forEach(function (item) {
      if (!item) return;
      var title = kind === 'experience' ? item.role : item.degree;
      var org = kind === 'experience' ? item.company : item.institution;
      if (!isNonEmptyString(title) && !isNonEmptyString(org)) return;

      var wrap = el('div', 'timeline-item reveal');
      wrap.appendChild(el('div', 'timeline-dot'));
      var content = el('div', 'timeline-content');
      if (isNonEmptyString(item.period)) {
        content.appendChild(el('span', 'timeline-period', item.period));
      }
      if (isNonEmptyString(title)) content.appendChild(el('h3', 'timeline-role', title));
      if (isNonEmptyString(org)) content.appendChild(el('p', 'timeline-org', org));
      if (isNonEmptyArray(item.details)) {
        var ul = el('ul', 'timeline-details');
        item.details.forEach(function (d) {
          if (isNonEmptyString(d)) ul.appendChild(el('li', null, d));
        });
        content.appendChild(ul);
      }
      wrap.appendChild(content);
      container.appendChild(wrap);
    });
    return container.children.length > 0;
  }

  function renderCareer() {
    var expVisible = renderTimeline('experienceTimeline', D.experience, 'experience');
    showSection('experience', expVisible);
    var eduVisible = renderTimeline('educationTimeline', D.education, 'education');
    showSection('education', eduVisible);
  }

  /* ---------- certifications ---------- */

  var SHIELD_SVG =
    '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">' +
    '<path d="M12 2l7 3v6c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V5l7-3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function renderCertifications() {
    var grid = $('certsGrid');
    var certs = Array.isArray(D.certifications) ? D.certifications : [];
    grid.innerHTML = '';

    certs.forEach(function (c) {
      if (!c || !isNonEmptyString(c.name)) return;
      var card = el('div', 'card cert-card reveal');
      var badge = el('div', 'cert-badge');
      badge.innerHTML = SHIELD_SVG;
      card.appendChild(badge);
      card.appendChild(el('h3', 'cert-name', c.name));
      var issuerBits = [c.issuer, c.year].filter(isNonEmptyString).join(' · ');
      if (issuerBits) card.appendChild(el('p', 'cert-issuer', issuerBits));
      var badgeUrl = safeUrl(c.badge);
      if (badgeUrl) {
        var link = el('a', 'btn btn-ghost btn-small', 'View Badge');
        link.setAttribute('href', badgeUrl);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        card.appendChild(link);
      }
      grid.appendChild(card);
    });

    showSection('certifications', grid.children.length > 0);
  }

  /* ---------- blog / write-ups ---------- */

  function renderBlog() {
    var list = $('blogList');
    var posts = Array.isArray(D.blog) ? D.blog : [];
    list.innerHTML = '';

    posts.forEach(function (post) {
      if (!post || !isNonEmptyString(post.title)) return;
      var url = safeUrl(post.url);
      var item = el(url ? 'a' : 'div', 'blog-item reveal');
      if (url) item.setAttribute('href', url);

      var col = el('div', 'blog-item-text');
      if (isNonEmptyString(post.date)) {
        col.appendChild(el('span', 'blog-date', post.date));
      }
      col.appendChild(el('h3', null, post.title));
      if (isNonEmptyString(post.excerpt)) {
        col.appendChild(el('p', 'blog-excerpt', post.excerpt));
      }
      item.appendChild(col);

      if (url) item.appendChild(el('span', 'blog-arrow', '→'));
      list.appendChild(item);
    });

    showSection('blog', list.children.length > 0);
  }

  /* ---------- contact ---------- */

  function renderContact() {
    var email = safeUrl(contact.email) || 'mailto:';
    var emailLink = $('contactEmail');
    emailLink.setAttribute('href', isNonEmptyString(contact.email) ? 'mailto:' + contact.email : 'mailto:');
    emailLink.textContent = contact.email || 'your@email.com';

    function setLink(id, url) {
      var a = $(id);
      var safe = safeUrl(url);
      a.setAttribute('href', safe || '#');
      a.textContent = url || '';
      a.hidden = !safe;
      return safe;
    }

    var gh = setLink('contactGithub', contact.github);
    var li = setLink('contactLinkedin', contact.linkedin);

    var footerGh = $('footerGithub');
    footerGh.setAttribute('href', gh || '#');
    footerGh.hidden = !gh;
    var footerLi = $('footerLinkedin');
    footerLi.setAttribute('href', li || '#');
    footerLi.hidden = !li;

    showSection('contact', true);
  }

  /* ---------- form validation (client-side only) ---------- */

  function setupForm() {
    var form = $('contactForm');
    if (!form) return;

    var rules = {
      name: function (v) { return v.trim().length >= 2 || 'Please enter your name (2+ characters).'; },
      email: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.';
      },
      subject: function (v) { return v.trim().length >= 2 || 'Please add a subject (2+ characters).'; },
      message: function (v) { return v.trim().length >= 10 || 'Your message should be at least 10 characters.'; }
    };

    var touched = {};
    var submitAttempted = false;

    // Errors are only shown after the user has interacted with a
    // field (typed in it) or attempted to submit the form.
    function validateField(field, forceShow) {
      var rule = rules[field.id];
      if (!rule) return true;
      var result = rule(field.value || '');
      var ok = result === true;
      var show = forceShow === true || touched[field.id] === true || submitAttempted;
      var errorEl = $('error-' + field.id);
      if (errorEl) errorEl.textContent = show && !ok ? result : '';
      field.classList.toggle('invalid', show && !ok);
      field.setAttribute('aria-invalid', show && !ok ? 'true' : 'false');
      return ok;
    }

    Object.keys(rules).forEach(function (id) {
      var field = $(id);
      if (!field) return;
      field.addEventListener('input', function () {
        touched[field.id] = true;
        validateField(field);
      });
      field.addEventListener('blur', function () {
        validateField(field);
      });
    });

    form.addEventListener('submit', function (event) {
      var honeypot = $('bot-field');
      if (honeypot && honeypot.value) {
        event.preventDefault();
        window.location.href = 'thanks.html';
        return;
      }
      submitAttempted = true;
      var allOk = true;
      var firstInvalid = null;
      Object.keys(rules).forEach(function (id) {
        var field = $(id);
        if (!field) return;
        if (!validateField(field, true)) {
          allOk = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });
      if (!allOk) {
        event.preventDefault();
        if (firstInvalid) firstInvalid.focus();
      }
      // When valid, the form submits natively to Netlify and redirects to thanks.html.
    });
  }

  /* ---------- theme toggle ---------- */

  function setupTheme() {
    var root = document.documentElement;
    var button = $('themeToggle');
    var iconPath = $('themeIconPath');
    if (!button || !iconPath) return;

    var MOON = 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z';
    var SUN = 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41';

    function apply(theme) {
      root.setAttribute('data-theme', theme);
      iconPath.setAttribute('d', theme === 'light' ? SUN : MOON);
      button.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
      try { window.localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
    }

    var saved = null;
    try { saved = window.localStorage.getItem('theme'); } catch (e) { /* ignore */ }
    apply(saved === 'light' ? 'light' : 'dark');

    button.addEventListener('click', function () {
      apply(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });
  }

  /* ---------- mobile navigation ---------- */

  function setupMobileNav() {
    var toggle = $('navToggle');
    var menu = $('navMenu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function () {
      setOpen(!menu.classList.contains('open'));
    });

    $$('.nav-link', menu).forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  /* ---------- scrollspy ---------- */

  function setupScrollSpy() {
    var links = {};
    $$('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (href.charAt(0) === '#') links[href.slice(1)] = link;
    });

    var sections = Object.keys(links)
      .map(function (id) { return $(id); })
      .filter(function (s) { return s; });

    if (!('IntersectionObserver' in window) || !sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Object.keys(links).forEach(function (id) {
          var link = links[id];
          if (id === entry.target.id) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'true');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- reveal on scroll ---------- */

  function setupReveal() {
    // Static blocks that should animate in.
    $$('.section-title, .about-grid, .contact-grid, .contact-form, .contact-info').forEach(function (node) {
      node.classList.add('reveal');
    });

    if (!('IntersectionObserver' in window) || reducedMotion) {
      $$('.reveal').forEach(function (node) { node.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    $$('.reveal').forEach(function (node) { observer.observe(node); });
  }

  /* ---------- section numbering ---------- */

  // Numbers visible sections automatically in order (01, 02, 03, ...)
  // so the counters never get out of sync when sections hide/show.
  function renumberSections() {
    var count = 0;
    $$('.section').forEach(function (section) {
      if (section.hidden) return;
      var num = section.querySelector('.title-num');
      if (!num) return;
      count++;
      num.textContent = String(count).padStart(2, '0');
    });
  }

  /* ---------- init ---------- */

  renderMeta();
  renderPersonal();
  renderAbout();
  renderSkills();
  renderWebProjects();
  renderEngagements();
  renderCareer();
  renderCertifications();
  renderBlog();
  renderContact();
  renumberSections();
  setupForm();
  setupTheme();
  setupMobileNav();
  setupScrollSpy();
  setupReveal();

  var yearEl = $('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
