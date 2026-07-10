import "./index.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";


function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("login");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  if(!isLoggedIn){
    return <Navigate to="/" />;
  }

  const handleLogout = ()=>{
    localStorage.removeItem("login");
    navigate("/");
  };

  const submitQuestion = async()=>{
    if(!question){
        alert("Please enter your question");
      return;
    }

    try{

      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/ask",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            question:question
          })
        }
      );

      const data = await response.json();
      console.log(data.answer);
      setAnswer(JSON.parse(data.answer));

    }

    catch(error){
      console.log(error);
      setAnswer("Server error");
    }
    finally{
      setLoading(false);
    }
  };




  return (
    <div className="home-container">
      <header className="home-header">
        <h2>
          My Home Page
        </h2>
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <div className="home-content">
        <h1>
          Ask Your Question
        </h1>
        <textarea
          className="question-box"
          placeholder="Enter your question..."
          value={question}
          onChange={(e)=>setQuestion(e.target.value)}
          cols={100} rows={5}
        />
        <button
          className="submit-btn"
          onClick={submitQuestion}
        >
          Submit
        </button>

        {
          loading &&
          <p>
            Getting answer...
          </p>
        }

        {

          answer &&
          <div className="answer-box">
            <h3>
              Answer:
            </h3>
            <ul>
              {answer.map(eachPoint=><li>{eachPoint}</li>)}
            </ul>
          </div>
        }
      </div>
    </div>
  );

}


export default Home;