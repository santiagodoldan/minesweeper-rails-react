import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { MatchCell } from "./match_cell"
import { Grid, MinePressedError } from "../../lib/grid"
import { Match } from "../../models/match"
import { DataService } from "../../services/data_service"
import { inject } from "../../utils/ioc"

enum MatchState {
  Playing = "Playing",
  GameOver = "GameOver",
  Win = "Win",
}

interface IMatchShowParams {
  id: number
}

interface IMatchShowState {
  match: Match
  visibleCells: string[]
  matchState: MatchState
}

class MatchShowComponent extends React.Component<RouteComponentProps<IMatchShowParams>, IMatchShowState> {

  @inject(DataService)
  public dataService: DataService

  public constructor(props: RouteComponentProps<IMatchShowParams>) {
    super(props)

    this.state = {
      match: undefined,
      matchState: MatchState.Playing,
      visibleCells: [],
    }

    this.onCellClicked = this.onCellClicked.bind(this)
  }

  public async componentDidMount() {
    const match = await this.dataService.getMatch(this.props.match.params.id)

    this.setState({ match })
  }

  public onCellClicked(pos: string): void {
    if (this.state.matchState === MatchState.Playing) {
      const [row, col] = pos.split(":").map((v: string) => Number(v))

      const grid = new Grid(
        this.state.match.rows,
        this.state.match.columns,
        this.state.match.mines,
        this.state.visibleCells,
      )

      try {
        grid.discoverCell(row, col)
      } catch (err) {
        if (err instanceof MinePressedError) {
          this.setState({ matchState: MatchState.GameOver })
        }
      }

      this.setState({ visibleCells: grid.visibleCells })
    }
  }

  public render() {
    return (
      <div>
        <h1>Match show</h1>

        <div className="mx-auto mt-5 w-50">
          <table className="table table-bordered table-sm">
            <tbody>
              {
                this.state.match &&
                  Array.apply(null, { length: this.state.match.rows }).map((_: any, row: number) => {
                    return (
                      <tr key={ row }>
                        {
                          Array.apply(null, { length: this.state.match.columns }).map((_: any, col: number) => {
                            const pos = `${row}:${col}`
                            const visible = this.state.visibleCells.includes(pos)
                            const showMine = this.state.matchState === MatchState.GameOver && this.state.match.mines.includes(pos)

                            return (
                              <MatchCell
                                key={pos}
                                onClick={this.onCellClicked}
                                pos={pos}
                                visible={visible}
                                showMine={showMine} />
                            )
                          })
                        }
                      </tr>
                    )
                  })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

export const MatchShow = withRouter(MatchShowComponent)
