<template>
  <div class="game__characters">
    <h2>Characters</h2>
    <ul>
      <li :class="{ active: characters.snake.sponge }" @click="toggleSnakeCharacter('sponge')">Sponge</li>
      <li :class="{ active: characters.snake.donaldJohnTrump }" @click="toggleSnakeCharacter('donaldJohnTrump')">Donald
        Trump</li>
      <li :class="{ active: characters.snake.fahrettinKoca }" @click="toggleSnakeCharacter('fahrettinKoca')">Fahrettin Koca
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Characters',
  props: {
    characters: {
      type: Object,
      default: null
    }
  },
  methods: {
    toggleSnakeCharacter(character) {
      this.characters.snake.sponge = false;
      this.characters.snake.donaldJohnTrump = false;
      this.characters.snake.fahrettinKoca = false;
      if (character == "donaldJohnTrump") {
        this.characters.snake.donaldJohnTrump = !this.characters.snake.donaldJohnTrump;
      } else if (character == "fahrettinKoca") {
        this.characters.snake.fahrettinKoca = !this.characters.snake.fahrettinKoca;
      } else {
        this.characters.snake.sponge = !this.characters.snake.sponge;
      }

      this.$emit('characterChanged', this.characters)
    },
  }
}
</script>

<style lang="stylus">
  .game__characters {
    margin: 20px auto 0px;

    h2 {
      margin-top: 0;
      margin-bottom: 4px;
      font-size: 18px;
    }

    ul {
        list-style: none;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        li {
          margin-right: 10px;
          margin-bottom: 5px;
          font-size: 15px;
          cursor: pointer;
          opacity: 0.5;

        &.active {
          opacity: 1;
        }
      }
    }
  }
</style>