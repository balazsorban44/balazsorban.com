import React, { Component } from "react"
import Landing from './Landing'
import Introduction from './Introduction'
import "../main.css"

export default class App extends Component {
  state = {
    shouldShowIntro: false
  }

  toggleIntroduction = () => {
    this.setState(({shouldShowIntro}) => ({
      shouldShowIntro: !shouldShowIntro
    }))
  }

  render() {
    const {shouldShowIntro} = this.state
    return (
      <div>
        {shouldShowIntro && <Introduction/>}
        <Landing toggleIntroduction={this.toggleIntroduction}/>
      </div>
    )
  }
}
