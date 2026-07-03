var j=Object.defineProperty;var Z=(e,t,a)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var _=(e,t,a)=>Z(e,typeof t!="symbol"?t+"":t,a);import{i as I,a as K,S as z}from"./vendor-Ht0x2cLd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();function Q(){const e=document.querySelector("[data-menu]"),t=document.querySelector("[data-menu-open]"),a=document.querySelector("[data-menu-close]"),s=document.querySelectorAll("[data-nav-link]");if(W(s),!e||!t||!a||e.dataset.headerInitialized==="true")return;e.dataset.headerInitialized="true",e.setAttribute("inert","");const r=()=>{e.classList.add("is-open"),e.removeAttribute("aria-hidden"),e.removeAttribute("inert"),t.setAttribute("aria-expanded","true"),document.body.classList.add("menu-open"),a.focus()},n=()=>{e.classList.contains("is-open")&&(e.contains(document.activeElement)&&t.focus(),e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"),e.setAttribute("inert",""),t.setAttribute("aria-expanded","false"),document.body.classList.remove("menu-open"))};t.addEventListener("click",r),a.addEventListener("click",n),e.addEventListener("click",c=>{c.target.closest("a")&&n()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&n()}),window.addEventListener("resize",()=>{window.matchMedia("(min-width: 768px)").matches&&n()})}function W(e){const a=window.location.pathname.includes("favorites")?"favorites":"home";e.forEach(s=>{const r=s.dataset.navLink===a;s.classList.toggle("is-active",r),r?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current")})}Q();const p=e=>{I.error({message:e,position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",icon:""})},Y=e=>{I.success({message:e,position:"topRight",backgroundColor:"#088b57",messageColor:"#fff",icon:""})},h=K.create({baseURL:"https://your-energy.b.goit.study/api",headers:{Accept:"application/json"}});async function J(){const{data:e}=await h.get("/quote");return e}class X{constructor(t,a=localStorage){_(this,"load",t=>{try{const a=this.storage.getItem(this.key);return a===null?t:JSON.parse(a)}catch(a){return console.error(`Failed to read data from localStorage by key "${this.key}"`,a),t}});_(this,"save",t=>{try{return this.storage.setItem(this.key,JSON.stringify(t)),!0}catch(a){return console.error(`Failed to save data to localStorage by key "${this.key}"`,a),!1}});_(this,"remove",()=>{try{return this.storage.removeItem(this.key),!0}catch(t){return console.error(`Failed to remove data from localStorage by key "${this.key}"`,t),!1}});this.key=t,this.storage=a}}function C(e){var t,a,s;return{status:(t=e==null?void 0:e.response)==null?void 0:t.status,message:(s=(a=e==null?void 0:e.response)==null?void 0:a.data)==null?void 0:s.message}}const A=new X("quote-of-the-day");async function ee(){try{const e=new Date().toISOString().slice(0,10),t=A.load(null);if((t==null?void 0:t.date)===e&&(t!=null&&t.quote))return t.quote;const a=await J();return A.save({date:e,quote:a}),a}catch(e){return p(ae(e)),null}}async function te(){const e=document.querySelector("[data-quote-text]"),t=document.querySelector("[data-quote-author]"),a=document.querySelector("[data-quote-author-link]");if(!e||!t)return;const s=await ee();!(s!=null&&s.quote)||!(s!=null&&s.author)||(e.textContent=s.quote,t.textContent=s.author,a&&(a.href=`https://www.google.com/search?q=${encodeURIComponent(s.author)}`))}function ae(e){const{status:t,message:a}=C(e);switch(t){case 404:return a??"Quote of the day was not found.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to load the quote of the day."}}const S=(e="")=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),se=(e,t)=>{if(t.metaType==="favorite")return`
      <button
        type="button"
        class="favorite-meta-btn"
        aria-label="Remove ${S(e.name)} from favorites"
        data-action="${t.onMetaAction}"
        data-exercise-id="${e._id}"
      >
        <svg class="favorite-meta-icon" width="16" height="16" aria-hidden="true">
          <use href="./img/icons.svg#trash"></use>
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
        <use href="./img/icons.svg#star_yellow"></use>
      </svg>
    </button>
  `},re=(e,t={})=>{const a={listItemClassName:"exercises-item",metaType:"rating",onStartAction:"exercise:start",onMetaAction:t.metaType==="favorite"?"favorite-exercise:remove":"exercise:rate",...t};return`
    <li class="${a.listItemClassName}">
      <article class="exercise-card-wrapper" data-exercise-id="${e._id}">
        <div class="exercise-card-content">
          <div class="exercise-card-top">
            <div class="meta-group">
              <span class="workout-span">WORKOUT</span>
              ${se(e,a)}
            </div>

            <button
              type="button"
              class="start-btn"
              data-action="${a.onStartAction}"
              data-exercise-id="${e._id}"
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
  `};async function ne(e){const{data:t}=await h.get("/exercises",{params:e});return t}const ie="Muscles",oe=1,ce=12;async function le({filter:e=ie,page:t=oe,limit:a=ce}={}){const{data:s}=await h.get("/filters",{params:{filter:e,page:t,limit:a}});return s}const de=5;function U({container:e,page:t,totalPages:a,onPageChange:s}){if(!e)return;const r=Number(t),n=Number(a);if(n<=1){e.innerHTML="",e.classList.add("is-hidden"),e.onclick=null;return}const c=ue(r,n),l=M({direction:"prev",page:r-1,disabled:r===1,label:"Go to previous page"}),m=M({direction:"next",page:r+1,disabled:r===n,label:"Go to next page"}),d=c.map(u=>{if(u==="dots")return'<span class="home-pagination-dots">...</span>';const g=u===r;return`
        <button
          type="button"
          class="home-pagination-btn${g?" is-active":""}"
          data-page="${u}"
          aria-label="Go to page ${u}"
          ${g?'aria-current="page" disabled':""}
        >
          ${u}
        </button>
      `}).join("");e.innerHTML=`${l}${d}${m}`,e.classList.remove("is-hidden"),e.onclick=u=>{const g=u.target.closest("[data-page]");!g||g.disabled||s(Number(g.dataset.page))}}function M({direction:e,page:t,disabled:a,label:s}){return`
    <button
      type="button"
      class="home-pagination-arrow home-pagination-arrow-${e}"
      data-page="${t}"
      aria-label="${s}"
      ${a?"disabled":""}
    >
      <svg class="home-pagination-arrow-icon" width="6" height="12" aria-hidden="true">
        <use href="./img/icons.svg#pagination-arrow"></use>
      </svg>
    </button>
  `}function ue(e,t){if(t<=de)return Array.from({length:t},(n,c)=>c+1);const a=[1],s=Math.max(2,e-1),r=Math.min(t-1,e+1);s>2&&a.push("dots");for(let n=s;n<=r;n+=1)a.push(n);return r<t-1&&a.push("dots"),a.push(t),a}const me="Muscles",ge={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};let x=me,w=1,f=null,v="";const o={categoriesContainer:document.querySelector(".categories-by-muscles"),categoriesList:document.querySelector(".categories-by-muscles-list"),exercisesContainer:document.querySelector(".exercises"),exercisesList:document.querySelector(".exercises-list"),paginationContainer:document.querySelector("[data-home-pagination]"),searchForm:document.querySelector(".filters-search-form"),filtersSlash:document.querySelector(".filters-slash"),selectedCategory:document.querySelector(".filters-selected-category")};var R;(R=o.categoriesList)==null||R.addEventListener("click",pe);var F;(F=o.searchForm)==null||F.addEventListener("submit",fe);async function $({filter:e=x,page:t=w}={}){x=e,w=t,f=null,v="",G(),ye();const a=xe(),s=await le({filter:x,page:w,limit:a});o.categoriesList.innerHTML=ve(s.results),U({container:o.paginationContainer,page:Number(s.page),totalPages:s.totalPages,onPageChange:r=>{$({filter:x,page:r})}})}async function k({page:e=1}={}){if(!f)return;const t=Se(),a={...f,page:e,limit:t};v&&(a.keyword=v);const s=await ne(a),r=s.results??[];be(),o.exercisesList.innerHTML=r.length?r.map(n=>re(n)).join(""):he(),U({container:o.paginationContainer,page:Number(s.page||e),totalPages:s.totalPages,onPageChange:n=>{k({page:n})}})}function pe(e){const t=e.target.closest(".category-card-wrapper");if(!t)return;const{category:a,filter:s}=t.dataset,r=ge[s];!r||!a||(f={[r]:a},v="",G(),_e(a),k({page:1}))}function fe(e){var a;if(e.preventDefault(),!f)return;const t=(a=o.searchForm)==null?void 0:a.querySelector("input");v=(t==null?void 0:t.value.trim())??"",k({page:1})}function ve(e){return e.map(({filter:t,name:a,imgURL:s})=>{const r=H(a);return`
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
      `}).join("")}function he(){return`
    <li class="exercises-empty">
      No exercises found. Try another keyword.
    </li>
  `}function ye(){var e,t,a,s,r;(e=o.categoriesContainer)==null||e.classList.remove("is-hidden"),(t=o.exercisesContainer)==null||t.classList.add("is-hidden"),(a=o.searchForm)==null||a.classList.add("is-hidden"),(s=o.filtersSlash)==null||s.classList.add("is-hidden"),(r=o.selectedCategory)==null||r.classList.add("is-hidden"),o.selectedCategory&&(o.selectedCategory.textContent="")}function be(){var e,t,a,s,r;(e=o.categoriesContainer)==null||e.classList.add("is-hidden"),(t=o.exercisesContainer)==null||t.classList.remove("is-hidden"),(a=o.searchForm)==null||a.classList.remove("is-hidden"),(s=o.filtersSlash)==null||s.classList.remove("is-hidden"),(r=o.selectedCategory)==null||r.classList.remove("is-hidden")}function _e(e){o.selectedCategory&&(o.selectedCategory.textContent=H(e))}function G(){var t;const e=(t=o.searchForm)==null?void 0:t.querySelector("input");e&&(e.value="")}function xe(){return window.innerWidth<768?9:12}function Se(){return 10}function H(e){return e.split(" ").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}function Ee(){const e=document.querySelectorAll(".filters-btn");e.forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.filter;e.forEach(s=>{s.classList.toggle("is-active",s===t)}),$({filter:a,page:1})})})}async function we(e){const{data:t}=await h.post("/subscription",{email:e});return t}const Le=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function T(e,t){return typeof e=="string"?e:e!=null&&e.message?e.message:e!=null&&e.error?e.error:t}function Ce(){const e=document.querySelector("[data-subscribe-form]");if(!e)return;const t=e.elements.email,a=e.querySelector(".subscribe-btn");e.addEventListener("submit",async s=>{var n,c;s.preventDefault();const r=t.value.trim();if(!Le.test(r)){p($e("Please enter a valid email address.")),t.focus();return}P(a,!0);try{const l=await we(r);iziToast.success({title:"Success",message:T(l,"Subscription successful."),position:"topRight"}),e.reset()}catch(l){const m=(n=l==null?void 0:l.response)==null?void 0:n.status,d=T((c=l==null?void 0:l.response)==null?void 0:c.data,"Something went wrong. Please try again later.");iziToast[m===409?"warning":"error"]({title:m===409?"Warning":"Error",message:d,position:"topRight"})}finally{P(a,!1)}})}function $e(e){const{status:t,message:a}=C(e);switch(t){case 400:return a??"Invalid request. Please check your email.";case 404:return a??"Subscription service was not found.";case 409:return a??"This email is already subscribed.";case 500:return a??"Server error. Please try again later.";default:return a??"Something went wrong. Please try again later."}}function P(e,t){e.disabled=t,e.textContent=t?"Sending...":"Send"}function ke(){const e=document.querySelector("[data-scroll-up]");if(!e)return;const t=()=>{e.classList.toggle("is-visible",window.scrollY>300)};e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),t(),window.addEventListener("scroll",t,{passive:!0})}async function qe(e,t){try{const{result:a}=await h.patch(`/exercises/${e}/rating`,t);return Y("Your rating is added successfully!"),a}catch(a){return p(Ae(a)),null}}function Ae(e){const{status:t,message:a}=C(e);switch(t){case 400:return a??"Invalid request. Please check the rating data.";case 404:return a??"Such exercise was not found.";case 409:return a??"This email has already left a rating.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to add the rating."}}const i={modalExerciceOpenElem:document.querySelector("[data-exercice-modal-open]"),modalRatingOpenElem:null,modalCloseBtn:document.querySelector("[data-modal-close]"),overlay:document.querySelector(".overlay"),modalContainer:document.querySelector(".modal"),modalContent:document.querySelector(".modal_content"),starRatingSelect:null};let y=null,L={_id:"64f389465ae26083f39b17a2",bodyPart:"waist",equipment:"body weight",gifUrl:"https://ftp.goit.study/img/power-pulse/gifs/0001.gif",name:"3/4 sit-up",target:"abs",description:"This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",rating:3.72,burnedCalories:220,popularity:34157};const Me=({name:e,gifUrl:t,rating:a,target:s,bodyPart:r,equipment:n,popularity:c,burnedCalories:l,description:m})=>{const d=Math.round(a);return`<div class="modal_exercice">
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
          <span class="modal_exercice_stats_block_list_item_bold">${l}</span>
        </li>
      </ul>
      <p class="modal_exercice_description">${m}</p>
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
  </div>`},Te=()=>`<form class="modal_rating">
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
      </form>`,b=e=>{if(e&&e.target.dataset.modalType!=="exercice")return;i.overlay.hidden=!1,i.modalContainer.classList.remove("modal-small"),i.modalContainer.classList.add("modal-large"),y="exercice";const t=Me(L);i.modalContent.innerHTML=t,requestAnimationFrame(()=>{new z(".star-rating",{clearable:!1,maxStars:5}).rebuild()}),i.modalRatingOpenElem=document.querySelector("[data-rating-modal-open]"),i.modalRatingOpenElem.addEventListener("click",V)},V=()=>{i.overlay.hidden=!1,i.modalContainer.classList.remove("modal-large"),i.modalContainer.classList.add("modal-small"),y="rating";const e=Te();i.modalContent.innerHTML=e,requestAnimationFrame(()=>{new z(".star-rating-active",{clearable:!1,maxStars:5}).rebuild()}),i.modalRatingOpenElem.removeEventListener("click",V),i.starRatingSelect=document.querySelector(".star-rating-active"),i.starRatingSelect.addEventListener("change",E)},q=()=>{if(y==="rating"){i.starRatingSelect.removeEventListener("change",E),b();return}i.overlay.hidden=!0},Pe=e=>{if(e.target===i.overlay){if(y==="rating"){i.starRatingSelect.removeEventListener("change",E),b();return}q()}},Re=e=>{if(e.key==="Escape"){if(y==="rating"){i.starRatingSelect.removeEventListener("change",E),b();return}q()}},E=e=>{const t=e.target.value,a=i.modalContent.querySelector(".modal_rating_star_rating_number");a.textContent=`${t}.0`},Fe=async e=>{e.preventDefault(),L||p("Excercice is not found. Please, try one more time.");const t=new FormData(e.target),a={rate:Number(t.get("rate")),email:t.get("email"),review:t.get("review")};if(Object.values(a).some(s=>!s)){p("Please make sure that you had filled in all the values.");return}await qe(L._id,a),b()};var O;(O=i.modalExerciceOpenElem)==null||O.addEventListener("click",b);var D;(D=i.modalCloseBtn)==null||D.addEventListener("click",q);var N;(N=i.overlay)==null||N.addEventListener("click",Pe);var B;(B=i.modalContent)==null||B.addEventListener("submit",Fe);document.addEventListener("keydown",Re);Ee();$();Ce();te();ke();export{X as S,ee as g,re as r};
//# sourceMappingURL=main-2yq6Q7LX.js.map
