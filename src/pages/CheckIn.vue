<template>
  <q-page class="flex flex-center column q-pa-md">
    <div class="camera-frame q-pa-md">
      <qrcode-stream @decode="onDecode"></qrcode-stream>
      <!-- <video class="full-width" ref="video" autoplay></video> -->
    </div>
    <div class="q-pt-md">
      <q-btn @click="clickCamera" round color="black" icon="fas fa-camera" />
    </div>
  </q-page>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
import { QRcodeStream } from "vue-qrcode-reader";
require("md-gum-polyfill");

export default {
  name: "CheckIn",
  components: { QRcodeStream },
  methods: {
    async onDecode(result) {
      try {
        console.log(result);
        const response = await AuthenticationService.getAllUser({});

        console.log(response);
      } catch (error) {
        this.$q.notify(error);
      }
    },
    clickCamera() {
      console.log("camerabutton");
    }
  }

  // ,
  // mounted() {
  //   this.initCamera();
  // }
};
</script>

style
<style lang="sass" scoped>
.camera-frame
  border: 2px solid $grey-10
  max-width: 500px
</style>
