// Importa modulo express
const express = require('express');
// Crea applicazione express
const app = express();
// Definisce la porta del server 
const port = process.env.SERVER_PORT;
// Importa router
const moviesRouter = require('./routers/movies')


// Rotta base
app.get('/', (req, res) =>{
    res.send('sei nel server')
})

// Include /movies in tutte le rotte
app.use('/movies', moviesRouter);


// Apre la porta del server
app.listen(port, () =>{
    console.log('server in ascolto');
    
});