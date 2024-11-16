**Documento de Flujo de Trabajo: Git Feature Branch Workflow**

**Proyecto:** Gestión de Acciones

1\. Principales Ramas

- **main:**
  - Representa la rama de producción.
  - Siempre debe estar en un estado estable y contener código probado.
- **develop**:
  - Usado como base para el desarrollo de nuevas características y correcciones.
  - Contiene el código que será probado antes de ser fusionado con main.
- **Ramas de características (feature branches):**
  - Creadas a partir del develop para desarrollar funcionalidades o mejoras específicas.
  - Nombras siguiendo la convención: feature/<nombre>, por ejemplo: feature/registro-compra
- **Ramas de corrección (bugfix o hotfix):**
  - bugfix/<nombre>: Ramas creadas para solucionar errores encontrados en develop.
  - hotfix/<nombre>: Ramas creadas para solucionar errores críticos en producción y que deben ser aplicado a main.

2\. Convenciones de Nombres de Ramas

Usar nombres descriptivos para las ramas que identifiquen claramente el propósito de la misma:

- **Funcionalidades nuevas**:
  - feature/<nombre>: feature/registro-compra, feature/calculo-ganancia
- **Corrección de errores**:
  - bugfix/<nombre>: bugfix/error-consulta-api, bugfix/cálculo-total
- **Correcciones críticas en producción**:
  - hotfix/<nombre>: hotfix/fallo-deploy, hotfix/error-ganancia
- **Lanzamientos**:
  - release/<versión>: release/1.0, release/2.1

3\. Reglas del Flujo de Trabajo

- **No trabajar directamente en main o develop**:
  - Todas las tareas deben desarrollarse en ramas específicas.
- **Revisar el código antes de fusionar**:
  - Utiliza Pull Requests para garantizar que el código cumple con los estándares y no introduce errores.
- **Pruebas antes de fusionar**:
  - Realiza pruebas locales y/o automáticas antes de fusionar cualquier rama.
- **Mantener actualizado el entorno local**:
  - Antes de comenzar cualquier trabajo, actualiza tu rama: git pull origin develop

4\. Ejemplo de Flujo Completo

1. **Crear una nueva funcionalidad para registrar compras:**

   git checkout develop

   git checkout -b feature/registro-compra

1. **Desarrollar y realizar commits:**

   git commit -m "feat(compra): agregar formulario para registro de compras"

   git push origin feature/registro-compra

1. **Fusionar la rama en develop:**

   git checkout develop

   git merge feature/registro-compra

1. **Lanzar una nueva versión desde develop hacia main:**

   git checkout main

   git merge develop
