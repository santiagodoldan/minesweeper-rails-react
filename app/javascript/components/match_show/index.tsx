import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
// import { MatchCell } from "./match_cell"
import { Grid } from "../../lib/grid"
import { Match } from "../../models/match"
import { DataService } from "../../services/data_service"
import { inject } from "../../utils/ioc"

interface IMatchShowParams {
  id: number
}

interface IMatchShowState {
  match: Match
  grid: Grid
}

class MatchShowComponent extends React.Component<RouteComponentProps<IMatchShowParams>, IMatchShowState> {

  @inject(DataService)
  public dataService: DataService

  public constructor(props: RouteComponentProps<IMatchShowParams>) {
    super(props)

    this.state = { match: undefined, grid: undefined }

    this.onCellClicked = this.onCellClicked.bind(this)
  }

  public async componentDidMount() {
    const match = await this.dataService.getMatch(this.props.match.params.id)

    const grid = new Grid(match.rows, match.columns, match.mines)

    this.setState({ match, grid })
  }

  public onCellClicked(pos: string): void {
    const [row, col] = pos.split(":").map((v: string) => Number(v))

    this.state.grid.discoverCell(row, col)

    this.setState({ grid: this.state.grid })
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

                            return (
                              <td key={ pos } onClick={ () => this.onCellClicked(pos) }>
                                &nbsp;

                                { this.state.grid.visibleCells.includes(pos) ? "o" : null }
                              </td>
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
