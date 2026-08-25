# InSapna Insurance — site notes

Single-page marketing site for an insurance agency serving **New Hampshire
and Maine**. Live at https://insapnainsurance.com/ (Vercel, auto-deploys
from `main`).

## Layout

Everything is in `index.html` — markup, CSS, and JS in one file. There is no
build step and no framework; edit the file and push.

- `api/contact.js` — Vercel serverless function, emails form submissions via
  Resend to insapnainsurance@gmail.com. Handles base64 attachments up to 10 MB.
- `logo.png` — **has a baked-in grey background, no alpha.** It only looks
  clean against the light page; it cannot be placed on a dark surface
  without the grey block showing.

Left column: heading + two coverage cards (Personal, Commercial).
Right column: the quote form. Cards link down to the form.

## Conventions

- Brand colors live in `:root` — royal blue `--navy*` from the logo shield,
  gold `--gold*` from the lotus flame. Card gradients resolve to a shared
  navy base so the pair reads as one set.
- Fonts: Playfair Display (headings), DM Sans (body).
- Breakpoints at 900px and 480px. Cards stack below 900px.
- **When removing markup, remove the JS that references it.** A prior edit
  deleted the countdown HTML but left its `getElementById` calls, which would
  have thrown and silently killed the form's submit handler below it.

## SEO

Set up and verified in Google Search Console (HTML-file method —
`google4bb8cdeab63b2054.html` **must stay in the repo** or verification
is lost).

In place: canonical URL, robots meta, Open Graph + Twitter tags,
`InsuranceAgency` JSON-LD with `areaServed` = NH and Maine, `robots.txt`,
`sitemap.xml`. Keep `<title>` under ~60 chars and descriptions ~150-160.

After changing the title or description, request indexing again in Search
Console — Google serves a cached snapshot until it recrawls, so changes do
not appear in results immediately.

## TODO

- [ ] **Add street address and phone.** Biggest remaining SEO gap. `areaServed`
      covers the region, but a physical address plus `telephone` in the JSON-LD
      is what qualifies the business for local map-pack results
      ("insurance agent near me"). Add to both the visible page and the
      structured data.
- [ ] **Create a Google Business Profile** (business.google.com). For a local
      agency this typically drives more calls than the website itself.
- [ ] **Split into per-line pages.** One page of ~150 words can realistically
      rank for the brand name and little else. Separate Personal and Commercial
      pages with real content are needed to rank for coverage terms.
- [ ] Request indexing after the NH/Maine title change (commit `eba5651`).
- [ ] Replace `logo.png` with a transparent version — the grey background is
      visible against the cream page and constrains where the logo can sit.
- [ ] Dead CSS: `.socials` / `.social-btn` rules have no matching markup.
      Either add the social links or delete the rules.
