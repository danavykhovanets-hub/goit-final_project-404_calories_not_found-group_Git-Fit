import{a as b,i as l,S as g}from"./vendor-Ht0x2cLd.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(t){if(t.ep)return;t.ep=!0;const a=i(t);fetch(t.href,a)}})();const f=b.create({baseURL:"https://your-energy.b.goit.study/api",headers:{Accept:"application/json"}});async function y(e){const{data:s}=await f.post("/subscription",{email:e});return s}const v=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function h(e){var s,i,o;return{status:(s=e==null?void 0:e.response)==null?void 0:s.status,message:(o=(i=e==null?void 0:e.response)==null?void 0:i.data)==null?void 0:o.message}}function x(){const e=document.querySelector("[data-subscribe-form]");if(!e)return;const s=e.elements.email,i=e.querySelector(".subscribe-btn");e.addEventListener("submit",async o=>{o.preventDefault();const t=s.value.trim();if(!v.test(t)){l.error({title:"Error",message:"Please enter a valid email address.",position:"topRight"}),s.focus();return}u(i,!0);try{const a=await y(t);l.success({title:"Success",message:(a==null?void 0:a.message)??"Thanks for subscribing!",position:"topRight"}),e.reset()}catch(a){l.error({title:"Error",message:E(a),position:"topRight"})}finally{u(i,!1)}})}function E(e){const{status:s,message:i}=h(e);switch(s){case 400:return i??"Invalid request. Please check your email.";case 404:return i??"Subscription service was not found.";case 409:return i??"This email is already subscribed.";case 500:return i??"Server error. Please try again later.";default:return i??"Something went wrong. Please try again later."}}function u(e,s){e.disabled=s,e.textContent=s?"Sending...":"Send"}const r={modalOpenBtn:document.querySelector("[data-modal-open]"),modalCloseBtn:document.querySelector("[data-modal-close]"),overlay:document.querySelector(".overlay"),modalContent:document.querySelector(".modal_content")},S={bodyPart:"waist",equipment:"body weight",gifUrl:"https://ftp.goit.study/img/power-pulse/gifs/0001.gif",name:"3/4 sit-up",target:"abs",description:"This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",rating:3.72,burnedCalories:220,popularity:34157},k=({name:e,gifUrl:s,rating:i,target:o,bodyPart:t,equipment:a,popularity:n,burnedCalories:m,description:_})=>{const c=Math.round(i),p=`<div class="modal_exercice">
    <div class="modal_exercice_img_container">
      <img
        class="modal_exercice_img"
        src="${s}"
        alt="${e}"
      />
    </div>
    <div class="modal_exercice_data_container">
      <h2 class="modal_exercice_title">${e}</h2>
      <div class="modal_exercice_star_raiting_container">
        <p class="modal_exercice_star_rating_number">${i}</p>
        <select class="star-rating" disabled>
           <option value="">Select a rating</option>
           <option value="5" ${c===5?"selected":""}>Excellent</option>
           <option value="4" ${c===4?"selected":""}>Very Good</option>
           <option value="3" ${c===3?"selected":""}>Average</option>
           <option value="2" ${c===2?"selected":""}>Poor</option>
           <option value="1" ${c===1?"selected":""}>Terrible</option>
        </select>
      </div>
      <ul class="modal_exercice_stats_block_list">
        <li class="modal_exercice_stats_block_list_item">
          Target
          <span class="modal_exercice_stats_block_list_item_bold">${o}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Body Part
          <span class="modal_exercice_stats_block_list_item_bold">${t}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Equipment
          <span class="modal_exercice_stats_block_list_item_bold">${a}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Popular
          <span class="modal_exercice_stats_block_list_item_bold">${n}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Burned Calories
          <span class="modal_exercice_stats_block_list_item_bold">${m}</span>
        </li>
      </ul>
      <p class="modal_exercice_description">${_}</p>
      <div class="modal_exercice_btn_container">
        <button class="modal_exercice_btn_favorites" type="button">
          Add to favorites
          <svg class="modal_exercice_btn_favorites_icon" width="20" height="20">
            <use href="./img/icons.svg#heart"></use>
          </svg>
        </button>
        <button class="modal_exercice_btn_rating" type="button">
          Give a rating
        </button>
      </div>
    </div>
  </div>`;return requestAnimationFrame(()=>{new g(".star-rating",{clearable:!1,maxStars:5}).rebuild()}),p},w=e=>{e.target.dataset.modalType&&(r.overlay.hidden=!1,r.modalContent.innerHTML=k(S))},d=()=>{r.overlay.hidden=!0},$=e=>{e.target===r.overlay&&d()},L=e=>{e.key==="Escape"&&d()};r.modalOpenBtn.addEventListener("click",w);r.modalCloseBtn.addEventListener("click",d);r.overlay.addEventListener("click",$);document.addEventListener("keydown",L);x();
//# sourceMappingURL=main-Cd7xMNQi.js.map
