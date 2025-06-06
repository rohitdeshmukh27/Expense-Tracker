import { React, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Password cannot be empty.");
      return;
    }

    setError(null);

    //login API call
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
          <p className="text-gray-500 text-sm">
            Please enter your details to Log In
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="mark@gmail.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Don't use simple passwords"
            type="password"
          />

          {error && (
            <p className="text-red-500 text-sm rounded-lg bg-red-50 p-3">
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary">
            Login
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              className="text-[#875cf5] font-medium hover:text-[#7140e0] 
                transition-colors duration-200"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
