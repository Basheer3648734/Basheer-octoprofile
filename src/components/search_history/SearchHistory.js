import React from 'react'
import modules from './SearchHistory.module.css'

import UserComponent from './user_component/UserComponent'

 const SearchHistory=({users,clearAllHistory,removeAUserFromHistory})=>{
     
    return (
        <div className={modules.SearchHistory}>
            <div className={modules.SearchHistory__main}>
            <h3>Recent searches</h3>
            <button onClick={clearAllHistory}>Clear all</button>
            </div>
            <div className={modules.userList}>
                {users?.map((user)=>(
                    <UserComponent removeAUserFromHistory={removeAUserFromHistory} name={user.name} avatar={user.avatar} key={user.name}/>))}
            </div>
        </div>
    )
}
export default SearchHistory