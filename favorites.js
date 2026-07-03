import{S as h,g as p}from"./assets/quote-4CI0EVer.js";import"./assets/vendor-Ht0x2cLd.js";const _="favorites",S=t=>({_id:t._id,name:t.name,burnedCalories:t.burnedCalories,time:t.time,bodyPart:t.bodyPart,target:t.target}),l=new h(_),r={root:"[data-favorites-root]",quoteText:"[data-quote-text]",quoteAuthor:"[data-quote-author]",emptyState:"[data-empty-state]",listSection:"[data-list-section]",list:"[data-favorites-list]",paginationSlot:"[data-pagination-slot]"},d={quote:"A lot of times I find that people who are blessed with the most talent don't ever develop that attitude, and the ones who aren't blessed in that way are the most competitive and have the biggest heart.",author:"Tom Brady"};let u=null;const y=async()=>{document.querySelector(r.root)&&(q(),await b(),v())},b=async()=>{const t=document.querySelector(r.quoteText),e=document.querySelector(r.quoteAuthor);if(!t||!e)return;const a=await p()??d;t.textContent=a.quote??d.quote,e.textContent=a.author??d.author},v=()=>{const t=document.querySelector(r.root),e=document.querySelector(r.emptyState),a=document.querySelector(r.listSection),o=document.querySelector(r.list),s=document.querySelector(r.paginationSlot);if(!t||!e||!a||!o||!s)return;const c=m(),i=c.length>0;if(t.classList.toggle("is-empty",!i),t.classList.toggle("is-filled",i),e.classList.toggle("is-hidden",i),a.classList.toggle("is-hidden",!i),!i){o.innerHTML="",s.innerHTML="",s.classList.add("is-hidden");return}o.innerHTML=c.map((f,g)=>u(f,{index:g,onStartAction:"favorite-exercise:start",onRemoveAction:"favorite-exercise:remove"})).join(""),x({paginationSlot:s,totalItems:c.length})},x=({paginationSlot:t,totalItems:e})=>{t.innerHTML="";{t.classList.add("is-hidden");return}},q=()=>{const t=document.querySelector(r.list);!t||t.dataset.bound==="true"||(t.dataset.bound="true",t.addEventListener("click",e=>{const a=e.target.closest('[data-action="favorite-exercise:remove"]');if(a){w(a.dataset.exerciseId);return}const o=e.target.closest('[data-action="favorite-exercise:start"]');o&&document.dispatchEvent(new CustomEvent("favorite-exercise:start",{detail:{exerciseId:o.dataset.exerciseId}}))}))},w=t=>{const a=m().filter(o=>o._id!==t);l.save(a),document.dispatchEvent(new CustomEvent("favorite-exercise:removed",{detail:{exerciseId:t,favorites:a}})),v()},m=()=>{const t=l.load([]);return Array.isArray(t)?t.map(S).filter(e=>e._id):[]},A=t=>`
    <li class="favorites-exercises-item">
      <article class="favorite-exercise-card" data-exercise-id="${t._id}">
        <div class="favorite-exercise-card__top">
          <div class="favorite-exercise-card__badge-wrap">
            <span class="favorite-exercise-card__badge">Workout</span>
            <button
              class="favorite-exercise-card__remove"
              type="button"
              aria-label="Remove ${n(t.name)} from favorites"
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
          <h3 class="favorite-exercise-card__title">${n(t.name)}</h3>
        </div>

        <ul class="favorite-exercise-card__meta" aria-label="Exercise details">
          <li class="favorite-exercise-card__meta-item">
            Burned calories: <span>${t.burnedCalories} / ${t.time} min</span>
          </li>
          <li class="favorite-exercise-card__meta-item">
            Body part: <span>${n(t.bodyPart)}</span>
          </li>
          <li class="favorite-exercise-card__meta-item">
            Target: <span>${n(t.target)}</span>
          </li>
        </ul>
      </article>
    </li>
  `,n=(t="")=>String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");u=A;y();
//# sourceMappingURL=favorites.js.map
