export async function fetchAndDisplaySearchResults(query) {
    const searchPanel = document.querySelector('.search-panel');
    const url = `http://localhost:3000/py/stock-info/${query}`;

    let resultsContainer = searchPanel.querySelector('.search-panel__results');

    try {
        const response = await fetch(url);
        const results = await response.json();

        if (!searchPanel) {
            console.error('Cannot find .search-panel element');
            return { success: false, message: 'Error: No se encontró el contenedor de búsqueda' };
        }

        // Create a container for results if it doesn't exist
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.classList.add('search-panel__results');
            searchPanel.appendChild(resultsContainer);
        }

        console.log(results);

        // Clear previous results
        resultsContainer.innerHTML = '';

        // Verificar si el objeto tiene la propiedad "output" y es un arreglo
        if (!results.output || !Array.isArray(results.output)) {
            resultsContainer.innerHTML = `<div class="search-panel__no-results">No se encontraron resultados</div>`;
            return { success: false };
        }

        // Procesar los resultados
        results.output.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('search-panel__result');

            resultDiv.innerHTML = `
                <div class="search-panel__company-name">${result.name}</div>
                <div class="search-panel__company-details">
                    <span>${result.symbol}</span>
                    <span>•</span>
                    <span>${result.type}</span>
                    <i class="fas fa-copy search-panel__copy-btn" id="${result.symbol}"></i>
                </div>
            `;

            resultsContainer.appendChild(resultDiv);
        });

        return { success: true };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Error en la búsqueda' };
    }
}
