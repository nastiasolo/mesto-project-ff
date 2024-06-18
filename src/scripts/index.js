import "../pages/index.css"; // добавьте импорт главного файла стилей
import { createCard, deleteCard, likeCard } from "./card";
import { openModal, closeModal } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  loadUserData,
  loadCardsData,
  sendProfileData,
  sendProfileImage,
  postNewCard,
} from "./api";

// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const buttonListClosePopup = document.querySelectorAll(".popup__close");

const profilePicture = document.querySelector(".profile__image-container");
const profilePicturePopup = document.querySelector(
  ".popup_type_editprofile-image"
);
const profilePictureForm = document.forms["new-profile-image"];

const buttonNewCardPopup = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profilePic = document.querySelector(".profile__image");
const profilePicInput = document.querySelector(
  ".popup__input_type_profile-image"
);

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
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-16",
  headers: {
    authorization: "843b32f0-6603-4aba-82ae-11619430f8b3",
    "Content-Type": "application/json",
  },
};

//Открыть модальное окно редактирования профиля
buttonOpenPopupProfile.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
  clearValidation(profileForm, validationConfig);
});

//Открыть модально окно редактирования аватара
profilePicture.addEventListener("click", () => {
  openModal(profilePicturePopup);
  clearValidation(profilePictureForm, validationConfig);
});

//Функция открытия попапа с картинкой
function openImgModal(cardData) {
  imgPopupPicture.src = cardData.link;
  imgPopupPicture.alt = cardData.name;
  imgPopupDescription.textContent = cardData.name;
  openModal(imgPopup);
  clearValidation(profilePictureForm, validationConfig);
}

Promise.all([loadUserData(apiConfig), loadCardsData(apiConfig)])
  .then(([profileData, cardsData]) => {
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profilePic.style.backgroundImage = `url(${profileData.avatar})`;
    // @todo: Вывести карточки на страницу
    cardsData.forEach((card) => {
      placesList.append(
        createCard(card, profileData._id, deleteCard, likeCard, openImgModal)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Обработчик «отправки» формы профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileForm.querySelector(validationConfig.submitButtonSelector).textContent =
    "Сохранение...";
  sendProfileData(nameInput, jobInput)
    .then((result) => {
      profileForm.querySelector(
        validationConfig.submitButtonSelector
      ).textContent = "Сохранить";
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      closeModal(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileForm.querySelector(
        validationConfig.submitButtonSelector
      ).textContent = "Сохранить";
    });
}

//Меняем аватар
function handleProfileImageSubmit(evt) {
  evt.preventDefault();
  profilePictureForm.querySelector(
    validationConfig.submitButtonSelector
  ).textContent = "Сохранение...";
  sendProfileImage(profilePicInput)
    .then((result) => {
      profilePictureForm.querySelector(
        validationConfig.submitButtonSelector
      ).textContent = "Сохранить";
      profilePic.style.backgroundImage = `url(${result.avatar})`;
      closeModal(profilePicturePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileForm.querySelector(
        validationConfig.submitButtonSelector
      ).textContent = "Сохранить";
    });
}

function handleAddForm(evt) {
  evt.preventDefault();
  addForm.querySelector(validationConfig.submitButtonSelector).textContent =
    "Сохранение...";
  postNewCard(placeNameInput, placeUrlInput)
    .then((result) => {
      addForm.querySelector(validationConfig.submitButtonSelector).textContent =
        "Сохранить";
      console.log("Инфа при добавлении фото из формы", result);
      const place = {
        name: result.name,
        link: result.link,
        likes: [],
        _id: result._id,
        owner: { _id: result.owner._id },
      };
      placesList.prepend(
        createCard(place, result.owner, deleteCard, likeCard, openImgModal)
      );
      evt.target.reset();
      clearValidation(addForm, validationConfig);
      closeModal(newCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileForm.querySelector(
        validationConfig.submitButtonSelector
      ).textContent = "Сохранить";
    });
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener("submit", handleProfileSubmit);
profilePictureForm.addEventListener("submit", handleProfileImageSubmit);
addForm.addEventListener("submit", handleAddForm);

buttonNewCardPopup.addEventListener("click", () => openModal(newCardPopup));

//Закрыть модальное окно по клику на крестик
buttonListClosePopup.forEach((btn) => {
  const closestPopup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(closestPopup));
});

document.querySelectorAll(".popup").forEach((elem) => {
  elem.classList.add("popup_is-animated");
});

enableValidation(validationConfig);
