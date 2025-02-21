import { Side } from "@/core/constants/Enums";

export class GameLog {
  private entries: Entry[];

  /**
   * Amount of seconds this game has been active for
   */
  private duration: number;
  private startDate: number | undefined;
  private endDate: number | undefined;

  constructor() {
    this.entries = [];
    this.duration = 0;
  }

  public getDuration(): number {
    if (this.startDate === undefined) {
      console.log(`Getting duration of GameLog with no startDate set`);
    }

    const fromInMilliseconds = new Date(
      this.startDate ?? new Date().getTime()
    ).getTime();
    const untilInMilliseconds = new Date(
      this.endDate ?? new Date().getTime()
    ).getTime();

    return Math.round(
      Math.abs(fromInMilliseconds - untilInMilliseconds) / 1000
    );
  }

  public setStartDate(date: Date) {
    console.log(
      `Setting start date to ${date} as ${date.getTime()} milliseconds`
    );
    this.startDate = date.getTime();
  }

  public getStartDate(): Date | undefined {
    if (this.startDate) {
      return new Date(this.startDate);
    } else {
      return undefined;
    }
  }

  public setEndDate(date: Date) {
    this.endDate = date.getMilliseconds();
  }

  public getEndDate(): Date | undefined {
    if (this.endDate) {
      return new Date(this.endDate);
    } else {
      return undefined;
    }
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
