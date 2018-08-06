let _singleton = Symbol();

export default class NewsService {
    NEWS_API_URL = 'https://guarded-forest-81137.herokuapp.com/api/news';

    findNews() {
        return fetch(this.NEWS_API_URL)
            .then(function (response) {
                return response.json();
            });
    }

    // Standard construction functions
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new NewsService(_singleton);
        return this[_singleton]
    }
}