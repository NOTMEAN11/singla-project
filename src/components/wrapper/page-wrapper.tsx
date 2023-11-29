import React from "react";
import { cn } from "@/lib/utils";
type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
function PageWrapper({ children, className, ...props }: Props) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

export default PageWrapper;
