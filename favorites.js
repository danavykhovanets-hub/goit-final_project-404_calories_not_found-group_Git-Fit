import{S as f,g as h}from"./assets/quote-DIEocSuN.js";import"./assets/vendor-Ht0x2cLd.js";const y="favorites",b=t=>({_id:t._id,name:t.name,burnedCalories:t.burnedCalories,time:t.time,bodyPart:t.bodyPart,target:t.target}),d=new f(y),n=(t="")=>String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),S=(t,e)=>{if(e.metaType==="favorite")return`
      <button
        type="button"
        class="favorite-meta-btn"
        aria-label="Remove ${n(t.name)} from favorites"
        data-action="${e.onMetaAction}"
        data-exercise-id="${t._id}"
      >
        <svg class="favorite-meta-icon" width="16" height="16" aria-hidden="true">
          <use href="./img/icons.svg#trash"></use>
        </svg>
      </button>
    `;const a=Number(t.rating??0).toFixed(1);return`
    <button
      type="button"
      class="rating-subgroup"
      aria-label="Rate this exercise"
      data-action="${e.onMetaAction??"exercise:rate"}"
      data-exercise-id="${t._id}"
    >
      <span class="rating-span">${a}</span>
      <svg class="rating-svg" aria-hidden="true">
        <use href="./img/icons.svg#star_yellow"></use>
      </svg>
    </button>
  `},x=(t,e={})=>{const a={listItemClassName:"exercises-item",metaType:"rating",onStartAction:"exercise:start",onMetaAction:e.metaType==="favorite"?"favorite-exercise:remove":"exercise:rate",...e};return`
    <li class="${a.listItemClassName}">
      <article class="exercise-card-wrapper" data-exercise-id="${t._id}">
        <div class="exercise-card-content">
          <div class="exercise-card-top">
            <div class="meta-group">
              <span class="workout-span">WORKOUT</span>
              ${S(t,a)}
            </div>

            <button
              type="button"
              class="start-btn"
              data-action="${a.onStartAction}"
              data-exercise-id="${t._id}"
            >
              <span class="start-span">Start</span>
              <svg class="start-svg" aria-hidden="true">
                <use href="./img/icons.svg#arrow-next-page"></use>
              </svg>
            </button>
          </div>

          <div class="exercise-card-name">
            <div class="human-svg-wrapper" aria-hidden="true">
              <svg class="human-svg">
                <use href="./img/icons.svg#running_figure_white"></use>
              </svg>
            </div>
            <h3 class="exercise-card-title">${n(t.name)}</h3>
          </div>

          <ul class="exercise-info" aria-label="Exercise details">
            <li class="exercise-info-item">
              <span class="info-label calories">Burned calories:</span>
              <span class="info-value calories">${t.burnedCalories} / ${t.time} min</span>
            </li>
            <li class="exercise-info-item">
              <span class="info-label body-part">Body part:</span>
              <span class="info-value body-part">${n(t.bodyPart)}</span>
            </li>
            <li class="exercise-info-item">
              <span class="info-label target">Target:</span>
              <span class="info-value target">${n(t.target)}</span>
            </li>
          </ul>
        </div>
      </article>
    </li>
  `},u=document.getElementById("loader");function A(){u.classList.add("loader--visible")}function q(){u.classList.remove("loader--visible")}const s={root:"[data-favorites-root]",quoteText:"[data-quote-text]",quoteAuthor:"[data-quote-author]",emptyState:"[data-empty-state]",listSection:"[data-list-section]",list:"[data-favorites-list]",paginationSlot:"[data-pagination-slot]"},l={quote:"A lot of times I find that people who are blessed with the most talent don't ever develop that attitude, and the ones who aren't blessed in that way are the most competitive and have the biggest heart.",author:"Tom Brady"};let v=null;const T=async()=>{if(document.querySelector(s.root)){A();try{w(),await E(),m()}finally{q()}}},E=async()=>{const t=document.querySelector(s.quoteText),e=document.querySelector(s.quoteAuthor);if(!t||!e)return;const a=await h()??l;t.textContent=a.quote??l.quote,e.textContent=a.author??l.author},m=()=>{const t=document.querySelector(s.root),e=document.querySelector(s.emptyState),a=document.querySelector(s.listSection),r=document.querySelector(s.list),i=document.querySelector(s.paginationSlot);if(!t||!e||!a||!r||!i)return;const c=g(),o=c.length>0;if(t.classList.toggle("is-empty",!o),t.classList.toggle("is-filled",o),e.classList.toggle("is-hidden",o),a.classList.toggle("is-hidden",!o),!o){r.innerHTML="",i.innerHTML="",i.classList.add("is-hidden");return}r.innerHTML=c.map(p=>v(p,{onStartAction:"favorite-exercise:start",onRemoveAction:"favorite-exercise:remove"})).join(""),L({paginationSlot:i,totalItems:c.length})},L=({paginationSlot:t,totalItems:e})=>{t.innerHTML="";{t.classList.add("is-hidden");return}},w=()=>{const t=document.querySelector(s.list);!t||t.dataset.bound==="true"||(t.dataset.bound="true",t.addEventListener("click",e=>{const a=e.target.closest('[data-action="favorite-exercise:remove"]');if(a){C(a.dataset.exerciseId);return}const r=e.target.closest('[data-action="favorite-exercise:start"]');r&&document.dispatchEvent(new CustomEvent("favorite-exercise:start",{detail:{exerciseId:r.dataset.exerciseId}}))}))},C=t=>{const a=g().filter(r=>r._id!==t);d.save(a),document.dispatchEvent(new CustomEvent("favorite-exercise:removed",{detail:{exerciseId:t,favorites:a}})),m()},g=()=>{const t=d.load([]);return Array.isArray(t)?t.map(b).filter(e=>e._id):[]},$=t=>x(t,{listItemClassName:"exercises-item favorites-exercises-item",metaType:"favorite",onStartAction:"favorite-exercise:start",onMetaAction:"favorite-exercise:remove"});v=$;T();
//# sourceMappingURL=favorites.js.map
