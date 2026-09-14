# Simon Game — Accessible

A browser version of the classic **Simon** memory game, rebuilt with accessibility as a first-class requirement. Watch the sequence of flashing colour pads, repeat it back, and the sequence grows by one colour each level.

## Demo

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 3001
# then visit http://127.0.0.1:3001/index.html
```

> Audio requires the `sounds/` folder to be served alongside the page. Most browsers block autoplay until the first user interaction, so the sequence audio starts working after you press **A**.

## How to play

1. Press the **A** key to start.
2. Watch and listen to the pad that flashes.
3. Click (or activate with keyboard) the pads in the same order.
4. Get it right and the next level adds one more colour. Get it wrong and you hear the error sound, see "Game Over", and can press **A** to restart.

## Accessibility features

| Feature | Implementation |
| --- | --- |
| Native keyboard support | Pads are real `<button>` elements, so they are tabbable and respond to <kbd>Enter</kbd>/<kbd>Space</kbd> without custom handlers. |
| Screen reader names | Each pad has an `aria-label` with its colour name. |
| Level announcements | `#level-title` is `aria-live="polite"`. |
| Sequence announcements | `#sequence-status` is a visually hidden `role="status"` live region that speaks each new colour, so the game is playable without seeing the flash. |
| Non-visual feedback | Every pad has a distinct tone; a separate sound plays on a wrong answer. |
| Double-activation guard | Assistive tech can emit two `click` events for one activation, so identical clicks within 150 ms are ignored (`game.js`). |
| Responsive layout | A container query collapses the grid to one column when the board is narrower than 520px. |

### Colour contrast

The palette is Okabe–Ito derived and tuned for WCAG **1.4.11 Non-text Contrast** (3:1 minimum) against the `#011F3F` page background:

| Pad | Colour | vs. background | vs. black border |
| --- | --- | --- | --- |
| Red | `#E8552F` | 4.55:1 | 5.77:1 |
| Green | `#33B579` | 6.32:1 | 8.03:1 |
| Blue | `#56B4E9` | 7.17:1 | 9.10:1 |
| Yellow | `#F0E442` | 12.51:1 | 15.88:1 |
| Pressed state | `#D9D9D9` | 11.72:1 | — |

Relative luminance is deliberately stepped (0.24 → 0.35 → 0.41 → 0.74) so the pads remain distinguishable under protanopia and deuteranopia. The "Game Over" heading uses `#FEF2BF` on `#8C1006` for **8.52:1** text contrast.

### Known gap

Colour is still the only *visual* channel identifying a pad (WCAG 1.4.1 Use of Colour). Screen reader users are covered by the live region and labels; adding a distinct glyph or pattern per pad would close this for sighted low-vision users.

## Project structure

```
.
├── index.html    # Markup, ARIA live regions, viewport meta
├── styles.css    # Layout, container query, accessible palette
├── game.js       # Game loop, input handling, announcements
└── sounds/       # red/blue/green/yellow/wrong .mp3
```

## Tech

Plain HTML, CSS and JavaScript. jQuery 4 is loaded from a CDN for DOM handling. No build step and no dependencies to install.

## Credits

Based on the Simon Game project from Angela Yu's *Complete Web Development Bootcamp*, extended with accessibility and responsive improvements.
