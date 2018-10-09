import config from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const resJson = await fetch(`${config.searchMovieUrl}${this.query}`);
            const res = await resJson.json();
            this.result = res.results;
        } catch (error) {
            alert(error);
        }
    }
}