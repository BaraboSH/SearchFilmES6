import config from "../config";
import Item from "./Item";

const professions = {
    'Acting': 'Актор',
    'Writing': 'Сценарист',
    'Directing': 'Режисер',
    'Art': 'Візуальні ефекти'
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
            await this.getCredits();
            console.log(this.res);

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
                            <div class="detail-person__info widget">
                                <h2 class="detail-person__title">${data.name}</h2>
                                <p class="detail-person__biography">${data.biography}</p>
                            </div>
                            <div class="detail-person__films widget">
                                 <h3 class="detail-person__works-title detail-person__title">Відомі роботи</h3>
                                 <ul class="detail-person__works">
                                    ${this.renderWorks()}
                                 </ul>
                            </div> 
                        </div>
                            
                          
                        <div class="col-lg-5 col-sm-12">
                            <div class="detail-person__avatar">
                                <img class="detail-person__img" src="${this.getPictureUrl(data.profile_path)}">
                            </div>
                            <div class="detail-person__facts widget">
                                <h3 class="detail-person__title">Подробиці</h3>
                                <ul class="detail-person__list list">
                                    <li class="detail-person__item"><strong>Дата народження:</strong> ${this.renderDate(data.birthday)} ${this.renderAge(data.birthday,data.deathday)}</li>
                                    ${this.renderDeath(data.deathday)}
                                    <li class="detail-person__item"><strong>Місце народження: </strong>${data.place_of_birth || '-'}</li>
                                    <li class="detail-person__item"><strong>Професія: </strong>${professions[data.known_for_department]}</li>
                            </div>
                        </div>
                    </div> 
                </div>
            </article>
        `;
        this.insertIntoDOM(markup);
    }
    async getCredits() {
        try {
            const resJson = await fetch(`${config.queryPersonById}${this.id}/combined_credits?api_key=${config.apiKey}&language=${config.language}`);
            const res = await resJson.json();
            if (this.res.known_for_department == "Acting") {
                this.credits = res.cast;
            } else {
                this.credits = res.crew;
            }
            this.credits.sort((a, b) => {
                return a.popularity < b.popularity ? 1 : -1;
            });
            this.credits = this.credits.filter((el) => {
                return el.job == "Director";
            });
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
            <li class="detail-person__item"><strong>Дата смерті:</strong> ${this.renderDate(de)}</li>
        `
    }
    renderWorks() {
        let result = '';
        this.credits.forEach((el) => {
            result += this.renderWork(el);
        })
        return result;
    }
    renderWork(data) {
        const markup = `
            <li class="detail-person__work">
                <a class="detail-person__work-link" href="#${data.media_type}/${data.id}">
                    <div class="detail-person__work-poster">
                        <img class="detail-person__work-img" src="${this.getPictureUrl(data.poster_path)}">
                    </div>
                    <div class="detail-person__work-info">
                        <h3 class="detail-person__work-title">${data.title||data.name}</h3>
                        <p class="detail-person__work-character">${this.renderCharacter(data.character)}</p>
                        <p class="detail-person__work-date">${this.renderDate(data.first_air_date||data.release_date)}</p>
                    </div>
                </a>
            </li>
        `
        return markup;
    }
    renderCharacter(data) {
        if (!data) {
            return '';
        }
        return `<strong>В ролі:</strong> ${data.character}`;
    }
}