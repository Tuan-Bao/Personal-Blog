import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Đăng nhập</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Tên đăng nhập</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-button" type="submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
