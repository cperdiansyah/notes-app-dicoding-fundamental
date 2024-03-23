export const customValidationInputHandler = (event) => {
  event.target.setCustomValidity('');
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity('Wajib diisi.');
    return;
  }

  if (event.target.validity.rangeUnderflow) {
    event.target.setCustomValidity('Terlalu pendek, silahkan tambahkan karakter lagi');
    return;
  }

  if (event.target.validity.rangeOverflow) {
    event.target.setCustomValidity('Terlalu panjang, coba hapus beberapa karakter');
    return;
  }

  if (event.target.validity.patternMismatch) {
    event.target.setCustomValidity('Tidak boleh mengandung karakter spesial seperti dolar ($).');
    return;
  }
};

export const validateFieldHandler = (event) => {
  // Validate the field
  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;
  const connectedValidationId = event.target.getAttribute('aria-describedby');
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl && errorMessage && !isValid) {
    connectedValidationEl.innerText = errorMessage;
  } else {
    connectedValidationEl.innerText = '';
  }
};
