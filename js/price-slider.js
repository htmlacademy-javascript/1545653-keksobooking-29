import {updatePriceSlider} from './validate-form.js';
import {PRICE_STEP} from './constants.js';
import {SLIDER_MAX} from './constants.js';

const priceField = document.querySelector('#price');
const slider = document.querySelector('.ad-form__slider');

const initPriceSlider = () => {
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }

  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: SLIDER_MAX
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
  priceField.value = '';
};

const resetSlider = () => slider.noUiSlider.reset();

export {initPriceSlider, resetSlider};
