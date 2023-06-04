import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../component_style/fav_id.css'
import { Context } from '../context/Context';

function Fav_id(props) {
  const [showdetails,setshowdetails]= useState(false)
  const [err,seterr]= useState(false)
  const [errMsg,setErrMsg]= useState("")
  const [consNo,setconsNo]= useState("")
  const [consName,setconsName]= useState("")
  const [consAddress,setconsAddress]= useState("")
  const [availableBalance,setavailableBalance]= useState("")
  const [lastRechargeDate,setlastRechargeDate]= useState("")

  const deletefn=async (cons_no,username)=>{
    try {
      const deleted = await axios.post("http://localhost:5000/api/favs/delete", { username: username, cons_no: cons_no });
      console.log(cons_no,username);
      {window.location.replace("/")}
    } 
    catch (err) {
        // dispatch({type:"LOGOUT"})
        console.log("400 error")
    }
  }

  const viewfn=async (cons_no)=>{
    try {
      const fetched_data = await axios.get("https://www.apdclrms.com/cbs/onlinecrm/knowYourSmartBalance/getConsumerDetails?consumerNo="+ cons_no );
      console.log(fetched_data.data)
      if(fetched_data.data.msg==="failure") throw Error("Consumer is not a smart Pre-Paid Consumer.");
      setshowdetails(true);
      setconsNo(fetched_data.data.consDetails.consNo);
      setconsName(fetched_data.data.consDetails.consName);
      setconsAddress(fetched_data.data.consDetails.consAddress);
      setavailableBalance(fetched_data.data.consDetails.availableBalance);
      setlastRechargeDate(fetched_data.data.consDetails.lastRechargeDate);
      // {window.location.replace("/")}
    } 
    catch (err) {
        // dispatch({type:"LOGOUT"})
        seterr(true);
        setErrMsg(err.message);
        console.log(err.message)
    }
  }

  const closeview= ()=>{
    seterr(false);
    setErrMsg("");
    setshowdetails(false);
    setconsNo(false);
    setconsName(false);
    setconsAddress(false);
    setavailableBalance(false);
    setlastRechargeDate(false);
  }

  return (
    <div className='roww'>
          <p>{props.consumerno}</p>
          <button className="delbutton" onClick={() => viewfn(props.consumerno)}>View</button>
          <button className="delbutton" onClick={() => deletefn(props.consumerno, props.username)}>Delete</button>
          {
            showdetails?
            <div>
              <p>consNo: {consNo}</p>
              <p>consName: {consName}</p>
              <p>consAddress: {consAddress}</p>
              <p>availableBalance: {availableBalance}</p>
              <p>lastRechargeDate: {lastRechargeDate}</p>
              <button className="delbutton" onClick={() => closeview()}>CLOSE</button>
            </div>:<div/>
          }
          {
            err?
            <div>
              <p> {errMsg}</p>
              <button className="delbutton" onClick={() => closeview()}>CLOSE</button>
            </div>:<div/>
          }
    </div>
  )
}

export default Fav_id

