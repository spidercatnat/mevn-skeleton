<template>
  <div class="box">
    <div class="login">
      <div>
     <div class="level-left">
          <div class="level-item">
            <img
              src="https://www.svgrepo.com/show/300753/barber-shop.svg"
              style="height: 30px;"
            />
          </div>
          <section class="hero">
            <div class="hero-body">
              <div class="container">
                <h1 class="title">
                  Log in
                </h1>
                <h2 class="subtitle">
                  Manage appointments from your BarberZen dashboard.
                </h2>
              </div>
            </div>
          </section>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button is-light is-success is-fullwidth">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheLogin",
};
</script>

<style>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
