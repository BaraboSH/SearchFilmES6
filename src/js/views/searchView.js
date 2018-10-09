import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const showBlock = () => {
    const block = elements.searchBlock;
    if (block.classList.contains('hidden')) {
        block.classList.remove('hidden');
        $(block).siblings().addClass('hidden');
    }
};