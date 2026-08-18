import React from "react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { WorkspaceAvatar } from "@/components/workspace/workspace-avatar";
import { notFound } from "next/navigation";
import { PROJECT_COLORS } from "./constant";

interface PageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

const WorkspaceHomePage = async ({ params }: PageProps) => {
  const { workspaceId } = await params;

  try {
    const workspace = await db.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        projects: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!workspace) {
      notFound();
      return null;
    }

    const { projects, members } = workspace;


    return (
      <div className="p-6 space-y-10">
        <div className="flex items-start gap-4">
          <WorkspaceAvatar name={workspace.name} />
          <div>
            <h1 className="text-3xl font-bold">{workspace.name}</h1>
            <p className="text-muted-foreground mt-1">
              {workspace.description || "No description available"}
            </p>
            <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
              <span>{projects.length} Projects</span>
              <span>{members.length} Members</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-5 ">
          {/* projects */}
          <div className="w-full ">
            <h2 className="text-xl font-semibold ">Projects</h2>
            {projects.length > 0 ? (
              <div className="grid grid-cols-1  gap-5 mt-4 ">
                {projects.map((project, index) => {
                  const color = PROJECT_COLORS[index % PROJECT_COLORS.length]

                  return (
                    <div
                      key={project.id}
                      className={`p-5 border rounded-xl shadow-sm hover:shadow-lg hover:border-primary/40 transition ${color}`}
                    >
                      <h3 className="text-lg font-medium">{project.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.description || "No description"}
                      </p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-muted-foreground mt-4 italic">
                No projects found. Create one to get started 🚀
              </p>
            )}
          </div>

          {/* memberes */}
          <div className="w-full ">
            <h2 className="text-xl font-semibold">Members</h2>
            {members.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {members.map((member) => (
                  <li
                    key={member.id}
                    className="flex items-center gap-4 p-3 border rounded-lg bg-card hover:shadow-md transition"
                  >
                    <img
                      loading="lazy"
                      src={
                        member.user.image ||
                        "https://media-public.canva.com/gJly0/MAGDkMgJly0/1/tl.png"
                      }
                      alt={member.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{member.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.user.email}
                      </p>
                    </div>
                    <span className="ml-auto text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {member.user.role}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground mt-4 italic">
                No members yet. Invite teammates to collaborate 🤝
              </p>
            )}
          </div>

        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading workspace data:", error);

    redirect("/error");
    return null;
  }
};

export default WorkspaceHomePage;