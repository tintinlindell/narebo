/* ─────────────────────────────────────────────────────────────────
   i18n.js — Narebo Gårdshotell SV / EN language switcher
   SV is the default HTML. Switching to EN applies selector-targeted
   innerHTML replacements in-place. Back to SV: page reload.
   Language persisted in localStorage.
───────────────────────────────────────────────────────────────── */
(function () {
  var KEY  = 'narebo_lang';
  var page = window.location.pathname.split('/').pop() || 'index.html';

  /* ── helpers ──────────────────────────────────────────────────── */

  // Set innerHTML of the nth (0-based) element matching selector
  function t(sel, html, nth) {
    var els = document.querySelectorAll(sel);
    var idx = nth === undefined ? 0 : nth;
    if (idx === 'all') {
      els.forEach(function (el) { el.innerHTML = html; });
    } else if (els[idx]) {
      els[idx].innerHTML = html;
    }
  }

  // Replace only text content of an element, preserving child elements (SVG icons)
  function tText(sel, text, nth) {
    var els = document.querySelectorAll(sel);
    var el  = els[nth === undefined ? 0 : nth];
    if (!el) return;
    // Walk child nodes, update the first/last text node
    var nodes = Array.from(el.childNodes);
    var textNodes = nodes.filter(function (n) { return n.nodeType === 3; });
    if (textNodes.length > 0) {
      // Update the last text node (usually after the icon)
      textNodes[textNodes.length - 1].textContent = ' ' + text;
    } else {
      // Append a text node if none found
      el.appendChild(document.createTextNode(' ' + text));
    }
  }

  /* ── COMMON — every page ──────────────────────────────────────── */
  function applyCommon() {
    // Nav logo subtitle
    t('.nav-logo-sub', 'Country hotel &amp; restaurant');
    // Nav panel links
    t('a[href="historia.html"].nav-panel-link',   'About the farm');
    t('a[href="restaurang.html"].nav-panel-link', 'Restaurant &amp; Café');
    t('a[href="boende.html"].nav-panel-link',     'Accommodation');
    t('a[href="konferens.html"].nav-panel-link',  'Meetings &amp; Events');
    t('a[href="att-gora.html"].nav-panel-link',   'Things to do');
    t('a[href="kontakt.html"].nav-panel-link',    'Contact');
    // Nav panel CTAs
    t('a.nav-panel-cta-link[href*="moder.fi"]',      'Book a room');
    t('a.nav-panel-cta-link[href="kontakt.html"]',   'Request a quote');
    t('#panelClose', 'Close ✕');

    // Footer column titles
    var colTitles = document.querySelectorAll('.footer-col-title');
    if (colTitles[0]) colTitles[0].textContent = 'Accommodation';
    if (colTitles[1]) colTitles[1].textContent = 'Explore';
    if (colTitles[2]) colTitles[2].textContent = 'Info';

    // Footer links (common across all pages)
    t('a.footer-link[href="boende.html"]:nth-of-type(1)',    'Hotel rooms',      0);
    t('a.footer-link[href*="moder.fi"]', 'Book a room', 0);
    t('a.footer-link[href="restaurang.html"]', 'Restaurant',    0);
    t('a.footer-link[href="konferens.html"]',  'Conferences',   0);
    t('a.footer-link[href="att-gora.html"]',   'Things to do',  0);
    t('a.footer-link[href="historia.html"]',   'About Narebo',  0);
    t('a.footer-link[href="kontakt.html"]',    'Contact &amp; map', 0);
  }

  /* ── PER-PAGE ─────────────────────────────────────────────────── */

  function applyIndex() {
    // Hero
    t('.hero-eyebrow', 'Country Hotel &amp; Restaurant · Lidköping');
    t('.hero-h1',      'Welcome<br>to Narebo');
    t('.hero-sub',     'A peaceful farm stay since 1541');
    t('a.btn-rise-dark',   'Book a room');
    t('a.btn-ghost-hero',  'Explore the farm');

    // Info strip (has SVG icons — preserve them)
    tText('.info-item', 'Breakfast Mon–Fri 7–9 · Sat–Sun 8–10', 0);
    tText('.info-item', 'Restaurant Fri–Sun 17–20 · booking required', 1);
    tText('.info-item', 'Check-in 15:00–18:00', 2);
    tText('.info-item', 'Check with Karolina', 3);

    // Services section
    t('.eyebrow', 'What we offer', 0);
    t('.services-head h2', 'Hotel, restaurant<br>&amp; nature in Västergötland');

    // Service cards
    var tags = document.querySelectorAll('.svc-tag');
    var headings = document.querySelectorAll('.svc-h');
    var descs    = document.querySelectorAll('.svc-p');
    var btns     = document.querySelectorAll('.services-track .btn-bracket-light');
    var cardData = [
      { tag: 'Accommodation', h: 'Hotel &amp; apartments',
        p: '6 hotel rooms and 5 farm apartments with kitchenette. Breakfast always included.',
        btn: 'View accommodation' },
      { tag: 'Restaurant', h: 'From soil to plate',
        p: 'Evening menu Friday–Sunday in a winter-heated greenhouse. Produce grown on the farm.',
        btn: 'About the restaurant' },
      { tag: 'Conferences', h: 'Meetings with a lasting impression',
        p: 'Fully equipped conference room for up to 50 guests. Rural setting, accommodation on site.',
        btn: 'Request a quote' },
      { tag: 'Things to do', h: 'Nature &amp; Vänern coast',
        p: 'Hiking at Hindens Rev, swimming at Svalnäs, and Läckö Castle just 20 km away.',
        btn: 'Explore' },
    ];
    cardData.forEach(function (c, i) {
      if (tags[i])    tags[i].textContent     = c.tag;
      if (headings[i]) headings[i].innerHTML   = c.h;
      if (descs[i])   descs[i].innerHTML       = c.p;
      if (btns[i])    btns[i].innerHTML        = c.btn;
    });

    // About section
    t('.amber-rule-text', 'About the farm', 0);
    t('.about-heading h2', 'A living farm since the sixteenth century');
    t('.about-body', 'Narebo farm is first mentioned in the 1541 land register. Through generations it has carried many names and changed hands — but never lost its character. Since 1946 it has been owned by the Carlander family.');
    t('.about-grid .body-text', 'Today the farm\'s 145 hectares are focused on grain production. In the greenhouses we grow cucumbers, tomatoes, raspberries and grapes — straight into the restaurant kitchen.', 1);
    t('a.btn-bracket[href="historia.html"]', 'About Narebo\'s history');

    // Boende section on homepage
    t('.eyebrow.eyebrow-center', 'Accommodation', 0);
    t('.boende-intro h2', 'Hotel rooms &amp; farm apartments');
    t('.boende-intro .body-text', 'Breakfast always included. Private bathroom, TV and free WiFi in all rooms and apartments.');
    var bTags  = document.querySelectorAll('.boende-tag');
    var bHeads = document.querySelectorAll('.boende-h');
    var bDesc  = document.querySelectorAll('.boende-p');
    var bBtns  = document.querySelectorAll('a.btn-rise.btn-rise-sm');
    if (bTags[0])  bTags[0].textContent  = 'Hotel rooms';
    if (bTags[1])  bTags[1].textContent  = 'Farm apartments';
    if (bHeads[0]) bHeads[0].textContent = '6 rooms with farm character';
    if (bHeads[1]) bHeads[1].textContent = '5 apartments with kitchenette';
    if (bDesc[0])  bDesc[0].innerHTML    = 'Comfortable twin beds, private bathroom with shower, TV and Wi-Fi. Shared lounge and large terrace adjacent to the rooms.';
    if (bDesc[1])  bDesc[1].innerHTML    = '32–37 sqm with lounge area, separate sleeping area and fully equipped kitchenette. Linen and towels included. Apartments 1 and 5 have south-facing private terraces.';
    var attrs0 = document.querySelectorAll('.boende-card:nth-child(1) .attr-tag');
    var translations0 = ['WiFi', 'Shower &amp; WC', 'TV', 'Breakfast included', 'Free parking'];
    attrs0.forEach(function(a, i) { if (translations0[i]) a.innerHTML = translations0[i]; });
    var attrs1 = document.querySelectorAll('.boende-card:nth-child(2) .attr-tag');
    var translations1 = ['Kitchenette', 'Shower &amp; WC', 'WiFi', 'Breakfast included'];
    attrs1.forEach(function(a, i) { if (translations1[i]) a.innerHTML = translations1[i]; });
    if (bBtns[0]) bBtns[0].textContent = 'View rooms';
    if (bBtns[1]) bBtns[1].textContent = 'View apartments';
    t('a.btn-bracket[href*="moder.fi"]', 'Book a room');
    var bookNote = document.querySelector('.booking-note');
    if (bookNote) bookNote.textContent = 'Direct booking: info@narebo.se · Check-in 15:00–18:00';

    // Restaurant section on homepage
    t('.amber-rule-text', 'Restaurant', 1);
    t('.rest-body h2', 'Bright, rustic &amp; delicious');
    t('.rest-body .body-text', 'In a winter-heated greenhouse connected to Narebo Entrén, we welcome pre-booked groups of 2 to 60 guests. Produce is sourced directly from our own gardens.');
    var restNotice = document.querySelector('.rest-notice');
    if (restNotice) restNotice.innerHTML = '<strong>Temporarily closed.</strong> Contact us for information about opening and booking.';
    var detailRows = document.querySelectorAll('.rest-detail-row');
    tText('.rest-detail-row', 'Friday–Sunday 17:00–20:00 (when open)', 0);
    tText('.rest-detail-row', '2–60 guests · coaches welcome', 1);
    t('a.btn-rise[href="restaurang.html"]', 'About the restaurant');
  }

  function applyHistoria() {
    t('.page-hero-eyebrow', 'Narebo farm since 1541');
    t('.page-hero-h1',      'A living farm<br>with heritage');
    t('.page-hero-sub',     'From the 1541 land register to country hotel and restaurant');

    // Intro
    t('.amber-rule-text', 'About Narebo', 0);
    t('.large-text', 'A farm that has carried many names, owned by many hands — but always had its heart in the soil of Västergötland.');
    var bodyTexts = document.querySelectorAll('.body-text');
    if (bodyTexts[0]) bodyTexts[0].innerHTML = 'The farm Narebo is first mentioned in 1541 in the land register, then spelled Nerrebo. Over the centuries the name evolved — Nedrebo, Nærebo — and by the late 18th century it took its current form.';
    if (bodyTexts[1]) bodyTexts[1].innerHTML = 'Since 1946 the farm has been owned by the Carlander family. Today we run a country hotel, restaurant and conference venue — with roots deep in the ground and eyes on the horizon.';

    // Timeline
    t('.amber-rule-text', 'History', 1);
    t('.timeline').ownerDocument; // no-op, just checking
    var h2s = document.querySelectorAll('h2');
    if (h2s[0]) h2s[0].textContent = 'Five centuries on the same land';

    // Timeline items
    var tlTitles = document.querySelectorAll('.tl-title');
    var tlTexts  = document.querySelectorAll('.tl-text');
    var timeline = [
      { title: 'First mention',
        text: 'The farm appears in the land register as "Nerrebo". Exactly how long farm life had been going on before this, nobody knows.' },
      { title: 'The farm moves',
        text: 'When the neighbouring property Gethalla was acquired and merged with Narebo, the farm was relocated to its current site. The granary, manor house and park trees date from this time.' },
      { title: 'The Ekebladh family ends its era',
        text: 'Until 1808, when the last of the Ekebladh family passed away, the farm was owned by this ancient family. The death of Clas Julius Ekebladh brought a long epoch to a close.' },
      { title: 'The Carlander family buys the farm',
        text: 'C-G Carlander\'s grandfather acquires Narebo. The farm begins a new chapter with dairy production, followed by pork and beef production.' },
      { title: 'Next generation takes over',
        text: 'C-G Carlander\'s father takes over the farm and continues beef production until 2004.' },
      { title: 'New era — farm shop &amp; restaurant',
        text: 'Farming ends. New premises are built for a farm shop and restaurant. The farm\'s 145 hectares are converted to grain production.' },
      { title: 'Hotel &amp; conference opens',
        text: 'The old cattle barn is converted into a modern hotel and conference facility. Farm life and guest life meet under the same roof.' },
    ];
    timeline.forEach(function (item, i) {
      if (tlTitles[i]) tlTitles[i].innerHTML = item.title;
      if (tlTexts[i])  tlTexts[i].innerHTML  = item.text;
    });

    // Right panel "Idag" card
    var todayLabel = document.querySelector('[style*="font-size:9px"][style*="text-transform:uppercase"]');
    if (todayLabel) todayLabel.textContent = 'Today';
    var todayPs = document.querySelectorAll('.reveal.from-right p, .reveal.from-right [style*="font-size:20px"]');
    // Use a more targeted selector for the sticky right card
    var stickyCard = document.querySelector('[style*="position:sticky"]');
    if (stickyCard) {
      var cardPs = stickyCard.querySelectorAll('p');
      if (cardPs[0]) cardPs[0].innerHTML = 'A farm in full bloom — with hotel, restaurant, conference and our own gardens.';
      if (cardPs[1]) cardPs[1].innerHTML = '145 hectares of farmland. Greenhouses with cucumbers, tomatoes, raspberries and grapes. Every season\'s harvest goes straight into the restaurant kitchen.';
    }

    // Pullquote
    t('.pullquote-text', 'We strive to create a relaxing farm setting with a cosy feel out in the countryside — with well-crafted food and good drink.');

    // Produce section
    t('.amber-rule-text', 'Farm produce', 2);
    t('h2', 'From soil to table — for real', 1);

    // Mosaic
    t('.mosaic-text-eyebrow', 'Our own gardens');
    t('.mosaic-text-title', 'Nature right on the doorstep');
    t('.mosaic-text-body', 'Wander among the grapevines, taste a fresh raspberry or settle down with a cup of coffee in the peaceful greenhouse. Every autumn we press our appreciated grape juice.');

    // Produce cards
    var pTitles = document.querySelectorAll('.produce-title');
    var pDescs  = document.querySelectorAll('.produce-desc');
    var produce = [
      { title: 'Cucumbers &amp; tomatoes', desc: 'Grown in our own greenhouses and harvested straight into the restaurant kitchen during the season.' },
      { title: 'Raspberries', desc: 'The farm\'s fine raspberries are a favourite — warm, red and just the right amount of tart.' },
      { title: 'Grapes &amp; grape juice', desc: 'You can sit under hanging clusters in the greenhouse. Every autumn we press our appreciated grape juice.' },
      { title: 'Grain', desc: '145 hectares of farmland dedicated to grain production — the backbone of the farm\'s agriculture.' },
      { title: 'Seasonal vegetables', desc: 'Open-field plots and greenhouses supply the restaurant with fresh vegetables throughout the season.' },
      { title: 'Coffee in the greenhouse', desc: 'Settle down among the grapevines with a cup of coffee and enjoy the rural calm — preferably with a raspberry on the side.' },
    ];
    produce.forEach(function (p, i) {
      if (pTitles[i]) pTitles[i].innerHTML = p.title;
      if (pDescs[i])  pDescs[i].innerHTML  = p.desc;
    });

    // CTA strip
    t('.cta-strip h2', 'Come and visit us');
    t('.cta-strip p',  'Book a room, a conference or a dinner table — and experience Narebo\'s history with your own eyes.');
    t('a.btn-rise-on-dark', 'Book a room');
    t('a.btn-bracket-light[href="konferens.html"]', 'Conferences');
    t('a.btn-bracket-light[href="kontakt.html"]',   'Contact');
  }

  function applyRestaurang() {
    t('.page-hero-eyebrow', 'Restaurant at Narebo');
    t('.page-hero-h1',      'Bright, rustic<br>&amp; delicious');
    t('.page-hero-sub',     'In a winter-heated greenhouse with produce from our own gardens');

    // Notice
    var notice = document.querySelector('.notice div');
    if (notice) notice.innerHTML = '<strong>The restaurant is temporarily closed.</strong> Contact us for information about opening and booking.';

    // Split section
    t('.amber-rule-text', 'About the restaurant', 0);
    t('.split-body h2', 'A place for food with roots');
    var splitPs = document.querySelectorAll('.split-body .body-text');
    if (splitPs[0]) splitPs[0].innerHTML = 'The restaurant is located in a winter-heated greenhouse connected to Narebo Entrén — a bright, calm and rustic setting with nature literally at hand. We accommodate pre-booked groups of 2 to approximately 60 guests.';
    if (splitPs[1]) splitPs[1].innerHTML = 'Produce is grown in the farm\'s own greenhouses and open-field plots — cucumbers, tomatoes, raspberries and vegetables harvested directly into the kitchen in season. The menu adapts to what the land provides.';

    // Detail rows in split section
    var splitRows = document.querySelectorAll('.split-detail .split-row');
    if (splitRows[0]) tText('.split-row', 'Friday–Sunday 17:00–20:00 (when open)', 0);
    if (splitRows[1]) tText('.split-row', '2–60 guests · coaches welcome', 1);
    t('.split-body a.btn-rise', 'Contact us');

    // Food section
    t('.amber-rule-text', 'The food', 1);
    t('.section-alt h2', 'From our soil to your plate');
    var matPs = document.querySelectorAll('.section-alt .body-text');
    if (matPs[0]) matPs[0].innerHTML = 'We strive to let the produce take centre stage. What is grown in the greenhouses and open fields dictates what is cooked — not the other way around. This gives a menu that changes with the seasons and is genuine in every detail.';
    if (matPs[1]) matPs[1].innerHTML = 'The restaurant is run by Wichudaporn — a Master Chef finalist who works with Nordic flavour and Asian finesse. The result is genuine and beautifully crafted.';
    if (matPs[2]) matPs[2].innerHTML = 'Booking is always required. We accommodate groups from 2 persons and upwards. Contact us to plan your visit.';

    // Greenhouse section
    t('.amber-rule-text', 'The greenhouses', 2);
    t('.section h2', 'Our own gardens', 1);
    var ghTitles = document.querySelectorAll('.gh-title');
    var ghDescs  = document.querySelectorAll('.gh-desc');
    if (ghTitles[0]) ghTitles[0].textContent = 'Winter-heated greenhouse';
    if (ghTitles[1]) ghTitles[1].textContent = 'Seasonal produce';
    if (ghTitles[2]) ghTitles[2].textContent = 'Grapes &amp; grape juice';
    if (ghDescs[0])  ghDescs[0].textContent  = 'The restaurant is set in a bright, cosy greenhouse. A place to sit and breathe, whatever the weather.';
    if (ghDescs[1])  ghDescs[1].textContent  = 'Cucumbers, tomatoes, raspberries and vegetables are grown on the farm and taken straight to the kitchen.';
    if (ghDescs[2])  ghDescs[2].textContent  = 'You can sit under the vines in the grape greenhouse. Every autumn we press our appreciated grape juice.';

    // Booking CTA
    t('.booking-dark h2', 'Book your group');
    t('.booking-dark p',  'We accommodate groups from 2 to 60 guests. Coaches welcome. Contact us by email or phone to plan your visit.');
    t('a.btn-rise-dark[href*="mailto"]', 'Send an email');
    t('a.btn-bracket-light[href="kontakt.html"]', 'Contact page');
  }

  function applyBoende() {
    t('.page-hero-eyebrow', 'Accommodation at Narebo');
    t('.page-hero-h1',      'Hotel room &amp;<br>farm apartments');
    t('.page-hero-sub',     'Peaceful and rural on a historic farm outside Lidköping');

    // Includes bar
    tText('.inc-item', 'Self check-in',   0);
    tText('.inc-item', 'Free WiFi',       1);
    tText('.inc-item', 'Free parking',    2);
    tText('.inc-item', 'TV in all rooms', 3);
    tText('.inc-item', 'Check with Karolina', 4);

    // Section intro
    t('.amber-rule-text', 'Accommodation options', 0);
    t('#boende h2', 'Four ways to stay on the farm');
    t('#boende .body-text', 'Choose between a classic hotel room with breakfast included, or one of our spacious farm apartments with a fully equipped kitchen and private bathroom. All options include access to the shared lounge, garden and free parking on the farm courtyard.');

    // Apt cards
    var aptNums = document.querySelectorAll('.apt-num');
    var aptHs   = document.querySelectorAll('.apt-h');
    var aptPs   = document.querySelectorAll('.apt-p');
    var aptBtns = document.querySelectorAll('.apt-price-row .btn-rise');
    var aptPriceSubs = document.querySelectorAll('.room-price-sub');

    var rooms = [
      { num:  'Hotel room · 16 m²',
        h:    'Twin Room',
        p:    'Cosy and well-appointed room for up to two guests. Private bathroom with shower, TV and WiFi. Breakfast is served every morning and included in the price.',
        btn:  'Book',
        sub:  'per night · incl. breakfast' },
      { num:  'Farm apartment · 32 m²',
        h:    'Farm Apartment',
        p:    'Spacious apartment with a fully equipped kitchen — hob, microwave, coffee maker, mini fridge and dishwasher. Sleeps up to two guests with private bathroom and access to the shared lounge and garden.',
        btn:  'Book',
        sub:  'per night' },
      { num:  'Farm apartment with Private Terrace · 35 m²',
        h:    'With Private Terrace',
        p:    '35 square metres with your own private terrace — perfect for morning coffee in the greenery. Sleeps up to three guests with extra bed, fully equipped kitchen, living room and private bathroom.',
        btn:  'Book',
        sub:  'per night' },
      { num:  'Farm apartment with Private South-Facing Terrace · 37 m²',
        h:    'With Private South-Facing Terrace',
        p:    'The most spacious apartment, with a private terrace in a sunny south-facing position. A sofa bed accommodates up to four guests. Fully equipped kitchen, private bathroom and bed linen included.',
        btn:  'Book',
        sub:  'per night' },
    ];
    rooms.forEach(function (r, i) {
      if (aptNums[i])      aptNums[i].textContent      = r.num;
      if (aptHs[i])        aptHs[i].textContent        = r.h;
      if (aptPs[i])        aptPs[i].innerHTML           = r.p;
      if (aptBtns[i])      aptBtns[i].textContent      = r.btn;
      if (aptPriceSubs[i]) aptPriceSubs[i].textContent = r.sub;
    });

    // Attr tags per room
    var roomAttrSets = [
      ['1–2 guests', '2 single beds', 'Shower &amp; WC', 'TV · WiFi', 'Hairdryer', 'Breakfast included', 'No pets'],
      ['1–2 guests', '2 single beds', 'Own kitchen', 'Shower &amp; WC', 'TV · WiFi', 'Hairdryer', 'No pets'],
      ['1–3 guests', '2 beds + extra bed', 'Private terrace', 'Own kitchen', 'Living room', 'Shower &amp; WC', 'TV · WiFi', 'No pets'],
      ['1–4 guests', '2 beds + sofa bed', 'Private terrace · south-facing', 'Own kitchen', 'Shower &amp; WC', 'TV · WiFi', 'Bed linen included', 'No pets'],
    ];
    var aptCards = document.querySelectorAll('.apt-card');
    aptCards.forEach(function (card, cardIdx) {
      var attrs = card.querySelectorAll('.attr-tag');
      var translations = roomAttrSets[cardIdx] || [];
      attrs.forEach(function (a, i) {
        if (translations[i] !== undefined) a.innerHTML = translations[i];
      });
    });

    // Inclusions section
    t('.eyebrow.eyebrow-center', 'Always included', 0);
    t('.section-alt h2', 'Nothing is optional');
    var incTitles = document.querySelectorAll('.inc-card-title');
    var incDescs  = document.querySelectorAll('.inc-card-desc');
    var inclusions = [
      { title: 'Self check-in',
        desc:  'Smooth self check-in — all information is sent in advance so your arrival is easy and stress-free.' },
      { title: 'Free WiFi',
        desc:  'Fast wireless internet in all rooms, apartments and shared spaces.' },
      { title: 'Free parking',
        desc:  'Large courtyard with plenty of space. No booking needed — just drive up and park.' },
      { title: 'Bed linen &amp; towels',
        desc:  'Fresh towels and bed linen included in all apartments. Nothing to bring.' },
      { title: 'TV',
        desc:  'TV in all rooms and apartments. Relax with a film after a day on the farm.' },
      { title: 'Shared lounge',
        desc:  'Seating area, dining space and a large terrace adjacent to the hotel rooms. Mingle or take a quiet moment.' },
    ];
    inclusions.forEach(function (inc, i) {
      if (incTitles[i]) incTitles[i].innerHTML = inc.title;
      if (incDescs[i])  incDescs[i].innerHTML  = inc.desc;
    });

    // Rules section
    t('.amber-rule-text', 'Practical information', 1);
    t('.section h2', 'Check-in &amp; conditions', 1);
    var ruleLabels = document.querySelectorAll('.rule-label');
    var ruleVals   = document.querySelectorAll('.rule-val');
    var ruleSubs   = document.querySelectorAll('.rule-sub');
    var rules = [
      { label: 'Check-in',    val: '15:00 – 18:00', sub: 'Weekdays &amp; Saturdays. Sundays by arrangement.' },
      { label: 'Check-out',   val: 'By 11:00',      sub: 'Contact us if you need flexibility.' },
      { label: 'Cancellation', val: 'By 24 hours before arrival', sub: 'Cancellations less than 24 hours in advance are charged one night.' },
      { label: 'Breakfast',   val: 'Mon–Fri 7–9 · Sat–Sun 8–10', sub: 'Served in the restaurant and included in all bookings.' },
      { label: 'Pets',        val: 'Not permitted', sub: 'Pets are unfortunately not allowed in any of the accommodation options.' },
      { label: 'Accessibility', val: '2 adapted rooms', sub: 'Two hotel rooms are equipped with an accessible bathroom for wheelchair users.' },
    ];
    rules.forEach(function (r, i) {
      if (ruleLabels[i]) ruleLabels[i].innerHTML = r.label;
      if (ruleVals[i])   ruleVals[i].innerHTML   = r.val;
      if (ruleSubs[i])   ruleSubs[i].innerHTML   = r.sub;
    });

    // Booking CTA
    t('.booking-cta-inner h2', 'Ready to book?');
    t('.booking-cta-inner p',  'Book easily online — or get in touch directly if you have questions, room preferences, or are booking for a group.');
    t('.booking-cta-inner .btn-rise', 'Book a room');
  }

  function applyKonferens() {
    t('.page-hero-eyebrow', 'Conference &amp; Course Venue');
    t('.page-hero-h1',      'Meetings with<br>a lasting impression');
    t('.page-hero-sub',     'Rural, modern &amp; memorable — along Vänerslingan');

    // Capacity strip
    var capLabels = document.querySelectorAll('.cap-label');
    var capDescs  = document.querySelectorAll('.cap-desc');
    if (capLabels[0]) capLabels[0].textContent = 'Cinema seating';
    if (capLabels[1]) capLabels[1].textContent = 'Classroom / group tables';
    if (capLabels[2]) capLabels[2].textContent = 'Board / management';
    if (capLabels[3]) capLabels[3].textContent = 'The restaurant';
    if (capDescs[0])  capDescs[0].textContent  = 'Lecture, kick-off, presentation';
    if (capDescs[1])  capDescs[1].textContent  = 'Course, workshop, training';
    if (capDescs[2])  capDescs[2].textContent  = 'Board meeting, management group';
    if (capDescs[3])  capDescs[3].textContent  = 'Larger groups, kick-off with dinner';

    // Intro section
    t('.amber-rule-text', 'Why Narebo?', 0);
    t('.intro-text h2', 'Rural &amp; modern — for meetings that leave an impression');
    var introPs = document.querySelectorAll('.intro-text .body-text');
    if (introPs[0]) introPs[0].innerHTML = 'Welcome to Narebo, located along Skaraborg\'s 1st Tourist Route "Vänerslingan". In our wonderful farm setting you can hold your meetings and then stroll among our own greenhouses, taste a fresh raspberry or settle down with a cup of coffee under the grapevines.';
    if (introPs[1]) introPs[1].innerHTML = 'Nature is right at hand: hiking trails, nature reserves and Lake Vänern\'s archipelago. Svalnäs beach is just 14 km away — perfect for a team activity after the conference.';
    t('.intro-text a.btn-rise', 'Request a quote');
    t('.intro-text a.btn-bracket', 'View capacity');

    // Features section
    t('.amber-rule-text', 'The venue &amp; facilities', 1);
    t('.section h2', 'Everything you need, in one place', 0);
    var featTitles = document.querySelectorAll('.feature-title');
    var featDescs  = document.querySelectorAll('.feature-desc');
    var features = [
      { title: 'Projector &amp; AV equipment',
        desc:  'Fully equipped for presentations. Projector, screen and all necessary technology included.' },
      { title: 'Check with Karolina',
        desc:  '' },
      { title: 'Free WiFi',
        desc:  'Fast wireless internet throughout the venue — conference room, hotel rooms and apartments.' },
      { title: 'Accommodation on site',
        desc:  '6 hotel rooms and 5 farm apartments adjacent to the conference room. Breakfast always included.' },
      { title: 'Breakfast &amp; meals',
        desc:  'Breakfast included with overnight stays. Lunch, dinner and coffee breaks can be arranged on request.' },
      { title: 'Free parking',
        desc:  'Large courtyard with plenty of space. Coaches welcome — contact us in advance for arrangements.' },
      { title: 'Nature right at hand',
        desc:  'Our own greenhouses to stroll in. Hiking trails, Lake Vänern\'s archipelago and swimming 14 km away.' },
    ];
    features.forEach(function (f, i) {
      if (featTitles[i]) featTitles[i].innerHTML = f.title;
      if (f.desc && featDescs[i]) featDescs[i].innerHTML = f.desc;
    });

    // Capacity table
    t('.amber-rule-text', 'Capacity', 2);
    t('h2', 'Choose a seating arrangement to suit your needs', 1);
    var thCells = document.querySelectorAll('.cap-table th');
    if (thCells[0]) thCells[0].textContent = 'Arrangement';
    if (thCells[1]) thCells[1].textContent = 'Capacity';
    if (thCells[2]) thCells[2].textContent = 'Suitable for';
    if (thCells[3]) thCells[3].textContent = 'Venue';
    var rowData = [
      ['Cinema seating',       '50 guests', 'Lecture, kick-off, presentation, AGM',       'Conference room'],
      ['Classroom / group tables', '30 guests', 'Course, workshop, training, seminar',    'Conference room'],
      ['Board / management table', '12 guests', 'Board meeting, management, strategy',    'Conference room'],
      ['Restaurant (Lusthuset)',   '70 guests', 'Kick-off with dinner, larger group, party', 'Restaurant'],
    ];
    var trs = document.querySelectorAll('.cap-table tbody tr');
    trs.forEach(function (tr, i) {
      var tds = tr.querySelectorAll('td');
      if (rowData[i]) rowData[i].forEach(function (cell, j) { if (tds[j]) tds[j].innerHTML = cell; });
    });
    var capNote = document.querySelector('.cap-note, .cap-table + p');
    if (capNote) capNote.textContent = 'Tailored arrangements for other group sizes — get in touch and we\'ll find a solution.';

    // Packages
    t('.amber-rule-text', 'Packages', 3);
    t('h2', 'Choose what suits your group', 2);
    var pkgTitles = document.querySelectorAll('.pkg-title');
    var pkgSubtitles = document.querySelectorAll('.pkg-subtitle');
    var pkgDescs = document.querySelectorAll('.pkg-desc');
    var pkgHeads = document.querySelectorAll('.pkg-inc-head');
    if (pkgTitles[0])    pkgTitles[0].textContent    = 'Option 1';
    if (pkgTitles[1])    pkgTitles[1].textContent    = 'Option 2';
    if (pkgSubtitles[0]) pkgSubtitles[0].textContent = 'Day conference';
    if (pkgSubtitles[1]) pkgSubtitles[1].textContent = 'Conference with overnight stay';
    if (pkgDescs[0])     pkgDescs[0].innerHTML       = 'Conference venue full day or half day with coffee breaks. No overnight stays — convenient for groups based nearby.';
    if (pkgDescs[1])     pkgDescs[1].innerHTML       = 'One or more days with a full programme. Conference room, meals and hotel rooms or farm apartments on site.';
    if (pkgHeads[0])     pkgHeads[0].textContent     = 'Included';
    if (pkgHeads[1])     pkgHeads[1].textContent     = 'Included';
    var pkgLists = document.querySelectorAll('.pkg-list');
    if (pkgLists[0]) {
      var li0 = pkgLists[0].querySelectorAll('li');
      var inc0 = ['Conference room with AV equipment', 'Coffee &amp; fika (morning + afternoon)', 'Free WiFi &amp; parking', 'Lunch (optional)'];
      li0.forEach(function (li, i) { if (inc0[i]) li.innerHTML = inc0[i]; });
    }
    if (pkgLists[1]) {
      var li1 = pkgLists[1].querySelectorAll('li');
      var inc1 = ['Conference room with AV equipment', 'Breakfast (included with accommodation)', 'Lunch &amp; dinner (optional)', 'Hotel room or farm apartment', 'Free WiFi &amp; parking'];
      li1.forEach(function (li, i) { if (inc1[i]) li.innerHTML = inc1[i]; });
    }
    var pkgPriceLabels = document.querySelectorAll('.pkg-price-label');
    pkgPriceLabels.forEach(function (el) { el.textContent = 'Price per person'; });

    // Nearby
    t('.amber-rule-text', 'Nearby', 4);
    t('h2', 'Activities &amp; relaxation after the meeting', 3);
    var nearbyTitles = document.querySelectorAll('.nearby-title');
    var nearbyDescs  = document.querySelectorAll('.nearby-desc');
    var nearby = [
      { title: 'Svalnäs beach', desc: '"Lidköping\'s Riviera" in Söne. Fine sandy beach along Lake Vänern — perfect for a team activity after the conference.' },
      { title: 'Hindens Rev',   desc: 'A fantastic hike out onto one of Vänern\'s peninsulas. A well-known nature spot with views over the inland sea.' },
      { title: 'Läckö Castle',  desc: 'Historic castle with concerts, exhibitions and restaurant — a classic cultural excursion destination.' },
      { title: 'Källstorp hiking trails', desc: 'Scenic hiking trails in and around nature reserves along Vänern\'s northwest shore.' },
      { title: 'Narebo greenhouses', desc: 'Stroll among grapevines and raspberries. Settle down with a cup of coffee in the peaceful greenhouse.' },
      { title: 'Läckö Golf Club', desc: 'Beautifully located golf club near Kinnekulle — a popular activity for groups.' },
    ];
    nearby.forEach(function (n, i) {
      if (nearbyTitles[i]) nearbyTitles[i].textContent = n.title;
      if (nearbyDescs[i])  nearbyDescs[i].innerHTML    = n.desc;
    });

    // Booking form
    t('.amber-rule-text', 'Request a quote', 5);
    t('.form-title', 'Request a quote');
    var formLabels = document.querySelectorAll('.form-label');
    var labelMap = {
      'Namn & organisation': 'Name &amp; organisation',
      'E-post': 'Email',
      'Telefon': 'Phone',
      'Antal deltagare': 'Number of participants',
      'Önskat datum': 'Preferred date',
      'Typ av konferens': 'Type of conference',
      'Meddelande': 'Message',
    };
    formLabels.forEach(function (el) {
      if (labelMap[el.textContent.trim()]) el.innerHTML = labelMap[el.textContent.trim()];
    });
    var selects = document.querySelectorAll('.form-select option');
    var selectMap = {
      'Välj antal': 'Select number',
      'Välj typ': 'Select type',
      'Dagskonferens': 'Day conference',
      'Konferens med övernattning (1 natt)': 'Conference with overnight stay (1 night)',
      'Konferens med övernattning (2+ nätter)': 'Conference with overnight stays (2+ nights)',
      'Styrelsemöte': 'Board meeting',
      'Kurs / utbildning': 'Course / training',
      'Annat': 'Other',
    };
    selects.forEach(function (opt) {
      if (selectMap[opt.textContent.trim()]) opt.textContent = selectMap[opt.textContent.trim()];
    });
    t('.btn-rise[type="submit"], a.btn-rise', 'Send enquiry', 'all');
    var directLabel = document.querySelector('.contact-block-label, [class*="contact"] .label');
    if (directLabel) directLabel.textContent = 'Direct contact';
  }

  function applyAttGora() {
    t('.page-hero-eyebrow', 'Activities &amp; excursions');
    t('.page-hero-h1',      'Explore the region<br>around Vänern');
    t('.page-hero-sub',     'Nature, beaches, castles and local gems — all within 20 km');

    // Section
    t('.amber-rule-text', 'Nearby', 0);
    t('h2', 'Excursions &amp; experiences', 0);

    // Activity badges
    var badges = document.querySelectorAll('.nearby-badge');
    var badgeMap = { 'Natur': 'Nature', 'Badplats': 'Beach', 'Mat &amp; dryck': 'Food &amp; drink', 'Historia': 'History', 'Shopping': 'Shopping', 'Upplevelse': 'Experience' };
    badges.forEach(function (b) { if (badgeMap[b.innerHTML]) b.innerHTML = badgeMap[b.innerHTML]; });

    // Activity cards
    var nearbyTitles = document.querySelectorAll('.nearby-title');
    var nearbyDescs  = document.querySelectorAll('.nearby-desc');
    var activities = [
      { title: 'Hindens Rev',
        desc:  'A dramatic rocky peninsula stretching out into Lake Vänern with sweeping views over the inland sea. Hiking through the nature reserve with opportunities for swimming and picnics — one of Västergötland\'s finest natural attractions.' },
      { title: 'Svalnäs',
        desc:  '"Lidköping\'s Riviera" — a well-kept sandy beach along Lake Vänern in Söne with a pier and changing rooms. Perfect for a summer swim in Sweden\'s second largest lake.' },
      { title: 'Framnäs Strandpark',
        desc:  'Popular beach park in Lidköping with sandy beach, barbecue areas and green spaces right on Lake Vänern. Enjoyed by families and those who just want to sit down with a book.' },
      { title: 'Läckö Kött',
        desc:  'Local butcher and deli near Läckö Castle with artisan meats and farm produce from the area. A great place to pick up something local to take home.' },
      { title: 'Läckö Castle',
        desc:  'One of Sweden\'s most beautiful Baroque castles — dramatically situated on a rock by Lake Vänern. Guided tours, summer concerts and exhibitions. A classic destination for the whole family.' },
      { title: 'Rörstrand Center',
        desc:  'Rörstrand — one of the world\'s oldest porcelain brands — has its outlet and museum in Lidköping. Great for bargains, gifts and a glimpse into the city\'s proud craft tradition.' },
      { title: 'Startsnära Farm',
        desc:  'Charming farm with animals, farm shop and activities for the whole family. A popular excursion for those who want to get close to rural life in Västra Götaland.' },
    ];
    activities.forEach(function (a, i) {
      if (nearbyTitles[i]) nearbyTitles[i].textContent = a.title;
      if (nearbyDescs[i])  nearbyDescs[i].innerHTML    = a.desc;
    });
  }

  function applyKontakt() {
    // Page header
    t('.page-header .eyebrow', 'Contact &amp; map');
    t('.page-header h1',       'Find us');
    t('.page-header p',        'Just west of Lidköping, along the road towards Läckö castle');

    // Contact section
    t('.amber-rule-text', 'Contact details', 0);
    t('.contact-card-title', 'Reach us');
    var contactLabels = document.querySelectorAll('.contact-label');
    var labelTranslations = ['Address', 'Phone', 'Email — general', 'Email — restaurant', 'Instagram'];
    contactLabels.forEach(function (el, i) { if (labelTranslations[i]) el.textContent = labelTranslations[i]; });

    // Hours
    var hoursLabels = document.querySelectorAll('.hours-label');
    var hoursSubs   = document.querySelectorAll('.hours-sub');
    var hoursData = ['Breakfast Mon–Fri', 'Breakfast Sat–Sun', 'Restaurant', 'Check-in'];
    hoursLabels.forEach(function (el, i) { if (hoursData[i]) el.textContent = hoursData[i]; });
    var hoursVals = document.querySelectorAll('.hours-val');
    if (hoursVals[2]) hoursVals[2].textContent = 'Fri–Sun 17–20';
    if (hoursSubs[0]) hoursSubs[0].textContent = 'Booking required';
    if (hoursSubs[1]) hoursSubs[1].textContent = 'Sun by arrangement';

    // Contact form
    t('.form-title', 'Send a message');
    t('.form-sub',   'We reply within 1–2 business days.');
    var fLabels = document.querySelectorAll('.form-label');
    var fLabelMap = {
      'Namn': 'Name',
      'E-post': 'Email',
      'Telefon (valfritt)': 'Phone (optional)',
      'Ämne': 'Subject',
      'Meddelande': 'Message',
    };
    fLabels.forEach(function (el) {
      if (fLabelMap[el.textContent.trim()]) el.textContent = fLabelMap[el.textContent.trim()];
    });
    var opts = document.querySelectorAll('.form-select option');
    var optMap = {
      'Välj ämne': 'Select subject',
      'Bokning — hotellrum': 'Booking — hotel room',
      'Bokning — gårdslägenhet': 'Booking — farm apartment',
      'Restaurang': 'Restaurant',
      'Konferens & kursgård': 'Conference &amp; course venue',
      'Teater på Närebo': 'Theatre at Narebo',
      'Övrigt': 'Other',
    };
    opts.forEach(function (opt) { if (optMap[opt.textContent.trim()]) opt.textContent = optMap[opt.textContent.trim()]; });
    var inputs = document.querySelectorAll('.form-input');
    inputs.forEach(function (inp) {
      var ph = inp.getAttribute('placeholder');
      var phMap = {
        'Ditt namn': 'Your name',
        'din@epost.se': 'your@email.com',
        '+46 70 000 00 00': '+46 70 000 00 00',
        'Hur kan vi hjälpa dig?': 'How can we help you?',
      };
      if (ph && phMap[ph]) inp.setAttribute('placeholder', phMap[ph]);
    });
    t('a.btn-rise', 'Send message');

    // Directions
    t('.amber-rule-text', 'Directions', 1);
    t('h2', 'How to find Narebo', 1);
    var dirCards = document.querySelectorAll('.dir-card');
    var directions = [
      { from: 'From Lidköping town centre', title: 'Via Örslösarondellen',
        text: 'Drive west towards Läckö. Go straight through the "Örslösarondellen" roundabout, signed Gårdsbutik. Narebo is the first farm on the left after approximately 800 m.' },
      { from: 'From the ring road', title: 'Northbound towards Läckö',
        text: 'Drive north on the ring road towards Läckö. Turn left at the "Örslösarondellen" roundabout towards Tun/Gårdsbutik. Narebo is the first farm on the left after approximately 800 m.' },
      { from: 'Coordinates', title: 'GPS',
        text: '58.52067, 13.09817\nN 58° 31.240\', E 13° 5.890\'' },
      { from: 'Parking', title: 'Large courtyard',
        text: 'Free parking on the farm courtyard. Plenty of space — coaches welcome. Contact us in advance for coach arrangements.' },
    ];
    dirCards.forEach(function (card, i) {
      var d = directions[i];
      if (!d) return;
      var fromEl  = card.querySelector('.dir-from');
      var titleEl = card.querySelector('.dir-title');
      var textEl  = card.querySelector('.dir-text');
      if (fromEl)  fromEl.textContent  = d.from;
      if (titleEl) titleEl.textContent = d.title;
      if (textEl)  textEl.textContent  = d.text;
    });
  }

  /* ── DISPATCH ─────────────────────────────────────────────────── */
  function applyPageTranslations() {
    var map = {
      'index.html':     applyIndex,
      'historia.html':  applyHistoria,
      'restaurang.html': applyRestaurang,
      'boende.html':    applyBoende,
      'konferens.html': applyKonferens,
      'att-gora.html':  applyAttGora,
      'kontakt.html':   applyKontakt,
      '':               applyIndex,
    };
    var fn = map[page];
    if (fn) fn();
  }

  /* ── LANG BUTTON INIT ─────────────────────────────────────────── */
  function initButtons(currentLang) {
    document.querySelectorAll('.nav-lang-item').forEach(function (btn) {
      btn.classList.toggle('nav-lang-active', btn.dataset.lang === currentLang);
      btn.addEventListener('click', function () {
        var chosen = this.dataset.lang;
        if (chosen === currentLang) return;
        localStorage.setItem(KEY, chosen);
        if (chosen === 'sv') {
          location.reload();
        } else {
          applyCommon();
          applyPageTranslations();
          document.querySelectorAll('.nav-lang-item').forEach(function (b) {
            b.classList.toggle('nav-lang-active', b.dataset.lang === 'en');
          });
          currentLang = 'en';
        }
      });
    });
  }

  /* ── BOOT ─────────────────────────────────────────────────────── */
  function boot() {
    var lang = localStorage.getItem(KEY) || 'sv';
    initButtons(lang);
    if (lang === 'en') {
      applyCommon();
      applyPageTranslations();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
