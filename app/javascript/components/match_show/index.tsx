import * as React from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { Match } from "../../models/match"
import { DataService } from "../../services/data_service"
import { inject } from "../../utils/ioc"

interface IMatchShowParams {
  id: number
}

interface IMatchShowState {
  match: Match
}

class MatchShowComponent extends React.Component<RouteComponentProps<IMatchShowParams>, IMatchShowState> {

  @inject(DataService)
  public dataService: DataService

  public constructor(props: RouteComponentProps<IMatchShowParams>) {
    super(props)

    this.state = { match: undefined }
  }

  public async componentDidMount() {
    const match = await this.dataService.getMatch(this.props.match.params.id)

    this.setState({ match })
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
                            return (
                              <td key={ `${row}:${col}` }>
                                &nbsp;
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
