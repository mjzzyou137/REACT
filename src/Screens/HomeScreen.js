import React,{useEffect} from 'react';
import Header from '../Component/HomeScreen/Header'
import Banner from '../Component/HomeScreen/Banner'
import CourseSearch from '../Component/HomeScreen/CourseSearch'
import WhatWeDo from '../Component/HomeScreen/WhatWeDo'
import Contact from '../Component/HomeScreen/Contact'
import Advantages from '../Component/HomeScreen/Advantages'
import Feedback from '../Component/HomeScreen/Feedback'
import Achievements from '../Component/HomeScreen/Achievements'
import Footer from '../Component/HomeScreen/Footer'   
import './HomeScreen.scss'
import img1 from '../assets/HomeScreen/1.jpg'
import { actFetchLoginUser } from '../Store/Actions/User';
import { restConnector } from '../Connectors/Axios';
import { connect } from 'react-redux'
let style={
  banner:{
    background: `url(${img1}) center no-repeat`,
    backgroundSize: 'cover',
    position: 'relative',
    zIndex: 0,
    height: '80vh',
  }
}
const HomeScreen = (props) => {
    
  useEffect(()=> {  
    const loginUser = localStorage.getItem("loginUser");
    console.log(loginUser)
    if(loginUser) {
      props.dispatch(actFetchLoginUser(JSON.parse(loginUser)));
      restConnector.defaults.headers["Authorization"] = `Bearer ${JSON.parse(loginUser).accessToken}`;
    }
  })
    return (
        <>
        <div className='banner'> 
            <Header/>
            <Banner/>
        </div>
            <CourseSearch/>
            <WhatWeDo/>
            <Contact/>
            <Advantages/>
            <Feedback/>
            <Achievements/>
            <Footer/>
        </>
    );
};
 
export default connect()(HomeScreen);