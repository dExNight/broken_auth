import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Card } from "../../../components/ui/Card";
import { useAuth } from "../hooks/useAuth";

export function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login, isLoading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Log in to the system
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-danger-50 text-danger-500 rounded-md">
              {(error as Error).message}
            </div>
          )}

          <Input
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoFocus
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="flex items-center justify-between">
            <Link
              to="/reset-password"
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>

          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have account? </span>
            <Link
              to="/register"
              className="text-primary-600 hover:text-primary-500"
            >
              Register
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
