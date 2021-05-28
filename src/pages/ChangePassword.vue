<template>
  <q-page class="q-pa-md">
    <q-card class="constraint text-center">
      <h6 class="q-pt-md">
        Choose a New Password
      </h6>
      <q-form @submit.prevent="submitChanges">
        <div>
          <q-input
            v-model="change.oldpassword"
            class="q-ma-md"
            type="password"
            label-slot
            dense
          >
            <template v-slot:label>
              Old Password
              <strong class="labelcolor">*</strong>
            </template>
          </q-input>
          <q-input
            v-model="change.newpassword"
            class="q-ma-md"
            type="password"
            label-slot
            dense
          >
            <template v-slot:label>
              New Password
              <strong class="labelcolor">*</strong>
            </template>
          </q-input>
          <q-input
            v-model="change.confirmnewpassword"
            class="q-ma-md"
            type="password"
            label-slot
            dense
          >
            <template v-slot:label>
              Confirm New Password
              <strong class="labelcolor">*</strong>
            </template>
          </q-input>
        </div>
        <div class="flex justify-center">
          <q-btn type="submit" class="q-ma-md q-mt-none" rounded
            >Change my Password</q-btn
          >
        </div></q-form
      >
    </q-card>
  </q-page>
</template>

<script>
import firebase from "firebase";
export default {
  name: "PageChangePassword",
  data() {
    return {
      change: {
        oldpassword: "",
        newpassword: "",
        confirmnewpassword: ""
      }
    };
  },
  methods: {
    async submitChanges() {
      console.log({
        newPassword: this.change.newpassword,
        confirmPassword: this.change.confirmnewpassword
      });
      if (this.change.newpassword !== this.change.confirmnewpassword) {
        this.$q.notify({
          message: `New password does not match with Confirm new password`
        });
        return;
      }

      try {
        const user = await firebase.auth().currentUser;
        let newPassword = this.change.newpassword;

        const updated = await user.updatePassword(newPassword);

        console.log(updated);

        this.$q.notify({
          message: `Password change was successful!`
        });
      } catch (error) {
        console.error();
        this.$q.notify({
          message: `${error.message}`
        });
      }
    }
  }
};
</script>

<style scoped>
.labelcolor {
  color: red;
}
.behave-pass {
  -webkit-text-security: disc;
}
</style>
