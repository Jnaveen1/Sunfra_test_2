import "./index.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function SignIn(){

  const navigate = useNavigate();


  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


const handleSignup = async(e)=>{
  e.preventDefault();
  if(!name || !email || !password){
    alert("Enter all details ") ; 
    return ; 
  }

  try {
    const response = await fetch(
      "http://127.0.0.1:5000/signup",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          name,
          email,
          password

        })
      }
    );

    const data = await response.json();
    alert(data.message);
    if(response.ok){
      navigate("/");
    }
  }
  catch(error){
    console.log(error);
    alert("Server error");
  }
};

  return(
    <div className="signup-container">
    <form className="signup-card" onSubmit={handleSignup}>
        <h2>Create Account ✨</h2>
        <p className="subtitle">Join us and get started</p>

        <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <input
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Create Account</button>

        <p className="login-link">
        Already have an account?{" "}
        <Link to="/">Login</Link>
        </p>
    </form>
    </div>
  );
}


export default SignIn;