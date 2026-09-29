/*
 * WPFW homepage -- the whole thing, as one file.
 *
 * Built from the blocks in src/ by tools/build-bundle.py. Do not edit this
 * file: edit the block it came from and build again, or the next build
 * silently throws your change away.
 *
 * On a page:
 *   <div data-wpfw-home="page"></div>
 *   <script src="https://wpfwgm.github.io/wpfw-home/home.js" async></script>
 *
 * data-wpfw-home takes page, or any single band: hero, missed, signup,
 * events, news, people, app, sustain. More than one may sit on the same page; the script
 * is only ever loaded once.
 *
 * The attribute is data-wpfw-HOME, not data-wpfw, on purpose. The calendar
 * bundle claims data-wpfw and prints a visible error for any value it does
 * not recognise, so sharing the attribute would put "this should be
 * calendar, submit, station or upcoming" on the homepage.
 *
 * WHERE THE DATA COMES FROM -- all CORS-open, none of it proxied:
 *   confessor.wpfwfm.org/playlist/get_current.php   on air, up next, track
 *   wpfwgm.github.io/wpfw-archive-data/archive.json episodes, programmers
 *   wpfwgm.github.io/wpfw-calendar-feed/events.json station events
 *   /news?format=json                               same origin
 * Audio streams straight off archive.wpfwfm.org -- an <audio> src is not a
 * CORS read, so it needs no proxy either.
 */
