import "../pages/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./cards";
import { createCard, deleteCard, likeCard } from "./card";
import { openModal, closeModal } from "./modal";
import { enableValidation, clearValidation } from "./validation";

// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list");

const editProfileButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const popupCloseButtonList = document.querySelectorAll(".popup__close");

const newCardPopupButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileForm = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const addForm = document.forms["new-place"];
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const placeUrlInput = document.querySelector(".popup__input_type_url");

const imgPopup = document.querySelector(".popup_type_image");
const imgPopupPicture = document.querySelector(".popup__image");
const imgPopupDescription = document.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  placesList.append(createCard(cardData, deleteCard, likeCard, openImgModal));
});

//Открыть модальное окно
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
  clearValidation(profileForm, validationConfig);
});

//Функция открытия попапа с картинкой
function openImgModal(cardData) {
  imgPopupPicture.src = cardData.link;
  imgPopupPicture.alt = cardData.name;
  imgPopupDescription.textContent = cardData.name;
  openModal(imgPopup);
  clearValidation(profileForm, validationConfig);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  // Вставьте новые значения с помощью textContent
  closeModal(profilePopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener("submit", handleProfileSubmit);

function handleAddForm(evt) {
  evt.preventDefault();
  const place = {
    name: placeNameInput.value,
    link: placeUrlInput.value,
  };
  placesList.prepend(createCard(place, deleteCard, likeCard, openImgModal));
  evt.target.reset();
  clearValidation(addForm, validationConfig);
  closeModal(newCardPopup);
}

addForm.addEventListener("submit", handleAddForm);

newCardPopupButton.addEventListener("click", () => openModal(newCardPopup));

//Закрыть модальное окно по клику на крестик
popupCloseButtonList.forEach((btn) => {
  const closestPopup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(closestPopup));
});

document.querySelectorAll(".popup").forEach((elem) => {
  elem.classList.add("popup_is-animated");
});

enableValidation(validationConfig);

//Обращение к серверу
function addProfileInfo(container, markup) {}

fetch("https://nomoreparties.co/v1/wff-cohort-16/users/me", {
  headers: {
    authorization: "843b32f0-6603-4aba-82ae-11619430f8b3",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
    console.log(result.name);
    console.log(nameInput);
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
  });
