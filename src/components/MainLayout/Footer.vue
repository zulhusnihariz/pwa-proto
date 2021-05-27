<template>
  <q-footer class="small-screen-only">
    <q-toolbar class="flex flex-center">
      <q-tabs dense>
        <q-route-tab
          :to="{ name: 'Login' }"
          name="home"
          icon="home"
          label="Home"
        />

        <q-route-tab
          :to="{ name: 'CheckIn' }"
          name="qrcodescanner"
          icon="qr_code_scanner"
          label="Check-In"
        />
        <q-route-tab
          :to="{ name: 'Profile' }"
          name="profile"
          icon="person"
          label="Profile"
        />
      </q-tabs>
    </q-toolbar>
  </q-footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
