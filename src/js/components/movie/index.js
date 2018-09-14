import config from '../../config'

const formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
    day: "numeric"
});


export default function movie(data) {
    const mapData = mappingData(data);
    const html = `
                <a class='movie__link' href='${mapData.id}'>
                    <div class='movie__poster'><img src='${mapData.img}'</img></div>
                    <div class='movie__content'>        
                        <h2 class='movie__title text-center'>${mapData.title}</h2>
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
        overview: getOverview(),
        popularity: data.popularity || defaultValue,
        id: data.id || Date.now()
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

    function getDate() {
        const date = data.first_air_date || data.release_date;
        if (date) {
            return formatter.format(Date.parse(date));
        } else {
            return defaultValue;
        }
    }
}