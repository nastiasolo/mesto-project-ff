// @todo: Темплейт карточки
const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки

function createCard(dataCard, deleteCard) {
  // @todo: DOM узлы
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = dataCard.link;
  cardElement.querySelector(".card__image").alt = dataCard.name;
  cardElement.querySelector(".card__title").textContent = dataCard.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(deleteButton);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(deleteButton) {
  const listItem = deleteButton.closest(".places__item");
  listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  placesList.append(createCard(cardData, deleteCard));
});
