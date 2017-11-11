import React, {Component} from "react"
import ParticleJS from 'react-particles-js'

let {innerWidth, innerHeight} = window

const setParticles = (innerWidth, innerHeight) =>  ({
  "particles": {
    "number": {
      "value": innerWidth < innerHeight ? 34 : 80,
      "density": {
        "enable": true,
        "value_area": innerWidth
      }
    },
    "color": {
      "value": "#ff4500"
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.9,
      "random": false,
      "anim": {
        "enable": false,
        "speed": .5,
        "opacity_min": 0.5,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "size_min": 0.8,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": innerWidth < innerHeight ? innerHeight/10 : innerWidth/15,
      "color": "#ff4500",
      "opacity": 1,
      "width": .5
    },
    "move": {
      "enable": true,
      "speed": 1.3,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": true,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "retina_detect": true
})

export default class Particles extends Component {

  state = {
    innerWidth,
    innerHeight
  }

  resizeBackground = () => {
    this.setState({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    })
  }

  componentDidMount = () => window.addEventListener('resize', () => this.resizeBackground())

  componentWillUnmount = () => window.removeEventListener('resize', () => this.resizeBackground())

  render() {
    const {innerWidth, innerHeight} = this.state
    return (
      <ParticleJS
        style={{
          top: 0,
          left: 0,
          position: "fixed",
          zIndex: -1
        }}
        width={innerWidth}
        height={innerHeight}
        params={setParticles(innerWidth, innerHeight)}
      />
    )
  }
}
