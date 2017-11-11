import React, {Component} from "react"
import Logo from '../Logo'
import Icon from 'react-google-material-icons'
import {Link} from '../../utils/'



export default class Landing extends Component {
  render() {
    return (
      <div className="landing page">
        <Header/>
        <Logo scale={.8}/>
        <Title>Who am I?</Title>
      </div>
    )
  }
}

const Title = ({children}) => {


  // NOTE: Add smooth scroll
  const scrollToBottom = () => window.scrollTo(0, window.innerHeight)

  return (
    <h1 onClick={scrollToBottom} className="title">
      {children}
      <span className="blink">|</span>
    </h1>
  )
}

const Header = () => (
  <div className="header">
    <ul className="social">
      <li>
        <Link href="https://github.com/balazsorban44">
          <Icon icon="code"/>
        </Link>
      </li>
      <li>
        <a>
          <Icon icon="photo_camera"/>
        </a>
      </li>
    </ul>
  </div>
)
