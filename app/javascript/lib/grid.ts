export class Grid {
  public rows: number
  public columns: number
  public matrix: boolean[][]
  public mines: string[]
  public visibleCells: string[]

  public constructor(rows: number, columns: number, mines: string[]) {
    this.rows         = rows
    this.columns      = columns
    this.mines        = mines
    this.visibleCells = []

    // This is for an easy way to check if a given cell exists in the match's grid
    this.matrix = Array.apply(null, { length: rows }).map(() => Array.apply(null, { length: columns }).map(() => true))
  }

  public discoverCell(row: number, col: number, firstRun = true) {
    const pos = `${row}:${col}`

    if (this.mines.includes(pos)) {
      alert("boom")
    } else if (this.visibleCells.includes(pos)) {
      // TODO
    } else {
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
