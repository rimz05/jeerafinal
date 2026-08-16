import { cn } from "@/lib/utils";
import { Progress } from "../ui/progress";

type VariantType = "success" | "warning" | "default" | "inProgress";

interface CircleProps {
  title: string;
  value: number;
  subTitle: string;
  variant: VariantType;
}

const variantStyles = {
  success: "text-emerald-600",
  default: "text-blue-600",
  warning: "text-red-500",
  inProgress: "text-amber-500",
};

const ringStyles = {
  success: "bg-emerald-100 dark:bg-emerald-900/40",
  default: "bg-blue-100 dark:bg-blue-900/40",
  warning: "bg-red-100 dark:bg-red-900/40",
  inProgress: "bg-amber-100 dark:bg-amber-900/40",
};

export const CircleProgress = ({
  title,
  subTitle,
  value,
  variant,
}: CircleProps) => {
  return (
    <div className="flex items-center justify-between rounded-2xl transition-all duration-200 px-5">

      {/* Left content */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug max-w-[140px]">
          {subTitle}
        </p>
      </div>

      {/* Right circle */}
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "flex items-center justify-center w-20 h-20 rounded-full",
            ringStyles[variant]
          )}
        >
          <Progress
            value={value}
            className={cn(
              "absolute h-20 w-20 rotate-[-90deg]",
              variantStyles[variant]
            )}
          />

          <span
            className={cn(
              "text-lg font-bold",
              variantStyles[variant]
            )}
          >
            {Math.round(value || 0)}%
          </span>
        </div>
      </div>

    </div>
  );
};
