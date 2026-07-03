import{i as b,a as C,S as v}from"./vendor-Ht0x2cLd.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const c=e=>{b.error({message:e,position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",icon:""})},y=e=>{b.success({message:e,position:"topRight",backgroundColor:"#088b57",messageColor:"#fff",icon:""})},h=C.create({baseURL:"https://your-energy.b.goit.study/api",headers:{Accept:"application/json"}});async function L(e){const{data:a}=await h.post("/subscription",{email:e});return a}const R=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function x(e){var a,t,o;return{status:(a=e==null?void 0:e.response)==null?void 0:a.status,message:(o=(t=e==null?void 0:e.response)==null?void 0:t.data)==null?void 0:o.message}}function k(){const e=document.querySelector("[data-subscribe-form]");if(!e)return;const a=e.elements.email,t=e.querySelector(".subscribe-btn");e.addEventListener("submit",async o=>{o.preventDefault();const n=a.value.trim();if(!R.test(n)){c(p("Please enter a valid email address.")),a.focus();return}f(t,!0);try{const r=await L(n);y((r==null?void 0:r.message)??"Thanks for subscribing!"),e.reset()}catch(r){c(p(r))}finally{f(t,!1)}})}function p(e){const{status:a,message:t}=x(e);switch(a){case 400:return t??"Invalid request. Please check your email.";case 404:return t??"Subscription service was not found.";case 409:return t??"This email is already subscribed.";case 500:return t??"Server error. Please try again later.";default:return t??"Something went wrong. Please try again later."}}function f(e,a){e.disabled=a,e.textContent=a?"Sending...":"Send"}async function $(e,a){try{const{result:t}=await h.patch(`/exercises/${e}/rating`,a);return y("Your rating is added successfully!"),t}catch(t){return c(q(t)),null}}function q(e){const{status:a,message:t}=x(e);switch(a){case 400:return t??"Invalid request. Please check the rating data.";case 404:return t??"Such exercise was not found.";case 409:return t??"This email has already left a rating.";case 500:return t??"Server error. Please try again later.";default:return t??"Failed to add the rating."}}const s={modalExerciceOpenElem:document.querySelector("[data-exercice-modal-open]"),modalRatingOpenElem:null,modalCloseBtn:document.querySelector("[data-modal-close]"),overlay:document.querySelector(".overlay"),modalContainer:document.querySelector(".modal"),modalContent:document.querySelector(".modal_content"),starRatingSelect:null};let d=null,_={_id:"64f389465ae26083f39b17a2",bodyPart:"waist",equipment:"body weight",gifUrl:"https://ftp.goit.study/img/power-pulse/gifs/0001.gif",name:"3/4 sit-up",target:"abs",description:"This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",rating:3.72,burnedCalories:220,popularity:34157};const P=({name:e,gifUrl:a,rating:t,target:o,bodyPart:n,equipment:r,popularity:i,burnedCalories:S,description:w})=>{const l=Math.round(t);return`<div class="modal_exercice">
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
          <span class="modal_exercice_stats_block_list_item_bold">${o}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Body Part
          <span class="modal_exercice_stats_block_list_item_bold">${n}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Equipment
          <span class="modal_exercice_stats_block_list_item_bold">${r}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Popular
          <span class="modal_exercice_stats_block_list_item_bold">${i}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Burned Calories
          <span class="modal_exercice_stats_block_list_item_bold">${S}</span>
        </li>
      </ul>
      <p class="modal_exercice_description">${w}</p>
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
  </div>`},M=()=>`<form class="modal_rating">
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
      </form>`,m=e=>{if(e&&e.target.dataset.modalType!=="exercice")return;s.overlay.hidden=!1,s.modalContainer.classList.remove("modal-small"),s.modalContainer.classList.add("modal-large"),d="exercice";const a=P(_);s.modalContent.innerHTML=a,requestAnimationFrame(()=>{new v(".star-rating",{clearable:!1,maxStars:5}).rebuild()}),s.modalRatingOpenElem=document.querySelector("[data-rating-modal-open]"),s.modalRatingOpenElem.addEventListener("click",E)},E=()=>{s.overlay.hidden=!1,s.modalContainer.classList.remove("modal-large"),s.modalContainer.classList.add("modal-small"),d="rating";const e=M();s.modalContent.innerHTML=e,requestAnimationFrame(()=>{new v(".star-rating-active",{clearable:!1,maxStars:5}).rebuild()}),s.modalRatingOpenElem.removeEventListener("click",E),s.starRatingSelect=document.querySelector(".star-rating-active"),s.starRatingSelect.addEventListener("change",u)},g=()=>{if(d==="rating"){s.starRatingSelect.removeEventListener("change",u),m();return}s.overlay.hidden=!0},O=e=>{if(e.target===s.overlay){if(d==="rating"){s.starRatingSelect.removeEventListener("change",u),m();return}g()}},T=e=>{if(e.key==="Escape"){if(d==="rating"){s.starRatingSelect.removeEventListener("change",u),m();return}g()}},u=e=>{const a=e.target.value,t=s.modalContent.querySelector(".modal_rating_star_rating_number");t.textContent=`${a}.0`},A=async e=>{e.preventDefault(),_||c("Excercice is not found. Please, try one more time.");const a=new FormData(e.target),t={rate:Number(a.get("rate")),email:a.get("email"),review:a.get("review")};if(Object.values(t).some(o=>!o)){c("Please make sure that you had filled in all the values.");return}await $(_._id,t),m()};s.modalExerciceOpenElem.addEventListener("click",m);s.modalCloseBtn.addEventListener("click",g);s.overlay.addEventListener("click",O);s.modalContent.addEventListener("submit",A);document.addEventListener("keydown",T);k();
//# sourceMappingURL=main-DL_E4Ntt.js.map
