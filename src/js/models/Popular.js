import config from '../config';
import Items from "./Items";
export default class Popular extends Items {
    constructor() {
        super();
    }
    async getPopular() {
        try {
            const resJson = await fetch(config.popularMovie);
            const res = await resJson.json();
            this.items = res.results;
        } catch (error) {
            alert(error);
        }
    }
}