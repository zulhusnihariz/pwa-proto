<template>
  <q-page class="q-pa-md">
    <q-card class="constraint text-center">
      <h6 class="q-pt-md">Register</h6>
      <q-form @submit.prevent="registerUser">
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
            placeholder="Password "
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
          <q-btn type="submit" class="q-ma-md" rounded>Sign Up</q-btn>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
import firebase from "firebase";
import { uid } from "quasar";

export default {
  name: "PageLogin",
  data() {
    return {
      users: { uid: uid(), email: "", password: "" },
      isPwd: true
    };
  },
  methods: {
    async registerUser() {
      try {
        const userData = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.users.email,
            this.users.password
          );

        this.$q.notify({
          message: "Registration successful!"
        });

        this.$router.push({ name: "Login" });

        console.log(userData);
      } catch (error) {
        console.log(`this is the error message: ${error.message}`);
        this.$q.notify({
          message: `${error.message}`
        });
      }
    }
  }
};
</script>
