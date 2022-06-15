const express = require("express");
const router = express.Router()
const clientDB = require("./client.service")
router.get("/", (req, res) => {
    clientDB.getAllClients(req,res)
})
router.post("/", (req, res) => {
    clientDB.createClient(req,res)
})
router.delete("/:id", (req, res) => {
    clientDB.deleteClient(req,res)
})



module.exports = router