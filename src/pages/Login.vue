<template>
  <q-page class="q-pa-md">
    <q-card class="constraint text-center">
      <h6 class="q-pt-md">Login</h6>

      <q-form @submit.prevent="loginUser">
        <div>
          <q-input
            class="q-ma-md"
            v-model="users.email"
            filled
            dense
            placeholder="Email"
          />
          <q-input
            class="q-ma-md"
            v-model="users.password"
            filled
            :type="isPwd ? 'password' : 'text'"
            dense
            placeholder="Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <div class="flex flex-center columns">
          <q-btn type="submit" class="q-ma-md" rounded>Sign In</q-btn>
          <q-btn @click="$router.push('/register')" class="q-ma-md" rounded
            >Register</q-btn
          >
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import firebase from "firebase";
import AuthenticationService from "../services/AuthenticationService";

export default {
  name: "PageLogin",
  data() {
    return {
      users: {
        email: "",
        password: ""
      },

      isPwd: true
    };
  },
  methods: {
    /* -------------------------------------------------------------------------- */
    /*                          Firebase Client Side Auth                         */
    /* -------------------------------------------------------------------------- */
    async loginUser() {
      console.log("login button");
      try {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.users.email, this.users.password);

        this.$store.dispatch("setUser");

        this.$router.push({ name: "Profile" });

        console.log("sucessfully logged in");
      } catch (error) {
        console.log(`this is the error message: ${error.message}`);
        this.$q.notify({
          message: `${error.message}`
        });
      }
    }

    /* -------------------------------------------------------------------------- */
    /*                          Firebase Server Side Auth                         */
    /* -------------------------------------------------------------------------- */
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
};
</script>
