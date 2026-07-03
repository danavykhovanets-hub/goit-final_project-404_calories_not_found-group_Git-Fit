import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const generateErrorToastMessage = message => {
  iziToast.error({
    message,
    position: 'topRight',
    backgroundColor: '#ef4040',
    messageColor: '#fff',
    icon: '',
  });
};

export const generateSuccessToastMessage = message => {
  iziToast.success({
    message,
    position: 'topRight',
    backgroundColor: '#088b57',
    messageColor: '#fff',
    icon: '',
  });
};
