import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getExerciseById } from '../api/requests/getExerciseById.js';
import { parseError } from '../lib/parseError.js';

export async function loadExerciseById(id) {
  try {
    return await getExerciseById(id);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: getErrorMessage(error),
      position: 'topRight',
    });
    return null;
  }
}

function getErrorMessage(error) {
  const { status, message } = parseError(error);

  switch (status) {
    case 400:
      return message ?? 'Invalid request. Please check the exercise id.';
    case 404:
      return message ?? 'Exercise was not found.';
    case 500:
      return message ?? 'Server error. Please try again later.';
    default:
      return message ?? 'Failed to load the exercise.';
  }
}

export function initModal() {
  // TODO: implement exercise modal rendering
}
