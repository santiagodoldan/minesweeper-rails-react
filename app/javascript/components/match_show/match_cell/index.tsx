import * as React from "react"

interface IMatchCellProps {
  pos: string
  onClick: (pos: string) => void
}

export class MatchCell extends React.Component<IMatchCellProps> {

  public render() {
    return (
      <td onClick={ () => this.props.onClick(this.props.pos) }>
        &nbsp;
      </td>
    )
  }

}
