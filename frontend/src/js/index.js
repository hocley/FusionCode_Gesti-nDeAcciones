// Importaciones de módulos
import {attemptPurchase} from '../../../backend/src/domain/tradingPanel.js';
import {updateTable, sortTableRows} from '../../../backend/src/domain/recentTransactionsPanel.js';
import {fetchAndDisplaySearchResults} from '../../../backend/src/domain/searchPanel.js';

// Constantes para elementos DOM
const DOM_ELEMENTS = {
    menuToggle: document.querySelector('.menu-toggle'),
    searchPanel: document.querySelector('.search-panel'),
    validateBtn: document.querySelector('.trading__validate-btn'),
    validationList: document.querySelector('.trading__validation-list'),
    validationItem: document.querySelector('.trading__validation-item'),
    buyBtn: document.querySelector('.trading__buy-btn'),
    refreshBtn: document.querySelector('.transactions__refresh-btn'),
    searchBtn: document.querySelector('.search-panel__btn'),
    confirmTransactionBtn: document.querySelector('.purchase-modal-btn-confirm'),
    cancelTransactionBtn: document.querySelector('.purchase-modal-btn-cancel'),
    confirmDeleteBtn: document.querySelector('.delete-modal-btn-confirm'),
    cancelDeleteBtn: document.querySelector('.delete-modal-btn-cancel'),
    closeDeleteModalBtn: document.querySelector('.close-delete-modal'),
    closeModalBtn: document.querySelector('.close-modal'),
    themeSwitch: document.querySelector('.theme-switch')
};

// Constantes de configuración
const CONFIG = {
    MIN_PRICE: 0.01,
    MIN_SHARES: 1,
    API_BASE_URL: 'http://localhost:3000/api',
    UPDATE_INTERVAL: 1000
};

// Estado global
const state = {
    symbolTemp: '',
    validated: false
};

let BTN_ID = '';

/**
 * Verifica si un símbolo está validado
 * @returns {boolean} - Estado de validación
 */
function isValidated() {
    const sharesItem = createValidationItem();
    if (!state.validated) {
        sharesItem.textContent = 'Debe validar el símbolo';
        DOM_ELEMENTS.validationList.appendChild(sharesItem);
        return false;
    }
    return true;
}

/**
 * Valida si el símbolo ha cambiado
 * @param {string} tradingSymbol - Símbolo a validar
 * @returns {boolean} - Estado de validación
 */
function validateSymbolChange(tradingSymbol) {
    const sharesItem = createValidationItem();
    if (tradingSymbol.toUpperCase() !== state.symbolTemp.toUpperCase()) {
        sharesItem.textContent = 'Debe validar el símbolo';
        DOM_ELEMENTS.validationList.appendChild(sharesItem);
        return false;
    }
    return true;
}

/**
 * Valida la fecha de compra
 * @returns {boolean} - Estado de validación
 */
function validatePurchaseDate(date) {
    const validationList = DOM_ELEMENTS.validationList; // Asumiendo que ya está declarado en el código principal
    validationList.innerHTML = ''; // Limpia mensajes de validación previos

    const selectedDate = date;
    const sharesItem = createValidationItem(); // Usa la función auxiliar ya definida para crear elementos de validación

    if (!selectedDate) {
        sharesItem.textContent = 'Debe seleccionar una fecha de compra.';
        validationList.appendChild(sharesItem);
        return false;
    }

    const currentDate = new Date();
    const selectedDateObject = new Date(selectedDate);

    if (selectedDateObject > currentDate) {
        sharesItem.textContent = 'La fecha de compra no puede ser mayor a la fecha actual.';
        validationList.appendChild(sharesItem);
        return false;
    }

    return true;
}

/**
 * Actualiza la fecha y hora en la interfaz
 */
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

/**
 * Valida el precio por acción
 * @param {number} pricePerShare - Precio por acción
 * @returns {boolean} - Estado de validación
 */
function validatePricePerShare(pricePerShare) {
    const sharesItem = createValidationItem();
    if (pricePerShare < CONFIG.MIN_PRICE || isNaN(pricePerShare)) {
        sharesItem.textContent = 'El precio debe ser mayor o igual a $0.01';
        DOM_ELEMENTS.validationList.appendChild(sharesItem);
        return false;
    }
    return true;
}

/**
 * Valida el número de acciones
 * @param {number} numberOfShares - Número de acciones
 * @returns {boolean} - Estado de validación
 */
