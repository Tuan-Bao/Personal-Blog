import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
const App = () => {
  const [token, setToken] = useState("");

  return (
    <div className="app">
      <Login />
    </div>
  );
};

export default App;
