import "../styles/application"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { Routes } from "../routes"

class AppContainer extends React.Component {

  public render() {
    return <Routes />
  }

}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <AppContainer />,
    document.getElementById("app"),
  )
})
