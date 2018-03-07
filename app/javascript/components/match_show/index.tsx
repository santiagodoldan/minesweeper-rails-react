import * as React from "react"

export class MatchShow extends React.Component {

  public render() {
    return (
      <div>
        <h1>Match show</h1>

        <div className="mx-auto mt-5 w-50">
          <table className="table table-bordered table-sm">
            <tr>
              <td className="w-25 text-center">
                <i className="fa fa-bomb"></i>
              </td>
              <td className="w-25 text-center">
                <i className="fa fa-flag-checkered"></i>
              </td>
              <td className="w-25 text-center"></td>
            </tr>
            <tr>
              <td className="w-25 text-center">&nbsp;</td>
              <td className="w-25 text-center"></td>
              <td className="w-25 text-center"></td>
            </tr>
            <tr>
              <td className="w-25 text-center">&nbsp;</td>
              <td className="w-25 text-center"></td>
              <td className="w-25 text-center"></td>
            </tr>
          </table>
        </div>
      </div>
    )
  }

}
