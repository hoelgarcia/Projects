const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/ShopifyDeveloperInternDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log("Connected to the database."))
    .catch(err=>console.log("Not connected to the database.", err))