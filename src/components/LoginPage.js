import React, { useState } from "react";
import { Button } from "./ui/button"; // Named import for Button!

export default function LoginPage({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [errors, setErrors] = useState({});

  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
  }
  const handleCaptchaRefresh = () => setCaptchaText(generateCaptcha());

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!userId.trim()) newErrors.userId = "User ID is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!captcha.trim()) newErrors.captcha = "CAPTCHA is required";
    else if (captcha.toUpperCase() !== captchaText) newErrors.captcha = "Incorrect CAPTCHA";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    // Demo role check: faculty starts with "FAC"
    let type = userId.startsWith("FAC") ? "faculty" : "student";
    onLogin({ type, data: { userId } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-800 px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
        <h2 className="text-xl font-bold mb-3 text-blue-700">Login to University ERP</h2>
        <label className="block mb-2 font-semibold">User ID</label>
        <input type="text" value={userId} onChange={e => setUserId(e.target.value)}
          className="w-full p-2 rounded mb-2 bg-blue-50" autoFocus />
        {errors.userId && <div className="text-red-600 text-xs mb-1">{errors.userId}</div>}

        <label className="block mb-2 font-semibold">Password</label>
        <div className="flex mb-2">
          <input type={showPassword ? "text" : "password"} value={password}
            onChange={e => setPassword(e.target.value)} className="w-full p-2 rounded-l bg-blue-50" />
          <button type="button" className="p-2 bg-gray-200 rounded-r" onClick={() => setShowPassword(show => !show)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <div className="text-red-600 text-xs mb-1">{errors.password}</div>}

        <label className="block mb-2 font-semibold">CAPTCHA</label>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-200 font-mono px-2 py-1 rounded border text-blue-800">{captchaText}</span>
          <button type="button" className="text-xs text-indigo-700 underline" onClick={handleCaptchaRefresh}>Refresh</button>
        </div>
        <input type="text" value={captcha} onChange={e => setCaptcha(e.target.value)}
          className="w-full p-2 rounded mb-2 bg-blue-50" />
        {errors.captcha && <div className="text-red-600 text-xs mb-1">{errors.captcha}</div>}

        <Button className="w-full bg-blue-700 text-white py-2 mt-2 rounded" type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
}
