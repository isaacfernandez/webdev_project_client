let _singleton = Symbol();

export default class UserService {
    API_URL = 'https://guarded-forest-81137.herokuapp.com/api/';

    registerUser(user) {
        return fetch(this.API_URL + 'register',
            {
                method: 'post',
                headers: {'content-type' :'application/json'},
                body: JSON.stringify(user)
            }).then(function (response) {
                return response.json();
            });
    }

    login(user) {
        return fetch(this.API_URL + 'login',
            {
                method: 'post',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(user)
            }).then(function (response) {
                return response.json();
        })
    }

    // Standard construction functions
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }
}