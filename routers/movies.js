// Importa modulo express
const express = require("express");
// Crea un router utilizzando express.Router
const router = express.Router();
//Importa funzioni di movieController
const movieController = require('../controllers/movieController');

//index
router.get('/', movieController.index);
//show
router.get('/:id', movieController.show);
//creazione libro
router.post('/', movieController.store);
//creazione recensione
router.post('/:id/reviews', movieController.storeReview);


module.exports = router;
