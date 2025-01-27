\# \*\*Documento de Requisitos\*\*

\*\*Proyecto:\*\* Gestión de Acciones

\## 1\. Objetivos

- Facilitar el registro de compras de acciones con información detallada.
- Proporcionar cálculos de ganancia o pérdida basados ​​en el valor actual de las acciones.

\## 2\. Requisitos Funcionales

\*\*2.1 Registro de Compra de Acciones\*\*

\*\*RF1\*\* : El sistema debe permitir al usuario registrar la compra de una acción.

- \*\*Detalles\*\*:
- Símbolo de cotización de la acción.
- Fecha de compra.
- Número de acciones a comprar.
- Precio de cada acción.

\*\*2.2 Calculo de Ganancia/Pérdida\*\*

\*\*RF2\*\* : El sistema debe calcular el porcentaje de ganancia o pérdida para cada acción registrada en función del valor actual.

- \*\*Detalles\*\*:
- Se debe obtener el valor actual de la acción.
- Especificar los valores actuales especialmente se depende de una API, para alinear expectativas y requerimiento de rendimiento.
- El sistema debe mostrar el porcentaje de ganancia/pérdida.
- El sistema debe mostrar el equivalente en dólares de la ganancia/pérdida.
- El sistema debe mostrar el total actual de la inversión.

\*\*2.3 Visualización de Portafolio\*\*

\*\*RF3\*\*: El sistema debe mostrar un resumen del portafolio del usuario, con detalles de cada acción registrada, incluyendo cantidad, valor de compra, valor actual, ganancia/pérdida y valor en dólares.

\*\*2.4 Búsqueda de símbolos\*\*

\*\*RF4\*\*: El sistema debe permitir al usuario buscar el símbolo de una empresa para obtener información sobre la empresa.

\*\*2.5 Funcionalidad de Ordenamiento\*\*

\*\*RF5\*\*: El sistema debe permitir a los usuarios ordenar los datos del portafolio según diferentes criterios seleccionables.

- \*\*Detalles\*\*:
- Orden alfabético ascendente (A-Z).
- Orden alfabético descendente (Z-A).
- Ganancia ascendente.
- Ganancia descendente.

\*\*2.6 Consolidación de Datos\*\*

\*\*RF6\*\*: El sistema debe generar un resumen consolidado de las acciones compradas por el usuario.

- \*\*Detalles\*\*:
- El resumen debe incluir cantidad total, valor total en USD, precio promedio, porcentaje de ganancia/pérdida y valor equivalente en dólares.
- Los cálculos deben actualizarse automáticamente en tiempo real o según la configuración.

\*\*2.7 Funcionalidades de Exportación\*\*

\*\*RF7\*\*: El sistema debe permitir a los usuarios exportar los datos visibles del portafolio en formato CSV.

- \*\*Detalles\*\*:
- La exportación debe incluir nombre de la acción, cantidad total, valor total en USD, precio promedio, y porcentaje de ganancia/pérdida.
- El formato del archivo debe ser compatible con herramientas como Microsoft Excel.

\*\*2.8 Visualización Gráfica\*\*

\*\*RF8\*\*: El sistema debe generar gráficos de línea interactivos para visualizar la consolidación de los datos.

- \*\*Detalles\*\*:
- Los gráficos deben mostrar tendencias de ganancia o pérdida en función del tiempo.
- Los gráficos también deben incluir la comparación de precio actual vs precio de coste.

\*\*2.9 Modo Oscuro\*\*

\*\*RF9\*\*: El sistema debe incluir un modo oscuro opcional que pueda activarse/desactivarse según la preferencia del usuario.

- \*\*Detalles\*\*:
- La preferencia debe guardarse localmente o en el servidor para persistir entre sesiones.
- Los colores y contrastes deben garantizar la legibilidad y accesibilidad.

\## 3\. Requisitos no funcionales

\*\*3.1 Usabilidad\*\*

\*\*RNF1\*\*: El sistema debe contar con una interfaz intuitiva que permita a los usuarios navegar y realizar operaciones con facilidad.

\*\*RNF2\*\*: La aplicación debe estar diseñada para dispositivos de escritorio.

\*\*3.2 Rendimiento\*\*

\*\*RNF3\*\*: El sistema debe procesar y mostrar los cálculos de cada transacción en menos de 2 segundos después de la consulta.

\*\*3.3 Confiabilidad\*\*

\*\*RNF4:\*\* Las transacciones de compra deben contar con confirmaciones para evitar duplicados o errores, garantizando así la integridad de los datos.

\*\*3.4 Compatibilidad con APIs de Datos Financieros Externos\*\*

\*\*RNF5\*\*: El sistema debe estar integrado con una API de datos financieros para obtener automáticamente el valor actual de las acciones.
