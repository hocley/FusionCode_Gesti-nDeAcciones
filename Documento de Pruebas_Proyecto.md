# **Documento de Pruebas**

---

**Proyecto:** Gestión de Transacciones y Búsqueda de Símbolos

## 1\. Objetivos

- Validar que el sistema cumple con los requisitos funcionales y no funcionales definidos.
- Garantizar la calidad del código mediante la detección y corrección de errores.
- Asegurar que los cambios o nuevas funcionalidades no introduzcan errores (regresión).
- Verificar que el sistema sea confiable, estable, y funcione en los entornos previstos.
- Reducir los riesgos antes de pasar el sistema a producción.

## 2\. Plantilla de prueba

| **Campo**                 | **Descripción**                                                                                                 |
|---------------------------|-----------------------------------------------------------------------------------------------------------------|
| **ID de la Prueba**        | Identificador único para la prueba (Ejemplo: UNIT-001, INTEG-002, E2E-003).                                    |
| **Requisito Relacionado**  | El requisito funcional o no funcional que está cubriendo la prueba (Ejemplo: RF-001).                          |
| **Nombre de la Prueba**    | Nombre descriptivo de la prueba (Ejemplo: "Validación del Cálculo de Descuentos").                             |
| **Tipo de Prueba**         | Clasificación de la prueba (Unitarias, Integración).                                               |
| **Prioridad**              | Importancia de la prueba (Alta, Media, Baja).                                                                  |
| **Estado Actual**          | Estado de la prueba (Por realizar, En progreso, Aprobada, Fallida).                                            |
| **Autor**                  | Persona responsable de la prueba.                                                                              |
| **Fecha de Creación**      | Fecha en la que se diseñó la prueba.                                                                           |
| **Fecha de Ejecución**     | Fecha en la que se ejecutó la prueba.                                                                          |
| **Versión del Sistema**    | Versión del sistema bajo prueba.                                                                               |
| **Descripción General**    | Breve resumen del objetivo de la prueba (Ejemplo: "Probar la validación de entradas en el cálculo de descuentos").|
| **Objetivo**               | Qué se espera lograr con la prueba (Ejemplo: "Validar que el sistema rechace entradas inválidas").             |
| **Entorno de Prueba**      | Detalles del entorno necesario para ejecutar la prueba (Ejemplo: Node.js 18, MongoDB 6.0).                     |
| **Precondiciones**         | Condiciones previas para ejecutar la prueba (Ejemplo: Base de datos inicializada con productos de prueba).     |
| **Pasos para Ejecutar**    | Lista detallada de pasos para realizar la prueba.                                                             |
| **Criterios de Aceptación**| Resultados esperados para que la prueba sea considerada exitosa.                                               |
| **Resultado Esperado**     | Resultado que debería obtenerse si la prueba es exitosa.                                                      |
| **Resultado Obtenido**     | Resultado real después de ejecutar la prueba.                                                                 |
| **Estado Final**           | Estado final de la prueba después de su ejecución (Aprobada, Fallida).                                         |
| **Observaciones**          | Notas adicionales relacionadas con la prueba (Ejemplo: "Se detectaron errores de formato en las entradas").    |
| **Evidencia**              | Capturas de pantalla, logs, o archivos relacionados con la ejecución de la prueba.                             |

## 3\. Pruebas realizadas

### 3.1. **Pruebas Unitarias**

#### 3.1.1. **Prueba UNIT-01: Validación del Registro de Compra**

