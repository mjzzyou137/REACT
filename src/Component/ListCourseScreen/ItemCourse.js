import React,{useEffect} from 'react';
import SweetAlert from 'sweetalert-react';
import { makeStyles } from "@material-ui/core/styles"; 
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions"; 
import Avatar from "@material-ui/core/Avatar"; 
import Typography from "@material-ui/core/Typography";
import '../../Screens/animate.css' 
import WOW from 'wowjs'
import { Link } from 'react-router-dom'
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
      backgroundColor: '#19224d'
    }
  }));
const ItemCourse = (props) => {
  useEffect(()=>{
    new WOW.WOW().init();
  },[])
    const classes = useStyles();
    let { maKhoaHoc, tenKhoaHoc, ngayTao, hinhAnh, luotXem, nguoiTao, moTa } = props.item;

    return (
        <Card 
        className={classes.card}
        className="cardAdmin wow fadeInUp"
        style={{  height:'380.56px', marginTop:'35px',fontWeight:'bold',color:'#19224d', border:'2px solid #19224d'}}
      >
        <CardHeader
          style={{ textTransform: "uppercase",fontSize:'20px' }}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <p style={{ textTransform: "uppercase" }}>
                {nguoiTao.taiKhoan.slice(0, 1)}
              </p>
            </Avatar>
          }
          title={tenKhoaHoc}
          subheader={ngayTao}
        />
        <CardMedia
          className={classes.media}
          image={hinhAnh}
          title={tenKhoaHoc}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {moTa}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="d-flex justify-content-between">
         <div>
         &nbsp;&nbsp;<i className="fas fa-eye"></i>&nbsp; {luotXem} Lượt xem
         </div>
         <Link to={`/detail-course-home/${maKhoaHoc}`}onClick={()=>{
           window.scroll({top:0})
         }}>
         <button className="btn btn-detail">CHI TIẾT</button>
         </Link>
        </CardActions>
      </Card> 
    );
};

export default ItemCourse;