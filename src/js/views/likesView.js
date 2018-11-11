import {
    elements
} from './base';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'fa fa-heart' : 'far fa-heart';
    document.querySelector('.detail__love i').className = iconString;
};

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.className = numLikes > 0 ? 'fa fa-heart' : 'far fa-heart';
};

export const renderLike = like => {
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}"
                    alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${like.title}</h4>
                <p class="likes__date">${like.date}</p>
            </div>
        </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}