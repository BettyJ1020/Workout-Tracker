import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 引入 useNavigate
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login Success: ", data);

        // 確保 userId 正確存入
        if (!data.userId) {
          throw new Error("Invalid login response: missing userId");
        }

        // 檢查並初始化 Workout Routine
        await fetch(`${API_BASE_URL}/?user_id=${data.userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        localStorage.setItem("userId", data.userId); // 儲存用戶 ID
        localStorage.setItem("username", data.username); // 儲存用戶名稱

        alert(data.message);
        navigate("/todo"); // 跳轉到 Workout Routine 頁面
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Workout Tracker</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
