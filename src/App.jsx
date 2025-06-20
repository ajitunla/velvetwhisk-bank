import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // handle authentication
    console.log("Logging in", { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>SpellWish Finance</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
        <div className="login-links">
          <a href="/forgot">Forgot password?</a>
          <a href="/signup">Create Account</a>
        </div>
      </div>
    </div>
  );
}

export default App;
