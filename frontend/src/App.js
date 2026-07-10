import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import SignIn from "./components/SignIn";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;