<template>
  <q-page class="q-pa-md">
    <q-card class="constraint text-center">
      <h6 class="q-pt-md">
        Choose a New Password
      </h6>
      <div>
        <q-input v-model="change.oldpassword" class="q-ma-md" label-slot dense>
          <template v-slot:label>
            Old Password
            <strong class="labelcolor">*</strong>
          </template>
        </q-input>
        <q-input v-model="change.newpassword" class="q-ma-md" label-slot dense>
          <template v-slot:label>
            New Password
            <strong class="labelcolor">*</strong>
          </template>
        </q-input>
        <q-input
          v-model="change.confirmnewpassword"
          class="q-ma-md"
          label-slot
          dense
        >
          <template v-slot:label>
            Confirm New Password
            <strong class="labelcolor">*</strong>
          </template>
        </q-input>
      </div>
      <div class="flex justify-center">
        <q-btn class="q-ma-md q-mt-none" rounded>Change my Password</q-btn>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "PageChangePassword",
  data() {
    return {
      change: {
        oldpassword: "",
        newpassword: "",
        confirmnewpassword: ""
      }
    };
  }
};
</script>

<style scoped>
.labelcolor {
  color: red;
}
</style>
