import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function PageWrapper({ children, className }: Props) {
  return <div className={cn("p-4 ", className)}>{children}</div>;
}

export default PageWrapper;
