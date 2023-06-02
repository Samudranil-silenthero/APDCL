import React, { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../component_style/login.css'
function Signup() {
  const userName=useRef();
  const userEmail=useRef();
  const password=useRef();
  const [err,setErr]=useState();
  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      const createUser = await axios.post("http://localhost:5000/api/signup", {
        username: userName.current.value,
        email: userEmail.current.value,
        password: password.current.value,
      });
      {createUser.data && window.location.replace("/login")}
    } catch (err) {
        setErr(err.response.data);
        console.log(err)
      }
  };
  return(
    <div className='logcontainer'>
          <div className='logwrapper'>
            <h1 className='logh1'>Sign Up</h1>
            {err?
              <div className='errdiv'>
                    {err}
              </div>:
              <div/>
            }
            <form onSubmit={handleSubmit}>
                <div><input className='loginp' type="text" name="name" placeholder="Username" ref={userName}/></div>
                <div><input className='loginp' type="text" name="name" placeholder="Email" ref={userEmail}/></div>
                <div ><input className='loginp' type="text" name="password"  placeholder="Password" ref={password}/></div>
                <button type="submit" className='logbutton'>Signup</button>
            </form>
            <div className='loglink'><a href='/login'>Already have an account</a></div>
          </div>
        </div>  
  )
}

export default Signup