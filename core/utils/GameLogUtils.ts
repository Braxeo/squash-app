import { Entry, GameLog } from "@/core/models/GameLog";
import { Side } from "../../core/constants/Enums";
import { toggleSide } from "./SideUtils";

export const gameLogUtils = (gameLog: GameLog) => {
  const getPointsForPlayer = (playerId: number): number => {
    return gameLog
      .getEntries()
      .filter(
        (entry) =>
          entry.getPlayerId() === playerId && entry.getPoint() !== undefined
      ).length;
  };

  const getServingPlayer = (): number | undefined => {
    return gameLog
      .getEntries()
      .at(gameLog.getEntries().length - 1)
      ?.getPlayerId();
  };

  const getServingPlayersLastSide = (): Side | undefined => {
    return gameLog
      .getEntries()
      .at(gameLog.getEntries().length - 1)
      ?.getSide();
  };

  const undo = () => {
    if (
      gameLog.getEntries().length === 1 &&
      gameLog.getEntries().at(0)?.getPoint() === undefined
    ) {
      // We don't want to pop the only entry if its setting the player who is serving
      return;
    }

    gameLog.getEntries().pop();
  };

  const setServingPlayerAndSide = (playerId: number, side: Side) => {
    const newEntry = new Entry(playerId, toggleSide(side), undefined);
    const lastEntry = gameLog.getEntries().at(gameLog.getEntries().length - 1);

    if (
      lastEntry?.getPlayerId() === playerId &&
      lastEntry.getPoint() === undefined
    ) {
      gameLog.getEntries().pop();
    }

    gameLog.addEntry(newEntry);
  };

  return {
    getPointsForPlayer,
    getServingPlayer,
    getServingPlayersLastSide,
    setServingPlayerAndSide,
    undo,
  };
};
