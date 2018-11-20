import {
    elements
} from './base';
import config from '../config';
import Movie from '../models/Movie';
import TV from '../models/TV';

let movieGenres, tvGenres;

export const renderResults = async (movies, length = 20, page = 1) => {
    movieGenres = await Movie.getGenres();
    tvGenres = await TV.getGenres();
    movies.forEach((el) => {
        renderItem(el, el.media_type);
    });
    renderButtons(page, length);
}


const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <i class="fas fa-angle-double-${type === 'prev' ? 'left' : 'right'}"></i>
    </button>
`;

const renderButtons = (page, numResults, resPerPage = 20) => {
    if (numResults > resPerPage) {
        const pages = Math.ceil(numResults / resPerPage);

        let button;
        if (page === 1 && pages > 1) {
            // Only button to go to next page
            button = createButton(page, 'next');
        } else if (page < pages) {
            // Both buttons
            button = `
                ${createButton(page, 'prev')}
                ${createButton(page, 'next')}
            `;
        } else if (page === pages && pages > 1) {
            // Only button to go to prev page
            button = createButton(page, 'prev');
        }

        elements.searchResPages.insertAdjacentHTML('afterbegin', button);
    }

};
export const limitMovieDescription = (title, limit = 150) => {
    if (!title) return 'Немає інформації';
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderItem = (movie, type) => {
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
                    <span class="">${mapData.rate}/10</span>
                    <span class="movie__category float-right">${mapData.genre}</span>
                </div>
            </div>
            <p class="movie__description">
                ${mapData.description}
            </p>
            <a href="#${mapData.type}/${mapData.id}" class="btn btn-more">Подробиці</a>
        </div>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const mappingData = data => {
    const defaultValue = 'Unknown';
    return {
        title: data.title || data.original_name || data.name || data.original_title || defaultValue,
        img: getPictureUrl(),
        description: limitMovieDescription(data.overview),
        id: data.id || Date.now(),
        genre: renderGenre(data.genre_ids, data.media_type),
        rate: movieRating(data.vote_average),
        type: data.media_type || 'movie'
    }

    function getPictureUrl() {
        const url = data.poster_path || data.backdrop_path || data.profile_path;
        if (url) {
            return config.imageSrc + url;
        } else {
            return config.noImageSrc;
        }
    }

    function movieRating(rate) {
        return rate ? rate : '0';
    }


    function renderGenre(genres, type) {
        if (!genres) return 'Невідомо';
        const item = type === 'tv' ? tvGenres : movieGenres;
        const resGenres = [];
        genres.forEach((el) => {
            item.forEach((genre) => {
                if (genre['id'] == el) {
                    resGenres.push(genre['name']);
                }
            })
        });
        return `${resGenres.slice(0, 3).join(', ')}`;
    };
}