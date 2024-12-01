<template>
  <v-app id="app">
    <v-app-bar  v-if="!isPageUser && !isUserDetail"  class="d-flex justify-end" app>
      <v-btn>
        <router-link class="text-decoration-none" to="/user">
          Tabela de usuários
        </router-link>

      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>
export default {
computed: {
  isPageUser() {
    return this.$route.name === 'UserList';
  },
  isUserDetail() {
    return this.$route.name === 'UserDetail';
  }
}
}
</script>

<style lang="scss">
#app {
  background-color: rgb(213, 245, 229);
  text-align: center;
  color: #2c3e50;
}

.hidden {
  display: none;
}
</style>
