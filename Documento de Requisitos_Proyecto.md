# **Documento de Requisitos**

**Proyecto:** Gestión de Acciones

## 1\. Objetivos

- Facilitar el registro de compras de acciones con información detallada.
- Proporcionar cálculos de ganancia o pérdida basados ​​en el valor actual de las acciones.

## 2\. Requisitos Funcionales

### **2.1 Registro de Compra de Acciones**

**RF1** : El sistema debe permitir al usuario registrar la compra de una acción.

- **Detalles**:
  - Símbolo de la empresa.
  - Empresa.
  - Cantidad de acciones compradas.
  - Precio de compra por acción.

### **2.2 Calculo de Ganancia/Pérdida**

**RF2** : El sistema debe calcular el porcentaje de ganancia o pérdida para cada acción registrada en función del valor actual.

- **Detalles**:
  - Se debe obtener el valor actual de la acción.
  - Especificar los valores actuales especialmente se depende de una API, para alinear expectativas y requerimiento de rendimiento.
  - El sistema debe mostrar el porcentaje de ganancia/pérdida.
  - El sistema debe mostrar el equivalente en dólares de la ganancia/pérdida.
  - El sistema debe mostrar el total actual de la inversión.

**2.3 Visualización de Portafolio**

- **RF3**: El sistema debe mostrar un resumen del portafolio del usuario, con detalles de cada acción registrada, incluyendo cantidad, valor de compra, valor actual, ganancia/pérdida y valor en dólares.

### **2.4 Búsqueda de símbolos**

- **RF4**: El sistema debe permitir al usuario buscar el símbolo de una empresa para obtener información sobre la empresa.

## 3\. Requisitos no funcionales

### **3.1 Usabilidad**

- **RNF1**: El sistema debe contar con una interfaz intuitiva que permita a los usuarios navegar y realizar operaciones con facilidad.
- **RNF2**: La aplicación debe estar diseñada para dispositivos de escritorio y móviles.

### **3.2 Rendimiento**

- **RNF3**: El sistema debe procesar y mostrar los cálculos de cada transacción en menos de 2 segundos después de la consulta.

### **3.3 Escalabilidad**

- **RNF6**: El sistema debe estar preparado para soportar 50 usuarios y 30 registros de acciones simultáneamente.

### **3.5 Confiabilidad**

- **RNF7:** Las transacciones de compra y venta deben contar con confirmaciones para evitar duplicados o errores, garantizando así la integridad de los datos

### **3.7 Compatibilidad con APIs de Datos Financieros Externos**

- **RNF9**: El sistema debe estar integrado con una API de datos financieros para obtener automáticamente el valor actual de las acciones.
