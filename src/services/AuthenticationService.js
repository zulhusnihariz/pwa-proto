import Api from "../services/Api";

export default {
  getAllUser(credentials) {
    return Api().get("all-user", credentials);
  },
  verifyUser(credentials) {
    return Api().post("all-user", credentials);
  },
  getDailyData(credentials) {
    return Api().get("/", credentials);
  }
};
