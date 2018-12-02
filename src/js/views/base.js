export const elements = {
    searchForm: document.querySelector('.form-search'),
    searchInput: document.querySelector('.form-search__input'),
    popularResult: document.querySelector('.movie-popular .owl-carousel'),
    topRatedResult: document.querySelector('.movie-top_rated .owl-carousel'),
    searchBlock: document.querySelector('.results'),
    searchResList: document.querySelector('.results__movies'),
    searchResPages: document.querySelector('.results__pages'),
    searchTitle: document.querySelector('.results__title'),
    posters: document.querySelector('.advertise'),
    sortBy: document.querySelector('.sort-by__select'),
    likesMenu: document.querySelector('.likes__field i'),
    info: document.querySelector('.info'),
    changeLanguage: document.querySelector('.change__language'),
    like: document.querySelector('.detail-intro__like'),
    likeList: document.querySelector('.likes__list')
}

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    window.scrollTo(0, 0);
    const loader = `
        <div class="${elementStrings.loader}">
            <div class="lds-hourglass"></div>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};