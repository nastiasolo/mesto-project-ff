// @todo: Функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;

function createCard(dataCard, deleteCard, likeCard, openImgModal) {
  // @todo: DOM узлы
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = dataCard.link;
  cardElement.querySelector(".card__image").alt = dataCard.name;
  cardElement.querySelector(".card__title").textContent = dataCard.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(deleteButton);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });

  const img = cardElement.querySelector(".card__image");
  img.addEventListener("click", () => {
    openImgModal(dataCard);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(deleteButton) {
  const listItem = deleteButton.closest(".places__item");
  listItem.remove();
}

//Функция лайканья карточки
function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
