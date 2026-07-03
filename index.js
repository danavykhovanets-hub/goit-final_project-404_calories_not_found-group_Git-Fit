import{i as E,a as _,p as w,b as L,r as C}from"./assets/quote-DIEocSuN.js";import{S as k}from"./assets/vendor-Ht0x2cLd.js";async function $(e){const{data:t}=await E.post("/subscription",{email:e});return t}const q=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function b(e,t){return typeof e=="string"?e:e!=null&&e.message?e.message:e!=null&&e.error?e.error:t}function T(){const e=document.querySelector("[data-subscribe-form]");if(!e)return;const t=e.elements.email,a=e.querySelector(".subscribe-btn");e.addEventListener("submit",async i=>{var d,m;i.preventDefault();const c=t.value.trim();if(!q.test(c)){_(M("Please enter a valid email address.")),t.focus();return}f(a,!0);try{const n=await $(c);iziToast.success({title:"Success",message:b(n,"Subscription successful."),position:"topRight"}),e.reset()}catch(n){const u=(d=n==null?void 0:n.response)==null?void 0:d.status,r=b((m=n==null?void 0:n.response)==null?void 0:m.data,"Something went wrong. Please try again later.");iziToast[u===409?"warning":"error"]({title:u===409?"Warning":"Error",message:r,position:"topRight"})}finally{f(a,!1)}})}function M(e){const{status:t,message:a}=w(e);switch(t){case 400:return a??"Invalid request. Please check your email.";case 404:return a??"Subscription service was not found.";case 409:return a??"This email is already subscribed.";case 500:return a??"Server error. Please try again later.";default:return a??"Something went wrong. Please try again later."}}function f(e,t){e.disabled=t,e.textContent=t?"Sending...":"Send"}function P(){const e=document.querySelector("[data-scroll-up]");if(!e)return;const t=()=>{e.classList.toggle("is-visible",window.scrollY>300)};e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),t(),window.addEventListener("scroll",t,{passive:!0})}async function A(e,t){try{const{result:a}=await E.patch(`/exercises/${e}/rating`,t);return L("Your rating is added successfully!"),a}catch(a){return _(D(a)),null}}function D(e){const{status:t,message:a}=w(e);switch(t){case 400:return a??"Invalid request. Please check the rating data.";case 404:return a??"Such exercise was not found.";case 409:return a??"This email has already left a rating.";case 500:return a??"Server error. Please try again later.";default:return a??"Failed to add the rating."}}const s={modalExerciceOpenElem:document.querySelector("[data-exercice-modal-open]"),modalRatingOpenElem:null,modalCloseBtn:document.querySelector("[data-modal-close]"),overlay:document.querySelector(".overlay"),modalContainer:document.querySelector(".modal"),modalContent:document.querySelector(".modal_content"),starRatingSelect:null};let o=null,p={_id:"64f389465ae26083f39b17a2",bodyPart:"waist",equipment:"body weight",gifUrl:"https://ftp.goit.study/img/power-pulse/gifs/0001.gif",name:"3/4 sit-up",target:"abs",description:"This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",rating:3.72,burnedCalories:220,popularity:34157};const O=({name:e,gifUrl:t,rating:a,target:i,bodyPart:c,equipment:d,popularity:m,burnedCalories:n,description:u})=>{const r=Math.round(a);return`<div class="modal_exercice">
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
           <option value="5" ${r===5?"selected":""}>Excellent</option>
           <option value="4" ${r===4?"selected":""}>Very Good</option>
           <option value="3" ${r===3?"selected":""}>Average</option>
           <option value="2" ${r===2?"selected":""}>Poor</option>
           <option value="1" ${r===1?"selected":""}>Terrible</option>
        </select>
      </div>
      <ul class="modal_exercice_stats_block_list">
        <li class="modal_exercice_stats_block_list_item">
          Target
          <span class="modal_exercice_stats_block_list_item_bold">${i}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Body Part
          <span class="modal_exercice_stats_block_list_item_bold">${c}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Equipment
          <span class="modal_exercice_stats_block_list_item_bold">${d}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Popular
          <span class="modal_exercice_stats_block_list_item_bold">${m}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Burned Calories
          <span class="modal_exercice_stats_block_list_item_bold">${n}</span>
        </li>
      </ul>
      <p class="modal_exercice_description">${u}</p>
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
  </div>`},z=()=>`<form class="modal_rating">
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
      </form>`,l=e=>{if(e&&e.target.dataset.modalType!=="exercice")return;s.overlay.hidden=!1,s.modalContainer.classList.remove("modal-small"),s.modalContainer.classList.add("modal-large"),o="exercice";const t=O(p);s.modalContent.innerHTML=t,requestAnimationFrame(()=>{new k(".star-rating",{clearable:!1,maxStars:5}).rebuild()}),s.modalRatingOpenElem=document.querySelector("[data-rating-modal-open]"),s.modalRatingOpenElem.addEventListener("click",R)},R=()=>{s.overlay.hidden=!1,s.modalContainer.classList.remove("modal-large"),s.modalContainer.classList.add("modal-small"),o="rating";const e=z();s.modalContent.innerHTML=e,requestAnimationFrame(()=>{new k(".star-rating-active",{clearable:!1,maxStars:5}).rebuild()}),s.modalRatingOpenElem.removeEventListener("click",R),s.starRatingSelect=document.querySelector(".star-rating-active"),s.starRatingSelect.addEventListener("change",g)},v=()=>{if(o==="rating"){s.starRatingSelect.removeEventListener("change",g),l();return}s.overlay.hidden=!0},B=e=>{if(e.target===s.overlay){if(o==="rating"){s.starRatingSelect.removeEventListener("change",g),l();return}v()}},Z=e=>{if(e.key==="Escape"){if(o==="rating"){s.starRatingSelect.removeEventListener("change",g),l();return}v()}},g=e=>{const t=e.target.value,a=s.modalContent.querySelector(".modal_rating_star_rating_number");a.textContent=`${t}.0`},F=async e=>{e.preventDefault(),p||_("Excercice is not found. Please, try one more time.");const t=new FormData(e.target),a={rate:Number(t.get("rate")),email:t.get("email"),review:t.get("review")};if(Object.values(a).some(i=>!i)){_("Please make sure that you had filled in all the values.");return}await A(p._id,a),l()};var y;(y=s.modalExerciceOpenElem)==null||y.addEventListener("click",l);var h;(h=s.modalCloseBtn)==null||h.addEventListener("click",v);var x;(x=s.overlay)==null||x.addEventListener("click",B);var S;(S=s.modalContent)==null||S.addEventListener("submit",F);document.addEventListener("keydown",Z);T();C();P();
//# sourceMappingURL=index.js.map
