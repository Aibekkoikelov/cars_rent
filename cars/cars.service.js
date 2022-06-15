const {pool} = require('../queries')




const getAllCars = (req, res) => {
    try{
        pool.query('SELECT * FROM cars ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
    }catch (e){
        return res.status(500).json({message: e.message})
    }
  }

  const createCar =async (req, res) => {
    const {model, registrationNumber} = req.body
    try{
     const newCar = await  pool.query('INSERT INTO cars (model, registernumber) VALUES ($1, $2) RETURNING *', [model, registrationNumber])
           res.json(newCar.rows[0])
    }catch (e){
        return res.status(500).json({message: e.message})
    }
  }
  const deleteCar = (req, res) => {
    const {id} = req.params
    try {
       const deleteCar =  pool.query('DELETE FROM cars WHERE id = $1 RETURNING * ', [id])
        if (!deleteCar?.rows?.length) {
           throw new Error('Car not founds')
        }
    } catch (e) {
        return res.status(500).json(e.message)
    }
  }



  module.exports = {
      getAllCars,
      createCar,
      deleteCar
  }