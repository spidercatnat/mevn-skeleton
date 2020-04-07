<template>
  <div class="content">
    <section class="section">
      <div class="container">
        <h2 class="subtitle">
          You don't currently have any upcoming appointments.
          <router-link to="schedule">Book one now!</router-link>
        </h2>
        <TheAppointmentList />
      </div>
    </section>
  </div>
</template>

<script>
import TheAppointmentList from "../components/TheAppointmentList";
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  components: {
    TheAppointmentList
  },
  computed: {
    ...mapGetters(["user/userInfo"]),
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
