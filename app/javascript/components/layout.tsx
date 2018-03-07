import * as React from "react"
import { Link, RouteComponentProps, withRouter } from "react-router-dom"

class DefaultLayout extends React.Component<RouteComponentProps<any>> {

  public render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <Link className="navbar-brand" to="/">Minesweeper</Link>
        </nav>

        <main role="main" className="container">
          { this.props.children }
        </main>
      </div>
    )
  }

}

const DefaultLayoutWithRouter = withRouter(DefaultLayout)

export function withDefaultLayout(Component: React.ComponentClass) {
  return (
    <DefaultLayoutWithRouter>
      <Component />
    </DefaultLayoutWithRouter>
  )
}
