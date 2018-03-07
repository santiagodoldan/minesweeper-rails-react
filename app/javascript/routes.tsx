import * as React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { MatchList } from "./components/match_list"
import { MatchShow } from "./components/match_show"
import { withDefaultLayout } from "./components/layout"

export class Routes extends React.Component {

  public render() {
    return  (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ () => withDefaultLayout(MatchList) } />
          <Route exact path="/matches/:id" component={ () => withDefaultLayout(MatchShow) } />
        </Switch>
      </BrowserRouter>
    )
  }

}
