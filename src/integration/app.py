import sys
import json
import pandas as pd

# Ruta al dataset
DATA_PATH = '../data/data_stocks.csv'

def search_stock(name):
    try:
        # Cargar el dataset
        data = pd.read_csv(DATA_PATH)

        # Filtrar las filas que coinciden con el nombre (ignorando mayúsculas y minúsculas)
        matches = data[data['Longname'].str.contains(name, case=False, na=False)]

        # Si se encuentran coincidencias, construir la respuesta
        if not matches.empty:
            result = [
                {"name": row['Longname'], "symbol": row['Symbol'], "type": row['Sector']}
                for _, row in matches.iterrows()
            ]
        else:
            result = -1  # Devuelve -1 si no hay coincidencias

        return result
    except Exception as e:
        # Manejo de errores
        return {"error": str(e)}

if __name__ == "__main__":
    # Leer argumentos (nombre a buscar)
    stock_name = sys.argv[1] if len(sys.argv) > 1 else ""

    # Buscar el stock
    response = search_stock(stock_name)

    # Devolver el resultado como JSON
    print(json.dumps(response))
