const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Item title is required."],
        minLength: [3, "Item title must be at least 3 characters long."]
    },
    description:{
        type: String,
        required: [true, "Description is required."],
        minLength: [3, "Description must be at least 3 characters long."]
    },
    units:{
        type: Number,
        required: [true, "Number of units to be sold is required."],
        min: [1, "Must have at least 1 unit to sell."]
    }
}, {timestamps: true})

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;