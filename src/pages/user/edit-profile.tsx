import React from "react";
import { Button } from "../../components/button";
import { useMe } from "../../hooks/useMe";

export default function EditProfile() {
  const { data: userData } = useMe();

  return (
    <div className="flex flex-col items-center justify-center mt-52">
      <h4 className="font-medium text-left text-2xl mb-3">Edit Profile</h4>
      <form className="grid gap-3 mt-5 px-5 w-full mb-5 max-w-screen-sm">
        <input className="input" type="email" placeholder="Email" />
        <input className="input" type="password" placeholder="Password" />
        <Button loading={false} canClick={true} actionText="Save Profile"></Button>
      </form>
    </div>
  );
}
