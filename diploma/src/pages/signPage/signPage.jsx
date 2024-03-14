import React, { useState } from "react";


import loginService from "../../service/loginService";


import "./dist/signPage.css"


export function SignPage(){


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleLogin = async () => {
        try {
            const response = await loginService.login(email, password);
            console.log(response);
            window.location.href = "/";
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Email або пароль неправильні");
        }
    };




    return(
        <div className="sign_page">
            <div className="sign_in_menu">
                <label htmlFor="email">EMAIL</label>
                <input type="text" id="email" value={email} onChange={handleEmailChange} />

                <label htmlFor="password">PASSWORD</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} />

                <div onClick={handleLogin}>Submit</div>
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    )
}