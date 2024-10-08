import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const host = process.env.REACT_APP_TARGET || process.env.REACT_APP_LOCALHOST;
const port = process.env.REACT_APP_BACKEND_PORT;


function Login() {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");


    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${host}:${port}/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            if (res.ok) {
                const data = await res.json();
                
                localStorage.setItem('user', JSON.stringify(data) )
                navigate("/profile")
            }

        } catch(err) {
            console.error(err)
        }


    }

    return (
        <div className="form-wrapper">
            <h1> Log In </h1>
            <form onSubmit={login} className="form-container">
                    <input
                        name="email" 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                    />
                    <input
                        name="password" 
                        type={showPassword? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }
                    />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;