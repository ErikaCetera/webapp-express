// Importa modulo express
const express = require('express');
// Crea applicazione express
const app = express();
// Definisce la porta del server 
const port = process.env.SERVER_PORT;
// Importa router
const moviesRouter = require('./routers/movies');
// Importa middelware per gestire errori 
const handlerErr = require('./middleware/handlerErr');
// Importa middelware per gestire le rotte inesistenti
const checkRouteExist = require('./middleware/checkRouteExist');
// importa cors per collegame FE
const cors = require('cors');

//Collegmento al FE
app.use(cors ({
 origin: process.env.FRONTEND_URL
})
)
//Rende accessibile la cartella public
app.use(express.static('public'));

//Middleware parse json
app.use(express.json());

// Rotta base
app.get('/', (req, res) =>{
    res.send('sei nel server')
})

// Include /movies in tutte le rotte
app.use('/movies', moviesRouter);

// Utilizza i middleware
app.use(handlerErr);
app.use(checkRouteExist);


// Apre la porta del server
app.listen(port, () =>{
    console.log('server in ascolto');
    
});