import {populateSymbolDropdown, updateConsolidationPage} from "../../../backend/src/domain/consolidationPanel.js";


// Constantes de configuración
const CONFIG = {
    UPDATE_INTERVAL: 1000
};

window.addEventListener('load', populateSymbolDropdown);

document.querySelector('.filter__dropdown').addEventListener('change', async (event) => {
    const selectedCompany = event.target.value;
    
    document.querySelectorAll('h2.highlight').forEach(h2 => {
        h2.textContent = selectedCompany;
    });
    
    console.log('Compañía seleccionada:', selectedCompany);

    if (selectedCompany) {
        await updateConsolidationPage(selectedCompany); // Llama al método de actualización
        await generateCharts(selectedCompany); // Genera las gráficas
    }

});

function styleBuyButton() {
    const buyButton = document.querySelector('.header__btn--consolidation');

    if (buyButton) {
        const primaryBlue = getComputedStyle(document.documentElement).getPropertyValue('--primary-blue').trim();
        buyButton.style.backgroundColor = primaryBlue;
        buyButton.style.color = 'white';
    } else {
        console.error('No se encontró ningún botón con la clase "header__btn--buy".');
    }
}

function updateDateTime() {
    const timeElement = document.querySelector('.header__time');
    const dateElement = document.querySelector('.header__date');
    const now = new Date();

    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    timeElement.textContent = now.toLocaleTimeString('es-ES', timeOptions);
    dateElement.textContent = now.toLocaleDateString('es-ES', dateOptions);
}

function initializeApp() {
    styleBuyButton();
    setInterval(updateDateTime, CONFIG.UPDATE_INTERVAL);
    updateDateTime();
}

// Inicialización de la aplicación
initializeApp();



