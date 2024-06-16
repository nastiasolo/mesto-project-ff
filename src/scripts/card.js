// @todo: Функция создания карточки
import { sendDeleteCard } from "./api";
const cardTemplate = document.querySelector("#card-template").content;

function createCard(dataCard, profileData, deleteCard, likeCard, openImgModal) {
  // @todo: DOM узлы
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = dataCard.link;
  cardElement.querySelector(".card__image").alt = dataCard.name;
  cardElement.querySelector(".card__title").textContent = dataCard.name;
  cardElement.querySelector(".card__like-count").textContent =
    dataCard.likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (dataCard.owner._id !== profileData._id) {
    deleteButton.style.visibility = "hidden";
  }

  deleteButton.addEventListener("click", () => {
    console.log("Айди удаляемой карточки", dataCard._id);
    deleteCard(deleteButton, dataCard._id);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    console.log("Айди лайкнутой карточки", dataCard._id);
    likeCard(likeButton, dataCard._id);
  });

  const img = cardElement.querySelector(".card__image");
  img.addEventListener("click", () => {
    openImgModal(dataCard);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(deleteButton, cardId) {
  // fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/${cardId}`, {
  //   method: "DELETE",
  //   headers: {
  //     authorization: "843b32f0-6603-4aba-82ae-11619430f8b3",
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((res) => res.json())
  sendDeleteCard(cardId)
    .then((result) => {
      //форичем может искать по айди и удалять из дома
      console.log(result);
      const listItem = deleteButton.closest(".places__item");
      console.log(listItem);
      listItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Функция лайканья карточки
function likeCard(likeButton, cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "843b32f0-6603-4aba-82ae-11619430f8b3",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("Инфа о лайкнутой карточке с сервера", result);
      likeButton.classList.toggle("card__like-button_is-active");
      console.log(result.likes.length);
    });
}

export { createCard, deleteCard, likeCard };
