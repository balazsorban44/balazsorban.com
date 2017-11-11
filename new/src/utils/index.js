import React from 'react'

export const Link = props => (
  <a
    {...props}
    target="_blank"
    rel="noopener noreferrer"
  >
    {props.children}
  </a>
)
