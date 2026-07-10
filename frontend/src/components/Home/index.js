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
      const parsed_response = data.answer; // or wherever your response is stored

        const cleaned = parsed_response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
        
        const parsedAnswer = JSON.parse(cleaned);
        setAnswer(parsedAnswer);

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
<div className="home-page">
  <header className="navbar">
    <div className="logo-section">
      <div className="logo">🤖</div>

      <div>
        <h2>AI Assistant</h2>
        <p>Powered by AI</p>
      </div>
    </div>

    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </header>

  <main className="hero">

    <div className="glass-card">

      <h1>How can I help you today?</h1>

      <p className="subtitle">
        Ask any question and receive an AI-powered response in seconds.
      </p>

      <textarea
        className="question-box"
        placeholder="Ask me anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={7}
      />

      <button
        className="submit-btn"
        onClick={submitQuestion}
      >
        ✨ Generate Answer
      </button>

      {loading && (
        <div className="loading">
          <div className="loader"></div>
          <span>Thinking...</span>
        </div>
      )}

      {answer && (
        <div className="answer-card">

          <div className="answer-header">
            📄 AI Response
          </div>

          <ul>
            {answer.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

        </div>
      )}

    </div>

  </main>
</div>
  );

}


export default Home;