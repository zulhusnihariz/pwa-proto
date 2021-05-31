const { db, auth } = require("../models/firebase.js");

require("dotenv/config");

module.exports = {
  async verifyUser(request, response) {
    let idToken = request.body.uid;
    await auth
      .verifyIdToken(idToken)
      .then(decodedToken => {
        const uid = decodedToken.uid;

        // get user record
        auth
          .getUser(uid)
          .then(userRecord => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(
              `Successfully fetched user data: ${JSON.stringify(userRecord)}`
            );

            // set start time
            let nowTime = Date.now();

            let endTime = new Date(nowTime);

            let currentTime = {
              user: userRecord.email,
              startTime: nowTime,
              // set end time = start time + 2 hours
              endTime: endTime.setHours(endTime.getHours() + 2)
            };

            response.send({
              verified: true,
              message: "user verified",
              currentTime: currentTime
            });
          })
          .catch(error => {
            console.log("Error fetching user data:", error);
          });
      })
      .catch(error => {
        console.log("Error verify token id:", error);
        response.status(400).send(null);
      });
  },
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

  async dailyData(request, response) {
    var Twitter = require("twitter");
    let covidMalaysia = {};
    var client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      bearer_token: process.env.TWITTER_ACCESS_TOKEN_KEY
    });
    try {
      const getDailyData = data => {
        return new Promise((resolve, reject) => {
          client.get(
            "search/tweets",
            {
              q: "'status terkini #covid19'",
              from: data,
              tweet_mode: "extended"
            },
            function(error, tweets, response) {
              if (error) {
                reject(error);
              }
              resolve(tweets);
            }
          );
        });
      };

      const printTweets = async () => {
        const tweets = await getDailyData("KKMPutrajaya");
        console.log(tweets);
        let dailyCases = tweets.statuses;

        let fullText = [];

        dailyCases.forEach(el => {
          fullText.push(el.full_text);
        });

        // console.log(fullText);

        fullText.forEach(el => {
          let todayDate;

          let totalPositiveCases;
          let totalRecovery;
          let totalDeath;

          let recoveryCases;
          let positiveCases;
          let deathCases;

          /* -------------------------------------------------------------------------- */
          /*                                 Today Date                                 */
          /* -------------------------------------------------------------------------- */

          let months = [
            "januari",
            "februari",
            "mac",
            "april",
            "mei",
            "jun",
            "julai",
            "ogos",
            "september",
            "oktober",
            "november",
            "disember"
          ];

          function getDateFromMonthYear(input) {
            const parts = input.split(" ");
            if (parts.length != 3)
              throw Error(`Expected 3 parts, got ${parts.length}: "${input}"`);
            const [day, searchMonth, year] = parts;

            const month = months.indexOf(searchMonth.toLowerCase());
            if (month < 0) throw Error(`Unknown month: "${searchMonth}"`);

            return new Date(year, month, day);
          }

          if (el.match("(#COVID19,) (.[^\\n)]*)?") == null) {
            return;
          } else {
            todayDateRaw = el.match("(#COVID19,) (.[^\\n)]*)?")[2].trim();
            todayDate = getDateFromMonthYear(todayDateRaw);
          }

          /* -------------------------------------------------------------------------- */
          /*                               Daily Recovery                               */
          /* -------------------------------------------------------------------------- */
          if (el.match("Kes sembuh= (\\d{0,3}[,]?\\d{0,5})") == null) {
            return;
          } else {
            recoveryCases = el
              .match("Kes sembuh= (\\d{0,3}[,]?\\d{0,5})")[1]
              .trim();
          }

          /* -------------------------------------------------------------------------- */
          /*                            Daily Positive Cases                            */
          /* -------------------------------------------------------------------------- */
          if (el.match("baharu positif= (\\d{0,3}[,]?\\d{0,5})") == null) {
            return;
          } else {
            positiveCases = el
              .match("baharu positif= (\\d{0,3}[,]?\\d{0,5})")[1]
              .trim();
          }

          /* -------------------------------------------------------------------------- */
          /*                              Daily Death Cases                             */
          /* -------------------------------------------------------------------------- */
          if (el.match("kes kematian= (\\d{0,3}[,]?\\d{0,5})") == null) {
            return;
          } else {
            deathCases = el
              .match("Kes kematian= (\\d{0,3}[,]?\\d{0,5})")[1]
              .trim();
          }

          /* -------------------------------------------------------------------------- */
          /*                               Total Recovery                               */
          /* -------------------------------------------------------------------------- */
          if (el.match("Jumlah kes sembuh= (\\d{0,3}[,]?\\d{0,5})") == null) {
            return;
          } else {
            totalRecovery = el
              .match("Jumlah kes sembuh= (\\d{0,3}[,]?\\d{0,5})")[1]
              .trim();
          }

          /* -------------------------------------------------------------------------- */
          /*                               Total Positive                               */
          /* -------------------------------------------------------------------------- */
          if (el.match("Jumlah positif= (\\d{0,3}[,]?\\d{0,5})") == null) {
            return;
          } else {
            totalPositiveCases = el
              .match("Jumlah positif= (\\d{0,3}[,]?\\d{0,5})")[1]
              .trim();
          }

          /* -------------------------------------------------------------------------- */
          /*                                 Total Death                                */
          /* -------------------------------------------------------------------------- */
          if (el.match("Jumlah kes kematian= (\\d{0,3}[,]?\\d{0,5})") == null) {
            return;
          } else {
            totalDeath = el
              .match("Jumlah kes kematian= (\\d{0,3}[,]?\\d{0,5})")[1]
              .trim();
          }

          covidMalaysia[`${todayDateRaw}`] = {
            date: todayDate,

            daily_positive: positiveCases,
            daily_death: deathCases,
            daily_recovery: recoveryCases,
            total_positive: totalPositiveCases,
            total_death: totalDeath,
            total_recovery: totalRecovery
          };
        });

        response.send(covidMalaysia);
      };

      printTweets();

      console.log(covidMalaysia);
    } catch (error) {
      console.log(error);
    }
  }
};
