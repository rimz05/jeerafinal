"use client";
import { File, Task } from "@prisma/client";

import { columns, myTaskColumns } from "./columns";
import { DataTable } from "../data.table";

export interface TaskProps extends Task {
  assignedTo: { id: string; name: string; email: string; image: string | null } | null;
  project: { id: string; name: string; workspaceId: string };
  attachments: File[];
}

export const ProjectTable = ({ tasks }: { tasks: TaskProps[] }) => {
  return <DataTable columns={columns} data={tasks} />;
};

export const MyTasksTable = ({ tasks }: { tasks: TaskProps[] }) => (
  <DataTable columns={myTaskColumns} data={tasks} />
);