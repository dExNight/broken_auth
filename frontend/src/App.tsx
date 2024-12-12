import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { ProfilePage } from "./features/profile/pages/ProfilePage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import { RequestResetPage } from "./features/auth/pages/RequestResetPage";
import { ResetPasswordPage } from "./features/auth/pages/ResetPasswordPage";
import { SearchPage } from "./features/users/pages/SearchPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<LoginPage />} />
            <Route path="/reset-password" element={<RequestResetPage />} />
            <Route
              path="/reset-password/confirm"
              element={<ResetPasswordPage />}
            />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
