import React from 'react'
import "./footer.css"
const Footer = () => {
  return (
    <div className="d2">
        
        <div id="media">CONNECT WITH US ON</div>
        <div id="sm">
        <div id="fb">
            <h1><a href="https://www.facebook.com">f</a></h1>
        </div>
        <div id="yt">
            <a href="https://youtube.com/"><div id="tri"></div></a>
        </div>
        <div className="insta">
            <a href="https://instagram.com"><div className="inner"></div></a>
        </div>
        <div className="linked">
            <a href="https://www.linkedin.com"><div><b id="b">in</b></div></a>
        </div>
    </div>
        <div id="foot">HOPE YOU HAD A GREAT EXPERIENCE</div>
    </div>
  )
}

export default Footer