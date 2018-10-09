import {
    elements
} from './base';
import config from '../config';



export const renderResults = (movies) => {
    movies.forEach(renderMovie);
}

const renderMovie = movie => {
    const mapData = mappingData(movie);
    const markup = `
    <li class="movie">
        <div class="movie__poster">
            <img src="${mapData.img}" class="movie__image"
                alt="${mapData.title}">
        </div>
        <div class="movie__content">
            <h2 class="movie__title">${mapData.title}</h2>

            <div class="movie__stars">
                <div class="movie__rating">
                    <i class="fa fa-star movie__rate"></i>
                    <span class="">${movie.vote_average}/10</span>
                    <span class="movie__category float-right">Action, Fantasy</span>
                </div>
            </div>
            <p class="movie__description">
                ${movie.overview}
            </p>
            <a href="${movie.media_type}/${movie.id}" class="btn">Подробнее</a>
        </div>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const mappingData = data => {

    const defaultValue = 'Unknown';
    return {
        title: data.title || data.original_name || data.name || data.original_title || defaultValue,
        country: data.origin_country || defaultValue,
        img: getPictureUrl(),
        language: data.original_language || defaultValue,
        overview: getOverview(),
        popularity: data.popularity || defaultValue,
        id: data.id || Date.now(),
    }

    function getOverview() {
        const overview = data.overview;
        if (!overview) {
            return defaultValue;
        }
        return overview.substr(0, 120) + "...";
    }

    function getPictureUrl() {
        const url = data.poster_path || data.backdrop_path;
        if (url) {
            return config.imageSrc + url;
        } else {
            return config.noImageSrc;
        }
    }
}