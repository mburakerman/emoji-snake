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
 
@keyframes scale {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.4);
  }
}
 
`;