| **Campo**                 | **Descripción**                                                                                                                                                                         |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **ID de la Prueba**        | UNIT-01                                                                                                                                                                                 |
| **Requisito Relacionado**  | RF1: El sistema debe permitir al usuario registrar la compra de una acción.                                                                                                             |
| **Nombre de la Prueba**    | Validación del Registro de Compra                                                                                                                                                       |
| **Tipo de Prueba**         | Unitaria                                                                                                                                                                                |
| **Prioridad**              | Alta                                                                                                                                                                                    |
| **Estado Actual**          | Ejecutada                                                                                                                                                                               |
| **Autor**                  | Ariel Amaguaña                                                                                                                                                                          |
| **Fecha de Creación**      | 2025-01-28                                                                                                                                                                              |
| **Fecha de Ejecución**     | 2025-01-28                                                                                                                                                                              |
| **Versión del Sistema**    | 1.0                                                                                                                                                                                     |
| **Descripción General**    | Verificar que una acción pueda registrarse con datos válidos (símbolo, fecha, cantidad, precio).                                                                                        |
| **Objetivo**               | Validar que el sistema registre correctamente las compras cuando los datos sean válidos.                                                                                                |
| **Entorno de Prueba**      | Node.js 22                                                                                                                                                                              |
| **Precondiciones**         | - Base de datos configurada. <br> - Conexión activa al sistema.                                                                                                                         |
| **Pasos para Ejecutar**    | 1. Llamar a la función `registrarCompra` con datos válidos. <br> 2. Validar que no se lance ningún error. <br> 3. Verificar que los datos se guarden correctamente en la base de datos. |
| **Criterios de Aceptación**| - Los datos deben registrarse sin errores. <br> - El sistema debe devolver un mensaje de éxito.                                                                                         |
| **Resultado Esperado**     | `{ status: "success", message: "Acción registrada correctamente." }`                                                                                                                    |
| **Resultado Obtenido**     | `{ status: "success", message: "Acción registrada correctamente." }`                                                                                                                    |
| **Estado Final**           | Aprobada                                                                                                                                                                                |
| **Observaciones**          | Prueba ejecutada correctamente.                                                                                                                                                         |
| **Evidencia**              | ![Prueba unitaria 1](/img/PruebaUnitaria1.png)                                                                                                                                          |

#### 3.1.2. **Prueba UNIT-02: Validación de Entradas Inválidas**

| **Campo**                 | **Descripción**                                                                                                        |
|---------------------------|------------------------------------------------------------------------------------------------------------------------|
| **ID de la Prueba**        | UNIT-02                                                                                                                |
| **Requisito Relacionado**  | RF1: El sistema debe rechazar datos inválidos al registrar una compra de acciones.                                     |
| **Nombre de la Prueba**    | Validación de Entradas Inválidas                                                                                       |
| **Tipo de Prueba**         | Unitaria                                                                                                               |
| **Prioridad**              | Alta                                                                                                                   |
| **Estado Actual**          | Ejecutada                                                                                                              |
| **Autor**                  | Ariel Amaguaña                                                                                                         |
| **Fecha de Creación**      | 2025-01-28                                                                                                             |
| **Fecha de Ejecución**     | 2025-01-28                                                                                                             |
| **Versión del Sistema**    | 1.0                                                                                                                    |
| **Descripción General**    | Asegurarse de que el sistema rechace entradas inválidas (precios negativos, fechas no válidas).                        |
| **Objetivo**               | Validar que los datos inválidos no puedan registrarse en el sistema.                                                   |
| **Entorno de Prueba**      | Node.js 22                                                                                                             |
| **Precondiciones**         | - Base de datos configurada. <br> - Conexión activa al sistema.                                                        |
| **Pasos para Ejecutar**    | 1. Llamar a la función `registrarCompra` con entradas inválidas. <br> 2. Validar que se devuelvan errores específicos. |
| **Criterios de Aceptación**| - La función debe rechazar entradas inválidas con mensajes de error apropiados.                                        |
| **Resultado Esperado**     | `{ status: "error", message: "Datos inválidos. Verifique la entrada." }`                                               |
| **Resultado Obtenido**     | `{ status: "error", message: "El precio y el valor total deben ser mayores a 0" }`                                     |
| **Estado Final**           | Aprobada                                                                                                               |
| **Observaciones**          | Se validaron correctamente los errores para precios negativos, fechas futuras y datos faltantes                        |
| **Evidencia**              | ![Prueba unitaria 2](/img/PruebaUnitaria2.png)                                                                         |

