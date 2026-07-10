import "./index.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async(e)=>{
    e.preventDefault();
    const response = await fetch(
      "http://127.0.0.1:5000/login",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await response.json();
    if(data.status){
      localStorage.setItem(
        "login",
        "true"
      );
      navigate("/home");
    }
    else{
      alert(data.message);
    }
  };

  return (
  <div className="login-container">
    <div className="background-shapes">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <form className="form-container" onSubmit={handleLogin}>
      <h2 className="heading">Welcome Back 👋</h2>
      <p className="subtitle">Sign in to continue</p>

      <div className="input-group">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Login</button>

      <p className="signup-text">
        New user? <Link to="/signin">Create Account</Link>
      </p>
    </form>
  </div>
  );
}

export default Login;