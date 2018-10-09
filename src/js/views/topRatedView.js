import config from '../config';
import {
    elements
} from './base';

const formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
    day: "numeric"
});

const getDate = (date) => {
    return formatter.format(Date.parse(date));
}

const renderItem = item => {
    const markup = `
    <div class="movie-top_rated__item">
        <img src="${config.imageSrc}${item.poster_path}" class="movie-top_rated__poster"
            alt="">
        <div class="movie-top_rated__buttons">
            <a href="movie/${item.id}" class="btn btn-info">Подробнее</a>
        </div>
        <div class="movie-top_rated__stars">
            <div class="movie-top_rated__rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            <span>${item.vote_average}/10</span>
        </div>
        <div class="movie-top_rated__detail">
            <h4 class="movie-top_rated__title">${item.title}</h4>
            <span class="movie-top_rated__release">${getDate(item.release_date)}</span>
        </div>
    </div>
    `;
    elements.topRatedResult.insertAdjacentHTML('beforeend', markup);
};


export const renderResults = items => {
    items.forEach(renderItem);
}