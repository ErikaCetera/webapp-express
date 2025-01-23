const connection = require('../data/db_movies')


//rotta per prelevare tutti i film
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
//rotta per prelevare un singolo film tramite id
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




module.exports = {
  index,
  show
};