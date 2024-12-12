import { useState } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { authApi } from "../../../services/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    token: "",
    new_password: "",
  });

  const resetMutation = useMutation({
    mutationFn: authApi.confirmPasswordReset,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetMutation.mutate(formData);
  };

  return (
    <Card className="w-full max-w-md p-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Enter New Password
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <Input
          label="Reset Token"
          value={formData.token}
          onChange={(e) => setFormData({ ...formData, token: e.target.value })}
        />

        <Input
          label="New Password"
          type="password"
          value={formData.new_password}
          onChange={(e) =>
            setFormData({ ...formData, new_password: e.target.value })
          }
        />

        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </form>
    </Card>
  );
}
