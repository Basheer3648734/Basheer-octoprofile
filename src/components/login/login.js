/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState,useEffect } from "react";
import logo from "../../logo.svg";
import modules from "./login.module.css";
import { useHistory, Redirect } from "react-router-dom";
import SearchHistory from "../search_history/SearchHistory"
import Modal from '../modal/Modal'
function login() {
  const history = useHistory();
  const [userHistory,setUserHistory]=useState([])
  const [userName, setUserName] = useState("");
  const [showModal,setShowModal]=useState({status:false,message:''})

  const getUserHistory=()=>{
    let a=localStorage.getItem('searchHistory')
    if(a!=null || a!=undefined){
    setUserHistory(JSON.parse(a))
    }
  }
  useEffect(getUserHistory,[])
 const clearAllHistory=(e)=>{
   localStorage.setItem('searchHistory',JSON.stringify([]))
   setShowModal({status:true,message:'search history cleared successfully'})
  getUserHistory()
 }
 const removeAUserFromHistory=(key)=>{
   const newHistory=userHistory.filter(user=>user.name!=key)
   localStorage.setItem('searchHistory',JSON.stringify(newHistory))
   setShowModal({status:true,message:'user removed successfully'})
getUserHistory()
 }
  const submitHandler = (e) => {
    e.preventDefault();
   
    history.push(`/users/${userName}`);
  
    // <Redirect to={`/users/${userName}`} />;
    return setUserName("");
  };
  return (
    <div className={modules.login}>
      {/* logo */}
      <img
        src="https://image.flaticon.com/icons/svg/733/733553.svg"
        alt="logo"
        className={modules.login__logo}
      />
      {/* text-> Find your octaprofile */}
      <h1 className={modules.login__label}>Find your octaProfile</h1>
      {/* input box->username */}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className={modules.login__input}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </form>
      {/* user search history */}
      <SearchHistory users={userHistory} removeAUserFromHistory={removeAUserFromHistory} clearAllHistory={clearAllHistory}/>
  {showModal.status?<Modal>{showModal.message}</Modal>:null}

    </div>
  );
}

export default login;
