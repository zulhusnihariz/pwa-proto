<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold">
          <div class="flex items-center">
            <q-icon
              name="fas fa-kiwi-bird"
              size="md"
              color="white"
              class=" q-pa-md large-screen-only"
            />
            <span>Title</span>
          </div>
        </q-toolbar-title>

        <q-btn
          v-if="user"
          dense
          flat
          round
          icon="menu"
          @click="right = !right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-if="user" show-if-above v-model="right" side="right" bordered>
      <DrawerList @onclick="close"></DrawerList>
    </q-drawer>

    <Footer v-if="user"></Footer>

    <q-page-container color="background">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import DrawerList from "../components/MainLayout/DrawerList";
import Footer from "../components/MainLayout/Footer";
import Banner from "../components/MainLayout/Banner";

export default {
  name: "MainLayout",
  components: { DrawerList, Footer, Banner },
  data() {
    return {
      right: false
    };
  },
  methods: {
    close() {
      this.right = !this.right;
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
};
</script>
