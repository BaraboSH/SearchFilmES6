import config from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const resJson = await fetch(`${config.searchUrl}?api_key=${config.apiKey}&language=${config.language}&query=${this.query}`);
            const res = await resJson.json();
            this.result = res.results;
            this.totalResults = res.total_results;
        } catch (error) {
            alert(error);
        }
    }

    async goToPage(page) {
        try {
            const resJson = await fetch(`${config.searchUrl}?api_key=${config.apiKey}&language=${config.language}&query=${this.query}&page=${page}`);
            const res = await resJson.json();
            this.result = res.results;
        } catch (error) {
            alert(error);
        }
    }
}