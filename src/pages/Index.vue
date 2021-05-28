<template>
  <q-page class="flex flex-center">
    <h6>Welcome, {{ user.email }}</h6>
  </q-page>
</template>

<script>
export default {
  name: "Home",
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
};
</script>