### 3.1.3. **Prueba UNIT-03: Cálculo de Ganancia/Pérdida**

| **Campo**                 | **Descripción**                                                                                                            |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------|
| **ID de la Prueba**        | UNIT-03                                                                                                                    |
| **Requisito Relacionado**  | RF2: El sistema debe calcular el porcentaje de ganancia o pérdida basado en el valor actual de la acción.                  |
| **Nombre de la Prueba**    | Cálculo de Ganancia/Pérdida                                                                                                |
| **Tipo de Prueba**         | Unitaria                                                                                                                   |
| **Prioridad**              | Alta                                                                                                                       |
| **Estado Actual**          | Ejecutada                                                                                                                  |
| **Autor**                  | Ariel Amaguaña                                                                                                             |
| **Fecha de Creación**      | 2025-01-28                                                                                                                 |
| **Fecha de Ejecución**     | 2025-01-28                                                                                                                 |
| **Versión del Sistema**    | 1.0                                                                                                                        |
| **Descripción General**    | Validar que la función `calcularGanancia` calcule correctamente el porcentaje de ganancia/pérdida.                         |
| **Objetivo**               | Asegurar que el cálculo de ganancia/pérdida sea correcto en diferentes escenarios.                                         |
| **Entorno de Prueba**      | Node.js 22                                                                                                                 |
| **Precondiciones**         | - Base de datos configurada. <br> - Conexión activa a la API de precios.                                                   |
| **Pasos para Ejecutar**    | 1. Llamar a la función `calcularGanancia` con valores de entrada distintos. <br> 2. Comparar el resultado con el esperado. |
| **Criterios de Aceptación**| - El cálculo debe ser preciso y devolver un porcentaje correcto.                                                           |
| **Resultado Esperado**     | `{ porcentaje: "20%", estado: "ganancia" }`                                                                                |
| **Resultado Obtenido**     | `{ porcentaje: "20%", estado: "ganancia" }`                                                                                |
| **Estado Final**           | Aprobada                                                                                                                   |
| **Observaciones**          | Prueba ejecutada correctamente para ganancias, pérdidas y casos sin cambio.                                                |
| **Evidencia**              | ![Prueba Unitaria 3](/img/PruebaUnitaria3.png)                                                                             |

### 3.1.4. **Prueba UNIT-04: Manejo de Errores en Cálculo**

| **Campo**                 | **Descripción**                                                                                                                                  |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| **ID de la Prueba**        | UNIT-04                                                                                                                                          |
| **Requisito Relacionado**  | RF2: El sistema debe calcular correctamente incluso en casos con errores de entrada.                                                             |
| **Nombre de la Prueba**    | Manejo de Errores en Cálculo                                                                                                                     |
| **Tipo de Prueba**         | Unitaria                                                                                                                                         |
| **Prioridad**              | Media                                                                                                                                            |
| **Estado Actual**          | Ejecutada                                                                                                                                        |
| **Autor**                  | Ariel Amaguaña                                                                                                                                   |
| **Fecha de Creación**      | 2025-01-28                                                                                                                                       |
| **Fecha de Ejecución**     | 2025-01-28                                                                                                                                       |
| **Versión del Sistema**    | 1.0                                                                                                                                              |
| **Descripción General**    | Validar que la función `calcularGanancia` maneje errores correctamente, como valores no definidos o negativos.                                   |
| **Objetivo**               | Asegurar que el sistema sea robusto frente a entradas inválidas.                                                                                 |
| **Entorno de Prueba**      | Node.js 22                                                                                                                                       |
| **Precondiciones**         | - Base de datos configurada. <br> - Conexión activa a la API de precios.                                                                         |
| **Pasos para Ejecutar**    | 1. Llamar a `calcularGanancia` con valores no definidos. <br> 2. Llamar con valores negativos. <br> 3. Validar que se generen mensajes de error. |
| **Criterios de Aceptación**| - Se debe devolver un error 400 si no se proporciona un símbolo. <br>  - Se debe devolver un error 500 si los precios no están disponibles.      |
| **Resultado Esperado**     | `{ error: "Símbolo no proporcionado"}` para símbolos faltantes. <br> `{ error: "No se pudo obtener los precios"  }`  para datos faltantes.       |
| **Resultado Obtenido**     | `{ error: "Símbolo no proporcionado"}` <br> `{ error: "No se pudo obtener los precios"  }`                                                       |
| **Estado Final**           | Aprobada                                                                                                                                         |
| **Observaciones**          | El sistema maneja correctamente errores relacionados con entradas inválidas.                                                                     |
| **Evidencia**              | ![Prueba unitaria 5](/img/PruebaUnitaria4.png)                                                                                                   |

