<template>
  <q-banner inline-actions class=" bg-secondary text-white" dense>
    Install Qpwa?
    <template v-slot:action>
      <q-btn @click="$emit('yes')" label="Yes" class="q-px-sm" dense flat />
      <q-btn @click="$emit('no')" label="Later" class="q-px-sm" dense flat />
      <q-btn @click="$emit('never')" label="Never" class="q-px-sm" dense flat />
    </template>
  </q-banner>
</template>

<script>
export default {
  name: "Banner"
};
</script>

<style scoped>
.positioning {
  position: absolute;
  z-index: 2;
}
</style>
