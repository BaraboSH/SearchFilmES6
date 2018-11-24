import config from '../config';
import Item from './Item';
export default class Movie extends Item {
    constructor(id) {
        super(id);
        this.type = 'movie/';
    }
    async getItem() {
        try {
            const resJson = await fetch(`${config.queryMovieById}${this.id}?api_key=${config.apiKey}&language=${config.language}`);
            this.res = await resJson.json();
            this.title = this.res.title;
            this.date = this.renderDate(this.res.release_date);
            this.img = this.getPictureUrl(this.res.poster_path);
            await this.getCredits('movie');
            await this.getRecommend('movie');
        } catch (error) {
            alert(error);
        }
    }
    async renderResults(isLiked) {
        const data = this.res;
        const markup = `
            <article class="detail">
            <section class="detail-intro" style="background: url(${this.getPictureUrl(data.backdrop_path)}) no-repeat ;background-size:cover;">
            <div class="container">
                <div class="detail-intro__info">
                    <h3 class="detail-intro__title">${data.title}</h3>
                    <ul class="detail-intro__subtext-list">
                        <li class="detail-intro__subtext-item">${this.renderRuntime(data.runtime)}</li>
                        <li class="detail-intro__subtext-item">${this.renderGenre(data.genres)}</li>
                        <li class="detail-intro__subtext-item">${this.renderDate(data.release_date)}</li>
                    </ul>
                    ${await this.renderButtons(data,'movie')}
                    <a href="" class="detail-intro__like"><i class="${isLiked?"fa fa-heart":"far fa-heart"}"></i></a>
                    <div class="detail-intro__rating">
                        ${this.renderRate(data.vote_average)}
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
                    </div>
                    <div class="col-lg-4 col-sm-12">
                        <aside>
                            <div class="detail-main__widget widget">
                                <h3 class="detail-main__title">Подробиці</h3>
                                <ul class="detail-main__list list">
                                    <li class="detail-main__item"><strong>Прем'єра: </strong>${this.renderDate(data.release_date)}</li>
                                    <li class="detail-main__item"><strong>Режисер: </strong>${this.renderDirector()}</li>
                                    <li class="detail-main__item"><strong>Бюджет: </strong>${this.renderBudget(data.budget)} USD</li>
                                    <li class="detail-main__item"><strong>Збори: </strong>${this.renderBudget(data.revenue)} USD</li>
                                    <li class="detail-main__item"><strong>Країна: </strong>${this.renderCountries(data.production_countries)}</li>
                                    <li class="detail-main__item"><strong>Мова оригіналу: </strong>${data.original_language.toUpperCase()}</li>
                                    <li class="detail-main__item"><strong>Кінокомпанія: </strong>${this.renderCompanies(data.production_companies)}</li>
                                </ul>
                            </div>
                            <div class="detail-main__widget widget">
                                <h3 class="detail-main__title">Акторський склад</h3>
                                <ul class="detail-main__list list">
                                ${this.renderCasts()}
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
                        <h2 class="movie-popular__header">Вам також можуть сподобатись...</h2>
                    </div>
                    <div class="owl-carousel owl-theme">
                    ${this.renderRecommends('movie')}
                    </div>
                </div>
            </div>
        </section>
    </article>
        `;
        this.insertIntoDOM(markup);
        const owl = $(".info .owl-carousel");
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
        $(".info .owl-carousel").on("mousewheel", ".owl-stage", function (e) {
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
            const resJson = await fetch(`${config.movieGenre}?api_key=${config.apiKey}&language=${config.language}`);
            const res = await resJson.json();
            return res.genres;
        } catch (error) {
            alert(error);
        }
    }
}