<template>
  <div>
    <div class="loading"></div>
    <h1>🦠 Coronavirusnake 🐍</h1>
    <Snake />
  </div>
</template>
<script>
import Snake from "./Snake.vue";

export default {
  name: "App",
  components: { Snake }
};
</script>

<style>
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
  letter-spacing: 1.05px;
  line-height: 1.5;
  outline: none;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 16px;
  background-color: #20212c;
  color: #fff;
  padding: 5px;
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
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: url("/assets/img/loading.svg") rgba(32, 33, 44, 0.9) center center
    no-repeat;
  background-size: 50px;
  z-index: 666666;
  display: none;
}
</style>