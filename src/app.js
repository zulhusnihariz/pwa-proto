const express = require("express");
const config = require("./config/config");

const app = express();

app.use(express.json());

require("../src/router/router")(app);

app.listen(process.env.PORT || config.port);
console.log(`Server started on port ${config.port}`);
