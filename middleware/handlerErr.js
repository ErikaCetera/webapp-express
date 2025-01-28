// Funzione middleware per gestire gli errori
const handlerErr = (err, req, res, next) =>{
    // Crea un oggetto di risposta
    const resObj = {
        status: 'fail',
        message: err.message
    };
  // Aggiunge i dettagli dell'errore se l'ambiente è di sviluppo
    if(process.env.ENVIROMENT === 'development'){
        resObj.detail = err.stack;
    }
    return res.status(500).json({resObj});
};

module.exports = handlerErr;

    
