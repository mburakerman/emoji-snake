import React from "react";
import { styled } from "styled-components";

import { GithubLink } from "./components/GithubLink";
import { Snake } from "./Snake";

const StyledContainer = styled.div`
  margin: 0 auto;
  width: 400px;
  max-width: 100%;

  @media screen and (max-width: 500px) {
    width: 340px;
  }
`;

export const App = () => {
  return (
    <StyledContainer>
      <Snake />
      <GithubLink />
    </StyledContainer>
  );
};
