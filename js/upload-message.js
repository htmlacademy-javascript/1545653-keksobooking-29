import {isEscapeKey} from './utils.js';

let modal;
let isOpen = false;

const createElement = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.firstChild;
};

const createMessageTemplate = (state, message, buttonText) =>
  `<div class='${state}'>
    <p class='${state}__message'>${message}</p>
    ${
  buttonText
    ? `<button type="button" class="${state}__button">${buttonText}</button>`
    : ''
}
  </div>`;

const createDomElement = (state, message, buttonText) => {
  modal = createElement(createMessageTemplate(state, message, buttonText));
  document.body.append(modal);
};

const closeMessage = () => {
  if (!isOpen) {
    document.body.classList.remove('modal-open');
  }

  document.removeEventListener('keydown', onDocumentKeydown);
  modal.remove();
};

function onDocumentKeydown(event) {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeMessage();
  }
}

const onSubmitButtonClick = (event) => {
  event.preventDefault();
  closeMessage();
};

const onMessageContainerClick = (event, state) => {
  if (!event.target.closest(`.${state}__inner`)) {
    closeMessage();
  }
};

const renderMessage = (state, message, buttonText) => {
  isOpen = false;
  createDomElement(state, message, buttonText);

  if (buttonText) {
    modal.querySelector(`.${state}__button`).addEventListener('click', onSubmitButtonClick);
  }

  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  modal.addEventListener('click', (event) => {
    onMessageContainerClick(event, state);
  });

  if (!document.body.classList.contains('modal-open')) {
    document.body.classList.add('modal-open');
    return;
  }

  isOpen = true;
};

export {renderMessage};
