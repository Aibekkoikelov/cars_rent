const {pool} = require("../queries");



const getAllClients = (req, res) => {
    try{
        pool.query('SELECT * FROM client ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
    }catch (e){
        return res.status(500).json({message: e.message})
    }
}
const createClient = async (req, res) => {
    const {name, age, phoneNumber} = req.body
    try{
      await  pool.query('INSERT INTO client (name, age, phoneNumber) VALUES ($1, $2, $3)', [name, age, phoneNumber]), (error, results) => {
            if (error) {
                throw error
            }
           console.log(results.rows)
           return res.status(200).json(results.rows)
        }
    }catch (e){
        return res.status(500).json({message: e.message})
    }
}
const deleteClient = (req, res) => {
    const {id} = req.params
    try {
        pool.query('DELETE FROM client WHERE id = $1', [id]), (error, results) => {
            if (error) {
                throw error
            }
        }
    } catch (e) {
        return res.status(500).json({message: e.message})
    }
}

module.exports = {
    getAllClients,
    createClient,
    deleteClient
}
