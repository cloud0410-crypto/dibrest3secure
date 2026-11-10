"use client";
import {useMemo,useState} from "react";
import {places,Place} from "@/lib/places";
import {Search, MapPin, Star, Utensils, Hotel, SlidersHorizontal, ExternalLink, Phone, Heart, Sparkles, ArrowUpRight, Leaf, CalendarDays} from "lucide-react";

const cuisineOptions=["Assamese","Ahom","Pork","Duck","Fish","Vegetarian","North Indian","Chinese","Tandoor","Grills","Continental"];
const vibeOptions=[{id:"nature",label:"Nature & greenery"},{id:"heritage",label:"Heritage"},{id:"rooftop",label:"Rooftop"},{id:"lively",label:"Lively"},{id:"quiet",label:"Quiet"},{id:"premium",label:"Premium"},{id:"family",label:"Family-friendly"},{id:"local",label:"Local experience"}];
const money=(s:string)=>s==="₹₹"||s.includes("₹₹")?"Mid-range":"Varies";

function PlaceCard({place,saved,onSave}:{place:Place,saved:boolean,onSave:()=>void}) {
 return <article className="place-card">
  <div className="card-top"><span className="kind">{place.type==="stay"?<Hotel size={13}/>:<Utensils size={13}/>} {place.type==="stay"?"STAY":"FOOD & DRINK"}</span><button className={"save "+(saved?"saved":"")} onClick={onSave} aria-label="Save place"><Heart size={17} fill={saved?"currentColor":"none"}/></button></div>
  <div className="card-title-row"><div><h3>{place.name}</h3><p className="category">{place.category}</p></div>{place.badge&&<span className="badge">{place.badge}</span>}</div>
  <p className="description">{place.description}</p>
  <div className="rating-row"><span className="rating"><Star size={15} fill="currentColor"/> {place.rating.toFixed(1)}</span><span className="review-count">{place.reviews?`${place.reviews.toLocaleString()} reviews`:"Review count unavailable"}</span><span className="dot">·</span><span>{place.price}</span></div>
  <div className="location"><MapPin size={14}/>{place.area}</div>
  <div className="chips">{place.cuisines.slice(0,4).map(c=><span key={c}>{c}</span>)}</div>
  <div className="highlights">{place.highlights.slice(0,3).map(h=><div key={h}><span>✓</span>{h}</div>)}</div>
  {place.caveat&&<p className="caveat"><b>Before you go:</b> {place.caveat}</p>}
  <div className="card-actions"><a href={place.bookingUrl} target="_blank" rel="noreferrer" className="primary-action">{place.type==="stay"?"Check availability":"Reserve / enquire"} <ArrowUpRight size={15}/></a><a href={place.reviewUrl} target="_blank" rel="noreferrer" className="secondary-action">Reviews <ExternalLink size={13}/></a><a href={place.mapUrl} target="_blank" rel="noreferrer" className="icon-action" aria-label="Open map"><MapPin size={16}/></a></div>
  {place.phone&&<div className="phone"><Phone size={13}/>{place.phone}</div>}
 </article>
}

