import { useEffect, useState } from "react";
import BlogPage from "./components/BlogPage/BlogPage";
import Login from "./components/Login/Login";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import BlogPost from "./components/BlogPost/BlogPost";

const App = () => {
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);

  const loadArticles = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/api/articles/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const curTime = Math.floor(Date.now() / 1000);
      return decoded.exp > curTime;
    } catch (error) {
      console.error("Lỗi khi giải mã token:", error);
      return false;
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && isTokenValid(savedToken)) {
      setToken(savedToken);
      loadArticles(savedToken);
    } else {
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <Router>
      <div className="app">
        {!token ? (
          <Login setToken={setToken} />
        ) : (
          <ProtectedRoutes posts={posts} setToken={setToken} />
        )}
      </div>
    </Router>
  );
};

const ProtectedRoutes = ({ posts, setToken }) => {
  const navigate = useNavigate(); // Bây giờ, useNavigate được sử dụng trong Router context

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<BlogPage logOut={logOut} posts={posts} />} />
      <Route path="/article/:id" element={<BlogPost posts={posts} />} />
    </Routes>
  );
};

export default App;
