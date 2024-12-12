import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { authApi } from "../../../services/api";
import { useMutation } from "@tanstack/react-query";

export function RequestResetForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState<string | null>(null);

  const requestResetMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await authApi.requestPasswordReset({ email });
      setResetToken(response.token);
      return response;
    },
  });

  // После получения токена показываем только этап подтверждения
  if (resetToken) {
    return (
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Reset Password</h1>

        <div className="space-y-6">
          <div className="p-4 bg-green-50 text-green-700 rounded">
            <p className="font-medium mb-2">
              Reset token generated for {email}
            </p>
            <p className="text-xl font-mono">{resetToken}</p>
          </div>

          <Button
            onClick={() =>
              navigate("/reset-password/confirm", {
                state: { email, token: resetToken },
              })
            }
            className="w-full"
          >
            Continue to Password Reset
          </Button>
        </div>
      </Card>
    );
  }

  // Первоначальная форма запроса токена
  return (
    <Card className="w-full max-w-md p-8">
      <h1 className="text-2xl font-bold text-center mb-8">Reset Password</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestResetMutation.mutate(email);
        }}
        className="space-y-6"
      >
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" className="w-full">
          Request Reset Token
        </Button>
      </form>
    </Card>
  );
}
