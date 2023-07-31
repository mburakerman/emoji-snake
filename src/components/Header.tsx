import React from "react";
import styled from "styled-components";

type Props = {
  bestScore: unknown;
  score: number;
  isScoreAnimationActive: boolean;
  areScoresFetched: boolean;
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledScore = styled.p`
  background-color: #43465a;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  position: relative;

  > span {
    display: block;
  }

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }

  &.is-best {
    &:after {
      content: "👑";
      position: absolute;
      top: -10px;
      right: -10px;
      transform: rotate(20deg);
      font-size: 18px;
    }
  }
`;

const StyledScoreInner = styled.span`
  position: relative;

  > span {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 5px;
    color: #a7e9af;
    font-size: 18px;
    font-weight: bold;

    &.is-animated {
      display: inline-block;
      transition: all 0.4s linear;
      transform: translatey(-40px);
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const Header = ({
  bestScore,
  score,
  isScoreAnimationActive,
  areScoresFetched,
}: Props) => {
  return (
    <StyledContainer>
      <StyledScore
        className={`${areScoresFetched ? "is-best" : "is-best has-loading"}`}
      >
        Best Score
        {/* @ts-ignore */}
        <span id="bestScore">{bestScore?.user__score}</span>
      </StyledScore>
      <StyledScore>
        Score
        <StyledScoreInner>
          {score}
          <span className={`${isScoreAnimationActive ? "is-animated" : ""}`}>
            +1
          </span>
        </StyledScoreInner>
      </StyledScore>
    </StyledContainer>
  );
};
