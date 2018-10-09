const API_KEY = '30c94ae83f75740e876f0072914f1491';
const language = 'ru-RU';

export default {
    searchMovieUrl: `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=${language}&query=`,
    imageSrc: 'https://image.tmdb.org/t/p/w780',
    noImageSrc: 'https://www.freeiconspng.com/uploads/no-image-icon-15.png',
    baseMovieUrl: 'https://api.themoviedb.org/3/',
    queryMovieByIdForSerials: 'tv/',
    queryMovieByIdForMovies: 'movies/',
    apiKey: `?api_key=${API_KEY}`,
    popularMovie: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}`,
    topRatedMovie: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=${language}`
}