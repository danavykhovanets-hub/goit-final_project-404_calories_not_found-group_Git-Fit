import StarRating from 'star-rating.js';
import 'star-rating.js/dist/star-rating.min.css';
import {
  generateErrorToastMessage,
  generateSuccessToastMessage,
} from './toastMessages.js';
import { submitRating } from '../api/requests/addRating.js';
import { getExerciseById } from '../api/requests/getExerciseById.js';
import { favoritesStorage } from '../lib/favorites-storage.js';
import { showLoader, hideLoader } from './loader.js';
import iconsSprite from '../img/icons.svg';

const refs = {
  modalExerciceOpenElem: document.querySelector('[data-exercice-modal-open]'),
  modalRatingOpenElem: null,
  modalAddToFavoritesElem: null,
  modalCloseBtn: document.querySelector('[data-modal-close]'),
  overlay: document.querySelector('.overlay'),
  modalContainer: document.querySelector('.modal'),
  modalContent: document.querySelector('.modal_content'),
  starRatingSelect: null,
};

let currentModalType = null;
let currentExerciceData = null;

// #region HTML rendering functions
const renderExerciceModal = (exerciseData, isFavorite) => {
  const {
    name,
    gifUrl,
    rating,
    target,
    bodyPart,
    equipment,
    popularity,
    burnedCalories,
    description,
  } = exerciseData;

  const selectedRating = Math.round(rating);

  const modalData = `<div class="modal_exercice">
    <div class="modal_exercice_img_container">
      <img
        class="modal_exercice_img"
        src="${gifUrl}"
        alt="${name}"
      />
    </div>
    <div class="modal_exercice_data_container">
      <h2 class="modal_exercice_title">${name}</h2>
      <div class="modal_exercice_star_raiting_container">
        <p class="modal_exercice_star_rating_number">${rating}</p>
        <select class="star-rating" disabled>
           <option value="">Select a rating</option>
           <option value="5" ${selectedRating === 5 ? 'selected' : ''}>Excellent</option>
           <option value="4" ${selectedRating === 4 ? 'selected' : ''}>Very Good</option>
           <option value="3" ${selectedRating === 3 ? 'selected' : ''}>Average</option>
           <option value="2" ${selectedRating === 2 ? 'selected' : ''}>Poor</option>
           <option value="1" ${selectedRating === 1 ? 'selected' : ''}>Terrible</option>
        </select>
      </div>
      <ul class="modal_exercice_stats_block_list">
        <li class="modal_exercice_stats_block_list_item">
          Target
          <span class="modal_exercice_stats_block_list_item_bold">${target}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Body Part
          <span class="modal_exercice_stats_block_list_item_bold">${bodyPart}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Equipment
          <span class="modal_exercice_stats_block_list_item_bold">${equipment}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Popular
          <span class="modal_exercice_stats_block_list_item_bold">${popularity}</span>
        </li>
        <li class="modal_exercice_stats_block_list_item">
          Burned Calories
          <span class="modal_exercice_stats_block_list_item_bold">${burnedCalories}</span>
        </li>
      </ul>
      <p class="modal_exercice_description">${description}</p>
      <div class="modal_exercice_btn_container">
        <button class="modal_btn modal_exercice_btn_favorites" type="button" data-favorite>
          ${isFavorite ? 'Favorite' : 'Add to favorites'}
          <svg class="modal_exercice_btn_favorites_icon ${isFavorite ? 'favorites_icon_fill' : 'favorites_icon_empty'}" width="20" height="20">
            <use href="${iconsSprite}#heart"></use>
          </svg>
        </button>
        <button class="modal_btn modal_exercice_btn_rating" type="button" data-rating-modal-open>
          Give a rating
        </button>
      </div>
    </div>
  </div>`;
  return modalData;
};

const renderRatingModal = () => {
  const modalData = `<form class="modal_rating">
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
          pattern="^[A-Za-z0-9_]+(\.[A-Za-z0-9_]+)?@[A-Za-z]+\.[A-Za-z]{2,3}$"
        />
        <span class="modal_rating_input_error">Please enter a valid email address.</span>
        </label>
        <textarea
          class="modal_rating_textarea"
          name="review"
          placeholder="Your comment"
        ></textarea>
        <button class="modal_btn modal_rating_submit" type="submit">Send</button>
      </form>`;

  return modalData;
};
// #endregion  HTML rendering functions

