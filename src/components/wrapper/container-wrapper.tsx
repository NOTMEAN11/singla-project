import React from "react";
import { cn } from "@/lib/utils";
type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function ContainerWrapper({ children, className, ...props }: Props) {
  return (
    <div className={cn("container", className)} {...props}>
      {children}
    </div>
  );
}

export default ContainerWrapper;
