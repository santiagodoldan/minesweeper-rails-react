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
    return { id: 1, name: "Test", rows: 10, columns: 20, mines: [], flags: []} as Match
  }
}
