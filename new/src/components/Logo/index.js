import React from 'react'

const Logo = ({scale = 1}) => (
  <div style={{transform: `scale(${scale})`}} className="container">
    <div className="logo">
      <div className="circle b">
        <div className="d"></div>
        <div className="D"></div>
        <p className="rest alazs">alázs</p>
      </div>
      <div className="circle o">
        <p className="rest rban">rbán</p>
      </div>
    </div>
  </div>
)

export default Logo
