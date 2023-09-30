import {updatePriceSlider} from './validate-form.js';
import {PRICE_STEP} from './constants.js';

const priceField = document.querySelector('#price');
const slider = document.querySelector('.ad-form__slider');

const initPriceSlider = () => {
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }

  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100000
    },
    step: PRICE_STEP,
    format: {
      to(value) {
        return value.toFixed(0);
      },
      from(value) {
        return parseFloat(value);
      },
    },
    start: 0,
    connect: 'lower'
  });
  slider.noUiSlider.on('update', () => {
    const price = slider.noUiSlider.get();
    priceField.value = price;
    updatePriceSlider();
  });
  // priceField.addEventListener('input', (evt) => {
  //   slider.noUiSlider.set(evt.target.value);
  // });
  priceField.value = '';
};

const resetSlider = () => slider.noUiSlider.reset();

export {initPriceSlider, resetSlider};
