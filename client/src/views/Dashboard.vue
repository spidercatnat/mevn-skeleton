<template>
  <div class="content">
    <section class="section">
      <div class="container">
        <h2 class="subtitle">
          You don't currently have any upcoming appointments.
          <router-link to="schedule">Book one now!</router-link>
        </h2>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",

  computed: {
    ...mapGetters(["user/userInfo"]),
  },
  created() {
    console.log(this["user/userInfo"]);
  },
};
</script>

<style>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
