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

    <div className="signin-container">


      <h2>Sign Up</h2>


      <form onSubmit={handleSignup}>


        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />


        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />


        <button type="submit">
          Sign Up
        </button>


      </form>


      <p>

        Already have account?

        <Link to="/">
          Login
        </Link>

      </p>


    </div>

  );

}


export default SignIn;