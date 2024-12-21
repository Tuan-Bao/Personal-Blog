import { useState } from "react";
import "./Login.css";

const Login = (props) => {
  const { setToken } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [curState, setCurState] = useState("Login");

  const handlerLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang

    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setError("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const handlerRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log(data.message);
        setCurState("Login");
        setUsername("");
        setPassword("");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setError("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const handlerSubmit = (e) => {
    if (curState === "Login") {
      handlerLogin(e);
    } else {
      handlerRegister(e);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handlerSubmit}>
        {curState === "Login" ? <h2>Đăng nhập</h2> : <h2>Đăng ký</h2>}
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          {curState === "Login" ? (
            <label>Tên đăng nhập</label>
          ) : (
            <label>Tên đăng ký</label>
          )}
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
        {curState === "Login" ? (
          <button className="login-button" type="submit">
            Đăng nhập
          </button>
        ) : (
          <button className="login-button" type="submit">
            Đăng ký
          </button>
        )}

        {curState === "Login" ? (
          <p>
            Bạn chưa có tài khoản ?{" "}
            <span onClick={() => setCurState("Register")}>Nhấn vào đây</span>
          </p>
        ) : (
          <p>
            Bạn đã có tài khoản ?{" "}
            <span onClick={() => setCurState("Login")}>Nhấn vào đây</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
