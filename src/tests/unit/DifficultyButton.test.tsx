import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { DifficultyButton } from "../../components/DifficultyButton";

describe("DifficultyButton", () => {
  it("should call changeDifficulty on click", () => {
    const changeDifficultyHandler = vi.fn();
    render(
      <DifficultyButton
        changeDifficulty={changeDifficultyHandler}
        disabled={false}
      >
        Difficulty
      </DifficultyButton>
    );

    const button = screen.getByRole("button", { name: "Difficulty" });
    fireEvent.click(button);

    expect(changeDifficultyHandler).toHaveBeenCalledTimes(1);
  });
});