(function () {
  'use strict';

  if (window.__wpfwHomeBundle) return;   /* two copies of the tag on one page */
  window.__wpfwHomeBundle = true;

  /* ===================== CONFIG ===================== */

  /* Pull the bands out to the window edges. Squarespace code blocks sit
     inside the content column, so without this the grounds stop short.
     Set false if you put the block in a section that is already full
     width with its padding at zero. */
  var FULL_BLEED = true;

  /* wpfwdc.org serves Young Serif and Bitter. It does not serve IBM Plex
     Mono, which every eyebrow, time chip, tag and button label is set in. */
  var FONTS = 'https://fonts.googleapis.com/css2?family=Young+Serif' +
              '&family=Bitter:ital,wght@0,400;0,500;0,700;1,400' +
              '&family=IBM+Plex+Mono:wght@400;500;600&display=swap';

  /* ================================================== */

  var STYLES = /*__STYLES__*/;
  var MARKUP = /*__MARKUP__*/;
  var BANDS  = /*__BANDS__*/;

  /* ---------- page-level chrome ---------- */

  var CHROME = [
    "@import url('" + FONTS + "');",
    "",
    ".wh-band{",
    "  --red:#C81210; --red-lift:#F5463B; --red-text:#F5463B;",
    "  --surface:#0C0A09; --surface-2:#14100E; --surface-3:#1C1613;",
    "  --fg:#EFE7DC; --fg-dim:#C4B7A8; --fg-mute:#8E8074;",
    "  --rule:#2E2520; --rule-soft:#211A16;",
    "  --accent2:#C9973F; --accent2-line:#7A5E2A;",
    "  --tile-bg:#1C1613; --hover:#1B100D;",
    "  --display:'Young Serif',Georgia,serif;",
    "  --body:'Bitter',Georgia,'Times New Roman',serif;",
    "  --mono:'IBM Plex Mono',ui-monospace,Menlo,monospace;",
    "  background:var(--surface); color:var(--fg);",
    "  font-family:var(--body); font-size:16px; line-height:1.6;",
    "  -webkit-font-smoothing:antialiased;",
    "  border-top:1px solid var(--rule-soft);",
    "}",
    /* Paper redefines the tokens AND `color`: a band inherits its computed
       colour from whatever Squarespace section it lands in, so swapping
       only the custom properties leaves bone text on parchment. */
    ".wh-band.wh-paper, .wh-band.wh-paper2{",
    "  color:var(--fg);",
    "  --surface:#F5F0E7; --surface-2:#EBE3D6; --surface-3:#E1D7C7;",
    "  --fg:#16110D; --fg-dim:#4C4239; --fg-mute:#6B5D50;",
    "  --rule:#D6CBBA; --rule-soft:#E4DCCE;",
    "  --accent2:#8A6520; --accent2-line:#BFAC88;",
    "  --tile-bg:#E1D7C7; --hover:#F9E9E2; --red-text:#C81210;",
    "}",
    ".wh-band.wh-paper2{ --surface:#EBE3D6; --surface-2:#E1D7C7; }",
    /* One band gets a ground of its own: a deadline that is on the page
       for a few days and should not read as furniture. Deep red rather
       than the brand red, which is reserved for buttons and would leave
       nothing to put on top of it. */
    ".wh-band.wh-alert{",
    "  color:#F7EFE7;",
    "  --surface:#8E0F0D; --surface-2:#7C0D0B; --surface-3:#6B0B09;",
    "  --fg:#F7EFE7; --fg-dim:#F0C9C4; --fg-mute:#E0A9A4;",
    "  --rule:rgba(247,239,231,.28); --rule-soft:rgba(247,239,231,.16);",
    "  --red-text:#FFD9D5;",
    "}",
    ".wh-band *, .wh-band *::before, .wh-band *::after{ box-sizing:border-box }",
    ".wh-band [hidden]{ display:none !important }",
    ".wh-band a{ color:inherit }",
    ".wh-band img{ max-width:100% }",
    ".wh-band :focus-visible{ outline:2px solid var(--red-lift); outline-offset:3px }",
    /* Squarespace sets no rule on these headings -- checked, nothing
       matches -- so they INHERIT #F5F5F5 from an ancestor of the code
       block, and near-white on parchment is unreadable. Inheritance
       loses to any matching rule, so one floor rule fixes the lot. Kept
       at low specificity on purpose: each block's own heading rules and
       its :hover states are more specific and still win. */
    ".wh-band h1,.wh-band h2,.wh-band h3,",
    ".wh-band h4,.wh-band h5,.wh-band h6{ color:var(--fg) }",
    "",
    ".wh-wrap{ width:100%; max-width:1180px; margin-inline:auto; padding-inline:20px }",
    ".wh-inner{ padding-block:64px }",
    ".wh-band.wh-hero .wh-inner, .wh-band.wh-signup .wh-inner{ padding-block:0 }",
    "",
    ".wh-stamp{",
    "  font-family:var(--mono); font-size:11px; letter-spacing:.16em;",
    "  text-transform:uppercase; color:var(--fg-mute);",
    "  display:flex; align-items:baseline; gap:14px; margin-bottom:10px;",
    "}",
    ".wh-stamp b{ color:var(--fg); font-weight:600 }",
    ".wh-stamp i{ flex:1 1 auto; height:1px; background:var(--rule); transform:translateY(-3px) }",
    ".wh-title{",
    "  font-family:var(--display); font-weight:400;",
    "  font-size:clamp(28px,4.4vw,44px); line-height:1.08;",
    "  margin:0 0 34px; text-wrap:balance; letter-spacing:-.005em; color:var(--fg);",
    "}",
    "@media (prefers-reduced-motion:reduce){",
    "  .wh-band *{ animation:none !important; transition:none !important }",
    "}"
  ].join('\n');

  /* No CSS bleed rule. calc(50% - 50vw) is the usual trick and it is wrong
     here: 100vw counts the scrollbar, so the band ends up wider than the
     visible page and the whole document scrolls sideways. Measured in the
     harness: hScroll true. documentElement.clientWidth excludes the
     scrollbar, so the offset is computed from the host's real position
     instead, and recomputed when the window changes. */
  function fitBleed(host) {
    var bands = host.querySelectorAll('.wh-band');
    if (!bands.length) return;

    /* Measure first, and refuse to act on a nonsense reading. A page laid
       out at zero width -- a hidden tab, a display:none ancestor, an
       iframe that has not been given a size yet -- would otherwise have
       every band pinned to width:0 and the homepage would be blank. Seen
       exactly that. Leave the bands alone and try again when the page has
       a width to measure. */
    var docW = document.documentElement.clientWidth;
    if (!docW || docW < 1) return;

    for (var i = 0; i < bands.length; i++) {
      bands[i].style.marginLeft = '0';
      bands[i].style.width = 'auto';
    }
    var left = host.getBoundingClientRect().left;
    for (var j = 0; j < bands.length; j++) {
      bands[j].style.marginLeft = (-left) + 'px';
      bands[j].style.width = docW + 'px';
    }
  }

  /* ---------- plumbing ---------- */

  var added = {};
  function addStyle(name, css) {
    if (added[name]) return;
    added[name] = true;
    var el = document.createElement('style');
    el.setAttribute('data-wpfw-home', name);
    el.textContent = css;
    document.head.appendChild(el);
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function bandHtml(b) {
    var ground = b.ground === 'paper'  ? ' wh-paper'
               : b.ground === 'paper2' ? ' wh-paper wh-paper2'
               : b.ground === 'alert'  ? ' wh-alert' : '';
    var head = '';
    if (b.stamp) {
      head += '<div class="wh-stamp"><b>' + esc(b.stamp[0]) + '</b>' +
              '<i></i><span>' + esc(b.stamp[1]) + '</span></div>';
    }
    /* The title is authored copy with entities in it, so it is not escaped. */
    if (b.title) head += '<h2 class="wh-title">' + b.title + '</h2>';

    return '<section class="wh-band wh-' + b.key + ground + '">' +
             '<div class="wh-wrap"><div class="wh-inner">' +
               head + (MARKUP[b.key] || '') +
             '</div></div>' +
           '</section>';
  }

/*__BOOTS__*/

  var BOOT = {
    hero:   boot_hero,
    vote:   boot_vote,
    missed: boot_missed,
    signup: boot_signup,
    events: boot_events,
    news:   boot_news,
    people: boot_people,
    app:    boot_app,
    sustain: boot_sustain
  };

  /* Each block removes its own root when its feed cannot be read. The
     section around it has to go too, or the page shows an eyebrow and a
     headline over nothing -- which is exactly what the harness did with
     /news unreachable. */
  var ROOT_ID = {
    hero:   'wpfw-hero',
    vote:   'wpfw-vote',
    missed: 'wpfw-missed',
    signup: 'wpfw-signup',
    events: 'wpfw-se',
    news:   'wpfw-news',
    people: 'wpfw-people',
    app:    'wpfw-app',
    sustain:'wpfw-sustain'
  };

  function mountBand(host, key) {
    var band = null;
    for (var i = 0; i < BANDS.length; i++) if (BANDS[i].key === key) band = BANDS[i];
    if (!band) return false;

    /* A band added to the manifest but not to BOOT and ROOT_ID mounts,
       throws, and is then removed by the watcher -- which looks exactly
       like a feed being down. Say which map is missing it instead. */
    if (!BOOT[key] || !ROOT_ID[key]) {
      if (window.console && console.error) {
        console.error('[wpfw-home] band "' + key + '" is in BANDS but missing from ' +
          (!BOOT[key] ? 'BOOT' : '') + (!BOOT[key] && !ROOT_ID[key] ? ' and ' : '') +
          (!ROOT_ID[key] ? 'ROOT_ID' : '') + ' in bundle.template.js');
      }
      return false;
    }
    addStyle(key, STYLES[key] || '');
    host.insertAdjacentHTML('beforeend', bandHtml(band));
    var section = host.lastElementChild;
    try { BOOT[key](); } catch (e) {
      /* One band failing is not a reason for the other five to go with it. */
      if (window.console && console.error) console.error('[wpfw-home] ' + key, e);
    }
    /* A block removes its root synchronously only on a hard failure. When a
       fetch rejects it happens a moment later, so polling on a timer left
       an eyebrow and a headline sitting over nothing for as long as the
       timer ran -- the harness showed exactly that with /news unreachable.
       Watching the section catches it the instant it happens. */
    /* A band may compute its own eyebrow -- the election one counts down
       -- so after booting, the stamp takes whatever it left behind. */
    if (section) {
      var owner = section.querySelector('[data-stamp-left]');
      var slot  = section.querySelector('.wh-stamp b');
      if (owner && slot) slot.textContent = owner.getAttribute('data-stamp-left');
    }

    watchEmpty(section, key);
    return true;
  }

  function watchEmpty(section, key) {
    if (!section) return;
    function gone() { return !document.getElementById(ROOT_ID[key]); }
    if (gone()) { section.remove(); return; }

    if (typeof MutationObserver !== 'function') {
      setTimeout(function () { if (gone()) section.remove(); }, 14000);
      return;
    }
    var obs = new MutationObserver(function () {
      if (gone()) { section.remove(); obs.disconnect(); }
    });
    obs.observe(section, { childList: true, subtree: true });
    /* Every block gives up inside twelve seconds; a watcher left running
       for the life of the page costs more than it saves. */
    setTimeout(function () { obs.disconnect(); }, 20000);
  }

  function mountOne(host) {
    if (host.getAttribute('data-wpfw-home-ready')) return;
    host.setAttribute('data-wpfw-home-ready', '1');

    var want = String(host.getAttribute('data-wpfw-home') || '').trim().toLowerCase();

    addStyle('chrome', CHROME);

    if (want === 'page') {
      for (var i = 0; i < BANDS.length; i++) mountBand(host, BANDS[i].key);
      if (FULL_BLEED) bleed(host);
      return;
    }
    if (mountBand(host, want)) { if (FULL_BLEED) bleed(host); return; }

    /* A typo in the one line somebody pastes should say so, not fail
       silently on a page nobody is watching. */
    host.innerHTML = '<p style="font:14px/1.5 Georgia,serif;color:#9C0D0C">' +
      'This block says data-wpfw-home="' + esc(want) + '". It should be page, ' +
      'or one of: hero, missed, signup, events, news, people, app, sustain.</p>';
  }

  function bleed(host) {
    fitBleed(host);
    var t;
    function again() { clearTimeout(t); t = setTimeout(function () { fitBleed(host); }, 120); }

    window.addEventListener('resize', again);
    /* Images and fonts land after mount and can move the host sideways. */
    window.addEventListener('load', again);
    /* A tab mounted while hidden has no width to measure, so the sizing is
       skipped above and has to happen when the tab is looked at. */
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) again();
    });
    /* Belt and braces for the case where none of those ever fire: the host
       changing size is the signal that the page finally has a layout. */
    if (typeof ResizeObserver === 'function') {
      try { new ResizeObserver(again).observe(document.documentElement); } catch (e) {}
    }
  }

  function mount() {
    var hosts = document.querySelectorAll('[data-wpfw-home]');
    for (var i = 0; i < hosts.length; i++) mountOne(hosts[i]);
  }

  /* async means this can land either side of the parser finishing. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
