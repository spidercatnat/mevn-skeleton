<template>
  <div class="box">
    <div class="signup">
      <div>
        <h4 class="level title is-title-4">
          <span class="level-left">
            <img
              src="https://www.svgrepo.com/show/300753/barber-shop.svg"
              style="height: 30px;"
            />
          </span>
          <span class="level-left">
            Sign up
          </span>
          <span class="level-right">
            <img
              src="https://www.svgrepo.com/show/300753/barber-shop.svg"
              style="height: 30px;"
            />
          </span>
        </h4>
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
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSignup",
};
</script>

<style>
.signup {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
