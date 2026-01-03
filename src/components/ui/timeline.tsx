"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Check, Clock, X } from "lucide-react";

const timelineVariants = cva("relative flex flex-col", {
  variants: {
    variant: {
      default: "gap-4",
      compact: "gap-2",
      spacious: "gap-8",
    },
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "vertical",
  },
});

const timelineItemVariants = cva("relative flex gap-3 pb-2", {
  variants: {
    orientation: {
      vertical: "flex-row",
      horizontal: "flex-col min-w-64 shrink-0",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

// add smooth transition for connector color changes
const timelineConnectorVariants = cva(
  "bg-(--border-soft) transition-colors duration-300",
  {
    variants: {
      orientation: {
        vertical: "absolute left-3 top-9 h-full w-px",
        horizontal: "absolute top-3 left-8 w-full h-px",
      },
      status: {
        default: "bg-(--border-soft)",
        completed: "bg-(--accent-teal)",
        active: "bg-(--accent-sky)",
        pending: "bg-(--text-tertiary)/30",
        error: "bg-(--status-failed)",
      },
    },
    defaultVariants: {
      orientation: "vertical",
      status: "default",
    },
  }
);

// add transition for icon color/background changes and increase size for better visibility
const timelineIconVariants = cva(
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-(--bg-primary) text-sm font-medium transition-colors",
  {
    variants: {
      status: {
        default: "border-(--border-soft) text-(--text-tertiary)",
        completed:
          "border-(--accent-teal) bg-(--accent-teal) text-(--bg-primary)",
        active:
          "border-(--accent-sky) bg-(--bg-primary) text-(--accent-sky) animate-pulse",
        pending: "border-(--text-tertiary)/30 text-(--text-tertiary)",
        error:
          "border-(--status-failed) bg-(--status-failed) text-(--bg-primary)",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string | Date;
  status?: "default" | "completed" | "active" | "pending" | "error";
  icon?: React.ReactNode;
  content?: React.ReactNode;
  metadata?: Record<string, any>;
}

export interface TimelineProps extends VariantProps<typeof timelineVariants> {
  items: TimelineItem[];
  className?: string;
  showConnectors?: boolean;
  showTimestamps?: boolean;
  timestampPosition?: "top" | "bottom" | "inline";
  onItemClick?: (item: TimelineItem) => void;
}

function getStatusIcon(status: TimelineItem["status"]) {
  switch (status) {
    case "completed":
      return <Check className="h-4 w-4" />;
    case "active":
      return <Clock className="h-4 w-4" />;
    case "pending":
      return <Clock className="h-4 w-4" />;
    case "error":
      return <X className="h-4 w-4" />;
    default:
      return <div className="h-2 w-2 rounded-full bg-current" />;
  }
}

function formatTimestamp(timestamp: string | Date): string {
  if (!timestamp) return "";
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Timeline({
  items,
  className,
  onItemClick,
  variant,
  orientation = "vertical",
  showConnectors = true,
  showTimestamps = true,
  timestampPosition = "top",
  ...props
}: TimelineProps) {
  const timelineContent = (
    <div
      role="list"
      className={cn(
        timelineVariants({ variant, orientation }),
        orientation === "horizontal" ? "pb-4" : ""
      )}
    >
      {items.map((item, index) => (
        <div
          role="listitem"
          key={item.id}
          tabIndex={onItemClick ? 0 : -1}
          onClick={() => onItemClick?.(item)}
          onKeyDown={(e) => {
            if (!onItemClick) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onItemClick(item);
            }
          }}
          aria-current={item.status === "active" ? "true" : undefined}
          className={cn(
            timelineItemVariants({ orientation }),
            "hover:shadow-sm focus:shadow-sm rounded-md transition"
          )}
        >
          {/* Connector Line */}
          {showConnectors && index < items.length - 1 && (
            <div
              className={cn(
                timelineConnectorVariants({
                  orientation,
                  status: item.status,
                })
              )}
            />
          )}

          {/* Icon */}
          <div className="relative z-10 flex shrink-0">
            <div className={cn(timelineIconVariants({ status: item.status }))}>
              {item.icon || getStatusIcon(item.status)}
            </div>
          </div>

          {/* Content */}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {/* Timestamp - Top */}
            {showTimestamps &&
              timestampPosition === "top" &&
              item.timestamp && (
                <time className="text-xs text-(--text-tertiary)">
                  {formatTimestamp(item.timestamp)}
                </time>
              )}

            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium leading-tight text-(--text-primary)">
                {item.title}
              </h3>
              {showTimestamps &&
                timestampPosition === "inline" &&
                item.timestamp && (
                  <time className="shrink-0 text-xs text-(--text-tertiary)">
                    {formatTimestamp(item.timestamp)}
                  </time>
                )}
            </div>

            {/* Description */}
            {item.description && (
              <p className="text-sm text-(--text-secondary) leading-relaxed">
                {item.description}
              </p>
            )}

            {/* Custom Content */}
            {item.content && <div className="mt-3">{item.content}</div>}

            {/* Timestamp - Bottom */}
            {showTimestamps &&
              timestampPosition === "bottom" &&
              item.timestamp && (
                <time className="text-xs text-(--text-tertiary)">
                  {formatTimestamp(item.timestamp)}
                </time>
              )}
          </div>
        </div>
      ))}
    </div>
  );

  if (orientation === "horizontal") {
    return (
      <ScrollArea
        orientation="horizontal"
        className={cn("w-full", className)}
        {...props}
      >
        {timelineContent}
      </ScrollArea>
    );
  }

  return (
    <div className={className} {...props}>
      {timelineContent}
    </div>
  );
}
