"use client";

import { SessionProvider } from "next-auth/react";

export function Wrappers({ children }: { children: React.ReactNode }) {
	return <SessionProvider>{children}</SessionProvider>;
}
