import { useState } from "react";
import {
  PROJECT_ZONES,
  PROJECT_ZONE_HINTS,
  PROJECT_ZONE_LABELS,
  type ProjectZone,
} from "@paperclipai/shared";
import { Check, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ProjectZoneBadge } from "./ProjectZoneBadge";

/* ── Project zone picker — tap the chip, pick one of the two PROJECT_ZONES
   (single source of truth in @paperclipai/shared). Mirrors the
   ProjectStatusPicker pattern in ProjectDetail.tsx: Popover + trigger wrapping
   the zone badge + ChevronDown, one row per zone with the hint text from
   PROJECT_ZONE_HINTS and a Check on the current. ── */

export function ProjectZonePicker({
  zone,
  disabled,
  onChange,
}: {
  zone: ProjectZone;
  disabled?: boolean;
  onChange: (next: ProjectZone) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className="inline-flex items-center gap-1 rounded-md hover:bg-accent/50 disabled:opacity-50"
          aria-label={`Change project zone (current: ${PROJECT_ZONE_LABELS[zone]})`}
        >
          <ProjectZoneBadge zone={zone} />
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 p-1">
        {PROJECT_ZONES.map((z) => (
          <button
            key={z}
            type="button"
            data-testid="project-zone-option"
            aria-current={z === zone ? "true" : undefined}
            onClick={() => {
              setOpen(false);
              if (z !== zone) onChange(z);
            }}
            className="flex w-full items-center justify-between gap-2 rounded px-2 py-1.5 text-left hover:bg-accent"
          >
            <span className="flex min-w-0 flex-col gap-0.5">
              <ProjectZoneBadge zone={z} />
              <span className="text-xs text-muted-foreground">{PROJECT_ZONE_HINTS[z]}</span>
            </span>
            {z === zone && <Check className="h-4 w-4 shrink-0 text-muted-foreground" />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
