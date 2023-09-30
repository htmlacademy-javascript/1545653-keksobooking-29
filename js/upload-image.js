import {renderMessage} from './upload-message.js';
import {FILE_TYPES, ERROR_STATE, ERROR_MESSAGE} from './constants.js';

const renderUploadImage = (target, preview) => {
  const file = target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const url = URL.createObjectURL(file);
    preview.src = url;
  } else {
    renderMessage(ERROR_STATE, ERROR_MESSAGE);
  }
};

export {renderUploadImage};
