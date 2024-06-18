export const loadUserData = (apiConfig) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export const loadCardsData = (apiConfig) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
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

export const postNewCard = (placeNameInput, placeUrlInput) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: placeNameInput.value,
      link: placeUrlInput.value,
    }),
  }).then((res) => res.json());
};

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

export const sendLikes = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

export const deleteLikes = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};
