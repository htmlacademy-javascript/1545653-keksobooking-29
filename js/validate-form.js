const adForm = document.querySelector('.ad-form');
const titleField = adForm.querySelector('#title');
const priceField = adForm.querySelector('#price');
const roomsField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');
const checkinField = adForm.querySelector('#timein');
const checkoutField = adForm.querySelector('#timeout');
const typeField = adForm.querySelector('#type');

const TitleLimitsLength = {
  MIN: 30,
  MAX: 100,
};

const guestsInRooms = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const typesToPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
  max: 100000,
};

const pristine = new Pristine (adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
});

const validateTitle = (value) => value.length >= TitleLimitsLength.MIN && value.length <= TitleLimitsLength.MAX;

const getTitleMessage = () => `Длина строки должна быть в диапазоне от ${TitleLimitsLength.MIN} до ${TitleLimitsLength.MAX}`;

const validatePrice = (value) => value >= typesToPrices[typeField.value] && value <= typesToPrices.max;

const getPriceMessage = () => `Минимальная стоимость для выбранного типа жилья ${typesToPrices[typeField.value]} руб.`;

const validateCapacity = (capacity) => guestsInRooms[roomsField.value].includes(capacity);

const getCapacityMessage = () => {
  const maxGuests = Math.max(...guestsInRooms[roomsField.value]);
  return `Если комнат ${roomsField.value}, максимум гостей - ${maxGuests}`;
};

const onCheckinChange = () => {
  checkinField.value = checkoutField.value;
};

const onCheckoutChange = () => {
  checkoutField.value = checkinField.value;
};

checkinField.addEventListener('change', onCheckoutChange);
checkoutField.addEventListener('change', onCheckinChange);

pristine.addValidator(titleField, validateTitle, getTitleMessage);
pristine.addValidator(priceField, validatePrice, getPriceMessage);
pristine.addValidator(capacityField, validateCapacity, getCapacityMessage);

roomsField.addEventListener('change', () => {
  pristine.validate(capacityField);
});

typeField.addEventListener('change', () => {
  priceField.placeholder = typesToPrices[typeField.value];

  if (priceField.value !== '') {
    pristine.validate(priceField);
  }
});

const validateAdForm = () => pristine.validate();

const updatePriceSlider = () => {
  if (priceField.value !== '' && document.querySelector('.ad-form').classList.contains('ad-form--disabled') === false) {
    pristine.validate(priceField);
  }
};

const pristineReset = () => pristine.reset();

export {validateAdForm, updatePriceSlider, pristineReset};
