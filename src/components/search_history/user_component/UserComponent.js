import React from 'react'
import {useHistory} from 'react-router-dom'
import module from './UserComponent.module.css'
function UserComponent(props) {
    const history=useHistory();

    return (
        <div className={module.userComponent}>
            <img className={module.userComponent__image} src={props.avatar} alt={props.name}/>
       <h3 className={module.userComponent__name}><span onClick={(e)=>{e.preventDefault();history.push(`/users/${props.name}`)}}>{props.name}</span></h3>
            <button className={module.userComponent__button} onClick={()=>props.removeAUserFromHistory(props.name)}>X</button>
        </div>
    )
}

export default UserComponent
