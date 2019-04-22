<template>
  <div class="register-form">
    <h2><img src=""> Register</h2>
    <div>
      <form class="form-container" id="form-register" v-on:submit.prevent="userRegister">
        <div class="row mt-2">
          <div class="col">
            <label for="username">Username</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text">@</div>
              </div>
              <input v-model="username" type="text" class="form-control" id="username-register" placeholder="Enter username">
            </div>
            <div class="error-member-page" v-if="errorUsername != ''">
              <p class="error-register">{{ errorUsername }}</p>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password-register" class="form-control" placeholder="Enter password">
            <small id="passwordHelpInline" class="text-muted">
            Must be 8-20 characters long.
            </small>
            <div class="error-member-page" v-if="errorPassword != ''">
              <p class="error-register">{{ errorPassword }}</p>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="invalidCheck2" required>
                <label class="form-check-label" for="invalidCheck2">
                  Agree to terms and conditions
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <input type="submit" class="btn btn-primary" value="Register" name="submit-reg" id="submit-register">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: "RegisterForm",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    errorUsername(state) {
      return this.$store.getters.errorUsername
    },
    errorPassword(state) {
      return this.$store.getters.errorPassword
    }
  },
  methods: {
    userRegister() {
      console.log('masuk')
      this.$store.dispatch('userRegistration', {
        username: this.username,
        password: this.password
      })
      this.username = ''
      this.password = ''
    },
  }
};
</script>

<style scoped>
.button-submit {
  background-color: #fc7753;
  border: none;
  margin-top: 2%;
}

.register {
  margin-top: 5%;
}

.register-error p {
  font-size: 14px;
  color: red;
  font-weight: 400%;
}
</style>
