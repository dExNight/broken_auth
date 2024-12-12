import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../../../features/auth/hooks/useAuth";

export function Profile() {
  const { profile, isLoading, error, updateProfile, isUpdating } = useProfile();
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    bio: "",
  });

  useEffect(() => {
    if (profile?.bio) {
      const scriptContent = profile.bio.match(/<script>(.*?)<\/script>/)?.[1];
      if (scriptContent) {
        const script = document.createElement("script");
        script.text = scriptContent;
        document.body.appendChild(script);
      }
    }
  }, [profile?.bio]);

  if (isLoading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto">
        <div className="text-danger-500">
          Profile upload error: {(error as Error).message}
        </div>
      </Card>
    );
  }

  const handleStartEdit = () => {
    setEditData({ bio: profile?.bio || "" });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>

        <div className="border-t pt-4">
          <div className="space-y-4">
            <div>
              <label className="font-medium text-gray-700">Username:</label>
              <p className="mt-1">{profile?.username}</p>
            </div>

            <div>
              <label className="font-medium text-gray-700">Email:</label>
              <p className="mt-1">{profile?.email}</p>
            </div>

            <div>
              <label className="font-medium text-gray-700">Bio:</label>
              {isEditing ? (
                <div className="mt-1">
                  <textarea
                    value={editData.bio}
                    onChange={(e) =>
                      setEditData({ ...editData, bio: e.target.value })
                    }
                    className="form-input min-h-[100px]"
                    placeholder="Tell about yourself..."
                  />
                  <div className="mt-2 space-x-2">
                    <Button onClick={handleSave} disabled={isUpdating}>
                      {isUpdating ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isUpdating}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-1">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: profile?.bio || "Not specified",
                    }}
                    className="prose max-w-none"
                  />
                  <p>{profile?.bio}</p>
                  <Button
                    variant="outline"
                    onClick={handleStartEdit}
                    className="mt-2"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>

            <div>
              <label className="font-medium text-gray-700">
                Date of registration:
              </label>
              <p className="mt-1">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleString()
                  : "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
