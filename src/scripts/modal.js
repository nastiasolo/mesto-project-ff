// Оттуда экспортируйте функции openModal и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие.

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  //Закрыть модальное окно по клику на оверлей
  popup.addEventListener("click", closeByOverlay);
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeByOverlay);
  document.removeEventListener("keydown", closeByEscape);
}

function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

//Закрыть модальное окно по кнопке Esc
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export { openModal, closeModal };
