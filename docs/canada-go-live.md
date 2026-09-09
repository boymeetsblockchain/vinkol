# Canada go-live — the website

The counterpart to `vinkol-server/docs/canada-go-live.md`, for this repo.
Everything here needs a human decision or an external value. Nothing blocks
Nigeria: the unprefixed routes serve it exactly as before.

Items marked **BLOCKING** must be done before a Canadian visitor sees `/ca`.

---

## 1. Environment variables

Set on Vercel. Only three exist.

| Variable | What it is | If unset |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | API base, e.g. `https://vinkol-server.onrender.com/api/v1`. | Falls back to the **staging** server. Already set in existing environments — check it is the right one per environment. |
| `NEXT_PUBLIC_SITE_URL` | This site's own origin, e.g. `https://vinkol.com`. | `metadataBase` is undefined, so canonical and `og:url` tags render as relative paths. Pages still work; search engines see weaker signals and social previews may not resolve. Set it before caring about SEO. |
| `NEXT_PUBLIC_Maps_API_KEY` | Google Places key. | Every address field silently stops autocompleting. |

### BLOCKING — the Maps key needs Canada

Places autocomplete is now restricted per market rather than to `ng`, so a
Canadian address is enterable in the UI. That only works if the key itself
permits it. Confirm in Google Cloud Console:

- Places API and Geocoding API are both enabled.
- The key has no country or region restriction excluding CA.
- HTTP referrer restrictions include whatever domain serves `/ca`.
- Billing quota is set for the added traffic.

The server uses its own `GOOGLE_API_KEY` for the reverse-geocode that decides
an order's market. That is a separate key with its own restrictions — a
Canadian order silently falls back to Nigeria if it fails, so check both.

---

## 2. Geolocation only works on Vercel

The `/` to `/ca` redirect and the server-side market resolution both read the
`x-vercel-ip-country` header (`src/middleware.ts`, `src/lib/markets/server.ts`).

On Vercel this is set automatically and nothing needs configuring. Anywhere
else the header is absent, and both fall back to Nigeria with no redirect and
no error. A Canadian visitor would land on the naira site and stay there.

If this ever moves off Vercel, those two reads are the only places to change.
The country switcher in the footer keeps working regardless, since it writes
the cookie directly.

---

## 3. Content that is still a placeholder

Search the codebase for `TODO_CA` — both live in `src/lib/markets/content.ts`.

### BLOCKING — Canadian contact details

`content.ts` → `CANADA.contact`. Address and phone are deliberately empty
rather than filled with the Lagos ones. The footer and contact page render
nothing for an empty value, so the Canadian site currently shows a support
email and no address.

Supply a Canadian address and phone, or confirm that email-only is intended.

### App Store links

`content.ts` → `CANADA.appStore`. Both point at the storefront-neutral URLs,
which was the fix for the old hardcoded `/ng/` links that showed Canadian
visitors a region-mismatch page.

Confirm the apps are actually available on the Canadian App Store. If they are
not, the links should be removed for Canada rather than left to fail.

### Canadian testimonials and the rating badge

`content.ts` → `CANADA.testimonials` is `[]` and `ratingSummary` is `null`, so
the reviews section and the "4.8 · 2,000+ ratings" badge render nothing at all
in Canada. That is deliberate: a fabricated review is a deception, and Canada's
Competition Act penalises the advertiser for it.

Fill them in only with real quotes you have permission to publish, and a real
aggregate. Until then the section correctly stays absent.

### Nigerian payout copy contradicts the platform

`content.ts` → `NIGERIA.payout` still carries the original site's promise:
riders paid daily or weekly by transfer, with a processing fee under 1%.

Payouts are manual in both markets — a rider requests a withdrawal and an admin
approves it. There is no schedule. This copy predates the market work and was
left untouched because it is a commercial promise, not a string. Decide whether
the platform or the copy is wrong.

---

## 4. Legal pages

`/ca/privacy-policy` and `/ca/terms-and-conditions` are scaffolds. They explain
that Canadian terms are being drafted, point at support, and carry
`robots: { index: false }`.

The Nigerian documents are deliberately not reused: they are governed by
Nigerian law, name the Lagos Multi Door Courthouse for disputes, and cite the
Nigeria Data Protection Act. Serving them to a Canadian user would be both
wrong and unenforceable.

