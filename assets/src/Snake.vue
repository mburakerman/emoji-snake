<template>
  <section class="game" @keydown.esc="isModalVisible = false">
    <Header :score="snakeLength - 1" :bestScore="bestScore" :isScoreAnimationActive="scoreAnimation"
      :areScoresFetched="areScoresFetched" />
    <div class="game__area">
      <div class="game__area-overlay" :class="{ active: isModalVisible }">
        <button class="game__area-overlay-close" @click="isModalVisible = false" v-if="!isGameOver">
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
          <div v-for="(item, rowIndex) in gameLengthArray"
            :class="{ snake: bindSnake(colIndex, rowIndex), food: bindFood(colIndex, rowIndex), fahrettinKoca: characters.snake.fahrettinKoca, donaldJohnTrump: characters.snake.donaldJohnTrump }"
            :key="rowIndex"></div>
        </li>
      </ul>
    </div>
    <div class="game__footer">
      <button class="button--info" @click="toggleInfoModal">
        <info-icon></info-icon>
      </button>
      <button class="button--difficulty" @click="toggleDifficulty" :disabled="(snakeLength - 1) > 0">
        {{ this.gameDifficulties[this.gameDifficulty] }}
      </button>
      <VolumeButton :sound="sound" @volumeChanged="sound = $event" />
      <RestartButton @clicked="toggleRestartModal" :isDisabled="isModalVisible" />
    </div>
    <Characters :characters="characters" @characterChanged="characters = $event" />
  </section>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import {
  InfoIcon,
  XIcon,
} from "vue-feather-icons";
import db from "../firebaseInit.js";
import Characters from './components/Characters'
import VolumeButton from './components/VolumeButton'
import RestartButton from './components/RestartButton'
import { Header } from "./components/Header.tsx"
import { applyReactInVue } from 'vuereact-combined'

const MAX_SCORE = 100

