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
          @event-drop="onEventDrop"
          @cell-dblclick="
            $refs.vuecal.createEvent($event, 120, {
              title: `${username.split(' ')[0]}'s haircut`,
              class: 'appointment',
            })
          "
          :on-event-create="onEventCreate"
        />
      </div>
      <div class="has-text-right">
        <button class="button is-primary" @click="scheduleHaircut">Finish scheduling my appointment</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueCal from "vue-cal";
import "vue-cal/dist/drag-and-drop.js";
import "vue-cal/dist/vuecal.css";

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
    };
  },
  computed: {
    ...mapGetters(["user/userInfo"]),
  },
  created() {
    this.username = this["user/userInfo"].name;
  },
  methods: {
    onEventCreate(event) {
      if (this.events.length) return;
      console.log("created event", event);
      this.events = [event];
    },
    onEventDrop({ event }) {
      this.events = [event];
    },
    closeModal() {
      this.active = false;
    },
    scheduleHaircut() {
        if(!this.events.length) return console.log("Please choose an available time.")
        console.log("Scheduling", this.events[0])
    }
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
