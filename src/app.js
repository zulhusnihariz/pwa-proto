const express = require("express");
var cors = require("cors");
const config = require("./config/config");

const app = express();
app.use(cors());
app.use(express.json());

require("../src/router/router")(app);

app.listen(process.env.PORT || config.port);
console.log(`Server started on port ${config.port}`);
