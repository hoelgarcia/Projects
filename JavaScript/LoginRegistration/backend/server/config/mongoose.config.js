const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/LoginRegistrationDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log("You're connected to the database."))
    .catch(err=>console.log("You're not connected to the database.", err))