function validateNumberOfShares(numberOfShares) {
    const sharesItem = createValidationItem();
    if (numberOfShares < CONFIG.MIN_SHARES || isNaN(numberOfShares)) {
        sharesItem.textContent = 'Debe comprar al menos una acción';
        DOM_ELEMENTS.validationList.appendChild(sharesItem);
        return false;
    }
    return true;
}

/**
 * Crea un elemento de validación
 * @returns {HTMLElement} - Elemento de validación
 */
function createValidationItem() {
    const sharesItem = document.createElement('li');
    sharesItem.classList.add('trading__validation-item');
    return sharesItem;
}

/**
 * Verifica si un símbolo está vacío
 * @param {string} symbol - Símbolo a verificar
 * @returns {boolean} - Estado de validación
 */
function isSymbolEmpty(symbol) {
    return symbol === '';
}

/**
 * Limpia una tabla
 * @param {HTMLElement} tableBody - Cuerpo de la tabla a limpiar
 */
function clearTable(tableBody) {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

/**
 * Gestiona la actualización de la tabla
 * @returns {Promise<boolean>} - Estado de la actualización
 */
async function manageUpdateTable() {
    const refreshBtn = DOM_ELEMENTS.refreshBtn;
    const tableBody = document.querySelector('.transactions__table tbody');
    const sortDropdown = document.getElementById('sort-transactions'); // Selecciona el dropdown de filtros
    sortDropdown.value = 'default';

    refreshBtn.textContent = 'Actualizando...';

    clearTable(tableBody);

    const tableUpdated = await updateTable();

    // Restablecer el texto del botón a "Actualizar"
    refreshBtn.textContent = 'Actualizar';

    if (!tableUpdated.success) {
        showErrorModal('¡Error en la Tabla!', '⚠️', tableUpdated.message);
        return false;
    }
    return true;
}


/**
 * Gestiona la creación de una compra
 * @param {string} tradingSymbol - Símbolo de trading
 * @param {string} companyName - Nombre de la compañía
 * @param {number} pricePerShare - Precio por acción
 * @param {number} numberOfShares - Número de acciones
 */
async function managePurchase(date, tradingSymbol, companyName, pricePerShare, numberOfShares) {
    const result = await attemptPurchase(date, tradingSymbol, companyName, pricePerShare, numberOfShares);

    if (result.success) {
        clearPurchaseForm();
        resetState();

        const tableUpdated = await manageUpdateTable();
        if (tableUpdated) {
            showSuccessModal('¡Transacción Exitosa!', '✓', result.message);
        }
    } else {
        showValidationError(result.message);
        showErrorModal('¡Error en la Compra!', '❌', result.message);
    }
}

/**
 * Limpia el formulario de compra
 */
function clearPurchaseForm() {
    document.querySelector('.trading-symbol').value = '';
    document.querySelector('.company-name').value = '';
    document.querySelector('.price-share').value = '';
    document.querySelector('.number-shares').value = '';
}

/**
 * Reinicia el estado
 */
function resetState() {
    state.symbolTemp = '';
    state.validated = false;
}

/**
 * Muestra un mensaje de error de validación
 * @param {string} message - Mensaje de error
 */
function showValidationError(message) {
    const sharesItem = createValidationItem();
    sharesItem.textContent = message;
    DOM_ELEMENTS.validationList.appendChild(sharesItem);
}

/**
 * Muestra un modal de error
 * @param {string} title - Título del modal
 * @param {string} icon - Ícono del modal
 * @param {string} message - Mensaje del modal
 */
function showErrorModal(title, icon, message) {
    const modal = document.getElementById('one-btn-modal');
    modal.querySelector('h2').textContent = title;
    modal.querySelector('.success-icon').textContent = icon;
    modal.querySelector('p').textContent = message;
    modal.style.display = 'flex';
}

/**
 * Muestra un modal de éxito
 * @param {string} title - Título del modal
 * @param {string} icon - Ícono del modal
 * @param {string} message - Mensaje del modal
 */
function showSuccessModal(title, icon, message) {
    const modal = document.getElementById('one-btn-modal');
    modal.querySelector('h2').textContent = title;
    modal.querySelector('.success-icon').textContent = icon;
    modal.querySelector('p').textContent = message;
    modal.style.display = 'flex';
}

/**
 * Valida un símbolo
 * @param {string} symbol - Símbolo a validar
 * @returns {Promise<string|number>} - Resultado de la validación
 */
async function validateSymbol(symbol) {
    const url = `${CONFIG.API_BASE_URL}/search-name/${symbol}`;
    const error = 'Error en la búsqueda';

    if (!isSymbolEmpty(symbol)) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.error === error || data.name === undefined) {
                showValidationError('El símbolo no existe');
                return 0;
            }
            state.symbolTemp = symbol;
            return data.name;
        } catch (error) {
            showValidationError('El símbolo no existe');
            return -1;
        }
    }

    showValidationError('Debe insertar un símbolo');
    return -1;
}

