class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    fetchCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        }).then(this._checkResponse);
    }

    fetchUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        }).then(this._checkResponse);
    }

    updateUserInfo({name, about}) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(this._checkResponse);
    }

    updateUserAvatar(userAvatar) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: userAvatar,
            })
        }).then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    createCard({name, link}) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            })
        }).then(this._checkResponse);
    }

    likeCard(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    unlikeCard(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
    headers: {
        authorization: '313ac141-ac1d-4bd4-8cbd-191f2a15741d',
        'Content-Type': 'application/json'
    }
});

export default api;