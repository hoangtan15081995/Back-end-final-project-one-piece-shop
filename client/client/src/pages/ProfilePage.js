import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";

function ProfilePage() {
  const { user } = useAuth();
  console.log("user", user);

  return (
    <>
      <div>{user.name}</div>
    </>
  );
}

export default ProfilePage;
