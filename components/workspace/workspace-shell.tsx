"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const WorkspaceShell = ({
  sidebar,
  main,
}: {
  sidebar: React.ReactNode;
  main: React.ReactNode;
}) => {
  const { open } = useSidebar();

  return (
    <div className="min-h-screen w-screen bg-blue-900 flex justify-center items-center md:p-3 overflow-auto">

      {/* Sidebar */}
      <div
        className={cn(
          "h-full transition-all duration-300 ease-in-out",
          open ? "w-[15%]" : "w-[5%]"
        )}
      >
        {sidebar}
      </div>

      {/* Main */}
      <main
        className={cn(
          "h-full bg-background rounded-4xl shadow-2xl shadow-accent-foreground/20 transition-all duration-300 ease-in-out",
          open ? "w-[85%]" : "w-[95%]"
        )}
      >
        {main}
      </main>

    </div>
  );
};
