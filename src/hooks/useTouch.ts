import { useEffect, useState } from "react";

import { SnakeDirection } from "../Snake";

export type Direction = SnakeDirection;

export const useTouch = <TElement extends HTMLElement>(
  ref: React.MutableRefObject<TElement | null>,
  onTouch: (direction: Direction) => void
) => {
  const [startPoint, setStartPoint] = useState<Touch | null>(null);
  const [endPoint, setEndPoint] = useState<Touch | null>(null);
  const [direction, setDirection] = useState<Direction | null>(null);

  useEffect(() => {
    const handleTouchStart = function (e: TouchEvent) {
      setStartPoint(e.touches[0]);
      setEndPoint(null);
    };
    const handleTouchMove = function (e: TouchEvent) {
      setEndPoint(e.touches[0]);
    };

    const target = ref?.current;
    if (!target) return;
    target.addEventListener("touchstart", handleTouchStart);
    target.addEventListener("touchmove", handleTouchMove);

    return () => {
      target.removeEventListener("touchstart", handleTouchStart);
      target.removeEventListener("touchmove", handleTouchMove);
    };
  }, [ref]);

  useEffect(() => {
    if (startPoint && endPoint) {
      const diffX = startPoint.clientX - endPoint.clientX;
      const diffY = startPoint.clientY - endPoint.clientY;

      let dir: Direction;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          dir = "left";
        } else {
          dir = "right";
        }
      } else {
        if (diffY > 0) {
          dir = "up";
        } else {
          dir = "down";
        }
      }

      setDirection(dir);
    } else {
      setDirection(null);
    }
  }, [startPoint, endPoint]);

  useEffect(() => {
    if (direction) {
      onTouch(direction);
    }
  }, [direction, onTouch]);
};
