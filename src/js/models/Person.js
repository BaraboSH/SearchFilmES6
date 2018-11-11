import config from "../config";
import Item from "./Item";

export default class Person extends Item {
    constructor(id) {
        super(id);
    }
    async getItem() {
        try {
            const resJson = await fetch(`${config.queryPersonById}${this.id}?api_key=${config.apiKey}&language=${config.language}`);
            this.res = await resJson.json();
            console.log(this.res);
            await this.getCredits();
        } catch (error) {
            alert(error);
        }
    }
    renderResults() {
        const data = this.res;
        const markup = `
            <article class="detail-person">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-sm-12"
                            <div class="detail-person__avatar">
                                <img class="detail-person__img" src="${super.getPictureUrl(data.profile_path)}">
                            </div>
                        </div>
                        <div class="col-lg-8 col-sm-12">
                        
                        </div>
                    </div>    
                </div>
            </article>
        `;
        super.insertIntoDOM(markup);
    }
    async getCredits() {
        try {
            const resJson = await fetch(`${config.queryPersonById}${this.id}/combined_credits?api_key=${config.apiKey}&language=${config.language}`);
            this.credits = await resJson.json();
            console.log(this.credits);

        } catch (error) {
            alert(error);
        }
    }
}