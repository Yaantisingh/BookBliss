import React from 'react'
import "./Maincomp.css"
import { Link } from 'react-router-dom';
const Maincomp = (props) => {
  return (
    <div id="cpar">
    <div id="contents"><div id="genres"><h3>{props.ID}</h3></div>
    <Link to={props.links}> <div id="picture"><div ><img src={props.pic} alt="book_img" className="bimg"></img></div></div></Link>
      <div id="info">{props.info}</div>
    </div>
    </div>
  )
}
export default Maincomp