Replace the `legal-pending.tsx` usage with the real content once counsel
delivers it, and drop the `robots` override so they index.

---

## 5. `bun.lock` is stale

`react-paystack` was removed from `package.json` — it was imported nowhere and
pinned React 18 or lower, so `npm install` could not resolve it against this
project's React 19. Payment redirects use the `authorization_url` the server
returns, so no gateway SDK belongs on the client.

`package-lock.json` was regenerated. `bun.lock` still lists it, and
`vercel.json` builds with `bun install`. Run once, on a machine with bun:

```bash
bun install
```

Then commit the updated `bun.lock`. Until then the two lockfiles disagree about
a dependency.

---

## 6. One decision left open

The access token lives in `localStorage`, so middleware cannot guard the
dashboards. Route protection is a client-side effect in each dashboard layout
(`DashboardGate`), which is correct but runs after the page has begun
rendering — a brief flash before redirecting.

Moving the token to a cookie would let middleware guard those routes properly,
and the server already reads a `token` cookie before the `Authorization` header
(`authMiddlewares.ts`). It touches every login mutation and the axios
interceptor, so it was left as your call rather than folded in.

Not blocking. The current guard works.

---

## 7. Test before launch

Nothing here needs Stripe test mode — the website never touches a gateway
directly, it follows the `authorization_url` the server returns.

1. **Geo redirect.** With a Canadian IP (or a forced `x-vercel-ip-country: CA`),
   load `/` and expect `/ca`. Reload and expect no second redirect. Switch to
   Nigeria in the footer and expect `/` with no bounce back.
2. **Shared routes are not redirected.** `/book-a-delivery`, `/bulk-delivery`,
   `/waitlist`, `/explore-shop`, `/shops` and `/shop/dashboard` must all stay
   put for a Canadian visitor. Only the seven routes in `MARKET_ROUTES` have a
   `/ca` version, and redirecting any other would 404.
3. **A Canadian store order end to end.** Basket, checkout with a Toronto
   address, confirm the quote shows delivery, service fee, an HST line and a
   total, all in `C$` with cents. Pay, and confirm the amount charged equals
   the total shown.
4. **A Nigerian store order.** Same flow, naira, no tax line, whole naira
   amounts. Compare the total against a pre-change order — it must not differ.
5. **Store discovery is market-scoped.** As a Canadian visitor, `/explore-shop`
   and `/shops` must list only Canadian stores; as Nigerian, only Nigerian.
6. **Phone fields accept both.** `08012345678` and `4165550142` both pass;
   `123` and `call me` both fail.
7. **Onboarding resumes.** Start a store signup, reach the profile step, close
   the tab, sign in again, and expect to land back on the outstanding step with
   the stepper showing what is done.
8. **A Canadian merchant can save payout details.** Institution and transit
   numbers required, account name typed by hand, submission not gated on a
   verification that never arrives.

---

## 8. Known gaps shipping unfixed

**The delivery-address control in the store header is decorative.** It reads
"Enter your delivery address..." but the real address is collected at checkout,
where it can be geocoded and priced. Wiring it to prefill checkout is a small
addition, not done.

**No inventory-value figure on the products screen.** The old badge summed
prices and ignored quantity, so it was never inventory value, and with
pagination it would only have summed one page. Real inventory value is a server
aggregate that does not exist yet.

**`/shops/:id` is reachable across markets.** Store listings are filtered
server-side, but a direct link to a Canadian store opens from the Nigerian site
and vice versa. Low priority — it is how someone would bypass the filter, not
something they hit by accident.

**French is not supported.** English only, as agreed. The copy lives in one
keyed content module, so `fr-CA` is a data task rather than a re-plumbing, but
no locale routing exists.

---

## 9. Order of work

1. Set `NEXT_PUBLIC_SITE_URL`; confirm `NEXT_PUBLIC_BASE_URL` per environment.
2. Check the Maps key permits Canada (§1) — this is the one that silently
   breaks address entry.
3. Run `bun install` and commit `bun.lock` (§5).
4. Fill in the Canadian contact details, or confirm email-only (§3).
5. Deploy to staging and work through §7.
6. Decide the payout copy question (§3) — it is wrong in Nigeria today.
7. Legal content when counsel delivers (§4); until then `/ca` legal stays
   noindex, which is correct.

The server can go out well ahead of this. Canadian orders are impossible until
a client sends a `quoteId`, and this site now does.
