import React from "react";
import {Link , useLocation} from 'react-router-dom'

const Breadcrumb =()=>{
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x)=>x);

    if (pathnames.length === 0){
        return null;
    }
    return(
    < div style={{margin:10 , color:'#000',}}>
    <Link to='/' className="container text-black" >Home</Link>
    {
        pathnames.map((name,index)=>{
            const routeTo=`/${pathnames.slice(0,index+1).join('/')}`;
            const isLast=index === pathnames.length - 1;
            return(
                <span key={name} >
                <span>/</span>
                {isLast ? ( <span >{name}</span>) : (<Link to={routeTo}>{name}</Link>)}
            </span>
            );
            
        })
    }
    
    </div>);
};
export default Breadcrumb;

