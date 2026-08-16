"use client";

import { ProjectTaskProps } from "@/utils/types";
import { useState } from "react";
import {
  addDays,
  addWeeks,
  differenceInDays,
  format,
  isSameDay,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  TODO: "bg-sky-500",
  IN_PROGRESS: "bg-amber-500",
  COMPLETED: "bg-green-500",
  BLOCKED: "bg-red-500",
  BACKLOG: "bg-slate-500",
  IN_REVIEW: "bg-purple-500",
};

const DAYS = 14;

interface Props {
  tasks: ProjectTaskProps[];
}

export const GanttChart = ({ tasks }: Props) => {
  const [windowStart, setWindowStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const days = Array.from({ length: DAYS }, (_, i) => addDays(windowStart, i));
  const windowEnd = days[DAYS - 1];

  return (
    <div className="bg-card rounded-xl border overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-semibold text-sm">Timeline</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setWindowStart((w) => subWeeks(w, 2))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[160px] text-center">
            {format(windowStart, "MMM d")} –{" "}
            {format(windowEnd, "MMM d, yyyy")}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setWindowStart((w) => addWeeks(w, 2))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setWindowStart(startOfWeek(new Date(), { weekStartsOn: 1 }))
            }
          >
            Today
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div style={{ minWidth: 48 * DAYS + 192 }}>
          {/* Day headers */}
          <div className="flex border-b">
            <div className="w-48 shrink-0 px-3 py-2 text-xs font-medium text-muted-foreground border-r bg-muted/30">
              Task
            </div>
            {days.map((day) => {
              const isToday = isSameDay(day, new Date());
              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "flex-1 text-center py-2 border-r last:border-r-0 min-w-[48px]",
                    isToday && "bg-primary/10"
                  )}
                >
                  <p className="text-xs text-muted-foreground">
                    {format(day, "EEE")}
                  </p>
                  <p
                    className={cn(
                      "text-xs font-medium",
                      isToday && "text-primary font-bold"
                    )}
                  >
                    {format(day, "d")}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Task rows */}
          {tasks.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              No tasks found
            </div>
          ) : (
            tasks.map((task) => {
              const start = new Date(task.startDate);
              const end = new Date(task.dueDate);
              const isVisible = start <= windowEnd && end >= windowStart;
              const clampedStart = start < windowStart ? windowStart : start;
              const clampedEnd = end > windowEnd ? windowEnd : end;
              const offsetDays = differenceInDays(clampedStart, windowStart);
              const barDays =
                differenceInDays(clampedEnd, clampedStart) + 1;
              const barLeft = (offsetDays / DAYS) * 100;
              const barWidth = Math.max((barDays / DAYS) * 100, 1 / DAYS * 100);
              const color =
                STATUS_COLORS[task.status] ?? "bg-slate-500";

              return (
                <div
                  key={task.id}
                  className="flex items-center border-b last:border-b-0 hover:bg-muted/20 transition-colors"
                >
                  {/* Task label */}
                  <div className="w-48 shrink-0 px-3 py-3 border-r">
                    <p className="text-sm font-medium truncate">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(start, "MMM d")} – {format(end, "MMM d")}
                    </p>
                  </div>

                  {/* Bar area */}
                  <div className="flex-1 relative h-14 px-1">
                    {/* Today line */}
                    {isSameDay(new Date(), windowStart) ||
                    (new Date() >= windowStart && new Date() <= windowEnd) ? (
                      <div
                        className="absolute top-0 bottom-0 w-px bg-primary/40 z-10"
                        style={{
                          left: `${
                            (differenceInDays(new Date(), windowStart) /
                              DAYS) *
                            100
                          }%`,
                        }}
                      />
                    ) : null}

                    {isVisible && (
                      <div
                        className={cn(
                          "absolute top-3 h-8 rounded-md flex items-center px-2 text-white text-xs font-medium overflow-hidden shadow-sm",
                          color
                        )}
                        style={{
                          left: `${barLeft}%`,
                          width: `${barWidth}%`,
                          minWidth: "8px",
                        }}
                        title={task.title}
                      >
                        <span className="truncate">{task.title}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 px-4 py-3 border-t bg-muted/20">
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={cn("w-3 h-3 rounded-sm", color)} />
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
