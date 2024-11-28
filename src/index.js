import { attemptPurchase } from './integration/stockPurchases.js';
import { updateTable, deletePurchase} from './integration/updateTables.js';
import { fetchAndDisplaySearchResults } from './integration/updatePanel.js';

// Selecciona el botón de alternar menú y el panel de búsqueda
const menuToggle = document.querySelector('.menu-toggle');
const searchPanel = document.querySelector('.search-panel');
const validateBtn = document.querySelector('.trading__validate-btn');
const validationList = document.querySelector('.trading__validation-list');
const validationItem = document.querySelector('.trading__validation-item');
const buyBtn = document.querySelector('.trading__buy-btn');
const refreshBtn = document.querySelector('.transactions__refresh-btn');
const searchBtn = document.querySelector('.search-panel__btn');
const confirmTransactionBtn = document.querySelector('.purchase-modal-btn-confirm');
const cancelTransactionBtn = document.querySelector('.purchase-modal-btn-cancel');
const closeModalBtn = document.querySelector('.close-modal');

// Variable para almacenar el símbolo actual
let symbolTemp = '';
let validated = false;

function isValidated() {
    const sharesItem = document.createElement('li');
    sharesItem.classList.add('trading__validation-item');
    if (!validated) {
        sharesItem.textContent = 'Debe validar el símbolo';
        validationList.appendChild(sharesItem);    
        return false;
    }
    return true;
}

function validateSymbolChange(tradingSymbol) {
    
    const sharesItem = document.createElement('li');
    
    sharesItem.classList.add('trading__validation-item');
    
    if (tradingSymbol.toUpperCase() !== symbolTemp.toUpperCase()) {
        sharesItem.textContent = 'Debe validar el símbolo';
        validationList.appendChild(sharesItem);
        return false;
    }
    return true;
}

function updateDateTime() {
    const timeElement = document.querySelector('.header__time');
    const dateElement = document.querySelector('.header__date');

    const now = new Date();

    // Update time
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    timeElement.textContent = now.toLocaleTimeString('es-ES', timeOptions);

    // Update date
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    dateElement.textContent = now.toLocaleDateString('es-ES', dateOptions);
}

function validatePricePerShare(pricePerShare) {
    const sharesItem = document.createElement('li');
    sharesItem.classList.add('trading__validation-item');

    if (pricePerShare < 0.01 || isNaN(pricePerShare)) {
        sharesItem.textContent = 'El precio debe ser mayor o igual a $0.01';
        validationList.appendChild(sharesItem);
        return false;
    }
    return true;
}

function validateNumberOfShares(numberOfShares) {
    const sharesItem = document.createElement('li');
    sharesItem.classList.add('trading__validation-item');

    if (numberOfShares < 1 || isNaN(numberOfShares)) {
        sharesItem.textContent = 'Debe comprar al menos una acción';
        validationList.appendChild(sharesItem);
        return false;
    }
    return true;
}


// Define the isSymbolEmpty function
function isSymbolEmpty(symbol) {
    return symbol === '';
}

function clearTable(tableBody) {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

async function manageUpdateTable() {

    const tableBody = document.querySelector('.transactions__table tbody');
    
    clearTable(tableBody); // Limpia todos los nodos existentes
    
    const tableUpdated = await updateTable();

    if (!tableUpdated.success) {

        document.querySelector('#one-btn-modal h2').textContent = '¡Error en la Tabla!';
        document.querySelector('#one-btn-modal .success-icon').textContent = '⚠️';
        document.querySelector('#one-btn-modal p').textContent = `${tableUpdated.message}`;

        document.getElementById('one-btn-modal').style.display = 'flex';
        
        return false;

    } else {
        return true;
    }
}

async function manageCretePurchase(tradingSymbol, companyName, pricePerShare, numberOfShares) {
    const result = await attemptPurchase(tradingSymbol, companyName, pricePerShare, numberOfShares);
    if (result.success) {

        document.querySelector('.trading-symbol').value = '';
        document.querySelector('.company-name').value = '';
        document.querySelector('.price-share').value = '';
        document.querySelector('.number-shares').value = '';

        symbolTemp = '';
        validated = false;

        const tableUpdated = await manageUpdateTable();
        console.log(tableUpdated);

        if (tableUpdated) {

            document.querySelector('#one-btn-modal h2').textContent = '¡Transacción Exitosa!';
            document.querySelector('#one-btn-modal .success-icon').textContent = '✓';
            document.querySelector('#one-btn-modal p').textContent = `${result.message}`;

            document.getElementById('one-btn-modal').style.display = 'flex';

        }

    } else {
        const sharesItem = document.createElement('li');
        sharesItem.classList.add('trading__validation-item');
        sharesItem.textContent = result.message;
        validationList.appendChild(sharesItem);

        document.querySelector('#one-btn-modal h2').textContent = '¡Error en la Compra!';
        document.querySelector('#one-btn-modal .success-icon').textContent = '❌';
        document.querySelector('#one-btn-modal p').textContent = `${result.message}`;

        document.getElementById('one-btn-modal').style.display = 'flex';
    }
}

async function validateSymbol(symbol) {
    const url = `http://localhost:3000/api/search-name/${symbol}`;
    const sharesItem = document.createElement('li');
    const error = 'Error en la búsqueda';

    sharesItem.classList.add('trading__validation-item');

    if (!isSymbolEmpty(symbol)) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.error === error) {
                sharesItem.textContent = 'El símbolo no existe';
                validationList.appendChild(sharesItem);
                return 0;
            } else {
                symbolTemp = symbol;
                return data.name;
            }
        } catch (error) {
            sharesItem.textContent = 'El símbolo no existe';
            validationList.appendChild(sharesItem);
            return -1;
        }
    } else {
        sharesItem.textContent = 'Debe insertar un símbolo';
        validationList.appendChild(sharesItem);
        return -1;
    }
}

