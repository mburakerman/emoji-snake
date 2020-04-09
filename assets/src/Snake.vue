<template>
  <section class="game" @keydown.esc="isModalVisible = false">
    <div class="game__header">
      <p class="game__header-score" title="Score">
        🧪 Score:
        <span id="score">
          {{snakeLength - 1}}
          <small id="scoreAnimation" :class="{active: scoreAnimation}">+1</small>
        </span>
      </p>
    </div>
    <div class="game__area">
      <div class="game__area-overlay" :class="{active: isModalVisible}">
        <button class="game__area-overlay-close" @click="isModalVisible = false">
          <x-icon></x-icon>
        </button>
        <div class="game__area-overlay-content" v-html="this.modalTemplate"></div>
        <div v-if="!wantRestart">
          <button v-if="!isGameOver" @click="isModalVisible = false">OK</button>
          <button v-if="isGameOver" @click="gameOver">Try Again</button>
        </div>
        <button v-if="wantRestart" @click="gameOver">OK</button>
      </div>
      <ul>
        <li v-for="(item, colIndex) in gameLengthArray" :key="colIndex">
          <div
            v-for="(item, rowIndex) in gameLengthArray"
            :class="{snake: bindSnake(colIndex, rowIndex), food: bindFood(colIndex, rowIndex)}"
            :key="rowIndex"
          ></div>
        </li>
      </ul>
    </div>
    <div class="game__footer">
      <button class="button--level" title="Levels" style="visibility:hidden;">Easy</button>
      <button class="button--restart" @click="toggleRestartModal" title="Restart">
        <refresh-cw-icon></refresh-cw-icon>
      </button>
      <button class="button--info" @click="toggleInfoModal" title="More info">
        <info-icon></info-icon>
      </button>
    </div>
  </section>
</template>

<script>
import { RefreshCwIcon, InfoIcon, XIcon } from "vue-feather-icons";

