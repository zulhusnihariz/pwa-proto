<template>
  <div>
    <q-footer>
      <div class="col">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <Banner
            v-if="showBanner"
            @yes="installApp"
            @no="showBanner = false"
            @never="neverShowBanner"
          ></Banner>
        </transition>
        <q-toolbar class="flex flex-center small-screen-only">
          <q-tabs dense>
            <q-route-tab
              :to="{ name: 'Home' }"
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
      </div>
    </q-footer>
  </div>
</template>

<script>
import Banner from "../MainLayout/Banner";
let deferredPrompt;

export default {
  name: "Footer",
  components: { Banner },
  data() {
    return { showBanner: false };
  },
  methods: {
    beforeInstallPrompt() {
      window.addEventListener("beforeinstallprompt", e => {
        console.log(e);
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;

        // Update UI notify the user they can install the PWA

        setTimeout(() => {
          this.showBanner = true;
        }, 3000);

        console.log("end of line");
      });
    },
    async installApp() {
      // Hide the app provided install promotion
      this.showBanner = false;
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      // Optionally, send analytics event with outcome of user choice
      console.log(`User response to the install prompt: ${outcome}`);
      // We've used the prompt, and can't use it again, throw it away
      deferredPrompt = null;
    },
    neverShowBanner() {
      this.showBanner = false;
      this.$q.localStorage.set("neverShowBanner", true);
    }
  },
  mounted() {
    let neverShowBanner = this.$q.localStorage.getItem("neverShowBanner");

    if (!neverShowBanner) {
      this.beforeInstallPrompt();
    }
  }
};
</script>