export default {
  name: "Snake",
  components: {
    InfoIcon,
    XIcon,
    Characters,
    VolumeButton,
    RestartButton,
    Header: applyReactInVue(Header)
  },
  data() {
    return {
      snake: [],
      snakeLength: 1,
      snakeDirection: "right",
      food: [{ x: 5, y: 7 }],
      gameSpeed: 100,
      gameLength: 20,
      gameAnimationTimer: null,
      isGameOver: false,
      gameDifficulties: ["easy", "medium", "hard"],
      gameDifficulty: 1,
      scoreAnimation: false,
      modalTemplate: "",
      isModalVisible: false,
      wantRestart: false,
      sound: {
        food: require("./assets/sound/food.mp3"),
        direction: require("./assets/sound/direction.mp3"),
        isMuted: false
      },
      bestScores: [],
      areScoresFetched: false,
      bestScore: {},
      characters: {
        snake: {
          sponge: true,
          fahrettinKoca: false,
          donaldJohnTrump: false
        }
      },
    };
  },

  computed: {
    gameLengthArray() {
      return Array.from({ length: this.gameLength }, (_, index) => index);
    }
  },

  created() {
    this.fetchScores(this.gameDifficulties[this.gameDifficulty]);
    this.init();
  },

  mounted() {
    window.addEventListener("keyup", this.bindSnakeDirections);
    // swipe actions
    const swipeGestures = new Hammer(document.querySelector(".game"));
    swipeGestures.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

    swipeGestures.on("swipeleft", e => {
      if (this.snakeDirection == "right") return;
      this.snakeDirection = "left";
      this.playAudio(this.sound.direction, 0.05);
    });
    swipeGestures.on("swiperight", e => {
      if (this.snakeDirection == "left") return;
      this.snakeDirection = "right";
      this.playAudio(this.sound.direction, 0.05);
    });
    swipeGestures.on("swipeup", e => {
      if (this.snakeDirection == "down") return;
      this.snakeDirection = "up";
      this.playAudio(this.sound.direction, 0.05);
    });
    swipeGestures.on("swipedown", e => {
      if (this.snakeDirection == "up") return;
      this.snakeDirection = "down";
      this.playAudio(this.sound.direction, 0.05);
    });
  },

  watch: {
    snakeLength: function (newLen, oldLen) {
      if (newLen > oldLen) {
        this.scoreAnimation = true;
        setTimeout(() => {
          this.scoreAnimation = false;
        }, 400);
      }
    }
  },

  methods: {
    showBestScoreAlert() {
      var score = this.snakeLength - 1;
      this.$swal({
        allowOutsideClick: false,
        title: "🎉 Congrats! ",
        html: `<div class="swal2-html-container">You have made the best score. <br> Your score is ${that.snakeLength -
          1}. <br> You can save your name or leave it anonymous.</div><input id="bestScoreUserInput" class="swal2-input" value="anonymous" maxlength="40">`,
        preConfirm: () => {
          return new Promise((resolve) => {
            var input = document.getElementById("bestScoreUserInput");
            var scoreData = {
              user__id: uuidv4(),
              user__name: "anonymous",
              user__score: score
            };
            // set difficulty if not medium level
            if (this.gameDifficulty != 1) {
              scoreData.user__difficulty =
                this.gameDifficulties[that.gameDifficulty];
            }

            if (input.value.length > 1) {
              scoreData.user__name = input.value;
            } else {
              scoreData.user__name = "anonymous";
            }

            resolve(scoreData);
          });
        }
      })
        .then(data => {
          this.addNewHighScore(data.value);
        })
        .then(() => {
          this.init();
        });
    },
    fetchScores(difficulty) {
      var that = this;
      this.bestScores = [];
      this.areScoresFetched = false;
      this.bestScore = {};

      db.collection("scores")
        .get()
        .then(query => {
          query.forEach(item => {
            that.areScoresFetched = true;
            var scores = item.data();

            if (scores.user__difficulty !== undefined) {
              if (scores.user__difficulty === difficulty) {
                this.bestScores.push(scores);
              }
            } else {
              if (difficulty == "medium") {
                this.bestScores.push(scores);
              }
            }
          });

          this.bestScore = this.bestScores.reduce(function (prev, current) {
            return prev.user__score > current.user__score ? prev : current;
          });
        });
    },
    addNewHighScore(scoreData) {
      var that = this;

      db.collection("scores")
        .doc()
        .set(scoreData)
        .then(() => {
          this.fetchScores(that.gameDifficulties[that.gameDifficulty]);
        });
    },
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

    playAudio(audioSource, audioVolume) {
      if (this.sound.isMuted) return;
      var audio = new Audio(audioSource);
      audio.volume = audioVolume;
      audio.play();
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
          // show best score alert
          var score = this.snakeLength - 1;
          if (score > this.bestScore.user__score) {
            this.showBestScoreAlert();
          }
        }
      }
    },

    updatePoint() {
      var snakeHead = this.snake[this.snake.length - 1];

      if (this.food[0].x === snakeHead.x && this.food[0].y === snakeHead.y) {
        this.snakeLength++;
        this.food = [];
        this.food.push(this.getRandomDirection());
        this.playAudio(this.sound.food, 0.1);

        // max score is reached
        if (this.snakeLength - 1 == MAX_SCORE) {
          clearInterval(this.gameAnimationTimer);
          this.$swal({
            allowOutsideClick: false,
            title: "🎉 Hooray!",
            text: "You have reached the maximum score!"
          }).then(() => {
            this.showBestScoreAlert();
          });
        }
      }
    },

    bindSnakeDirections(e) {
      e.preventDefault();

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
        this.playAudio(this.sound.direction, 0.05);
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
    },
    toggleInfoModal() {
      this.modalTemplate = `<p>💡<br> Use your arrow buttons or swipe left, right, top or bottom to nagivate.</p>
        <br />
        <p>
          If your score is better than current best score, your score will be saved. You can save your name or leave it anonymous.
          <br />You can also see who has the best score by tapping on best score.
        </p>
        <p>Maximum score is 100. Have fun!</p>`;
      this.isModalVisible = !this.isModalVisible;
    },
    toggleDifficulty() {
      this.gameDifficulty++;
      if (this.gameDifficulty > 2) {
        this.gameDifficulty = 0;
      }

      var initSpeed = 100;
      if (this.gameDifficulty == 0) {
        this.gameSpeed = initSpeed + 20;
        this.init();
      } else if (this.gameDifficulty == 1) {
        this.gameSpeed = initSpeed;
        this.init();
      } else {
        this.gameSpeed = initSpeed - 20;
        this.init();
      }

      this.fetchScores(this.gameDifficulties[this.gameDifficulty]);
    }
  }
};
</script>

 
<style lang="stylus">
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
      padding: 1px;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.75;
    }

    .game__area-overlay-content {
      margin: 10px 0;
    }
  }

  ul {
    display: flex;

    li {
      list-style: none;
      min-width: 20px;
      min-height: 20px;
      border-right: 0;

      @media screen and (max-width: 500px) {
        min-width: 17px;
        min-height: 17px;
      }

      > div {
        background-color: #2d2f3d;
        width: 20px;
        height: 20px;

        @media screen and (max-width: 500px) {
          width: 17px;
          height: 17px;
        }

        &.snake {
          background-image: url('./assets/img/sponge.png');
          background-size: cover;

          &.donaldJohnTrump {
            background-image: url('./assets/img/donald-john-trump.png');
            background-size: 100% 100%;
          }

          &.fahrettinKoca {
            background-image: url('./assets/img/fahrettin-koca.png');
            background-size: 100% 100%;
          }
        }

        &.food {
          animation-name: scale;
          animation-duration: 0.4s;
          animation-timing-function: ease-in-out;
          background-image: url('./assets/img/virus.png');
          background-size: cover;
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
  justify-content: flex-end;

  button {
    svg {
      color: #fff;
      width: 22px;
      height: 22px;
    }

    &.button--info {
      margin-right: auto;
    }

    &.button--difficulty {
      margin-right: 10px;
      text-transform: capitalize;
    }

    &.button--volume {
      margin-right: 10px;
    }
  }
}
</style>
 