import {
  generateErrorToastMessage,
  generateSuccessToastMessage,
} from '../js/toastMessages.js';

import { subscribe } from '../api/requests/subscribe.js';
import { EMAIL_REGEX } from '../constants/index.js';
import { parseError } from '../lib/parseError.js';

export function initSubscription() {
  //TODO need to check correct form id for subscription
  const form = document.querySelector('[data-subscribe-form]');
  if (!form) return;

  const input = form.elements.email;
  const button = form.querySelector('.subscribe-btn');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const email = input.value.trim();

    if (!EMAIL_REGEX.test(email)) {
      generateErrorToastMessage(
        getErrorMessage('Please enter a valid email address.')
      );
      input.focus();
      return;
    }

    setLoading(button, true);

    try {
      const data = await subscribe(email);
      generateSuccessToastMessage(data?.message ?? 'Thanks for subscribing!');
      form.reset();
    } catch (error) {
      generateErrorToastMessage(getErrorMessage(error));
    } finally {
      setLoading(button, false);
    }
  });
}

function getErrorMessage(error) {
  const { status, message } = parseError(error);

  switch (status) {
    case 400:
      return message ?? 'Invalid request. Please check your email.';
    case 404:
      return message ?? 'Subscription service was not found.';
    case 409:
      return message ?? 'This email is already subscribed.';
    case 500:
      return message ?? 'Server error. Please try again later.';
    default:
      return message ?? 'Something went wrong. Please try again later.';
  }
}

function setLoading(button, isLoading) {
  button.disabled = isLoading;
  button.textContent = isLoading ? 'Sending...' : 'Send';
}
