"use client";

import { ProjectTaskProps } from "@/utils/types";
import { useState } from "react";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useProjectId } from "@/hooks/use-project-id";

const STATUS_COLORS: Record<string, string> = {
  TODO: "bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-300/50",
  IN_PROGRESS:
    "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300/50",
  COMPLETED:
    "bg-green-500/20 text-green-700 dark:text-green-300 border border-green-300/50",
  BLOCKED:
    "bg-red-500/20 text-red-700 dark:text-red-300 border border-red-300/50",
  BACKLOG:
    "bg-slate-500/20 text-slate-600 dark:text-slate-300 border border-slate-300/50",
  IN_REVIEW:
    "bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-300/50",
};

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Props {
  tasks: ProjectTaskProps[];
}

export const ProjectCalender = ({ tasks }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  // Build flat list of days
  const calDays: Date[] = [];
  let day = calStart;
  while (day <= calEnd) {
    calDays.push(day);
    day = addDays(day, 1);
  }

  const getTasksForDay = (date: Date) =>
    tasks.filter(
      (t) => t.dueDate && isSameDay(new Date(t.dueDate), date)
    );

  return (
    <div className="bg-card rounded-xl border overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentDate((d) => subMonths(d, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentDate((d) => addMonths(d, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 border-b">
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="py-2 text-center text-xs font-medium text-muted-foreground border-r last:border-r-0"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calDays.map((calDay, idx) => {
          const dayTasks = getTasksForDay(calDay);
          const isToday = isSameDay(calDay, new Date());
          const isCurrentMonth = isSameMonth(calDay, currentDate);

          return (
            <div
              key={idx}
              className={cn(
                "min-h-[110px] p-2 border-r border-b last:border-r-0 transition-colors",
                !isCurrentMonth && "bg-muted/20",
                isToday && "bg-primary/5"
              )}
            >
              {/* Day number */}
              <div
                className={cn(
                  "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1.5",
                  isToday &&
                    "bg-primary text-primary-foreground",
                  !isCurrentMonth && "text-muted-foreground/50",
                  !isToday && isCurrentMonth && "text-foreground"
                )}
              >
                {format(calDay, "d")}
              </div>

              {/* Task chips */}
              <div className="space-y-1">
                {dayTasks.slice(0, 3).map((task) => (
                  <Link
                    key={task.id}
                    href={`/workspace/${workspaceId}/projects/${projectId}/${task.id}`}
                    className={cn(
                      "block text-xs px-1.5 py-0.5 rounded truncate hover:opacity-80 transition-opacity",
                      STATUS_COLORS[task.status] ??
                        "bg-muted text-foreground border border-border"
                    )}
                    title={task.title}
                  >
                    {task.title}
                  </Link>
                ))}
                {dayTasks.length > 3 && (
                  <p className="text-xs text-muted-foreground px-1">
                    +{dayTasks.length - 3} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 px-4 py-3 border-t bg-muted/20">
        {Object.entries(STATUS_COLORS).map(([status, classes]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div
              className={cn(
                "w-3 h-3 rounded-sm",
                classes.split(" ")[0]
              )}
            />
            <span className="text-xs text-muted-foreground">
              {status === "IN_PROGRESS"
                ? "In Progress"
                : status === "IN_REVIEW"
                ? "In Review"
                : status.charAt(0) + status.slice(1).toLowerCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
