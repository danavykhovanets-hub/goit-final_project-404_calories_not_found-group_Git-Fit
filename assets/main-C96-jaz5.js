var ee=Object.defineProperty;var te=(e,t,a)=>t in e?ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var _=(e,t,a)=>te(e,typeof t!="symbol"?t+"":t,a);import{i as U,a as ae,S as G}from"./vendor-Ht0x2cLd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();function se(){const e=document.querySelector("[data-menu]"),t=document.querySelector("[data-menu-open]"),a=document.querySelector("[data-menu-close]"),s=document.querySelectorAll("[data-nav-link]");if(re(s),!e||!t||!a||e.dataset.headerInitialized==="true")return;e.dataset.headerInitialized="true",e.setAttribute("inert","");const r=()=>{e.classList.add("is-open"),e.removeAttribute("aria-hidden"),e.removeAttribute("inert"),t.setAttribute("aria-expanded","true"),document.body.classList.add("menu-open"),a.focus()},n=()=>{e.classList.contains("is-open")&&(e.contains(document.activeElement)&&t.focus(),e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"),e.setAttribute("inert",""),t.setAttribute("aria-expanded","false"),document.body.classList.remove("menu-open"))};t.addEventListener("click",r),a.addEventListener("click",n),e.addEventListener("click",c=>{c.target.closest("a")&&n()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&n()}),window.addEventListener("resize",()=>{window.matchMedia("(min-width: 768px)").matches&&n()})}function re(e){const a=window.location.pathname.includes("favorites")?"favorites":"home";e.forEach(s=>{const r=s.dataset.navLink===a;s.classList.toggle("is-active",r),r?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current")})}se();const u=e=>{U.error({message:e,position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",icon:""})},k=(e,t={})=>{U.success({message:e,position:"topRight",backgroundColor:"#088b57",messageColor:"#fff",icon:"",...t})},g=ae.create({baseURL:"https://your-energy.b.goit.study/api",headers:{Accept:"application/json"}});async function ne(){const{data:e}=await g.get("/quote");return e}class V{constructor(t,a=localStorage){_(this,"load",t=>{try{const a=this.storage.getItem(this.key);return a===null?t:JSON.parse(a)}catch(a){return console.error(`Failed to read data from localStorage by key "${this.key}"`,a),t}});_(this,"save",t=>{try{return this.storage.setItem(this.key,JSON.stringify(t)),!0}catch(a){return console.error(`Failed to save data to localStorage by key "${this.key}"`,a),!1}});_(this,"remove",()=>{try{return this.storage.removeItem(this.key),!0}catch(t){return console.error(`Failed to remove data from localStorage by key "${this.key}"`,t),!1}});this.key=t,this.storage=a}}function E(e){var t,a,s;return{status:(t=e==null?void 0:e.response)==null?void 0:t.status,message:(s=(a=e==null?void 0:e.response)==null?void 0:a.data)==null?void 0:s.message}}const F=new V("quote-of-the-day");async function ie(){try{const e=new Date().toISOString().slice(0,10),t=F.load(null);if((t==null?void 0:t.date)===e&&(t!=null&&t.quote))return t.quote;const a=await ne();return F.save({date:e,quote:a}),a}catch(e){return u(ce(e)),null}}async function oe(){const e=document.querySelector("[data-quote-text]"),t=document.querySelector("[data-quote-author]"),a=document.querySelector("[data-quote-author-link]");if(!e||!t)return;const s=await ie();!(s!=null&&s.quote)||!(s!=null&&s.author)||(e.textContent=s.quote,t.textContent=s.author,a&&(a.href=`https://www.google.com/search?q=${encodeURIComponent(s.author)}`))}function ce(e){const{status:t,message:a}=E(e);switch(t){case 404:return a??"Quote of the day was not found.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to load the quote of the day."}}const le="favorites",Qe=e=>({_id:e._id,name:e.name,burnedCalories:e.burnedCalories,time:e.time,bodyPart:e.bodyPart,target:e.target}),A=new V(le),p="/goit-advancedjs-finalproject-group_4/assets/icons-DeBis6gG.svg",x=(e="")=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),de=(e,t)=>{if(t.metaType==="favorite")return`
      <button
        type="button"
        class="favorite-meta-btn"
        aria-label="Remove ${x(e.name)} from favorites"
        data-action="${t.onMetaAction}"
        data-exercise-id="${e._id}"
      >
        <svg class="favorite-meta-icon" width="16" height="16" aria-hidden="true">
          <use href="${p}#trash"></use>
        </svg>
      </button>
    `;const a=Number(e.rating??0).toFixed(1);return`
    <button
      type="button"
      class="rating-subgroup"
      aria-label="Rate this exercise"
      data-action="${t.onMetaAction??"exercise:rate"}"
      data-exercise-id="${e._id}"
    >
      <span class="rating-span">${a}</span>
      <svg class="rating-svg" aria-hidden="true">
        <use href="${p}#star_yellow"></use>
      </svg>
    </button>
  `},ue=(e,t={})=>{const a={listItemClassName:"exercises-item",metaType:"rating",onStartAction:"exercise:start",onMetaAction:t.metaType==="favorite"?"favorite-exercise:remove":"exercise:rate",...t};return`
    <li class="${a.listItemClassName}">
      <article class="exercise-card-wrapper" data-exercise-id="${e._id}">
        <div class="exercise-card-content">
          <div class="exercise-card-top">
            <div class="meta-group">
              <span class="workout-span">WORKOUT</span>
              ${de(e,a)}
            </div>

            <button
              type="button"
              class="start-btn"
              data-action="${a.onStartAction}"
              data-exercise-id="${e._id}"
              data-modal-type="exercice"
            >
              <span class="start-span">Start</span>
              <svg class="start-svg" aria-hidden="true">
                <use href="${p}#arrow-next-page"></use>
              </svg>
            </button>
          </div>

          <div class="exercise-card-name">
            <div class="human-svg-wrapper" aria-hidden="true">
              <svg class="human-svg">
                <use href="${p}#running_figure_white"></use>
              </svg>
            </div>
            <h3 class="exercise-card-title">${x(e.name)}</h3>
          </div>

          <ul class="exercise-info" aria-label="Exercise details">
            <li class="exercise-info-item">
              <span class="info-label calories">Burned calories:</span>
              <span class="info-value calories">${e.burnedCalories} / ${e.time} min</span>
            </li>
            <li class="exercise-info-item">
              <span class="info-label body-part">Body part:</span>
              <span class="info-value body-part">${x(e.bodyPart)}</span>
            </li>
            <li class="exercise-info-item">
              <span class="info-label target">Target:</span>
              <span class="info-value target">${x(e.target)}</span>
            </li>
          </ul>
        </div>
      </article>
    </li>
  `},j=document.getElementById("loader");function H(){j.classList.add("loader--visible")}function Z(){j.classList.remove("loader--visible")}async function me(e){const{data:t}=await g.post("/subscription",{email:e});return t}const ge=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function pe(e,t){return typeof e=="string"?e:e!=null&&e.message?e.message:e!=null&&e.error?e.error:t}function fe(){const e=document.querySelector("[data-subscribe-form]");if(!e||e.dataset.subscriptionInitialized==="true")return;e.dataset.subscriptionInitialized="true";const t=e.elements.email,a=e.querySelector(".subscribe-btn");e.addEventListener("submit",async s=>{s.preventDefault();const r=t.value.trim();if(!ge.test(r)){u("Please enter a valid email address."),t.focus();return}P(a,!0);try{const n=await me(r);k(pe(n,"Subscription successful."),{maxWidth:"500px"}),e.reset()}catch(n){u(ve(n))}finally{P(a,!1)}})}function ve(e){const{status:t,message:a}=E(e);switch(t){case 400:return a??"Invalid request. Please check your email.";case 404:return a??"Subscription service was not found.";case 409:return a??"This email is already subscribed.";case 500:return a??"Server error. Please try again later.";default:return a??"Something went wrong. Please try again later."}}function P(e,t){e&&(e.disabled=t,e.textContent=t?"Sending...":"Send")}async function ye(e){const{data:t}=await g.get("/exercises",{params:e});return t}const he="Muscles",_e=1,be=12;async function xe({filter:e=he,page:t=_e,limit:a=be}={}){const{data:s}=await g.get("/filters",{params:{filter:e,page:t,limit:a}});return s}const Ee=5;function K({container:e,page:t,totalPages:a,onPageChange:s}){if(!e)return;const r=Number(t),n=Number(a);if(n<=1){e.innerHTML="",e.classList.add("is-hidden"),e.onclick=null;return}const c=Se(r,n),L=R({direction:"prev",page:r-1,disabled:r===1,label:"Go to previous page"}),w=R({direction:"next",page:r+1,disabled:r===n,label:"Go to next page"}),$=c.map(m=>{if(m==="dots")return'<span class="home-pagination-dots">...</span>';const l=m===r;return`
        <button
          type="button"
          class="home-pagination-btn${l?" is-active":""}"
          data-page="${m}"
          aria-label="Go to page ${m}"
          ${l?'aria-current="page" disabled':""}
        >
          ${m}
        </button>
      `}).join("");e.innerHTML=`${L}${$}${w}`,e.classList.remove("is-hidden"),e.onclick=m=>{const l=m.target.closest("[data-page]");!l||l.disabled||s(Number(l.dataset.page))}}function R({direction:e,page:t,disabled:a,label:s}){return`
    <button
      type="button"
      class="home-pagination-arrow home-pagination-arrow-${e}"
      data-page="${t}"
      aria-label="${s}"
      ${a?"disabled":""}
    >
      <svg class="home-pagination-arrow-icon" width="6" height="12" aria-hidden="true">
        <use href="${p}#pagination-arrow"></use>
      </svg>
    </button>
  `}function Se(e,t){if(t<=Ee)return Array.from({length:t},(n,c)=>c+1);const a=[1],s=Math.max(2,e-1),r=Math.min(t-1,e+1);s>2&&a.push("dots");for(let n=s;n<=r;n+=1)a.push(n);return r<t-1&&a.push("dots"),a.push(t),a}const Le="Muscles",we={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};let b=Le,C=1,f=null,v="";const o={categoriesContainer:document.querySelector(".categories-by-muscles"),categoriesList:document.querySelector(".categories-by-muscles-list"),exercisesContainer:document.querySelector(".exercises"),exercisesList:document.querySelector(".exercises-list"),paginationContainer:document.querySelector("[data-home-pagination]"),searchForm:document.querySelector(".filters-search-form"),filtersSlash:document.querySelector(".filters-slash"),selectedCategory:document.querySelector(".filters-selected-category")};var O;(O=o.categoriesList)==null||O.addEventListener("click",$e);var I;(I=o.searchForm)==null||I.addEventListener("submit",Ce);async function q({filter:e=b,page:t=C}={}){b=e,C=t,f=null,v="",Q(),qe();const a=Fe(),s=await xe({filter:b,page:C,limit:a});o.categoriesList.innerHTML=Ae(s.results),K({container:o.paginationContainer,page:Number(s.page),totalPages:s.totalPages,onPageChange:r=>{q({filter:b,page:r})}})}async function T({page:e=1}={}){if(!f)return;const t=Pe(),a={...f,page:e,limit:t};v&&(a.keyword=v);const s=await ye(a),r=s.results??[];Te(),o.exercisesList.innerHTML=r.length?r.map(n=>ue(n)).join(""):ke(),K({container:o.paginationContainer,page:Number(s.page||e),totalPages:s.totalPages,onPageChange:n=>{T({page:n})}})}function $e(e){const t=e.target.closest(".category-card-wrapper");if(!t)return;const{category:a,filter:s}=t.dataset,r=we[s];!r||!a||(f={[r]:a},v="",Q(),Me(a),T({page:1}))}function Ce(e){var a;if(e.preventDefault(),!f)return;const t=(a=o.searchForm)==null?void 0:a.querySelector("input");v=(t==null?void 0:t.value.trim())??"",T({page:1})}function Ae(e){return e.map(({filter:t,name:a,imgURL:s})=>{const r=Y(a);return`
        <li class="categories-by-muscles-item">
          <img
            src="${s}"
            alt="${r}"
            class="categories-by-muscles-img"
            loading="lazy"
          >
          <button
            type="button"
            class="category-card-wrapper"
            data-category="${a}"
            data-filter="${t}"
          >
            <div class="category-card-content">
              <h3 class="category-card-name">${r}</h3>
              <p class="category-card-filter">${t}</p>
            </div>
          </button>
        </li>
      `}).join("")}function ke(){return`
    <li class="exercises-empty">
      No exercises found. Try another keyword.
    </li>
  `}function qe(){var e,t,a,s,r;(e=o.categoriesContainer)==null||e.classList.remove("is-hidden"),(t=o.exercisesContainer)==null||t.classList.add("is-hidden"),(a=o.searchForm)==null||a.classList.add("is-hidden"),(s=o.filtersSlash)==null||s.classList.add("is-hidden"),(r=o.selectedCategory)==null||r.classList.add("is-hidden"),o.selectedCategory&&(o.selectedCategory.textContent="")}function Te(){var e,t,a,s,r;(e=o.categoriesContainer)==null||e.classList.add("is-hidden"),(t=o.exercisesContainer)==null||t.classList.remove("is-hidden"),(a=o.searchForm)==null||a.classList.remove("is-hidden"),(s=o.filtersSlash)==null||s.classList.remove("is-hidden"),(r=o.selectedCategory)==null||r.classList.remove("is-hidden")}function Me(e){o.selectedCategory&&(o.selectedCategory.textContent=Y(e))}function Q(){var t;const e=(t=o.searchForm)==null?void 0:t.querySelector("input");e&&(e.value="")}function Fe(){return window.innerWidth<768?9:12}function Pe(){return 10}function Y(e){return e.split(" ").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}function Re(){const e=document.querySelectorAll(".filters-btn");e.forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.filter;e.forEach(s=>{s.classList.toggle("is-active",s===t)}),q({filter:a,page:1})})})}function Oe(){const e=document.querySelector("[data-scroll-up]");if(!e)return;const t=()=>{e.classList.toggle("is-visible",window.scrollY>300)};e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),t(),window.addEventListener("scroll",t,{passive:!0})}async function Ie(e,t){try{const{result:a}=await g.patch(`/exercises/${e}/rating`,t);return k("Your rating is added successfully!"),a}catch(a){return u(De(a)),null}}function De(e){const{status:t,message:a}=E(e);switch(t){case 400:return a??"Invalid request. Please check the rating data.";case 404:return a??"Such exercise was not found.";case 409:return a??"This email has already left a rating.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to add the rating."}}async function Ne(e){try{const{data:t}=await g.get(`/exercises/${e}`);return t}catch(t){return u(Be(t)),null}}function Be(e){const{status:t,message:a}=E(e);switch(t){case 400:return a??"Invalid request. Please check the exercise id.";case 404:return a??"Exercise was not found.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to load the exercise."}}const i={modalExerciceOpenElem:document.querySelector("[data-exercice-modal-open]"),modalRatingOpenElem:null,modalAddToFavoritesElem:null,modalCloseBtn:document.querySelector("[data-modal-close]"),overlay:document.querySelector(".overlay"),modalContainer:document.querySelector(".modal"),modalContent:document.querySelector(".modal_content"),starRatingSelect:null};let y=null,d=null;const ze=(e,t)=>{const{name:a,gifUrl:s,rating:r,target:n,bodyPart:c,equipment:L,popularity:w,burnedCalories:$,description:m}=e,l=Math.round(r);return`<div class="modal_exercice">
    <div class="modal_exercice_img_container">
      <img
        class="modal_exercice_img"
        src="${s}"
        alt="${a}"
      />
    </div>
    <div class="modal_exercice_data_container">
      <h2 class="modal_exercice_title">${a}</h2>
      <div class="modal_exercice_star_raiting_container">
        <p class="modal_exercice_star_rating_number">${r}</p>
        <select class="star-rating" disabled>
           <option value="">Select a rating</option>
           <option value="5" ${l===5?"selected":""}>Excellent</option>
           <option value="4" ${l===4?"selected":""}>Very Good</option>
           <option value="3" ${l===3?"selected":""}>Average</option>
           <option value="2" ${l===2?"selected":""}>Poor</option>
           <option value="1" ${l===1?"selected":""}>Terrible</option>
        </select>
      </div>
      <ul class="modal_exercice_stats_block_list">
        <li class="modal_exercice_stats_block_list_item">
          Target
          <span class="modal_exercice_stats_block_list_item_bold">${n}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Body Part
          <span class="modal_exercice_stats_block_list_item_bold">${c}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Equipment
          <span class="modal_exercice_stats_block_list_item_bold">${L}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Popular
          <span class="modal_exercice_stats_block_list_item_bold">${w}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Burned Calories
          <span class="modal_exercice_stats_block_list_item_bold">${$}</span>
        </li>
      </ul>
      <p class="modal_exercice_description">${m}</p>
      <div class="modal_exercice_btn_container">
        <button class="modal_btn modal_exercice_btn_favorites" type="button" data-favorite>
          ${t?"Favorite":"Add to favorites"}
          <svg class="modal_exercice_btn_favorites_icon ${t?"favorites_icon_fill":"favorites_icon_empty"}" width="20" height="20">
            <use href="./img/icons.svg#heart"></use>
          </svg>
        </button>
        <button class="modal_btn modal_exercice_btn_rating" type="button" data-rating-modal-open>
          Give a rating
        </button>
      </div>
    </div>
  </div>`},Ue=()=>`<form class="modal_rating">
        <h2 class="modal_rating_title">Rating</h2>
        <div class="modal_rating_star_raiting_container">
          <p class="modal_rating_star_rating_number">0.0</p>
          <select class="star-rating-active" name="rate">
            <option value="">Select a rating</option>
            <option value="5">Excellent</option>
            <option value="4">Very Good</option>
            <option value="3">Average</option>
            <option value="2">Poor</option>
            <option value="1">Terrible</option>
          </select>
        </div>
        <label class="modal_rating_label">
        <input
          class="modal_rating_input"
          type="email"
          name="email"
          placeholder="Email"
          pattern="^[A-Za-z0-9_]+(.[A-Za-z0-9_]+)?@[A-Za-z]+.[A-Za-z]{2,3}$"
        />
        <span class="modal_rating_input_error">Please enter a valid email address.</span>
        </label>
        <textarea
          class="modal_rating_textarea"
          name="review"
          placeholder="Your comment"
        ></textarea>
        <button class="modal_btn modal_rating_submit" type="submit">Send</button>
      </form>`,h=async e=>{try{let t;if(H(),e){const n=e.target.closest(".start-btn");if(!n)return;const c=n.dataset;if(t=c.exerciseId,c.modalType!=="exercice"||!t)return}let a;d||(d=await Ne(t));const s=A.load([]),r=J(d,s);a=ze(d,r),i.modalContent.innerHTML=a,i.overlay.hidden=!1,i.modalContainer.classList.remove("modal-small"),i.modalContainer.classList.add("modal-large"),y="exercice",requestAnimationFrame(()=>{new G(".star-rating",{clearable:!1,maxStars:5}).rebuild()}),i.modalRatingOpenElem=document.querySelector("[data-rating-modal-open]"),i.modalRatingOpenElem.addEventListener("click",W),i.modalAddToFavoritesElem=document.querySelector("[data-favorite]"),i.modalAddToFavoritesElem.addEventListener("click",X)}catch(t){u(t)}finally{Z()}},W=()=>{i.overlay.hidden=!1,i.modalContainer.classList.remove("modal-large"),i.modalContainer.classList.add("modal-small"),y="rating";const e=Ue();i.modalContent.innerHTML=e,requestAnimationFrame(()=>{new G(".star-rating-active",{clearable:!1,maxStars:5}).rebuild()}),i.modalRatingOpenElem.removeEventListener("click",W),i.modalAddToFavoritesElem.removeEventListener("click",X),i.starRatingSelect=document.querySelector(".star-rating-active"),i.starRatingSelect.addEventListener("change",S)},M=()=>{if(y==="rating"){i.starRatingSelect.removeEventListener("change",S),h();return}i.overlay.hidden=!0,d=null},Ge=e=>{if(e.target===i.overlay){if(y==="rating"){i.starRatingSelect.removeEventListener("change",S),h();return}M()}},Ve=e=>{if(e.key==="Escape"){if(y==="rating"){i.starRatingSelect.removeEventListener("change",S),h();return}M()}},J=(e,t)=>t.some(a=>a._id===e._id),X=e=>{if(!d)return;const t=A.load([]);if(J(d,t)){u("This exercise is already added to favorites.");return}A.save([d,...t]),k("Successfully added to favorites!"),e.target.childNodes[0].textContent="Favorite",e.target.childNodes[1].classList.remove("favorites_icon_empty"),e.target.childNodes[1].classList.add("favorites_icon_fill")},S=e=>{const t=e.target.value,a=i.modalContent.querySelector(".modal_rating_star_rating_number");t&&(a.textContent=`${t}.0`)},je=async e=>{try{e.preventDefault(),H(),d||u("Excercice is not found. Please, try one more time.");const t=new FormData(e.target),a={rate:Number(t.get("rate")),email:t.get("email"),review:t.get("review")};if(Object.values(a).some(s=>!s)){u("Please make sure that you had filled in all the values.");return}await Ie(d._id,a),h()}catch(t){u(t)}finally{Z()}};var D;(D=i.modalExerciceOpenElem)==null||D.addEventListener("click",h);var N;(N=i.modalCloseBtn)==null||N.addEventListener("click",M);var B;(B=i.overlay)==null||B.addEventListener("click",Ge);var z;(z=i.modalContent)==null||z.addEventListener("submit",je);document.addEventListener("keydown",Ve);Re();q();fe();oe();Oe();export{Qe as c,A as f,ie as g,Z as h,fe as i,ue as r,H as s};
//# sourceMappingURL=main-C96-jaz5.js.map
