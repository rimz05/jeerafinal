"use client";

import { Bell } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ThemeToggle } from "./theme-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import { ProjectAvatar } from "./project/project-avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";

interface Props {
  id: string;
  name: string;
  email: string;
  image: string;
}

const PAGE_TITLES: Record<string, string> = {
  "my-tasks": "My Tasks",
  members: "Members",
  settings: "Settings",
  projects: "Projects",
};

function usePageTitle() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  if (last && PAGE_TITLES[last]) return PAGE_TITLES[last];
  if (segments.includes("projects")) {
    const projectIdx = segments.indexOf("projects");
    if (segments.length > projectIdx + 2) return "Task Details";
    return "Project";
  }
  return "Home";
}

export const Navbar = ({ id, email, name, image }: Props) => {
  const title = usePageTitle();

  return (
    <nav className="flex items-center justify-between p-4 w-full">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <span className="text-sm text-muted-foreground">
            Manage all your tasks at one place
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <ThemeToggle />

        <Popover>
          <PopoverTrigger asChild>
            <button className="cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <ProjectAvatar url={image || undefined} name={name} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 mr-2 mt-1 p-3">
            <div className="mb-3">
              <h2 className="text-sm font-semibold">{name}</h2>
              <p className="text-xs text-muted-foreground truncate">{email}</p>
            </div>
            <Separator className="mb-3" />
            <LogoutLink className="w-full text-sm text-destructive hover:text-destructive/80 transition-colors">
              Sign Out
            </LogoutLink>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

