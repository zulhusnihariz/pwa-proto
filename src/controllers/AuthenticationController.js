const { db, auth } = require("../models/firebase.js");
const firebase = require("firebase");

module.exports = {
  async allUser(request, response) {
    const listAllUsers = nextPageToken => {
      // List batch of users, 1000 at a time.
      auth
        .listUsers(1000, nextPageToken)
        .then(listUsersResult => {
          listUsersResult.users.forEach(userRecord => {
            console.log("user", userRecord.toJSON());
          });

          response.send(listUsersResult);
        })
        .catch(error => {
          console.log("Error listing users:", error);
          response.status(400).send(error);
        });
    };
    // Start listing users from the beginning, 1000 at a time.
    listAllUsers();
  },
  async registerUser(request, response) {
    /* -------------------------------------------------------------------------- */
    /*                             Firebase Admin SDK                             */
    /* -------------------------------------------------------------------------- */
    try {
      console.log("inside registerUser");
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
  },
  async loginUser(request, response) {
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
