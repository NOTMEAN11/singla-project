import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

import React from "react";

async function Navbar() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-end w-full px-4 py-6 capitalize border-b bg-primary-foreground">
        ‎
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end w-full px-4 py-6 capitalize border-b bg-primary-foreground">
      ยินดีต้อนรับคุณ <p className="ml-1 font-bold">{session?.user?.name}</p>
    </div>
  );
}

export default Navbar;
