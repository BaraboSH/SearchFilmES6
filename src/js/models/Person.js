import config from "../config";
import Item from "./Item";

const professions = {
    'Acting': 'Актор',
    'Writing': 'Сценарист',
    'Directing': 'Режисер'
}

export default class Person extends Item {
    constructor(id) {
        super(id);
        this.type = 'p';
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
                        <div class="col-lg-7 col-sm-12">
                            <div class="detail-person__info">
                                <h2 class="detail-person__title">${data.name}</h2>
                                <p class="detail-person__biography">${data.biography}</p>
                            </div>
                            <div class="detail-person__films">
                                 <h3 class="detail-person__title">Фільмографія</h3>
                                 
                            </div> 
                        </div>
                            
                          
                        <div class="col-lg-5 col-sm-12">
                            <div class="detail-person__avatar">
                                <img class="detail-person__img" src="${super.getPictureUrl(data.profile_path)}">
                            </div>
                            <div class="detail-person__facts">
                                <h3 class="detail-person__title">Подробиці</h3>
                                <ul class="detail-person__list list">
                                    <li class="detail-person__item"><strong>Дата народження:</strong> ${super.renderDate(data.birthday)} ${this.renderAge(data.birthday,data.deathday)}</li>
                                    ${this.renderDeath(data.deathday)}
                                    <li class="detail-person__item"><strong>Місце народження: </strong>${data.place_of_birth || '-'}</li>
                                    <li class="detail-person__item"><strong>Професія: </strong>${professions[data.known_for_department]}</li>
                            </div>
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
            const res = await resJson.json();
            this.credits = res.cast.sort((a, b) => {
                return a.popularity < b.popularity;
            })
            console.log(this.credits);

        } catch (error) {
            alert(error);
        }
    }
    renderAge(data, death) {
        if (!data) return '';
        if (death) return '';
        return `(${(new Date().getFullYear() - new Date(Date.parse(data)).getFullYear())} років)`;
    }
    renderDeath(death) {
        if (!death) return '';
        return `
            <li class="detail-person__item"><strong>Дата смерті:</strong> ${super.renderDate(de)}</li>
        `
    }
}