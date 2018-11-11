import config from '../config';
import Movie from "./Movie";
export default class Popular extends Movie {
    constructor() {
        super();
    }
    async getPopular() {
        try {
            const resJson = await fetch(`${config.popularMovie}?api_key=${config.apiKey}&language=${config.language}`);
            const res = await resJson.json();
            this.items = res.results;
        } catch (error) {
            alert(error);
        }
    }
}