import React, {Component} from "react"
import profile from '../../img/profile.jpg'

export default class Introduction extends Component {
  state = {
    isBigPicture: true
  }

  hideIntroText = () => this.setState({isBigPicture: false})

  showIntroText = () => this.setState({isBigPicture: true})

  render() {
    const {isBigPicture} = this.state
    let imgSize = 0
    if (window.innerWidth < 640) {
      imgSize = isBigPicture ? "70%" : 128
    } else {
      imgSize = isBigPicture ? 480 : 128
    }
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
                  I started programming officially in 2015. I am mostly self-taught leveraging the power of the Internet, but from 2016 I am a bachelor student at the <a href='http://www.ntnu.edu/studies/bit' target='_blank' rel="noopener noreferrer">Norwegian University of Science and Technology</a> and studying Information Technology. I find web-development the most fun, especially front-end development is very interesting. I don't set any barriers for myself, so I may pick some other things up later on.
                </p>
              </div>
            }
            <div style={{display: isBigPicture && "flex"}} className="intro-textbox">
              {!isBigPicture && <h4>photo</h4>}
              <img
                style={{marginLeft: isBigPicture && 0}}
                onClick={this.hideIntroText}
                width={imgSize}
                height={imgSize}
                className="intro-img"
                src={profile}
                alt="Profile img"
              />
              {
                !isBigPicture && <span className="intro-textbox-photo-clip"/>
              }
              {!isBigPicture &&
                <p>
                  I started photography in 2013 under my exchange year in the Lofoten Islands, in Norway, and I am taking photos since then. School has limited my time I can afford to practice it, but whenever I travel to new/interesting places, my <a href='' target='_blank'>camera gears</a> are always with me.
                </p>
              }
              {/* REVIEW: Add camera gadget page */}

            </div>
          </div>
        </div>
      </div>
    )
  }
}
