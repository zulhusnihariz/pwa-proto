<template>
  <q-page class="q-pa-md">
    <q-card class="constraint text-center">
      <h6 class="q-pt-md">Register</h6>
      <div>
        <q-input
          class="q-ma-md"
          v-model="register.email"
          filled
          dense
          placeholder="Email"
        />
        <q-input
          class="q-ma-md"
          v-model="register.password"
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
        <q-btn class="q-ma-md" rounded>Sign Up</q-btn>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { uid } from "quasar";

export default {
  name: "PageLogin",
  data() {
    return {
      register: { id: uid(), email: "", password: "" },
      isPwd: true
    };
  }
};
</script>
