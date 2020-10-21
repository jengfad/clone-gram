<template>
<div class="main container h-100">
  <div class="row h-100 justify-content-center align-items-center">
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-column align-items-center">
          <h1>
            <i class="fas fa-robot"></i>
            <span class="pl-2">Clonegram</span>
          </h1>
          <p class="description">Powered by Vue.js and Firebase</p>
        </div>
        <hr/>
        <div :class="{ 'signup-form': !showLoginForm }">
          <form v-if="showLoginForm" @submit.prevent>
            <div class="d-flex flex-column">
              <h4 class="align-self-center">Welcome Back!</h4>
              <div>
                <label for="email1">Email</label>
                <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
              </div>
              <div>
                <label for="password1">Password</label>
                <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
              </div>
              <button @click="login()" class="button align-self-end">Log In</button>
              <div class="d-flex pt-4 align-self-center">
                <div>
                  <a @click="togglePasswordReset()">Forgot Password</a>
                </div>
                <div class="px-2">|</div>
                <div>
                  <a @click="toggleForm()">Create an Account</a>
                </div>
              </div>
            </div>
          </form>
          <form v-else @submit.prevent>
            <div class="d-flex flex-column">
              <h4 class="align-self-center">Create an Account</h4>
              <br>
              <div>
                <label for="name">Name</label>
                <input v-model.trim="signupForm.name" type="text" placeholder="Jane Doe" id="name" />
              </div>
              <div>
                <label for="title">Bio</label>
                <input v-model.trim="signupForm.title" type="text" placeholder="What's your life passion?" id="title" />
              </div>
              <div>
                <label for="email2">Email</label>
                <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />
              </div>
              <div>
                <label for="password2">Password</label>
                <input v-model.trim="signupForm.password" type="password" placeholder="Mininum of 6 characters" id="password2" />
              </div>
              <div class="d-flex">
                <a @click="toggleForm()" class="flex-grow-1">
                  <i class="fas fa-arrow-left"></i>
                  <span class="pl-2">Back to Log In</span>
                </a>
                <button @click="signup()" class="button">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'

export default {
  components: {
    PasswordReset
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .main {
    color: teal;

    .card {
      min-width: 400px;
    }
      
    p.description {
      font-size: smaller;
    }
  }

</style>