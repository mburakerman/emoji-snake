<template>
  <div class="game__header">
    <p
      class="game__header-score game__header-score--best"
      :class="{'has-loading': !isScoresFetched}"
      title="Best Score"
    >
      Best Score
      <br />
      <span id="bestScore" :data-tooltip="bestScore.user__name">{{this.bestScore.user__score}}</span>
    </p>
    <p class="game__header-score" title="Score">
      Score
      <br />
      <span id="score">{{score}}
        
        <span id="scoreAnimation" :class="{active: scoreAnimation}">+1</span>
      </span>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      bestScore : {
        type: Object,
        default : null
      },
      score: {
        type: Number,
        default: 0
      },
      scoreAnimation : {
        type: Boolean,
        default: false
      },
      isScoresFetched : {
        default : false
      }
    }
  }
</script>

<style lang="stylus">
  .game__header {
    display: flex;
    justify-content: space-between;

    .game__header-score {
      background-color: #43465a;
      padding: 5px 10px;
      border-radius: 4px;
      text-align: center;
      position: relative;

      > span {
        display: block;
      }

      &.game__header-score--best {
        &:after {
          content: '👑';
          position: absolute;
          top: -10px;
          right: -10px;
          transform: rotate(20deg);
          font-size: 18px;
        }
      }
    }

    @media screen and (max-width: 500px) {
      .game__header-score {
        font-size: 15px;
      }
    }
  }
</style>