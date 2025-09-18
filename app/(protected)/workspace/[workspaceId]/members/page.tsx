import React from "react";
import { db } from "@/lib/db";
import { AccessLevel } from "@prisma/client";
import { notFound } from "next/navigation";

interface Member {
  id: string;
  accessLevel: AccessLevel;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
  };
}

interface PageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

const MembersPage = async ({ params }: PageProps) => {
  const { workspaceId } = await params;

  // Fetch workspace with members
  const workspace = await db.workspace.findUnique({
    where: { id: workspaceId },
    include: { members: { include: { user: true } } },
  });

  if (!workspace) notFound();

  const members: Member[] = workspace.members.map((member) => ({
    ...member,
    user: {
      ...member.user,
      image: member.user.image ?? undefined,
    },
  }));

  return (
    <div className="p-6 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Members</h1>
        {/* Adding members via server component is tricky; ideally use a form + POST API route */}
        <p className="text-sm text-muted-foreground">
          To add/remove members, use the workspace settings.
        </p>
      </div>

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
              <span className="ml-auto px-2 py-1 rounded bg-muted text-muted-foreground">
                {member.user.role}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground mt-4 italic">
          No members found. Invite teammates to collaborate 🤝
        </p>
      )}
    </div>
  );
};

export default MembersPage;
