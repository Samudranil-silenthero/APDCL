import React, { useContext } from 'react'
import { useState, useEffect,useRef } from 'react'
import axios from 'axios'
import '../component_style/fav_id.css'
import Popup from 'reactjs-popup';
import { Context } from '../context/Context';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Fav_id(props) {
  const [showdetails,setshowdetails]= useState(false)
  const [err,seterr]= useState(false)
  const [errMsg,setErrMsg]= useState("")
  const [consNo,setconsNo]= useState("")
  const [consName,setconsName]= useState("")
  const [consAddress,setconsAddress]= useState("")
  const [availableBalance,setavailableBalance]= useState("")
  const [lastRechargeDate,setlastRechargeDate]= useState("")
  const [isloading,setisloading]=useState(true);
  const [payHist,setpayHist]=useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const monthNames = ["January", "February","March", "April","May","June","July","August","September","October",    "November","December"];

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

  const payhist=async (cons_no)=>{
    try {
      const fetched_data = await axios.get("https://www.apdclrms.com/cbs/onlinecrm/knowYourSmartBalance/rechargeHistory?cons_no="+ cons_no );
      setisloading(true)
      setpayHist(fetched_data.data)
      setisloading(false)
      console.log(fetched_data.data)
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

  const downloadfn=async (cons_no)=>{
    console.log(monthNames[selectedDate.$M]);
    console.log(selectedDate.$y);
    try {
      const anchorElement = document.createElement('a');
      anchorElement.href = "https://www.apdcl.org/armsPdfEngine/download/onlineSmartBill/billView?consNo="+cons_no+"&month="+monthNames[selectedDate.$M]+"&year="+selectedDate.$y;
      anchorElement.setAttribute('download', 'myPDF.pdf');
      document.body.appendChild(anchorElement);
      anchorElement.click();
      document.body.removeChild(anchorElement);
    } 
    catch (err) {
        seterr(true);
        setErrMsg("Bill not available for selected date");
        console.log(err.message)
    }
  }

  return (
    <div className='roww'>
          <p>{props.consumerno}</p>
          <button className="delbutton" onClick={() => viewfn(props.consumerno)}>View Balance</button>
          <button className="delbutton" onClick={() => deletefn(props.consumerno, props.username)}>Delete</button>
          <div>
            <Popup trigger={<button className="delbutton" >Download Bill</button>} modal nested>
                {
                    close => (
                        <div className='popup_bound'> 
                                <div>
                                  {
                                    err?
                                    <div>
                                      <p style={{ color: 'blue', fontWeight:'bold'}}> {errMsg}</p>
                                    </div>:<div/>
                                  }
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                        <DatePicker onChange={(date) => {
                                                      setSelectedDate(date);
                                                      seterr(false);
                                                    }}
                                        />                                        
                                      </DemoContainer>
                                  </LocalizationProvider>
                                  
                                  <button className="delbutton" onClick={()=>downloadfn(props.consumerno)}>Download</button>
                                  <button className="delbutton" onClick={()=>close()}>CLOSE</button>
                                </div>
                        </div>
                    )
                }
            </Popup>
            <Popup trigger={<button className="delbutton" >Payment History</button>} modal nested>
                {
                    close => (
                        <div className='popup_bound'>
                              {isloading?
                                <button className="delbutton" onClick={()=>payhist(props.consumerno)}>Show History</button>:
                                <div className='all_item'>
                                    <table className='paytable'>
                                            <tr>
                                              <th>Receipt_no</th>
                                              <th>Amount</th>
                                              <th>Mode</th>
                                              <th>Date</th>
                                              <th>TransactionId</th>
                                            </tr>
                                      {payHist.map((x) => (
                                            <tr>
                                              <td>{x.receipt_no}</td>
                                              <td>{x.amount}</td>
                                              <td>{x.mode}</td>
                                              <td>{x.date}</td>
                                              <td>{x.transactionId}</td>
                                            </tr>
                                      ))} 
                                    </table>
                                    <button className="delbutton" onClick={()=>close()}>CLOSE</button>
                                </div>
                              }
                        </div>
                    )
                }
            </Popup>
          
          </div>
          {
            showdetails?
            <div>
              <p>consNo: {consNo}</p>
              <p>consName: {consName}</p>
              <p>consNo: {consNo}</p>
              <p>consAddress: {consAddress}</p>
              <p>availableBalance: {availableBalance}</p>
              <p>lastRechargeDate: {lastRechargeDate}</p>
              <button className="delbutton" onClick={() => closeview()}>CLOSE</button>
            </div>:<div/>
          }
    </div>
  )
}

export default Fav_id

