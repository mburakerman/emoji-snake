<template>
  <div>
    <Snake />
    <Footer />
  </div>
</template>
<script>
import Snake from "./Snake.vue";
import Footer from "./Footer.vue";

export default {
  name: "App",
  components: { Snake, Footer }
};
</script>

<style lang="stylus">
html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
  letter-spacing: 1.05px;
  line-height: 1.5;
  outline: none;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  background-color: #20212c;
  color: #fff;
  padding: 10px 0;
}

h1 {
  text-align: center;
  font-size: 30px !important;
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 25px !important;
  }
}

button {
  cursor: pointer;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #43465a;

  &:disabled {
    opacity: 0.5;
  }

  &.swal2-styled.swal2-confirm {
    background-color: #43465a;
  }
}

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
    background: url('./img/loading.svg') rgba(#15161d, 0.8) center center no-repeat;
    background-size: 20%;
    overflow: hidden;
    z-index: 9999999;
  }
}
</style>