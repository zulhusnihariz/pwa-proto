/* -------------------------------------------------------------------------- */
/*                               Firebase Admin SDK                           */
/* -------------------------------------------------------------------------- */
const admin = require("firebase-admin");

const serviceAccount = require("../../serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
