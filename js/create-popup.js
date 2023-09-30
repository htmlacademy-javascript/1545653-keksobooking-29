const cardTemplate = document.querySelector('#card').content.querySelector('.popup');


const popupTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palase: 'Дворец',
  hotel: 'Отель'
};

const getFeaturesItems = (features) => {
  let result = '';
  for (let i = 0; i < features.length; i++) {
    result += `<li class="popup__feature popup__feature--${features[i]}"></li>`;
  }
  return result;
};


const getPhotos = (photos, title) => photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="${title}">`).join('');

const createCard = ({author, offer}) => {

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = popupTypes[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.chekin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  if (offer.features) {
    cardElement.querySelector('.popup__features').innerHTML = getFeaturesItems(offer.features);
  } else {
    cardElement.querySelector('.popup__features').classList.add('hidden');
  }


  if (offer.photos) {
    cardElement.querySelector('.popup__photos').innerHTML = getPhotos(offer.photos, offer.title);
  } else {
    cardElement.querySelector('.popup__photos').classList.add('hidden');
  }

  return cardElement;
};

export {createCard};
