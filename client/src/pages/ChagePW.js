import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const host = process.env.REACT_APP_TARGET || process.env.REACT_APP_LOCALHOST;
const port = process.env.REACT_APP_BACKEND_PORT;

function ChangePW() {

    const [ currentPassword, setCurrentPassword ] = useState("")
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmPW, setConfirmPW ] = useState("");
    const [ errors, setErrors ] = useState([]);

    const navigate = useNavigate();

    const goback = async () => {
        navigate("/profile")
    }
    
    const changePW = async (e) => {

        const storedUser = localStorage.getItem('user')
        const user = JSON.parse(storedUser)

        e.preventDefault();

        if (newPassword !== confirmPW) {
            setErrors(["New password and confirm password do not match."]);
            return;
        }

        try {
            const res = await fetch(`${host}:${port}/users/${user.user_id}/password`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                })
            })
    
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('user', JSON.stringify(data) )
                // alert(data.message);
                navigate("/profile")
            }

        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div className="form-wrapper">
                <h1> Change Password </h1>
                {errors.length > 0 && (
                    <div>
                        {errors.map((error, index) => (
                            <p key={index} style={{color: 'red' }}>{error}</p>
                        ))}
                    </div>
                )}
                <form onSubmit={changePW} className="form-container">
                        <input
                            name="currentPW" 
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={ (e) => setCurrentPassword(e.target.value) }
                        />
                        <input
                            name="newPW" 
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={ (e) => setNewPassword(e.target.value) }
                        />
                        <input
                            name="newPW" 
                            type="password"
                            placeholder="Confirm new Password"
                            value={confirmPW}
                            onChange={ (e) => setConfirmPW(e.target.value) }
                        />
                    <div className="button-wrapper">
                        <button type="button" onClick={goback}>Cancel</button>
                        <button type="submit">Change Password</button>
                    </div>
                </form>
        </div>
    )
}

export default ChangePW;