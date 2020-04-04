<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img
          src="https://www.svgrepo.com/show/300753/barber-shop.svg"
          style="height: 30px;"
        />
        BarberZen
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="openMenu"
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
            <a class="button is-small is-inverted is-primary ripple is-hidden-mobile">
              <strong>Book Now</strong>
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TheNavBar",
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    openMenu() {
      this.isActive = !this.isActive;
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
