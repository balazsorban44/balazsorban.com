import React, {Component} from "react"

export default class Landing extends Component {
  render() {
    const {toggleIntroduction} = this.props
    return (
      <div className="landing page">
        <h1 onClick={toggleIntroduction}>
          Balázs<br/> Orbán
        </h1>
        <span className="PLACEHOLDER"/>
        <h2 className="subtitle">PORTFOLIO</h2>
      </div>
    )
  }
}
