import React,{useEffect,useState} from 'react';
import CourseService from '../../../Services/Course'
import { Link } from 'react-router-dom'
const ItemCourse = ({category,MoveOut}) => {
    let [ lstCourseService , setLstCourseService ] = useState([])
    let [ lstCourse , setLstCourse ] = useState([])
    useEffect(()=>{
        CourseService.fetchCourse().then(res=>{
            setLstCourseService(res.data)
        })
    },[category])
    useEffect(()=>{
       if(lstCourseService.length !== 0){
        setLstCourse(lstCourseService.filter(item=>{
            return item.danhMucKhoaHoc.tenDanhMucKhoaHoc === category
        }))
       }
    },[lstCourseService])
    const renderListCourse = data => {
       return data.map((item,index)=>{
           return( 
             <Link to={`/detail-course-home/${item.maKhoaHoc}`} onClick={()=> window.scroll({top:0})}>
               <li key={index}>
                   {item.tenKhoaHoc}
               </li></Link>
           )
       })
    }
    return (
        <div className="content-category"  >
            <ul>
              {renderListCourse(lstCourse)}
            </ul>
          </div>
    );
};

export default ItemCourse;