import Api from "../services/Api";

export default {
  getAllUser(credentials) {
    return Api().get("all-user", credentials);
  }
};
