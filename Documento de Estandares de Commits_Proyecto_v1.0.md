# **Documento de Estándares de Commits**

**Proyecto:** Gestión de Acciones

## 1\. Objetivo

Definir un estándar para los mensajes de commit en el repositorio del proyecto "Gestión de Acciones". Seguir estas convenciones ayudará a que el historial de commits sea claro, consistente y fácil de seguir, facilitando la colaboración y revisión de código y auditoria en cambios en el proyecto.

## 2\. Formato del Mensaje de Commit

Cada mensaje de commit debe seguir el siguiente formato:

**&lt;tipo&gt;(&lt;módulo&gt;): &lt;mensaje breve&gt;**

- **tipo:** Indica el propósito del commit.
- **módulo:** Describe el módulo o componente afectado por ejemplo (compra, usuario, API, portafolio).
- **mensaje breve:** Descripción concisa y clara de los cambios realizados.

Ejemplo:

feat(compra): agregar función de registro de compra de acciones

## 3\. Tipos de Commit

Se presenta una lista de los tipos de commit que se deben utilizar en el punto 2.

- _feat_: Añadir una nueva funcionalidad al código.
- **Ejemplo:** feat(compra): agregar registro de compra de acciones
- _fix_: Solucionar un error en el código.
- **Ejemplo:** fix(api): corregir error en la consulta de precios
- _docs_: Cambios en la documentación.
- **Ejemplo**: docs: actualizar el README con instrucciones de configuración
- _refactor_: Cambios en el código que no añaden funcionalidades ni corrigen errores (mejora en la estructura o legilibilidad).
- **Ejemplo:** refactor(usuario): simplificar la lógica de autenticación
- _test_: Añadir o modificar pruebas.
- **Ejemplo:** test(api): agregar pruebas para el cálculo de ganancia
- _task_: Cambios menores o tareas de mantenimiento que no afectan la funcionalidad (actualización de configuraciones).
- **Ejemplo:** task: actualizar dependencias en package.json

## 4\. Buenas prácticas de los Commits

- **Usar el tiempo presente**: Los mensajes deben describir lo que hace el commit, no lo que hizo.
  - Correcto: fix(api): corregir error en la consulta
  - Incorrecto: fixed api error
- **Ser conciso y especifico**: Mantén el mensaje breve y directo, pero proporciona detalles suficientes para que otros entiendan el cambio sin ambigüedades.
- **Evitar mensajes genéricos**: Mensajes como update o changes, ya que no son descriptivos y dificultan la comprensión del historial.
- **Incluir detalles adicionales cuando sea relevante:** Para cambios complejos, agrega una descripción detallada en el cuerpo del commit.

### Formato:

&lt;tipo&gt;(&lt;módulo&gt;): &lt;mensaje breve&gt;

&lt;descripción detallada opcional&gt;

- **Realizar commits frecuentemente:** Es mejor hacer varios commits pequeños con cambios específicos que un commit grande con múltiples cambios. Esto facilita la revisión y el control de versiones.

## 5\. Control de versiones del producto

**Formato: Mayor.Menor (XY)**

- **Mayor (X)** : Incrementa cuando se realizan cambios importantes o incompatibles con versiones anteriores.
- **Menor (Y)** : Incrementa cuando se agregan nuevas funciones o mejoras que son compatibles con versiones anteriores.

### **Ejemplos de cuándo incrementar cada versión:**

**1\. Versión Mayor (X)** : Cambios importantes

- Se incrementa el primer dígito ( X) cuando se introduce un cambio importante o rompedor, es decir, que puede hacer incompatible el producto con versiones anteriores.
  - Cambio en la arquitectura del sistema.
  - Eliminación o modificación importante de una funcionalidad.
  - Rediseño de la interfaz que afecta significativamente la experiencia del usuario.
- **Ejemplo** : Pasar de 1.3 a 2.0.

**2\. Versión Menor (Y)** : Nuevas funcionalidades o mejoras

- Se incrementa el segundo dígito ( Y) cuando se agregan nuevas funcionalidades o mejoras que no afectan la compatibilidad.
  - Agregar una nueva funcionalidad de cálculo de ganancia en tiempo real.
  - Mejoras en la usabilidad o pequeños ajustes visuales.
  - Optimización de rendimiento que no altera el funcionamiento de las características existentes.
- **Ejemplo**: Pasar de 1.3 a 1.4.
