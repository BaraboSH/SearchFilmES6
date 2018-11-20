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

// Импорт базовых элементов страницы
import {
    elements,
    renderLoader,
    clearLoader
} from "./views/base";

// Импорт списка
import MovieList from "./models/MovieList";
import * as movieListView from "./views/movieListView";

import Likes from "./models/Likes";
import * as likesView from "./views/likesView";
import Movie from "./models/Movie";
import TV from "./models/TV";
import Person from "./models/Person"
import config from "./config";

// Обьект текущего состояния
const state = {};

/**
 * КОНТРОЛЛЕР ПОИСКА
 */
const controlSearch = async (url) => {
    // 1) Получаю запрос с представления
    const query = searchView.getInput() || url;
    if (query && query != '') {
        // 2) Новый обьект поиска и добавляю в состоянии
        state.search = new Search(query);

        // 3) Очистка поискового поля
        searchView.clearInput();

        // 4) Очистка результата
        searchView.clearResults();

        // 5) Отрисовка лоадера
        renderLoader(elements.searchResList);

        // 6) Скрываю блок постеров и показываю результаты
        elements.sortBy.selectedIndex = 0;
        searchView.showResults();
        try {
            // 7) Поиск фильмов
            await state.search.getResults();
            // 8) Скрываю лоадер
            clearLoader();
            elements.searchTitle.innerHTML = `Найдено ${state.search.totalResults} по запросу '${decodeURIComponent(state.search.query)}'`;
            state.mList = new MovieList(state.search.result);
            movieListView.renderResults(state.search.result, state.search.totalResults);
            console.log(state.search.result);
        } catch (error) {
            clearLoader();
            alert("Something wrong with the search...");
            console.log(error);
        }
    }
};

/**
 * КОНТРОЛЕР ДЕТАЛЬНОЙ ИНФОРМАЦИИ
 */
const controlDetail = async (type, id) => {
    switch (type) {
        case "movie":
            state.detail = new Movie(id);
            break;
        case "tv":
            state.detail = new TV(id);
            break;
        case "person":
            state.detail = new Person(id);
            break;
        default:
            throw new Error("Page not found");
            break;
    }
    searchView.showDetail();
    renderLoader(elements.info);
    await state.detail.getItem();
    clearLoader();
    state.detail.renderResults(state.likes.isLiked(state.detail.type + id));

};

/**
 * КОНТРОЛЛЕР ЛАЙКОВ
 */
const controlLikes = () => {
    console.log("LIKE");

    if (!state.likes) state.likes = new Likes();
    const currentID = state.detail.type + state.detail.id;
    console.log(currentID);

    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.detail.title,
            state.detail.date,
            state.detail.img
        );
        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);

        // User HAS liked current recipe
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

const mainMenu = async () => {
    searchView.showAdvertise();
    if (!state.topRated) {
        // 1) Создаю новый обьект лучших фильмов и добавляю в состоянии
        state.topRated = new TopRated();
        // 3) Получаю асинхронно лучшие и популярные фильмы
        await state.topRated.getTopRated();
        // 4) Отрисовываю постеры в дом-дерво
        ratedView.renderResults(state.topRated.items);
    }
    if (!state.popular) {
        // 2) Создаю новый обьект популярных фильмов и добавляю в состоянии
        state.popular = new Popular();

        // 3) Получаю асинхронно лучшие и популярные фильмы
        await state.popular.getPopular();
        // 4) Отрисовываю постеры в дом-дерво
        popularView.renderResults(state.popular.items);
    }
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


};

const popularMenu = async () => {
    searchView.clearResults();
    searchView.showResults();
    elements.searchTitle.innerHTML = "Популярные фильмы";
    if (!state.popular) {
        state.popular = new Popular();
        await state.popular.getPopular();
    }
    state.mList = new MovieList(state.popular.items);
    movieListView.renderResults(state.popular.items);
};

const top_ratedMenu = async () => {
    searchView.clearResults();
    searchView.showResults();
    elements.searchTitle.innerHTML = "Лучшие фильмы";
    if (!state.topRated) {
        state.topRated = new TopRated();
        await state.topRated.getTopRated();
    }
    state.mList = new MovieList(state.topRated.items);
    movieListView.renderResults(state.topRated.items);
};

const controlURL = () => {
    let url = window.location.hash;
    if (url) {
        url = url.replace("#", "");
        switch (url) {
            case "popular":
                popularMenu();
                break;
            case "top-rated":
                top_ratedMenu();
                break;

            default:
                const urlInfo = url.split("/");
                const [type, id] = urlInfo;
                if (type === 'search') controlSearch(id);
                else
                    controlDetail(type, id);
                break;
        }
    } else {
        mainMenu();
    }
};

window.addEventListener("hashchange", controlURL);

// Событие поиска в инпуте
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    if (searchView.getInput() !== '')
        window.location.hash = `search/${searchView.getInput()}`;
});

document.addEventListener("DOMContentLoaded", () => {
    $('.content').magnificPopup({
        delegate: '.btn-video',
        type: "iframe"
    });
    $(".info").on("click", ".detail-main__season-main", function (e) {
        e.preventDefault();
        var $this = $(this),
            container = $this.closest(".detail-main__season"),
            currentContent = container.find(".detail-main__episodes"),
            duration = 200;
        if (!container.hasClass("active")) {
            container
                .addClass("active")
                .siblings()
                .removeClass("active")
                .find(".detail-main__episodes")
                .stop(true)
                .slideUp(duration);
            currentContent.stop(true).slideDown(duration);
        } else {
            container.removeClass("active");
            currentContent.stop(true).slideUp(duration);
        }
    });
    $(".owl-carousel").on("mousewheel", ".owl-stage", function (e) {
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
    controlURL();
    state.likes = new Likes();

    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

elements.searchResPages.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");
    if (btn) {
        const page = parseInt(btn.dataset.goto, 10);
        goToPage(page);
    }
});

const goToPage = async page => {
    searchView.clearResults();
    renderLoader(elements.searchResList);
    try {
        // 7) Поиск фильмов
        await state.search.goToPage(page);
        clearLoader();
        state.mList = new MovieList(state.search.result, page);
        movieListView.renderResults(
            state.search.result,
            state.search.totalResults,
            page
        );
        console.log(state.search.result);
    } catch (error) {
        clearLoader();
        alert("Something wrong with the search...");
        console.log(error);
    }
};

elements.sortBy.addEventListener("change", e => {
    searchView.clearResults();
    const filter = e.target.options[e.target.selectedIndex].dataset.sort;
    movieListView.renderResults(
        state.mList.sort(filter),
        state.search ? state.search.totalResults : undefined,
        state.mList.page
    );
});
elements.changeLanguage.addEventListener("click", () => {
    config.setLanguage();
    window.location.reload();
});

elements.info.addEventListener("click", (e) => {
    if (e.target.matches('.detail-intro__like, .detail-intro__like *')) {
        e.preventDefault();
        controlLikes();
    }
});