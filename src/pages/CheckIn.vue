<template>
  <q-page class="flex flex-center column q-pa-md">
    <div class="camera-frame q-pa-md">
      <video class="full-width" ref="video" autoplay></video>
    </div>
    <div class="q-pt-md">
      <q-btn round color="black" icon="fas fa-camera" />
    </div>
  </q-page>
</template>

<script>
require("md-gum-polyfill");
export default {
  name: "CheckIn",
  methods: {
    async initCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      this.$refs.video.srcObject = stream;
      console.log("initializing camera...");
    }
  },
  mounted() {
    this.initCamera();
  }
};
</script>

style
<style lang="sass" scoped>
.camera-frame
  border: 2px solid $grey-10
  max-width: 500px
</style>
