// Импорт стилей
import "../css/style.scss";

// Импорт слайдер библиотеки
import "owl.carousel/dist/assets/owl.carousel.scss";
import "owl.carousel";

//// Импорт компонентов
//  Поиск
import Search from "./models/Search";
import * as searchView from "./views/searchView";

// Популярные фильмы
import Popular from "./models/Popular";
import * as popularView from "./views/popularView";

// Лучшие фильмы
import TopRated from "./models/TopRated";
import * as ratedView from "./views/topRatedView";
import * as movieListView from './views/movieListView';
// Импорт базовых элементов страницы
import {
    elements,
    renderLoader,
    clearLoader
} from "./views/base";


// Обьект текущего состояния
const state = {};

/**
 * КОНТРОЛЛЕР ПОИСКА
 */
const controlSearch = async () => {
    // 1) Получаю запрос с представления
    const query = searchView.getInput();

    if (query) {
        // 2) Новый обьект поиска и добавляю в состоянии
        state.search = new Search(query);

        // 3) Очистка поискового поля
        searchView.clearInput();

        // 4) Очистка результата
        searchView.clearResults();

        // 5) Отрисовка лоадера
        renderLoader(elements.searchResList);

        // 6) Скрываю блок постеров и показываю результаты 
        searchView.showBlock();
    }
    try {
        // 7) Поиск фильмов
        await state.search.getResults();
        // 8) Скрываю лоадер
        clearLoader();
        movieListView.renderResults(state.search.result);
        console.log(state.search.result);

    } catch (error) {
        clearLoader();
        alert('Something wrong with the search...');
        console.log(error);
    }
};

// const input = document.querySelector('.search-input');
// const movieList = document.querySelector('.movies');
// const mList = new MovieList();
// const filters = document.querySelector(".filters");
// const $sortButton = $('.mobile-sort');

// $sortButton.click(e => {
//     e.preventDefault();
//     const expanded = $(e.target).attr('aria-expanded') === 'true' || false;
//     $sortButton.attr('aria-expanded', !expanded);
// });

// input.addEventListener('input', e => {
//     const searchText = e.target.value;
//     if (!searchText) {
//         mList.clearList(movieList);
//         return;
//     }
//     movieServices.getVideoByText(searchText)
//         .then(data => {
//             mList.init(data);
//             mList.renderMovies(data.results);
//             mList.drawToDOM(movieList);
//         });
// });
// filters.addEventListener("click", (e) => {
//     e.preventDefault();
//     const target = e.target;
//     const data = target.dataset.filter;
//     if (!data) {
//         return;
//     }
//     mList.sort(data);
// });

// movieList.addEventListener("click", (e) => {
//     e.preventDefault();
//     const target = e.target;
//     const link = target.closest('.movie__link');
//     if (!link) {
//         return;
//     }
//     const id = link.getAttribute("href");
//     movieServices.getVideoById(id)
//         .then(data => {
//             console.log(data);
//         });

// })


// Событие поиска в инпуте
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});


document.addEventListener("DOMContentLoaded", async () => {
    // 1) Создаю новый обьект лучших фильмов и добавляю в состоянии
    state.topRated = new TopRated();

    // 2) Создаю новый обьект популярных фильмов и добавляю в состоянии
    state.popular = new Popular();

    // 3) Получаю асинхронно лучшие и популярные фильмы
    await state.topRated.getTopRated();
    await state.popular.getPopular();

    // 4) Отрисовываю постеры в дом-дерво
    ratedView.renderResults(state.topRated.items);
    popularView.renderResults(state.popular.items);

    // 5) Инициализирую слайдер для постеров
    const owl = $(".owl-carousel");
    owl.owlCarousel({
        loop: true,
        margin: 20,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });

    // 6) Обрабатываю событие мышки для прокрутки постеров
    owl.on("mousewheel", ".owl-stage", function (e) {
        if (e.originalEvent.wheelDelta > 0) {
            $(e.target)
                .closest(".owl-carousel")
                .trigger("next.owl");
        } else {
            $(e.target)
                .closest(".owl-carousel")
                .trigger("prev.owl");
        }
        e.preventDefault();
    });


});