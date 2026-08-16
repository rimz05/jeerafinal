// components/sidebar/app-sidebar.tsx
import { User } from "@prisma/client";
import { AppSidebarDataProps } from "./app-sidebar-container";
import { ProjectProps, WorkspaceMembersProps } from "@/utils/types";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "../ui/sidebar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { WorkspaceSelector } from "./workspace-selector";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-project-list";

export const AppSidebar = ({
  data,
  projects,
  workspaceMembers, // ✅ receive members here
  user,
}: {
  data: AppSidebarDataProps;
  projects: ProjectProps[];
  workspaceMembers: WorkspaceMembersProps[]; // ✅ must be typed
  user: User;
}) => {
  return (
    <Sidebar collapsible="icon" >
      <SidebarHeader>
        <div className="flex items-center px-4 text-white my-8">
          <Avatar>
            <AvatarImage src={"/wrench.svg"} />
          </Avatar>
          <SidebarGroupLabel>
            <span className="text-xl font-bold ">Sprinto</span>
          </SidebarGroupLabel>
        </div>

        <div className="flex justify-between mb-0 text-white">
          <SidebarGroupLabel className="mb-2 text-sm font-semibold text-white uppercase">
            Workspace
          </SidebarGroupLabel>

          <Button asChild size={"icon"} className="relative size-5 top-2 right-2">
            <Link href="/create-workspace">
              <Plus />
            </Link>
          </Button>
        </div>

        <WorkspaceSelector workspaces={data.workspaces} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain />

        <NavProjects
          projects={projects}
          workspaceMembers={workspaceMembers}
        />
      </SidebarContent>
    </Sidebar>
    
  );
};
