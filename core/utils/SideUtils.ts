import { Side } from "../../core/constants/Enums";
export const toggleSide = (side: Side): Side => {
  return side === Side.LEFT ? Side.RIGHT : Side.LEFT;
};
