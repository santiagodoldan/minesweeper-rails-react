import { BaseError } from "./error"

export class MinePressedError extends BaseError { }

export class Grid {
  public visibleCells: string[]

  private mines: string[]
  public matrix: boolean[][]

  public constructor(rows: number, columns: number, mines: string[], visibleCells: string[]) {
    this.mines        = mines
    this.visibleCells = visibleCells

    // This is for an easy way to check if a given cell exists in the match's grid
    this.matrix = Array.apply(null, { length: rows }).map(() => Array.apply(null, { length: columns }).map(() => true))
  }

  public discoverCell(row: number, col: number, firstRun = true) {
    const pos = `${row}:${col}`

    if (this.mines.includes(pos)) {
      throw new MinePressedError()
    } else if (!this.visibleCells.includes(pos)) {
      if (firstRun || !this.checkIfNeighborsHaveMines(row, col)) {
        this.visibleCells.push(pos)
        this.discoverNeighborCells(row, col)
      }
    }
  }

  public discoverNeighborCells(row: number, col: number): void {
    const neighbors = [
      [row-1, col-1], [row-1, col], [row-1, col+1], // above row
      [row, col-1], [row, col+1],                   // same row
      [row+1, col-1], [row+1, col], [row+1, col+1], // below row
    ]

    neighbors.forEach(([r, c]) => {
      const pos = `${r}:${c}`

      if (this.matrix[r] && this.matrix[r][c] && !this.mines.includes(pos)) {
        this.discoverCell(r, c, false)
      }
    })
  }

  public checkIfNeighborsHaveMines(row: number, col: number): boolean {
    const neighbors = [
      `${row-1}:${col-1}`, `${row-1}:${col}`, `${row-1}:${col+1}`, // above row
      `${row}:${col-1}`, `${row}:${col+1}`,                        // same row
      `${row+1}:${col-1}`, `${row+1}:${col}`, `${row+1}:${col+1}`, // below row
    ]

    return !!neighbors.find((pos) => this.mines.includes(pos))
  }

}