export default {
  name: "Snake",
  components: {
    RefreshCwIcon,
    InfoIcon,
    XIcon
  },
  data() {
    return {
      screen: {
        width: document.body.offsetWidth,
        height: document.body.offsetHeight
      },
      snake: [],
      snakeLength: 1,
      snakeDirection: "right",
      food: [{ x: 5, y: 2 }],
      gameSpeed: 100,
      gameLength: 20,
      gameAnimationTimer: null,
      scoreAnimation: false,
      modalTemplate: "",
      isModalVisible: false,
      isGameOver: false,
      wantRestart: false
    };
  },

  computed: {
    gameLengthArray() {
      var arr = [];
      for (var i = 0; i < this.gameLength; i++) {
        arr.push(i);
      }
      return arr;
    }
  },

  created() {
    this.screen = {
      width: document.body.offsetWidth,
      height: document.body.offsetHeight
    };
    this.handleGameSize();
  },

  mounted() {
    window.addEventListener("keyup", this.bindSnakeDirections);
    // swipe actions
    const swipeGestures = new Hammer(document.querySelector(".game"));
    swipeGestures.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

    swipeGestures.on("swipeleft", e => {
      if (this.snakeDirection == "right") return;
      this.snakeDirection = "left";
    });
    swipeGestures.on("swiperight", e => {
      if (this.snakeDirection == "left") return;
      this.snakeDirection = "right";
    });
    swipeGestures.on("swipeup", e => {
      if (this.snakeDirection == "down") return;
      this.snakeDirection = "up";
    });
    swipeGestures.on("swipedown", e => {
      if (this.snakeDirection == "up") return;
      this.snakeDirection = "down";
    });
  },

  watch: {
    snakeLength: function(newLen, oldLen) {
      if (newLen > oldLen) {
        this.scoreAnimation = true;
        setTimeout(() => {
          this.scoreAnimation = false;
        }, 400);
      }
    }
  },

  methods: {
    bindSnake(x, y) {
      for (let i = 0; i < this.snake.length; i++) {
        if (this.snake[i].x === x && this.snake[i].y === y) {
          return true;
        }
      }
    },
    bindFood(x, y) {
      for (var i in this.food) {
        if (this.food[i].x === x && this.food[i].y === y) {
          return true;
        }
      }
    },

    animateSnake() {
      var snakeHead = this.snake[this.snake.length - 1];

      this.gameAnimationTimer = setInterval(() => {
        // right
        if (this.snakeDirection === "right") {
          snakeHead.x += 1;
        }
        // left
        else if (this.snakeDirection === "left") {
          snakeHead.x -= 1;
        }
        // up
        else if (this.snakeDirection === "up") {
          snakeHead.y -= 1;
        }
        // down
        else if (this.snakeDirection === "down") {
          snakeHead.y += 1;
        }

        // game area check
        if (snakeHead.x === this.gameLength) {
          snakeHead.x = 0;
        }
        if (snakeHead.x === -1) {
          snakeHead.x = this.gameLength - 1;
        }
        if (snakeHead.y === -1) {
          snakeHead.y = this.gameLength - 1;
        }
        if (snakeHead.y === this.gameLength) {
          snakeHead.y = 0;
        }

        this.preventSnakeToBiteItself(snakeHead);

        // length of snake
        this.snake.push({ x: snakeHead.x, y: snakeHead.y });
        if (this.snake.length > this.snakeLength) {
          this.snake.shift();
        }

        this.updatePoint();
      }, this.gameSpeed);
    },

    preventSnakeToBiteItself(head) {
      if (this.snakeLength < 2) {
        return;
      }
      for (let i = 0; i < this.snake.length; i++) {
        if (this.snake[i].x == head.x && this.snake[i].y == head.y) {
          this.toggleGameOverModal();
        }
      }
    },

    updatePoint() {
      var snakeHead = this.snake[this.snake.length - 1];

      if (this.food[0].x === snakeHead.x && this.food[0].y === snakeHead.y) {
        this.snakeLength++;
        this.food = [];
        this.food.push(this.getRandomDirection());
      }
    },

    bindSnakeDirections(e) {
      let directions = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
      };
      // direction control check
      if (directions[e.keyCode] !== undefined) {
        if (
          (this.snakeDirection === "right" &&
            directions[e.keyCode] === "left") ||
          (this.snakeDirection === "left" &&
            directions[e.keyCode] === "right") ||
          (this.snakeDirection === "down" && directions[e.keyCode] === "up") ||
          (this.snakeDirection === "up" && directions[e.keyCode] === "down")
        ) {
          return false;
        }

        this.snakeDirection = directions[e.keyCode];
      }
    },
    getRandomDirection() {
      var maxPosition = this.gameLength;
      return {
        x: Math.floor(Math.random() * maxPosition),
        y: Math.floor(Math.random() * maxPosition)
      };
    },

    gameOver() {
      this.isGameOver = false;
      this.isModalVisible = !this.isModalVisible;
      this.wantRestart = false;
      this.init();
    },

    init() {
      clearInterval(this.gameAnimationTimer);
      this.snake = [];
      this.snakeLength = 1;
      this.snake.push(this.getRandomDirection());
      this.scoreAnimation = false;

      this.bindSnake();
      this.animateSnake();
    },

    handleGameSize() {
      window.addEventListener("resize", e => {
        if (e.target.innerWidth < 500) {
          this.gameLength = 17;
          this.init();
        } else {
          this.gameLength = 20;
          this.init();
        }
      });
      if (this.screen.width < 500) {
        this.gameLength = 17;
        this.init();
      } else {
        this.gameLength = 20;
        this.init();
      }
    },
    toggleInfoModal() {
      this.modalTemplate = `<p>💡<br> Use your arrow buttons or swipe left, right, top or bottom to nagivate.</p>`;
      this.isModalVisible = !this.isModalVisible;
    },
    toggleGameOverModal() {
      this.isGameOver = true;
      clearInterval(this.gameAnimationTimer);
      this.modalTemplate = `<p>😷<br />Game Over!<br />Your score is ${this
        .snakeLength - 1}.</p>`;
      this.isModalVisible = !this.isModalVisible;
    },
    toggleRestartModal() {
      this.modalTemplate = `<p>🧼<br> Restart?</p>`;
      this.isModalVisible = !this.isModalVisible;
      this.wantRestart = true;
    }
  }
};
</script>

 
<style lang="stylus" scoped>
.game {
  margin: 0 auto;
  width: 400px;
  max-width: 100%;
}

@media screen and (max-width: 500px) {
  .game {
    width: 340px;
  }
}

// game header
.game__header {
  .game__header-score {
    background-color: #43465a;
    padding: 5px;
    width: 130px;
    border-radius: 4px;
    text-align: center;
    margin-left: auto;
  }
}

// game area
.game__area {
  position: relative;
  margin: 10px 0;
  ovefflow: hidden;

  .game__area-overlay {
    position: absolute;
    background-color: rgba(32, 33, 44, 0.9);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding: 15px;
    text-align: center;
    visibility: hidden;
    opacity: 0;
    transition: all 0.1s linear;

    &.active {
      visibility: visible;
      opacity: 1;
    }

    .game__area-overlay-close {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 3px;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.75;
    }

    .game__area-overlay-content {
      margin-bottom: 5px;
    }
  }

  ul {
    display: flex;

    li {
      list-style: none;
      min-width: 20px;
      min-height: 20px;
      border-right: 0;

      > div {
        background-color: #2d2f3d;
        width: 20px;
        height: 20px;

        &.snake {
          &:after {
            content: '🧽';
          }
        }

        &.food {
          animation-name: scale;
          animation-duration: 0.4s;
          animation-timing-function: ease-in-out;

          &:after {
            content: '🦠';
          }
        }
      }
    }
  }
}

@keyframes scale {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.4);
  }
}

// game footer
.game__footer {
  display: flex;
  width: 100%;

  button {
    svg {
      colo: #fff;
    }

    &.button--level {
      margin-right: auto;
    }

    &.button--info, &.button--restart {
      margin-left: 10px;
    }
  }
}

// score
#score {
  position: relative;

  #scoreAnimation {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    color: #a7e9af;

    &.active {
      display: inline-block;
      transition: all 0.4s linear;
      transform: translatey(-30px);
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
 