<template lang="pug">
  .signup-container
    form.form
      .header
        h1 Sign Up
        img.logo(src="../assets/logo.png")
      span.error(v-if="error")
        i.far.fa-exclamation-circle
        | {{ error }}
      .form-group
        label.label(for="email") Enter your email
        input.input(v-model="email" type="email" id="email" placeholder="email@domain.com")
      .form-group
        label.label(for="password") Create your password
        input.input(v-model="password" type="password" id="password" placeholder="password")
      .form-group
        label.label(for="password_confirmation") Confirm your password
        input.input(v-model="password_confirmation" type="password" id="password_confirmation" placeholder="confirm password")
      button.button(type="submit") Sign Up
      router-link(to="/") Log In
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created() {
    this.checkSignedIn()
  },
  updated() {
    this.checkSignedIn()
  },
  methods: {
    signUp() {
      this.$http.plain.post('/signup', { email: this.email, password: this.password, password_confirmation: this.password_confirmation })
        .then(response => this.signUpSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signUpSuccessful(response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/todos')
    },
    signupFailed(error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something is afoot'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn() {
      if (localStorage.signedIn) {
        this.$router.replace('/todos')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.signup-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  background-color: #13120010;
  height: 100vh;
  margin: 0;
  color: #0f0f0f;

  .header {
    display: flex;
    justify-content: space-between;

    .logo {
      height: 70px;
    }

    h1 {
      font-size: 28px;
    }

  }

  .error {
    color: #ff4444;
  }

  .fa-exclamation-circle {
    margin-right: 5px;
  }

  .form {
    width: 250px;
    height: 425px;
    margin-top: 50px;
    border-radius: 4px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0px 0px 5px 2px #13120050;

    .form-group {
      display: flex;
      flex-direction: column;
      margin: 10px 0;

      .input {
        padding: 7px;
        border-radius: 4px;
        border: 1px solid #ccc;
        margin-top: 2px;
        color: #42b983;
        font-size: 14px;
      }

      .input::placeholder {
        color: #bbb;
      }
    }

  }

  .button {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 16px;
    background-color: #42b983;
    color: #fff;
    cursor: pointer;
  }

  .button:hover {
    background-color: #2c3e50;
  }

  a {
    margin-top: 30px;
    text-decoration: none;
    color: #42b983;
    width: 60px;
  }

  a:hover {
    color: #2c3e50;
  }
}

@media (min-width: 600px) {
  .signup-container {
    .form {
      width: 50%;
      margin-top: 100px;
    }
  }
}

@media (min-width: 1000px) {
  .signup-container {
    .form {
      width: 500px;
      margin-top: 100px;
    }
  }
}
</style>

