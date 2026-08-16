"use client";

import { DataTable } from "@/components/data.table";
import { columns, myTaskColumns, TaskTableItem } from "@/components/project/columns";
import { File, Task } from "@prisma/client";

export interface TaskProps extends Task {
  assignedTo: { id: string; name: string; email: string; image: string | null } | null;
  project: { id: string; name: string; workspaceId: string };
  attachments: File[];
}

export const ProjectTable = ({ tasks }: { tasks: TaskProps[] }) => {
  return <DataTable columns={columns} data={tasks as TaskTableItem[]} />;
};

export const MyTasksTable = ({ tasks }: { tasks: TaskProps[] }) => (
  <DataTable columns={myTaskColumns} data={tasks as TaskTableItem[]} />
);
