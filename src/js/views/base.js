export const elements = {
    searchForm: document.querySelector('.form-search'),
    searchInput: document.querySelector('.form-search__input'),
    popularResult: document.querySelector('.movie-popular .owl-carousel'),
    topRatedResult: document.querySelector('.movie-top_rated .owl-carousel'),
    searchBlock: document.querySelector('.results'),
    searchResList: document.querySelector('.results__movies'),
    searchResPages: document.querySelector('.results__pages'),
}

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
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