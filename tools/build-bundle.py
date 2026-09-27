#!/usr/bin/env python3
"""
Builds home.js from the blocks in src/.

    python3 tools/build-bundle.py

Same shape as the calendar's tools-build-bundle.py: each block in src/ is a
standalone Squarespace code block -- markup, a <style> and a <script> -- and
this pulls the three apart and stitches them into one file that can be served
from GitHub Pages and dropped on a page with a single script tag.

Edit the blocks in src/, not home.js. The next build throws away anything
written straight into the bundle.

WHAT THE BUNDLE ADDS that the blocks do not have on their own:

  · the font link. wpfwdc.org serves Young Serif and Bitter, but not
    IBM Plex Mono, which every eyebrow, time chip and tag pill is set in.
    Without this the whole page falls back to system monospace.

  · the band chrome -- the eyebrow stamp, the headline, the night or paper
    ground, the section padding. The blocks render their own contents and
    nothing around them.

  · full bleed. A Squarespace code block sits inside the content column
    (measured: 493px inside a 577px window), so the grounds are pulled out
    to the window edges unless the section is already full width.
"""

import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC  = ROOT / "src"
OUT  = ROOT / "home.js"

# ---------------------------------------------------------------- the page
# Order is the running order of the homepage. `ground` is which surface the
# band sits on; `stamp` is the mono eyebrow, left and right of the rule.
BANDS = [
    dict(key="hero",   file="hero.html",           ground="night",
         stamp=None, title=None),

    # "Recently", not "Earlier today". Transcription runs overnight and a
    # write-up is only shown once it has been approved, so the freshest
    # thing this band can ever carry is last night. The old eyebrow
    # promised same-day and made a working rail look broken.
    dict(key="missed", file="missed-it.html",      ground="paper",
         stamp=("Recently", "Archive"),
         title="Missed it? It&rsquo;s still up."),

    dict(key="signup", file="newsletter.html",     ground="paper2",
         stamp=None, title=None),

    dict(key="events", file="station-events.html", ground="night",
         stamp=("This week", "Community"),
         title="Come be in the room."),

    dict(key="news",   file="news.html",           ground="paper",
         stamp=("Lately", "News"),
         title="What the station is saying."),

    dict(key="people", file="people.html",         ground="night",
         stamp=("Any hour", "Programmers"),
         title="Neighbors who know their music and movements."),

    dict(key="app",    file="app.html",             ground="paper",
         stamp=("Anywhere", "Mobile"),
         title="Take 89.3 with you."),

    # No title: the ask has its own heading inside the panel, and two
    # display-face headings stacked would fight each other.
    dict(key="sustain", file="sustain.html",        ground="night",
         stamp=("What happens next", "Sustain"),
         title=None),
]


def split_block(html: str):
    """Pull a block apart into (markup, css, js)."""
    css = "\n".join(m.group(1) for m in re.finditer(r"<style>(.*?)</style>", html, re.S))
    js  = "\n".join(m.group(1) for m in re.finditer(r"<script>(.*?)</script>", html, re.S))
    markup = re.sub(r"<style>.*?</style>", "", html, flags=re.S)
    markup = re.sub(r"<script>.*?</script>", "", markup, flags=re.S)
    # the leading explainer comment is for whoever opens the block, not the browser
    markup = re.sub(r"<!--.*?-->", "", markup, flags=re.S).strip()
    return markup, css.strip(), js.strip()


def main():
    if not SRC.is_dir():
        sys.exit("no src/ -- run this from the project root")

    styles, markup, boots, order = {}, {}, [], []

    for band in BANDS:
        path = SRC / band["file"]
        if not path.is_file():
            sys.exit(f"missing {path.relative_to(ROOT)}")
        m, c, j = split_block(path.read_text())
        styles[band["key"]] = c
        markup[band["key"]] = m
        # Each block's script is an IIFE that runs the moment it is parsed.
        # Wrapped in a named function it runs when its band is mounted instead,
        # which is the same thing wpfw.js does to its blocks.
        boots.append("  function boot_%s() {\n%s\n  }" % (band["key"], j))
        order.append({k: band[k] for k in ("key", "ground", "stamp", "title")})

    tpl = (ROOT / "tools" / "bundle.template.js").read_text()
    out = (tpl
           .replace("/*__STYLES__*/", json.dumps(styles, indent=2))
           .replace("/*__MARKUP__*/", json.dumps(markup, indent=2))
           .replace("/*__BANDS__*/",  json.dumps(order,  indent=2))
           .replace("/*__BOOTS__*/",  "\n\n".join(boots)))

    OUT.write_text(out)
    kb = round(OUT.stat().st_size / 1024)
    print(f"wrote {OUT.relative_to(ROOT)}  {kb} KB  ({len(BANDS)} bands)")


if __name__ == "__main__":
    main()
