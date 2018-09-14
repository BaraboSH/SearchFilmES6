import MovieList from "./components/movie-list";

import movieServices from "./components/movie-services";

import $ from "jquery";




const input = document.querySelector('.search-input');
const movieList = document.querySelector('.movies');
const mList = new MovieList();
const filters = document.querySelector(".filters");
const $sortButton = $('.mobile-sort');

$sortButton.click(e => {
    e.preventDefault();
    const expanded = $(e.target).attr('aria-expanded') === 'true' || false;
    $sortButton.attr('aria-expanded', !expanded);
});


input.addEventListener('input', e => {
    const searchText = e.target.value;
    if (!searchText) {
        mList.clearList(movieList);
        return;
    }
    movieServices.getVideoByText(searchText)
        .then(data => {
            mList.init(data);
            mList.renderMovies(data.results);
            mList.drawToDOM(movieList);
        });
});
filters.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target;
    const data = target.dataset.filter;
    if (!data) {
        return;
    }
    mList.sort(data);
});

movieList.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target;
    const link = target.closest('.movie__link');
    if (!link) {
        return;
    }
    const id = link.getAttribute("href");
    movieServices.getVideoById(id)
        .then(data => {
            console.log(data);
        });

})