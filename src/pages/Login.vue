<template>
  <q-page class="q-pa-md">
    <q-card class="constraint text-center">
      <h6 class="q-pt-md">Login</h6>
      <div>
        <q-input
          class="q-ma-md"
          v-model="login.email"
          filled
          dense
          placeholder="Email"
        />
        <q-input
          class="q-ma-md"
          v-model="login.password"
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
        <q-btn class="q-ma-md" rounded>Sign In</q-btn>
        <q-btn @click="$router.push('/register')" class="q-ma-md" rounded
          >Register</q-btn
        >
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "PageLogin",
  data() {
    return {
      login: {
        email: "",
        password: ""
      },

      isPwd: true
    };
  }
};
</script>
