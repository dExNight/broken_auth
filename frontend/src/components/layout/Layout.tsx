import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                to="/"
                className="flex items-center text-gray-800 hover:text-gray-600"
              >
                <span className="text-xl font-bold">Vulnerable Auth Demo</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/search"
                className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md"
              >
                Search Users
              </Link>

              <Link
                to="/login"
                className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
