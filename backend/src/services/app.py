import sys
import json
import pandas as pd

# Ruta al dataset
RUTA_DATOS = '../data/data_stocks.csv'

def buscar_accion(nombre_accion):
    """
    Busca acciones en el dataset basándose en un nombre parcial o completo.

    Args:
        nombre_accion (str): Nombre de la acción a buscar.

    Returns:
        list or int: Lista de diccionarios con información de acciones coincidentes
                     o -1 si no se encuentran coincidencias.
        dict: Diccionario de error si ocurre una excepción.
    """
    try:
        # Cargar el dataset
        conjunto_datos = pd.read_csv(RUTA_DATOS)

        # Filtrar las filas que coinciden con el nombre (ignorando mayúsculas y minúsculas)
        coincidencias = conjunto_datos[
            conjunto_datos['Longname'].str.contains(nombre_accion, case=False, na=False)
        ]

        # Si se encuentran coincidencias, construir la respuesta
        if not coincidencias.empty:
            resultados = [
                {
                    "name": fila['Longname'],
                    "symbol": fila['Symbol'],
                    "type": fila['Sector']
                }
                for _, fila in coincidencias.iterrows()
            ]
        else:
            resultados = -1  # Devuelve -1 si no hay coincidencias

        return resultados

    except Exception as error:
        # Manejo de errores con mensaje descriptivo
        return {
            "error": f"Error al buscar la acción: {str(error)}",
            "detalles": str(error)
        }

def main():
    """
    Función principal para ejecutar la búsqueda de acciones desde la línea de comandos.
    """
    # Leer argumentos (nombre a buscar)
    nombre_accion = sys.argv[1] if len(sys.argv) > 1 else ""

    # Buscar el stock
    respuesta = buscar_accion(nombre_accion)

    # Devolver el resultado como JSON
    print(json.dumps(respuesta))

if __name__ == "__main__":
    main()