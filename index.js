import{i as v,g as o,a as b,p as f}from"./assets/parseError-D19OIwGj.js";import{S as y}from"./assets/vendor-Ht0x2cLd.js";async function k(e){const{data:a}=await v.post("/subscription",{email:e});return a}const w=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function C(){const e=document.querySelector("[data-subscribe-form]");if(!e)return;const a=e.elements.email,t=e.querySelector(".subscribe-btn");e.addEventListener("submit",async s=>{s.preventDefault();const d=a.value.trim();if(!w.test(d)){o(g("Please enter a valid email address.")),a.focus();return}p(t,!0);try{const r=await k(d);b((r==null?void 0:r.message)??"Thanks for subscribing!"),e.reset()}catch(r){o(g(r))}finally{p(t,!1)}})}function g(e){const{status:a,message:t}=f(e);switch(a){case 400:return t??"Invalid request. Please check your email.";case 404:return t??"Subscription service was not found.";case 409:return t??"This email is already subscribed.";case 500:return t??"Server error. Please try again later.";default:return t??"Something went wrong. Please try again later."}}function p(e,a){e.disabled=a,e.textContent=a?"Sending...":"Send"}async function R(e,a){try{const{result:t}=await v.patch(`/exercises/${e}/rating`,a);return b("Your rating is added successfully!"),t}catch(t){return o($(t)),null}}function $(e){const{status:a,message:t}=f(e);switch(a){case 400:return t??"Invalid request. Please check the rating data.";case 404:return t??"Such exercise was not found.";case 409:return t??"This email has already left a rating.";case 500:return t??"Server error. Please try again later.";default:return t??"Failed to add the rating."}}const n={modalExerciceOpenElem:document.querySelector("[data-exercice-modal-open]"),modalRatingOpenElem:null,modalCloseBtn:document.querySelector("[data-modal-close]"),overlay:document.querySelector(".overlay"),modalContainer:document.querySelector(".modal"),modalContent:document.querySelector(".modal_content"),starRatingSelect:null};let l=null,u={_id:"64f389465ae26083f39b17a2",bodyPart:"waist",equipment:"body weight",gifUrl:"https://ftp.goit.study/img/power-pulse/gifs/0001.gif",name:"3/4 sit-up",target:"abs",description:"This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",rating:3.72,burnedCalories:220,popularity:34157};const L=({name:e,gifUrl:a,rating:t,target:s,bodyPart:d,equipment:r,popularity:x,burnedCalories:E,description:S})=>{const i=Math.round(t);return`<div class="modal_exercice">
    <div class="modal_exercice_img_container">
      <img
        class="modal_exercice_img"
        src="${a}"
        alt="${e}"
      />
    </div>
    <div class="modal_exercice_data_container">
      <h2 class="modal_exercice_title">${e}</h2>
      <div class="modal_exercice_star_raiting_container">
        <p class="modal_exercice_star_rating_number">${t}</p>
        <select class="star-rating" disabled>
           <option value="">Select a rating</option>
           <option value="5" ${i===5?"selected":""}>Excellent</option>
           <option value="4" ${i===4?"selected":""}>Very Good</option>
           <option value="3" ${i===3?"selected":""}>Average</option>
           <option value="2" ${i===2?"selected":""}>Poor</option>
           <option value="1" ${i===1?"selected":""}>Terrible</option>
        </select>
      </div>
      <ul class="modal_exercice_stats_block_list">
        <li class="modal_exercice_stats_block_list_item">
          Target
          <span class="modal_exercice_stats_block_list_item_bold">${s}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Body Part
          <span class="modal_exercice_stats_block_list_item_bold">${d}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Equipment
          <span class="modal_exercice_stats_block_list_item_bold">${r}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Popular
          <span class="modal_exercice_stats_block_list_item_bold">${x}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Burned Calories
          <span class="modal_exercice_stats_block_list_item_bold">${E}</span>
        </li>
      </ul>
      <p class="modal_exercice_description">${S}</p>
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
  </div>`},q=()=>`<form class="modal_rating">
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
      </form>`,c=e=>{if(e&&e.target.dataset.modalType!=="exercice")return;n.overlay.hidden=!1,n.modalContainer.classList.remove("modal-small"),n.modalContainer.classList.add("modal-large"),l="exercice";const a=L(u);n.modalContent.innerHTML=a,requestAnimationFrame(()=>{new y(".star-rating",{clearable:!1,maxStars:5}).rebuild()}),n.modalRatingOpenElem=document.querySelector("[data-rating-modal-open]"),n.modalRatingOpenElem.addEventListener("click",h)},h=()=>{n.overlay.hidden=!1,n.modalContainer.classList.remove("modal-large"),n.modalContainer.classList.add("modal-small"),l="rating";const e=q();n.modalContent.innerHTML=e,requestAnimationFrame(()=>{new y(".star-rating-active",{clearable:!1,maxStars:5}).rebuild()}),n.modalRatingOpenElem.removeEventListener("click",h),n.starRatingSelect=document.querySelector(".star-rating-active"),n.starRatingSelect.addEventListener("change",m)},_=()=>{if(l==="rating"){n.starRatingSelect.removeEventListener("change",m),c();return}n.overlay.hidden=!0},M=e=>{if(e.target===n.overlay){if(l==="rating"){n.starRatingSelect.removeEventListener("change",m),c();return}_()}},T=e=>{if(e.key==="Escape"){if(l==="rating"){n.starRatingSelect.removeEventListener("change",m),c();return}_()}},m=e=>{const a=e.target.value,t=n.modalContent.querySelector(".modal_rating_star_rating_number");t.textContent=`${a}.0`},P=async e=>{e.preventDefault(),u||o("Excercice is not found. Please, try one more time.");const a=new FormData(e.target),t={rate:Number(a.get("rate")),email:a.get("email"),review:a.get("review")};if(Object.values(t).some(s=>!s)){o("Please make sure that you had filled in all the values.");return}await R(u._id,t),c()};n.modalExerciceOpenElem.addEventListener("click",c);n.modalCloseBtn.addEventListener("click",_);n.overlay.addEventListener("click",M);n.modalContent.addEventListener("submit",P);document.addEventListener("keydown",T);C();
//# sourceMappingURL=index.js.map
