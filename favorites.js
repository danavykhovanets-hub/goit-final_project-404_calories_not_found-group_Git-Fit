var S=Object.defineProperty;var _=(t,e,a)=>e in t?S(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var n=(t,e,a)=>_(t,typeof e!="symbol"?e+"":e,a);import{i as q,g as b,p as w}from"./assets/parseError-D0Xp-UH4.js";import"./assets/vendor-Ht0x2cLd.js";async function x(){const{data:t}=await q.get("/quote");return t}class v{constructor(e,a=localStorage){n(this,"load",e=>{try{const a=this.storage.getItem(this.key);return a===null?e:JSON.parse(a)}catch(a){return console.error(`Failed to read data from localStorage by key "${this.key}"`,a),e}});n(this,"save",e=>{try{return this.storage.setItem(this.key,JSON.stringify(e)),!0}catch(a){return console.error(`Failed to save data to localStorage by key "${this.key}"`,a),!1}});n(this,"remove",()=>{try{return this.storage.removeItem(this.key),!0}catch(e){return console.error(`Failed to remove data from localStorage by key "${this.key}"`,e),!1}});this.key=e,this.storage=a}}const u=new v("quote-of-the-day");async function E(){try{const t=new Date().toISOString().slice(0,10),e=u.load(null);if((e==null?void 0:e.date)===t&&(e!=null&&e.quote))return e.quote;const a=await x();return u.save({date:t,quote:a}),a}catch(t){return b(F(t)),null}}function F(t){const{status:e,message:a}=w(t);switch(e){case 404:return a??"Quote of the day was not found.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to load the quote of the day."}}const k="favorites",A=t=>({_id:t._id,name:t.name,burnedCalories:t.burnedCalories,time:t.time,bodyPart:t.bodyPart,target:t.target}),m=new v(k),r={root:"[data-favorites-root]",quoteText:"[data-quote-text]",quoteAuthor:"[data-quote-author]",emptyState:"[data-empty-state]",listSection:"[data-list-section]",list:"[data-favorites-list]",paginationSlot:"[data-pagination-slot]"},d={quote:"A lot of times I find that people who are blessed with the most talent don't ever develop that attitude, and the ones who aren't blessed in that way are the most competitive and have the biggest heart.",author:"Tom Brady"};let g=null;const T=async()=>{document.querySelector(r.root)&&(I(),await $(),f())},$=async()=>{const t=document.querySelector(r.quoteText),e=document.querySelector(r.quoteAuthor);if(!t||!e)return;const a=await E()??d;t.textContent=a.quote??d.quote,e.textContent=a.author??d.author},f=()=>{const t=document.querySelector(r.root),e=document.querySelector(r.emptyState),a=document.querySelector(r.listSection),o=document.querySelector(r.list),i=document.querySelector(r.paginationSlot);if(!t||!e||!a||!o||!i)return;const l=h(),s=l.length>0;if(t.classList.toggle("is-empty",!s),t.classList.toggle("is-filled",s),e.classList.toggle("is-hidden",s),a.classList.toggle("is-hidden",!s),!s){o.innerHTML="",i.innerHTML="",i.classList.add("is-hidden");return}o.innerHTML=l.map((y,p)=>g(y,{index:p,onStartAction:"favorite-exercise:start",onRemoveAction:"favorite-exercise:remove"})).join(""),L({paginationSlot:i,totalItems:l.length})},L=({paginationSlot:t,totalItems:e})=>{t.innerHTML="";{t.classList.add("is-hidden");return}},I=()=>{const t=document.querySelector(r.list);!t||t.dataset.bound==="true"||(t.dataset.bound="true",t.addEventListener("click",e=>{const a=e.target.closest('[data-action="favorite-exercise:remove"]');if(a){C(a.dataset.exerciseId);return}const o=e.target.closest('[data-action="favorite-exercise:start"]');o&&document.dispatchEvent(new CustomEvent("favorite-exercise:start",{detail:{exerciseId:o.dataset.exerciseId}}))}))},C=t=>{const a=h().filter(o=>o._id!==t);m.save(a),document.dispatchEvent(new CustomEvent("favorite-exercise:removed",{detail:{exerciseId:t,favorites:a}})),f()},h=()=>{const t=m.load([]);return Array.isArray(t)?t.map(A).filter(e=>e._id):[]},M=t=>`
    <li class="favorites-exercises-item">
      <article class="favorite-exercise-card" data-exercise-id="${t._id}">
        <div class="favorite-exercise-card__top">
          <div class="favorite-exercise-card__badge-wrap">
            <span class="favorite-exercise-card__badge">Workout</span>
            <button
              class="favorite-exercise-card__remove"
              type="button"
              aria-label="Remove ${c(t.name)} from favorites"
              data-action="favorite-exercise:remove"
              data-exercise-id="${t._id}"
            >
              <svg width="16" height="16" aria-hidden="true">
                <use href="./img/icons.svg#trash"></use>
              </svg>
            </button>
          </div>

          <button
            class="favorite-exercise-card__start"
            type="button"
            data-action="favorite-exercise:start"
            data-exercise-id="${t._id}"
          >
            Start
            <svg width="16" height="16" aria-hidden="true">
              <use href="./img/icons.svg#arrow_forward_one_page"></use>
            </svg>
          </button>
        </div>

        <div class="favorite-exercise-card__main">
          <div class="favorite-exercise-card__icon-wrap" aria-hidden="true">
            <svg width="16" height="16">
              <use href="./img/icons.svg#running_figure_white"></use>
            </svg>
          </div>
          <h3 class="favorite-exercise-card__title">${c(t.name)}</h3>
        </div>

        <ul class="favorite-exercise-card__meta" aria-label="Exercise details">
          <li class="favorite-exercise-card__meta-item">
            Burned calories: <span>${t.burnedCalories} / ${t.time} min</span>
          </li>
          <li class="favorite-exercise-card__meta-item">
            Body part: <span>${c(t.bodyPart)}</span>
          </li>
          <li class="favorite-exercise-card__meta-item">
            Target: <span>${c(t.target)}</span>
          </li>
        </ul>
      </article>
    </li>
  `,c=(t="")=>String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");g=M;T();
//# sourceMappingURL=favorites.js.map
