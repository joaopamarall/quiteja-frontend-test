<template>
  <div class="home">
    <v-main class="home__main">
      <img src="@/assets/logo.png" />
      <h1>Teste pratico QuiteJa</h1>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>
<style lang="scss">
.home {

  &__main {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
