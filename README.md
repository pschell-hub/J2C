# Journey to Change website

The website for www.journey2change.com. It is a plain, static website (no Wix, no database), hosted for free on Cloudflare Pages. Every change saved to this repository goes live automatically within a minute or two.

## What is where

| File / folder | What it contains |
|---|---|
| `index.html` | Home page |
| `about.html` | About page (address: /about) |
| `leadership-challenges.html` | Leadership challenges page (address: /leadership-challenges) |
| `privacy.html` | Privacy policy (address: /privacy) |
| `404.html` | Page shown when an address doesn't exist |
| `css/style.css` | The design: colours, fonts, spacing. The main colours are at the top. |
| `js/site.js` | Mobile menu and the contact form. The form setting is at the top. |
| `images/` | All photos, logos and icons, already resized for the web |

The header, footer and contact section are repeated in each page, so a change there needs to be made in every page.

## Contact form

The form sends messages through Formspree (free plan). The Formspree address is set in `js/site.js` (`FORM_ENDPOINT`). If it is empty, the form opens the visitor's email program with the message pre-filled, so nothing gets lost.

## Cloudflare Pages settings

- Framework preset: None
- Build command: (leave empty)
- Build output directory: `/`