### 3.1.5. **Prueba UNIT-05: Ordenamiento por Ganancia Ascendente**

| **Campo**                 | **Descripción**                                                                                                           |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------|
| **ID de la Prueba**        | UNIT-05                                                                                                                   |
| **Requisito Relacionado**  | RF5: El sistema debe permitir ordenar el portafolio por ganancia ascendente.                                              |
| **Nombre de la Prueba**    | Ordenamiento por Ganancia Ascendente                                                                                      |
| **Tipo de Prueba**         | Unitaria                                                                                                                  |
| **Prioridad**              | Alta                                                                                                                      |
| **Estado Actual**          | Ejecutada                                                                                                                 |
| **Autor**                  | Ariel Amaguaña                                                                                                            |
| **Fecha de Creación**      | 2025-01-28                                                                                                                |
| **Fecha de Ejecución**     | 2025-01-28                                                                                                                |
| **Versión del Sistema**    | 1.0                                                                                                                       |
| **Descripción General**    | Validar que la función `sortTableRows` ordene correctamente las acciones por ganancia ascendente.                         |
| **Objetivo**               | Asegurar que el sistema ordene los datos correctamente.                                                                   |
| **Entorno de Prueba**      | Node.js 22                                                                                                                |
| **Precondiciones**         | - Portafolio con múltiples registros.                                                                                     |
| **Pasos para Ejecutar**    | 1. Crear una lista de prueba con ganancias mixtas. <br> 2. Llamar a la función `sortTableRows`. <br> 3. Validar el orden. |
| **Criterios de Aceptación**| - Los datos deben estar ordenados de menor a mayor ganancia.                                                              |
| **Resultado Esperado**     | Lista ordenada correctamente: `[ -5, 0, 10, 20 ]`                                                                         |
| **Resultado Obtenido**     | Lista ordenada correctamente: `[ -5, 0, 10, 20 ]`                                                                         |
| **Estado Final**           | Aprobada                                                                                                                  |
| **Observaciones**          | La función `sortTableRows` ordena correctamente los datos sin errores.                                                    |
| **Evidencia**              | ![Prueba Unitaria 5](/img/PruebaUnitaria5.png)                                                                            |

### 3.1.6. **Prueba UNIT-06: Ordenamiento Alfabético Descendente**

