const cardTemplate = document.querySelector('#card').content.querySelector('.popup');


const popupTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palase: 'Дворец',
  hotel: 'Отель'
};

const getPhotos = (photos, title) => photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="${title}">`).join('');

const createCard = ({author, offer}) => {

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = popupTypes[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  const VALID_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  let featuresList = '';
  if (offer.features) {
    for (let i = 0; i < offer.features.length; i++) {
      const featureIdx = VALID_FEATURES.indexOf(offer.features[i]);
      if (featureIdx !== -1) {
        featuresList += `<li class="popup__feature popup__feature--${VALID_FEATURES[featureIdx]}"></li>`;
      }
    }
  }
  if (featuresList) {
    cardElement.querySelector('.popup__features').innerHTML = featuresList;
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
