// -------------------------------------------------------------
// Page: Register
// Purpose: Create a new user account.
// -------------------------------------------------------------

import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { registerUser } from "../services/authService";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import AuthPageWrapper from "../components/auth/AuthPageWrapper";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    general: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, general: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirm: "",
      general: "",
    };

    let hasError = false;

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email.";
      hasError = true;
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      hasError = true;
    }

    if (form.password !== form.confirm) {
      newErrors.confirm = "Passwords do not match.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const result = registerUser(form.name, form.email, form.password);

    if (!result.success) {
      setErrors({ ...newErrors, general: result.message });
      return;
    }

    login(result.user);
    navigate("/app");
  };

  return (
    <AuthPageWrapper
      rightLink={{
        label: "Already have an account?",
        to: "/login",
      }}
    >
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-wide">Create Account</h1>
        <p className="text-gray-400 mt-1">
          Join thousands of students staying safe together.
        </p>
      </div>

      <AuthCard>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {errors.general && (
            <p className="text-red-400 text-sm">{errors.general}</p>
          )}

          <AuthInput
            label="Full Name"
            name="name"
            placeholder="John Smith"
            icon={<User size={18} />}
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          <AuthInput
            label="Email"
            name="email"
            type="email"
            placeholder="your.email@university.edu"
            icon={<Mail size={18} />}
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <AuthInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <AuthInput
            label="Confirm Password"
            name="confirm"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            value={form.confirm}
            onChange={handleChange}
            error={errors.confirm}
          />

          <button type="submit" className="btn-base btn-cyan w-full mt-2">
            Create Account
          </button>
        </form>
      </AuthCard>
    </AuthPageWrapper>
  );
}
