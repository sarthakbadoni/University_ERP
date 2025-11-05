import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff, RefreshCw, GraduationCap } from "lucide-react";

function generateCaptcha() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++)
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

export default function LoginPage({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [errors, setErrors] = useState({});

  const handleCaptchaRefresh = () => setCaptchaText(generateCaptcha());

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!userId.trim()) newErrors.userId = "User ID is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!captcha.trim()) newErrors.captcha = "CAPTCHA is required";
    else if (captcha.toUpperCase() !== captchaText)
      newErrors.captcha = "Incorrect CAPTCHA";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    let type;
    if (userId.toLowerCase() === "admin") {
      type = "admin";
    } else if (userId.startsWith("FAC")) {
      type = "faculty";
    } else {
      type = "student";
    }

    onLogin({ type, data: { userId } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 px-4">
      {/* Logo/Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-xl">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl text-white mb-2">University ERP System</h1>
        <p className="text-slate-400">Education Management System</p>
      </div>

      {/* Login Form Card */}
      <Card className="bg-slate-800 border-slate-700 w-full max-w-md">
        <CardContent className="p-6">
          <h2 className="text-xl text-white mb-6 text-center">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User ID Field */}
            <div>
              <Label htmlFor="userId" className="text-slate-200">
                User ID
              </Label>
              <Input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 mt-1"
                placeholder="Enter your user ID"
                autoFocus
              />
              {errors.userId && (
                <div className="text-red-400 text-sm mt-1">{errors.userId}</div>
              )}
            </div>
            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="text-slate-200">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  onClick={() => setShowPassword((show) => !show)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="text-red-400 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>
            {/* CAPTCHA Field */}
            <div>
              <Label className="text-slate-200">CAPTCHA</Label>
              <div className="flex items-center gap-2 mt-1 mb-2">
                <div className="bg-slate-700 border border-slate-600 px-4 py-2 rounded-md flex-1">
                  <span className="font-mono text-lg text-blue-400 tracking-widest select-none">
                    {captchaText}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleCaptchaRefresh}
                  className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-200"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <Input
                type="text"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Enter CAPTCHA"
              />
              {errors.captcha && (
                <div className="text-red-400 text-sm mt-1">{errors.captcha}</div>
              )}
            </div>
            {/* Submit Button */}
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
              type="submit"
            >
              Log In
            </Button>
          </form>
          {/* Demo Info */}
          <div className="mt-6 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
            <p className="text-xs text-slate-300 text-center">
              <strong>Demo:</strong> Use "admin" for admin, "FAC" prefix for faculty,
              or any other ID for student access
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-slate-500 text-sm">
        <p>© 2025 University ERP System. All rights reserved.</p>
      </div>
    </div>
  );
}
