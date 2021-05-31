<template>
  <q-page class="flex flex-center column">
    <q-card class="my-card q-mb-md q-mt-md" style="width: 250px">
      <q-card-section class="bg-deep-orange text-white text-center">
        <div class="text-subtitle2">Total Positive Cases</div>
        <div class="text-caption">as of {{ covData.date }}</div>
      </q-card-section>

      <q-separator />
      <q-card-section class="bg-white text-black text-center">
        <div class="text-h6 q-pb-sm">{{ covData.total_positive }}</div>
        <div class="bg-deep-orange text-white text-caption">
          +{{ covData.daily_positive }} Today
        </div>
      </q-card-section>
    </q-card>

    <q-card class="my-card q-mb-md" style="width: 250px">
      <q-card-section class="bg-negative text-white text-center">
        <div class="text-subtitle2">Total Death Cases</div>
        <div class="text-caption">as of {{ covData.date }}</div>
      </q-card-section>

      <q-separator />
      <q-card-section class="bg-white text-black text-center">
        <div class="text-h6 q-pb-sm">{{ covData.total_death }}</div>
        <div class="bg-negative text-white text-caption">
          +{{ covData.daily_death }} Today
        </div>
      </q-card-section>
    </q-card>

    <q-card class="my-card q-mb-md" style="width: 250px">
      <q-card-section class="bg-positive text-white text-center">
        <div class="text-subtitle2">Total Recovered</div>
        <div class="text-caption">as of {{ covData.date }}</div>
      </q-card-section>

      <q-separator />
      <q-card-section class="bg-white text-black text-center">
        <div class="text-h6 q-pb-sm">{{ covData.total_recovery }}</div>
        <div class="bg-positive text-white text-caption">
          +{{ covData.daily_recovery }} Today
        </div>
      </q-card-section>
    </q-card>

    <q-btn @click="retrieveData">Get Tweet</q-btn>
  </q-page>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
export default {
  name: "Home",
  data() {
    return {
      covJson: this.$store.state.covidData,
      covData: {
        date: null,
        daily_positive: null,
        daily_death: null,
        daily_recovery: null,
        total_positive: null,
        total_death: null,
        total_recovery: null
      }
    };
  },
  methods: {
    checkTime() {
      var today = new Date().getHours();
      return today == 17 ? true : false;
    },
    async retrieveData() {
      const response = await AuthenticationService.getDailyData({});
      this.$store.dispatch("setCovidData", response.data);
      console.log(response.data);
    },
    async displayData() {
      try {
        let covData = Object.entries(this.covJson);

        this.covData.date = covData[0][0];
        this.covData.daily_positive = covData[0][1].daily_positive;
        this.covData.daily_death = covData[0][1].daily_death;
        this.covData.daily_recovery = covData[0][1].daily_recovery;
        this.covData.total_positive = covData[0][1].total_positive;
        this.covData.total_death = covData[0][1].total_death;
        this.covData.total_recovery = covData[0][1].total_recovery;
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  mounted() {
    if (this.checkTime()) {
      this.retrieveData();
      this.displayData();
    } else {
      this.displayData();
    }
  }
};
</script>

<style scoped>
.my-width {
  width: 400px;
}
</style>
