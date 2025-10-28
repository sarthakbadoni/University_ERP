import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { AlertCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState('ABC123');
  const [errors, setErrors] = useState({});

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setCaptcha('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    if (!captcha.trim()) {
      newErrors.captcha = 'CAPTCHA is required';
    } else if (captcha.toUpperCase() !== captchaText) {
      newErrors.captcha = 'CAPTCHA is incorrect';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onLogin(studentId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl text-gray-900 dark:text-white">University ERP System</CardTitle>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Student Portal Login</p>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId" className="text-gray-700 dark:text-gray-200">Student ID</Label>
              <Input
                id="studentId"
                type="text"
                placeholder="Enter your student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className={errors.studentId ? 'border-red-500' : ''}
              />
              {errors.studentId && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.studentId}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'border-red-500' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="captcha" className="text-gray-700 dark:text-gray-200">CAPTCHA</Label>
              <div className="flex gap-2 items-center">
                <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 rounded border border-gray-300 dark:border-gray-600 select-none text-lg tracking-wider font-mono">
                  {captchaText}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateCaptcha}
                >
                  <RefreshCw size={16} />
                </Button>
              </div>
              <Input
                id="captcha"
                type="text"
                placeholder="Enter CAPTCHA"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className={errors.captcha ? 'border-red-500' : ''}
              />
              {errors.captcha && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.captcha}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>

            <div className="text-center space-y-2">
              <button
                type="button"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                onClick={() => alert('Forgot Password functionality would be implemented here')}
              >
                Forgot Password?
              </button>
              <br />
              <button
                type="button"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                onClick={() => alert('Forgot Student ID functionality would be implemented here')}
              >
                Forgot Student ID?
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}