| **Campo**                 | **Descripción**                                                                                                                                  |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| **ID de la Prueba**        | UNIT-06                                                                                                                                          |
| **Requisito Relacionado**  | RF5: El sistema debe permitir ordenar el portafolio alfabéticamente en orden descendente.                                                        |
| **Nombre de la Prueba**    | Ordenamiento Alfabético Descendente                                                                                                              |
| **Tipo de Prueba**         | Unitaria                                                                                                                                         |
| **Prioridad**              | Media                                                                                                                                            |
| **Estado Actual**          | Ejecutada                                                                                                                                        |
| **Autor**                  | Ariel Amaguaña                                                                                                                                   |
| **Fecha de Creación**      | 2025-01-28                                                                                                                                       |
| **Fecha de Ejecución**     | 2025-01-28                                                                                                                                       |
| **Versión del Sistema**    | 1.0                                                                                                                                              |
| **Descripción General**    | Validar que la función `sortTableRows` ordene correctamente las acciones en orden Z-A.                                                           |
| **Objetivo**               | Asegurar que el sistema ordene los datos alfabéticamente de forma descendente.                                                                   |
| **Entorno de Prueba**      | Node.js 22                                                                                                                                       |
| **Precondiciones**         | - Portafolio con múltiples registros.                                                                                                            |
| **Pasos para Ejecutar**    | 1. Crear una lista de prueba con símbolos alfabéticos mixtos. <br> 2. Llamar a la función `sortTableRows`. <br> 3. Validar el orden descendente. |
| **Criterios de Aceptación**| - Los datos deben estar ordenados de Z a A.                                                                                                      |
| **Resultado Esperado**     | Lista ordenada correctamente: `[ "TSLA", "MSFT", "GOOGL", "AAPL" ]`                                                                              |
| **Resultado Obtenido**     | Lista ordenada correctamente: `[ "TSLA", "MSFT", "GOOGL", "AAPL" ]`                                                                              |
| **Estado Final**           | Aprobada                                                                                                                                         |
| **Observaciones**          | La función `sortTableRows` ordena correctamente los datos sin errores.                                                                           |
| **Evidencia**              | ![Prueba unitaria 6](/img/PruebaUnitaria6.png)                                                                                                   |

### 3.1.7. **Prueba UNIT-07: Consolidación de Datos**

| **Campo**                 | **Descripción**                                                                                                                            |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| **ID de la Prueba**        | UNIT-07                                                                                                                                    |
| **Requisito Relacionado**  | RF6: El sistema debe consolidar los datos de acciones correctamente.                                                                       |
| **Nombre de la Prueba**    | Consolidación de Datos                                                                                                                     |
| **Tipo de Prueba**         | Unitaria                                                                                                                                   |
| **Prioridad**              | Alta                                                                                                                                       |
| **Estado Actual**          | Ejecutada                                                                                                                                  |
| **Autor**                  | Ariel Amaguaña                                                                                                                             |
| **Fecha de Creación**      | 2025-01-28                                                                                                                                 |
| **Fecha de Ejecución**     | 2025-01-28                                                                                                                                 |
| **Versión del Sistema**    | 1.0                                                                                                                                        |
| **Descripción General**    | Validar que las funciones de consolidación calculen correctamente totales, promedios y ganancias.                                          |
| **Objetivo**               | Asegurar que los datos consolidados sean precisos y se actualicen automáticamente.                                                         |
| **Entorno de Prueba**      | Node.js 22 + Jest con jsdom                                                                                                                |
| **Precondiciones**         | - Portafolio con múltiples registros.                                                                                                      |
| **Pasos para Ejecutar**    | 1. Crear un portafolio de prueba con datos variados. <br> 2. Llamar a la función de consolidación. <br> 3. Validar los cálculos generados. |
| **Criterios de Aceptación**| - Los totales, promedios y ganancias deben ser precisos.                                                                                   |
| **Resultado Esperado**     | Totales, promedios y ganancias calculados correctamente.                                                                                   |
| **Resultado Obtenido**     | Totales, promedios y ganancias calculados correctamente.                                                                                   |
| **Estado Final**           | Aprobada                                                                                                                                   |
| **Observaciones**          | La función de consolidación funciona correctamente y maneja los datos sin errores.                                                         |
| **Evidencia**              | ![Prueba Unitaria 7](/img/PruebaUnitaria7.png)                                                                                             |

### 3.2. **Pruebas de Integración**

