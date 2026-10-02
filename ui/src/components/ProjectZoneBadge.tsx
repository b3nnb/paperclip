import type { ProjectZone } from "@paperclipai/shared";
import { PROJECT_ZONE_LABELS } from "@paperclipai/shared";
import { cn } from "../lib/utils";
import { projectZoneBadge } from "../lib/status-colors";

/**
 * Project zone chip — zone "a" (parked) renders through the gray brand chip
 * family, zone "b" (the active lane) through the blue liveness family, via the
 * dedicated `projectZoneBadge` map. Label comes from `PROJECT_ZONE_LABELS`
 * (single source of truth in @paperclipai/shared) so a rename stays a
 * one-file edit. Mirrors {@link ProjectStatusBadge}.
 */
export function ProjectZoneBadge({ zone, label }: { zone: ProjectZone; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap shrink-0",
        projectZoneBadge[zone]
      )}
    >
      {label ?? PROJECT_ZONE_LABELS[zone]}
    </span>
  );
}
