//rotta per prelevare tutti i film
const index = (req, res) =>{
    console.log('sono index');
    
    return res.json({
        status: 'success',
        data: []
    })

}
//rotta per prelevare un singolo film tramite id
const show = (req, res) => {
  const id = req.params.id;
  console.log('sono show');
  

  return res.json({
    status: 'success',
    data:[]
  })
}


module.exports = {
    index,
    show
};