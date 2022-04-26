const express = require('express');
const cors = require("cors");

require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const port = 8000;


app.use(express.json(), express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({credentials: true, origin: "http://localhost:3000"}));


require("./server/routes/user.routes")(app);
require("./server/config/mongoose.config");


app.listen(port, () => console.log(`Listening on port: ${port}`));