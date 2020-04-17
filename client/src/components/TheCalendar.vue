<template>
  <div>
    <div class="container">
      <div class="box">
        <div class="field">
          <div class="control is-expanded">
            <div class="select is-rounded is-primary is-fullwidth">
              <select v-model="hairdresser" @change="onSelect($event)">
                <option disabled value="">Select a barber...</option>
                <option>Barber A</option>
                <option>Barber B</option>
              </select>
            </div>
          </div>
        </div>
        <vue-cal
          ref="vuecal"
          style="height: 60vh;"
          :time-from="9 * 60"
          :time-to="23 * 60"
          :disable-views="['years', 'year', 'month']"
          :events="events"
          :twelve-hour="true"
          :cell-click-hold="false"
          v-bind:snap-to-time="5"
          :on-event-click="onEventClick"
        />
      </div>
      <!-- <div class="has-text-right">
        <button class="button is-primary is-loading" v-if="success">
          Finish scheduling my appointment
        </button>
        <button class="button is-primary" @click="scheduleHaircut" v-else>
          Finish scheduling my appointment
        </button>
      </div> -->
    </div>
    <div class="modal" v-bind:class="{ 'is-active': active }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Confirm your appointment</p>
          <button
            class="delete"
            aria-label="close"
            @click="modalClose"
          ></button>
        </header>
        <section class="modal-card-body">
          <p>Who: Barber X</p>
          <p>When: hh:mm</p>
          <p>Where: At our downtown location</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click="onConfirm">
            I'll take it!
          </button>
          <button class="button" @click="modalClose">Nevermind.</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueCal from "vue-cal";
import "vue-cal/dist/drag-and-drop.js";
import "vue-cal/dist/vuecal.css";
// import AppointmentService from "../services/AppointmentService";

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
      hairdresser: ""
    };
  },
  computed: {
    ...mapGetters(["user/userInfo"])
  },
  created() {
    this.username = this["user/userInfo"].name;
  },
  mounted() {
    this.createEvent();
  },
  methods: {
    createEvent() {
      // Check if date format is correct before creating event.
      this.$refs.vuecal.createEvent(
        // Formatted start date and time or JavaScript Date object.
        "4-12-2020 13:15",
        // Event duration in minutes (Integer).
        120,
        // Custom event props (optional).
        {
          title: "New Event",
          content: "yay! 🎉",
          class: "appointment"
        }
      );
    },
    modalClose() {
      this.active = false;
    },
    onConfirm() {
      this.modalClose();
    },
    onChange({ event }) {
      this.events.push(event);
    },
    onSelect(e) {
      console.log(e.target.value);
      return e;
    },
    onEventClick(event) {
      console.log(event);

      this.active = true;
    },
    closeModal() {
      this.active = false;
    },
    async scheduleHaircut() {
      // if (!this.events.length)
      //   return console.log("Please choose an available time.");
      // const { start, end, title } = this.events[0];
      // const haircut = {
      //   start,
      //   end,
      //   title,
      // };
      // AppointmentService.create(haircut);
      // this.success = true;
      // setTimeout(() => {
      //   this.$router.push("dashboard");
      // }, 2000);
    }
  }
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
