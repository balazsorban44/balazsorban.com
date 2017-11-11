import React from "react"

const Stat = ({children, title}) => (
  <div className="stat">
    <h5>{title}: </h5>
    <span>
      {children}
    </span>
  </div>
)

export default Stat
