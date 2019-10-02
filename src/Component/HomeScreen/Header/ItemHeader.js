import React,{useEffect,useState} from 'react';
import ItemCourse from './ItemCourse';

const ItemHeader = ({item,isCart}) => {
    let [ isClick , setIsClick ] = useState(false)
     
    return (
        <div style={!isCart ? {width:'20%',position:'relative'}:{width:'17%',position:'relative'}}>
            <li onClick={()=> setIsClick(!isClick)} >
            {item}
          </li>
         { isClick ?  <ItemCourse category={item} />:''}
         </div>
    );
    
};

export default ItemHeader;