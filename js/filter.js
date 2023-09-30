import {createPinMarkers} from './map.js';
import {debounce} from './utils.js';

const filterForm = document.querySelector('.map__filters');
const featuresCheckboxes = document.querySelectorAll('.map__checkbox');
const mapFilters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelector('.map__features');

const model = {
  features: []
};

const places = [];

const PriceRanges = {
  LOW: 10000,
  MIDDLE: 50000,
};

const getFeatures = () => Array.from(featuresCheckboxes).reduce((acc, item) => item.checked ? [...acc, item.value] : acc, []);

const updateModel = (filter, value) => {
  if (filter === 'features') {
    model.features.length = 0;
    model.features.push(...getFeatures());
  } else {
    model[filter] = value;
  }
};

const isPriceBelongRange = (range, price) => {
  switch (range) {
    case 'low':
      return price < PriceRanges.LOW;
    case 'middle':
      return price >= PriceRanges.LOW && price < PriceRanges.MIDDLE;
    case 'high':
      return price >= PriceRanges.MIDDLE;
  }
};

const getFilteredPoint = (data, filter) => {
  switch (filter) {
    case 'housing-type':
      return data.slice().filter((item) => model[filter] !== 'any' ? item.offer.type === model[filter] : item);
    case 'housing-price':
      return data.slice().filter((item) => model[filter] !== 'any' ? isPriceBelongRange(model[filter], item.offer.price) : item);
    case 'housing-rooms':
      return data.slice().filter((item) => model[filter] !== 'any' ? item.offer.rooms === Number(model[filter]) : item);
    case 'housing-guests':
      return data.slice().filter((item) => model[filter] !== 'any' ? item.offer.guests === Number(model[filter]) : item);
    case 'features':
      return model.features.length
        ? model.features.reduce((acc, item) => acc.filter((element) => element.offer.features?.includes(item)), data)
        : data;
  }
};

const filterPlaces = () => Object.keys(model).reduce((acc, item) => getFilteredPoint(acc, item), places.slice());

filterForm.addEventListener('change', debounce((event) => {
  updateModel(event.target.name, event.target.value);
  createPinMarkers(filterPlaces().slice(0, 10));
}, 500));

const setFilters = (data) => {
  places.push(...data.slice());
  createPinMarkers(places.slice(0, 10));
};

const disableFilters = (isDisabled = true) => {
  if (isDisabled) {
    filterForm.classList.add('map__filters--disabled');
  } else {
    filterForm.classList.remove('map__filters--disabled');
  }
  mapFilters.forEach((item) => {
    item.disabled = isDisabled;
  });
  mapFeatures.disabled = isDisabled;
} ;

const resetFilters = () => {
  filterForm.reset();
};

export {setFilters, disableFilters, resetFilters};
