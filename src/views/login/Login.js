import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    }

    return ( 
        <div>
            <h1>Login</h1>
            <p>Log in to your account</p>

            <form onSubmit={(e)=>handleLogin(e)}>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>

            <p>Don't have an account? <a href="/register">Register</a></p>

        </div>
     );
}
 
export default Login;