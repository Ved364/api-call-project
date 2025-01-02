import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [, setEmail] = useState([]);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    setEmail(email);

    setPassword("");

    alert("Login details saved!");

    navigate("/home");
  };
  return (
    <div className="loginPageBackground">
      <div className="loginContainer">
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="inputBox">
              <input
                type="email"
                name="email"
                required
                placeholder="Username"
              />
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
              />
            </div>
            <div className="inputBox">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
