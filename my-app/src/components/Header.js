import React,{useContext} from 'react'
import '../component_style/header.css'
import { Context } from '../context/Context';
import Cookies from 'js-cookie';

function Header() {
   // const user=1
   const {user, dispatch}=  useContext(Context);
   const logsout=(e)=>{
      Cookies.remove('jwt')
      Cookies.set("jwt", "", { expires: 1 }); //set cookie to blank
      dispatch({type:"LOGOUT"})
   }
  return (
     <div className='navbar'>
         {/* <div className='nleft'>
         </div> */}
        <div className='nleft'>
            <h2> 
               <a href='/' className='linkhead'>APDCL (View your smart prepaid balance)</a>
            </h2>
         </div>
        {user?
               <div className='nright'> 
                     <span className='linknaming'>Hi, {user.username}</span>   
                     {/* <span className='linknaming'>Hi, user14</span>     */}
                     <a href='/logout' className='link' onClick={logsout}>Logout</a>
               </div>:
               <div className='nright'>                     
                  <a href='/login' className='link'>Login</a>
                  <a href='/Signup' className='link'>Signup</a>
            </div>
        }
     </div>
  )
}

export default Header