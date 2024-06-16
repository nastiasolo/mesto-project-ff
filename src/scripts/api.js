const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-16",
  headers: {
    authorization: "843b32f0-6603-4aba-82ae-11619430f8b3",
    "Content-Type": "application/json",
  },
};

export const loadCardsData = () => {
  return Promise.all([
    fetch(`${apiConfig.baseUrl}/users/me`, {
      headers: apiConfig.headers,
    }).then((res) => res.json()),
    fetch(`${apiConfig.baseUrl}/cards`, {
      headers: apiConfig.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    }),
  ]);
};

export const sendProfileData = (nameInput, jobInput) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const sendProfileImage = (profilePicInput) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: profilePicInput.value,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

//добавить пост реквест

export const sendDeleteCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};
