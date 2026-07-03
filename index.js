import{i as h,r as N,a as v,p as D,b as V,c as H}from"./assets/render-exercise-card-C17hVeW5.js";import{S as B}from"./assets/vendor-Ht0x2cLd.js";async function I(e){const{data:t}=await h.get("/exercises",{params:e});return t}const Z="Muscles",j=1,Y=12;async function K({filter:e=Z,page:t=j,limit:a=Y}={}){const{data:s}=await h.get("/filters",{params:{filter:e,page:t,limit:a}});return s}const W=5;function O({container:e,page:t,totalPages:a,onPageChange:s}){if(!e)return;const r=Number(t),o=Number(a);if(o<=1){e.innerHTML="",e.classList.add("is-hidden"),e.onclick=null;return}const d=Q(r,o),c=$({direction:"prev",page:r-1,disabled:r===1,label:"Go to previous page"}),m=$({direction:"next",page:r+1,disabled:r===o,label:"Go to next page"}),l=d.map(u=>{if(u==="dots")return'<span class="home-pagination-dots">...</span>';const g=u===r;return`
        <button
          type="button"
          class="home-pagination-btn${g?" is-active":""}"
          data-page="${u}"
          aria-label="Go to page ${u}"
          ${g?'aria-current="page" disabled':""}
        >
          ${u}
        </button>
      `}).join("");e.innerHTML=`${c}${l}${m}`,e.classList.remove("is-hidden"),e.onclick=u=>{const g=u.target.closest("[data-page]");!g||g.disabled||s(Number(g.dataset.page))}}function $({direction:e,page:t,disabled:a,label:s}){return`
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
  `}function Q(e,t){if(t<=W)return Array.from({length:t},(o,d)=>d+1);const a=[1],s=Math.max(2,e-1),r=Math.min(t-1,e+1);s>2&&a.push("dots");for(let o=s;o<=r;o+=1)a.push(o);return r<t-1&&a.push("dots"),a.push(t),a}const X="Muscles",J={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};let b=X,E=1,p=null,_="";const i={categoriesContainer:document.querySelector(".categories-by-muscles"),categoriesList:document.querySelector(".categories-by-muscles-list"),exercisesContainer:document.querySelector(".exercises"),exercisesList:document.querySelector(".exercises-list"),paginationContainer:document.querySelector("[data-home-pagination]"),searchForm:document.querySelector(".filters-search-form"),filtersSlash:document.querySelector(".filters-slash"),selectedCategory:document.querySelector(".filters-selected-category")};var T;(T=i.categoriesList)==null||T.addEventListener("click",ee);var q;(q=i.searchForm)==null||q.addEventListener("submit",te);async function L({filter:e=b,page:t=E}={}){b=e,E=t,p=null,_="",U(),re();const a=oe(),s=await K({filter:b,page:E,limit:a});i.categoriesList.innerHTML=ae(s.results),O({container:i.paginationContainer,page:Number(s.page),totalPages:s.totalPages,onPageChange:r=>{L({filter:b,page:r})}})}async function w({page:e=1}={}){if(!p)return;const t=ce(),a={...p,page:e,limit:t};_&&(a.keyword=_);const s=await I(a),r=s.results??[];ne(),i.exercisesList.innerHTML=r.length?r.map(o=>N(o)).join(""):se(),O({container:i.paginationContainer,page:Number(s.page||e),totalPages:s.totalPages,onPageChange:o=>{w({page:o})}})}function ee(e){const t=e.target.closest(".category-card-wrapper");if(!t)return;const{category:a,filter:s}=t.dataset,r=J[s];!r||!a||(p={[r]:a},_="",U(),ie(a),w({page:1}))}function te(e){var a;if(e.preventDefault(),!p)return;const t=(a=i.searchForm)==null?void 0:a.querySelector("input");_=(t==null?void 0:t.value.trim())??"",w({page:1})}function ae(e){return e.map(({filter:t,name:a,imgURL:s})=>{const r=z(a);return`
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
      `}).join("")}function se(){return`
    <li class="exercises-empty">
      No exercises found. Try another keyword.
    </li>
  `}function re(){var e,t,a,s,r;(e=i.categoriesContainer)==null||e.classList.remove("is-hidden"),(t=i.exercisesContainer)==null||t.classList.add("is-hidden"),(a=i.searchForm)==null||a.classList.add("is-hidden"),(s=i.filtersSlash)==null||s.classList.add("is-hidden"),(r=i.selectedCategory)==null||r.classList.add("is-hidden"),i.selectedCategory&&(i.selectedCategory.textContent="")}function ne(){var e,t,a,s,r;(e=i.categoriesContainer)==null||e.classList.add("is-hidden"),(t=i.exercisesContainer)==null||t.classList.remove("is-hidden"),(a=i.searchForm)==null||a.classList.remove("is-hidden"),(s=i.filtersSlash)==null||s.classList.remove("is-hidden"),(r=i.selectedCategory)==null||r.classList.remove("is-hidden")}function ie(e){i.selectedCategory&&(i.selectedCategory.textContent=z(e))}function U(){var t;const e=(t=i.searchForm)==null?void 0:t.querySelector("input");e&&(e.value="")}function oe(){return window.innerWidth<768?9:12}function ce(){return 10}function z(e){return e.split(" ").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}function le(){const e=document.querySelectorAll(".filters-btn");e.forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.filter;e.forEach(s=>{s.classList.toggle("is-active",s===t)}),L({filter:a,page:1})})})}async function de(e){const{data:t}=await h.post("/subscription",{email:e});return t}const ue=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function k(e,t){return typeof e=="string"?e:e!=null&&e.message?e.message:e!=null&&e.error?e.error:t}function me(){const e=document.querySelector("[data-subscribe-form]");if(!e)return;const t=e.elements.email,a=e.querySelector(".subscribe-btn");e.addEventListener("submit",async s=>{var o,d;s.preventDefault();const r=t.value.trim();if(!ue.test(r)){v(ge("Please enter a valid email address.")),t.focus();return}M(a,!0);try{const c=await de(r);iziToast.success({title:"Success",message:k(c,"Subscription successful."),position:"topRight"}),e.reset()}catch(c){const m=(o=c==null?void 0:c.response)==null?void 0:o.status,l=k((d=c==null?void 0:c.response)==null?void 0:d.data,"Something went wrong. Please try again later.");iziToast[m===409?"warning":"error"]({title:m===409?"Warning":"Error",message:l,position:"topRight"})}finally{M(a,!1)}})}function ge(e){const{status:t,message:a}=D(e);switch(t){case 400:return a??"Invalid request. Please check your email.";case 404:return a??"Subscription service was not found.";case 409:return a??"This email is already subscribed.";case 500:return a??"Server error. Please try again later.";default:return a??"Something went wrong. Please try again later."}}function M(e,t){e.disabled=t,e.textContent=t?"Sending...":"Send"}function pe(){const e=document.querySelector("[data-scroll-up]");if(!e)return;const t=()=>{e.classList.toggle("is-visible",window.scrollY>300)};e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),t(),window.addEventListener("scroll",t,{passive:!0})}async function _e(e,t){try{const{result:a}=await h.patch(`/exercises/${e}/rating`,t);return V("Your rating is added successfully!"),a}catch(a){return v(fe(a)),null}}function fe(e){const{status:t,message:a}=D(e);switch(t){case 400:return a??"Invalid request. Please check the rating data.";case 404:return a??"Such exercise was not found.";case 409:return a??"This email has already left a rating.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to add the rating."}}const n={modalExerciceOpenElem:document.querySelector("[data-exercice-modal-open]"),modalRatingOpenElem:null,modalCloseBtn:document.querySelector("[data-modal-close]"),overlay:document.querySelector(".overlay"),modalContainer:document.querySelector(".modal"),modalContent:document.querySelector(".modal_content"),starRatingSelect:null};let f=null,S={_id:"64f389465ae26083f39b17a2",bodyPart:"waist",equipment:"body weight",gifUrl:"https://ftp.goit.study/img/power-pulse/gifs/0001.gif",name:"3/4 sit-up",target:"abs",description:"This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",rating:3.72,burnedCalories:220,popularity:34157};const ye=({name:e,gifUrl:t,rating:a,target:s,bodyPart:r,equipment:o,popularity:d,burnedCalories:c,description:m})=>{const l=Math.round(a);return`<div class="modal_exercice">
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
          <span class="modal_exercice_stats_block_list_item_bold">${s}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Body Part
          <span class="modal_exercice_stats_block_list_item_bold">${r}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Equipment
          <span class="modal_exercice_stats_block_list_item_bold">${o}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Popular
          <span class="modal_exercice_stats_block_list_item_bold">${d}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Burned Calories
          <span class="modal_exercice_stats_block_list_item_bold">${c}</span>
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
  </div>`},be=()=>`<form class="modal_rating">
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
      </form>`,y=e=>{if(e&&e.target.dataset.modalType!=="exercice")return;n.overlay.hidden=!1,n.modalContainer.classList.remove("modal-small"),n.modalContainer.classList.add("modal-large"),f="exercice";const t=ye(S);n.modalContent.innerHTML=t,requestAnimationFrame(()=>{new B(".star-rating",{clearable:!1,maxStars:5}).rebuild()}),n.modalRatingOpenElem=document.querySelector("[data-rating-modal-open]"),n.modalRatingOpenElem.addEventListener("click",G)},G=()=>{n.overlay.hidden=!1,n.modalContainer.classList.remove("modal-large"),n.modalContainer.classList.add("modal-small"),f="rating";const e=be();n.modalContent.innerHTML=e,requestAnimationFrame(()=>{new B(".star-rating-active",{clearable:!1,maxStars:5}).rebuild()}),n.modalRatingOpenElem.removeEventListener("click",G),n.starRatingSelect=document.querySelector(".star-rating-active"),n.starRatingSelect.addEventListener("change",x)},C=()=>{if(f==="rating"){n.starRatingSelect.removeEventListener("change",x),y();return}n.overlay.hidden=!0},ve=e=>{if(e.target===n.overlay){if(f==="rating"){n.starRatingSelect.removeEventListener("change",x),y();return}C()}},he=e=>{if(e.key==="Escape"){if(f==="rating"){n.starRatingSelect.removeEventListener("change",x),y();return}C()}},x=e=>{const t=e.target.value,a=n.modalContent.querySelector(".modal_rating_star_rating_number");a.textContent=`${t}.0`},xe=async e=>{e.preventDefault(),S||v("Excercice is not found. Please, try one more time.");const t=new FormData(e.target),a={rate:Number(t.get("rate")),email:t.get("email"),review:t.get("review")};if(Object.values(a).some(s=>!s)){v("Please make sure that you had filled in all the values.");return}await _e(S._id,a),y()};var P;(P=n.modalExerciceOpenElem)==null||P.addEventListener("click",y);var R;(R=n.modalCloseBtn)==null||R.addEventListener("click",C);var A;(A=n.overlay)==null||A.addEventListener("click",ve);var F;(F=n.modalContent)==null||F.addEventListener("submit",xe);document.addEventListener("keydown",he);le();L();me();H();pe();
//# sourceMappingURL=index.js.map
