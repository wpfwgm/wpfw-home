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

  var STYLES = {
  "hero": "#wpfw-hero{\n  --wh-red:#C81210; --wh-red-lt:#F5463B;\n  --wh-ink:#0C0A09; --wh-fg:#EFE7DC; --wh-dim:#C4B7A8; --wh-mute:#8E8074;\n  --wh-rule:#2E2520; --wh-brass:#C9973F;\n  --wh-head:\"Young Serif\",Georgia,serif;\n  --wh-body:\"Bitter\",Georgia,\"Times New Roman\",serif;\n  --wh-mono:\"IBM Plex Mono\",ui-monospace,Menlo,monospace;\n  position:relative; overflow:hidden;\n  background:var(--wh-ink); color:var(--wh-fg);\n  font-family:var(--wh-body);\n}\n#wpfw-hero *,#wpfw-hero *::before,#wpfw-hero *::after{box-sizing:border-box}\n#wpfw-hero [hidden]{display:none !important}\n\n#wh-wave{ position:absolute; inset:0; width:100%; height:100%; opacity:.5; pointer-events:none }\n\n.wh-in{\n  position:relative; width:100%; max-width:1180px;\n  margin-inline:auto; padding-inline:20px; padding-block:60px 66px;\n  display:grid; grid-template-columns:1.05fr .95fr; gap:52px; align-items:center;\n}\n\n.wh-lockup{ min-width:0 }\n.wh-kicker{\n  font-family:var(--wh-mono); font-size:10.5px; letter-spacing:.22em;\n  text-transform:uppercase; color:var(--wh-mute); margin-bottom:18px;\n}\n.wh-lockup h1{ margin:0; font-family:var(--wh-head); font-weight:400; line-height:.86; letter-spacing:-.02em }\n.wh-l1{ display:block; font-size:clamp(56px,10.5vw,116px) }\n.wh-l2{\n  display:block; color:var(--wh-red-lt); font-family:var(--wh-body);\n  font-style:italic; font-weight:400; font-size:clamp(28px,5.1vw,56px);\n  line-height:1; margin:6px 0 4px;\n}\n.wh-l3{ display:block; font-size:clamp(44px,8.4vw,92px) }\n.wh-lockup p{ margin:24px 0 0; max-width:34ch; color:var(--wh-dim); font-size:16.5px }\n\n/* Sits on the hero's own ground so the waveform runs through it. */\n.wh-card{ background:transparent; border:1px solid var(--wh-rule); border-top:3px solid var(--wh-red); padding:24px }\n.wh-card-head{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:18px }\n.wh-dot{\n  display:inline-flex; align-items:center; gap:7px;\n  font-family:var(--wh-mono); font-size:10.5px; letter-spacing:.18em;\n  text-transform:uppercase; color:var(--wh-red-lt);\n}\n.wh-dot::before{\n  content:\"\"; width:7px; height:7px; border-radius:50%;\n  background:var(--wh-red-lt); animation:wh-pulse 2.4s ease-in-out infinite;\n}\n@keyframes wh-pulse{ 0%,100%{opacity:1} 50%{opacity:.25} }\n.wh-elapsed{ font-family:var(--wh-mono); font-size:11px; color:var(--wh-mute); font-variant-numeric:tabular-nums }\n\n.wh-body{ display:flex; gap:18px; align-items:flex-start }\n.wh-art{\n  flex:none; width:96px; aspect-ratio:1; max-width:100%;\n  display:grid; place-items:center; overflow:hidden;\n  background:#0C0A09; border:1px solid var(--wh-rule);\n}\n.wh-art img{ width:100%; height:100%; object-fit:cover; display:block }\n.wh-mark{ display:flex; flex-direction:column; align-items:center; gap:2px }\n.wh-mark b{ font-family:var(--wh-head); font-weight:400; font-size:23px; line-height:1; color:var(--wh-fg) }\n.wh-mark i{ font-family:var(--wh-mono); font-style:normal; font-weight:600; font-size:12px; color:var(--wh-red-lt) }\n\n.wh-id{ min-width:0 }\n.wh-id h2{ font-family:var(--wh-head); font-weight:400; font-size:26px; line-height:1.14; margin:0 0 6px; color:var(--wh-fg) }\n.wh-dj{ margin:0; color:var(--wh-brass); font-size:14.5px }\n.wh-desc{ margin:8px 0 0; color:var(--wh-mute); font-size:14px }\n\n.wh-play{\n  flex:none; margin-left:auto;\n  width:62px; height:62px; border-radius:50%; border:none;\n  background:var(--wh-red); color:#fff; font-size:20px; line-height:1;\n  display:grid; place-items:center; cursor:pointer;\n  transition:background .15s ease, transform .15s ease;\n}\n.wh-play:hover{ background:var(--wh-red-lt); transform:scale(1.06) }\n.wh-play.is-playing{ background:#EFE7DC; color:#0C0A09 }\n.wh-play.is-loading{ opacity:.7 }\n\n.wh-track{\n  margin:18px 0 0; font-size:14px; color:var(--wh-dim);\n  display:flex; gap:9px; align-items:baseline; flex-wrap:wrap;\n}\n.wh-track b{ font-weight:400; color:var(--wh-fg) }\n.wh-track span{ font-family:var(--wh-mono); font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:var(--wh-mute) }\n\n.wh-prog{ height:3px; background:var(--wh-rule); margin:20px 0 14px; position:relative; overflow:hidden }\n.wh-prog i{ position:absolute; inset:0 auto 0 0; display:block; width:0; background:var(--wh-red); transition:width .6s linear }\n.wh-times{ display:flex; justify-content:space-between; font-family:var(--wh-mono); font-size:11px; color:var(--wh-mute); font-variant-numeric:tabular-nums }\n\n.wh-next{ margin-top:20px; padding-top:16px; border-top:1px solid var(--wh-rule); display:flex; gap:12px; align-items:baseline; font-size:14px }\n.wh-next-lbl{ flex:none; font-family:var(--wh-mono); font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:var(--wh-mute) }\n.wh-next b{ font-weight:700 }\n.wh-next em{ font-style:normal; color:var(--wh-mute) }\n\n@media (max-width:900px){ .wh-in{ grid-template-columns:1fr; gap:38px; padding-block:44px 50px } }\n@media (prefers-reduced-motion:reduce){ #wpfw-hero *{ animation:none !important; transition:none !important } }",
  "vote": "/* The one band with a ground of its own. It is a deadline, it is on the\n   page for a few days, and it should not look like the furniture. */\n#wpfw-vote{ font-family:var(--body); color:#F7EFE7 }\n#wpfw-vote *,#wpfw-vote *::before,#wpfw-vote *::after{ box-sizing:border-box }\n\n.wv-grid{\n  display:grid; grid-template-columns:1.25fr .75fr; gap:44px;\n  align-items:start;\n}\n.wv-lede{\n  margin:0 0 16px; font-size:17px; line-height:1.55;\n  color:#F7EFE7; max-width:46ch;\n}\n.wv-quorum{\n  margin:0; font-size:14.5px; line-height:1.6;\n  color:#F0C9C4; max-width:52ch;\n}\n.wv-quorum b{ color:#fff; font-weight:700 }\n\n.wv-do{ display:flex; flex-direction:column; gap:10px; align-items:stretch }\n.wv-btn{\n  display:block; text-align:center; text-decoration:none;\n  font-family:var(--mono); font-size:11.5px; letter-spacing:.12em;\n  text-transform:uppercase; padding:14px 20px;\n  background:#F7EFE7; color:#8E0F0D;\n  transition:background .15s ease, color .15s ease;\n}\n/* The one thing to actually do, so it carries weight the other two do\n   not. 600 rather than 700: the bundle loads IBM Plex Mono at 400, 500\n   and 600, and asking for 700 gets a synthesised bold -- smeared, and\n   visibly different from every other mono label on the page. */\n.wv-btn:not(.ghost){ font-weight:600 }\n.wv-btn:hover{ background:#fff; color:#8E0F0D }\n.wv-btn.ghost{\n  background:transparent; color:#F7EFE7;\n  border:1px solid rgba(247,239,231,.45);\n}\n.wv-btn.ghost:hover{ background:rgba(247,239,231,.12); color:#fff }\n.wv-fine{\n  margin:6px 0 0; font-size:12px; line-height:1.6; color:#EBBDB8;\n}\n.wv-fine b{ color:#fff; font-weight:600 }\n.wv-fine a{ color:#fff; text-decoration:underline; text-underline-offset:2px }\n\n@media (max-width:900px){ .wv-grid{ grid-template-columns:1fr; gap:26px } }",
  "missed": "/* Scoped under #wpfw-missed and prefixed .wm-, so it cannot inherit from\n   or leak into Squarespace's own styles. Paper band: this rail sits on\n   the light ground between the hero and the sign-up strip. */\n#wpfw-missed{\n  --wm-red:#C81210; --wm-red-lt:#F5463B;\n  --wm-paper:#F5F0E7; --wm-paper-2:#EBE3D6; --wm-hover:#F9E9E2;\n  --wm-ink:#16110D; --wm-dim:#4C4239; --wm-mute:#6B5D50;\n  --wm-rule:#D6CBBA; --wm-rule-soft:#E4DCCE;\n  --wm-head:\"Young Serif\",Georgia,serif;\n  --wm-body:\"Bitter\",Georgia,\"Times New Roman\",serif;\n  --wm-mono:\"IBM Plex Mono\",ui-monospace,Menlo,monospace;\n  font-family:var(--wm-body); color:var(--wm-ink);\n}\n#wpfw-missed *,#wpfw-missed *::before,#wpfw-missed *::after{box-sizing:border-box}\n#wpfw-missed [hidden]{display:none !important}\n\n/* One-pixel gaps in a shared ground, so the six cards read as a grid\n   rather than six floating boxes. */\n.wm-rail{\n  display:grid; grid-template-columns:repeat(3,1fr);\n  gap:1px; background:var(--wm-rule-soft);\n  border:1px solid var(--wm-rule-soft);\n}\n.wm-card{\n  background:var(--wm-paper); padding:24px 22px;\n  display:flex; flex-direction:column; gap:16px;\n  transition:background .16s ease;\n}\n.wm-card{ position:relative }\n.wm-card:hover{ background:var(--wm-hover) }\n.wm-card:hover .wm-cardlink{ color:var(--wm-red) }\n\n/* One link, stretched across the whole card, so the card is clickable\n   without wrapping a <button> in an <a> -- which is invalid, and which\n   costs you middle-click, the status-bar URL and keyboard focus. The\n   play button is lifted above it so it still plays in place. */\n.wm-cardlink{\n  color:inherit; text-decoration:none;\n  transition:color .15s ease;\n}\n.wm-cardlink::after{ content:''; position:absolute; inset:0; z-index:1 }\n.wm-card .wm-play,\n.wm-card .wm-tag{ position:relative; z-index:2 }\n\n.wm-top{ display:flex; gap:15px; align-items:center }\n\n.wm-play{\n  flex:none; width:48px; height:48px; border-radius:50%;\n  border:none; background:var(--wm-red); color:#fff;\n  font-size:15px; line-height:1; cursor:pointer;\n  display:grid; place-items:center;\n  transition:background .15s ease, transform .15s ease;\n}\n.wm-play:hover{ background:var(--wm-red-lt); transform:scale(1.06) }\n.wm-play.is-playing{ background:var(--wm-ink) }\n.wm-play.is-loading{ opacity:.65 }\n\n/* Optional programme artwork in place of the button. Off by default --\n   only 24 of 119 programmes have a logo, so switching it on makes six\n   cards look like two designs. SHOW_ART in the script turns it on. */\n.wm-art{\n  flex:none; width:48px; height:48px; overflow:hidden;\n  display:grid; place-items:center; border:1px solid var(--wm-rule);\n}\n.wm-art img{ width:100%; height:100%; display:block }\n\n.wm-id{ min-width:0 }\n.wm-id h3{\n  font-family:var(--wm-mono); font-weight:600;\n  font-size:11.5px; letter-spacing:.09em; text-transform:uppercase;\n  line-height:1.35; margin:0 0 3px; color:var(--wm-ink);\n}\n.wm-host{ margin:0; font-size:12.5px; color:#8A6520 }\n\n.wm-time{\n  flex:none; margin-left:auto; align-self:flex-start;\n  font-family:var(--wm-mono); font-size:10.5px; letter-spacing:.08em;\n  font-variant-numeric:tabular-nums;\n  padding:5px 9px; border:1px solid var(--wm-rule);\n  background:var(--wm-paper-2); color:var(--wm-dim);\n  transition:border-color .16s ease, color .16s ease;\n}\n.wm-card:hover .wm-time{ border-color:var(--wm-red); color:var(--wm-red) }\n\n/* The write-up is the reason anyone presses play, so it carries the card. */\n.wm-excerpt{\n  margin:0;\n  font-family:var(--wm-head); font-weight:400;\n  font-size:17px; line-height:1.34; color:var(--wm-ink);\n  display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical;\n  overflow:hidden; min-height:calc(4 * 1.34em);\n}\n\n.wm-tags{ margin-top:auto; display:flex; flex-wrap:wrap; gap:6px }\n.wm-tag{\n  font-family:var(--wm-mono); font-size:9.5px; letter-spacing:.08em;\n  text-transform:uppercase; padding:3px 7px;\n  border:1px solid var(--wm-rule); color:var(--wm-mute);\n}\n\n.wm-foot{ display:flex; justify-content:flex-end; margin-top:22px }\n.wm-link{\n  font-family:var(--wm-mono); font-size:11.5px; letter-spacing:.11em;\n  text-transform:uppercase; text-decoration:none; color:var(--wm-ink);\n  border-bottom:1px solid var(--wm-red); padding-bottom:3px; white-space:nowrap;\n}\n.wm-link:hover{ color:var(--wm-red) }\n\n@media (max-width:900px){ .wm-rail{ grid-template-columns:repeat(2,1fr) } }\n@media (max-width:560px){ .wm-rail{ grid-template-columns:1fr } }\n@media (prefers-reduced-motion:reduce){\n  #wpfw-missed *{ animation:none !important; transition:none !important }\n}",
  "signup": "#wpfw-signup{\n  --wn-red:#C81210; --wn-red-lt:#F5463B;\n  --wn-paper:#EBE3D6;                 /* one step deeper than the rail above */\n  --wn-ink:#16110D; --wn-dim:#4C4239; --wn-mute:#6B5D50;\n  --wn-rule:#D6CBBA;\n  --wn-head:\"Young Serif\",Georgia,serif;\n  --wn-body:\"Bitter\",Georgia,\"Times New Roman\",serif;\n  --wn-mono:\"IBM Plex Mono\",ui-monospace,Menlo,monospace;\n  background:var(--wn-paper); color:var(--wn-ink);\n  font-family:var(--wn-body);\n  border-top:1px solid var(--wn-rule);\n}\n#wpfw-signup *,#wpfw-signup *::before,#wpfw-signup *::after{box-sizing:border-box}\n\n.wn-in{\n  width:100%; max-width:1180px; margin-inline:auto;\n  padding-inline:20px; padding-block:30px 32px;\n  display:grid; grid-template-columns:1fr minmax(320px,440px);\n  gap:26px 48px; align-items:center;\n}\n.wn-say h2{\n  font-family:var(--wn-head); font-weight:400;\n  font-size:clamp(21px,2.6vw,27px); line-height:1.14;\n  margin:0 0 6px; text-wrap:balance; color:var(--wn-ink);\n}\n.wn-say p{ margin:0; color:var(--wn-dim); font-size:15px; max-width:46ch }\n\n/* ---- strip CC's own chrome ------------------------------------- */\n#wn-slot .ctct-form-container,\n#wn-slot .ctct-form-embed,\n#wn-slot .ctct-form-defaults{\n  background:transparent !important; border:none !important;\n  box-shadow:none !important; padding:0 !important; margin:0 !important;\n  max-width:none !important; width:100% !important;\n}\n\n/* ---- the form becomes the grid --------------------------------- */\n#wn-slot form.ctct-form-custom{\n  display:grid !important;\n  grid-template-columns:1fr auto;\n  gap:0 !important; margin:0 !important; padding:0 !important;\n  background:transparent !important; border:none !important;\n}\n\n/* CC's heading, description and label: out of sight, still in the DOM\n   so the input keeps an accessible name. */\n#wn-slot .ctct-form-header,\n#wn-slot .ctct-form-text,\n#wn-slot .ctct-form-label{\n  position:absolute !important; width:1px !important; height:1px !important;\n  padding:0 !important; margin:-1px !important; overflow:hidden !important;\n  clip:rect(0 0 0 0) !important; white-space:nowrap !important; border:0 !important;\n}\n\n#wn-slot .ctct-form-field{\n  grid-column:1; grid-row:1;\n  display:block !important; margin:0 !important; padding:0 !important;\n}\n#wn-slot input.ctct-form-element{\n  width:100% !important; min-width:0 !important;\n  background:transparent !important;\n  border:1px solid var(--wn-rule) !important; border-right:none !important;\n  border-radius:0 !important;\n  color:var(--wn-ink) !important;\n  font-family:var(--wn-body) !important; font-size:15px !important;\n  line-height:1.4 !important; padding:13px 14px !important;\n  height:auto !important; margin:0 !important; box-shadow:none !important;\n}\n#wn-slot input.ctct-form-element::placeholder{ color:var(--wn-mute) !important }\n#wn-slot input.ctct-form-element:focus{\n  outline:none !important; border-color:var(--wn-red) !important;\n}\n\n#wn-slot button.ctct-form-button{\n  grid-column:2; grid-row:1; align-self:stretch;\n  border:none !important; border-radius:0 !important;\n  background:var(--wn-red) !important; color:#fff !important;\n  font-family:var(--wn-mono) !important; font-size:11.5px !important;\n  font-weight:400 !important; letter-spacing:.12em !important;\n  text-transform:uppercase !important;\n  padding:0 24px !important; margin:0 !important;\n  width:auto !important; height:auto !important; min-height:0 !important;\n  float:none !important; cursor:pointer;\n  transition:background .15s ease;\n}\n#wn-slot button.ctct-form-button:hover{ background:var(--wn-red-lt) !important }\n\n/* Required by Constant Contact. Set small. Never hidden. */\n#wn-slot #gdpr_text{ grid-column:1 / -1; margin:0 !important }\n#wn-slot #gdpr_text .ctct-gdpr-text{\n  margin:10px 0 0 !important; padding:0 !important;\n  font-family:var(--wn-body) !important;\n  font-size:10.5px !important; line-height:1.6 !important;\n  color:var(--wn-mute) !important; text-align:left !important;\n}\n#wn-slot #gdpr_text a{ color:var(--wn-dim) !important; text-decoration:underline }\n\n/* Errors span the row, under the field. */\n#wn-slot .ctct-form-error{ grid-column:1 / -1 }\n#wn-slot .ctct-form-errorMessage{\n  font-family:var(--wn-mono) !important; font-size:11px !important;\n  letter-spacing:.04em !important; color:var(--wn-red) !important;\n  margin:6px 0 0 !important; background:transparent !important;\n}\n\n/* The invisible reCAPTCHA container stays in the DOM -- removing it\n   breaks the token. It is given no height, and its badge, which floats\n   over the whole page bottom-right, is hidden. */\n#wn-slot #ctct_recaptcha_0{ grid-column:1 / -1; height:0 !important; overflow:visible }\n.grecaptcha-badge{ visibility:hidden }\n\n/* What replaces the form after a successful sign-up. */\n#wn-slot .ctct-form-success{\n  background:transparent !important; border:none !important; padding:0 !important;\n}\n#wn-slot .ctct-form-success .ctct-form-header{\n  position:static !important; width:auto !important; height:auto !important;\n  clip:auto !important; margin:0 0 6px !important; overflow:visible !important;\n  font-family:var(--wn-head) !important; font-weight:400 !important;\n  font-size:21px !important; color:var(--wn-ink) !important;\n}\n#wn-slot .ctct-form-success .ctct-form-text{\n  position:static !important; width:auto !important; height:auto !important;\n  clip:auto !important; margin:0 !important; overflow:visible !important;\n  font-family:var(--wn-body) !important; font-size:15px !important;\n  color:var(--wn-dim) !important;\n}\n#wn-slot p.ctct-form-footer{\n  font-size:10.5px !important; color:var(--wn-mute) !important;\n  margin:8px 0 0 !important;\n}\n\n@media (max-width:900px){ .wn-in{ grid-template-columns:1fr; gap:22px } }\n@media (max-width:420px){\n  /* At phone width a 24px-padded button beside a field leaves the field\n     too narrow to read what you typed. Stack them. */\n  #wn-slot form.ctct-form-custom{ grid-template-columns:1fr }\n  #wn-slot button.ctct-form-button{ grid-column:1; grid-row:2; padding:14px !important }\n  #wn-slot input.ctct-form-element{ border-right:1px solid var(--wn-rule) !important }\n}",
  "events": "/* Homepage tokens, not the calendar's. This band sits on the dark\n   ground with two paper panels laid on it, so the type colors are\n   fixed here rather than inherited from whatever Squarespace section\n   the block lands in. */\n#wpfw-se{\n  --se-red:#C81210; --se-red-lt:#F5463B;\n  --se-paper:#F5F0E7; --se-paper-2:#EBE3D6;\n  --se-ink:#16110D; --se-dim:#4C4239; --se-mute:#6B5D50;\n  --se-rule:#D6CBBA;\n  --se-head:\"Young Serif\",Georgia,serif;\n  --se-body:\"Bitter\",Georgia,\"Times New Roman\",serif;\n  --se-mono:\"IBM Plex Mono\",ui-monospace,Menlo,monospace;\n  font-family:var(--se-body); color:var(--se-ink);\n}\n#wpfw-se *,#wpfw-se *::before,#wpfw-se *::after{box-sizing:border-box}\n#wpfw-se [hidden]{display:none !important}\n\n.wpfw-se-grid{\n  display:grid; grid-template-columns:1.3fr 1fr; gap:40px;\n  align-items:start;\n}\n\n/* ---------- the feature ---------- */\n.wpfw-se-feature{\n  background:var(--se-paper); border:1px solid var(--se-rule);\n  padding:0; overflow:hidden;\n}\n.wpfw-se-img{\n  position:relative; display:grid; place-items:center;\n  aspect-ratio:16/9; max-width:100%; overflow:hidden;\n  border-bottom:1px solid var(--se-rule);\n  background:\n    radial-gradient(120% 95% at 20% 16%, rgba(245,70,59,.50), transparent 60%),\n    radial-gradient(105% 85% at 84% 80%, rgba(201,151,63,.40), transparent 58%),\n    linear-gradient(158deg,#1D100C 0%,#0C0A09 56%,#27130F 100%);\n}\n.wpfw-se-img::after{\n  content:\"\"; position:absolute; inset:0;\n  background-image:radial-gradient(rgba(239,231,220,.15) 1px, transparent 1.15px);\n  background-size:7px 7px;\n}\n.wpfw-se-img img{\n  position:absolute; inset:0; z-index:1;\n  width:100%; height:100%; object-fit:cover; display:block;\n}\n.wpfw-se-mark{\n  position:relative; z-index:1; text-align:center;\n  display:flex; flex-direction:column; align-items:center; gap:7px;\n}\n.wpfw-se-mark b{ font-family:var(--se-head); font-weight:400; font-size:26px; line-height:1; color:#EFE7DC }\n.wpfw-se-mark i{ font-family:var(--se-mono); font-style:normal; font-weight:600; font-size:12px; letter-spacing:.04em; color:var(--se-red-lt) }\n\n.wpfw-se-body{ padding:30px }\n.wpfw-se-status{\n  display:inline-block; margin-bottom:12px;\n  font-family:var(--se-mono); font-size:10px; font-weight:600;\n  letter-spacing:.14em; text-transform:uppercase;\n  color:#fff; background:var(--se-red); padding:4px 9px;\n}\n.wpfw-se-row .wpfw-se-status{ margin:0 0 6px; font-size:9px; padding:3px 7px }\n.wpfw-se-when{\n  font-family:var(--se-mono); font-size:11px; letter-spacing:.14em;\n  text-transform:uppercase; color:var(--se-red); margin-bottom:12px;\n}\n.wpfw-se-feature h3{\n  color:var(--se-ink);\n  font-family:var(--se-head); font-weight:400;\n  font-size:clamp(24px,3.2vw,34px); line-height:1.1;\n  margin:0 0 14px; text-wrap:balance;\n}\n.wpfw-se-feature p.blurb{ margin:0 0 20px; color:var(--se-dim); max-width:48ch }\n.wpfw-se-facts{\n  list-style:none; margin:0 0 24px; padding:0;\n  display:flex; flex-direction:column; gap:7px;\n  font-family:var(--se-mono); font-size:12.5px; color:var(--se-mute);\n}\n.wpfw-se-facts li{ display:flex; gap:12px }\n.wpfw-se-facts b{ color:var(--se-dim); font-weight:500; min-width:78px; flex:none }\n\n.wpfw-se-btns{ display:flex; gap:12px; flex-wrap:wrap }\n.wpfw-se-btn{\n  display:inline-block; font-family:var(--se-mono); font-size:11.5px;\n  letter-spacing:.12em; text-transform:uppercase; text-decoration:none;\n  padding:13px 22px; background:var(--se-red); color:#fff;\n  transition:background .15s ease;\n}\n.wpfw-se-btn:hover{ background:var(--se-red-lt); color:#fff }\n.wpfw-se-btn.ghost{ background:transparent; border:1px solid var(--se-rule); color:var(--se-ink) }\n.wpfw-se-btn.ghost:hover{ background:var(--se-paper-2); border-color:var(--se-mute); color:var(--se-ink) }\n\n/* ---------- the list ---------- */\n.wpfw-se-panel{\n  background:var(--se-paper); border:1px solid var(--se-rule);\n  padding:26px 24px;\n}\n.wpfw-se-row{\n  display:grid; grid-template-columns:auto 1fr; gap:18px;\n  padding:18px 0; border-top:1px solid var(--se-rule);\n  text-decoration:none; color:inherit;\n}\n.wpfw-se-row:first-child{ border-top:none; padding-top:0 }\n.wpfw-se-row:hover h4{ color:var(--se-red) }\n.wpfw-se-date{\n  font-family:var(--se-mono); font-size:10px; letter-spacing:.1em;\n  text-transform:uppercase; text-align:center; line-height:1.5;\n  color:var(--se-mute); border:1px solid var(--se-rule);\n  padding:8px 10px; min-width:58px; align-self:start;\n}\n.wpfw-se-date b{\n  display:block; font-family:var(--se-head); font-weight:400;\n  font-size:21px; line-height:1.1; color:var(--se-ink); letter-spacing:0;\n}\n.wpfw-se-row h4{\n  color:var(--se-ink);\n  font-family:var(--se-head); font-weight:400; font-size:18px;\n  line-height:1.2; margin:0 0 5px; text-wrap:balance;\n  transition:color .15s ease;\n}\n.wpfw-se-row .where{ margin:0 0 6px; font-family:var(--se-mono); font-size:11.5px; color:var(--se-mute) }\n.wpfw-se-row p{ margin:0; font-size:13.5px; color:var(--se-dim); line-height:1.55 }\n\n.wpfw-se-none{\n  font-size:13.5px; line-height:1.6; color:var(--se-mute);\n  border:1px dashed var(--se-rule); padding:16px 18px; margin:0;\n}\n.wpfw-se-foot{\n  margin-top:22px; padding-top:18px; border-top:1px solid var(--se-rule);\n  display:flex; gap:14px; flex-wrap:wrap; align-items:center;\n}\n.wpfw-se-link{\n  font-family:var(--se-mono); font-size:11.5px; letter-spacing:.11em;\n  text-transform:uppercase; text-decoration:none; color:var(--se-ink);\n  border-bottom:1px solid var(--se-red); padding-bottom:3px; white-space:nowrap;\n}\n.wpfw-se-link:hover{ color:var(--se-red) }\n\n@media (max-width:900px){\n  .wpfw-se-grid{ grid-template-columns:1fr; gap:32px }\n}\n@media (max-width:560px){\n  .wpfw-se-body{ padding:24px 20px }\n  .wpfw-se-panel{ padding:22px 18px }\n}",
  "news": "#wpfw-news{\n  --wn-red:#C81210;\n  --wn-paper:#F5F0E7; --wn-hover:#F9E9E2;\n  --wn-ink:#16110D; --wn-dim:#4C4239; --wn-mute:#6B5D50;\n  --wn-rule:#D6CBBA; --wn-rule-soft:#E4DCCE;\n  --wn-head:\"Young Serif\",Georgia,serif;\n  --wn-body:\"Bitter\",Georgia,\"Times New Roman\",serif;\n  --wn-mono:\"IBM Plex Mono\",ui-monospace,Menlo,monospace;\n  font-family:var(--wn-body); color:var(--wn-ink);\n}\n#wpfw-news *,#wpfw-news *::before,#wpfw-news *::after{box-sizing:border-box}\n#wpfw-news [hidden]{display:none !important}\n\n.wn-grid{\n  display:grid; grid-template-columns:repeat(4,1fr);\n  gap:1px; background:var(--wn-rule-soft); border:1px solid var(--wn-rule-soft);\n}\n.wn-card{\n  background:var(--wn-paper); padding:0; display:flex; flex-direction:column;\n  text-decoration:none; color:inherit; transition:background .16s ease;\n}\n.wn-card:hover{ background:var(--wn-hover) }\n.wn-card:hover h3{ color:var(--wn-red) }\n\n/* The ground shows for a post with no featured image, and behind one\n   that fails to load -- the script drops any <img> that errors rather\n   than leaving a broken frame in the row. */\n.wn-thumb{\n  position:relative; display:block; aspect-ratio:3/2; max-width:100%;\n  overflow:hidden; border-bottom:1px solid var(--wn-rule-soft);\n  background:\n    radial-gradient(115% 95% at 22% 18%, var(--ph-a,rgba(245,70,59,.5)), transparent 62%),\n    radial-gradient(100% 85% at 82% 82%, var(--ph-b,rgba(201,151,63,.4)), transparent 58%),\n    linear-gradient(158deg,#1D100C 0%,#0C0A09 56%,#27130F 100%);\n}\n.wn-thumb::after{\n  content:\"\"; position:absolute; inset:0;\n  background-image:radial-gradient(rgba(239,231,220,.14) 1px, transparent 1.15px);\n  background-size:7px 7px;\n}\n.wn-thumb img{ position:absolute; inset:0; z-index:1; width:100%; height:100%; object-fit:cover; display:block }\n\n.wn-body{ padding:20px; display:flex; flex-direction:column; gap:9px }\n.wn-dt{ font-family:var(--wn-mono); font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--wn-mute) }\n.wn-card h3{\n  color:var(--wn-ink);\n  font-family:var(--wn-head); font-weight:400; font-size:19px;\n  line-height:1.2; margin:0; transition:color .15s ease; text-wrap:balance;\n}\n.wn-card p{ margin:0; font-size:13.5px; color:var(--wn-dim); line-height:1.55 }\n\n.wn-foot{ display:flex; justify-content:flex-end; margin-top:22px }\n.wn-link{\n  font-family:var(--wn-mono); font-size:11.5px; letter-spacing:.11em;\n  text-transform:uppercase; text-decoration:none; color:var(--wn-ink);\n  border-bottom:1px solid var(--wn-red); padding-bottom:3px;\n}\n.wn-link:hover{ color:var(--wn-red) }\n\n@media (max-width:900px){ .wn-grid{ grid-template-columns:repeat(2,1fr) } }\n@media (max-width:560px){ .wn-grid{ grid-template-columns:1fr } }",
  "people": "#wpfw-people{\n  --wp-red:#C81210; --wp-red-lt:#F5463B;\n  --wp-ink:#0C0A09; --wp-fg:#EFE7DC; --wp-dim:#C4B7A8; --wp-mute:#8E8074;\n  --wp-rule:#2E2520; --wp-tile:#1C1613; --wp-brass:#C9973F;\n  --wp-head:\"Young Serif\",Georgia,serif;\n  --wp-body:\"Bitter\",Georgia,\"Times New Roman\",serif;\n  --wp-mono:\"IBM Plex Mono\",ui-monospace,Menlo,monospace;\n  font-family:var(--wp-body); color:var(--wp-fg);\n}\n#wpfw-people *,#wpfw-people *::before,#wpfw-people *::after{box-sizing:border-box}\n#wpfw-people [hidden]{display:none !important}\n\n.wp-faces{ display:grid; grid-template-columns:repeat(4,1fr); gap:24px }\n.wp-face{ display:flex; flex-direction:column; gap:12px; text-decoration:none; color:inherit }\n.wp-face:hover h4{ color:var(--wp-red-lt) }\n.wp-shot{\n  width:100%; aspect-ratio:1; max-width:100%; overflow:hidden;\n  background:var(--wp-tile); border:1px solid var(--wp-rule);\n  display:grid; place-items:center;\n}\n.wp-shot img{ width:100%; height:100%; object-fit:cover; display:block }\n/* Monogram, for a programmer whose portrait will not load. */\n.wp-mono{ font-family:var(--wp-head); font-size:34px; color:var(--wp-dim) }\n.wp-face h4{ color:var(--wp-fg); font-family:var(--wp-head); font-weight:400; font-size:17px; margin:0; transition:color .15s ease }\n.wp-role{ font-size:13px; color:var(--wp-mute); margin:0 }\n\n/* Full width under the portraits: three columns, so the numbers read as\n   evidence for the faces rather than as a sidebar beside them. */\n.wp-facts{\n  display:grid; grid-template-columns:repeat(3,1fr);\n  gap:1px; background:var(--wp-rule);\n  border-block:1px solid var(--wp-rule);\n  margin-top:44px;\n}\n.wp-fact{ background:var(--wp-ink); padding:22px 22px 24px }\n.wp-n{\n  font-family:var(--wp-head); font-size:40px; line-height:1;\n  color:var(--wp-fg); margin-bottom:9px; font-variant-numeric:tabular-nums;\n}\n.wp-t{ font-size:14.5px; color:var(--wp-dim); line-height:1.5 }\n.wp-t b{ display:block; color:var(--wp-fg); font-weight:700; margin-bottom:2px }\n\n.wp-foot{\n  display:flex; flex-wrap:wrap; gap:10px 28px;\n  align-items:center; justify-content:space-between; margin-top:22px;\n}\n.wp-right{ display:flex; gap:26px; flex-wrap:wrap }\n.wp-link{\n  font-family:var(--wp-mono); font-size:11.5px; letter-spacing:.11em;\n  text-transform:uppercase; text-decoration:none; color:var(--wp-fg);\n  border:none; border-bottom:1px solid var(--wp-red);\n  background:transparent; padding:0 0 3px; cursor:pointer; white-space:nowrap;\n}\n.wp-link:hover{ color:var(--wp-red-lt) }\n\n@media (max-width:900px){ .wp-faces{ grid-template-columns:repeat(2,1fr) } }\n@media (max-width:560px){ .wp-facts{ grid-template-columns:1fr } .wp-n{ font-size:34px } }\n@media (prefers-reduced-motion:reduce){ #wpfw-people *{ transition:none !important } }",
  "app": "#wpfw-app{ font-family:var(--body); color:var(--fg) }\n#wpfw-app *,#wpfw-app *::before,#wpfw-app *::after{ box-sizing:border-box }\n\n.wa-grid{\n  display:grid; grid-template-columns:1.25fr .75fr; gap:44px;\n  align-items:center;\n}\n.wa-lede{ margin:0 0 22px; font-size:16.5px; color:var(--fg-dim); max-width:46ch }\n\n/* Four plain facts. A bulleted list would be four bullets; ruled rows\n   read as a specification, which is what they are. */\n.wa-list{\n  list-style:none; margin:0; padding:0;\n  display:grid; grid-template-columns:repeat(2,1fr); gap:0;\n  border-top:1px solid var(--rule);\n}\n.wa-list li{\n  padding:13px 0; border-bottom:1px solid var(--rule);\n  font-family:var(--mono); font-size:12.5px; letter-spacing:.04em;\n  color:var(--fg-dim);\n}\n.wa-list li:nth-child(odd){ padding-right:18px }\n\n.wa-stores{ display:flex; flex-direction:column; gap:12px }\n.wa-store{\n  display:block; text-decoration:none;\n  border:1px solid var(--rule); background:var(--surface-2);\n  padding:14px 20px; color:var(--fg);\n  transition:border-color .15s ease, background .15s ease;\n}\n.wa-store:hover{ border-color:var(--red); background:var(--surface-3) }\n.wa-store-sm{\n  display:block; font-family:var(--mono); font-size:10px;\n  letter-spacing:.14em; text-transform:uppercase; color:var(--fg-mute);\n  margin-bottom:3px;\n}\n.wa-store-lg{\n  display:block; font-family:var(--display); font-weight:400;\n  font-size:20px; line-height:1.1;\n}\n\n@media (max-width:900px){ .wa-grid{ grid-template-columns:1fr; gap:30px } }\n@media (max-width:560px){ .wa-list{ grid-template-columns:1fr } .wa-list li:nth-child(odd){ padding-right:0 } }",
  "sustain": "#wpfw-sustain{ font-family:var(--body); color:var(--fg) }\n#wpfw-sustain *,#wpfw-sustain *::before,#wpfw-sustain *::after{ box-sizing:border-box }\n\n.ws-panel{\n  background:var(--surface-2); border:1px solid var(--rule);\n  border-left:3px solid var(--red);\n  padding:38px;\n  display:grid; grid-template-columns:1.1fr .9fr; gap:44px;\n  align-items:center;\n}\n.ws-say h2{\n  font-family:var(--display); font-weight:400;\n  font-size:clamp(26px,3.6vw,36px); line-height:1.12;\n  margin:0 0 16px; text-wrap:balance; color:var(--fg);\n}\n.ws-say p{ color:var(--fg-dim); margin:0 0 8px; max-width:48ch }\n.ws-fine{ font-size:13px; color:var(--fg-mute) !important; margin-top:16px !important }\n\n.ws-amounts{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:20px }\n.ws-amt{\n  flex:1 1 84px; background:transparent; color:var(--fg);\n  border:1px solid var(--rule); padding:14px 10px; cursor:pointer;\n  font-family:var(--mono); font-size:15px; line-height:1.2;\n  transition:border-color .15s ease, background .15s ease;\n}\n.ws-amt small{\n  display:block; font-size:9.5px; letter-spacing:.12em;\n  color:var(--fg-mute); margin-top:4px;\n}\n.ws-amt:hover{ border-color:var(--fg-mute) }\n.ws-amt[aria-pressed=\"true\"]{ border-color:var(--red); background:rgba(200,18,16,.13) }\n.ws-amt[aria-pressed=\"true\"] small{ color:var(--red-lift) }\n\n.ws-give{\n  display:block; text-align:center; text-decoration:none;\n  background:var(--red); color:#fff;\n  font-family:var(--mono); font-size:11.5px; letter-spacing:.12em;\n  text-transform:uppercase; padding:15px 22px;\n  transition:background .15s ease;\n}\n.ws-give:hover{ background:var(--red-lift); color:#fff }\n\n.ws-alt{ font-size:12.5px; color:var(--fg-mute); margin:14px 0 0; text-align:center }\n.ws-alt a{ color:var(--fg-dim) }\n\n@media (max-width:900px){ .ws-panel{ grid-template-columns:1fr; gap:32px } }\n@media (max-width:560px){ .ws-panel{ padding:26px 22px } }"
};
  var MARKUP = {
  "hero": "<header id=\"wpfw-hero\">\n  <canvas id=\"wh-wave\" aria-hidden=\"true\"></canvas>\n\n  <div class=\"wh-in\">\n\n    <div class=\"wh-lockup\">\n      <div class=\"wh-kicker\">Washington, DC &middot; Since 1977</div>\n      <h1>\n        <span class=\"wh-l1\">WPFW</span>\n        <span class=\"wh-l2\">Jazz and Justice</span>\n        <span class=\"wh-l3\">89.3</span>\n      </h1>\n      <p>Where music and message share a microphone. Forty-nine years of community radio, run by the people who listen to it.</p>\n    </div>\n\n    \n    <div class=\"wh-card\" id=\"wh-card\">\n      <div class=\"wh-card-head\">\n        <span class=\"wh-dot\">On air now</span>\n        <span class=\"wh-elapsed\" id=\"wh-elapsed\"></span>\n      </div>\n\n      <div class=\"wh-body\">\n        <div class=\"wh-art\" id=\"wh-art\">\n          <span class=\"wh-mark\"><b>WPFW</b><i>89.3</i></span>\n        </div>\n        <div class=\"wh-id\">\n          <h2 id=\"wh-show\">89.3 FM</h2>\n          <p class=\"wh-dj\" id=\"wh-dj\"></p>\n          <p class=\"wh-desc\" id=\"wh-desc\">Jazz and Justice radio, live from Washington, DC.</p>\n        </div>\n        <button class=\"wh-play\" id=\"wh-play\" type=\"button\" aria-label=\"Listen live\">&#9654;</button>\n      </div>\n\n      \n      <p class=\"wh-track\" id=\"wh-track\" hidden></p>\n\n      <div class=\"wh-prog\"><i id=\"wh-bar\"></i></div>\n      <div class=\"wh-times\"><span id=\"wh-start\"></span><span id=\"wh-end\"></span></div>\n\n      <div class=\"wh-next\" id=\"wh-next\" hidden>\n        <span class=\"wh-next-lbl\">Up next</span>\n        <span id=\"wh-next-txt\"></span>\n      </div>\n    </div>\n\n  </div>\n</header>",
  "vote": "<div id=\"wpfw-vote\" hidden>\n  <div class=\"wv-grid\">\n\n    <div class=\"wv-say\">\n      <p class=\"wv-lede\">WPFW's board is elected by the people who pay for it. That is the whole\n        arrangement, and it only works if they vote.</p>\n      <p class=\"wv-quorum\" id=\"wv-quorum\"></p>\n    </div>\n\n    <div class=\"wv-do\">\n      <a class=\"wv-btn\" href=\"https://elections.pacifica.org/emails-your-voting-link-place/\">Find my ballot</a>\n      <a class=\"wv-btn ghost\" href=\"https://elections.pacifica.org/2026-candidates/\">See the candidates</a>\n      <a class=\"wv-btn ghost\" href=\"https://elections.pacifica.org/membership-eligibility/\">Can I vote?</a>\n      <p class=\"wv-fine\">Look for <b>&ldquo;Vote Now: Pacifica Foundation&rdquo;</b> from\n        invitations@mail.electionbuddy.com. If it is not there, write to\n        <a href=\"mailto:pacifica@electionbuddy.com\">pacifica@electionbuddy.com</a> and they will resend it.</p>\n    </div>\n\n  </div>\n</div>",
  "missed": "<div id=\"wpfw-missed\" hidden>\n  <div class=\"wm-rail\" id=\"wm-rail\"></div>\n  <div class=\"wm-foot\">\n    <a class=\"wm-link\" id=\"wm-more\" href=\"/archive\">Browse the full on-demand archive &rarr;</a>\n  </div>\n  <audio id=\"wm-audio\" preload=\"none\"></audio>\n</div>",
  "signup": "<section id=\"wpfw-signup\">\n  <div class=\"wn-in\">\n\n    <div class=\"wn-say\">\n      <h2>The station in your inbox.</h2>\n      <p>What&rsquo;s coming up on 89.3, who to listen for, the Music and Movement Moment, and what&rsquo;s happening around the District.</p>\n    </div>\n\n    <div id=\"wn-slot\">\n      <div class=\"ctct-inline-form\" data-form-id=\"ecfbf897-b807-4ef1-9252-967493a5e229\"></div>\n    </div>\n\n  </div>\n</section>",
  "events": "<div id=\"wpfw-se\" hidden>\n  <div class=\"wpfw-se-grid\">\n\n    \n    <article class=\"wpfw-se-feature\" id=\"wpfw-se-feature\"></article>\n\n    \n    <div class=\"wpfw-se-panel\" id=\"wpfw-se-panel\"></div>\n\n  </div>\n</div>",
  "news": "<section id=\"wpfw-news\" hidden>\n  <div class=\"wn-grid\" id=\"wn-grid\"></div>\n  <div class=\"wn-foot\"><a class=\"wn-link\" href=\"/news\">All news &rarr;</a></div>\n</section>",
  "people": "<section id=\"wpfw-people\" hidden>\n  <div class=\"wp-faces\" id=\"wp-faces\"></div>\n\n  <div class=\"wp-facts\">\n    <div class=\"wp-fact\">\n      <div class=\"wp-n\">120+</div>\n      <div class=\"wp-t\"><b>Volunteer programmers</b>Building a show a week.</div>\n    </div>\n    <div class=\"wp-fact\">\n      <div class=\"wp-n\">49</div>\n      <div class=\"wp-t\"><b>Years on air</b>Since February 28, 1977.</div>\n    </div>\n    <div class=\"wp-fact\">\n      <div class=\"wp-n\">24</div>\n      <div class=\"wp-t\"><b>Hours a day</b>Including 3 a.m.</div>\n    </div>\n  </div>\n\n  <div class=\"wp-foot\">\n    <button class=\"wp-link\" id=\"wp-again\" type=\"button\">Tune to a few more &rarr;</button>\n    <div class=\"wp-right\">\n      <a class=\"wp-link\" href=\"/programmers\">Every programmer &rarr;</a>\n      <a class=\"wp-link\" href=\"/volunteer\">Volunteer &rarr;</a>\n    </div>\n  </div>\n</section>",
  "app": "<div id=\"wpfw-app\">\n  <div class=\"wa-grid\">\n\n    <div class=\"wa-say\">\n      <p class=\"wa-lede\">The free WPFW app puts the live signal in your pocket, wherever the FM dial does not reach.</p>\n      <ul class=\"wa-list\">\n        <li>Live stream, always on</li>\n        <li>Shows on demand</li>\n        <li>Today&rsquo;s playlists</li>\n        <li>Give in a few taps</li>\n      </ul>\n    </div>\n\n    <div class=\"wa-stores\">\n      <a class=\"wa-store\" href=\"https://apps.apple.com/us/app/wpfw-radio/id6749693298\">\n        <span class=\"wa-store-sm\">Download on the</span>\n        <span class=\"wa-store-lg\">App Store</span>\n      </a>\n      <a class=\"wa-store\" href=\"https://play.google.com/store/apps/details?id=app.pacifica.wpfw\">\n        <span class=\"wa-store-sm\">Get it on</span>\n        <span class=\"wa-store-lg\">Google Play</span>\n      </a>\n    </div>\n\n  </div>\n</div>",
  "sustain": "<div id=\"wpfw-sustain\">\n  <div class=\"ws-panel\">\n\n    <div class=\"ws-say\">\n      <h2>Give monthly. Shorten the drives.</h2>\n      <p>Listener gifts are what keep this station on the air. The more of them that arrive every month, the less often we have to stop the music and ask.</p>\n      <p class=\"ws-fine\">$25 a month is $300 a year &mdash; and it arrives whether or not there is a drive on the air. Cancel or change any time. Call 202&#8209;588&#8209;0999.</p>\n    </div>\n\n    <div class=\"ws-do\">\n      <div class=\"ws-amounts\" role=\"group\" aria-label=\"Monthly amount\">\n        <button class=\"ws-amt\" type=\"button\" data-cents=\"1000\" aria-pressed=\"false\">$10<small>a month</small></button>\n        <button class=\"ws-amt\" type=\"button\" data-cents=\"2500\" aria-pressed=\"true\">$25<small>a month</small></button>\n        <button class=\"ws-amt\" type=\"button\" data-cents=\"5000\" aria-pressed=\"false\">$50<small>a month</small></button>\n        <button class=\"ws-amt\" type=\"button\" data-cents=\"other\" aria-pressed=\"false\">Other<small>you pick</small></button>\n      </div>\n\n      <a class=\"ws-give\" id=\"ws-give\" href=\"https://pledge.wpfwfm.org/index.php\">Give $25 a month</a>\n\n      <p class=\"ws-alt\">\n        <a href=\"https://pledge.wpfwfm.org/index.php\">One-time gift</a> &nbsp;&middot;&nbsp;\n        <a href=\"/ways-to-give\">Wills, IRA &amp; donor advised funds</a>\n      </p>\n    </div>\n\n  </div>\n</div>"
};
  var BANDS  = [
  {
    "key": "hero",
    "ground": "night",
    "stamp": null,
    "title": null
  },
  {
    "key": "vote",
    "ground": "alert",
    "stamp": [
      "Voting is open",
      "Pacifica election"
    ],
    "title": "The ballot is already in your inbox."
  },
  {
    "key": "missed",
    "ground": "paper",
    "stamp": [
      "Recently",
      "Archive"
    ],
    "title": "Missed it? It&rsquo;s still up."
  },
  {
    "key": "signup",
    "ground": "paper2",
    "stamp": null,
    "title": null
  },
  {
    "key": "events",
    "ground": "night",
    "stamp": [
      "This week",
      "Community"
    ],
    "title": "Come be in the room."
  },
  {
    "key": "news",
    "ground": "paper",
    "stamp": [
      "Lately",
      "News"
    ],
    "title": "What the station is saying."
  },
  {
    "key": "people",
    "ground": "night",
    "stamp": [
      "Any hour",
      "Programmers"
    ],
    "title": "Neighbors who know their music and movements."
  },
  {
    "key": "app",
    "ground": "paper",
    "stamp": [
      "Anywhere",
      "Mobile"
    ],
    "title": "Take 89.3 with you."
  },
  {
    "key": "sustain",
    "ground": "night",
    "stamp": [
      "What happens next",
      "Sustain"
    ],
    "title": null
  }
];

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
    /* Only links that carry no class of their own. This reset exists to
       stop Squarespace colouring bare links inside a band, and at
       `.wh-band a` it was specificity 0,1,1 -- which beat every block's
       own button rule at 0,1,0 and handed them `inherit`. That put bone
       text on the bone "Find my ballot" button, and near-black on the
       red Details button. A classed anchor is something a block has
       already decided about; leave it alone. */
    ".wh-band a:not([class]){ color:inherit }",
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

  function boot_hero() {
(function () {
  'use strict';
  if (window.__wpfwHeroInit) return;
  window.__wpfwHeroInit = true;

  /* ===================== CONFIG ===================== */
  var FEED       = 'https://confessor.wpfwfm.org/playlist/get_current.php';
  var PIX        = 'https://confessor.wpfwfm.org/pix/';
  var REFRESH_MS = 20000;
  var TZ         = 'America/New_York';
  /* Port 9000 is required -- without it the connection silently never
     completes. Same mounts, same order, as the sticky bar. */
  var STREAMS = [
    'https://streams.pacifica.org:9000/wpfw_128',
    'https://streams.pacifica.org:9000/wpfw',
    'https://streams.pacifica.org:9000/wpfw_64'
  ];
  /* ================================================== */

  var $ = function (id) { return document.getElementById(id); };
  var card = $('wh-card'); if (!card) return;

  var PLAY = '▶', PAUSE = '❚❚';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  /* The feed HTML-escapes its own text -- sh_djname arrives as
     "DJ Zee-Lion &amp; Kim Bey" -- so it is decoded once here and
     escaped again on the way into the DOM. */
  function decode(s) {
    var t = document.createElement('textarea');
    t.innerHTML = String(s == null ? '' : s);
    return t.value;
  }
  function clean(s) { return decode(s).replace(/\s+/g, ' ').trim(); }

  /* ---------- the stream ---------- */

  var audio = new Audio();
  audio.preload = 'none';
  var btn = $('wh-play'), attempt = 0;

  function paint(state) {
    if (!btn) return;
    btn.classList.toggle('is-playing', state === 'playing');
    btn.classList.toggle('is-loading', state === 'loading');
    btn.textContent = state === 'playing' ? PAUSE : PLAY;
    btn.setAttribute('aria-label',
      state === 'playing' ? 'Pause the live stream' :
      state === 'loading' ? 'Connecting' : 'Listen live');
  }
  function tryStream(i) {
    if (i >= STREAMS.length) { paint('idle'); return; }
    attempt = i;
    audio.src = STREAMS[i];
    paint('loading');
    var p = audio.play();
    if (p && typeof p.catch === 'function') p.catch(function () { tryStream(i + 1); });
  }
  if (btn) {
    btn.addEventListener('click', function () {
      if (!audio.paused) { audio.pause(); return; }
      tryStream(0);
    });
  }
  audio.addEventListener('playing', function () { paint('playing'); });
  audio.addEventListener('pause',   function () { paint('idle'); });
  /* A mount that dies mid-listen falls through to the next one. */
  audio.addEventListener('error',   function () { tryStream(attempt + 1); });
  paint('idle');

  /* ---------- the clock ---------- */

  /* Seconds since midnight in the station's own timezone, whatever the
     visitor's clock says. */
  function secondsIntoDay() {
    var now = new Date();
    var h = Number(now.toLocaleString('en-US', { timeZone: TZ, hour: 'numeric', hour12: false }));
    var m = Number(now.toLocaleString('en-US', { timeZone: TZ, minute: 'numeric' }));
    var s = Number(now.toLocaleString('en-US', { timeZone: TZ, second: 'numeric' }));
    return (h % 24) * 3600 + m * 60 + s;
  }

  var slot = null;   /* { start, len } in seconds, from the last feed read */

  function tickProgress() {
    var bar = $('wh-bar'), el = $('wh-elapsed');
    if (!slot || !slot.len) { if (bar) bar.style.width = '0'; return; }
    var into = secondsIntoDay() - slot.start;
    /* A show that began before midnight and is still running reads as a
       large negative here, so wrap it forward a day. */
    if (into < 0) into += 86400;
    var frac = Math.max(0, Math.min(1, into / slot.len));
    if (bar) bar.style.width = (frac * 100).toFixed(2) + '%';
    if (el) {
      var mins = Math.floor(into / 60);
      el.textContent = (into < 0 || into > slot.len) ? ''
        : mins < 1 ? 'just started'
        : mins < 60 ? mins + ' min in'
        : Math.floor(mins / 60) + ' hr ' + (mins % 60) + ' min in';
    }
  }

  /* ---------- render ---------- */

  function render(cur, nxt) {
    if (cur.sh_name) $('wh-show').textContent = clean(cur.sh_name);
    $('wh-dj').textContent   = clean(cur.sh_djname);
    $('wh-desc').textContent = clean(cur.sh_desc);

    /* sh_photo is a full URL on the current show and a bare filename on
       the next one, so both shapes are accepted. */
    var art = $('wh-art');
    var src = clean(cur.sh_photo);
    if (src && !/^https?:/i.test(src)) src = PIX + src;
    /* pix/WPFW.png is the feed's own "no artwork" answer -- the station
       mark already sits in the markup, so there is nothing to swap in. */
    if (src && !/\/WPFW\.png$/i.test(src)) {
      var img = new Image();
      img.onload = function () { art.innerHTML = ''; art.appendChild(img); };
      img.alt = '';
      img.src = src;
    }

    var track = $('wh-track');
    var song = clean(cur.pl_song), artist = clean(cur.pl_artist);
    if (song) {
      track.innerHTML = '<span>Now playing</span> <b>' + esc(song) + '</b>' +
                        (artist ? ' &middot; ' + esc(artist) : '');
      track.hidden = false;
    } else {
      track.hidden = true;
    }

    $('wh-start').textContent = clean(cur.cur_start);
    $('wh-end').textContent   = clean(cur.cur_end);

    slot = { start: Number(cur.sh_shour) || 0, len: Number(cur.sh_len) || 0 };
    tickProgress();

    var next = $('wh-next');
    if (nxt && nxt.sh_name) {
      $('wh-next-txt').innerHTML =
        '<b>' + esc(clean(nxt.nxt_start)) + '</b> &nbsp;' + esc(clean(nxt.sh_name)) +
        (nxt.sh_djname ? ' <em>with ' + esc(clean(nxt.sh_djname)) + '</em>' : '');
      next.hidden = false;
    } else {
      next.hidden = true;
    }
  }

  function load() {
    if (typeof window.fetch !== 'function') return;
    fetch(FEED, { credentials: 'omit', cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (rows) {
        var cur = null, nxt = null;
        for (var i = 0; i < rows.length; i++) {
          if (rows[i].current) cur = rows[i].current;
          if (rows[i].next)    nxt = rows[i].next;
        }
        if (cur) render(cur, nxt);
      })
      .catch(function () { /* keep whatever is on screen */ });
  }

  load();
  setInterval(load, REFRESH_MS);
  setInterval(tickProgress, 15000);

  /* ---------- the waveform ---------- */

  var cv = $('wh-wave'); if (!cv) return;
  var ctx = cv.getContext('2d');
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var w = 0, h = 0, t = 0;

  function size() {
    var r = cv.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    cv.width  = Math.max(1, Math.round(w * dpr));
    cv.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    var mid = h * 0.52;
    for (var k = 0; k < 7; k++) {
      ctx.beginPath();
      var amp = (h * 0.055) * (1 + k * 0.52);
      var freq = 0.0042 + k * 0.0011;
      var phase = t * (0.9 + k * 0.16) + k * 1.05;
      for (var x = 0; x <= w; x += 4) {
        var env = Math.sin((x / Math.max(w, 1)) * Math.PI);
        var y = mid + Math.sin(x * freq + phase) * amp * env;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(200,18,16,' + (0.30 - k * 0.028).toFixed(3) + ')';
      ctx.lineWidth = 1.15;
      ctx.stroke();
    }
  }
  function frame() { t += 0.012; draw(); requestAnimationFrame(frame); }

  size(); draw();
  if (!still) requestAnimationFrame(frame);
  window.addEventListener('resize', function () { size(); draw(); });
})();
  }

  function boot_vote() {
(function () {
  'use strict';
  if (window.__wpfwVoteInit) return;
  window.__wpfwVoteInit = true;

  /* ===================== CONFIG ===================== */
  /* 2026-09-30 23:59 Pacific. Written as an absolute offset so it does not
     depend on the visitor's clock being in any particular zone. PDT is
     UTC-7 on that date. */
  var CLOSES = new Date('2026-09-30T23:59:00-07:00').getTime();
  /* Article 3 § 7 allows the election to run a further 24 hours if quorum
     is short, so the band stays up that long rather than vanishing while
     voting is still open. */
  var GRACE_MS = 24 * 60 * 60 * 1000;
  /* The last figure the election office published, and when. Both appear
     in the copy: an undated statistic is not evidence. */
  var QUORUM_ASOF = 'September 11';
  /* ================================================== */

  var root = document.getElementById('wpfw-vote');
  if (!root) return;

  var now = Date.now();

  /* Past the extension: take the whole band down. Nobody remembers to
     delete an election notice, and a dead one is worse than none. */
  if (now > CLOSES + GRACE_MS) { root.remove(); return; }

  var q = document.getElementById('wv-quorum');
  if (q) {
    /* Plain words. "Quorum", "the bylaws require" and "for want of votes"
       are the election office's language, not a listener's, and the point
       here is only that too few people have voted for it to count. */
    q.innerHTML = 'Voting closes <b>September 30 at 11:59 PM Pacific</b>. ' +
      'If not enough people vote, the election does not count at all &mdash; and as of ' +
      QUORUM_ASOF + ', only about <b>a tenth</b> of the votes needed had come in.';
  }

  root.hidden = false;

  /* The eyebrow counts down. The bundle writes the stamp, so the band
     hands it the right words rather than the stamp guessing. */
  root.setAttribute('data-stamp-left', (function () {
    if (now > CLOSES) return 'Final hours';
    /* Counted in calendar days in Pacific time, not in elapsed hours.
       On the 29th, a deadline late on the 30th is "tomorrow" to a reader
       even though it is nearly two full days away, and "2 days left"
       against a ballot closing tomorrow night reads as slack. */
    var PT = { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' };
    var dayOf = function (ms) { return new Date(ms).toLocaleDateString('en-CA', PT); };
    var today = dayOf(now), close = dayOf(CLOSES);
    if (today === close) return 'Closes tonight';
    var oneDay = dayOf(now + 86400000);
    if (oneDay === close) return 'Closes tomorrow';
    return Math.ceil((CLOSES - now) / 86400000) + ' days left';
  })());
})();
  }

  function boot_missed() {
(function () {
  'use strict';

  if (window.__wpfwMissedInit) return;   /* Squarespace re-runs blocks */
  window.__wpfwMissedInit = true;

  /* ===================== CONFIG ===================== */
  var DATA_URL   = 'https://wpfwgm.github.io/wpfw-archive-data/archive.json';
  var LIMIT      = 6;
  var ARCHIVE    = '/archive';
  /* The archive embed reads this off the hash on load and opens that
     episode's sheet. Same dialog the archive itself uses -- songs,
     download rules, tag filtering, the rest of the programme's episodes
     -- rather than a second one built here that would drift from it. */
  var EP_LINK    = function (id) { return ARCHIVE + '#wpfw-ep=' + encodeURIComponent(id); };
  var EXCERPT    = 165;      /* characters, trimmed to a sentence or word */
  var MAX_TAGS   = 2;
  var SHOW_ART   = false;    /* true = programme logo instead of play button */
  var TIMEOUT_MS = 12000;
  var TZ         = 'America/New_York';
  /* ================================================== */

  var root  = document.getElementById('wpfw-missed');
  var rail  = document.getElementById('wm-rail');
  var audio = document.getElementById('wm-audio');
  if (!root || !rail || !audio) return;

  var PLAY = '▶', PAUSE = '❚❚';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* The write-ups carry light markdown -- *Don't Forget the Blues* -- which
     is meant for a page that renders it. Here it would print the asterisks. */
  function plain(s) {
    return String(s == null ? '' : s)
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/_([^_]+)_/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* Cards sit in a grid, so every excerpt wants to be about the same length
     or the play buttons stop lining up. Cut at the last sentence that fits,
     and failing that the last whole word. */
  function shorten(text, max) {
    var s = plain(text);
    if (s.length <= max) return s;
    var head = s.slice(0, max + 1);
    var stop = Math.max(head.lastIndexOf('. '), head.lastIndexOf('? '), head.lastIndexOf('! '));
    if (stop > max * 0.55) return s.slice(0, stop + 1);
    var sp = head.lastIndexOf(' ');
    return s.slice(0, sp > 0 ? sp : max).replace(/[,;:—-]+$/, '') + '…';
  }

  /* "Jazz and Justice - Bobby Rox" beside a host line reading "Bobby Rox"
     says his name twice. The suffix goes when it is the host. */
  function programName(row, host) {
    var t = String(row.t || '').trim();
    if (!host) return t;
    var m = /^(.*?)\s+[-–—]\s+(.+)$/.exec(t);
    if (m && m[2].toLowerCase() === String(host).toLowerCase()) return m[1];
    return t;
  }

  function when(row) {
    var d = new Date(row.d * 1000);
    if (isNaN(d.getTime())) return '';
    var time = d.toLocaleTimeString('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' });
    var day  = d.toLocaleDateString('en-US', { timeZone: TZ, weekday: 'short' });
    var todayStr = new Date().toLocaleDateString('en-US', { timeZone: TZ });
    var rowStr   = d.toLocaleDateString('en-US', { timeZone: TZ });
    /* Today needs no day name. Anything older says which day, because the
       transcription queue can run a few hours behind the air. */
    return rowStr === todayStr ? time : day + ' ' + time;
  }

  /* ---------- one shared player ---------- */

  var current = null;   /* the button that owns the audio element */

  function reset(btn) {
    if (!btn) return;
    btn.classList.remove('is-playing', 'is-loading');
    btn.textContent = PLAY;
    btn.setAttribute('aria-label', btn.getAttribute('data-label-play'));
  }

  function toggle(btn, src) {
    if (current === btn && !audio.paused) { audio.pause(); return; }
    if (current !== btn) {
      reset(current);
      current = btn;
      audio.src = src;
    }
    btn.classList.add('is-loading');
    var p = audio.play();
    if (p && typeof p.catch === 'function') {
      /* A browser that refuses, or an MP3 that has rotated off the archive
         since the snapshot was built: hand the visitor the file rather than
         leave a button that does nothing. */
      p.catch(function () { reset(btn); window.open(src, '_blank', 'noopener'); });
    }
  }

  audio.addEventListener('playing', function () {
    if (!current) return;
    current.classList.remove('is-loading');
    current.classList.add('is-playing');
    current.textContent = PAUSE;
    current.setAttribute('aria-label', current.getAttribute('data-label-pause'));
  });
  audio.addEventListener('pause', function () { reset(current); });
  audio.addEventListener('ended', function () { reset(current); current = null; });
  audio.addEventListener('error', function () { reset(current); });

  /* ---------- render ---------- */

  function card(row, info) {
    var host = (info && info.host) || '';
    var prog = programName(row, host);
    var body = shorten(row.desc, EXCERPT);
    var tags = (row.tags || []).slice(0, MAX_TAGS).map(function (t) {
      return '<span class="wm-tag">' + esc(t) + '</span>';
    }).join('');

    var labelPlay  = 'Play ' + prog + (host ? ' with ' + host : '') + ', ' + when(row);
    var labelPause = 'Pause ' + prog;

    var lead;
    if (SHOW_ART && info && info.img) {
      lead = '<span class="wm-art" style="background:' + esc(info.imgBg || '#fff') + '">' +
               '<img src="' + esc(info.img) + '" alt="" loading="lazy" ' +
               'style="object-fit:' + (info.imgFit === 'cover' ? 'cover' : 'contain') + '">' +
             '</span>';
    } else {
      lead = '<button class="wm-play" type="button" data-src="' + esc(row.mp3) + '" ' +
             'data-label-play="' + esc(labelPlay) + '" data-label-pause="' + esc(labelPause) + '" ' +
             'aria-label="' + esc(labelPlay) + '">' + PLAY + '</button>';
    }

    return '<article class="wm-card">' +
      '<div class="wm-top">' +
        lead +
        '<div class="wm-id">' +
          '<h3><a class="wm-cardlink" href="' + esc(EP_LINK(row.id)) + '">' +
            esc(prog) + '</a></h3>' +
          (host ? '<p class="wm-host">' + esc(host) + '</p>' : '') +
        '</div>' +
        '<time class="wm-time" datetime="' + new Date(row.d * 1000).toISOString() + '">' +
          esc(when(row)) + '</time>' +
      '</div>' +
      '<p class="wm-excerpt">' + esc(body) + '</p>' +
      (tags ? '<div class="wm-tags">' + tags + '</div>' : '') +
    '</article>';
  }

  function render(feed) {
    var rows = (feed && feed.shows) || [];
    var info = (feed && feed.programInfo) || {};

    var ready = rows.filter(function (r) {
      /* An approved write-up, and audio that is still on the archive.
         Twenty rows in the snapshot have days:0 -- listed, but the MP3 has
         rotated off, so the play button would 404. */
      return r.desc && String(r.desc).trim() && r.mp3 && Number(r.days) > 0;
    });

    ready.sort(function (a, b) { return b.d - a.d; });
    ready = ready.slice(0, LIMIT);

    if (!ready.length) { root.remove(); return; }

    rail.innerHTML = ready.map(function (r) { return card(r, info[r.sho]); }).join('');

    rail.addEventListener('click', function (ev) {
      var btn = ev.target.closest ? ev.target.closest('.wm-play') : null;
      /* Sitting above the stretched link, so this never navigates. */
      if (btn) { ev.preventDefault(); toggle(btn, btn.getAttribute('data-src')); }
    });

    var more = document.getElementById('wm-more');
    if (more) more.setAttribute('href', ARCHIVE);

    root.hidden = false;
  }

  /* ---------- load ---------- */

  if (typeof window.fetch !== 'function') { root.remove(); return; }

  var ctrl  = (typeof AbortController === 'function') ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, TIMEOUT_MS);
  var opts  = { credentials: 'omit', cache: 'no-cache' };
  if (ctrl) opts.signal = ctrl.signal;

  fetch(DATA_URL, opts)
    .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
    .then(function (feed) {
      clearTimeout(timer);
      if (!feed || !feed.shows) throw new Error('unusable snapshot');
      render(feed);
    })
    .catch(function () {
      clearTimeout(timer);
      /* Better an absent band than a headline over an apology. */
      root.remove();
    });
})();
  }

  function boot_signup() {
(function () {
  'use strict';
  if (window.__wpfwSignupInit) return;
  window.__wpfwSignupInit = true;

  var slot = document.getElementById('wn-slot');
  if (!slot) return;

  /* The widget is already on wpfwdc.org site-wide and scans the document
     once on load, which covers this block. This is only the safety net
     for a page that does not carry it -- and it deliberately does nothing
     if a loader is already present, because a second copy can render the
     form twice. */
  setTimeout(function () {
    var host = slot.querySelector('.ctct-inline-form');
    if (!host || host.children.length) return;          /* rendered fine */
    if (document.getElementById('signupScript')) return; /* loader present */

    window._ctct_m = window._ctct_m || '13098e84c4b7f5f46a0c44e714b54ace';
    var sc = document.createElement('script');
    sc.id = 'signupScript';
    sc.async = true; sc.defer = true;
    sc.src = 'https://static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js';
    document.body.appendChild(sc);
  }, 3000);
})();
  }

  function boot_events() {
(function () {
  'use strict';

  /* Squarespace re-runs a code block on soft navigation. */
  if (window.__wpfwHomeEventsInit) return;
  window.__wpfwHomeEventsInit = true;

  /* ===================== CONFIG ===================== */
  var FEED          = 'https://wpfwgm.github.io/wpfw-calendar-feed/events.json';
  var CALENDAR_PATH = '/social-justice-calendar';
  var SUBMIT_PATH   = '/social-justice-calendar#submit';
  var EVENTS_PATH   = '/station-events';
  var LIST_LIMIT    = 4;          /* rows beside the feature */
  var TIMEOUT_MS    = 12000;
  var TZ            = 'America/New_York';
  /* ================================================== */

  var root    = document.getElementById('wpfw-se');
  var featEl  = document.getElementById('wpfw-se-feature');
  var panelEl = document.getElementById('wpfw-se-panel');
  if (!root || !featEl || !panelEl) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* start_datetime is an empty string on at least one live entry, so every
     date helper has to answer for "no date" rather than print Invalid Date. */
  function toDate(iso) {
    if (!iso) return null;
    var x = new Date(iso);
    return isNaN(x.getTime()) ? null : x;
  }
  function fmt(iso, opts) {
    var x = toDate(iso); if (!x) return '';
    var o = { timeZone: TZ }; for (var k in opts) o[k] = opts[k];
    return x.toLocaleDateString('en-US', o);
  }
  function timeOf(iso) {
    var x = toDate(iso); if (!x) return '';
    return x.toLocaleTimeString('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' })
            .replace(':00', '').replace(' AM', ' a.m.').replace(' PM', ' p.m.');
  }
  /* "Sunday, September 27 · in 2 days" — the countdown is the part that makes
     somebody act, so it is computed rather than typed into the page. */
  function whenLine(e) {
    var x = toDate(e.start_datetime);
    if (!x) return 'Date to come';
    /* The year is noise on something happening this week and essential on
       something eighteen months out, so it appears only when the event
       falls outside the current year. */
    var thisYear = fmt(new Date().toISOString(), { year: 'numeric' });
    var evYear   = fmt(e.start_datetime, { year: 'numeric' });
    var shape    = { weekday: 'long', month: 'long', day: 'numeric' };
    if (evYear !== thisYear) shape.year = 'numeric';
    var label = fmt(e.start_datetime, shape);
    var today = new Date(new Date().toLocaleString('en-US', { timeZone: TZ }));
    var that  = new Date(x.toLocaleString('en-US', { timeZone: TZ }));
    today.setHours(0, 0, 0, 0); that.setHours(0, 0, 0, 0);
    var days = Math.round((that - today) / 86400000);
    if (days === 0) return label + ' · today';
    if (days === 1) return label + ' · tomorrow';
    if (days > 1 && days < 14) return label + ' · in ' + days + ' days';
    return label;
  }
  /* The sheet signals a change of plan by prefixing the title and the short
     description -- "POSTPONED: Jazz and Justice Festival". Printed raw that
     shouts the word twice and buries it inside an <h3>, so it is lifted out
     into a chip and stripped from the text it was stuck to. */
  var STATUSES = 'POSTPONED|CANCELLED|CANCELED|RESCHEDULED|SOLD OUT';

  /* Detecting and removing are not the same pattern, and conflating them
     ate a word: full_description opens "POSTPONED FOR RAIN." with no colon,
     so a blind strip left the notice reading "FOR RAIN. The festival...".
     Only the labelled "PREFIX:" form is a label; anything else is a
     sentence the station wrote and gets left alone. */
  var STATUS_RE = new RegExp('^\\s*(' + STATUSES + ')\\b', 'i');
  var STRIP_RE  = new RegExp('^\\s*(?:' + STATUSES + ')\\s*:\\s*', 'i');

  function statusOf(e) {
    var m = STATUS_RE.exec(String(e.title || ''));
    return m ? m[1].toUpperCase() : '';
  }
  function strip(text) {
    return String(text == null ? '' : text).replace(STRIP_RE, '');
  }

  /* A postponed event's first paragraph is the notice -- why, and what
     happens next. That is the only thing a reader wants, so it replaces the
     standing blurb until the event is scheduled again. */
  function blurbOf(e) {
    if (statusOf(e)) {
      var first = String(e.full_description || '').split(/\n\s*\n/)[0];
      if (first && first.trim()) return strip(first).trim();
    }
    return strip(e.short_description);
  }

  function place(e) {
    var bits = [];
    if (e.venue_name) bits.push(e.venue_name);
    var town = [e.city, e.state].filter(Boolean).join(', ');
    if (town) bits.push(town);
    if (!bits.length && e.online_url) return 'Online';
    return bits.join(' · ');
  }
  function costOf(e) {
    if (e.cost_type === 'free') return 'Free';
    var amt = String(e.cost_amount == null ? '' : e.cost_amount).trim();
    var money = /^\d+(\.\d{1,2})?$/.test(amt) ? '$' + amt : amt;
    if (e.cost_type === 'donation') return money ? 'Suggested donation ' + money : 'Suggested donation';
    /* A paid event with no amount yet -- the Gala, whose tickets go on sale
       in November -- would otherwise drop the Cost row entirely and leave
       the card with a single line of detail. "Ticketed" says the true thing
       without inventing a price. */
    if (e.cost_type === 'paid') return money || 'Ticketed';
    return money;
  }
  /* all_day on this calendar means "the date is set, the hour is not
     announced yet" -- that is how the 50th Anniversary Gala is entered,
     and nothing else on the calendar uses the flag. So an all_day event
     gets no When row at all: the date line above already carries the
     day, and printing "All day" against a ticketed evening would be
     wrong. A genuinely all-day event still reads correctly; it just
     leans on its date rather than repeating itself. */
  function hoursOf(e) {
    if (e.all_day) return '';
    var a = timeOf(e.start_datetime), b = timeOf(e.end_datetime);
    if (a && b) return a + ' to ' + b;
    return a || '';
  }
  /* The calendar reads its own deep links as #view=list&event=<slug>.
     A bare #<slug> lands on the calendar but opens nothing. */
  function linkFor(e) {
    if (e.slug) return CALENDAR_PATH + '#view=list&event=' + encodeURIComponent(e.slug);
    return e.ticket_url || CALENDAR_PATH;
  }

  /* ---------- render ---------- */

  function renderFeature(e) {
    var img = String(e.image_url || '').trim();
    var pic = img
      ? '<img src="' + esc(img) + '" alt="" loading="lazy">'
      : '';

    var facts = '';
    var where = place(e), hours = hoursOf(e), cost = costOf(e);
    if (where) facts += '<li><b>Where</b><span>' + esc(where) + '</span></li>';
    if (hours) facts += '<li><b>When</b><span>' + esc(hours) + '</span></li>';
    if (cost)  facts += '<li><b>Cost</b><span>' + esc(cost) + '</span></li>';

    var status = statusOf(e);
    var blurb  = blurbOf(e);

    featEl.innerHTML =
      '<figure style="margin:0">' +
        '<div class="wpfw-se-img">' +
          '<div class="wpfw-se-mark"><b>WPFW</b><i>89.3</i></div>' + pic +
        '</div>' +
      '</figure>' +
      '<div class="wpfw-se-body">' +
        (status ? '<div class="wpfw-se-status">' + esc(status) + '</div>' : '') +
        '<div class="wpfw-se-when">' + esc(whenLine(e)) + '</div>' +
        '<h3>' + esc(strip(e.title)) + '</h3>' +
        (blurb ? '<p class="blurb">' + esc(blurb) + '</p>' : '') +
        (facts ? '<ul class="wpfw-se-facts">' + facts + '</ul>' : '') +
        '<div class="wpfw-se-btns">' +
          '<a class="wpfw-se-btn" href="' + esc(linkFor(e)) + '">Details</a>' +
          '<a class="wpfw-se-btn ghost" href="' + EVENTS_PATH + '">All events</a>' +
        '</div>' +
      '</div>';

    /* A picture that will not load should leave the ground showing, not a
       broken frame in the middle of the homepage. */
    var el = featEl.querySelector('img');
    if (el) el.addEventListener('error', function () { el.remove(); });
  }

  function renderList(rest) {
    var html = '';

    if (rest.length) {
      html += rest.slice(0, LIST_LIMIT).map(function (e) {
        var x = toDate(e.start_datetime);
        var day = x ? fmt(e.start_datetime, { day: 'numeric' }) : '—';
        var mon = x ? fmt(e.start_datetime, { month: 'short', year: 'numeric' }) : 'Date to come';
        var where = place(e);
        var st = statusOf(e);
        return '<a class="wpfw-se-row" href="' + esc(linkFor(e)) + '">' +
          '<div class="wpfw-se-date"><b>' + esc(day) + '</b>' + esc(mon) + '</div>' +
          '<div>' +
            (st ? '<div class="wpfw-se-status">' + esc(st) + '</div>' : '') +
            '<h4>' + esc(strip(e.title)) + '</h4>' +
            (where ? '<p class="where">' + esc(where) + '</p>' : '') +
            (e.short_description ? '<p>' + esc(strip(e.short_description)) + '</p>' : '') +
          '</div>' +
        '</a>';
      }).join('');
    } else {
      html += '<p class="wpfw-se-none">Nothing else on the books just yet. ' +
              'Anything the station puts on appears here the moment it is listed on the calendar.</p>';
    }

    html += '<div class="wpfw-se-foot">' +
              '<a class="wpfw-se-btn" href="' + CALENDAR_PATH + '">Social Justice Calendar</a>' +
              '<a class="wpfw-se-link" href="' + SUBMIT_PATH + '">Submit an event &rarr;</a>' +
            '</div>';

    panelEl.innerHTML = html;
  }

  function render(feed) {
    var all = (feed && feed.events) || [];

    var station = all.filter(function (e) { return e.station_event === true; });

    /* An event whose plans have changed leads, whatever its date. Somebody
       who was coming tomorrow needs to know it is off; a gala seven months
       out can wait a card. Sorting purely by date put the 2027 gala above a
       festival postponed that morning, which was the wrong way round.

       After that: soonest first, and an event announced but not yet
       scheduled sorts last rather than leading the band on a blank. */
    station.sort(function (a, b) {
      var sa = statusOf(a) ? 0 : 1, sb = statusOf(b) ? 0 : 1;
      if (sa !== sb) return sa - sb;
      var x = toDate(a.start_datetime), y = toDate(b.start_datetime);
      if (x && y) return x - y;
      if (x) return -1;
      if (y) return 1;
      return 0;
    });

    /* No station events means no band. Better an absent section than a
       headline over an apology. */
    if (!station.length) { root.remove(); return; }

    renderFeature(station[0]);
    renderList(station.slice(1));
    root.hidden = false;
  }

  /* ---------- load ---------- */

  if (typeof window.fetch !== 'function') { root.remove(); return; }

  var url  = FEED + (FEED.indexOf('?') < 0 ? '?' : '&') + 'v=' + Math.floor(Date.now() / 60000);
  var ctrl = (typeof AbortController === 'function') ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, TIMEOUT_MS);
  var opts = { credentials: 'omit', cache: 'default' };
  if (ctrl) opts.signal = ctrl.signal;

  fetch(url, opts)
    .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
    .then(function (feed) {
      clearTimeout(timer);
      if (!feed || !feed.ok || !feed.events) throw new Error('unusable feed');
      render(feed);
    })
    .catch(function () {
      clearTimeout(timer);
      root.remove();
    });
})();
  }

  function boot_news() {
(function () {
  'use strict';
  if (window.__wpfwNewsInit) return;
  window.__wpfwNewsInit = true;

  /* ===================== CONFIG ===================== */
  var SOURCE     = '/news?format=json';
  var LIMIT      = 4;
  var BLURB      = 130;     /* characters */
  var IMG_WIDTH  = '800w';  /* Squarespace resizes on its own CDN */
  var TIMEOUT_MS = 10000;
  var TZ         = 'America/New_York';
  /* Grounds behind a post with no image. Cycled in order, so four
     imageless posts do not render as four identical grey boxes. */
  var GROUNDS = [
    ['rgba(245,70,59,.55)',  'rgba(140,90,158,.42)'],
    ['rgba(201,151,63,.55)', 'rgba(184,104,58,.42)'],
    ['rgba(62,110,142,.55)', 'rgba(79,98,166,.42)'],
    ['rgba(200,18,16,.55)',  'rgba(110,140,67,.42)']
  ];
  /* ================================================== */

  var root = document.getElementById('wpfw-news');
  var grid = document.getElementById('wn-grid');
  if (!root || !grid) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  /* Squarespace excerpts are HTML, and the body is worse. A post with no
     excerpt falls through to body -- and at least one of yours opens with
     an inline <style> block, whose contents textContent will happily hand
     back as prose. Those elements come out before the text does. */
  function strip(html) {
    var d = document.createElement('div');
    d.innerHTML = String(html == null ? '' : html);
    var junk = d.querySelectorAll('style, script, noscript');
    for (var i = 0; i < junk.length; i++) junk[i].remove();
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
  }
  function shorten(text, max) {
    var s = strip(text);
    if (s.length <= max) return s;
    var head = s.slice(0, max + 1);
    var stop = Math.max(head.lastIndexOf('. '), head.lastIndexOf('? '), head.lastIndexOf('! '));
    if (stop > max * 0.5) return s.slice(0, stop + 1);
    var sp = head.lastIndexOf(' ');
    return s.slice(0, sp > 0 ? sp : max).replace(/[,;:—-]+$/, '') + '…';
  }
  function dateline(ms, cats) {
    var d = new Date(Number(ms));
    var when = isNaN(d.getTime()) ? ''
      : d.toLocaleDateString('en-US', { timeZone: TZ, month: 'long', day: 'numeric' });
    var tag = (cats && cats.length) ? cats[0] : '';
    return tag ? when + ' · ' + tag : when;
  }
  /* assetUrl sometimes comes back as a folder with no filename, which is
     Squarespace's way of saying the post has no usable image. */
  function imageOf(item) {
    var u = String(item.assetUrl || '').trim();
    if (!u || /\/$/.test(u)) return '';
    return u + (u.indexOf('?') < 0 ? '?' : '&') + 'format=' + IMG_WIDTH;
  }

  function card(item, i) {
    var g = GROUNDS[i % GROUNDS.length];
    var src = imageOf(item);
    var blurb = shorten(item.excerpt || item.body, BLURB);

    return '<a class="wn-card" href="' + esc(item.fullUrl || '/news') + '">' +
      '<div class="wn-thumb" style="--ph-a:' + g[0] + ';--ph-b:' + g[1] + '">' +
        (src ? '<img src="' + esc(src) + '" alt="" loading="lazy">' : '') +
      '</div>' +
      '<div class="wn-body">' +
        '<span class="wn-dt">' + esc(dateline(item.publishOn, item.categories)) + '</span>' +
        '<h3>' + esc(item.title || 'Untitled') + '</h3>' +
        (blurb ? '<p>' + esc(blurb) + '</p>' : '') +
      '</div>' +
    '</a>';
  }

  function render(items) {
    var live = items
      .filter(function (it) { return it && it.title && it.publishOn; })
      .sort(function (a, b) { return Number(b.publishOn) - Number(a.publishOn); })
      .slice(0, LIMIT);

    if (!live.length) { root.remove(); return; }

    grid.innerHTML = live.map(card).join('');
    grid.querySelectorAll('img').forEach(function (im) {
      im.addEventListener('error', function () { im.remove(); });
      if (im.complete && im.naturalWidth === 0) im.remove();
    });
    root.hidden = false;
  }

  if (typeof window.fetch !== 'function') { root.remove(); return; }

  var ctrl  = (typeof AbortController === 'function') ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, TIMEOUT_MS);
  var opts  = { credentials: 'same-origin', cache: 'no-cache' };
  if (ctrl) opts.signal = ctrl.signal;

  fetch(SOURCE, opts)
    .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
    .then(function (j) {
      clearTimeout(timer);
      if (!j || !j.items) throw new Error('no items');
      render(j.items);
    })
    .catch(function () { clearTimeout(timer); root.remove(); });
})();
  }

  function boot_people() {
(function () {
  'use strict';
  if (window.__wpfwPeopleInit) return;
  window.__wpfwPeopleInit = true;

  /* ===================== CONFIG ===================== */
  var DATA_URL   = 'https://wpfwgm.github.io/wpfw-archive-data/archive.json';
  var COUNT      = 4;
  var TIMEOUT_MS = 12000;
  /* ================================================== */

  var root  = document.getElementById('wpfw-people');
  var faces = document.getElementById('wp-faces');
  var again = document.getElementById('wp-again');
  if (!root || !faces) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function initials(name) {
    var parts = String(name || '').replace(/["'“”]/g, '').trim().split(/\s+/);
    var a = parts[0] ? parts[0][0] : '';
    var b = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (a + b).toUpperCase() || 'W';
  }
  /* "Jazz and Justice - Bobby Rox" beside a name reading "Bobby Rox"
     says it twice. Same trim as the archive rail. */
  function programName(title, host) {
    var t = String(title || '').trim();
    if (!host) return t;
    var m = /^(.*?)\s*(?:[-–—]|\s+with\s+)\s*(.+)$/i.exec(t);
    return (m && m[2].toLowerCase() === String(host).toLowerCase()) ? m[1].trim() : t;
  }

  var pool = [];

  /* Fisher-Yates on a copy. Math.random()-0.5 in a sort comparator is not
     a shuffle -- it biases toward the original order, which on a strip
     that advertises randomness would show the same four people most
     times somebody looked. */
  function pick(list, n) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a.slice(0, n);
  }

  function draw() {
    var four = pick(pool, COUNT);
    faces.innerHTML = four.map(function (p) {
      var tag = p.url ? 'a' : 'div';
      var href = p.url ? ' href="' + esc(p.url) + '"' : '';
      return '<' + tag + ' class="wp-face"' + href + '>' +
        '<div class="wp-shot">' +
          (p.img
            ? '<img src="' + esc(p.img) + '" alt="" loading="lazy" ' +
              'style="object-fit:' + (p.imgFit === 'contain' ? 'contain' : 'cover') + '">'
            : '<span class="wp-mono">' + esc(initials(p.host)) + '</span>') +
        '</div>' +
        '<h4>' + esc(p.host) + '</h4>' +
        '<p class="wp-role">' + esc(p.role) + '</p>' +
      '</' + tag + '>';
    }).join('');

    /* A portrait that will not load falls back to the monogram rather
       than leaving a hole in the row. */
    faces.querySelectorAll('img').forEach(function (im) {
      im.addEventListener('error', function () {
        var shot = im.parentNode;
        var name = shot.parentNode.querySelector('h4');
        shot.innerHTML = '<span class="wp-mono">' +
          esc(initials(name ? name.textContent : '')) + '</span>';
      });
    });
  }

  function build(feed) {
    var info = (feed && feed.programInfo) || {};

    /* feed.programs is an array of {value,label}, not a slug map -- a
       straight lookup on it yields undefined and prints "Host, " with
       nothing after it. Index it once. */
    var titleOf = {};
    (feed.programs || []).forEach(function (p) {
      if (p && p.value) titleOf[p.value] = p.label;
    });

    Object.keys(info).forEach(function (slug) {
      var p = info[slug];
      if (!p || !p.host) return;
      /* A co-hosted programme lists both names in one string. Splitting
         them would invent two people out of one field, so the pair is
         shown as it is written. */
      pool.push({
        host:   String(p.host).trim(),
        role:   titleOf[slug] ? 'Host, ' + programName(titleOf[slug], p.host)
                               : 'WPFW programmer',
        img:    p.img || '',
        imgFit: p.imgFit,
        url:    p.url || ''
      });
    });

    /* Prefer the ones with a portrait -- a row of four monograms is not
       the point of a band about faces. Fall back to the whole pool only
       if there are not enough. */
    var withArt = pool.filter(function (p) { return p.img; });
    if (withArt.length >= COUNT) pool = withArt;
    if (!pool.length) { root.remove(); return; }

    draw();
    root.hidden = false;
    if (again) again.addEventListener('click', draw);
  }

  if (typeof window.fetch !== 'function') { root.remove(); return; }

  var ctrl  = (typeof AbortController === 'function') ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, TIMEOUT_MS);
  var opts  = { credentials: 'omit', cache: 'default' };
  if (ctrl) opts.signal = ctrl.signal;

  fetch(DATA_URL, opts)
    .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
    .then(function (feed) {
      clearTimeout(timer);
      if (!feed || !feed.programInfo) throw new Error('no programInfo');
      build(feed);
    })
    .catch(function () {
      clearTimeout(timer);
      /* The numbers do not depend on the feed, so they stay. */
      faces.remove();
      if (again) again.remove();
      root.hidden = false;
    });
})();
  }

  function boot_app() {
(function () {
  'use strict';
  /* Nothing to boot. The band is static; this exists so the bundle has a
     boot function for every view and does not need a special case. */
})();
  }

  function boot_sustain() {
(function () {
  'use strict';
  if (window.__wpfwSustainInit) return;
  window.__wpfwSustainInit = true;

  /* ===================== CONFIG ===================== */
  var PLEDGE  = 'https://pledge.wpfwfm.org/index.php';
  /* Tested false -- index.php ignores pledge_amt and payhow in the query
     string. Flip to true only once the form reads them. */
  var PREFILL = false;
  /* ================================================== */

  var give = document.getElementById('ws-give');
  var btns = document.querySelectorAll('.ws-amt');
  if (!give || !btns.length) return;

  function pick(btn) {
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-pressed', 'true');

    var cents = btn.getAttribute('data-cents');
    var label = (btn.childNodes[0].nodeValue || '').trim();   /* "$25" or "Other" */

    give.textContent = cents === 'other' ? 'Choose an amount' : 'Give ' + label + ' a month';

    if (PREFILL && cents !== 'other') {
      give.href = PLEDGE + '?pledge_amt=' + encodeURIComponent(cents) + '&payhow=2';
    } else {
      give.href = PLEDGE;
    }
  }

  for (var i = 0; i < btns.length; i++) {
    (function (b) { b.addEventListener('click', function () { pick(b); }); })(btns[i]);
  }
})();
  }

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
