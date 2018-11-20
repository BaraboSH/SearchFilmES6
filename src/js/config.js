const API_KEY = "30c94ae83f75740e876f0072914f1491";
let language = localStorage.getItem('lang') || 'uk-UA';

const changeLanguage = () => {
    if (language === "uk-UA") {
        localStorage.setItem('lang', 'ru-RU');

    } else {
        localStorage.setItem('lang', 'uk-UA');
    }
}
const getLanguage = () => {
    return language;
}

export default {
    searchUrl: "https://api.themoviedb.org/3/search/multi",
    bgSrc: "https://image.tmdb.org/t/p/original",
    imageSrc: "https://image.tmdb.org/t/p/w780",
    noImageSrc: "https://via.placeholder.com/350x400/cccccc/000?text=NO+IMAGE+AVAILABLE",
    baseMovieUrl: "https://api.themoviedb.org/3/",
    queryTVById: "https://api.themoviedb.org/3/tv/",
    queryMovieById: "https://api.themoviedb.org/3/movie/",
    queryPersonById: "https://api.themoviedb.org/3/person/",
    apiKey: API_KEY,
    language: getLanguage(),
    setLanguage: () => {
        changeLanguage();
    },
    popularMovie: "https://api.themoviedb.org/3/movie/popular",
    topRatedMovie: "https://api.themoviedb.org/3/movie/top_rated",
    movieGenre: "https://api.themoviedb.org/3/genre/movie/list",
    tvGenre: "https://api.themoviedb.org/3/genre/tv/list"
};