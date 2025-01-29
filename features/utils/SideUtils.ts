import { Side } from "../game/domain/Enums"
export const toggleSide = (side: Side): Side => {
    return side === Side.LEFT ? Side.RIGHT : Side.LEFT
}