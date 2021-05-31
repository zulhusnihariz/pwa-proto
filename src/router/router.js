const AuthenticationController = require("../controllers/AuthenticationController");

module.exports = app => {
  app.get("/all-user", AuthenticationController.allUser);
  app.post("/all-user", AuthenticationController.verifyUser);
  app.get("/", AuthenticationController.dailyData);
};
