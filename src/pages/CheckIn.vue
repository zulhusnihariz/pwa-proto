<template>
  <q-page class="flex flex-center column q-pa-md">
    <div v-if="!timeExisted" class="camera-frame q-pa-md">
      <qrcode-stream
        :camera="camera"
        @decode="onDecode"
        @init="onInit"
      ></qrcode-stream>
    </div>

    <p>{{ userTokenId }}</p>

    <CountdownTimer v-if="timeExisted"></CountdownTimer>
  </q-page>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
import CountdownTimer from "../components/CheckIn/CountdownTimer";
import firebase from "firebase";
import { QRcodeStream } from "vue-qrcode-reader";

export default {
  name: "CheckIn",
  components: { QRcodeStream, CountdownTimer },
  data() {
    return {
      camera: "auto",
      userTokenId: null,
      timeExisted: false
    };
  },
  mounted() {
    let endTime = JSON.parse(this.$q.localStorage.getItem("vuex")).endTime;

    // if time exists and haven't expired, use it
    if (endTime && Date.now() < endTime) {
      this.timeExisted = true;
    }
  },
  methods: {
    async onInit(promise) {
      try {
        await promise;
      } catch (e) {
        console.error(e);
      } finally {
        this.showScanConfirmation = this.camera === "off";
      }
    },
    async onDecode(result) {
      console.log(result);
      if (result == `https://qpwa.herokuapp.com/all-user`) {
        try {
          await this.getTokenId();
          this.pause();
          await this.timeout(500);
          this.unpause();
        } catch (error) {
          console.log(error);
          this.$q.notify(error);
        }
      } else {
        console.log("not hello");
      }
    },
    async getTokenId() {
      await firebase.auth().onAuthStateChanged(async user => {
        if (user != null) {
          // get current user token id
          const user = await firebase.auth().currentUser.getIdToken();
          // send token to server for verification
          const response = await AuthenticationService.verifyUser({
            uid: user
          });

          // show countdown timer if time exists
          this.timeExisted = true;

          this.$store.dispatch(
            "setStartTime",
            response.data.currentTime.startTime
          );
          this.$store.dispatch("setEndTime", response.data.currentTime.endTime);
        } else {
          this.name = "Unknown";
        }
      });
    },
    unpause() {
      this.camera = "auto";
    },

    pause() {
      this.camera = "off";
    },

    timeout(ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms);
      });
    }
  }
};
</script>

style
<style lang="sass" scoped>
.camera-frame
  border: 2px solid $grey-10
  max-width: 500px
</style>
