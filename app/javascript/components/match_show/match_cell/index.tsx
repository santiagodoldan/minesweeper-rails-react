import * as React from "react"

interface IMatchCellProps {
  pos: string
  visible: boolean
  showMine: boolean
  onClick: (pos: string) => void
}

export class MatchCell extends React.Component<IMatchCellProps> {

  public constructor(props: IMatchCellProps) {
    super(props)

    this.cssClasses = this.cssClasses.bind(this)
  }

  public cssClasses(): string {
    let classes = ["cursor-pointer"]

    if (this.props.showMine) {
      classes.push("bg-danger")
    } else if (this.props.visible) {
      classes.push("bg-light")
    } else {
      classes.push("bg-secondary")
    }

    return classes.join(" ")
  }

  public render() {
    return (
      <td onClick={ () => this.props.onClick(this.props.pos) } className={ this.cssClasses() }>
        &nbsp;

        {
          this.props.showMine &&
            <i className="position-absolute text-light fa fa-bomb"></i>
        }
      </td>
    )
  }

}
