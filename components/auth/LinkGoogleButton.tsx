"use client";
import React from "react";
import Image from "next/image";

interface LinkGoogleButtonProps {
  onSuccess?: () => void;
}

export default function LinkGoogleRedirectButton({ onSuccess }: LinkGoogleButtonProps) {
  const handleLinkGoogle = () => {
    // Store the onSuccess callback in sessionStorage so it can be retrieved after redirect
    if (onSuccess) {
      sessionStorage.setItem('linkGoogleSuccess', 'true');
    }
    
    // Navigate to our start route which requires a session (server will redirect to Google)
    window.location.href = "/api/auth/link/google/start";
  };

  // Check if we just returned from a successful Google link
  React.useEffect(() => {
    const wasSuccessful = sessionStorage.getItem('linkGoogleSuccess');
    if (wasSuccessful === 'true') {
      sessionStorage.removeItem('linkGoogleSuccess');
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [onSuccess]);

  return (
    <div
      onClick={handleLinkGoogle}
      className="w-full text-sm cursor-pointer hover:scale-105 transition flex gap-2 py-2 px-3 -ml-4 rounded"
    >
      <Image
        height={20}
        width={20}
        alt="google"
        src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
        className="text-black"
      />  
      Link Google account
    </div>
  );
}
