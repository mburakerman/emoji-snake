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
`;
