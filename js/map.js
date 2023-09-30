import {createCard} from './create-popup.js';
import {START_COORDINATE, MapConfig, DECIMALS} from './constants.js';

const {TILE_LAYER, COPYRIGHT, MAP_ZOOM} = MapConfig;

const PIN_URL = './img/pin.svg';
const PIN_SIZE = 40;
const MAIN_PIN_URL = './img/main-pin.svg';
const MAIN_PIN_SIZE = 52;

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const addressInput = document.querySelector('#address');

const createIcon = (url, size) => L.icon({
  iconUrl: url,
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
});

const setStartAddressValue = () => {
  addressInput.value = `${START_COORDINATE.lat}, ${START_COORDINATE.lng}`;
};

const setLocation = (location) => {
  addressInput.value = `${location.lat.toFixed(DECIMALS)}, ${location.lng.toFixed(DECIMALS)}`;
};

const mainPinMarker = L.marker(START_COORDINATE, {
  draggable: true,
  icon: createIcon(MAIN_PIN_URL, MAIN_PIN_SIZE)
})
  .on('moveend', (evt) => {
    setLocation(evt.target.getLatLng());
  });

const resetMainPinMarker = () => {
  mainPinMarker.setLatLng(START_COORDINATE);
  setStartAddressValue(START_COORDINATE);
};

const createPinMarkers = (data) => {
  markerGroup.clearLayers();
  data.forEach((offer) => {
    const marker = L.marker(offer.location, {
      icon: createIcon(PIN_URL, PIN_SIZE),
    });
    marker
      .addTo(markerGroup)
      .bindPopup(createCard(offer));
  });
};

const resetMap = () => {
  map.setView(START_COORDINATE, MAP_ZOOM);
  resetMainPinMarker();
  map.closePopup();
};

const initMap = () =>
  new Promise((resolve) => {
    map
      .on('load', () => {
        resolve(true);
        setStartAddressValue(START_COORDINATE);
      })
      .setView(START_COORDINATE, MAP_ZOOM);
    L.tileLayer(TILE_LAYER, {
      attribution: COPYRIGHT
    }).addTo(map);

    mainPinMarker.addTo(map);
  });

export {initMap, resetMap, createPinMarkers, resetMainPinMarker};
