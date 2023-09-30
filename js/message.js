const ALERT_SHOW_TIME = 5000;

const getAlertMessage = (message) => {
  const alertMessage = document.createElement('div');

  alertMessage.style.zIndex = '100';
  alertMessage.style.position = 'absolute';
  alertMessage.style.left = '0';
  alertMessage.style.top = '0';
  alertMessage.style.right = '0';
  alertMessage.style.padding = '10px 3px';
  alertMessage.style.fontSize = '15px';
  alertMessage.style.textAlign = 'center';
  alertMessage.style.backgroundColor = 'grey';

  alertMessage.textContent = message;

  document.body.append(alertMessage);

  setTimeout(() => {
    alertMessage.remove();
  }, ALERT_SHOW_TIME);
};

export {getAlertMessage};
