import { db } from "@/lib/db";
import { userRequired } from "@/app/data/user/is-user-authenticated";
import { notFound } from "next/navigation";
import { AccessLevel } from "@prisma/client";

interface PageProps {
  params: Promise<{
    workspaceId: string;
    inviteCode: string;
  }>;
}

const JoinWorkspacePage = async ({ params }: PageProps) => {
  const { workspaceId, inviteCode } = await params;

  // Ensure the user is authenticated
  const { user } = await userRequired();

  // Fetch workspace
  const workspace = await db.workspace.findUnique({
    where: { id: workspaceId },
  });

  if (!workspace || workspace.inviteCode !== inviteCode) {
    notFound(); // 404 if invalid workspace or invite code
  }

  // Check if the user is already a member
  const existingMember = await db.workspaceMember.findFirst({
    where: { workspaceId, userId: user.id },
  });

  // If not a member, add them automatically
  if (!existingMember) {
    await db.workspaceMember.create({
      data: {
        workspaceId,
        userId: user.id,
        accessLevel: AccessLevel.MEMBER,
      },
    });
  }

  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold">Join Workspace</h1>
      <p className="text-muted-foreground">
        You are now a member of <strong>{workspace.name}</strong>!
      </p>
      <p className="text-sm text-muted-foreground">
        You can now access all projects and collaborate with your team.
      </p>
      <a
        href={`/workspace/${workspace.id}`}
        className="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition"
      >
        Go to Workspace
      </a>
    </div>
  );
};

export default JoinWorkspacePage;
