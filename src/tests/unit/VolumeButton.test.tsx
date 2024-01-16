import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { VolumeButton } from "../../components/VolumeButton";
import { useGlobalStore } from "../../store";

describe("VolumeButton", async () => {
  it("should display volume-icon by default", () => {
    render(<VolumeButton />);
    const volumeIcon = screen.getByTestId("volume-icon");

    expect(volumeIcon).toBeInTheDocument();
  });

  it("should call setIsMuted & display muted-volume-icon", async () => {
    const setIsMutedSpy = vi.spyOn(useGlobalStore.getState(), "setIsMuted");

    render(<VolumeButton />);

    await act(async () => {
      await userEvent.click(screen.getByTestId("volume-button"));
    });
    const mutedVolumeIcon = screen.getByTestId("muted-volume-icon");

    expect(setIsMutedSpy).toHaveBeenCalled();
    expect(mutedVolumeIcon).toBeInTheDocument();
  });
});
