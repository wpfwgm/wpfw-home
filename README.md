# wpfw-home

The WPFW 89.3 homepage, served as one file.

On the Squarespace page, in a single code block:

```html
<div data-wpfw-home="page"></div>
<script src="https://wpfwgm.github.io/wpfw-home/home.js" async></script>
```

`data-wpfw-home` takes `page`, or any one band on its own: `hero`, `missed`,
`signup`, `events`, `news`, `people`. More than one may sit on the same page;
the script is only ever loaded once.

The attribute is `data-wpfw-home`, not `data-wpfw`, deliberately. The calendar
bundle claims `data-wpfw` and prints a visible error for any value it does not
recognise, so sharing the attribute would put *"this should be calendar,
submit, station or upcoming"* on the homepage.

## The bands

| Band | Ground | Reads |
|---|---|---|
| `hero` | night | `confessor.wpfwfm.org/playlist/get_current.php` |
| `missed` | paper | `wpfwgm.github.io/wpfw-archive-data/archive.json` |
| `signup` | paper, deeper | Constant Contact inline form `ecfbf897-…` |
| `events` | night | `wpfwgm.github.io/wpfw-calendar-feed/events.json` |
| `news` | paper | `/news?format=json` — same origin |
| `people` | night | `wpfwgm.github.io/wpfw-archive-data/archive.json` |

Every feed is already public and CORS-open. Nothing is proxied and no key is
held here. Audio streams straight off `archive.wpfwfm.org`, because an
`<audio>` src is not a CORS read.

`missed` and `people` read the same file, so the browser serves the second
from cache.

## Working on it

Edit the blocks in `src/`. Each one is a standalone Squarespace code block —
markup, a `<style>` and a `<script>` — and works pasted on its own. Then:

    python3 tools/build-bundle.py

which pulls the three parts out of each block and stitches them into
`home.js`. **Do not edit `home.js`.** The next build throws away anything
written straight into it.

To see it before it ships:

    python3 -m http.server 8402
    # then open http://localhost:8402/test.html

`test.html` puts the bundle inside a fixed-width column, so full bleed is
actually being exercised rather than trivially satisfied. The `news` band
will be absent there — `/news?format=json` is same-origin and does not exist
on localhost. That is the band removing itself correctly, not a fault.

## What the bundle adds that the blocks do not have

**The font link.** wpfwdc.org serves Young Serif and Bitter. It does not
serve IBM Plex Mono, which every eyebrow, time chip, tag pill and button
label is set in. Without it the page falls back to system monospace.

**The band chrome** — the eyebrow, the headline, the night or paper ground,
the section padding. The blocks render their own contents and nothing around
them.

**Full bleed.** A Squarespace code block sits inside the content column —
measured, 493px inside a 577px window — so the grounds are pulled out to the
window edges. This is done by measuring, not with `calc(50% - 50vw)`: `100vw`
counts the scrollbar, which makes every band wider than the visible page and
scrolls the whole document sideways.

**Removing a band that has nothing to say.** Each block deletes its own root
when its feed cannot be read. The bundle watches for that and takes the
section with it, so a failed feed leaves no eyebrow and headline stranded
over empty space.

## Two things it does not do

It does not touch the sticky on-air bar. That bar's own config already skips
`/` — the hero is the player on this page — so there is nothing to change.

It does not write anywhere. Every band is a reader.
