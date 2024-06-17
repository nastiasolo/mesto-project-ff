import { sendDeleteCard, sendLikes, deleteLikes } from "./api";
// @todo: Функция создания карточки
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
    deleteCard(deleteButton, dataCard._id);
  });

  const likeButton = cardElement.querySelector(".card__like-button");

  if (dataCard.likes.some((obj) => obj._id === profileData._id)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () => {
    if (dataCard.likes.some((obj) => obj._id === profileData._id)) {
      deleteCardLike(likeButton, dataCard._id, cardElement, dataCard);
    } else {
      likeCard(likeButton, dataCard._id, cardElement, dataCard);
    }
  });

  const img = cardElement.querySelector(".card__image");
  img.addEventListener("click", () => {
    openImgModal(dataCard);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(deleteButton, cardId, dataCard) {
  sendDeleteCard(cardId, dataCard)
    .then(() => {
      const listItem = deleteButton.closest(".places__item");
      listItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Функция лайканья карточки
function likeCard(likeButton, cardId, cardElement, dataCard) {
  sendLikes(cardId, dataCard)
    .then((result) => {
      dataCard.likes = result.likes;
      cardElement.querySelector(".card__like-count").textContent =
        result.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteCardLike(likeButton, cardId, cardElement, dataCard) {
  deleteLikes(cardId, dataCard)
    .then((result) => {
      dataCard.likes = result.likes;
      cardElement.querySelector(".card__like-count").textContent =
        result.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createCard, deleteCard, likeCard };
