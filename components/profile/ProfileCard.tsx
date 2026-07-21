"use client";
import { useState } from "react";
import ProfileCard from "../profile/page"

export default function ProfilePage() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowProfile(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View Profile
        </button>
      </div>

      {/* Profile Card */}
      {showProfile && (
        <div className="mt-10">
          <ProfileCard
            name="Meraj Ansari"
            email="meraj@example.com"
            bio="Full-stack developer passionate about creating modern web apps."
            avatarUrl="/avatar.jpg"
            role="User"
            location="Mumbai, India"
            joinedDate="March 2024"
            editable={true}
            onEdit={() => alert("Edit profile clicked!")}
            stats={[
              { label: "Projects", value: 25 },
              { label: "Followers", value: 1800 },
              { label: "Following", value: 340 },
              { label: "Stars", value: 96 },
            ]}
          />
        </div>
      )}
    </div>
  );
}
