const { text } = require('express');
const connection = require('../data/db_movies')


//Preleva tutti i film
const index = (req, res) => {
  const sql = 'SELECT * FROM movies'
  // Esegue la query al database
  connection.query(sql, (err, result) => {
    if (err) {
      return next( new Error( err.message));
      
    }else{
    return res.json({
      status: 'success',
      data: result
    });
  }
  });


}
//Preleva un singolo film tramite id
const show = (req, res) => {

  const id = req.params.id;
  const sql = 'SELECT * FROM movies WHERE id = ?;';

  const reviewsSql = `SELECT reviews.*
               FROM movies
               JOIN reviews
               ON movies. id = reviews.movie_id
               WHERE movies.id = ?`;

   // Esegue la query al database per il singolo
  connection.query(sql, [id], (err, movies) => {
    if (err) {
      return next( new Error( err.message));
      
    } else if (movies.length === 0) {
      return res.status(400).json({
        message: "Film non trovato"
      })
    } else {
      // Esegue la query al database per le rencensioni
      connection.query(reviewsSql, [id], (err, reviews) => {
        if (err) {
          return res.status(500).json({
            message: "Errore interno del server"
          });
        }
        // Combina i dati del film con le recensioni
        const reviewMovie = {
          ...movies[0],
          reviews
        };

        return res.status(200).json({
          status: "success",
          data: reviewMovie
        });
      });
    }
  })
};


//Crea un film
const store = (req, res, next) =>{
   
};



const storeReview = (req, res, next) => {

  const movieId = req.params.id;
  const { name, vote, text } = req.body;

  // Validazione
  if (isNaN(vote) || vote < 0 || vote > 5) {
      return res.status(400).json({
          status: 'fail',
          message: 'Il voto deve essere un valore numerico tra 0 e 5'
      });
  }

  if (name.length <= 3) {
      return res.status(400).json({
          status: 'fail',
          message: 'Il nome deve avere più di 3 caratteri'
      });
  }

  if (text && text.length > 0 && text.length < 5) {
      return res.status(400).json({
          status: 'fail',
          message: 'Il testo deve essere lungo almeno 6 caratteri'
      });
  }

  // Controlla se il film esiste
  const movieSql = `SELECT * FROM movies WHERE id = ?`;

  connection.query(movieSql, [movieId], (err, result) => {
      if (err) {
          return next(new Error('db query failed'));
      }
      if (result.length === 0) {
          return res.status(404).json({
              status: 'failed',
              message: "Film non trovato"
          });
      }

      // Se esiste crea la recensione
      const sql = `INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)`;
       
      connection.query(sql, [movieId, name, vote, text], (err, results) => {
          if (err) {
              return next(new Error('db query failed'));
          }

          res.status(201).json({
              status: 'success',
              message: 'Recensione aggiunta'
          });
      });
  });
};




module.exports = {
  index,
  show,
  storeReview,
  store
};