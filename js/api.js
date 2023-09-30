import {GET_URL} from './constants.js';


const getData = () =>
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error;
      }
    })
    .catch(() => {
      throw new Error;
    });

const sendData = (url, onSuccess, onError, body) => {
  fetch(url, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      onError();
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
