import { Side } from "@/features/game/domain/Enums";

export class GameLog {
    private entries: Entry[];

    constructor() {
        this.entries = []
    }

    public addEntry(entry: Entry) {
        this.entries.push(entry)
    }

    public undo() {
        this.entries.pop()
    }

    public getEntries(): Entry[] {
        return this.entries
    } 

    public describe(): string {
        return this.entries.length > 0 ? 
        this.entries.map((entry) => entry.describe()).join(", ") : 
        "No entries recorded."
    }
}

/* eslint-disable import/no-unused-modules */
export class Entry {
    private playerId: number
    private side: Side
    private point: number | undefined

    constructor(
        playerId: number,
        side: Side,
        point: number | undefined
    ) {
        this.playerId = playerId
        this.side = side
        this.point = point
    }

    public getPlayerId(): number {
        return this.playerId
    }

    public getPoint(): number | undefined {
        return this.point
    }

    public getSide(): Side {
        return this.side;
    }

    describe(): string {
        return `Player ID: ${this.playerId}, Side: ${this.side}, Point: ${this.point ?? "None"}`;
    }
}
/* eslint-enable import/no-unused-modules */