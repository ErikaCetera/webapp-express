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


//Rende accessibile la cartella public
app.use(express.static('public'));

// Rotta base
app.get('/', (req, res) =>{
    res.send('sei nel server')
})

// Include /movies in tutte le rotte
app.use('/movies', moviesRouter);

// Utilizza il middleware
app.use(handlerErr);

// Apre la porta del server
app.listen(port, () =>{
    console.log('server in ascolto');
    
});