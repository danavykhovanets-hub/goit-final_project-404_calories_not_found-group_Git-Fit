var Z=Object.defineProperty;var K=(e,t,a)=>t in e?Z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var x=(e,t,a)=>K(e,typeof t!="symbol"?t+"":t,a);import{i as z,a as Q,S as U}from"./vendor-Ht0x2cLd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();function W(){const e=document.querySelector("[data-menu]"),t=document.querySelector("[data-menu-open]"),a=document.querySelector("[data-menu-close]"),s=document.querySelectorAll("[data-nav-link]");if(Y(s),!e||!t||!a||e.dataset.headerInitialized==="true")return;e.dataset.headerInitialized="true",e.setAttribute("inert","");const r=()=>{e.classList.add("is-open"),e.removeAttribute("aria-hidden"),e.removeAttribute("inert"),t.setAttribute("aria-expanded","true"),document.body.classList.add("menu-open"),a.focus()},n=()=>{e.classList.contains("is-open")&&(e.contains(document.activeElement)&&t.focus(),e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"),e.setAttribute("inert",""),t.setAttribute("aria-expanded","false"),document.body.classList.remove("menu-open"))};t.addEventListener("click",r),a.addEventListener("click",n),e.addEventListener("click",c=>{c.target.closest("a")&&n()}),document.addEventListener("keydown",c=>{c.key==="Escape"&&n()}),window.addEventListener("resize",()=>{window.matchMedia("(min-width: 768px)").matches&&n()})}function Y(e){const a=window.location.pathname.includes("favorites")?"favorites":"home";e.forEach(s=>{const r=s.dataset.navLink===a;s.classList.toggle("is-active",r),r?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current")})}W();const p=e=>{z.error({message:e,position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",icon:""})},J=e=>{z.success({message:e,position:"topRight",backgroundColor:"#088b57",messageColor:"#fff",icon:""})},y=Q.create({baseURL:"https://your-energy.b.goit.study/api",headers:{Accept:"application/json"}});async function X(){const{data:e}=await y.get("/quote");return e}class ee{constructor(t,a=localStorage){x(this,"load",t=>{try{const a=this.storage.getItem(this.key);return a===null?t:JSON.parse(a)}catch(a){return console.error(`Failed to read data from localStorage by key "${this.key}"`,a),t}});x(this,"save",t=>{try{return this.storage.setItem(this.key,JSON.stringify(t)),!0}catch(a){return console.error(`Failed to save data to localStorage by key "${this.key}"`,a),!1}});x(this,"remove",()=>{try{return this.storage.removeItem(this.key),!0}catch(t){return console.error(`Failed to remove data from localStorage by key "${this.key}"`,t),!1}});this.key=t,this.storage=a}}function C(e){var t,a,s;return{status:(t=e==null?void 0:e.response)==null?void 0:t.status,message:(s=(a=e==null?void 0:e.response)==null?void 0:a.data)==null?void 0:s.message}}const M=new ee("quote-of-the-day");async function te(){try{const e=new Date().toISOString().slice(0,10),t=M.load(null);if((t==null?void 0:t.date)===e&&(t!=null&&t.quote))return t.quote;const a=await X();return M.save({date:e,quote:a}),a}catch(e){return p(se(e)),null}}async function ae(){const e=document.querySelector("[data-quote-text]"),t=document.querySelector("[data-quote-author]"),a=document.querySelector("[data-quote-author-link]");if(!e||!t)return;const s=await te();!(s!=null&&s.quote)||!(s!=null&&s.author)||(e.textContent=s.quote,t.textContent=s.author,a&&(a.href=`https://www.google.com/search?q=${encodeURIComponent(s.author)}`))}function se(e){const{status:t,message:a}=C(e);switch(t){case 404:return a??"Quote of the day was not found.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to load the quote of the day."}}const f="/goit-advancedjs-finalproject-group_4/assets/icons-DeBis6gG.svg",E=(e="")=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),re=(e,t)=>{if(t.metaType==="favorite")return`
      <button
        type="button"
        class="favorite-meta-btn"
        aria-label="Remove ${E(e.name)} from favorites"
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
            <h3 class="exercise-card-title">${E(e.name)}</h3>
          </div>

          <ul class="exercise-info" aria-label="Exercise details">
            <li class="exercise-info-item">
              <span class="info-label calories">Burned calories:</span>
              <span class="info-value calories">${e.burnedCalories} / ${e.time} min</span>
            </li>
            <li class="exercise-info-item">
              <span class="info-label body-part">Body part:</span>
              <span class="info-value body-part">${E(e.bodyPart)}</span>
            </li>
            <li class="exercise-info-item">
              <span class="info-label target">Target:</span>
              <span class="info-value target">${E(e.target)}</span>
            </li>
          </ul>
        </div>
      </article>
    </li>
  `};async function ie(e){const{data:t}=await y.get("/exercises",{params:e});return t}const oe="Muscles",ce=1,le=12;async function de({filter:e=oe,page:t=ce,limit:a=le}={}){const{data:s}=await y.get("/filters",{params:{filter:e,page:t,limit:a}});return s}const ue=5;function G({container:e,page:t,totalPages:a,onPageChange:s}){if(!e)return;const r=Number(t),n=Number(a);if(n<=1){e.innerHTML="",e.classList.add("is-hidden"),e.onclick=null;return}const c=me(r,n),l=T({direction:"prev",page:r-1,disabled:r===1,label:"Go to previous page"}),m=T({direction:"next",page:r+1,disabled:r===n,label:"Go to next page"}),d=c.map(u=>{if(u==="dots")return'<span class="home-pagination-dots">...</span>';const g=u===r;return`
        <button
          type="button"
          class="home-pagination-btn${g?" is-active":""}"
          data-page="${u}"
          aria-label="Go to page ${u}"
          ${g?'aria-current="page" disabled':""}
        >
          ${u}
        </button>
      `}).join("");e.innerHTML=`${l}${d}${m}`,e.classList.remove("is-hidden"),e.onclick=u=>{const g=u.target.closest("[data-page]");!g||g.disabled||s(Number(g.dataset.page))}}function T({direction:e,page:t,disabled:a,label:s}){return`
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
  `}function me(e,t){if(t<=ue)return Array.from({length:t},(n,c)=>c+1);const a=[1],s=Math.max(2,e-1),r=Math.min(t-1,e+1);s>2&&a.push("dots");for(let n=s;n<=r;n+=1)a.push(n);return r<t-1&&a.push("dots"),a.push(t),a}const ge="Muscles",pe={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};let S=ge,L=1,v=null,h="";const o={categoriesContainer:document.querySelector(".categories-by-muscles"),categoriesList:document.querySelector(".categories-by-muscles-list"),exercisesContainer:document.querySelector(".exercises"),exercisesList:document.querySelector(".exercises-list"),paginationContainer:document.querySelector("[data-home-pagination]"),searchForm:document.querySelector(".filters-search-form"),filtersSlash:document.querySelector(".filters-slash"),selectedCategory:document.querySelector(".filters-selected-category")};var F;(F=o.categoriesList)==null||F.addEventListener("click",fe);var O;(O=o.searchForm)==null||O.addEventListener("submit",ve);async function k({filter:e=S,page:t=L}={}){S=e,L=t,v=null,h="",j(),be();const a=Se(),s=await de({filter:S,page:L,limit:a});o.categoriesList.innerHTML=he(s.results),G({container:o.paginationContainer,page:Number(s.page),totalPages:s.totalPages,onPageChange:r=>{k({filter:S,page:r})}})}async function q({page:e=1}={}){if(!v)return;const t=Ee(),a={...v,page:e,limit:t};h&&(a.keyword=h);const s=await ie(a),r=s.results??[];_e(),o.exercisesList.innerHTML=r.length?r.map(n=>ne(n)).join(""):ye(),G({container:o.paginationContainer,page:Number(s.page||e),totalPages:s.totalPages,onPageChange:n=>{q({page:n})}})}function fe(e){const t=e.target.closest(".category-card-wrapper");if(!t)return;const{category:a,filter:s}=t.dataset,r=pe[s];!r||!a||(v={[r]:a},h="",j(),xe(a),q({page:1}))}function ve(e){var a;if(e.preventDefault(),!v)return;const t=(a=o.searchForm)==null?void 0:a.querySelector("input");h=(t==null?void 0:t.value.trim())??"",q({page:1})}function he(e){return e.map(({filter:t,name:a,imgURL:s})=>{const r=H(a);return`
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
      `}).join("")}function ye(){return`
    <li class="exercises-empty">
      No exercises found. Try another keyword.
    </li>
  `}function be(){var e,t,a,s,r;(e=o.categoriesContainer)==null||e.classList.remove("is-hidden"),(t=o.exercisesContainer)==null||t.classList.add("is-hidden"),(a=o.searchForm)==null||a.classList.add("is-hidden"),(s=o.filtersSlash)==null||s.classList.add("is-hidden"),(r=o.selectedCategory)==null||r.classList.add("is-hidden"),o.selectedCategory&&(o.selectedCategory.textContent="")}function _e(){var e,t,a,s,r;(e=o.categoriesContainer)==null||e.classList.add("is-hidden"),(t=o.exercisesContainer)==null||t.classList.remove("is-hidden"),(a=o.searchForm)==null||a.classList.remove("is-hidden"),(s=o.filtersSlash)==null||s.classList.remove("is-hidden"),(r=o.selectedCategory)==null||r.classList.remove("is-hidden")}function xe(e){o.selectedCategory&&(o.selectedCategory.textContent=H(e))}function j(){var t;const e=(t=o.searchForm)==null?void 0:t.querySelector("input");e&&(e.value="")}function Se(){return window.innerWidth<768?9:12}function Ee(){return 10}function H(e){return e.split(" ").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}function we(){const e=document.querySelectorAll(".filters-btn");e.forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.filter;e.forEach(s=>{s.classList.toggle("is-active",s===t)}),k({filter:a,page:1})})})}async function Le(e){const{data:t}=await y.post("/subscription",{email:e});return t}const $e=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function P(e,t){return typeof e=="string"?e:e!=null&&e.message?e.message:e!=null&&e.error?e.error:t}function Ce(){const e=document.querySelector("[data-subscribe-form]");if(!e)return;const t=e.elements.email,a=e.querySelector(".subscribe-btn");e.addEventListener("submit",async s=>{var n,c;s.preventDefault();const r=t.value.trim();if(!$e.test(r)){p(ke("Please enter a valid email address.")),t.focus();return}R(a,!0);try{const l=await Le(r);iziToast.success({title:"Success",message:P(l,"Subscription successful."),position:"topRight"}),e.reset()}catch(l){const m=(n=l==null?void 0:l.response)==null?void 0:n.status,d=P((c=l==null?void 0:l.response)==null?void 0:c.data,"Something went wrong. Please try again later.");iziToast[m===409?"warning":"error"]({title:m===409?"Warning":"Error",message:d,position:"topRight"})}finally{R(a,!1)}})}function ke(e){const{status:t,message:a}=C(e);switch(t){case 400:return a??"Invalid request. Please check your email.";case 404:return a??"Subscription service was not found.";case 409:return a??"This email is already subscribed.";case 500:return a??"Server error. Please try again later.";default:return a??"Something went wrong. Please try again later."}}function R(e,t){e.disabled=t,e.textContent=t?"Sending...":"Send"}function qe(){const e=document.querySelector("[data-scroll-up]");if(!e)return;const t=()=>{e.classList.toggle("is-visible",window.scrollY>300)};e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),t(),window.addEventListener("scroll",t,{passive:!0})}async function Ae(e,t){try{const{result:a}=await y.patch(`/exercises/${e}/rating`,t);return J("Your rating is added successfully!"),a}catch(a){return p(Me(a)),null}}function Me(e){const{status:t,message:a}=C(e);switch(t){case 400:return a??"Invalid request. Please check the rating data.";case 404:return a??"Such exercise was not found.";case 409:return a??"This email has already left a rating.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to add the rating."}}const i={modalExerciceOpenElem:document.querySelector("[data-exercice-modal-open]"),modalRatingOpenElem:null,modalCloseBtn:document.querySelector("[data-modal-close]"),overlay:document.querySelector(".overlay"),modalContainer:document.querySelector(".modal"),modalContent:document.querySelector(".modal_content"),starRatingSelect:null};let b=null,$={_id:"64f389465ae26083f39b17a2",bodyPart:"waist",equipment:"body weight",gifUrl:"https://ftp.goit.study/img/power-pulse/gifs/0001.gif",name:"3/4 sit-up",target:"abs",description:"This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",rating:3.72,burnedCalories:220,popularity:34157};const Te=({name:e,gifUrl:t,rating:a,target:s,bodyPart:r,equipment:n,popularity:c,burnedCalories:l,description:m})=>{const d=Math.round(a);return`<div class="modal_exercice">
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
  </div>`},Pe=()=>`<form class="modal_rating">
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
      </form>`,_=e=>{if(e&&e.target.dataset.modalType!=="exercice")return;i.overlay.hidden=!1,i.modalContainer.classList.remove("modal-small"),i.modalContainer.classList.add("modal-large"),b="exercice";const t=Te($);i.modalContent.innerHTML=t,requestAnimationFrame(()=>{new U(".star-rating",{clearable:!1,maxStars:5}).rebuild()}),i.modalRatingOpenElem=document.querySelector("[data-rating-modal-open]"),i.modalRatingOpenElem.addEventListener("click",V)},V=()=>{i.overlay.hidden=!1,i.modalContainer.classList.remove("modal-large"),i.modalContainer.classList.add("modal-small"),b="rating";const e=Pe();i.modalContent.innerHTML=e,requestAnimationFrame(()=>{new U(".star-rating-active",{clearable:!1,maxStars:5}).rebuild()}),i.modalRatingOpenElem.removeEventListener("click",V),i.starRatingSelect=document.querySelector(".star-rating-active"),i.starRatingSelect.addEventListener("change",w)},A=()=>{if(b==="rating"){i.starRatingSelect.removeEventListener("change",w),_();return}i.overlay.hidden=!0},Re=e=>{if(e.target===i.overlay){if(b==="rating"){i.starRatingSelect.removeEventListener("change",w),_();return}A()}},Fe=e=>{if(e.key==="Escape"){if(b==="rating"){i.starRatingSelect.removeEventListener("change",w),_();return}A()}},w=e=>{const t=e.target.value,a=i.modalContent.querySelector(".modal_rating_star_rating_number");a.textContent=`${t}.0`},Oe=async e=>{e.preventDefault(),$||p("Excercice is not found. Please, try one more time.");const t=new FormData(e.target),a={rate:Number(t.get("rate")),email:t.get("email"),review:t.get("review")};if(Object.values(a).some(s=>!s)){p("Please make sure that you had filled in all the values.");return}await Ae($._id,a),_()};var D;(D=i.modalExerciceOpenElem)==null||D.addEventListener("click",_);var B;(B=i.modalCloseBtn)==null||B.addEventListener("click",A);var N;(N=i.overlay)==null||N.addEventListener("click",Re);var I;(I=i.modalContent)==null||I.addEventListener("submit",Oe);document.addEventListener("keydown",Fe);we();k();Ce();ae();qe();export{ee as S,te as g,ne as r};
//# sourceMappingURL=main-3vjXzRY1.js.map
