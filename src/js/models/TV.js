import config from "../config";
import Item from "./Item";
import {
    elements
} from '../views/base'
export default class TV extends Item {
    constructor(id) {
        super(id);
        this.type = 'tv/';
    }
    async getItem() {
        try {
            const resJson = await fetch(
                `${config.queryTVById}${this.id}?api_key=${config.apiKey}&language=${config.language}`
            );
            this.res = await resJson.json();
            this.title = this.res.name;
            this.date = super.renderDate(this.res.first_air_date);
            this.img = super.getPictureUrl(this.res.poster_path);
            await super.getCredits("tv");
            await super.getRecommend("tv");
            console.log(this.res);
        } catch (error) {
            alert(error);
        }
    }

    async renderResults(isLiked) {
        const data = this.res;
        const markup = `
            <article class="detail">
            <section class="detail-intro" style="background: url(${super.getPictureUrl(
              data.backdrop_path
            )}) no-repeat ;background-size:cover;">
            <div class="container">
                <div class="detail-intro__info">
                    <h3 class="detail-intro__title">${data.name}</h3>
                    <ul class="detail-intro__subtext-list">
                        <li class="detail-intro__subtext-item">${super.renderRuntime(
                          data.episode_run_time[0]
                        )}</li>
                        <li class="detail-intro__subtext-item">${super.renderGenre(
                          data.genres
                        )}</li>
                        <li class="detail-intro__subtext-item">${super.renderDate(
                          data.first_air_date
                        )}</li>
                    </ul>
                    ${await super.renderButtons(data, "tv")}
                    <a href="" class="detail-intro__like"><i class="${isLiked?"fa fa-heart":"far fa-heart"}"></i></a>
                    <div class="detail-intro__rating">
                        ${super.renderRate(data.vote_average)}
                        <span>${data.vote_count} голосуючих</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="detail-main">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-sm-12">
                        <div class="detail-main__content">
                            <div class="detail-main__storyline">
                                <h3 class="detail-main__title">Опис</h3>
                                <p class="detail-main__description">
                                    ${data.overview}
                                </p>
                            </div>
                        </div>
                        <div class="detail-main__seasons">
                            
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-12">
                        <aside>
                            <div class="detail-main__widget">
                                <h3 class="detail-main__title">Подробиці</h3>
                                <ul class="detail-main__list list">
                                    <li class="detail-main__item"><strong>Прем'єра: </strong>${super.renderDate(
                                      data.first_air_date
                                    )}</li>
                                    <li class="detail-main__item"><strong>Режисер: </strong>${this.renderDirector(
                                      data.created_by
                                    )}</li>
                                    <li class="detail-main__item"><strong>Канал: </strong>${
                                      data.networks[0].name
                                    }</li>
                                    <li class="detail-main__item"><strong>Країна: </strong>${
                                      data.origin_country[0]
                                    }</li>
                                    <li class="detail-main__item"><strong>Мова оригіналу: </strong>${data.original_language.toUpperCase()}</li>
                                    <li class="detail-main__item"><strong>Кінокомпанія: </strong>${super.renderCompanies(
                                      data.production_companies
                                    )}</li>
                                </ul>
                            </div>
                            <div class="detail-main__widget">
                                <h3 class="detail-main__title">Акторський склад</h3>
                                <ul class="detail-main__list list">
                                ${super.renderCasts()}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </section>
    </article>
    <article class="recommend">
        <section class="movie-popular">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-8 text-center text-md-left">
                        <h2 class="movie-popular__header">Вам також можуть сподобатися...</h2>
                    </div>
                    <div class="owl-carousel owl-theme">
                    ${super.renderRecommends("tv")}
                    </div>
                </div>
            </div>
        </section>
    </article>
        `;
        super.insertIntoDOM(markup);
        this.renderSeasons(data.seasons);
        const owl = $(".owl-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 20,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        });
        $(".owl-carousel").on("mousewheel", ".owl-stage", function (e) {
            if (e.originalEvent.wheelDelta > 0) {
                $(e.target)
                    .closest(".owl-carousel")
                    .trigger("next.owl");
            } else {
                $(e.target)
                    .closest(".owl-carousel")
                    .trigger("prev.owl");
            }
            e.preventDefault();
        });
    }

    static async getGenres() {
        try {
            const resJson = await fetch(
                `${config.tvGenre}?api_key=${config.apiKey}&language=${config.language}`
            );
            const res = await resJson.json();
            return res.genres;
        } catch (error) {
            alert(error);
        }
    }
    renderDirector(data) {
        let result = "";
        data.forEach(el => {
            result += `<a href="#person/${el.id}">${el.name}</a> `;
        });
        return result;
    }
    async renderSeasons(data) {
        let result = "";
        for (let i = 0; i < data.length; i++) {
            result += await this.renderSeason(data[i]);
        }
        document.querySelector('.detail-main__seasons').insertAdjacentHTML("afterbegin", result);
    }
    async renderSeason(el) {
        return `
        <div class="detail-main__season">
            <div class="detail-main__season-main">
                <div class="detail-main__season-poster">
                    <img class="detail-main__season-img" src="${super.getPictureUrl(el.poster_path)}">
                </div>
                <div class="detail-main__season-info">
                    <h3 class="detail-main__season-title">${el.name}</h3>
                    <p class="detail-main__season-date"><i class="far fa-calendar-alt"></i> ${super.renderDate(el.air_date)}</p>
                    <p class="detail-main__season-ep_count"><i class="far fa-bookmark"></i> Кількість серій: ${el.episode_count}</p>
                </div>
            </div>
            <ul class="detail-main__episodes">
                    ${await this.renderEpisodes(el.season_number)}
            </ul>
        </div>
      `;
    }
    async renderEpisodes(num) {
        try {
            const resJson = await fetch(
                `${config.queryTVById}${this.id}/season/${num}?api_key=${config.apiKey}&language=${config.language}`
            );
            const res = await resJson.json();
            let markup = '';
            res.episodes.forEach((el) => {
                markup += this.renderEpisode(el);
            })
            return markup;
        } catch (error) {
            alert(error);
        }
    }
    renderEpisode(el) {
        return `
                <li class="detail-main__episode">
                    <div class="detail-main__episode-poster">
                        <img class="detail-main__episode-img" src="${super.getPictureUrl(el.still_path)}">
                    </div>
                    <div class="detail-main__episode-info">
                        <h3 class="detail-main__episode-title">Серія ${el.episode_number}</h3>
                        <h3 class="detail-main__episode-title">${el.name}</h3>
                        <p class="detail-main__episode-overview"> ${el.overview}</p>
                    </div>
                </li>
            `
    }
}