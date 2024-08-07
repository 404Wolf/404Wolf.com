"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProfileButtonProps {
  size?: number;
}

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

const ProfileButton = ({ size = 50 }: ProfileButtonProps) => {
  const { data: session } = useSession();
  const [loggedIn, setLoggedIn] = useState(session && session.user);
  const [icon, setIcon] = useState<null | string>(null);

  useEffect(() => {
    const newLoggedInStatus = session && session.user;
    setLoggedIn(newLoggedInStatus);
    setIcon(newLoggedInStatus ? "logout" : "login");
  }, [session]);

  return (
    <button
      onClick={() => {
        if (session && session.user) signOut();
        else signIn("google");
      }}
      className={`rounded-full p-[6px] bg-mid-blue-300 sm:bg-slate-350/[25%] backdrop-blur-xl drop-shadow-2xl-c fill-white font-bold sm:font-normal sm:stroke-slate-200/[35%] whitespace-nowrap grow text-center`}
    >
      {icon && (
        <Image
          priority
          width={size}
          height={size}
          src={`/icons/${icon}.svg`}
          alt="Login"
        />
      )}
    </button>
  );
};

export default ProfileButton;
