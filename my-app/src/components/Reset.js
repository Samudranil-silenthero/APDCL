import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../component_style/login.css'

function Reset() {
  const userEmail=useRef();
  const password=useRef();
  const userotp=useRef();
  const [err,setErr]=useState();
  const [dissub,setdissub]=useState(true);
  const [disotp,setdisotp]=useState(false);
  const [disinp,setdisinp]=useState(false);
  const [isloading,setLoading]=useState(false)

  useEffect(()=>{
    setdissub(true)
    setdisotp(false)
    setdisinp(false)
  },[])

  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await axios.post("http://localhost:5000/api/setnewpassword", {
        email: userEmail.current.value,
        password: password.current.value,
        otp: userotp.current.value
      });
      console.log("updatedUser")
      {window.location.replace("/login")}
    } catch (err) {
        setErr(err.response.data);
        console.log(err)
      }
  };

  const otpgen= async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await axios.post("http://localhost:5000/api/generateotp", {
        email: userEmail.current.value
      });
      setdisotp(true);
      setdissub(false);
      setdisinp(true)
      setErr(updatedUser.data)
    } catch (err) {
        setErr(err.response.data);
        console.log(err)
      }
  };

  return(
    <div className='logcontainer'>
          {!isloading?<div className='logwrapper'>
            <h1 className='logh1'>Reset Password</h1>
            {err?
              <div className='errdiv'>
                    {err}
              </div>:
              <div/>
            }
            <form>
                <div><input disabled={disinp} className='loginp' required type="text" name="name" placeholder="Enter your registered email" ref={userEmail}/></div>
                <button type="submit" className='logbutton' disabled={disotp} onClick={otpgen}>GENERATE OTP</button>
                <div><input className='loginp' type="text" name="name" placeholder="Enter otp received via email" ref={userotp}/></div>
                <div ><input className='loginp' type="text" name="password"  placeholder="New Password" ref={password}/></div>
                <button type="submit" className='logbutton' disabled={dissub} onClick={handleSubmit}>SUBMIT</button>
            </form>
          </div>:<div/>}
    </div>  
  )
}

export default Reset