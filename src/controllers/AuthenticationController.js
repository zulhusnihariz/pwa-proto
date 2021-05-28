const { auth } = require("../models/firebase.js");
const firebase = require("firebase");

module.exports = {
  async registerUser(request, response) {
    /* -------------------------------------------------------------------------- */
    /*                             Firebase Admin SDK                             */
    /* -------------------------------------------------------------------------- */
    try {
      console.log(request.body);
      const userRecord = await auth.createUser({
        uid: request.body.uid,
        email: request.body.email,
        password: request.body.password
      });
      const user = await userRecord.user;

      const customToken = await auth.createCustomToken(userRecord.uid);

      response.send(user);
    } catch (error) {
      response
        .status(500)
        .send({ error: "An error has occured trying to sign up" });
    }
  }
};
