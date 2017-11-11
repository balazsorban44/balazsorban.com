import React, { Component } from "react"
import Landing from './Landing'
import Introduction from './Introduction'
import Particles from './Particles'
import "../main.css"

export default class App extends Component {
  render() {
    return (
      <div>
        <Particles/>
        <Landing/>
        <Introduction/>
      </div>
    )
  }
}
