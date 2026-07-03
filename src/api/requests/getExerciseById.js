import { instance } from '../instance';
import { generateErrorToastMessage } from '../../js/toastMessages.js';
import { parseError } from '../../lib/parseError';

// GET /exercises/{id}
export async function getExerciseById(id) {
  try {
    const { data } = await instance.get(`/exercises/${id}`);
    return data;
  } catch (error) {
    generateErrorToastMessage(getErrorMessage(error));
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
