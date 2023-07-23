<template>
  <div>
    <Snake />
    <GlobalStyles />
  </div>
</template>

<script>
import Snake from "./Snake.vue";
import { GlobalStyles } from "./styles/globalStyles.ts";
import { applyReactInVue } from 'vuereact-combined'

export default {
  name: "App",
  components: {
    Snake,
    GlobalStyles: applyReactInVue(GlobalStyles)
  }
};
</script>

<style lang="stylus">
.has-loading {
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: url('./assets/img/loading.svg') rgba(#15161d, 0.8) center center no-repeat;
    background-size: 20%;
    overflow: hidden;
    z-index: 9999999;
  }
}
</style>