export default function Home(){
 const [tab,setTab]=useState<"all"|"restaurant"|"stay">("all");
 const [search,setSearch]=useState(""); const [cuisines,setCuisines]=useState<string[]>([]);
 const [vibes,setVibes]=useState<string[]>([]); const [minRating,setMinRating]=useState("4.0");
 const [sort,setSort]=useState("recommended"); const [saved,setSaved]=useState<string[]>([]);
 const [showPrefs,setShowPrefs]=useState(false); const [occasion,setOccasion]=useState("food");
 const [diet,setDiet]=useState("nonveg"); const [ambience,setAmbience]=useState("nature");
 const [budget,setBudget]=useState("mid"); const [recommend,setRecommend]=useState(false);

 const toggle=(arr:string[],set:(x:string[])=>void,v:string)=>set(arr.includes(v)?arr.filter(x=>x!==v):[...arr,v]);
 const prefs=useMemo(()=>{
   return places.filter(p=>(p.type==="restaurant"||occasion!=="food") && p.bestFor.includes(occasion) &&
    (diet==="any" || (diet==="veg" ? p.cuisines.some(c=>["Vegetarian","North Indian","Chinese","Assamese"].includes(c)) : p.cuisines.some(c=>["Pork","Duck","Fish","Grills","Tandoor","Assamese","Indian","Multi-cuisine"].includes(c)))) &&
    (ambience==="any"||p.vibe.includes(ambience)) &&
    (budget==="any"|| (budget==="mid" ? !p.price.includes("₹₹₹") : budget==="premium" ? (p.price.includes("₹₹₹")||p.type==="stay") : p.type==="restaurant"))
   ).sort((a,b)=>b.rating-a.rating);
 },[occasion,diet,ambience,budget]);
 const filtered=useMemo(()=>{
  let list=places.filter(p=>(tab==="all"||p.type===tab) && (Number(p.rating)>=Number(minRating)) &&
   (search===""||[p.name,p.category,p.area,...p.cuisines,...p.highlights].join(" ").toLowerCase().includes(search.toLowerCase())) &&
   cuisines.every(c=>p.cuisines.includes(c)) && (vibes.length===0||vibes.some(v=>p.vibe.includes(v))));
  if(sort==="rating")list.sort((a,b)=>b.rating-a.rating);
  if(sort==="reviews")list.sort((a,b)=>b.reviews-a.reviews);
  if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
  return list;
 },[tab,search,cuisines,vibes,minRating,sort]);
 const restaurantCount=places.filter(p=>p.type==="restaurant").length, stayCount=places.filter(p=>p.type==="stay").length;
 const clear=()=>{setSearch("");setCuisines([]);setVibes([]);setMinRating("4.0");setSort("recommended");};
 return <main>
  <nav className="nav"><a className="brand" href="#"><span className="brand-mark">D</span><span>TABLE <i>&</i> STAY<small>DIBRUGARH · ASSAM</small></span></a><div className="nav-right"><a href="#discover">Discover</a><a href="#preferences">Food match</a><a href="#shortlist">Shortlist <b>{saved.length}</b></a></div></nav>
  <section className="hero">
   <div className="hero-inner"><div className="eyebrow"><span></span> THE LOCAL FOOD & STAY EDIT</div><h1>Good food.<br/><em>Great stays.</em><br/>Dibrugarh, discovered.</h1>
   <p className="hero-copy">A curated guide to the restaurants, hotels and tea-estate escapes worth exploring in Upper Assam. Find your flavour, compare guest feedback and go straight to booking or reservations.</p>
   <div className="hero-buttons"><a href="#discover" className="hero-cta">Explore the guide <ArrowUpRight size={17}/></a><button className="hero-ghost" onClick={()=>{setShowPrefs(true);setTimeout(()=>document.getElementById("preferences")?.scrollIntoView({behavior:"smooth"}),50)}}>Find my food match <Sparkles size={16}/></button></div>
   <div className="hero-foot"><span><b>{restaurantCount}</b> dining picks</span><span><b>{stayCount}</b> places to stay</span><span><b>01</b> local guide</span></div></div>
   <div className="hero-art"><div className="art-circle"></div><div className="art-leaf">✳</div><div className="art-caption">UPPER ASSAM<br/><b>FOOD & HOSPITALITY</b></div><div className="art-stamp">LOCAL<br/>FAVOURITES</div></div>
  </section>
  <section className="stats-strip"><div><span>01 / DESTINATION</span><b>Dibrugarh, Assam</b></div><div><span>02 / DISCOVER</span><b>Restaurants & stays</b></div><div><span>03 / DECIDE</span><b>Reviews · menus · booking</b></div></section>

  <section id="preferences" className="preferences-section">
   <div className="section-heading"><div><div className="eyebrow dark">YOUR PERSONAL FOOD COMPASS</div><h2>What are you <em>in the mood for?</em></h2><p>Tell us what you enjoy. We’ll rank the local shortlist around your choices.</p></div><span className="section-number">01 — MATCH</span></div>
   <div className="preference-panel">
    <div className="pref-intro"><Sparkles size={20}/><div><b>Build your taste profile</b><p>It takes less than a minute. Change the answers anytime.</p></div></div>
    <div className="pref-grid">
     <label>WHAT ARE YOU PLANNING?<select value={occasion} onChange={e=>setOccasion(e.target.value)}><option value="food">A great meal</option><option value="family">Family outing</option><option value="couple">Date / couple experience</option><option value="business">Business stay or meal</option><option value="nature">A nature escape</option><option value="heritage">A heritage experience</option></select></label>
     <label>FOOD PREFERENCE<select value={diet} onChange={e=>setDiet(e.target.value)}><option value="nonveg">Non-vegetarian friendly</option><option value="veg">Vegetarian-friendly</option><option value="any">No preference / mixed group</option></select></label>
     <label>AMBIENCE<select value={ambience} onChange={e=>setAmbience(e.target.value)}><option value="nature">Nature & greenery</option><option value="rooftop">Rooftop / lively</option><option value="heritage">Heritage / local</option><option value="premium">Premium experience</option><option value="family">Family-friendly</option><option value="any">Any ambience</option></select></label>
     <label>BUDGET<select value={budget} onChange={e=>setBudget(e.target.value)}><option value="mid">Mid-range</option><option value="premium">Premium / special occasion</option><option value="any">Flexible</option></select></label>
    </div>
    <button className="match-button" onClick={()=>setRecommend(true)}>Show my best matches <ArrowUpRight size={16}/></button>
    {recommend&&<div className="match-results"><div className="match-label">YOUR CURRENT MATCHES</div>{prefs.length?prefs.slice(0,4).map((p,i)=><div className="match-row" key={p.id}><span className="match-rank">0{i+1}</span><div><b>{p.name}</b><small>{p.category} · {p.area}</small></div><span className="match-score"><Star size={13} fill="currentColor"/> {p.rating.toFixed(1)}</span><a href={p.bookingUrl} target="_blank" rel="noreferrer">Explore <ArrowUpRight size={13}/></a></div>):<p className="no-match">No exact match with those settings. Try a flexible ambience or budget.</p>}</div>}
    <p className="fine-print">Match scores are transparent rule-based suggestions using the preferences you select, place type, listed cuisines and available review signals. They are not AI analysis of your personal history or a guarantee of menu availability.</p>
   </div>
  </section>

  <section id="discover" className="discover-section">
   <div className="section-heading"><div><div className="eyebrow dark">THE DIBRUGARH SHORTLIST</div><h2>Find your <em>next favourite.</em></h2><p>Compare the places, check recent reviews and contact the venue before you go.</p></div><span className="section-number">02 — EXPLORE</span></div>
   <div className="filterbar"><div className="tabs"><button className={tab==="all"?"active":""} onClick={()=>setTab("all")}>All places <span>{places.length}</span></button><button className={tab==="restaurant"?"active":""} onClick={()=>setTab("restaurant")}>Restaurants <span>{restaurantCount}</span></button><button className={tab==="stay"?"active":""} onClick={()=>setTab("stay")}>Hotels & resorts <span>{stayCount}</span></button></div>
    <div className="search-sort"><div className="searchbox"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search cuisine, place or area"/></div><select value={sort} onChange={e=>setSort(e.target.value)}><option value="recommended">Recommended</option><option value="rating">Highest rated</option><option value="reviews">Most reviewed</option><option value="name">Name A–Z</option></select></div>
   </div>
   <div className="filter-drawer"><div className="filter-title"><SlidersHorizontal size={15}/> FILTER BY CUISINE</div><div className="filter-chips">{cuisineOptions.map(c=><button key={c} className={cuisines.includes(c)?"selected":""} onClick={()=>toggle(cuisines,setCuisines,c)}>{c}</button>)}</div><div className="filter-bottom"><label>Minimum rating <select value={minRating} onChange={e=>setMinRating(e.target.value)}><option value="0">Any rating</option><option value="3.5">3.5+</option><option value="4.0">4.0+</option><option value="4.5">4.5+</option></select></label><button onClick={clear}>Clear filters ↗</button></div></div>
   <div className="results-meta"><span>SHOWING <b>{filtered.length}</b> OF {places.length} PLACES</span><span>Ratings are snapshots; tap Reviews for latest feedback.</span></div>
   {filtered.length?<div className="cards-grid">{filtered.map(p=><PlaceCard key={p.id} place={p} saved={saved.includes(p.id)} onSave={()=>setSaved(s=>s.includes(p.id)?s.filter(x=>x!==p.id):[...s,p.id])}/>)}</div>:<div className="empty">No places match these filters. <button onClick={clear}>Reset filters</button></div>}
  </section>

  <section id="shortlist" className="shortlist-section"><div className="shortlist-copy"><div className="eyebrow">SAVE FOR LATER</div><h2>Your personal<br/><em>Dibrugarh list.</em></h2><p>Tap the heart on any restaurant or stay to build a shortlist. Saved items stay in this browser session.</p></div><div className="saved-list">{saved.length?saved.map(id=>{const p=places.find(x=>x.id===id)!;return <div className="saved-row" key={id}><div><b>{p.name}</b><small>{p.type==="stay"?"Stay":"Restaurant"} · {p.area}</small></div><a href={p.bookingUrl} target="_blank" rel="noreferrer">Open <ArrowUpRight size={14}/></a><button onClick={()=>setSaved(s=>s.filter(x=>x!==id))}>×</button></div>}):<div className="empty-saved"><Heart size={22}/><b>Your shortlist is waiting.</b><span>Save a few places to compare them here.</span></div>}</div></section>

  <section className="editorial"><div className="editorial-icon"><Leaf size={26}/></div><div><div className="eyebrow dark">A NOTE ON LOCAL FOOD</div><h2>Don't leave without<br/><em>tasting Upper Assam.</em></h2><p>Try an Assamese thali, seasonal fish, duck or pork preparations where available, and local rice-based dishes. Ask about the day's menu: regional specials can be seasonal and may need advance confirmation.</p></div><a href="https://www.google.com/search?q=Assamese+food+Dibrugarh+restaurants" target="_blank" rel="noreferrer">Explore local cuisine <ArrowUpRight size={16}/></a></section>
  <footer><a className="brand footer-brand" href="#"><span className="brand-mark">D</span><span>TABLE <i>&</i> STAY<small>DIBRUGARH · ASSAM</small></span></a><div><b>Good taste. Better trips.</b><span>Independent discovery guide · Dibrugarh, Assam</span></div><span className="copyright">© 2026 · BUILT FOR LOCAL DISCOVERY</span></footer>
 </main>;
}
