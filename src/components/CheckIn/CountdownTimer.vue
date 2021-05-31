<template>
  <q-card>
    <div class="q-pa-md container text-center">
      <p>User: {{ user.providerData[0].uid }}</p>
      <p>Time left:</p>
      <div class="row">
        <div class="flex justify-center col">
          <div class=" row">{{ displayHours }}</div>
          <div class="row">Hours</div>
        </div>
        <div class="col">:</div>
        <div class="flex justify-center  col">
          <div class="row">{{ displayMinutes }}</div>
          <div class="row">Minutes</div>
        </div>
        <div class="col">:</div>
        <div class=" flex justify-center col">
          <div class="row">{{ displaySeconds }}</div>
          <div class="row">Seconds</div>
        </div>
      </div>

      <div class="flex justify-center q-mt-lg row">
        <q-btn @click="setSevenSeconds">10s</q-btn>
      </div>
    </div>
  </q-card>
</template>

<script>
import firebase from "firebase";
export default {
  name: "CountdownTimer",
  props: { starttime: Number },
  data() {
    return {
      displayDays: 0,
      displayHours: 0,
      displayMinutes: 0,
      displaySeconds: 0
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    _seconds: () => 1000,
    _minutes() {
      return this._seconds * 60;
    },
    _hours() {
      return this._minutes * 60;
    },
    _days() {
      return this._hours * 24;
    }
  },
  mounted() {
    this.showRemaining();
  },
  methods: {
    formatNum: num => (num < 10 ? "0" + num : num),

    showRemaining() {
      const timer = setInterval(() => {
        let endTime = Object(this.$store.state.endTime);
        const now = new Date();

        const end = new Date(endTime);
        const difference = end.getTime() - now.getTime();

        if (difference < 0) {
          clearInterval(timer);

          return alert("TIme ran out");
        }

        const days = Math.floor(difference / this._days);
        const hours = Math.floor((difference % this._days) / this._hours);
        const minutes = Math.floor((difference % this._hours) / this._minutes);
        const seconds = Math.floor(
          (difference % this._minutes) / this._seconds
        );

        this.displayDays = this.formatNum(days);
        this.displayHours = this.formatNum(hours);
        this.displayMinutes = this.formatNum(minutes);
        this.displaySeconds = this.formatNum(seconds);
      }, 1000);
    },

    setSevenSeconds() {
      let dt = new Date();
      let endTime = dt.setSeconds(dt.getSeconds() + 7);
      this.$store.dispatch("setEndTime", endTime);
    }
  }
};
</script>
