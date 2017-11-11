import React, {Component} from "react"
import profile from "../../img/profile.jpg"
import {Link} from "../../utils/"
import Stat from "./Stats"
import Footer from "../Footer"
import moment from "moment"

export default class Introduction extends Component {
  state = {
    isBigPicture: true,
    publicRepos: "?",
    myAge: 0,
    hireable: true
  }

  componentDidMount = () => {
    fetch("https://api.github.com/users/balazsorban44").then(response => {
      if (response.ok) {
        response.json().then(({
          public_repos,
          hireable
        }) => {
          this.setState({
            publicRepos: public_repos,
            hireable
          })
        })
      }
    })

  const myAge = moment().diff(moment('19941217', 'YYYYMMDD'), 'years')
  this.setState({myAge})
  }

  hideIntroText = () => this.setState({isBigPicture: false})

  toggleIntroText = () => this.setState(({isBigPicture}) => ({
    isBigPicture: !isBigPicture
  }))

  showIntroText = () => this.setState({isBigPicture: true})

  render() {
    const {isBigPicture, publicRepos, myAge, hireable} = this.state
    return (
      <div className="page">

        <div className="intro">
          {!isBigPicture && <span onClick={this.showIntroText} className="close-intro-text">✕</span>}
          <div className="intro-textboxes">
            {!isBigPicture &&
              <div className="intro-textbox">
                <span className="intro-textbox-code-clip-left"/>
                <h4>coding</h4>
                <span className="intro-textbox-code-clip-right"/>
                <p>
                  I started programming officially in 2015. I am mostly self-taught leveraging the power of the Internet, but from 2016 I am a bachelor student at the <Link className="link" href='http://www.ntnu.edu/studies/bit' >Norwegian University of Science and Technology</Link> and studying Information Technology. I find web-development the most fun, especially front-end development is very interesting. I don't set any barriers for myself, so I may pick some other things up later on.
                </p>
              </div>
            }
            <div style={{display: isBigPicture && "flex"}} className="intro-textbox">
              {!isBigPicture && <h4>photo</h4>}
              <img

                onClick={this.toggleIntroText}
                className={`intro-img ${isBigPicture && 'intro-img-big'}`}
                src={profile}
                alt="Profile img"
              />
              {
                !isBigPicture && <span className="intro-textbox-photo-clip"/>
              }
              {!isBigPicture &&
                <p>
                  I started photography in 2013 under my exchange year in the Lofoten Islands, in Norway, and I am taking photos since then. School has limited my time I can afford to practice it, but whenever I travel to new/interesting places, my <a className="link">camera gears</a> are always with me.
                </p>
              }
              {/* REVIEW: Add camera gadget page */}

            </div>
          </div>
        </div>
        <div className="stats">
          <Stat title="Age">{myAge}</Stat>
          <Stat title="Accepts hirings">{hireable ? "Yes" : "No"}</Stat>
          <Stat title="Public repositories">{publicRepos}</Stat>
          {/* // REVIEW: Get stat counts from database. */}
          <Stat title="Photos on website">0</Stat>
          <Stat title="Photography awards">1</Stat>
        </div>
        <Footer/>
      </div>
    )
  }
}
