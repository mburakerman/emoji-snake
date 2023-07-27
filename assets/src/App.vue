<template>
  <div>
    <SnakeReact />
    <div style="margin: 50px 0;"></div>

    <GlobalStyles />
  </div>
</template>

<script>
import { GlobalStyles } from "./styles/globalStyles.ts";
import { applyReactInVue } from 'vuereact-combined'
import { Snake as SnakeReact } from "./Snake.tsx";

export default {
  name: "App",
  components: {

    GlobalStyles: applyReactInVue(GlobalStyles),
    SnakeReact: applyReactInVue(SnakeReact),
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

.game__footer {
  display: flex;
  justify-content: flex-end;
}
</style>
 