import { PointsBy, WinningRequirement } from "@/core/constants/Enums";
import { useState } from "react";

export const useMatchSettings = () => {
  const [settings, setSettings] = useState({
    player1: "",
    player2: "",
    gamesPerMatch: 5,
    pointsPerGame: 11,
    warmupMinutes: 5,
    pointsBy: PointsBy.PointPerRally,
    winningRequirement: WinningRequirement.WinByTwo,
  });

  const updateSettings = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    settings,
    updateSettings,
  };
};
