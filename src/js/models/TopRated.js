import config from '../config';
import Items from "./Items";
export default class TopRated extends Items {
    constructor() {
        super();
    }
    async getTopRated() {
        try {
            const resJson = await fetch(config.topRatedMovie);
            const res = await resJson.json();
            this.items = res.results;
        } catch (error) {
            alert(error);
        }
    }
}