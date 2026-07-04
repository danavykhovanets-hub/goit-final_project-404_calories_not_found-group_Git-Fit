var ae=Object.defineProperty;var re=(e,t,a)=>t in e?ae(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var _=(e,t,a)=>re(e,typeof t!="symbol"?t+"":t,a);import{i as G,a as se,S as H}from"./vendor-Ht0x2cLd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();function ne(){const e=document.querySelector("[data-menu]"),t=document.querySelector("[data-menu-open]"),a=document.querySelector("[data-menu-close]"),r=document.querySelectorAll("[data-nav-link]");if(ie(r),!e||!t||!a||e.dataset.headerInitialized==="true")return;e.dataset.headerInitialized="true",e.setAttribute("inert","");const s=()=>{e.classList.add("is-open"),e.removeAttribute("aria-hidden"),e.removeAttribute("inert"),t.setAttribute("aria-expanded","true"),document.body.classList.add("menu-open"),a.focus()},n=()=>{e.classList.contains("is-open")&&(e.contains(document.activeElement)&&t.focus(),e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"),e.setAttribute("inert",""),t.setAttribute("aria-expanded","false"),document.body.classList.remove("menu-open"))};t.addEventListener("click",s),a.addEventListener("click",n),e.addEventListener("click",c=>{c.target.closest("a")&&n()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&n()}),window.addEventListener("resize",()=>{window.matchMedia("(min-width: 768px)").matches&&n()})}function ie(e){const a=window.location.pathname.includes("favorites")?"favorites":"home";e.forEach(r=>{const s=r.dataset.navLink===a;r.classList.toggle("is-active",s),s?r.setAttribute("aria-current","page"):r.removeAttribute("aria-current")})}ne();const u=e=>{G.error({message:e,position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",icon:""})},A=(e,t={})=>{G.success({message:e,position:"topRight",backgroundColor:"#088b57",messageColor:"#fff",icon:"",...t})},p=se.create({baseURL:"https://your-energy.b.goit.study/api",headers:{Accept:"application/json"}});async function oe(){const{data:e}=await p.get("/quote");return e}class V{constructor(t,a=localStorage){_(this,"load",t=>{try{const a=this.storage.getItem(this.key);return a===null?t:JSON.parse(a)}catch(a){return console.error(`Failed to read data from localStorage by key "${this.key}"`,a),t}});_(this,"save",t=>{try{return this.storage.setItem(this.key,JSON.stringify(t)),!0}catch(a){return console.error(`Failed to save data to localStorage by key "${this.key}"`,a),!1}});_(this,"remove",()=>{try{return this.storage.removeItem(this.key),!0}catch(t){return console.error(`Failed to remove data from localStorage by key "${this.key}"`,t),!1}});this.key=t,this.storage=a}}function S(e){var t,a,r;return{status:(t=e==null?void 0:e.response)==null?void 0:t.status,message:(r=(a=e==null?void 0:e.response)==null?void 0:a.data)==null?void 0:r.message}}function j(e,t){const a=document.querySelector(e),r=document.querySelector(t);if(!a||!r)return;const s=()=>{const n=r.scrollHeight-r.scrollTop-r.clientHeight<=1;a.classList.toggle("scroll-fade-hidden",n)};s(),r.addEventListener("scroll",s,{passive:!0}),window.addEventListener("resize",s)}const M=new V("quote-of-the-day");async function ce(){try{const e=new Date().toISOString().slice(0,10),t=M.load(null);if((t==null?void 0:t.date)===e&&(t!=null&&t.quote))return t.quote;const a=await oe();return M.save({date:e,quote:a}),a}catch(e){return u(de(e)),null}}async function le(){const e=document.querySelector("[data-quote-text]"),t=document.querySelector("[data-quote-author]"),a=document.querySelector("[data-quote-author-link]");if(!e||!t)return;const r=await ce();!(r!=null&&r.quote)||!(r!=null&&r.author)||(e.textContent=r.quote,t.textContent=r.author,a&&(a.href=`https://www.google.com/search?q=${encodeURIComponent(r.author)}`))}j(".quote-text-wrapper",".quote-text");function de(e){const{status:t,message:a}=S(e);switch(t){case 404:return a??"Quote of the day was not found.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to load the quote of the day."}}const ue="favorites",Je=e=>({_id:e._id,name:e.name,burnedCalories:e.burnedCalories,time:e.time,bodyPart:e.bodyPart,target:e.target}),q=new V(ue),g="/goit-advancedjs-finalproject-group_4/assets/icons-DeBis6gG.svg",x=(e="")=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),me=(e,t)=>{if(t.metaType==="favorite")return`
      <button
        type="button"
        class="favorite-meta-btn"
        aria-label="Remove ${x(e.name)} from favorites"
        data-action="${t.onMetaAction}"
        data-exercise-id="${e._id}"
      >
        <svg class="favorite-meta-icon" width="16" height="16" aria-hidden="true">
          <use href="${g}#trash"></use>
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
        <use href="${g}#star_yellow"></use>
      </svg>
    </button>
  `},ge=(e,t={})=>{const a={listItemClassName:"exercises-item",metaType:"rating",onStartAction:"exercise:start",onMetaAction:t.metaType==="favorite"?"favorite-exercise:remove":"exercise:rate",...t};return`
    <li class="${a.listItemClassName}">
      <article class="exercise-card-wrapper" data-exercise-id="${e._id}">
        <div class="exercise-card-content">
          <div class="exercise-card-top">
            <div class="meta-group">
              <span class="workout-span">WORKOUT</span>
              ${me(e,a)}
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
                <use href="${g}#arrow-next-page"></use>
              </svg>
            </button>
          </div>

          <div class="exercise-card-name">
            <div class="human-svg-wrapper" aria-hidden="true">
              <svg class="human-svg">
                <use href="${g}#running_figure_white"></use>
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
  `};document.querySelector(".exercises-list");const pe=5;function Y({container:e,page:t,totalPages:a,onPageChange:r}){if(!e)return;const s=Number(t),n=Number(a);if(n<=1){e.innerHTML="",e.classList.add("is-hidden"),e.onclick=null;return}const c=fe(s,n),L=P({direction:"prev",page:s-1,disabled:s===1,label:"Go to previous page"}),w=P({direction:"next",page:s+1,disabled:s===n,label:"Go to next page"}),$=c.map(m=>{if(m==="dots")return'<span class="home-pagination-dots">...</span>';const l=m===s;return`
        <button
          type="button"
          class="home-pagination-btn${l?" is-active":""}"
          data-page="${m}"
          aria-label="Go to page ${m}"
          ${l?'aria-current="page" disabled':""}
        >
          ${m}
        </button>
      `}).join("");e.innerHTML=`${L}${$}${w}`,e.classList.remove("is-hidden"),e.onclick=m=>{const l=m.target.closest("[data-page]");!l||l.disabled||r(Number(l.dataset.page))}}function P({direction:e,page:t,disabled:a,label:r}){return`
    <button
      type="button"
      class="home-pagination-arrow home-pagination-arrow-${e}"
      data-page="${t}"
      aria-label="${r}"
      ${a?"disabled":""}
    >
      <svg class="home-pagination-arrow-icon" width="6" height="12" aria-hidden="true">
        <use href="${g}#pagination-arrow"></use>
      </svg>
    </button>
  `}function fe(e,t){if(t<=pe)return Array.from({length:t},(n,c)=>c+1);const a=[1],r=Math.max(2,e-1),s=Math.min(t-1,e+1);r>2&&a.push("dots");for(let n=r;n<=s;n+=1)a.push(n);return s<t-1&&a.push("dots"),a.push(t),a}const Z=document.getElementById("loader");function K(){Z.classList.add("loader--visible")}function W(){Z.classList.remove("loader--visible")}async function ve(e){const{data:t}=await p.post("/subscription",{email:e});return t}const ye=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function he(e,t){return typeof e=="string"?e:e!=null&&e.message?e.message:e!=null&&e.error?e.error:t}function _e(){const e=document.querySelector("[data-subscribe-form]");if(!e||e.dataset.subscriptionInitialized==="true")return;e.dataset.subscriptionInitialized="true";const t=e.elements.email,a=e.querySelector(".subscribe-btn");e.addEventListener("submit",async r=>{r.preventDefault();const s=t.value.trim();if(!ye.test(s)){u("Please enter a valid email address."),t.focus();return}R(a,!0);try{const n=await ve(s);A(he(n,"Subscription successful."),{maxWidth:"500px"}),e.reset()}catch(n){u(be(n))}finally{R(a,!1)}})}function be(e){const{status:t,message:a}=S(e);switch(t){case 400:return a??"Invalid request. Please check your email.";case 404:return a??"Subscription service was not found.";case 409:return a??"This email is already subscribed.";case 500:return a??"Server error. Please try again later.";default:return a??"Something went wrong. Please try again later."}}function R(e,t){e&&(e.disabled=t,e.textContent=t?"Sending...":"Send")}async function xe(e){const{data:t}=await p.get("/exercises",{params:e});return t}const Se="Muscles",Ee=1,Le=12;async function we({filter:e=Se,page:t=Ee,limit:a=Le}={}){const{data:r}=await p.get("/filters",{params:{filter:e,page:t,limit:a}});return r}const $e="Muscles",Ce={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};let b=$e,C=1,f=null,v="";const o={categoriesContainer:document.querySelector(".categories-by-muscles"),categoriesList:document.querySelector(".categories-by-muscles-list"),exercisesContainer:document.querySelector(".exercises"),exercisesList:document.querySelector(".exercises-list"),paginationContainer:document.querySelector("[data-home-pagination]"),searchForm:document.querySelector(".filters-search-form"),filtersSlash:document.querySelector(".filters-slash"),selectedCategory:document.querySelector(".filters-selected-category")};var O;(O=o.categoriesList)==null||O.addEventListener("click",qe);var D;(D=o.searchForm)==null||D.addEventListener("submit",Ae);var I;(I=o.exercisesList)==null||I.addEventListener("wheel",e=>{const t=e.target.closest(".exercise-info-item");t&&t.scrollWidth>t.clientWidth&&(e.preventDefault(),t.scrollLeft+=e.deltaY)},{passive:!1});async function k({filter:e=b,page:t=C}={}){b=e,C=t,f=null,v="",Q(),Fe();const a=Re(),r=await we({filter:b,page:C,limit:a});o.categoriesList.innerHTML=ke(r.results),Y({container:o.paginationContainer,page:Number(r.page),totalPages:r.totalPages,onPageChange:s=>{k({filter:b,page:s})}})}async function T({page:e=1}={}){if(!f)return;const t=Oe(),a={...f,page:e,limit:t};v&&(a.keyword=v);const r=await xe(a),s=r.results??[];Me(),o.exercisesList.innerHTML=s.length?s.map(n=>ge(n)).join(""):Te(),Y({container:o.paginationContainer,page:Number(r.page||e),totalPages:r.totalPages,onPageChange:n=>{T({page:n})}})}function qe(e){const t=e.target.closest(".category-card-wrapper");if(!t)return;const{category:a,filter:r}=t.dataset,s=Ce[r];!s||!a||(f={[s]:a},v="",Q(),Pe(a),T({page:1}))}function Ae(e){var a;if(e.preventDefault(),!f)return;const t=(a=o.searchForm)==null?void 0:a.querySelector("input");v=(t==null?void 0:t.value.trim())??"",T({page:1})}function ke(e){return e.map(({filter:t,name:a,imgURL:r})=>{const s=J(a);return`
        <li class="categories-by-muscles-item">
          <img
            src="${r}"
            alt="${s}"
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
              <h3 class="category-card-name">${s}</h3>
              <p class="category-card-filter">${t}</p>
            </div>
          </button>
        </li>
      `}).join("")}function Te(){return`
    <li class="exercises-empty">
      No exercises found. Try another keyword.
    </li>
  `}function Fe(){var e,t,a,r,s;(e=o.categoriesContainer)==null||e.classList.remove("is-hidden"),(t=o.exercisesContainer)==null||t.classList.add("is-hidden"),(a=o.searchForm)==null||a.classList.add("is-hidden"),(r=o.filtersSlash)==null||r.classList.add("is-hidden"),(s=o.selectedCategory)==null||s.classList.add("is-hidden"),o.selectedCategory&&(o.selectedCategory.textContent="")}function Me(){var e,t,a,r,s;(e=o.categoriesContainer)==null||e.classList.add("is-hidden"),(t=o.exercisesContainer)==null||t.classList.remove("is-hidden"),(a=o.searchForm)==null||a.classList.remove("is-hidden"),(r=o.filtersSlash)==null||r.classList.remove("is-hidden"),(s=o.selectedCategory)==null||s.classList.remove("is-hidden")}function Pe(e){o.selectedCategory&&(o.selectedCategory.textContent=J(e))}function Q(){var t;const e=(t=o.searchForm)==null?void 0:t.querySelector("input");e&&(e.value="")}function Re(){return window.innerWidth<768?9:12}function Oe(){return 10}function J(e){return e.split(" ").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}function De(){const e=document.querySelectorAll(".filters-btn");e.forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.filter;e.forEach(r=>{r.classList.toggle("is-active",r===t)}),k({filter:a,page:1})})})}function Ie(){const e=document.querySelector("[data-scroll-up]");if(!e)return;const t=()=>{e.classList.toggle("is-visible",window.scrollY>300)};e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),t(),window.addEventListener("scroll",t,{passive:!0})}function Be(){const e=document.querySelector("[data-current-year]");e&&(e.textContent=String(new Date().getFullYear()))}async function Ne(e,t){try{const{result:a}=await p.patch(`/exercises/${e}/rating`,t);return A("Your rating is added successfully!"),a}catch(a){return u(ze(a)),null}}function ze(e){const{status:t,message:a}=S(e);switch(t){case 400:return a??"Invalid request. Please check the rating data.";case 404:return a??"Such exercise was not found.";case 409:return a??"This email has already left a rating.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to add the rating."}}async function Ue(e){try{const{data:t}=await p.get(`/exercises/${e}`);return t}catch(t){return u(Ge(t)),null}}function Ge(e){const{status:t,message:a}=S(e);switch(t){case 400:return a??"Invalid request. Please check the exercise id.";case 404:return a??"Exercise was not found.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to load the exercise."}}const i={modalExerciceOpenElem:document.querySelector("[data-exercice-modal-open]"),modalRatingOpenElem:null,modalAddToFavoritesElem:null,modalCloseBtn:document.querySelector("[data-modal-close]"),overlay:document.querySelector(".overlay"),modalContainer:document.querySelector(".modal"),modalContent:document.querySelector(".modal_content"),starRatingSelect:null};let y=null,d=null;const He=(e,t)=>{const{name:a,gifUrl:r,rating:s,target:n,bodyPart:c,equipment:L,popularity:w,burnedCalories:$,description:m}=e,l=Math.round(s);return`<div class="modal_exercice">
    <div class="modal_exercice_img_container">
      <img
        class="modal_exercice_img"
        src="${r}"
        alt="${a}"
      />
    </div>
    <div class="modal_exercice_data_container">
      <h2 class="modal_exercice_title">${a}</h2>
      <div class="modal_exercice_star_raiting_container">
        <p class="modal_exercice_star_rating_number">${s}</p>
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
            <use href="${g}#heart"></use>
          </svg>
        </button>
        <button class="modal_btn modal_exercice_btn_rating" type="button" data-rating-modal-open>
          Give a rating
        </button>
      </div>
    </div>
  </div>`},Ve=()=>`<form class="modal_rating">
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
      </form>`,h=async e=>{try{let t;if(K(),e){const n=e.target.closest(".start-btn");if(!n)return;const c=n.dataset;if(t=c.exerciseId,c.modalType!=="exercice"||!t)return}let a;d||(d=await Ue(t));const r=q.load([]),s=ee(d,r);a=He(d,s),i.modalContent.innerHTML=a,i.overlay.hidden=!1,i.modalContainer.classList.remove("modal-small"),i.modalContainer.classList.add("modal-large"),y="exercice",requestAnimationFrame(()=>{new H(".star-rating",{clearable:!1,maxStars:5}).rebuild()}),i.modalRatingOpenElem=document.querySelector("[data-rating-modal-open]"),i.modalRatingOpenElem.addEventListener("click",X),i.modalAddToFavoritesElem=document.querySelector("[data-favorite]"),i.modalAddToFavoritesElem.addEventListener("click",te)}catch(t){u(t)}finally{W()}},X=()=>{i.overlay.hidden=!1,i.modalContainer.classList.remove("modal-large"),i.modalContainer.classList.add("modal-small"),y="rating";const e=Ve();i.modalContent.innerHTML=e,requestAnimationFrame(()=>{new H(".star-rating-active",{clearable:!1,maxStars:5}).rebuild()}),i.modalRatingOpenElem.removeEventListener("click",X),i.modalAddToFavoritesElem.removeEventListener("click",te),i.starRatingSelect=document.querySelector(".star-rating-active"),i.starRatingSelect.addEventListener("change",E)},F=()=>{if(y==="rating"){i.starRatingSelect.removeEventListener("change",E),h();return}i.overlay.hidden=!0,d=null},je=e=>{if(e.target===i.overlay){if(y==="rating"){i.starRatingSelect.removeEventListener("change",E),h();return}F()}},Ye=e=>{if(e.key==="Escape"){if(y==="rating"){i.starRatingSelect.removeEventListener("change",E),h();return}F()}},ee=(e,t)=>t.some(a=>a._id===e._id),te=e=>{if(!d)return;const t=q.load([]);if(ee(d,t)){u("This exercise is already added to favorites.");return}q.save([d,...t]),A("Successfully added to favorites!"),e.target.childNodes[0].textContent="Favorite",e.target.childNodes[1].classList.remove("favorites_icon_empty"),e.target.childNodes[1].classList.add("favorites_icon_fill")},E=e=>{const t=e.target.value,a=i.modalContent.querySelector(".modal_rating_star_rating_number");t&&(a.textContent=`${t}.0`)},Ze=async e=>{try{e.preventDefault(),K(),d||u("Excercice is not found. Please, try one more time.");const t=new FormData(e.target),a={rate:Number(t.get("rate")),email:t.get("email"),review:t.get("review")};if(Object.values(a).some(r=>!r)){u("Please make sure that you had filled in all the values.");return}await Ne(d._id,a),h()}catch(t){u(t)}finally{W()}};var B;(B=i.modalExerciceOpenElem)==null||B.addEventListener("click",h);var N;(N=i.modalCloseBtn)==null||N.addEventListener("click",F);var z;(z=i.overlay)==null||z.addEventListener("click",je);var U;(U=i.modalContent)==null||U.addEventListener("submit",Ze);document.addEventListener("keydown",Ye);De();k();_e();le();Ie();j(".motivation-text-wrapper",".motivation-text");Be();export{j as a,ge as b,Je as c,q as f,ce as g,W as h,_e as i,Y as r,K as s};
//# sourceMappingURL=main-B68dlAd6.js.map
