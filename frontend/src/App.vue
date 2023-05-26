<script setup lang="ts">
</script>

<template>
  <div id="app">
    <header>
      <img alt="Vue logo" src="./monitorias_facamp.jpg" width="180">
      <button class="sair" @click="refreshPage">Sair</button>
    </header>
    <main>
      <login v-if="!loggedIn && !showRegister" @login-success="loginSuccess" @go-to-register="showRegister = true" />
      <sign-up v-if="!loggedIn && showRegister" @register-success="loginSuccess" @go-to-login="showRegister = false" />
      <div class="container" v-if="loggedIn">
        <list ref="listMonitorias" />
      </div>
    </main>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import List from "./components/List.vue";

export default {
  components: {
    Login,
    SignUp,
    List,
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
    refreshPage() {
      window.location.reload();
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

.sair {
  background-color: white;
  color: #103c5c;
  margin-right: 2rem;
  padding: 0.5rem;
  border-radius: 0.7rem;
  font-weight: bolder;
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
  align-items: center;
}

header {
  display: flex;
  justify-content: space-between;
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
  align-items: certer;
  width: 100%;
  padding: 1rem;
  margin-top: 0.5rem;
}

</style>


