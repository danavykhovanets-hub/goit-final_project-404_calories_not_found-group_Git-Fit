var K=Object.defineProperty;var Q=(e,t,a)=>t in e?K(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var _=(e,t,a)=>Q(e,typeof t!="symbol"?t+"":t,a);import{i as z,a as Y,S as U}from"./vendor-Ht0x2cLd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();function J(){const e=document.querySelector("[data-menu]"),t=document.querySelector("[data-menu-open]"),a=document.querySelector("[data-menu-close]"),s=document.querySelectorAll("[data-nav-link]");if(W(s),!e||!t||!a||e.dataset.headerInitialized==="true")return;e.dataset.headerInitialized="true",e.setAttribute("inert","");const r=()=>{e.classList.add("is-open"),e.removeAttribute("aria-hidden"),e.removeAttribute("inert"),t.setAttribute("aria-expanded","true"),document.body.classList.add("menu-open"),a.focus()},n=()=>{e.classList.contains("is-open")&&(e.contains(document.activeElement)&&t.focus(),e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"),e.setAttribute("inert",""),t.setAttribute("aria-expanded","false"),document.body.classList.remove("menu-open"))};t.addEventListener("click",r),a.addEventListener("click",n),e.addEventListener("click",c=>{c.target.closest("a")&&n()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&n()}),window.addEventListener("resize",()=>{window.matchMedia("(min-width: 768px)").matches&&n()})}function W(e){const a=window.location.pathname.includes("favorites")?"favorites":"home";e.forEach(s=>{const r=s.dataset.navLink===a;s.classList.toggle("is-active",r),r?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current")})}J();const u=e=>{z.error({message:e,position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",icon:""})},G=e=>{z.success({message:e,position:"topRight",backgroundColor:"#088b57",messageColor:"#fff",icon:""})},g=Y.create({baseURL:"https://your-energy.b.goit.study/api",headers:{Accept:"application/json"}});async function X(){const{data:e}=await g.get("/quote");return e}class ee{constructor(t,a=localStorage){_(this,"load",t=>{try{const a=this.storage.getItem(this.key);return a===null?t:JSON.parse(a)}catch(a){return console.error(`Failed to read data from localStorage by key "${this.key}"`,a),t}});_(this,"save",t=>{try{return this.storage.setItem(this.key,JSON.stringify(t)),!0}catch(a){return console.error(`Failed to save data to localStorage by key "${this.key}"`,a),!1}});_(this,"remove",()=>{try{return this.storage.removeItem(this.key),!0}catch(t){return console.error(`Failed to remove data from localStorage by key "${this.key}"`,t),!1}});this.key=t,this.storage=a}}function E(e){var t,a,s;return{status:(t=e==null?void 0:e.response)==null?void 0:t.status,message:(s=(a=e==null?void 0:e.response)==null?void 0:a.data)==null?void 0:s.message}}const M=new ee("quote-of-the-day");async function te(){try{const e=new Date().toISOString().slice(0,10),t=M.load(null);if((t==null?void 0:t.date)===e&&(t!=null&&t.quote))return t.quote;const a=await X();return M.save({date:e,quote:a}),a}catch(e){return u(se(e)),null}}async function ae(){const e=document.querySelector("[data-quote-text]"),t=document.querySelector("[data-quote-author]"),a=document.querySelector("[data-quote-author-link]");if(!e||!t)return;const s=await te();!(s!=null&&s.quote)||!(s!=null&&s.author)||(e.textContent=s.quote,t.textContent=s.author,a&&(a.href=`https://www.google.com/search?q=${encodeURIComponent(s.author)}`))}function se(e){const{status:t,message:a}=E(e);switch(t){case 404:return a??"Quote of the day was not found.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to load the quote of the day."}}const f="/goit-advancedjs-finalproject-group_4/assets/icons-DeBis6gG.svg",S=(e="")=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),re=(e,t)=>{if(t.metaType==="favorite")return`
      <button
        type="button"
        class="favorite-meta-btn"
        aria-label="Remove ${S(e.name)} from favorites"
        data-action="${t.onMetaAction}"
        data-exercise-id="${e._id}"
      >
        <svg class="favorite-meta-icon" width="16" height="16" aria-hidden="true">
          <use href="${f}#trash"></use>
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
        <use href="${f}#star_yellow"></use>
      </svg>
    </button>
  `},ne=(e,t={})=>{const a={listItemClassName:"exercises-item",metaType:"rating",onStartAction:"exercise:start",onMetaAction:t.metaType==="favorite"?"favorite-exercise:remove":"exercise:rate",...t};return`
    <li class="${a.listItemClassName}">
      <article class="exercise-card-wrapper" data-exercise-id="${e._id}">
        <div class="exercise-card-content">
          <div class="exercise-card-top">
            <div class="meta-group">
              <span class="workout-span">WORKOUT</span>
              ${re(e,a)}
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
                <use href="${f}#arrow-next-page"></use>
              </svg>
            </button>
          </div>

          <div class="exercise-card-name">
            <div class="human-svg-wrapper" aria-hidden="true">
              <svg class="human-svg">
                <use href="${f}#running_figure_white"></use>
              </svg>
            </div>
            <h3 class="exercise-card-title">${S(e.name)}</h3>
          </div>

          <ul class="exercise-info" aria-label="Exercise details">
            <li class="exercise-info-item">
              <span class="info-label calories">Burned calories:</span>
              <span class="info-value calories">${e.burnedCalories} / ${e.time} min</span>
            </li>
            <li class="exercise-info-item">
              <span class="info-label body-part">Body part:</span>
              <span class="info-value body-part">${S(e.bodyPart)}</span>
            </li>
            <li class="exercise-info-item">
              <span class="info-label target">Target:</span>
              <span class="info-value target">${S(e.target)}</span>
            </li>
          </ul>
        </div>
      </article>
    </li>
  `};async function ie(e){const{data:t}=await g.post("/subscription",{email:e});return t}const oe=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function ce(e,t){return typeof e=="string"?e:e!=null&&e.message?e.message:e!=null&&e.error?e.error:t}function le(){const e=document.querySelector("[data-subscribe-form]");if(!e||e.dataset.subscriptionInitialized==="true")return;e.dataset.subscriptionInitialized="true";const t=e.elements.email,a=e.querySelector(".subscribe-btn");e.addEventListener("submit",async s=>{s.preventDefault();const r=t.value.trim();if(!oe.test(r)){u("Please enter a valid email address."),t.focus();return}P(a,!0);try{const n=await ie(r);G(ce(n,"Subscription successful.")),e.reset()}catch(n){u(de(n))}finally{P(a,!1)}})}function de(e){const{status:t,message:a}=E(e);switch(t){case 400:return a??"Invalid request. Please check your email.";case 404:return a??"Subscription service was not found.";case 409:return a??"This email is already subscribed.";case 500:return a??"Server error. Please try again later.";default:return a??"Something went wrong. Please try again later."}}function P(e,t){e&&(e.disabled=t,e.textContent=t?"Sending...":"Send")}async function ue(e){const{data:t}=await g.get("/exercises",{params:e});return t}const me="Muscles",ge=1,pe=12;async function fe({filter:e=me,page:t=ge,limit:a=pe}={}){const{data:s}=await g.get("/filters",{params:{filter:e,page:t,limit:a}});return s}const ve=5;function j({container:e,page:t,totalPages:a,onPageChange:s}){if(!e)return;const r=Number(t),n=Number(a);if(n<=1){e.innerHTML="",e.classList.add("is-hidden"),e.onclick=null;return}const c=ye(r,n),w=T({direction:"prev",page:r-1,disabled:r===1,label:"Go to previous page"}),$=T({direction:"next",page:r+1,disabled:r===n,label:"Go to next page"}),d=c.map(l=>{if(l==="dots")return'<span class="home-pagination-dots">...</span>';const m=l===r;return`
        <button
          type="button"
          class="home-pagination-btn${m?" is-active":""}"
          data-page="${l}"
          aria-label="Go to page ${l}"
          ${m?'aria-current="page" disabled':""}
        >
          ${l}
        </button>
      `}).join("");e.innerHTML=`${w}${d}${$}`,e.classList.remove("is-hidden"),e.onclick=l=>{const m=l.target.closest("[data-page]");!m||m.disabled||s(Number(m.dataset.page))}}function T({direction:e,page:t,disabled:a,label:s}){return`
    <button
      type="button"
      class="home-pagination-arrow home-pagination-arrow-${e}"
      data-page="${t}"
      aria-label="${s}"
      ${a?"disabled":""}
    >
      <svg class="home-pagination-arrow-icon" width="6" height="12" aria-hidden="true">
        <use href="${f}#pagination-arrow"></use>
      </svg>
    </button>
  `}function ye(e,t){if(t<=ve)return Array.from({length:t},(n,c)=>c+1);const a=[1],s=Math.max(2,e-1),r=Math.min(t-1,e+1);s>2&&a.push("dots");for(let n=s;n<=r;n+=1)a.push(n);return r<t-1&&a.push("dots"),a.push(t),a}const he="Muscles",be={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};let x=he,C=1,v=null,y="";const o={categoriesContainer:document.querySelector(".categories-by-muscles"),categoriesList:document.querySelector(".categories-by-muscles-list"),exercisesContainer:document.querySelector(".exercises"),exercisesList:document.querySelector(".exercises-list"),paginationContainer:document.querySelector("[data-home-pagination]"),searchForm:document.querySelector(".filters-search-form"),filtersSlash:document.querySelector(".filters-slash"),selectedCategory:document.querySelector(".filters-selected-category")};var R;(R=o.categoriesList)==null||R.addEventListener("click",_e);var O;(O=o.searchForm)==null||O.addEventListener("submit",xe);async function k({filter:e=x,page:t=C}={}){x=e,C=t,v=null,y="",H(),Le();const a=Ce(),s=await fe({filter:x,page:C,limit:a});o.categoriesList.innerHTML=Se(s.results),j({container:o.paginationContainer,page:Number(s.page),totalPages:s.totalPages,onPageChange:r=>{k({filter:x,page:r})}})}async function q({page:e=1}={}){if(!v)return;const t=ke(),a={...v,page:e,limit:t};y&&(a.keyword=y);const s=await ue(a),r=s.results??[];we(),o.exercisesList.innerHTML=r.length?r.map(n=>ne(n)).join(""):Ee(),j({container:o.paginationContainer,page:Number(s.page||e),totalPages:s.totalPages,onPageChange:n=>{q({page:n})}})}function _e(e){const t=e.target.closest(".category-card-wrapper");if(!t)return;const{category:a,filter:s}=t.dataset,r=be[s];!r||!a||(v={[r]:a},y="",H(),$e(a),q({page:1}))}function xe(e){var a;if(e.preventDefault(),!v)return;const t=(a=o.searchForm)==null?void 0:a.querySelector("input");y=(t==null?void 0:t.value.trim())??"",q({page:1})}function Se(e){return e.map(({filter:t,name:a,imgURL:s})=>{const r=V(a);return`
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
      `}).join("")}function Ee(){return`
    <li class="exercises-empty">
      No exercises found. Try another keyword.
    </li>
  `}function Le(){var e,t,a,s,r;(e=o.categoriesContainer)==null||e.classList.remove("is-hidden"),(t=o.exercisesContainer)==null||t.classList.add("is-hidden"),(a=o.searchForm)==null||a.classList.add("is-hidden"),(s=o.filtersSlash)==null||s.classList.add("is-hidden"),(r=o.selectedCategory)==null||r.classList.add("is-hidden"),o.selectedCategory&&(o.selectedCategory.textContent="")}function we(){var e,t,a,s,r;(e=o.categoriesContainer)==null||e.classList.add("is-hidden"),(t=o.exercisesContainer)==null||t.classList.remove("is-hidden"),(a=o.searchForm)==null||a.classList.remove("is-hidden"),(s=o.filtersSlash)==null||s.classList.remove("is-hidden"),(r=o.selectedCategory)==null||r.classList.remove("is-hidden")}function $e(e){o.selectedCategory&&(o.selectedCategory.textContent=V(e))}function H(){var t;const e=(t=o.searchForm)==null?void 0:t.querySelector("input");e&&(e.value="")}function Ce(){return window.innerWidth<768?9:12}function ke(){return 10}function V(e){return e.split(" ").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}function qe(){const e=document.querySelectorAll(".filters-btn");e.forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.filter;e.forEach(s=>{s.classList.toggle("is-active",s===t)}),k({filter:a,page:1})})})}function Ae(){const e=document.querySelector("[data-scroll-up]");if(!e)return;const t=()=>{e.classList.toggle("is-visible",window.scrollY>300)};e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),t(),window.addEventListener("scroll",t,{passive:!0})}async function Me(e,t){try{const{result:a}=await g.patch(`/exercises/${e}/rating`,t);return G("Your rating is added successfully!"),a}catch(a){return u(Pe(a)),null}}function Pe(e){const{status:t,message:a}=E(e);switch(t){case 400:return a??"Invalid request. Please check the rating data.";case 404:return a??"Such exercise was not found.";case 409:return a??"This email has already left a rating.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to add the rating."}}async function Te(e){try{const{data:t}=await g.get(`/exercises/${e}`);return t}catch(t){return u(Fe(t)),null}}function Fe(e){const{status:t,message:a}=E(e);switch(t){case 400:return a??"Invalid request. Please check the exercise id.";case 404:return a??"Exercise was not found.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to load the exercise."}}const i={modalExerciceOpenElem:document.querySelector("[data-exercice-modal-open]"),modalRatingOpenElem:null,modalCloseBtn:document.querySelector("[data-modal-close]"),overlay:document.querySelector(".overlay"),modalContainer:document.querySelector(".modal"),modalContent:document.querySelector(".modal_content"),starRatingSelect:null};let h=null,p=null;const F=({name:e,gifUrl:t,rating:a,target:s,bodyPart:r,equipment:n,popularity:c,burnedCalories:w,description:$})=>{const d=Math.round(a);return`<div class="modal_exercice">
    <div class="modal_exercice_img_container">
      <img
        class="modal_exercice_img"
        src="${t}"
        alt="${e}"
      />
    </div>
    <div class="modal_exercice_data_container">
      <h2 class="modal_exercice_title">${e}</h2>
      <div class="modal_exercice_star_raiting_container">
        <p class="modal_exercice_star_rating_number">${a}</p>
        <select class="star-rating" disabled>
           <option value="">Select a rating</option>
           <option value="5" ${d===5?"selected":""}>Excellent</option>
           <option value="4" ${d===4?"selected":""}>Very Good</option>
           <option value="3" ${d===3?"selected":""}>Average</option>
           <option value="2" ${d===2?"selected":""}>Poor</option>
           <option value="1" ${d===1?"selected":""}>Terrible</option>
        </select>
      </div>
      <ul class="modal_exercice_stats_block_list">
        <li class="modal_exercice_stats_block_list_item">
          Target
          <span class="modal_exercice_stats_block_list_item_bold">${s}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Body Part
          <span class="modal_exercice_stats_block_list_item_bold">${r}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Equipment
          <span class="modal_exercice_stats_block_list_item_bold">${n}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Popular
          <span class="modal_exercice_stats_block_list_item_bold">${c}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Burned Calories
          <span class="modal_exercice_stats_block_list_item_bold">${w}</span>
        </li>
      </ul>
      <p class="modal_exercice_description">${$}</p>
      <div class="modal_exercice_btn_container">
        <button class="modal_btn modal_exercice_btn_favorites" type="button">
          Add to favorites
          <svg class="modal_exercice_btn_favorites_icon" width="20" height="20">
            <use href="./img/icons.svg#heart"></use>
          </svg>
        </button>
        <button class="modal_btn modal_exercice_btn_rating" type="button" data-rating-modal-open>
          Give a rating
        </button>
      </div>
    </div>
  </div>`},Re=()=>`<form class="modal_rating">
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
      </form>`,b=async e=>{let t;if(e){const s=e.target.closest(".start-btn");if(!s)return;const r=s.dataset;if(t=r.exerciseId,r.modalType!=="exercice"||!t)return}let a;if(p)a=F(p);else{const s=await Te(t);p=s,a=F(s)}i.modalContent.innerHTML=a,i.overlay.hidden=!1,i.modalContainer.classList.remove("modal-small"),i.modalContainer.classList.add("modal-large"),h="exercice",requestAnimationFrame(()=>{new U(".star-rating",{clearable:!1,maxStars:5}).rebuild()}),i.modalRatingOpenElem=document.querySelector("[data-rating-modal-open]"),i.modalRatingOpenElem.addEventListener("click",Z)},Z=()=>{i.overlay.hidden=!1,i.modalContainer.classList.remove("modal-large"),i.modalContainer.classList.add("modal-small"),h="rating";const e=Re();i.modalContent.innerHTML=e,requestAnimationFrame(()=>{new U(".star-rating-active",{clearable:!1,maxStars:5}).rebuild()}),i.modalRatingOpenElem.removeEventListener("click",Z),i.starRatingSelect=document.querySelector(".star-rating-active"),i.starRatingSelect.addEventListener("change",L)},A=()=>{if(h==="rating"){i.starRatingSelect.removeEventListener("change",L),b();return}i.overlay.hidden=!0},Oe=e=>{if(e.target===i.overlay){if(h==="rating"){i.starRatingSelect.removeEventListener("change",L),b();return}A()}},Ie=e=>{if(e.key==="Escape"){if(h==="rating"){i.starRatingSelect.removeEventListener("change",L),b();return}A()}},L=e=>{const t=e.target.value,a=i.modalContent.querySelector(".modal_rating_star_rating_number");a.textContent=`${t}.0`},De=async e=>{e.preventDefault(),p||u("Excercice is not found. Please, try one more time.");const t=new FormData(e.target),a={rate:Number(t.get("rate")),email:t.get("email"),review:t.get("review")};if(Object.values(a).some(s=>!s)){u("Please make sure that you had filled in all the values.");return}await Me(p._id,a),b()};var I;(I=i.modalExerciceOpenElem)==null||I.addEventListener("click",b);var D;(D=i.modalCloseBtn)==null||D.addEventListener("click",A);var B;(B=i.overlay)==null||B.addEventListener("click",Oe);var N;(N=i.modalContent)==null||N.addEventListener("submit",De);document.addEventListener("keydown",Ie);qe();k();le();ae();Ae();export{ee as S,te as g,le as i,ne as r};
//# sourceMappingURL=main-BhxTWYGV.js.map