// #region Base modal opening functionality
export const onExerciceModalOpen = async event => {
  try {
    let exerciseId;

    showLoader();

    if (event) {
      const button = event.target.closest('.start-btn');
      if (!button) {
        return;
      }

      const dataSet = button.dataset;
      exerciseId = dataSet.exerciseId;
      if (dataSet.modalType !== 'exercice' || !exerciseId) {
        return;
      }
    }

    let exerciceModalContent;
    if (!currentExerciceData) {
      const exerciceData = await getExerciseById(exerciseId);
      currentExerciceData = exerciceData;
    }

    const favoriteExercises = favoritesStorage.load([]);
    const isFavorite = isAdded(currentExerciceData, favoriteExercises);
    exerciceModalContent = renderExerciceModal(currentExerciceData, isFavorite);

    refs.modalContent.innerHTML = exerciceModalContent;
    refs.overlay.hidden = false;
    refs.modalContainer.classList.remove('modal-small');
    refs.modalContainer.classList.add('modal-large');
    currentModalType = 'exercice';

    requestAnimationFrame(() => {
      const stars = new StarRating('.star-rating', {
        clearable: false,
        maxStars: 5,
      });
      stars.rebuild();
    });

    refs.modalRatingOpenElem = document.querySelector(
      '[data-rating-modal-open]'
    );
    refs.modalRatingOpenElem.addEventListener('click', onRatingModalOpen);

    refs.modalAddToFavoritesElem = document.querySelector('[data-favorite]');
    refs.modalAddToFavoritesElem.addEventListener(
      'click',
      handleAddToFavorites
    );
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

export const onRatingModalOpen = () => {
  refs.overlay.hidden = false;
  refs.modalContainer.classList.remove('modal-large');
  refs.modalContainer.classList.add('modal-small');
  currentModalType = 'rating';

  const ratingModalContent = renderRatingModal();
  refs.modalContent.innerHTML = ratingModalContent;

  requestAnimationFrame(() => {
    const activeStars = new StarRating('.star-rating-active', {
      clearable: false,
      maxStars: 5,
    });
    activeStars.rebuild();
  });

  refs.modalRatingOpenElem.removeEventListener('click', onRatingModalOpen);
  refs.modalAddToFavoritesElem.removeEventListener(
    'click',
    handleAddToFavorites
  );

  refs.starRatingSelect = document.querySelector('.star-rating-active');
  refs.starRatingSelect.addEventListener('change', onStarRatingSelect);
};

export const onModalClose = () => {
  if (currentModalType === 'rating') {
    refs.starRatingSelect.removeEventListener('change', onStarRatingSelect);
    onExerciceModalOpen();
    return;
  }

  refs.overlay.hidden = true;
  currentExerciceData = null;
};

const onOverlayClick = e => {
  if (e.target === refs.overlay) {
    if (currentModalType === 'rating') {
      refs.starRatingSelect.removeEventListener('change', onStarRatingSelect);
      onExerciceModalOpen();
      return;
    }

    onModalClose();
  }
};

const onEscapeKeyClick = e => {
  if (e.key === 'Escape') {
    if (currentModalType === 'rating') {
      refs.starRatingSelect.removeEventListener('change', onStarRatingSelect);
      onExerciceModalOpen();
      return;
    }
    onModalClose();
  }
};
// #endregion Base modal opening functionality

// #region Modal exercise functionality
const isAdded = (currentExercice, exercisesArray) =>
  exercisesArray.some(exercise => exercise._id === currentExercice._id);

const handleAddToFavorites = event => {
  if (!currentExerciceData) {
    return;
  }

  const currentExercises = favoritesStorage.load([]);

  if (isAdded(currentExerciceData, currentExercises)) {
    generateErrorToastMessage('This exercise is already added to favorites.');
    return;
  }

  favoritesStorage.save([currentExerciceData, ...currentExercises]);
  generateSuccessToastMessage('Successfully added to favorites!');

  event.target.childNodes[0].textContent = 'Favorite';
  event.target.childNodes[1].classList.remove('favorites_icon_empty');
  event.target.childNodes[1].classList.add('favorites_icon_fill');
};
// #endregion Modal exercise functionality

// #region Rating form submit functionality
const onStarRatingSelect = event => {
  const selectedRatingValue = event.target.value;
  const modalTextValueElem = refs.modalContent.querySelector(
    '.modal_rating_star_rating_number'
  );

  if (selectedRatingValue) {
    modalTextValueElem.textContent = `${selectedRatingValue}.0`;
  }
};

const onRatingFormSubmit = async event => {
  try {
    event.preventDefault();
    showLoader();

    if (!currentExerciceData) {
      generateErrorToastMessage(
        'Excercice is not found. Please, try one more time.'
      );
    }

    const formData = new FormData(event.target);
    const validatedData = {
      rate: Number(formData.get('rate')),
      email: formData.get('email'),
      review: formData.get('review'),
    };

    if (Object.values(validatedData).some(value => !value)) {
      generateErrorToastMessage(
        'Please make sure that you had filled in all the values.'
      );
      return;
    }

    const { status } = await submitRating(
      currentExerciceData._id,
      validatedData
    );

    if (status === 200) {
      onExerciceModalOpen();
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};
// #endregion Rating form submit functionality

// #region Adding global event listeners
refs.modalExerciceOpenElem?.addEventListener('click', onExerciceModalOpen);
refs.modalCloseBtn?.addEventListener('click', onModalClose);
refs.overlay?.addEventListener('click', onOverlayClick);
refs.modalContent?.addEventListener('submit', onRatingFormSubmit);
document.addEventListener('keydown', onEscapeKeyClick);
// #endregion Adding global event listeners
