var CURRENT_PRICE = 0;
var COST_PRICE = 0;

let pieChartInstance = null;
let barChartInstance = null;

/**
 * Obtiene los símbolos únicos de las compras desde el servidor y llena el selector.
 * Si no hay símbolos, muestra un mensaje de error.
 */
async function populateSymbolDropdown() {
    const url = 'http://localhost:3000/db/get-symbols';
    const dropdown = document.querySelector('.filter__dropdown'); // Selector para la lista desplegable
    const errorMessage = document.querySelector('.filter__error-list'); // Selector para mostrar errores

    try {
        // Realiza la solicitud al servidor
        const response = await fetch(url);

        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error desconocido al obtener los símbolos');
        }

        const symbols = await response.json();

        dropdown.innerHTML = '<option value="" disabled selected>Seleccionar compañía</option>';
        symbols.forEach((symbol) => {
            const option = document.createElement('option');
            option.value = symbol;
            option.textContent = symbol;
            dropdown.appendChild(option);
        });
    } catch (error) {
        errorMessage.style.display = 'inline-flex';
        errorMessage.textContent = error.message;
        dropdown.innerHTML = '<option value="" disabled selected>Seleccionar compañía</option>';
    }
}

/**
 * Actualiza la página de consolidación basada en la compañía seleccionada.
 * @param {string} companyName - Nombre de la compañía seleccionada.
 */
async function updateConsolidationPage(companyName) {
    try {
        // Llenar la tabla de resumen con las compras
        await populateSummaryTable(companyName);
        // Llenar la tabla de consolidación
        await populateConsolidationTable(companyName);
        // Graficar
        await generateCharts(companyName);
    } catch (error) {
        console.error('Error al actualizar la página de consolidación:', error.message);
    }
}

/**
 * Llena la tabla de resumen con las compras hechas a la compañía seleccionada.
 * @param {string} companyName - Nombre de la compañía seleccionada.
 */
