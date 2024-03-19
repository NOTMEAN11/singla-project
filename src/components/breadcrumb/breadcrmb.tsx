import { cn } from "@/lib/utils";
import { Item } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import React, { ReactElement } from "react";
import { BiChevronRight } from "react-icons/bi";

type TBreadcrumb = {
  breadcrumb?: { title?: string; path: string }[];
  backoffice?: boolean;
};

function Breadcrumb({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): ReactElement {
  return (
    <div
      className={cn("flex w-full items-center space-x-2  text-sm", className)}
    >
      {children}
    </div>
  );
}

function BreadcrumbItem({
  children,
  className,
  href,
  lastChild,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  lastChild?: boolean;
}): ReactElement {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Link
        href={href}
        className="w-full max-w-[200px] truncate rounded-md p-1 text-xs transition-colors duration-300 hover:bg-accent sm:max-w-full "
      >
        {children}
      </Link>
      <p className={lastChild ? "hidden" : ""}>
        <BiChevronRight />
      </p>
    </div>
  );
}

function Breadcrumbs({ breadcrumb, backoffice }: TBreadcrumb): ReactElement {
  const home = [{ title: "หน้าแรก", path: backoffice ? "/backoffice" : "/" }];
  return (
    <Breadcrumb>
      {(breadcrumb ? [...home, ...breadcrumb] : home).map((item, index) => (
        <BreadcrumbItem
          key={index}
          href={item.path}
          lastChild={index === breadcrumb?.length}
        >
          {item.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export { Breadcrumb, BreadcrumbItem, Breadcrumbs };
