"use client";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

type Props = {
  content: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
};

function HoverIcon({ content, icon, className }: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger>{icon}</HoverCardTrigger>
      <HoverCardContent className={cn("w-80", className)}>
        {content}
      </HoverCardContent>
    </HoverCard>
  );
}

export default HoverIcon;
