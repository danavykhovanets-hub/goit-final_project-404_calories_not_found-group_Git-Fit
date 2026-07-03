import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getQuote } from '../api/requests/getQuote.js';
import { StorageService } from '../lib/storage.js';
import { parseError } from '../lib/parseError.js';

const quoteStorage = new StorageService('quote-of-the-day');

export async function getQuoteOfTheDay() {
  try {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const cached = quoteStorage.load(null);

    if (cached?.date === today && cached?.quote) {
      return cached.quote;
    }

    const quote = await getQuote();
    quoteStorage.save({ date: today, quote });
    return quote;
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
    case 404:
      return message ?? 'Quote of the day was not found.';
    case 500:
      return message ?? 'Server error. Please try again later.';
    default:
      return message ?? 'Failed to load the quote of the day.';
  }
}
