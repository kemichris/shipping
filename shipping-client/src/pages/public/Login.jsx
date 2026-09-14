import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { LoginForm } from "../../components/login/LoginForm";

import { login } from "../../services/auth.service";

export function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    keepSignedIn: false,
  });

  // const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    //   setErrors((prev) => ({
    //     ...prev,
    //     [name]: undefined,
    //   }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await login(formData);

      console.log(res);

      const token = res?.data?.accessToken;
      const role = res?.data?.user?.role;
      const username = res?.data?.user?.username;
      const profileImage = res?.data?.user?.profileImage;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        localStorage.setItem("profileImage", profileImage);
      }

      toast.success("Login successful!");

      navigate("/admin");
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);

      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 403) {
        toast.error("Email verification required.");

        setTimeout(() => {
          navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`);
        }, 1500);

        return;
      }

      if (status === 423) {
        toast.error(message);
        return;
      }

      toast.error(message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Shipping | Login</title>

      <LoginForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </>
  );
}
