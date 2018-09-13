import config from "../../config";


const formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
    day: "numeric"
});
const imageSrc = 'https://image.tmdb.org/t/p/w1280';

export default function movie(data) {
    const mapData = mappingData(data);
    const html = `
            <a class='movie__link' href='${mapData.id}'>
                <div class='movie__poster'><img src='${mapData.img}'</img></div>
                <div class='movie__content'>        
                    <h2 class='movie__title text-center'>${mapData.title}ХУЙ</h2>
                    <date class='movie__date'>${mapData.date}</date>
                    <div class='movie__country'>${mapData.country}</div>   
                    <div class='movie__language'>${mapData.language}</div>
                    <div class='movie__overview '>${mapData.overview}</div>
                    <div class='movie__popularity'>${mapData.popularity}</div>
                </div>
            </a>
    `
    return html;
}

function mappingData(data) {

    const defaultValue = 'Unknown';
    return {
        title: data.original_name || data.name || data.original_title || data.title || defaultValue,
        date: getDate(),
        country: data.origin_country || defaultValue,
        img: getPictureUrl(),
        language: data.original_language || defaultValue,
        overview: data.overview || defaultValue,
        popularity: data.popularity || defaultValue,
        id: data.id || Date.now()
    }

    function getPictureUrl() {
        const url = data.poster_path || data.backdrop_path;
        if (url) {
            return imageSrc + url;
        } else {
            return config.noImageSrc;
        }
    }

    function getDate() {
        const date = data.first_air_date || data.release_date;
        if (date) {
            return formatter.format(Date.parse(date));
        } else {
            return defaultValue;
        }
    }
}