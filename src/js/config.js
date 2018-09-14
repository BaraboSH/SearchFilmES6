const API_KEY = '30c94ae83f75740e876f0072914f1491';


export default {
    searchMovieUrl: `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=`,
    imageSrc: 'https://image.tmdb.org/t/p/w342',
    noImageSrc: 'https://www.freeiconspng.com/uploads/no-image-icon-15.png',
    baseMovieUrl: 'https://api.themoviedb.org/3/',
    queryMovieByIdForSerials: 'tv/',
    queryMovieByIdForMovies: 'movies/',
    apiKey: `?api_key=${API_KEY}`
}