// Agrega un evento de clic al botón de alternar menú para mostrar/ocultar el panel de búsqueda
menuToggle.addEventListener('click', () => {
    searchPanel.classList.toggle('search-panel--active');
});

// Agrega un evento de clic al botón de validar
validateBtn.addEventListener('click', async () => {
    const tradingSymbol = document.querySelector('.trading-symbol').value;
    const companyName = document.querySelector('.company-name');
    
    // Limpiar todos los items de la lista de validación
    validationList.innerHTML = '';
    
    // Cambiar el texto del botón de validar
    validateBtn.textContent = 'Validando...';
    
    let data = await validateSymbol(tradingSymbol.toUpperCase());
    
    if (data === 0 || data === -1) {
        validationList.style.display = 'flex';
        validationItem.style.display = 'flex';
    } else {
        companyName.value = data;
        validationList.style.display = 'none';
        validationItem.style.display = 'none';
        validated = true;
    }

    validateBtn.textContent = 'Validar';
});

// Agrega un evento de clic al botón de comprar
buyBtn.addEventListener('click', async (event) => {

    event.preventDefault();

    const tradingSymbol = document.querySelector('.trading-symbol').value;
    const companyName = document.querySelector('.company-name').value;
    console.log(companyName);
    const pricePerShare = parseFloat(document.querySelector('.price-share').value);
    const numberOfShares = parseInt(document.querySelector('.number-shares').value);

    // Limpiar todos los items de la lista de validación
    validationList.innerHTML = '';

    if (!isValidated() || !validateSymbolChange(tradingSymbol)) {
        validationList.style.display = 'flex';
        validationItem.style.display = 'flex';
    } else if (!validatePricePerShare(pricePerShare) || !validateNumberOfShares(numberOfShares)) {
        validationList.style.display = 'flex';
        validationItem.style.display = 'flex';
    } else {

        const totalPurchase = pricePerShare * numberOfShares;

        document.querySelector('.li__company-name span').textContent = companyName;
        document.querySelector('.li__symbol span').textContent = tradingSymbol;
        document.querySelector('.li__price span').textContent = pricePerShare.toFixed(2);
        document.querySelector('.li__shares span').textContent = numberOfShares.toString();
        document.querySelector('.total-purchase span').textContent = totalPurchase.toFixed(2);

        document.getElementById('purchase-modal').style.display = 'flex';
    }
    
});

confirmTransactionBtn.addEventListener('click', async () => {

    const tradingSymbol = document.querySelector('.trading-symbol').value;
    const companyName = document.querySelector('.company-name').value;
    const pricePerShare = parseFloat(document.querySelector('.price-share').value);
    const numberOfShares = parseInt(document.querySelector('.number-shares').value);

    document.getElementById('purchase-modal').style.display = 'none';
    
    await manageCretePurchase(tradingSymbol, companyName, pricePerShare, numberOfShares);

});

cancelTransactionBtn.addEventListener('click', () => {
    document.getElementById('purchase-modal').style.display = 'none';
});

closeModalBtn.addEventListener('click', () => {
    document.getElementById('purchase-modal').style.display = 'none';
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-btn-ok')) {
        document.getElementById('one-btn-modal').style.display = 'none';
    }
});

refreshBtn.addEventListener('click', async () => {
    await manageUpdateTable();
});

searchBtn.addEventListener('click', async () => {

    const searchQuery = document.querySelector('.search-panel__input').value;
    const regex = /^[^a-zA-Z]*$/;


    let resultsContainer = searchPanel.querySelector('.search-panel__results');

    resultsContainer.innerHTML = `<div class="search-panel__no-results">Buscando...</div>`;

    if (!searchQuery.trim()) {
        resultsContainer.innerHTML = `<div class="search-panel__no-results">Entrada vacía...</div>`;
        return;
    }

    if (regex.test(searchQuery)) {
        resultsContainer.innerHTML = `<div class="search-panel__no-results">Caracteres inválidos...</div>`;
        return;
    }

    const result = await fetchAndDisplaySearchResults(searchQuery);
    console.log(result);
    if (!result.success) {
        console.error(result.message);
    }
});

// Agrega un evento de clic al botón de actualizar tabla
document.addEventListener('DOMContentLoaded', () => {

    // Agregar la delegación de eventos para los botones de eliminar
    document.querySelector('.transactions__table').addEventListener('click', async (event) => {
        const deleteBtn = event.target.closest('.transactions__delete-btn');
        if (deleteBtn) {
            const id = deleteBtn.id;
            await deletePurchase(id);
            
            await manageUpdateTable();
        }
    });

    document.querySelector('.search-panel__results').addEventListener('click', async (event) => {
        const copyBtn = event.target.closest('.search-panel__copy-btn');
        if (copyBtn) {
            const symbol = copyBtn.id;
            try {
                await navigator.clipboard.writeText(symbol);
                const element = document.getElementById(`${symbol}`);
                element.style.color = '#47A7FF';
                setTimeout(() => {
                    element.style.color = '#0041FF';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy symbol:', err);
            }
        }
    });
});
setInterval(updateDateTime, 1000);

// Initial update
updateDateTime();

// Llamar a la función updateTable al cargar la página
window.addEventListener('load',  updateTable());