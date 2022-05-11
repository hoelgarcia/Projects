const Inventory = require("../models/inventory.model");

module.exports.testResponse = (req,res) => {
    res.json({message: "Test response."})
}
module.exports.findAll = (req,res) => {
    Inventory.find({})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({message: "Not working. Error in findAll.", err}))
}
module.exports.createInventory = (req,res) => {
    Inventory.create(req.body)
        .then(newInventory => res.json(newInventory))
        .catch(err => res.status(400).json({message: "Not working. Error in createInventory.",err}))
}
module.exports.findOne = (req,res) => {
    Inventory.findOne({_id: req.params._id})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({message: "Not working. Error in findOne.", err}))
}
module.exports.deleteOne = (req, res) => {
    Inventory.deleteOne({_id: req.params._id})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({message: "Not working. Error in deleteOne.", err}))
}
module.exports.updateOne = (req,res) => {
    Inventory.updateOne({_id: req.params._id}, req.body, {runValidators:true})
        .then(results => res.json(results))
        .catch(err => res.status(400).json({message: "Not working. Error in updateOne.", err}))
}