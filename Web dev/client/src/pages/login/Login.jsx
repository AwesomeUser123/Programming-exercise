import "./login.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
      username: "",
      password: "",
    });
    const [err, setErr] = useState(null);
  
    const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", inputs);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      sessionStorage.setItem("token", res.data.token);  // store JWT per tab
      navigate("/mainmenu");


      
    } 
    catch (err) {
      if (err.response && err.response.data) {
        setErr(err.response.data);
      } else {
        setErr("An unexpected error occurred.");
      }
      console.log(err);
    }

  };
  
  
  return  (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Restaurant order serivce.</h1>
          <p>
            Restaurent order website
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
          <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input 
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            
            <input 
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Login;
