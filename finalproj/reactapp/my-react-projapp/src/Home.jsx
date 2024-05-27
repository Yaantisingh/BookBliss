import React from 'react'
import "./Home.css"
import Nav from "./Nav"
import BookSearch from "./BookSearch"
import Maincomp from "./Maincomp"
import Footer from "./footer"
import ImageSlider from './ImageSlider'
// import SearchResult from './SearchResult'
// import Searchopt from './Searchopt'
// import Adminpg from "./Adminpg"
// import { BrowserRouter as Link } from 'react-router-dom';
function Home() {
  let cardss=[
    {
      id:"RELIGIOUS",
      imgs:"images/Religious.png",
      names:"Unlock the Divine Wisdom. Illuminate Your Path with Timeless Truths. Journey through the sacred pages of our religious books.",
      links:"/Catrelg"
    },
    {
      id:"COMEDY",
      imgs:"images/comedy.jpg",
      names:"Laugh Your Way Through Life: Unleash the Power of Humor with Our Hilarious Collection of Comedy Books! Dive into a world where laughter is the best medicine.",
      links:"/Catrelg"
    },
    {
      id:"MOTIVATIONAL",
      imgs:"images/img2.jpg",
      names:"Embark on a journey of self-discovery and empowerment with our latest motivational masterpiece! Unleash the power within you and embrace a life of boundless possibilities",
      links:"/Catrelg"
    },
    {
      id:"RECIPES",
      imgs:"images/img1.webp",
      names:"Explore a symphony of tastes and aromas in our recipe book, where every page unveils a new Culinary Tale. From sizzling starters to delectable desserts.",
      links:"/Catrelg"
    },
    {
      id:"THRILLER",
      imgs:"images/thriller.jpeg",
      names:"Unlock the Thrills: Open the door to a world where mysteries abound and danger lurks in unexpected corners. Our thriller books are a passport to excitement.",
      links:"/Catrelg"
    },
    {
      id:"FICTION",
      imgs:"images/fiction.jpg",
      names:"Discover the Unseen: Unleash Your Imagination with Riveting Tales that Transcend Reality. Immerse yourself in a world where every page unfolds a new adventure.",
      links:"/Catrelg"
    }
  ];
  return(<div id='page1'>
    <Nav/>
    {/* <Searchopt/> */}
    <BookSearch></BookSearch>
   
    <ImageSlider></ImageSlider>
    <Maincomp ID={cardss[0].id} pic={cardss[0].imgs} info={cardss[0].names} links={cardss[0].links}></Maincomp>
    <Maincomp ID={cardss[1].id} pic={cardss[1].imgs} info={cardss[1].names} links={cardss[1].links}></Maincomp>
    <Maincomp ID={cardss[2].id} pic={cardss[2].imgs} info={cardss[2].names} links={cardss[2].links}></Maincomp>
    <Maincomp ID={cardss[3].id} pic={cardss[3].imgs} info={cardss[3].names} links={cardss[3].links}></Maincomp>
    <Maincomp ID={cardss[4].id} pic={cardss[4].imgs} info={cardss[4].names} links={cardss[4].links}></Maincomp>
    <Maincomp ID={cardss[5].id} pic={cardss[5].imgs} info={cardss[5].names} links={cardss[5].links}></Maincomp>
    <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/><br/> <br/> <br/>
    <br/> <br/> <br/><br/> <br/> <br/><br/> <br/> <br/><br/> <br/> <br/><br/> <br/> <br/><br/> <br/> <br/><br/> <br/> <br/><br/> <br/> <br/>
    <Footer></Footer>
    </div>
  );
}

export default Home