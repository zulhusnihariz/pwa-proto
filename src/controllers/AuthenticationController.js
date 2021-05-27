const { db } = require("../models/firebase.js");

module.exports = {
  async loginUser(request, response) {
    const sentRequest = request.body;

    const user = await db.collection("users").get();
    user.forEach(doc => {
      response.send(doc.data());
    });

    console.log(user);
  }
};
