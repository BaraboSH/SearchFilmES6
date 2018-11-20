import config from '../config';
import {
    elements
} from './base';



const getDate = (date) => {
    const formatter = new Intl.DateTimeFormat("ru", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    return formatter.format(Date.parse(date));
}
const renderRate = (rate) => {
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
    return result;
}

const renderItem = item => {
    const markup = `
    <div class="movie-popular__item">
        <img src="${config.imageSrc}${item.poster_path}" class="movie-popular__poster"
            alt="">
        <div class="movie-popular__buttons">
            <a href="#movie/${item.id}" class="btn btn-info">Подробиці</a>
        </div>
        <div class="movie-popular__stars">
            <div class="movie-popular__rating">
                ${renderRate(item.vote_average)}
            </div>
            <span>${item.vote_average}/10</span>
        </div>
        <div class="movie-popular__detail">
            <h4 class="movie-popular__title">${item.title}</h4>
            <span class="movie-popular__release">${getDate(item.release_date)}</span>
        </div>
    </div>
    `;
    elements.popularResult.insertAdjacentHTML('beforeend', markup);
};
export const renderResults = items => {
    items.forEach(renderItem);
}