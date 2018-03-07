import * as React from "react"
import { Link } from "react-router-dom"
import { inject } from "../../utils/ioc"
import { Match } from "../../models/match"
import { DataService } from "../../services/data_service"

interface IMatchListState {
  matches: Match[]
}

export class MatchList extends React.Component<any, IMatchListState> {

  @inject(DataService)
  public dataService: DataService

  public constructor(props: any) {
    super(props)

    this.state = { matches: [] }
  }

  public async componentDidMount() {
    const matches = await this.dataService.getMatches()

    this.setState({ matches })
  }

  public render() {
    return (
      <div>
        <h1>Match list</h1>

        <table className="table table-dark table-striped mt-5">
          <thead>
            <tr>
              <th className="w-50">Name</th>
              <th className="w-25">Rows</th>
              <th className="w-25">Columns</th>
              <th>
                <i className="fa fa-link"></i>
              </th>
            </tr>
          </thead>

          <tbody>
            {
              this.state.matches.map((match) =>
                <tr key={ match.id }>
                  <td>{ match.name }</td>
                  <td>{ match.rows }</td>
                  <td>{ match.columns }</td>
                  <td>
                    <Link to={ `/matches/${match.id}` }>Play</Link>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }

}
