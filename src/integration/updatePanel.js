/**
 * Busca información de acciones y muestra los resultados en el panel de búsqueda.
 *
 * @param {string} consulta - Término de búsqueda para encontrar acciones.
 * @returns {Promise<Object>} Resultado de la búsqueda y visualización.
 */
export async function fetchAndDisplaySearchResults(consulta) {
    const panelBusqueda = document.querySelector('.search-panel');
    const url = `http://localhost:3000/py/stock-info/${consulta}`;

    let contenedorResultados = panelBusqueda.querySelector('.search-panel__results');

    try {
        // Verificar existencia del panel de búsqueda
        if (!panelBusqueda) {
            console.error('No se encuentra el elemento .search-panel');
            return {
                success: false,
                message: 'Error: No se encontró el contenedor de búsqueda'
            };
        }

        // Realizar la solicitud de búsqueda
        const respuesta = await fetch(url);
        const resultados = await respuesta.json();

        // Crear contenedor de resultados si no existe
        if (!contenedorResultados) {
            contenedorResultados = document.createElement('div');
            contenedorResultados.classList.add('search-panel__results');
            panelBusqueda.appendChild(contenedorResultados);
        }

        // Limpiar resultados anteriores
        contenedorResultados.innerHTML = '';

        // Validar estructura de resultados
        if (!resultados.output || !Array.isArray(resultados.output)) {
            contenedorResultados.innerHTML = `
                <div class="search-panel__no-results">No se encontraron resultados</div>
            `;
            return { success: false };
        }

        // Procesar y mostrar resultados
        resultados.output.forEach(resultado => {
            const elementoResultado = document.createElement('div');
            elementoResultado.classList.add('search-panel__result');

            elementoResultado.innerHTML = `
                <div class="search-panel__company-name">${resultado.name}</div>
                <div class="search-panel__company-details">
                    <span>${resultado.symbol}</span>
                    <span>•</span>
                    <span>${resultado.type}</span>
                    <i class="fas fa-copy search-panel__copy-btn" id="${resultado.symbol}"></i>
                </div>
            `;

            contenedorResultados.appendChild(elementoResultado);
        });

        return { success: true };
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        return {
            success: false,
            message: 'Error en la búsqueda de resultados'
        };
    }
}