import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import { authApi } from "../../../services/api";
import { useQuery } from "@tanstack/react-query";

export function UserSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Простой дебаунс для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", debouncedQuery],
    queryFn: () =>
      debouncedQuery
        ? authApi.searchUsers(debouncedQuery)
        : Promise.resolve([]),
    enabled: debouncedQuery.length > 0,
  });

  // Уязвимая функция для исполнения XSS из bio
  useEffect(() => {
    if (users) {
      users.forEach((user) => {
        if (user.bio) {
          const scriptContent = user.bio.match(/<script>(.*?)<\/script>/)?.[1];
          if (scriptContent) {
            const script = document.createElement("script");
            script.text = scriptContent;
            document.body.appendChild(script);
          }
        }
      });
    }
  }, [users]);

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Search Users</h2>

          <Input
            label="Search by username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter username..."
            className="mb-6"
          />

          {isLoading && <div>Searching...</div>}

          <div className="space-y-4">
            {users?.map((user) => (
              <Card key={user.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{user.username}</h3>
                    <div
                      className="mt-2 prose"
                      // Намеренная XSS уязвимость
                      dangerouslySetInnerHTML={{
                        __html: user.bio || "No bio provided",
                      }}
                    />
                    <div className="mt-2 text-sm text-gray-500">
                      Registered:{" "}
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {users?.length === 0 && debouncedQuery && (
            <div className="text-center text-gray-500">No users found</div>
          )}
        </div>
      </Card>
    </div>
  );
}
