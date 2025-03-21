import { useState } from "react";
import axios from "axios"
import {useCookies,CookiesProvider} from "react-cookie"
import {useNavigate} from "react-router-dom"
export const Auth = () => {

  
  return(
    <div className="form-field">
      <Login/>
      <Register/>
    </div>
  )
}


const Login = () => {
  
  const [username, setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate()
  
  const [ _ , setCookies ] = useCookies(["access_token"]) 

  const Submit = async ( event ) => {
    event.preventDefault();

    try {
     const response = await axios.post("http://localhost:3001/auth/login",{
        username,
        password
      })
      
      setCookies("access_token",response.data.token)
      window.localStorage.setItem("UserID",response.data.UserID)
      navigate("/")

 
    } catch (error) {
      console.error(error)
      alert("User Not Exist!")
    }

  }
  
  return (
    <div>
    <Form username={username}
     setUsername={setUsername}
     password={password}
     setPassword={setPassword}
     label="Login"
     onSubmit={Submit} />
    </div>
  )
}
const Register = () => {
  
  const [username, setUsername] = useState("");
  const [password,setPassword] = useState("");

  const Submit = async ( event )=>{
  
    event.preventDefault();
    try {

      await axios.post("http://localhost:3001/auth/register",{username,password})
      alert("User Successfully Registered!")
      
    } catch (error) {
      console.error(error)
    }

  }
  
  return (
    <div>
    <Form 
    username={username} 
    setUsername={setUsername} 
    password={password} 
    setPassword={setPassword} 
    label="Register"
    onSubmit={Submit} />
    </div>
  )
}

const Form = ({username,setUsername,password,setPassword,label,onSubmit})=> {
  return(
    <form onSubmit={onSubmit}>
    <h1>{label}</h1>
    <div className="form">
    <label htmlFor="username">Username</label>
    <input 
    type="text" 
    placeholder="username" 
    onChange={(event)=>setUsername(event.target.value)}
    value={username}
    />
    </div>
    <div className="form">
    <label htmlFor="password">Password</label>
    <input 
    type="password" 
    placeholder="password" 
    onChange={(event)=>setPassword(event.target.value)}
    value={password}
    />
    </div>
    <button>{label}</button>
    </form>
  )
}