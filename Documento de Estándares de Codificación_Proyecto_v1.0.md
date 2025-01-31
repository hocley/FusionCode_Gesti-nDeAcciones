# **Documento de Estándares de Codificación**

**Proyecto:** Gestión de Acciones

## **1\. Objetivo**  

Definir estándares de codificación para el proyecto "Gestión de Acciones", con el fin de mantener un código limpio, consistente y fácil de mantener. Este documento ayudará a los desarrolladores a escribir código legible y reducir errores, facilitando la colaboración en el equipo y la revisión de código.

## **2\. Estilo de Código**

### **2.1 Identación y Espacios**

- **Identación:** Utilizar 4 espacios por nivel de identación (evitar el uso de tabs).
- **Longitud de línea:** Limitar las líneas de código a un máximo de 80 caracteres para facilitar la lectura en cualquier entorno.
- **Espacios:** Utilizar un solo espacio entre palabras clave y paréntesis en funciones (if (condición)) y entre operadores

### **2.2 Nombres de Variables y Funciones**

- **Variables:** Usar el formato camelCase para nombres de variables y evitar abreviaturas ambiguas. Los nombres deben ser descriptivos y reflejar claramente el propósito de la variable.

Ejemplo: totalAcciones, precioCompra.

- **Funciones:** Usar camelCase para nombres de funciones, comenzando con un verbo que indique la acción realizada.

Ejemplo: calcularGanancia, actualizarPortafolio.

- **Constantes:** Usar UPPER_SNAKE_CASE para constantes, indicando claramente su inmutabilidad.

Ejemplo: API_KEY, TASA_COMISION

### **2.3 Convenciones de Nombres en Clases y Archivos**

- **Clases:** Usar el formato PascalCase para nombres de clases.

Ejemplo: UsuarioService, Accion

- **Nombres de archivos:** Los archivos deben tener nombres en camelCase, reflejando el contenido o componente que representan.

Ejemplo: registroCompra.js, calculadoraGanancia.py.

## **3\. Organización del Código**

### **3.1 Estructuras de Archivos y Carpetas**

- Agrupar archivos por funcionalidad (por ejemplo, models/, controllers/, views/) para mejorar la organización y escalabilidad del proyecto.
- Crear carpetas específicas para servicios de terceros o APIs (api/), utilidades (utils/), y pruebas (tests/).

### **3.2 Modulares y Funcional**

- Dividir el código en funciones y métodos específicos que cumplan con el principio de responsabilidad única.
- **Evitar funciones y métodos largos:** Limitar cada función a no más de 20-30 líneas para facilitar la comprensión y prueba de cada bloque.

## **4\. Manejo de Errores**

- **Captura de errores:** Implementar bloqueos try-catch en operaciones que puedan fallar, especialmente en interacciones con APIs o base de datos.
- **Mensajes de error:** Incluir mensajes de error descriptivos y, si es posible, información de contexto relevante.

Ejemplo: throw new Error("Fallo en la actualización del portafolio: el usuario no existe").

## **5\. Comentario y Documentación de Código**

- **Comentarios de propósito:** Solo comentar el código cuando sea necesario aclarar la lógica, evitar comentarios redundantes.
- **Documentación de funciones:** Usar formato de documentación para describir el propósito, parámetros y valor de retorno de cada función o método.

Ejemplo:

- /\*\*
- \* Calcula el porcentaje de ganancia o pérdida de una acción.
- \* @param {number} precioCompra - Precio de compra de la acción.
- \* @param {number} precioActual - Precio actual de la acción.
- \* @returns {number} - Porcentaje de ganancia/pérdida.
- \*/
- function calcularGanancia(precioCompra, precioActual) { ... }

## **6\. Buenas Prácticas de Código**

- **Evitar variables globales:** Limitar el uso de variables globales para reducir posibles conflictos en el código.
- **Inmutabilidad:** Evitar modificar parámetros de entrada dentro de una función. Siempre retornar un nuevo valor o copia en lugar de modificar los originales.
- **Evitar "código mágico":** Asignar valores a variables descriptivas en lugar de usar valores numéricos o de texto "duros".

## **7\. Validación de Código**

- **Validación de datos:** Asegurarse de que todos los datos de entrada estén validados y sanitizados antes de su procesamiento.
