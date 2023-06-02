import React, { useRef } from 'react'
import { useState, useContext } from 'react'
import axios from 'axios'
import '../component_style/login.css'
import { Context } from "../context/Context";
import Cookies from 'js-cookie';
import {  useEffect } from "react";

function Login() {
  const userName=useRef();
  const password=useRef();
  const [err,setErr]=useState();
  const [cookie,setCookie]=useState(Cookies.get('jwt'));
  const { dispatch, isFetching } = useContext(Context);
  const [isloading,setLoading]=useState(false)

  // useEffect(()=>{
  //   const getHis=async ()=>{
  //       try {
  //         setLoading(true)
  //         if(!cookie){
  //           setLoading(false);
  //           throw Error('No cookie in storage');
  //         }
  //         const history = await axios.post("http://localhost:5000/api/auth/verify", {cookie: cookie});
  //         console.log(cookie)
  //         setLoading(false)
  //         console.log(history.data._id)
  //         dispatch({ type: "LOGIN_SUCCESS", payload: history.data });
  //         {history.data && window.location.replace("/dataset")}
  //       }  
  //       catch (err) {
  //           console.log(err)
  //       }
  //     }
  //     getHis();
  // },[])

  const handleSubmit= async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const loggedUser = await axios.post("http://localhost:5000/api/login", {
        username: userName.current.value,
        password: password.current.value,
      });
      console.log(loggedUser.data)
      // Cookies.set("jwt", JSON.stringify(loggedUser.data.jwt), { expires: 7 });
      // dispatch({ type: "LOGIN_SUCCESS", payload: loggedUser.data });
      Cookies.set("jwt", JSON.stringify(loggedUser.data.jwt), { expires: 7 });
      dispatch({ type: "LOGIN_SUCCESS", payload: {username: loggedUser.data.username, email:loggedUser.data.email} });
      {loggedUser.data && window.location.replace("/")}
    } catch (err) {
        setErr(err.response.data);
        dispatch({ type: "LOGIN_FAILURE" });
        console.log(err)
      }
  };
  return(
    <div className='logcontainer'>
          {!isloading?<div className='logwrapper'>
            <h1 className='logh1'>Log In</h1>
            {err?
              <div className='errdiv'>
                    {err}
              </div>:
              <div/>
            }
            <form onSubmit={handleSubmit}>
                <div><input className='loginp' type="text" name="name" placeholder="Username" ref={userName}/></div>
                <div ><input className='loginp' type="text" name="password"  placeholder="Password" ref={password}/></div>
                <button type="submit" className='logbutton' >LOGIN</button>
            </form>
            <div className='loglink'><a href='/signup'>Create a new account</a></div>
            <div className='loglink'><a href='/reset'>Forgot Password?</a></div>
          </div>:<div/>}
        </div>  
  )
}

export default Login