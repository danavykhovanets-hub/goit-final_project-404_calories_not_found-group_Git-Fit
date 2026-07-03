import { instance } from '../instance';
import {
  generateErrorToastMessage,
  generateSuccessToastMessage,
} from '../../js/toastMessages.js';
import { parseError } from '../../lib/parseError';

// PATCH /exercises/{id}/rating
// data: { rate: number, email: string, review: string }
export async function submitRating(id, data) {
  try {
    const { result } = await instance.patch(`/exercises/${id}/rating`, data);

    generateSuccessToastMessage('Your rating is added successfully!');
    return result;
  } catch (error) {
    generateErrorToastMessage(getErrorMessage(error));
    return null;
  }
}

function getErrorMessage(error) {
  const { status, message } = parseError(error);

  switch (status) {
    case 400:
      return message ?? 'Invalid request. Please check the rating data.';
    case 404:
      return message ?? 'Such exercise was not found.';
    case 409:
      return message ?? 'This email has already left a rating.';
    case 500:
      return message ?? 'Server error. Please try again later.';
    default:
      return message ?? 'Failed to add the rating.';
  }
}
