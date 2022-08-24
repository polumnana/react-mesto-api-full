class authApi {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    //Регистрация
    signup({email, password}) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).then(this._checkResponse);//Проверка ответа
    }

    //Вход
    signin({email, password}) {

        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then(this._checkResponse);//Проверка ответа
    }

    //Проверка валидности токена и получения email для хедера
    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(this._checkResponse);//Проверка ответа
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const apiAuth = new authApi({
    baseUrl: 'https://polumnana.backend.nomoredomains.sbs',
});

export default apiAuth;



