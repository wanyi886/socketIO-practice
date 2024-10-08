import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const host = process.env.REACT_APP_TARGET || process.env.REACT_APP_LOCALHOST;
const port = process.env.REACT_APP_BACKEND_PORT;

function Profile() {

    const navigate = useNavigate();

    const storedUser = localStorage.getItem('user')
    const user = JSON.parse(storedUser)

    const logout = async () => {
        try {
            const res = await fetch(`${host}:${port}/auth`, {
                method: "DELETE",
                credentials: "include"
            })

            if (res.ok) {
                localStorage.removeItem('user')
                navigate("/login")
            }

        } catch(err) {
            console.error(err)
        }
    }
    
    return (
        <div className="form-wrapper">
            <h1>Profile</h1>
            <div className="form-container">
            <h3>{user.username}</h3>
                <a href="/change_password">
                    Change Password
                </a>
                <button onClick={logout}>Log Out</button>
            </div>
        </div>
    )
}

export default Profile