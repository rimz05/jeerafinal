import { ProjectTaskProps } from "@/utils/types";
import { DraggableProvided } from "@hello-pangea/dnd";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useProjectId } from "@/hooks/use-project-id";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ProjectAvatar } from "./project-avatar";
import { ProfileAvatar } from "../profileAvatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TaskPriority } from "@prisma/client";

interface DataProps {
  ref: (element?: HTMLElement | null) => void;
  task: ProjectTaskProps;
  provided: DraggableProvided;
}

const priorityStyles: Record<TaskPriority, string> = {
  LOW: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300",
  MEDIUM: "bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-300",
  HIGH: "bg-orange-100 text-orange-900 dark:bg-orange-900/30 dark:text-orange-300",
  CRITICAL: "bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-300",
};

export const ProjectCard = ({ provided, task }: DataProps) => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();

  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="mb-3 p-0 overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm hover:shadow-md transition-all"
    >
      {/* Priority strip */}
      <div
        className={cn(
          "text-xs font-semibold uppercase tracking-wide pt-5 p-1",
          priorityStyles[task.priority]
        )}
      >
        <div className="p-2">
         {task.priority} priority
        </div>

      {/* Content */}
      <div className="mb-1 rounded-xl bg-card mt-1 border border-border/40">
        <Link
          href={`/workspace/${workspaceId}/projects/${projectId}/${task.id}`}
          className="block px-4 py-3 space-y-2"
        >
          <span className="inline-block text-xs font-medium text-muted-foreground bg-muted px-1 py-1 rounded-lg">
            {task.project.name.slice(0, 2).toUpperCase()}
          </span>

          <h3 className="text-lg font-semibold leading-tight text-foreground">
            {task.title}
          </h3>

          {task.description && (
            <p className="text-xs text-muted-foreground">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">💬 <span>10</span></div>
              <div className="flex items-center gap-1">📎 <span>4</span></div>
            </div>

            <div className="flex items-center -space-x-2">
              <ProfileAvatar
                url={task.assignedTo.image}
                name={task.assignedTo.name}
                className="size-7"
              />
            </div>
          </div>
        </Link>
      </div>
      </div>
    </Card>
  );
};