// Event Listeners
function initializeEventListeners() {
    // Toggle menu
    DOM_ELEMENTS.menuToggle.addEventListener('click', () => {
        DOM_ELEMENTS.searchPanel.classList.toggle('search-panel--active');
    });

    // Validate button
    DOM_ELEMENTS.validateBtn.addEventListener('click', async () => {
        const tradingSymbol = document.querySelector('.trading-symbol').value.toUpperCase();
        const companyName = document.querySelector('.company-name');

        DOM_ELEMENTS.validationList.innerHTML = '';
        DOM_ELEMENTS.validateBtn.textContent = 'Validando...';


        const data = await validateSymbol(tradingSymbol);
        handleValidationResult(data, companyName);

        DOM_ELEMENTS.validateBtn.textContent = 'Validar';
    });

    // Buy button
    DOM_ELEMENTS.buyBtn.addEventListener('click', handleBuyButtonClick);

    // Transaction buttons
    DOM_ELEMENTS.confirmTransactionBtn.addEventListener('click', handleConfirmTransaction);
    DOM_ELEMENTS.cancelTransactionBtn.addEventListener('click', closePurchaseModal);
    DOM_ELEMENTS.closeModalBtn.addEventListener('click', closePurchaseModal);


    // Modal button
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-btn-ok')) {
            document.getElementById('one-btn-modal').style.display = 'none';
        }
    });

    // Refresh button
    DOM_ELEMENTS.refreshBtn.addEventListener('click', manageUpdateTable);

    // Search button
    DOM_ELEMENTS.searchBtn.addEventListener('click', handleSearch);

    // Dropdown de filtros para ordenar la tabla
    document.getElementById('sort-transactions').addEventListener('change', (event) => {
        const criterio = event.target.value;
        sortTableRows(criterio);
    });

    // Table and search results delegates
    initializeTableDelegate();
    initializeSearchResultsDelegate();
    initializeDarkModeToggle();
}

/**
 * Maneja el resultado de la validación
 * @param {string|number} data - Resultado de la validación
 * @param {HTMLElement} companyName - Elemento del nombre de la compañía
 */
function handleValidationResult(data, companyName) {
    if (data === 0 || data === -1) {
        showValidationElements();
    } else {
        companyName.value = data;
        hideValidationElements();
        state.validated = true;
    }
}

/**
 * Muestra los elementos de validación
 */
function showValidationElements() {
    DOM_ELEMENTS.validationList.style.display = 'flex';
    DOM_ELEMENTS.validationItem.style.display = 'flex';
}

/**
 * Oculta los elementos de validación
 */
function hideValidationElements() {
    DOM_ELEMENTS.validationList.style.display = 'none';
    DOM_ELEMENTS.validationItem.style.display = 'none';
}

/**
 * Maneja el clic en el botón de compra
 * @param {Event} event - Evento del clic
 */
async function handleBuyButtonClick(event) {
    event.preventDefault();

    const purchaseData = getPurchaseFormData();
    DOM_ELEMENTS.validationList.innerHTML = '';

    if (!validatePurchaseData(purchaseData)) {
        showValidationElements();
    } else {
        updatePurchaseModal(purchaseData);
        showPurchaseModal();
    }
}

/**
 * Obtiene los datos del formulario de compra
 * @returns {Object} - Datos del formulario
 */
function getPurchaseFormData() {
    return {
        tradingSymbol: document.querySelector('.trading-symbol').value.toUpperCase(),
        date: document.querySelector('.trading__date-picker').value,
        companyName: document.querySelector('.company-name').value,
        pricePerShare: parseFloat(document.querySelector('.price-share').value),
        numberOfShares: parseInt(document.querySelector('.number-shares').value)
    };
}


/**
 * Valida los datos de compra
 * @param {Object} data - Datos a validar
 * @returns {boolean} - Estado de validación
 */
function validatePurchaseData(data) {
    return isValidated() &&
        validateSymbolChange(data.tradingSymbol) &&
        validateNumberOfShares(data.numberOfShares) &&
        validatePurchaseDate(data.date) &&
        validatePricePerShare(data.pricePerShare);
};


/**
 * Actualiza el modal de compra
 * @param {Object} data - Datos para el modal
 */
