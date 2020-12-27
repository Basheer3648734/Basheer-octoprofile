import React,{useState,useEffect} from 'react'
import module from './modal.module.css'
function Modal(props) {
    const [hide,setHide]=useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setHide(true)
            // console.log("hidden")
        },3000)
    },[])
    return (
        <div className={module.modal} style={{top: hide?'-10%':'2%',opacity:hide?0:1}}>
            <p>{props.children}</p>
        </div>
    )
}

export default Modal
