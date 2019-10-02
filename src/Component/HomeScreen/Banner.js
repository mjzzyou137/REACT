import React,{useEffect,useState} from "react";
import "../../Screens/animate.css";
import { Link } from 'react-router-dom'
const Banner = ({listCourse}) => {
  let [ keyword , setKeyword] = useState("")
  return (
 <section className="cover">
  <div className="opacityBanner" />
  <div className="polygon" />
  <div className="slideImage" />
  <div className="containerSlideInfo">
    <div className="slide-info">
      <div className="info-1">
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <p>Matthew, <strong>Writer and Proofreader</strong></p>
      </div>
      <div className="info-2">
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <p>Darren, <strong>Designer and Animator</strong></p>
      </div>
      <div className="info-3">
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <p>Nichelle, <strong>Social Media Strategist</strong></p>
      </div>
      <div className="info-4">
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <p>Tobee, <strong>Voice Over Artist</strong></p>
      </div>
      <div className="info-5">
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <p>Sharon, <strong>Marketing Expert</strong></p>
      </div>
      <div className="info-6 ">
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <p>Melissa, <strong>Social Media Marketer</strong></p>
      </div>
    </div>
  </div>
  <div className={!listCourse ? 'bannerContent':'d-none'}>
    <h1>Find The Perfect Freelance<br />Services For Your Business</h1>
    <form className="mt-4">
      <input type="text" placeholder="Course search ..." onKeyUp={e=> setKeyword(e.target.value)} />
      <div className="btnSearch" >
       <Link to={`/list-course/${keyword}`}>
       <a href="asdasd" onClick={()=>{
           window.scroll({
            top: 640, 
            behavior: 'smooth'
          });
       }}>Search</a></Link>
      </div>
    </form> 
  </div>
</section>

  );
};

export default Banner;
