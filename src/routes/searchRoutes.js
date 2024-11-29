const express = require('express');
const { exec } = require('child_process');

const router = express.Router();

// Ruta para buscar información de acciones
router.get('/stock-info/:name', (req, res) => {
    const { name } = req.params; // Obtener el nombre de los parámetros de la ruta

    // Comando para ejecutar el script Python con el nombre como argumento
    const pythonCommand = `python ../integration/app.py "${name}"`;

    exec(pythonCommand, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error ejecutando app.py: ${err.message}`);
            return res.status(500).json({ error: 'Error ejecutando app.py' });
        }
        if (stderr) {
            console.error(`Salida de error de app.py: ${stderr}`);
        }
        try {
            // Parsear la salida del script Python
            const output = JSON.parse(stdout.trim());
            res.status(200).json({ output });
        } catch (parseError) {
            res.status(500).json({ error: 'Error procesando la respuesta de Python' });
        }
    });
});

module.exports = router;
