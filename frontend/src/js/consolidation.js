// Importaciones de módulos
import { populateSymbolDropdown, updateConsolidationPage, exportConsolidationTable, exportSummaryTable } from "../../../backend/src/domain/consolidationPanel.js";

// Constantes para elementos DOM
const DOM_ELEMENTS = {
    filterDropdown: document.querySelector('.filter__dropdown'),
    summaryExportBtn: document.querySelector('.summary__export-btn'),
    consolidationExportBtn: document.querySelector('.consolidation__export-btn'),
    highlightHeaders: document.querySelectorAll('h2.highlight'),
    timeElement: document.querySelector('.header__time'),
    dateElement: document.querySelector('.header__date'),
    buyButton: document.querySelector('.header__btn--consolidation'),
    themeSwitch: document.querySelector('.theme-switch')
};

// Constantes de configuración
const CONFIG = {
    UPDATE_INTERVAL: 1000
};

// Estado global
const state = {
    selectedCompany: ''
};

/**
 * Deshabilita los botones de exportación al cargar la página.
 */
function disableExportButtons() {
    DOM_ELEMENTS.summaryExportBtn.disabled = true;
    DOM_ELEMENTS.consolidationExportBtn.disabled = true;
}

/**
 * Habilita los botones de exportación cuando se selecciona una compañía.
 */
function enableExportButtons() {
    DOM_ELEMENTS.summaryExportBtn.disabled = false;
    DOM_ELEMENTS.consolidationExportBtn.disabled = false;
}

/**
 * Actualiza la fecha y hora en la interfaz.
 */
function updateDateTime() {
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

    DOM_ELEMENTS.timeElement.textContent = now.toLocaleTimeString('es-ES', timeOptions);
    DOM_ELEMENTS.dateElement.textContent = now.toLocaleDateString('es-ES', dateOptions);
}

/**
 * Maneja el cambio de la compañía seleccionada en el dropdown.
 * @param {Event} event - Evento del cambio.
 */
async function handleCompanyChange(event) {
    const selectedCompany = event.target.value;
    state.selectedCompany = selectedCompany;

    DOM_ELEMENTS.highlightHeaders.forEach(h2 => {
        h2.textContent = selectedCompany;
    });

    if (selectedCompany) {
        enableExportButtons();
        await updateConsolidationPage(selectedCompany);
    } else {
        disableExportButtons();
    }
}

/**
 * Maneja la exportación de la tabla de resumen.
 */
function handleSummaryExport() {
    const companyName = state.selectedCompany.trim();
    const symbol = document.querySelector('.summary__table tbody tr td:nth-child(2)')?.textContent.trim() || 'N/A';

    if (companyName && symbol !== 'N/A') {
        exportSummaryTable(companyName, symbol);
    }
}

/**
 * Maneja la exportación de la tabla de consolidación.
 */
function handleConsolidationExport() {
    const companyName = state.selectedCompany.trim();
    const symbol = document.querySelector('.consolidation__table tbody tr td:nth-child(1)')?.textContent.trim() || 'N/A';

    if (companyName && symbol !== 'N/A') {
        exportConsolidationTable(companyName, symbol);
    }
}

/**
 * Aplica estilos dinámicos al botón de compra.
 */
function styleBuyButton() {
    if (DOM_ELEMENTS.buyButton) {
        const primaryBlue = getComputedStyle(document.documentElement).getPropertyValue('--primary-blue').trim();
        const buttonColor = getComputedStyle(document.documentElement).getPropertyValue('--header-button-color').trim();

        DOM_ELEMENTS.buyButton.style.backgroundColor = primaryBlue;
        DOM_ELEMENTS.buyButton.style.color = buttonColor;
    } else {
        console.error('No se encontró ningún botón con la clase "header__btn--buy".');
    }
}

/**
 * Inicializa los listeners de eventos.
 */
function initializeEventListeners() {
    // Listener para el cambio de compañía en el dropdown
    DOM_ELEMENTS.filterDropdown.addEventListener('change', handleCompanyChange);

    // Listeners para los botones de exportación
    DOM_ELEMENTS.summaryExportBtn.addEventListener('click', handleSummaryExport);
    DOM_ELEMENTS.consolidationExportBtn.addEventListener('click', handleConsolidationExport);
}

/**
 * Cambia el tema y almacena la preferencia en localStorage
 */
function toggleTheme() {
    const isDarkMode = document.documentElement.classList.toggle('dark-mode');
    DOM_ELEMENTS.themeSwitch.classList.toggle('active');
    // Guardar la preferencia en localStorage
    localStorage.setItem('preferredTheme', isDarkMode ? 'dark' : 'light');
}

/**
 * Aplica el tema basado en la preferencia guardada
 */
function applyStoredTheme() {
    const storedTheme = localStorage.getItem('preferredTheme');
    if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        DOM_ELEMENTS.themeSwitch.classList.add('active');
    } else {
        document.documentElement.classList.remove('dark-mode');
        DOM_ELEMENTS.themeSwitch.classList.remove('active');
    }
}


/**
 * Inicializa la aplicación.
 */
function initializeApp() {
    applyStoredTheme();
    DOM_ELEMENTS.themeSwitch.addEventListener('click', toggleTheme);
    populateSymbolDropdown();
    disableExportButtons();
    styleBuyButton();
    setInterval(updateDateTime, CONFIG.UPDATE_INTERVAL);
    updateDateTime();

    initializeEventListeners();
}

// Inicialización de la aplicación
initializeApp();
