import { Side } from "@/core/constants/Enums";

export class GameLog {
  private entries: Entry[];

  /**
   * Amount of seconds this game has been active for
   */
  private duration: number;
  private startDate: Date | undefined;
  private endDate: Date | undefined;

  constructor() {
    this.entries = [];
    this.duration = 0;
  }

  public getDuration(): number {
    return this.duration;
  }

  public setDuration(newDuration: number) {
    this.duration = newDuration;
  }

  public setStartDate(date: Date) {
    this.startDate = date;
  }

  public getStartDate(): Date | undefined {
    return this.startDate;
  }

  public setEndDate(date: Date) {
    this.endDate = date;
  }

  public getEndDate(): Date | undefined {
    return this.endDate;
  }

  public addEntry(entry: Entry) {
    this.entries.push(entry);
  }

  public getEntries(): Entry[] {
    return this.entries;
  }

  public describe(): string {
    // Use the describe method on each Entry object.
    const entriesDescription = this.entries
      .map((entry) => entry.describe())
      .join("\n");

    return `GameLog (duration: ${this.duration}ms) with entries: [${entriesDescription}]`;
  }
}

/* eslint-disable import/no-unused-modules */
export class Entry {
  private playerId: number;
  private side: Side | undefined;
  private point: number | undefined;

  constructor(
    playerId: number,
    side: Side | undefined,
    point: number | undefined
  ) {
    this.playerId = playerId;
    this.side = side;
    this.point = point;
  }

  public getPlayerId(): number {
    return this.playerId;
  }

  public getPoint(): number | undefined {
    return this.point;
  }

  public getSide(): Side | undefined {
    return this.side;
  }

  describe(): string {
    return `Player ID: ${this.playerId}, Side: ${this.side ?? "None"}, Point: ${
      this.point ?? "None"
    }`;
  }
}
/* eslint-enable import/no-unused-modules */
