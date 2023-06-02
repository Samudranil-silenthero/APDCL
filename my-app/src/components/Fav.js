import React, { useContext, useRef } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../component_style/fav.css'
import { Context } from '../context/Context';
import  Fav_id from "./Fav_id"
import Cookies from 'js-cookie';

function Fav() {
  const consno=useRef();
  const [hist,setHist]=useState([]);
  const [isloading,setisloading]=useState();
  const [active,setactive]=useState();
  const {user, dispatch}=  useContext(Context);
  const [err,setErr]=useState();
  const [cookie,setCookie]=useState(Cookies.get('jwt'));

  const addfn=async ()=>{
    try {
      const added = await axios.post("http://localhost:5000/api/favs/add", { username: user.username, cons_no: consno.current.value });
      console.log(added)
      {window.location.replace("/")}
    } 
    catch (err) {
        dispatch({type:"LOGOUT"})
        setErr(err.response.data);
        console.log(err.response.data)
    }
  }

  useEffect(()=>{
    const getHis=async ()=>{
        try {
          var verified = await axios.post("http://localhost:5000/api/verify", {username: user.username,email: user.email, jwt: cookie});
          console.log(verified);
          try {
            setisloading(true)
            var history = await axios.post("http://localhost:5000/api/favs", {username: user.username});
            setHist( (history.data));  
            console.log((JSON.parse(JSON.stringify(history.data))))
            setisloading(false)
            if(history.data.length>=10) setactive(false);
            else setactive(true) 
          } 
          catch (err) {
              console.log("Problem in fetching!!!")
          }
        } 
        catch (err) {
            dispatch({type:"LOGOUT"})
            console.log("400 error")
        }
      }
      getHis();
  },[])
  return (
    <div className='filepage'>
        <div><p>Favorite Page (Add upto 10 favourites)</p></div>
        {isloading?
              <h3>Loading....</h3>:
              <div className="bigDIV">
                    {hist.map((x) => (
                          <Fav_id consumerno={x.cons_no} username={x.username}/>
                    ))}
              </div>
        }
        <div className='smallDIV'>
          <input className='loginput' type="text" name="name" placeholder="Enter the consumer number to add:" ref={consno}/>
          <button className="addbutton" onClick={addfn} disabled={!active}>ADD</button>
        </div> 
        {err?
              <div className='errdivadd'>
                    {err}
              </div>:
              <div/>
        }        
    </div>
  )
}

export default Fav

