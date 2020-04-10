<template>
  <div>
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
button:disabled {
  opacity: 0.5;
}
</style>