async function populateSummaryTable(companyName) {
    console.log('Compañía seleccionada:', companyName);
    const url = `http://localhost:3000/db/get-purchases-name/${encodeURIComponent(companyName)}`; // Elimina el carácter extra `}` al final
    const summaryTableBody = document.querySelector('.summary__table tbody');

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener las compras: ' + response.statusText);
        }

        const purchases = await response.json();

        // Limpia la tabla
        summaryTableBody.innerHTML = '';

        // Llena la tabla con los datos
        purchases.forEach((purchase) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${purchase.date}</td>
                <td class="transactions__cell--company-name">${purchase.symbol}</td>
                <td>${purchase.stockPrice.toFixed(2)}</td>
                <td>${purchase.numOfShares}</td>
                <td>${purchase.totalValue.toFixed(2)}</td>
            `;
            summaryTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al llenar la tabla de resumen:', error.message);
        summaryTableBody.innerHTML = '<tr><td colspan="5">Error al cargar datos</td></tr>';
    }
}


/**
 * Llena la tabla de consolidación con los datos agregados.
 * @param {string} companyName - Nombre de la compañía seleccionada.
 */
async function populateConsolidationTable(companyName) {
    const summaryTableBody = document.querySelector('.summary__table tbody');
    const consolidationTableBody = document.querySelector('.consolidation__table tbody');

    try {
        // Obtén los datos de la tabla de resumen
        const rows = Array.from(summaryTableBody.querySelectorAll('tr'));
        let totalShares = 0;
        let totalUSD = 0;

        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            const shares = parseInt(cells[3].textContent, 10);
            const value = parseFloat(cells[4].textContent);

            totalShares += shares;
            totalUSD += value;
        });

        COST_PRICE = totalShares > 0 ? totalUSD / totalShares : 0;

        // Obtén el precio actual del símbolo (usamos el primero de la tabla como referencia)
        const firstRow = rows[0];
        const symbol = firstRow ? firstRow.querySelector('td:nth-child(2)').textContent : null;
        CURRENT_PRICE = await fetchCurrentPrice(symbol);
        // Calcula las ganancias/pérdidas
        const gainLossPercentage = ((CURRENT_PRICE - COST_PRICE) / COST_PRICE) * 100;
        const gainLossDollar = (gainLossPercentage / 100) * COST_PRICE * totalShares;

        const clasesCambio24h = gainLossPercentage < 0 ? 'transactions__cell--change--down' : 'transactions__cell--change';


        // Llena la tabla de consolidación
        consolidationTableBody.innerHTML = `
            <tr>
                <td class="transactions__cell--company-name">${symbol || 'N/A'}</td>
                <td>${totalShares}</td>
                <td>${totalUSD.toFixed(2)}</td>
                <td>${COST_PRICE.toFixed(2)}</td>
                <td class='${clasesCambio24h}'>${gainLossPercentage.toFixed(2)}%</td>
                <td>${gainLossDollar.toFixed(2)}</td>
            </tr>
        `;
    } catch (error) {
        console.error('Error al llenar la tabla de consolidación:', error.message);
        consolidationTableBody.innerHTML = '<tr><td colspan="6">Error al cargar datos</td></tr>';
    }
}

/**
 * Genera las gráficas (tendencia y barras) para la compañía seleccionada.
 * @param {string} companyName - Nombre de la compañía seleccionada.
 */
async function generateCharts(companyName) {
    const lineChartCanvas = document.getElementById('chart-line'); // Gráfico de línea
    const barChartCanvas = document.getElementById('bar-graph'); // Gráfico de barras

    // Destruye los gráficos existentes si ya están creados
    if (pieChartInstance) {
        pieChartInstance.destroy();
        pieChartInstance = null; // Liberar la instancia del gráfico de línea
    }
    if (barChartInstance) {
        barChartInstance.destroy();
        barChartInstance = null; // Liberar la instancia del gráfico de barras
    }

    try {
        // Llama al servidor para obtener las compras
        const url = `http://localhost:3000/db/get-purchases-name/${encodeURIComponent(companyName)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los datos de la compañía: ' + response.statusText);
        }

        const purchases = await response.json();

        // Datos para el gráfico de línea
        const dates = purchases.map((purchase) => purchase.date); // Eje X: fechas de compra
        const costs = purchases.map((purchase) => purchase.stockPrice.toFixed(2));

        // Verificar si solo hay un punto
        const isSinglePoint = costs.length === 1;

        // Generar el gráfico de línea
        pieChartInstance = new Chart(lineChartCanvas, {
            type: 'line',
            data: {
                labels: isSinglePoint ? ['', dates[0], ''] : dates, // Etiquetas para centrar el único punto
                datasets: [{
                    label: 'COSTO DE COMPRA (USD)',
                    data: isSinglePoint ? [null, costs[0], null] : costs, // Punto centrado si hay uno solo
                    backgroundColor: '#8AF626FF',
                    borderColor: '#8AF626FF',
                    fill: false,
                    tension: 0.01,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'FECHA DE COMPRA',
                        },
                        ticks: {
                            maxRotation: 90,
                            minRotation: 90, // Asegura que las fechas se muestren verticalmente
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Costo de Compra (USD)',
                        },
                        beginAtZero: true,
                    },
                },
            },
        });

        // Datos para el gráfico de barras
        const costPrices = COST_PRICE;
        const currentPrice = CURRENT_PRICE;

        // Generar el gráfico de barras
        barChartInstance = new Chart(barChartCanvas, {
            type: 'bar',
            data: {
                labels: ['Precio de Coste', 'Precio Actual'], // Etiquetas para las barras
                datasets: [
                    {
                        label: 'Comparación de Precios',
                        data: [costPrices, currentPrice],
                        backgroundColor: ['#36A2EB', '#FF6384'], // Colores para las barras
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'TIPO DE PRECIO',
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'PRECIO ($)',
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error al cargar los datos:', error.message);

        const chartContainer = document.querySelector('.chart__container');
        chartContainer.innerHTML = `<p style="color: #ef4444;">Error al cargar los datos: ${error.message}</p>`;
    }
}



/**
 * Obtiene el precio actual de una acción desde el servidor.
 * @param {string} symbol - Símbolo de la acción.
 * @returns {Promise<number>} Precio actual de la acción.
 */
async function fetchCurrentPrice(symbol) {
    const url = `http://localhost:3000/api/stock/${symbol}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener el precio actual: ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el precio actual:', error.message);
        return 0;
    }
}

/**
 * Exporta una tabla a un archivo CSV.
 * @param {string} tableId - ID de la tabla HTML a exportar.
 * @param {string} fileName - Nombre del archivo CSV.
 * @param {string} title - Título del reporte.
 */
function exportTableToCSV(tableId, fileName, title) {
    const table = document.getElementById(tableId);
    if (!table) {
        console.error(`La tabla con ID "${tableId}" no existe.`);
        return;
    }

    const rows = table.querySelectorAll("tr");
    const csvData = [];

    // Añadir encabezado personalizado
    csvData.push(title, "");

    // Extraer datos de las filas de la tabla
    rows.forEach((row) => {
        const cells = row.querySelectorAll("th, td");
        const rowData = [];
        cells.forEach((cell) => {
            rowData.push(`"${cell.textContent.trim().replace(/"/g, '""')}"`); // Escapa comillas dobles
        });
        csvData.push(rowData.join(","));
    });

    // Crear el archivo CSV con codificación UTF-8
    const blob = new Blob(["\ufeff" + csvData.join("\n")], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



/**
 * Exporta la tabla de resumen de compras.
 * @param {string} companyName - Nombre de la compañía seleccionada.
 * @param {string} symbol - Símbolo de la acción.
 */
function exportSummaryTable(companyName, symbol) {
    const date = new Date().toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" });
    const time = new Date().toLocaleTimeString("es-ES", { hour12: false });
    const header = `Resumen de compras ShareFlow\nCompañía: ${companyName}\nSímbolo: ${symbol}\nFecha y hora: ${date} ${time}`;
    const fileName = `${symbol}_${companyName.replace(/\s+/g, "_")}_SUMMARY_${date.replace(/\//g, "-")}.csv`;

    exportTableToCSV("summary-table", fileName, header);
}

/**
 * Exporta la tabla de consolidación.
 * @param {string} companyName - Nombre de la compañía seleccionada.
 * @param {string} symbol - Símbolo de la acción.
 */
function exportConsolidationTable(companyName, symbol) {
    const date = new Date().toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" });
    const time = new Date().toLocaleTimeString("es-ES", { hour12: false });
    const header = `Resumen de consolidación ShareFlow\nCompañía: ${companyName}\nSímbolo: ${symbol}\nFecha y hora: ${date} ${time}`;
    const fileName = `${symbol}_${companyName.replace(/\s+/g, "_")}_CONSOLIDATION_${date.replace(/\//g, "-")}.csv`;

    exportTableToCSV("consolidation-table", fileName, header);
}


export { populateSymbolDropdown, updateConsolidationPage, exportSummaryTable, exportConsolidationTable };