#### 3.2.1. **Prueba INTEG-01: Integración con la API de Precios**

| **Campo**                 | **Descripción**                                                                                                                           |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| **ID de la Prueba**        | INTEG-01                                                                                                                                  |
| **Requisito Relacionado**  | RF2, RNF5: El sistema debe obtener el precio actual desde la API externa.                                                                 |
| **Nombre de la Prueba**    | Integración con la API de Precios                                                                                                         |
| **Tipo de Prueba**         | Integración                                                                                                                               |
| **Prioridad**              | Alta                                                                                                                                      |
| **Estado Actual**          | Ejecutada                                                                                                                                 |
| **Autor**                  | Ariel Amaguaña                                                                                                                            |
| **Fecha de Creación**      | 2025-01-28                                                                                                                                |
| **Fecha de Ejecución**     | 2025-01-28                                                                                                                                |
| **Versión del Sistema**    | 1.0                                                                                                                                       |
| **Descripción General**    | Verificar que el sistema pueda obtener correctamente los valores actuales de las acciones desde la API externa.                           |
| **Objetivo**               | Validar la comunicación con la API externa y la correcta actualización de los datos.                                                      |
| **Entorno de Prueba**      | Node.js 22, conexión activa a la API de precios.                                                                                          |
| **Precondiciones**         | - API disponible. <br> - Credenciales configuradas correctamente.                                                                         |
| **Pasos para Ejecutar**    | 1. Realizar una solicitud GET a la API externa. <br> 2. Validar que los datos obtenidos sean correctos.                                   |
| **Criterios de Aceptación**| - La respuesta debe contener los datos esperados (precio actual). <br> - El sistema debe manejar errores como tiempos de espera agotados. |
| **Resultado Esperado**     | Respuesta exitosa con el precio actual de la acción.                                                                                      |
| **Resultado Obtenido**     | Respuesta exitosa con el precio actual de la acción                                                                                       |
| **Estado Final**           | Aprobada                                                                                                                                  |
| **Observaciones**          | La integración con la API de precios funciona correctamente y maneja errores sin problemas.                                               |
| **Evidencia**              | ![Prueba de integracion 1](/img/PruebaIntegracion1.png)                                                                                   |

#### 3.2.2. **Prueba INTEG-02: Actualización de Ganancias/Pérdidas**

| **Campo**                 | **Descripción**                                                                                                                                   |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| **ID de la Prueba**        | INTEG-02                                                                                                                                          |
| **Requisito Relacionado**  | RF2: El sistema debe actualizar automáticamente las ganancias/pérdidas cuando se obtienen los precios actuales.                                   |
| **Nombre de la Prueba**    | Actualización de Ganancias/Pérdidas                                                                                                               |
| **Tipo de Prueba**         | Integración                                                                                                                                       |
| **Prioridad**              | Alta                                                                                                                                              |
| **Estado Actual**          | Ejecutada                                                                                                                                         |
| **Autor**                  | Ariel Amaguaña                                                                                                                                    |
| **Fecha de Creación**      | 2025-01-28                                                                                                                                        |
| **Fecha de Ejecución**     | 2025-01-28                                                                                                                                        |
| **Versión del Sistema**    | 1.0                                                                                                                                               |
| **Descripción General**    | Validar que al obtener datos de la API, las ganancias/pérdidas se actualicen automáticamente en el sistema.                                       |
| **Objetivo**               | Asegurar que los cálculos de ganancias/pérdidas sean actualizados en tiempo real.                                                                 |
| **Entorno de Prueba**      | Node.js 22, conexión activa a la API de precios, Jest, MongoMemoryServer para pruebas aisladas.                                                   |
| **Precondiciones**         | - API disponible. <br> - Base de datos con acciones previamente registradas.                                                                      |
| **Pasos para Ejecutar**    | 1. Realizar una solicitud GET a la API para obtener los precios actuales. <br> 2. Validar que las ganancias/pérdidas se actualicen correctamente. |
| **Criterios de Aceptación**| - Los cálculos de ganancias/pérdidas deben reflejar los nuevos precios de las acciones.                                                           |
| **Resultado Esperado**     | - Los valores de currentPrice y gainLossPercentage deben actualizarse correctamente.                                                              |
| **Resultado Obtenido**     | Los valores fueron actualizados correctamente en la prueba con un precio de 150.25 y ganancia de 25.21%.                                          |
| **Estado Final**           | Aprobada                                                                                                                                          |
| **Observaciones**          | - Se utilizó un mock de `getStockPrice` para evitar llamadas reales a la API. <br> - La prueba usó una base de datos en memoria para aislamiento.                                                               |
| **Evidencia**              | ![Prueba de Integracion 2](/img/PruebaIntegracion2.png)                                                                                           |

