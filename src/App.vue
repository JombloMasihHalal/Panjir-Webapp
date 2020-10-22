<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
/* width */
::-webkit-scrollbar {
  width: 0.5vw;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(grey, .15);
  border-radius: 0.5vw;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(grey, .3);
  border-radius: 0.5vw;
  cursor: pointer;
  // background: url("../../img/CODMID_wester_preanniv_popup_scrollbar.png");
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  filter: grayscale(10);
}

</style>
