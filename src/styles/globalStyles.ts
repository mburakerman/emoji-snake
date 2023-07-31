import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
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

main {
  width: 400px;
  padding: 0px 5px;
  margin: 50px auto;

  > svg {
    cursor: pointer;
  }

  @media screen and (max-width: 500px) {
    width: 340px;
  }

  p {
    font-size: 15px;
    opacity: 0.9;
  }
}

[data-tooltip] {
  &:after {
    position: absolute;
    font-size: 13px;
    border-radius: 4px;
    content: attr(data-tooltip);
    padding: 5px 14px;
    background-color: rgba(32, 33, 44, 0.9);
    color: #fff;
    text-align: center;
    z-index: 1;
    pointer-events: none;
    display: block;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0px);
    width: 100%;
  }

  &:hover {
    &:after {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 5px);
    }
  }
}



/// app.vue styles
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
  overflow: hidden;

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
          background-image: url('./img/sponge.png');
          background-size: cover;

          &.donaldJohnTrump {
            background-image: url('./img/donald-john-trump.png');
            background-size: 100% 100%;
          }

          &.fahrettinKoca {
            background-image: url('./img/fahrettin-koca.png');
            background-size: 100% 100%;
          }
        }

        &.food {
          animation-name: scale;
          animation-duration: 0.4s;
          animation-timing-function: ease-in-out;
          background-image: url('./img/virus.png');
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
`;
