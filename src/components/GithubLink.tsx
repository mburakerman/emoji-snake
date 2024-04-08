import React from "react";
import { styled } from "styled-components";

import { GithubIcon } from "./icons/GithubIcon";

const StyledGithubLink = styled.a`
  display: flex;
  justify-content: flex-end;
  color: #fff;
  margin-top: 10px;
  opacity: 0.75;
  transition: all 0.2s linear;

  &:hover {
    opacity: 1;
  }

  > svg {
    width: 15px;
    height: 15px;
  }
`;

export const GithubLink = () => (
  <StyledGithubLink
    href="https://github.com/mburakerman/emoji-snake"
    target="_blank"
    rel="noreferrer"
    title="Source Code"
  >
    <GithubIcon />
  </StyledGithubLink>
);
