<template>
  <div>
    <div class="container">
      <div class="box">
        <vue-cal
          ref="vuecal"
          style="height: 60vh;"
          :time-from="9 * 60"
          :time-to="23 * 60"
          :disable-views="['years', 'year', 'month']"
          :events="events"
          :twelve-hour="true"
          editable-events
          :cell-click-hold="false"
          v-bind:snap-to-time="5"
          @event-change="onChange"
          @cell-dblclick="
            $refs.vuecal.createEvent($event, 120, {
              title: `${username.split(' ')[0]}'s haircut`,
              class: 'appointment',
            })
          "
        />
      </div>
      <div class="has-text-right">
        <button class="button is-primary is-loading" v-if="success">
          Finish scheduling my appointment
        </button>
        <button class="button is-primary" @click="scheduleHaircut" v-else>
          Finish scheduling my appointment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueCal from "vue-cal";
import "vue-cal/dist/drag-and-drop.js";
import "vue-cal/dist/vuecal.css";
import AppointmentService from "../services/AppointmentService"
// function getFormattedDate(date) {
//   const year = date.getFullYear();

//   let month = (1 + date.getMonth()).toString();
//   month = month.length > 1 ? month : "0" + month;

//   let day = date.getDate().toString();
//   day = day.length > 1 ? day : "0" + day;

//   return month + "/" + day + "/" + year;
// }

export default {
  name: "TheCalendar",
  components: { VueCal },
  data() {
    return {
      active: false,
      selectedEvent: {},
      events: [],
      username: "Natalie",
      success: false,
    };
  },
  computed: {
    ...mapGetters(["user/userInfo"]),
  },
  created() {
    this.username = this["user/userInfo"].name;
  },
  methods: {
    onChange({ event }) {
      this.events = [event];
    },
    closeModal() {
      this.active = false;
    },
    async scheduleHaircut() {
      if (!this.events.length)
        return console.log("Please choose an available time.");
      const { start, end, title } = this.events[0];
      const haircut = {
        start,
        end,
        title,
      };
      AppointmentService.create(haircut);
      this.success = true;
      setTimeout(() => {
        this.$router.push("dashboard");
      }, 2000);
    },
  },
};
</script>

<style>
.vuecal__event.appointment {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
  font-size: small;
}
</style>
