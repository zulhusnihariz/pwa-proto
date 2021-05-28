<template>
  <div class="q-pt-md" style="max-width: 350px">
    <q-list>
      <q-item clickable class="flex justify-end small-screen-only">
        <q-item-section class="q-pa-none q-ma-none" avatar>
          <q-icon
            @click="$emit('onclick')"
            color="primary"
            name="close"
            class="flex self-end"
          />
        </q-item-section>
      </q-item>

      <q-item
        class="large-screen-only"
        v-ripple
        :to="{ name: 'Profile' }"
        clickable
      >
        <q-item-section avatar>
          <q-icon color="primary" name="person" />
        </q-item-section>
        <q-item-section class="text-weight-bold"
          >Personal Details</q-item-section
        >
      </q-item>
      <q-item :to="{ name: 'ChangePassword' }" clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="settings" />
        </q-item-section>
        <q-item-section class="text-weight-bold"
          >Change Password</q-item-section
        >
      </q-item>
      <q-item :to="{ name: 'Logout' }" @click="logoutUser" clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="logout" />
        </q-item-section>
        <q-item-section class="text-weight-bold">Logout</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "DrawerList",
  data() {
    return { user: this.$store.state.user };
  },
  methods: {
    async logoutUser() {
      this.$store.dispatch("resetUser");
      this.$router.push({ name: "Login" });
    }
  }
};
</script>
