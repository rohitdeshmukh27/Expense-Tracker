import { React, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Full name cannot be ");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Password cannot be empty.");
      return;
    }
    setError("");

    //SignIn API call
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">
            Create an account
          </h3>
          <p className="text-gray-500 text-sm">
            Join us today by entering your details below
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Profile Photo Section */}
          <div className="py-2">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="you@example.com"
              type="email"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Create a strong password"
              type="password"
            />

            {error && (
              <p className="text-red-500 text-sm rounded-lg bg-red-50 p-3">
                {error}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary">
            Create Account
          </button>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              className="text-[#875cf5] font-medium hover:text-[#7140e0] 
                transition-colors duration-200"
              to="/login"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
