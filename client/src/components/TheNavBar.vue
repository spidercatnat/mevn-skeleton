<template>
  <nav
    style="outline: none;"
    @blur="toggleMenu"
    tabindex="0"
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img
          src="https://www.svgrepo.com/show/300753/barber-shop.svg"
          style="height: 30px;"
        />
        BarberZen
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      v-bind:class="{ 'is-active': isActive }"
    >
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-small is-inverted is-primary ripple">
              <strong>Book Now</strong>
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link class="button is-primary" to="/register">
              <strong>Sign up</strong>
            </router-link>
            <router-link class="button is-light" to="/login" v-if="!loggedIn">
              Log in
            </router-link>
            <a class="button is-light" to="/login" @click="logout" v-else
              >Logout</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import UserService from "../services/UserService";
import { mapActions } from "vuex";
export default {
  name: "TheNavBar",
  data() {
    return {
      isActive: false,
      loggedIn: false,
    };
  },
  async updated() {
    this.loggedIn = await this["user/auth"]();
  },
  methods: {
    ...mapActions(["user/auth"]),
    toggleMenu() {
      setTimeout(() => {
        this.isActive = !this.isActive;
      }, 100);
    },
    async logout() {
      await UserService.logout();
      await this.$router.push("/");
      this.toggleMenu()
    },
  },
};
</script>

<style scoped>
@keyframes ripple {
  0% {
    box-shadow: 0 4px 10px rgba(65, 242, 255, 0.08),
      0 0 0 0 rgba(65, 242, 255, 0.08), 0 0 0 5px rgba(65, 242, 255, 0.08),
      0 0 0 10px rgba(65, 242, 255, 0.08);
  }
  100% {
    box-shadow: 0 4px 10px rgba(65, 242, 255, 0.08),
      0 0 0 5px rgba(65, 242, 255, 0.08), 0 0 0 10px rgba(65, 242, 255, 0.08),
      0 0 0 20px rgba(65, 242, 255, 0);
  }
}
.ripple {
  animation: ripple 0.6s linear infinite;
}
</style>
