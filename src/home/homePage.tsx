import React, { useEffect, useState } from "react";
import {routes} from "../Routers"
import { Link } from "react-router-dom";
// import { AuthContext } from "../contextAuth/AuthProvider";
import { useUserStore } from "../store/userStore";
import { Connect } from "../connect/Connect";
import { UserFromServerT, UserT } from "../types/user";

export const Home = () => {
  const {signOut, user, signIn} = useUserStore();
  const [users, setUsers] = useState<UserFromServerT[]>([])
  const [chanhed, setChanged] = useState(false)
  // const stayC = () => {
  //   user ? (
  //     signIn({...user, "c++":true})
  //     ) : alert("")
  // }

  const changeC = async() => {
    // const {user, signIn} = useUserStore();

    if(user){
        signIn({...user, "c++":true})
        console.log({...user, "c++":true})
        const response = await Connect.axiosUpdate({...users.filter(el => el.name === user.name)[0], "c++":true})  
        console.log(response.data.message)  
        console.log({...users.filter(el => el.name === user.name)[0], "c++":true})
        setChanged(chanhed => !chanhed)
    }
}
  

  const get_users = async() => {
    const response = await Connect.axiosGet()
    console.log(response.data)
    setUsers(response.data)
  }

  useEffect(() => {
    get_users()
  },[chanhed])



  console.log(user ? user["c++"]: "user haven't")

  return(
    <div>
      {user?.name ? <>
        <h1>
          Welcome, {user.name}!
          Ur c++: {user["c++"] ?
          <p>yes</p> 
          : <>
          <p>no</p>
          <button  onClick={changeC}>stay c++</button>
          </>}
        </h1>
        <button onClick={signOut}>Logout</button>
        </> : <>
        <h1>Authorization pls</h1>
        {/* <button onClick={()=>signIn({name: "Max", password: "lox"})}>Authorization</button> */}
        </>
      }
      <Link to={routes.registration}>To autorith</Link>
      <div>
      {users?.map((userD) => {
            return <div key={userD.id}>
              <p>Key: {userD.id}</p>
              <p>Name: {userD.name}</p>
              <p>Password: {userD.password}</p>
              <p>C++: {(userD["c++"] == true) ? "yes" : "no"}</p>
            </div>
            })}
      </div>
    </div>
  )
}