import {initMap} from './map.js';
import {setFilters, disableFilters} from './filter.js';
import {disableAdForm} from './form.js';
import {getData} from './api.js';

disableAdForm();
disableFilters();

initMap()
  .then(() => {
    disableAdForm(false);
    getData()
      .then((data) => {
        disableFilters(false);
        setFilters(data);
      })
      .catch();
  })
  .catch();
