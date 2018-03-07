import { injectable } from "inversify"
import { Match } from "../models/match"

@injectable()
export class DataService {
  private matches: Match[]

  constructor() {
    this.matches = []
  }

  public async getMatches(): Promise<Match[]> {
    return (this.matches = [{ id: 1, name: "Test", rows: 10, columns: 10, mines: [], flags: []} as Match])
  }

  public async getMatch(id: number): Promise<Match> {
    const mines: string[] = []

    // random mines to test
    while (mines.length < 80) {
      const row = Math.round(Math.random() * 20)
      const col = Math.round(Math.random() * 20)
      const pos = `${row}:${col}`

      if (!mines.includes(pos)) {
        mines.push(pos)
      }
    }

    return { id: 1, name: "Test", rows: 20, columns: 20, mines, flags: []} as Match
  }
}
