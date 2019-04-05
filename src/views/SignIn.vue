<template lang="pug">
  .signin-container
    form
      h1 Log In
      span.error(v-if="error")
        i.far.fa-exclamation-circle
        | {{ error }}
      .form-group
        label.label(for="email") Enter your email
        input.input(v-model="email" type="email" id="email" placeholder="email@domain.com")
      .form-group
        label.label(for="password") Enter your password
        input.input(v-model="password" type="password" id="password" placeholder="password")
      button.button(type="submit") Log In
      router-link(to="/signup") Sign Up
</template>


<script>
export default {
  name: 'signin'
}
</script>

<style lang="scss" scoped>
form {
  width: 45%;
  height: 35%;
  margin-top: 150px;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 0px 5px 2px #13120050;
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

h1 {
  font-size: 28px;
}

.signin-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  background-color: #13120010;
  height: 100vh;
  margin: 0;
  color: #0f0f0f;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

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

.error {
  color: #ff4444;
}

.fa-exclamation-circle {
  margin-right: 5px;
}
</style>

