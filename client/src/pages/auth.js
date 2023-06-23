import { useState } from "react"
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export const Auth= () => {
    return(
        <>
         <div className="auth">
            <Login/>
            </div>
            <p>Nie posiadasz jeszcze konta?</p>
            <div className="auth">
            <Register/>
         </div>
         </>
    )
}

const Login = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [_,setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:3001/auth/login", {
                username,
                password
            })

            setCookies("access_token", res.data.token)

            window.localStorage.setItem("userID", res.data.userID)
            navigate("/")

        } catch(err){
            console.log(err)
        }
    }

    return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={"Logowanie"} onSubmit={onSubmit}/>
}

const Register = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const onSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password
            })
            alert("Poprawnie zarejestrowano nowego użytkownika.")
        } catch(err){
            console.log(err)
        }
    }

    return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={"Rejestracja"} onSubmit={onSubmit}/>
}

const Form = ({username,setUsername,password,setPassword,label,onSubmit}) =>{
    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username">Nazwa użytkownika:</label>
                    <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
    
                <div className="form-group">
                    <label htmlFor="password">Hasło:</label>
                    <input type="password" id="password" value={password} onChange={(event) =>setPassword(event.target.value)}/>
                </div>
    
                <button type="submit">{label}</button>
            </form>
        </div>
        )
}