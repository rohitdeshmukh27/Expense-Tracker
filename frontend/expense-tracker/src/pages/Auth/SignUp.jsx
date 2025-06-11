import { React, useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/UserContext";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

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

    try {
      // Upload image
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-gray-900">
            Create an account
          </h3>
          <p className="text-gray-500 text-base">
            Join us today by entering your details below
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-8">
          {/* Profile Photo Section */}
          <div className="py-4">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
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
              <p className="text-red-500 text-sm rounded-lg bg-red-50 p-4">
                {error}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#875cf5] text-white py-3 px-4 rounded-xl
              font-medium text-base transition-all duration-200
              hover:bg-[#7140e0] focus:ring-2 focus:ring-[#875cf5]/20
              active:transform active:scale-[0.98]"
          >
            Create Account
          </button>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 text-base mt-6">
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
