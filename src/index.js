// js/menuToggle.js
const menuToggle = document.querySelector('.menu-toggle');
const searchPanel = document.querySelector('.search-panel');

menuToggle.addEventListener('click', () => {
    searchPanel.classList.toggle('search-panel--active');
});