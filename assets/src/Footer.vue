<template>
  <footer>
    <h1>🦠 Virusnake 🐍</h1>
    <p>Copyright ©</p>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="stylus" scoped>
footer {
  font-size: 13px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 400px;
  width: 100%;
  margin: 10em auto 0;
  padding: 0.75em 0;
  border-top: 1px solid #43465a;

  @media screen and (max-width: 500px) {
    max-width: 340px;
  }

  h1 {
    font-size: 20px !important;
    margin: 0 0;
  }
}
</style>