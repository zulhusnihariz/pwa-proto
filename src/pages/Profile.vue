<template>
  <q-page class="flex flex-center">
    <div class="flex columns">
      <div class="row">
        <h6 class="constraint" style="max-width: 300px">
          {{ user.providerData }}
        </h6>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PagePersonalDetails",
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
};
</script>
