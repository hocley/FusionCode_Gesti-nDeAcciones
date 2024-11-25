**Documento de Plan de Gestión de Configuración de Software (SCM)**

**Proyecto:** Gestión de Acciones 

**1. Objetivos **

-   Garantizar el control y seguimiento de los cambios en los artefactos
    del proyecto.

-   Asegurar que las versiones del software sean consistentes,
    reproducibles y estén debidamente documentadas.

-   Proveer un sistema de organización eficiente para el desarrollo
    colaborativo.

**2. Alcance**

Este plan cubre la gestión de configuración para:

-   Código fuente del proyecto.

-   Documentación asociada (requisitos, estándares, flujo de trabajo,
    etc.).

-   Artefactos finales de las versiones del software.

**3. Roles y Responsabilidades**

-   **Administrador SCM:**

    -   Responsable de implementar y supervisar el cumplimiento del Plan
        SCM.

    -   Mantener la integridad del repositorio.

    -   Supervisar el etiquetado de versiones y las políticas de fusión.

-   **Desarrolladores:**

    -   Seguir el flujo de trabajo establecido (Git Feature Branch
        Workflow).

    -   Realizar commits con mensajes claros y descriptivos.

    -   Resolver conflictos de integración de manera colaborativa.

-   **Revisor de código:**

    -   Verificar que las ramas cumplen con los estándares de
        codificación y políticas SCM.

    -   Aprobar Pull Requests (PR) antes de fusionarlos.

**4. Artefactos bajo Control de Configuración**

1.  **Código Fuente**:

    -   Archivos del sistema desarrollados en JavaScript y para frontend
        en html y css.

2.  **Documentación**:

    -   Documento de requisitos, diagramas de diseño, estándares de
        codificación, y otros documentos esenciales.

3.  **Artefactos de liberación**:

    -   Archivos ejecutables y documentación asociada a cada versión del
        software.

**5. Herramientas de Control de Configuración**

1.  **Sistema de Control de Versiones:**

    -   **Git** será la herramienta principal para la gestión de
        versiones.

    -   Repositorio alojado en GitHub/hocley/FusionCode_GestorDeAcciones

2.  **Gestor de Documentación:**

    -   Microsoft 365 (Word en línea) con OneDrive para almacenar y
        colaborar en la documentación del archivo.

**6. Flujo de Trabajo (Workflow)**

El proyector seguirá el **Git Feature Branch WorkFlow.** Resumen del
proceso:

> 1\. La rama principal (main) contiene únicamente el código estable.
>
> 2\. La rama de desarrollo (develop) integra nuevas características
> antes de ser fusionada a main.
>
> 3\. Las ramas temporales (feature, bugfix, hotfix) se crean para
> trabajar en tareas específicas:

-   feature/\<nombre\> para nuevas características.

-   bugfix/\<nombre\> para corrección de errores en desarrollo.

-   hotfix/\<nombre\> para corrección de errores críticos en producción.

> 4\. Uso de Pull Requests (PR) para revisar el código antes de
> fusionarlo.

**7. Procedimientos de Control**

1.  **Creación de Ramas**

-   Toda tarea debe desarrollarse en una rama especifica siguiendo las
    convenciones definidas:

    -   git checkout -b feature/\<nombre\>

**2. Control de Cambios**

-   Cada cambio debe estar documentado en un commit con un mensaje claor
    y conciso.

    -   \<tipo\>(\<área\>): \<descripción\>

**3. Etiquetado de Versiones**

-   Las versiones del software serán etiquetadas siguiendo el formato de
    dos dígitos: X.Y

**8. Estrategia de Lanzamiento**

**1. Pre-lanzamiento:**

-   Revisar documentación y notas de la versión.

**2. Lanzamiento:**

-   Fusionar develop en main:

> git checkout main
>
> git merge develop
>
> git push origin main

**3. Post-lanzamiento:**

-   Actualizar la documentación de usuario si corresponde.

**9. Aprobación**

-   **Administrador SCM:** José Merchán

-   **Fecha de Aprobación:** 24/11/2024
