const InventoryController = require("../controllers/inventory.controller");
const Inventory = require("../models/inventory.model");

module.exports = app => {
    app.get("/test", InventoryController.testResponse);
    app.get("/inventory/findAll", InventoryController.findAll);
    app.post("/inventory/create", InventoryController.createInventory);
    app.get("/inventory/:_id", InventoryController.findOne);
    app.delete("/inventory/:_id", InventoryController.deleteOne);
    app.patch("/inventory/:_id", InventoryController.updateOne);
}