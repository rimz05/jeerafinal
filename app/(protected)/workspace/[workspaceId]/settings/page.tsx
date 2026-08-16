import { getWorkspaceById } from "@/app/data/workspace/get-workspace";
import { WorkspaceSettingsForm } from "@/components/workspace/workspace-setting-form";
import { $Enums, Workspace } from "@prisma/client";
import React from "react";

type WorkspaceWithMembers = Workspace & {
  members: { userId: string; accessLevel: $Enums.AccessLevel }[];
};

const WorkspaceSettings = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  const { workspaceId } = await params;

  const { data } = await getWorkspaceById(workspaceId);
  return (
    <div>
      <WorkspaceSettingsForm data={data as unknown as WorkspaceWithMembers} />
    </div>
  );
};

export default WorkspaceSettings;
