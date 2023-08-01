import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CrownIcon } from "./icons/CrownIcon";
import { Score, BestScore } from "../hooks/useBestScores";

type Props = {
  score: Score["user__score"];
  bestScore: BestScore;
};

const StyledCrownIcon = styled(CrownIcon)`
  position: absolute;
  top: -10px;
  right: -10px;
  transform: rotate(20deg);
  font-size: 18px;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const scoreStyle = `
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

const StyledBestScore = styled.p`
  ${scoreStyle}
`;

const StyledScore = styled.p`
  ${scoreStyle}
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

const StyledAnimatedScore = styled.span<{ active: boolean }>`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 5px;
  color: #a7e9af;
  font-size: 18px;
  font-weight: bold;

  ${({ active }) =>
    active &&
    css`
      display: inline-block;
      transition: all 0.4s linear;
      transform: translatey(-40px);
      visibility: visible !important;
      opacity: 1 !important;
    `}
`;

export const Header = ({ bestScore, score }: Props) => {
  const [isScoreAnimationActive, setIsScoreAnimation] = useState(false);

  useEffect(() => {
    const animateScore = async () => {
      setIsScoreAnimation(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsScoreAnimation(false);
    };
    animateScore();
  }, [score]);

  return (
    <StyledContainer>
      <StyledBestScore>
        Best Score
        <StyledCrownIcon />
        <span data-tooltip={bestScore?.user__name}>
          {bestScore?.user__score}
        </span>
      </StyledBestScore>
      <StyledScore>
        Score
        <StyledScoreInner>
          {score}
          <StyledAnimatedScore active={isScoreAnimationActive}>
            +1
          </StyledAnimatedScore>
        </StyledScoreInner>
      </StyledScore>
    </StyledContainer>
  );
};
