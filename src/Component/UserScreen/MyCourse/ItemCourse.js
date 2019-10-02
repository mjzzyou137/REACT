import React,{useEffect,useState} from 'react'
import SweetAlert from 'sweetalert-react';
import { makeStyles } from "@material-ui/core/styles"; 
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions"; 
// import Avatar from "@material-ui/core/Avatar"; 
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors"; 
import CourseService from '../../../Services/Course'
import {Link} from 'react-router-dom' 
// import  { Redirect } from 'react-router-dom'
// import SubscribeCourse from '../SubscribeCourse';
import '../../../Screens/animate.css' 
import WOW from 'wowjs'
const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    }
  }));
const ItemCourse = (props) => { 
  let [ isHover , setIsHover ] = useState(false)
  let [ isHoverMyCourse , setIsHoverMyCourse ] = useState(false)
  let [ editOK , setEditOK ] = useState(false)
  let [ detailCourse, setDetailCourse ] = useState([]) 
  useEffect(()=>{
    new WOW.WOW().init();
  },[])
  useEffect(()=>{ 
    CourseService.fetchCourseDetail(props.item.maKhoaHoc).then(res=>{
      setDetailCourse(res.data) 
       
    }).catch(err=>{
      console.log(err)
    }) 
    if(props.path.path === "/user/subscribe-course/:id"){
      setIsHover(true)
    }else if(props.path.path === "/user/:id"){
      setIsHoverMyCourse(true)
    }
  },[])
  const SubscribeCourse = (data) => {
    let obj = {
      maKhoaHoc:data,
      taiKhoan: props.path.params.id
    }
    CourseService.registerCourse(obj).then(res=>{
      setEditOK(true)
    }).catch(err=>{
      console.log(err)
    })
  }
  // const RedirectDetail = (taikhoan,makhoahoc) => { 
  //   return <Redirect to='/' />
  // }
  const renderHover = (data,data2) => {
    if(data === true){
      return (
        <>
        <div className="hoverCardCourse"></div>
        <div className="divButton">
          <button className="btn btnCourse hocVienChoXetDuyet" style={{fontSize:'18px'}} onClick={() => SubscribeCourse(props.item.maKhoaHoc)} >ĐĂNG KÝ KHÓA HỌC</button>
        </div>
        </>
      )
    }
    if(data2 === true){
      return (
        <>
        <div className="hoverCardCourse"></div>
        <div className="divButton">
         <Link to={`/user/chi-tiet-khoa-hoc/${props.path.params.id}/${props.item.maKhoaHoc}`}>
         <button className="btn btnCourse xoaKhoaHoc" style={{fontSize:'16px'}} >XEM CHI TIẾT</button>
         </Link>
         <Link to={`/user/danh-sach-hoc-vien/${props.path.params.id}/${props.item.maKhoaHoc}`}>
         <button className="btn btnCourse hocVienKhoaHoc" style={{fontSize:'16px'}} >DANH SÁCH HỌC VIỆN</button>
         </Link> 
         <Link to={`/user/${props.path.params.id}/${props.item.maKhoaHoc}`}>
         <button className="btn btnCourse" style={{fontSize:'16px',background:'#4970b3'}} >ĐIỂM SỐ</button>
         </Link>
        </div>
        </>
      )
    }
  }
  
    const classes = useStyles(); 
    return (
        <>
        <SweetAlert
        show={editOK}
        title="ĐĂNG KÝ THÀNH CÔNG"
        text="HÃY CHỜ ADMIN DUYỆT"
        onConfirm={() => {
          setEditOK(false);
          window.location.reload();
        }}
      />
            <Card
        className={classes.card}
        className="cardAdmin wow fadeInUp"
        style={{ width: "31.3%", margin: "1% 1%", position: "relative" }}
      >
        <CardHeader
          style={{ textTransform: "uppercase",textAlign:'center',fontWeight:'bold' }}
          title={props.item.tenKhoaHoc}
          subheader={detailCourse.ngayTao}
        />
        <CardMedia
          className={classes.media}
          image={detailCourse.hinhAnh}
          
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {detailCourse.moTa}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          &nbsp;&nbsp;<i className="fas fa-eye"></i>&nbsp;{detailCourse.luotXem} Lượt xem
         
        </CardActions>
       
        {renderHover(isHover,isHoverMyCourse)}
      </Card>
        </>
    );
};

export default ItemCourse;