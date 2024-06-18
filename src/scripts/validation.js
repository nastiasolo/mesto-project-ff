//Показываем ошибку - функция
const showError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

//Скрываем ошибку - функция
const hideError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

//Проверяем валидность полей - функция
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideError(formElement, inputElement, config);
  }
};

//Находим невалидный инпут
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Меняем состояние кнопки формы (активная/неактивная)
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

//Очистить валидацию
const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, config);
  });
  toggleButtonState(inputList, buttonElement, config);
};

//Добавляем слушалки инпутам
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

//Валидация всех форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

export { enableValidation, clearValidation };