function updatePurchaseModal(data) {
    const totalPurchase = data.pricePerShare * data.numberOfShares;

    document.querySelector('.li__company-name span').textContent = data.companyName;
    document.querySelector('.li__symbol span').textContent = data.tradingSymbol;
    document.querySelector('.li__price span').textContent = data.pricePerShare.toFixed(2);
    document.querySelector('.li__shares span').textContent = data.numberOfShares.toString();
    document.querySelector('.total-purchase span').textContent = totalPurchase.toFixed(2);
}

function updateDeleteModal(data) {
    document.querySelector('.li__id-purchase span').textContent = data;
}

/**
 * Muestra el modal de compra
 */
function showPurchaseModal() {
    document.getElementById('purchase-modal').style.display = 'flex';
}

function showDeleteModal() {
    document.getElementById('delete-modal').style.display = 'flex';
}

/**
 * Cierra el modal de compra
 */
function closePurchaseModal() {
    document.getElementById('purchase-modal').style.display = 'none';
}

function closeDeleteModal() {
    document.getElementById('delete-modal').style.display = 'none';
}

/**
 * Maneja la confirmación de la transacción
 */
async function handleConfirmTransaction() {
    const data = getPurchaseFormData();
    closePurchaseModal();
    await managePurchase(data.date, data.tradingSymbol, data.companyName, data.pricePerShare, data.numberOfShares);
}

/**
 * Maneja la búsqueda
 */
async function handleSearch() {
    const searchQuery = document.querySelector('.search-panel__input').value;
    const resultsContainer = DOM_ELEMENTS.searchPanel.querySelector('.search-panel__results');
    const invalidCharsRegex = /^[^a-zA-Z]*$/;

    resultsContainer.innerHTML = '<div class="search-panel__no-results">Buscando...</div>';

    if (!searchQuery.trim()) {
        resultsContainer.innerHTML = '<div class="search-panel__no-results">Entrada vacía...</div>';
        return;
    }

    if (invalidCharsRegex.test(searchQuery)) {
        resultsContainer.innerHTML = '<div class="search-panel__no-results">Caracteres inválidos...</div>';
        return;
    }

    const result = await fetchAndDisplaySearchResults(searchQuery);
    if (!result.success) {
        console.error(result.message);
    }
}

/**
 * Inicializa el delegado de la tabla
 */
function initializeTableDelegate() {
    document.querySelector('.transactions__table').addEventListener('click', async (event) => {
        const deleteBtn = event.target.closest('.transactions__delete-btn');
        BTN_ID = deleteBtn.id;
        if (deleteBtn) {
            updateDeleteModal(BTN_ID);
            showDeleteModal();
        }
    });
}

/**
 * Inicializa el delegado de resultados de búsqueda
 */
function initializeSearchResultsDelegate() {
    document.querySelector('.search-panel__results').addEventListener('click', async (event) => {
        const copyBtn = event.target.closest('.search-panel__copy-btn');
        if (copyBtn) {
            await handleSymbolCopy(copyBtn.id);
        }
    });
}

/**
 * Maneja la copia de un símbolo
 * @param {string} symbol - Símbolo a copiar
 */
async function handleSymbolCopy(symbol) {
    try {
        await navigator.clipboard.writeText(symbol);
        const element = document.getElementById(symbol);
        animateCopyButton(element);
    } catch (error) {
        console.error('Error al copiar el símbolo:', error);
    }
}

/**
 * Anima el botón de copiar
 * @param {HTMLElement} element - Elemento a animar
 */
function animateCopyButton(element) {
    element.style.color = '#22598c';
    setTimeout(() => {
        element.style.color = '#0041FF';
    }, 2000);
}

function styleBuyButton() {
    // Selecciona el botón con la clase `header__btn--buy`
    const buyButton = document.querySelector('.header__btn--buy');

    if (buyButton) {
        // Obtiene las variables CSS definidas en el archivo main.css
        const primaryBlue = getComputedStyle(document.documentElement).getPropertyValue('--primary-blue').trim();
        const buttonColor = getComputedStyle(document.documentElement).getPropertyValue('--header-button-color').trim();


        // Aplica los estilos dinámicamente al botón
        buyButton.style.backgroundColor = primaryBlue;
        buyButton.style.color = buttonColor;
    } else {
        console.error('No se encontró ningún botón con la clase "header__btn--buy".');
    }
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
 * Inicializa la aplicación
 */
function initializeApp() {
    applyStoredTheme();
    DOM_ELEMENTS.themeSwitch.addEventListener('click', toggleTheme);
    styleBuyButton();
    setInterval(updateDateTime, CONFIG.UPDATE_INTERVAL);
    updateDateTime();
    window.addEventListener('load', manageUpdateTable);
    initializeEventListeners();
}


// Inicialización de la aplicación
initializeApp();