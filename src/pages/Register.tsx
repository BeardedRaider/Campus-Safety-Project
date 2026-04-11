// -------------------------------------------------------------
// Page: Register
// Purpose: Create a new user account.
// -------------------------------------------------------------

import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import AuthPageWrapper from "../components/auth/AuthPageWrapper";
import AnimatedButton from "../components/ui/AnimatedButton";

export default function Register() {
  const navigate = useNavigate();

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

  // Animated button states
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, general: "" });
  };

  const getPasswordStrength = (pw: string) => {
    if (pw.length < 6) return "Weak";
    if (pw.length < 10) return "Medium";
    return "Strong";
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
      newErrors.email = "Enter a valid email address.";
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
      setError(true);
      setTimeout(() => setError(false), 1200);
      return;
    }

    // Start loading animation
    setIsLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      const result = registerUser(form.name, form.email, form.password);

      if (!result.success) {
        setIsLoading(false);
        setError(true);
        setErrors({ ...newErrors, general: result.message });
        setTimeout(() => setError(false), 1200);
        return;
      }

      // Success animation
      setIsLoading(false);
      setSuccess(true);

      // Wait for full animation to finish before redirect
      setTimeout(() => {
        navigate("/login");
      }, 2200); // full success animation duration
    }, 800);
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

          <div>
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

            {form.password && (
              <p className="text-xs text-gray-400 mt-1">
                Strength: {getPasswordStrength(form.password)}
              </p>
            )}
          </div>

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

          <AnimatedButton
            onClick={() => {}}
            isLoading={isLoading}
            success={success}
            error={error}
            idleText="Create Account"
            loadingText="Creating account..."
            successText="Account created!"
            errorText="Try again"
          />
        </form>
      </AuthCard>
    </AuthPageWrapper>
  );
}
