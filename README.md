# Proyecto de Gestión de Acciones - ShareFlow

## Desarrollado por: FusionCode
- **Amaguaña Ariel**
- **Merchán José**
- **Pereira Geovanny**
- **Reinoso Abdel**

---

## Requisitos Previos
Asegúrese de tener instalados los siguientes componentes en su sistema antes de proceder con la instalación:
1. **Node.js**: Descargue e instale desde [nodejs.org](https://nodejs.org/).
2. **Python**: Versión 3.6 o superior. Descargue desde [python.org](https://www.python.org/).
3. **Pip**: Administrador de paquetes de Python incluido en las versiones más recientes de Python.
4. **Git**: Descargue e instale desde [git-scm.com](https://git-scm.com/).

---

## Pasos para la Instalación y Ejecución

### 1. Instalación de Dependencias en la Raíz del Proyecto
Desde la raíz del proyecto, ejecute el siguiente comando para instalar las dependencias de Node.js:

```
npm install
```
Adicionalmente, instale las dependencias de Python necesarias ejecutando:

````
pip install sys json pandas
````

### 2. Configuración del Servidor Node.js
Diríjase al directorio ```src/node``` desde la raíz del proyecto:

```
cd src/node
```
Inicie el servidor ejecutando el archivo server.js desde la terminal:

```
node server.js
```
Alternativamente, puede iniciar el servidor utilizando su interfaz gráfica o IDE preferido.  

### 3. Acceso a la Interfaz de Usuario  
Una vez que el servidor esté en ejecución, abra el archivo ```index.html``` ubicado en la raíz del proyecto en su navegador preferido.  

---  

## Notas Adicionales
- Asegúrese de mantener todas las dependencias actualizadas para evitar conflictos.
- Verifique que los puertos utilizados por el servidor Node.js (3000) no estén ocupados por otros procesos.
