import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { DifficultyButton } from "../../components/DifficultyButton";

describe("DifficultyButton", () => {
  it("should call changeDifficulty on click", () => {
    const changeDifficultyMock = vi.fn();

    render(
      <DifficultyButton
        changeDifficulty={changeDifficultyMock}
        disabled={false}
      >
        Difficulty
      </DifficultyButton>
    );

    const button = screen.getByRole("button", { name: "Difficulty" });
    fireEvent.click(button);

    expect(changeDifficultyMock).toHaveBeenCalledTimes(1);
  });
});
