const { exec } = require('child_process');

/**
 * Busca información de una acción ejecutando un script de Python.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
const getStockInfo = (req, res) => {
    const { name } = req.params; // Obtener el nombre de los parámetros de la ruta

    // Comando para ejecutar el script Python con el nombre como argumento
    const pythonCommand = `python ../services/search.py "${name}"`;

    exec(pythonCommand, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error ejecutando app.py: ${err.message}`);
            return res.status(500).json({ error: 'Error ejecutando search.py' });
        }
        if (stderr) {
            console.error(`Salida de error de app.py: ${stderr}`);
        }
        try {
            // Parsear la salida del script Python
            const output = JSON.parse(stdout.trim());
            res.status(200).json({ output });
        } catch (parseError) {
            console.error(`Error procesando la respuesta de Python: ${parseError.message}`);
            res.status(500).json({ error: 'Error procesando la respuesta de Python' });
        }
    });
};

module.exports = { getStockInfo };
