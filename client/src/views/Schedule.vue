<template>
  <div>
    <section class="section">
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Book an appointment
            </h1>
            <h2 class="subtitle">
              We're flexible.
            </h2>
          </div>
        </div>
      </section>
      <div class="container">
        <!-- BEGIN CALENDAR COMPONENT -->
        <div class="box">
          <vue-cal
            style="height: 60vh;"
            :time-from="9 * 60"
            :time-to="23 * 60"
            :disable-views="['years', 'year', 'month']"
            :events="events"
            :on-event-click="onEventClick"
          />
        </div>
      </div>
    </section>
    <div v-if="active" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ selectedEvent.title }}
          </p>
        </header>
        <section class="modal-card-body">
          <p>
            When: {{ selectedEvent.start.split(" ")[1] }}-{{
              selectedEvent.end.split(" ")[1]
            }}
          </p>
          <p>
            Where: Our Downtown location
          </p>
          <small>
            {{ selectedEvent.content }}
          </small>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">I'll take it!</button>
          <button @click="closeModal" class="button">No thanks</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

function getFormattedDate(date) {
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
}

export default {
  name: "Schedule",
  components: { VueCal },
  data() {
    return {
      active: false,
      selectedEvent: {},
      // Get events from DB
      // Filter available events
      events: [
        {
          start: "2020-4-5 10:30",
          end: "2020-4-5 11:30",
          // You can also define event dates with Javascript Date objects:
          // start: new Date(2018, 11 - 1, 16, 10, 30),
          // end: new Date(2018, 11 - 1, 16, 11, 30),
          title: `Haircut on ${getFormattedDate(new Date())}`,
          content: "Appointment description",
          class: "appointment",
        },
      ],
    };
  },
  methods: {
    onEventClick(event, e) {
      this.selectedEvent = event;
      this.active = true;
      e.stopPropagation();
    },
    closeModal()  {
      this.active = false
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
