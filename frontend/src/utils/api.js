class Api {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    fetchCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._getHeaders(),
        }).then(this._checkResponse);
    }

    fetchUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._getHeaders(),
        }).then(this._checkResponse);
    }

    updateUserInfo({name, about}) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(this._checkResponse);
    }

    updateUserAvatar(userAvatar) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: userAvatar,
            })
        }).then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        }).then(this._checkResponse);
    }

    createCard({name, link}) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: name,
                link: link,
            })
        }).then(this._checkResponse);
    }

    likeCard(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._getHeaders(),
        }).then(this._checkResponse);
    }

    unlikeCard(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        }).then(this._checkResponse);
    }

    _getToken() {
        return `Bearer ${localStorage.getItem('jwt')}`;
    }

    _getHeaders() {
        return {
            'Authorization': this._getToken(),
            'Content-Type': 'application/json'
        };
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
    baseUrl: 'https://polumnana.backend.nomoredomains.sbs',
});

export default api;