<script setup lang="ts">
</script>

<template>
  <div id="app">
    <header>
      <img alt="Vue logo" src="./monitorias_facamp.jpg" width="180">
    </header>
    <main>
      <login-form v-if="!loggedIn && !showRegister" @login-success="loginSuccess" @go-to-register="showRegister = true" />
      <register-form v-if="!loggedIn && showRegister" @register-success="loginSuccess" @go-to-login="showRegister = false" />
      <div class="container" v-if="loggedIn">
        <task-list ref="listMonitorias" />
      </div>
    </main>
  </div>
</template>

<script>
import LoginForm from "./components/Login.vue";
import RegisterForm from "./components/SignUp.vue";
import TaskList from "./components/List.vue";

export default {
  components: {
    LoginForm,
    RegisterForm,
    TaskList,
  },
  data() {
    return {
      loggedIn: false,
      showRegister: false,
    };
  },
  methods: {
    loginSuccess(userId) {
    this.loggedIn = true;
    this.$nextTick(() => {
      console.log("next Tick" );
      this.$refs.listMonitorias.loadUserMonitorias(userId);
      this.$refs.listMonitorias.loadAllMonitorias();
    });
  },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  opacity: 1;
  height: 100vh;
  width: 100vw;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  padding: 1rem;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center; /* modificado de center para flex-start */
}

header {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100vw;
  background-color: #103c5c;
  padding: 20px 0;
  color: white;
  text-transform: uppercase;
}

img {
  margin-left: 2rem;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}

main {
  display: flex;
  flex-direction: column;
  align-items: certer; /* modificado de center para flex-start */
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
}

</style>


