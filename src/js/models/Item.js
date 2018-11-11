import {
    elements
} from "../views/base";
import config from "../config";

export default class Item {
    constructor(id) {
        this.id = id;
    }
    insertIntoDOM(markup) {
        window.scrollTo(0, 0);
        elements.info.insertAdjacentHTML("afterbegin", markup);
    }
    getPictureUrl(url) {
        if (url) {
            return config.bgSrc + url;
        } else {
            return config.noImageSrc;
        }
    }
    renderGenre(genres) {
        if (!genres) return "Неизвестно";
        const resGenres = new Set();
        genres.forEach(el => {
            resGenres.add(el["name"]);
        });
        return `${Array.from(resGenres).join(", ")}`;
    }
    renderRuntime(time) {
        if (!time) return `Неизвестно`;
        if (time / 60 > 1) {
            return `${Math.floor(time / 60)} ч ${time % 60} мин`;
        }
        return `${time} мин`;
    }
    renderDate(date) {
        if (date) {
            const formatter = new Intl.DateTimeFormat("ru", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
            return formatter.format(Date.parse(date));
        } else {
            return "-";
        }
    }

    renderRate(rate) {
        const countOfStars = 4;
        let calcRate = (countOfStars * rate) / 10;
        let result = '';
        for (let i = 0; i < countOfStars; i++) {
            if (i < Math.floor(calcRate)) {
                result += '<i class="fa fa-star"></i>';
            } else if ((calcRate % 1) * 10 > 5) {
                calcRate = 0;
                result += '<i class="fa fa-star"></i>';
            } else if ((calcRate % 1) * 10 < 5 && calcRate !== 0) {
                calcRate = 0;
                result += '<i class="fas fa-star-half-alt"></i>'
            } else {
                result += '<i class="far fa-star"></i>';
            }
        }
        result += `<div class="detail-intro__rating--rate">${rate}/10</div>`
        return result;
    }

    async renderButtons(data, type) {
        let result = "";
        const urlVideo = await this.getVideo(type);
        if (urlVideo) {
            result += `<a href="http://www.youtube.com/watch?v=${urlVideo}" class="btn-inline btn-video" >Видео</a>`;
        }
        if (data.homepage) {
            result += `<a href="${data.homepage}" target="_blank" class="btn-inline">Сайт</a>`;
        }
        return result;
    }
    async getVideo(type) {
        try {
            let resJson = await fetch(`https://api.themoviedb.org/3/${type}/${this.id}/videos?api_key=${config.apiKey}&language=${config.language}`);
            let json = await resJson.json();
            let res = json.results;
            if (res.length == 0) {
                resJson = await fetch(`https://api.themoviedb.org/3/${type}/${this.id}/videos?api_key=${config.apiKey}&language=en-US`);
                json = await resJson.json();
                res = json.results;
            }
            let url = "";
            for (let i = 0; i < res.length; i++) {
                if (res[i].site == "YouTube" && res[i].type == "Trailer") {
                    url = res[i].key;
                    break;
                }
            }
            return url;
        } catch (error) {
            alert(error);
        }
    }

    async getCredits(type) {
        try {
            const resJson = await fetch(`https://api.themoviedb.org/3/${type}/${this.id}/credits?api_key=${config.apiKey}&language=${config.language}`);
            const json = await resJson.json();
            this.cast = json.cast;
            this.crew = json.crew;
        } catch (error) {
            alert(error);
        }
    }

    async getRecommend(type) {
        try {
            const resJson = await fetch(`https://api.themoviedb.org/3/${type}/${this.id}/recommendations?api_key=${config.apiKey}&language=${config.language}`);
            const json = await resJson.json();
            this.recommendations = json.results;
        } catch (error) {
            alert(error);
        }
    }

    renderDirector() {
        const crew = this.crew;
        let result = '';
        crew.forEach((el) => {
            if (el.job == "Director") result += `<a href="#person/${el.id}">${el.name}</a> `;
        });
        return result;
    }
    renderBudget(budget) {
        let result = '';
        if (budget / (1000 * 1000) > 1) result += `${budget/(1000 * 1000)} million`
        else result += budget;
        return result;
    }
    renderCountries(countries) {
        let result = [];
        countries.forEach((el) => {
            result.push(el.name);
        })
        return result.join(', ');
    }
    renderCompanies(company) {
        let result = [];
        company.forEach((el) => {
            result.push(el.name);
        })
        return result.join(', ');
    }
    renderCasts() {
        let result = "";
        this.cast.slice(0, 5).forEach((el) => {
            result += this.renderCast(el);
        });
        return result;

    }
    renderCast(cast) {
        return `
        <li class="detail-main__cast-item">
            <a href="#person/${cast.id}">
                <div class="detail-main__img-wrapper">
                    <img src="https://image.tmdb.org/t/p/w780/${cast.profile_path}"
                        alt="${cast.name}" class="detail-main__img">
                </div>
                <h6 class="detail-main__cast-name">${cast.name}</h6>
            </a>
        </li>
        `;
    }
    renderRecommends(type) {
        let result = "";
        this.recommendations.forEach((el) => {
            result += this.renderRecommend(el, type);
        });
        return result;
    }
    renderRecommend(item, type) {
        return `
        <div class="movie-popular__item">
            <img src="${config.imageSrc}${item.poster_path}" class="movie-popular__poster"
                alt="">
            <div class="movie-popular__buttons">
                <a href="#${type}/${item.id}" class="btn btn-info">Подробнее</a>
            </div>
            <div class="movie-popular__stars">
                <div class="movie-popular__rating">
                    ${this.renderRate(item.vote_average)}
                </div>
            </div>
            <div class="movie-popular__detail">
                <h4 class="movie-popular__title">${item.title || item.name}</h4>
                <span class="movie-popular__release">${this.renderDate(item.release_date || item.first_air_date)}</span>
            </div>
        </div>
        `;
    }
}