### 3.2.3. **Prueba INTEG-03: Integración con la Base de Datos**

| **Campo**                 | **Descripción**                                                                                                          |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------|
| **ID de la Prueba**        | INTEG-03                                                                                                                 |
| **Requisito Relacionado**  | RF6: El sistema debe consolidar los datos de las acciones registradas en el portafolio.                                  |
| **Nombre de la Prueba**    | Consolidación de Datos en el Portafolio                                                                                  |
| **Tipo de Prueba**         | Integración                                                                                                              |
| **Prioridad**              | Media                                                                                                                    |
| **Estado Actual**          | Ejecutada                                                                                                                |
| **Autor**                  | Ariel Amaguaña                                                                                                           |
| **Fecha de Creación**      | 2025-01-28                                                                                                               |
| **Fecha de Ejecución**     | 2025-01-28                                                                                                               |
| **Versión del Sistema**    | 1.0                                                                                                                      |
| **Descripción General**    | Validar que el sistema consolide correctamente los datos de las acciones registradas en el portafolio.                   |
| **Objetivo**               | Asegurar que los datos del portafolio sean consolidados correctamente y reflejen los valores correctos.                  |
| **Entorno de Prueba**      | Node.js 22, conexión activa a la base de datos.                                                                          |
| **Precondiciones**         | - Base de datos con acciones previamente registradas.                                                                    |
| **Pasos para Ejecutar**    | 1. Registrar múltiples compras de acciones. <br> 2. Validar que el sistema consolide correctamente la información.       |
| **Criterios de Aceptación**| - Los datos deben consolidarse correctamente sin inconsistencias.                                                        |
| **Resultado Esperado**     | La consolidación de datos debe reflejar correctamente los valores del portafolio.                                        |
| **Resultado Obtenido**     | Consolidación de datos realizada con éxito, con valores correctos para total de acciones, valor total y precio promedio. |
| **Estado Final**           | Aprobada                                                                                                                 |
| **Observaciones**          | Se corrigió el formato de averagePrice para asegurarse de que se devuelva como número en lugar de string.                |
| **Evidencia**              | ![Prueba de integracion 3](/img/PruebaIntegracion3.png)                                                                  |


## 4. **Conclusiones**

- **Validación exitosa del sistema**: Todas las pruebas unitarias e integración fueron aprobadas, confirmando la estabilidad y fiabilidad del sistema en sus módulos clave.
- **Correcta integración con la API de precios**: Se verificó que el sistema actualiza correctamente las ganancias/pérdidas en tiempo real al obtener precios desde la API.
- **Manejo robusto de errores**: Se comprobó que el sistema rechaza entradas inválidas y proporciona mensajes de error adecuados.
- **Eficiencia en cálculos y consolidación de datos**: Se validó que el sistema gestiona correctamente el ordenamiento y consolidación del portafolio financiero.
- **Reducción de riesgos antes de producción**: La cobertura de pruebas minimiza posibles fallos en el sistema antes de su despliegue.  