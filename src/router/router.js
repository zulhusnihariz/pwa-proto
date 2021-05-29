const AuthenticationController = require("../controllers/AuthenticationController");

module.exports = app => {
  app.post("/register", AuthenticationController.registerUser);
  app.post("/login", AuthenticationController.loginUser);
  app.get("/all-user", AuthenticationController.allUser);
};
