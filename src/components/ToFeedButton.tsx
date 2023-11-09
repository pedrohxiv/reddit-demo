"use client";

import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";

const getSubredditPath = (pathname: string) => {
  const splitPath = pathname.split("/");

  if (splitPath.length === 3) {
    return "/";
  } else if (splitPath.length > 3) {
    return `/${splitPath[1]}/${splitPath[2]}`;
  } else {
    return "/";
  }
};

export const ToFeedButton = () => {
  const pathname = usePathname();

  const subredditPath = getSubredditPath(pathname);

  return (
    <Button variant="ghost">
      <a href={subredditPath}>
        <ChevronLeft className="h-4 w-4 mr-1" />
        {subredditPath === "/" ? "Back home" : "Back to community"}
      </a>
    </Button>
  );
};
