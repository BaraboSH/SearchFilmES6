import movie from "../movie";

export default class MovieList {
    init(data) {
        this.data = data;
    }
    drawToDOM(selector) {
        this.selector = selector;
        this.clearList(selector);
        selector.appendChild(this.fragment);
    }
    renderMovies(data) {
        this.fragment = document.createDocumentFragment();
        data.forEach(data => {
            const article = document.createElement("article");
            article.className = 'movie';
            article.innerHTML = movie(data);
            this.fragment.appendChild(article);
        });
    }

    clearList(selector) {
        selector.innerHTML = '';
    }

    sort(filter) {
        if (!this.data) {
            return;
        }
        const data = [...this.data.results];

        if (filter === "raiting-max") {
            this.sortByMaxRaiting(data);
        }
        if (filter === "raiting-min") {
            this.sortByMinRaiting(data);
        }
        if (filter === "date-new") {
            this.sortByNewDate(data);
        }
        if (filter === "date-old") {
            this.sortByOldDate(data);
        }
    }
    sortByMaxRaiting(data) {
        data.sort((a, b) => {
            return a.popularity < b.popularity ? 1 : -1;
        });
        this.renderMovies(data);
        this.drawToDOM(document.querySelector(".movies"));
    }
    sortByMinRaiting(data) {
        data.sort((a, b) => {
            return a.popularity > b.popularity ? 1 : -1;
        });
        this.renderMovies(data);
        this.drawToDOM(document.querySelector(".movies"));
    }
    sortByNewDate(data) {

        data.sort((a, b) => {
            const a_date = new Date(a.release_date || a.first_air_date);
            const b_date = new Date(b.release_date || b.first_air_date);
            return a_date < b_date ? 1 : -1;
        });
        this.renderMovies(data);
        this.drawToDOM(document.querySelector(".movies"));
    }
    sortByOldDate(data) {
        data.sort((a, b) => {
            const a_date = new Date(a.release_date || a.first_air_date);
            const b_date = new Date(b.release_date || b.first_air_date);
            return a_date > b_date ? 1 : -1;
        });
        this.renderMovies(data);
        this.drawToDOM(document.querySelector(".movies"));
        this.renderMovies(data);
        this.drawToDOM(document.querySelector(".movies"));
    }
    hide() {
        this.selector.style.display = "none";
    }
}