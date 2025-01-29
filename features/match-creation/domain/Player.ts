export class Player {
    private name: string
    private id: number

    constructor(
        playerName: string,
        playerId: number
    ) {
        this.name = playerName;
        this.id = playerId
    }

    public getPlayerName(): string {
        return this.name
    }

    public getPlayerId(): number {
        return this.id
    }

    describe(): string {
        return `Player Name: ${this.name}, Player ID: ${this.id}`;
    }
}