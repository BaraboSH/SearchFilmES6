import config from '../config';
import Movie from "./Movie";
export default class TopRated extends Movie {
    constructor() {
        super();
    }
    async getTopRated() {
        try {
            const resJson = await fetch(`${config.topRatedMovie}?api_key=${config.apiKey}&language=${config.language}`);
            const res = await resJson.json();
            this.items = res.results;
        } catch (error) {
            alert(error);
        }
    }
}