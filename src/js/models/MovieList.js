export default class MovieList {
    constructor(data, page) {
        this.data = data;
        this.page = page;
    }
    sort(filter) {
        if (!this.data) {
            return;
        }
        const data = [...this.data];

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
        return data;
    }
    sortByMaxRaiting(data) {
        data.sort((a, b) => {
            a.vote_average = a.vote_average || 0;
            b.vote_average = b.vote_average || 0;
            return a.vote_average < b.vote_average ? 1 : -1;
        });
    }
    sortByMinRaiting(data) {
        data.sort((a, b) => {
            a.vote_average = a.vote_average || 0;
            b.vote_average = b.vote_average || 0;
            return a.vote_average > b.vote_average ? 1 : -1;
        });
    }
    sortByNewDate(data) {

        data.sort((a, b) => {
            const a_date = new Date(a.release_date || a.first_air_date || "1200-01-01");
            const b_date = new Date(b.release_date || b.first_air_date || "1200-01-01");
            return a_date < b_date ? 1 : -1;
        });
    }
    sortByOldDate(data) {
        data.sort((a, b) => {
            const a_date = new Date(a.release_date || a.first_air_date);
            const b_date = new Date(b.release_date || b.first_air_date);
            return a_date > b_date ? 1 : -1;
        });
    }
}