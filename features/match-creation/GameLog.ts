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

    public describe(): string {
        return this.entries.length > 0 ? 
        this.entries.map((entry) => entry.describe()).join(", ") : 
        "No entries recorded."
    }
}

export class Entry {
    private player: string
    constructor(
        player: string
    ) {
        this.player = player
    }

    public describe(): string {
        return this.player
    }
}