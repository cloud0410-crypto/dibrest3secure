# Dibrugarh Table & Stay

A responsive Next.js dashboard for discovering restaurants, hotels, resorts and tea-estate stays in Dibrugarh, Assam. It includes cuisine filters, a preference matcher, review links, booking/enquiry links and a browser-session shortlist.

## Features
- Restaurant and stay directory with ratings/review-count snapshots.
- Filters for cuisine, minimum rating, place type and search.
- Preference matcher for food type, ambience, occasion and budget.
- Direct property booking/availability links where a verified official site was found; otherwise a Google booking/reservation search link is provided.
- Review links and Google Maps links for each listing.
- Save/unsave a shortlist during the current browser session.
- Responsive layout for desktop and mobile.

## Run locally
Requires Node.js 20. Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to GitHub + Vercel
1. Create a new GitHub repository.
2. Upload **all contents of this folder** (not the ZIP itself). `package.json` and `app/` must be at the repository root.
3. In Vercel, choose **Add New → Project**, import the GitHub repository and deploy.
4. Framework preset: Next.js. Build command: `npm run build`. Output directory: leave default.

No API keys or environment variables are required for this starter version.

## Important product/data notes
- This starter is a curated directory, not a live review aggregator. Ratings and review counts are snapshots from publicly surfaced business/travel listings when the dataset was assembled; ratings change and may differ between Google, Tripadvisor and booking platforms. Always open the linked review page for current feedback.
- Menu availability, prices, room rates, offers, operating hours and table/room inventory can change. Confirm directly with the venue before travelling or paying.
- A venue's booking link may open its official site or a Google search page. Restaurant table booking is not universally supported online in Dibrugarh; for some restaurants the safest next step is to call or message the venue.
- The preference matcher is transparent, rule-based ranking using the selected occasion, diet, ambience, budget and listed cuisines. It does not use personal history, scrape review text live, or claim AI-generated taste prediction.
- The saved shortlist uses React state and lasts only while the page remains open. Add a database/auth layer if you want cross-device accounts and persistent saved lists.
- Some venues have limited public menu detail. The app intentionally says to confirm daily specials, seasonal dishes and dietary requirements.

## Curated starter sources
- HM Hotel & Resort official site: https://www.hmresortdibrugarh.com/
- The Piano Room restaurant and reservations: https://www.hmresortdibrugarh.com/restaurant.html
- HM Resort Tripadvisor listing: https://www.tripadvisor.in/Hotel_Review-g1025488-d26218395-Reviews-HM_Resort-Dibrugarh_Dibrugarh_District_Assam.html
- Pramod Resort official site: https://www.pramodresort.com/Default.aspx
- Dibrugarh hotel listings on Tripadvisor: https://www.tripadvisor.com/Hotels-g1025488-Dibrugarh_Dibrugarh_District_Assam-Hotels.html
- Dibrugarh hotels on MakeMyTrip: https://www.makemytrip.com/hotels/dibrugarh-hotels.html

## Included initial shortlist
HM Hotel & Resort, Pushkara Sarovar Portico, Mancotta Heritage Chang Bungalow, Pramod Resort, Ahom Ethnic Food, Dihing Ethnic Restaurant, Mayabini Restaurant, ALTITUDE, Atmosphere, Hotel Tree Fern and Hotel Natraj / Zaffran.

## Next recommended upgrades
1. Add a Google Places API integration for current ratings, opening hours, place IDs and photos (requires a billing-enabled Google Cloud project and secured server-side API key).
2. Add a restaurant menu database with dish-level vegetarian/non-vegetarian tags, price, spice level and allergens.
3. Add table/room booking APIs only where a venue or booking partner offers a supported integration.
4. Add Supabase/Postgres and authentication for persistent profiles and saved places.
5. Add an admin panel so you can update venues, menus, offers and review links without editing code.

## Project structure
```text
app/
  globals.css
  layout.tsx
  page.tsx
lib/
  places.ts
package.json
next.config.ts
postcss.config.mjs
tailwind.config.ts
tsconfig.json
```


## Security version
This updated archive pins Next.js to `15.5.29` and React/React DOM to `19.2.6`. Next.js `15.5.29` includes the November 2026 security fix for affected 15.x releases. Keep dependencies updated and redeploy when Vercel or GitHub reports new advisories.
