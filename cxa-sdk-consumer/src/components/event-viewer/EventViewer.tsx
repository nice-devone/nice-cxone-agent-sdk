/**
 * EventViewer — collapsible bottom panel that shows the SDK event lifecycle
 * (requests, responses, events, errors) pushed via the EventLog context.
 */
import React, { useMemo, useState } from "react";
import {
  Badge,
  Box,
  Chip,
  Collapse,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import TimelineIcon from "@mui/icons-material/Timeline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { EventKind, SdkEvent, useEventLog } from "../../context/EventLogContext";

const kindColor: Record<EventKind, "default" | "primary" | "success" | "warning" | "error" | "info"> = {
  request: "primary",
  response: "success",
  event: "info",
  error: "error",
  info: "default",
};

const formatTime = (ts: number) => {
  const d = new Date(ts);
  return d.toLocaleTimeString(undefined, { hour12: false }) + "." +
    String(d.getMilliseconds()).padStart(3, "0");
};

const formatPayload = (data: unknown): string => {
  if (data === undefined) return "";
  try {
    return JSON.stringify(
      data,
      (_k, v) => {
        if (v instanceof Error) {
          return { name: v.name, message: v.message, stack: v.stack };
        }
        return v;
      },
      2
    );
  } catch {
    return String(data);
  }
};

const EventRow: React.FC<{ event: SdkEvent }> = ({ event }) => {
  const [open, setOpen] = useState(false);
  const payload = useMemo(() => formatPayload(event.data), [event.data]);

  const copy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (payload) navigator.clipboard?.writeText(payload).catch(() => undefined);
  };

  return (
    <Box
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        "&:hover": { backgroundColor: "action.hover" },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ px: 1.5, py: 0.75, cursor: payload ? "pointer" : "default" }}
        onClick={() => payload && setOpen((v) => !v)}
      >
        <Typography
          variant="caption"
          sx={{ fontFamily: "monospace", color: "text.secondary", minWidth: 92 }}
        >
          {formatTime(event.timestamp)}
        </Typography>
        <Chip
          label={event.kind}
          size="small"
          color={kindColor[event.kind]}
          variant={event.kind === "info" ? "outlined" : "filled"}
          sx={{ height: 20, fontSize: "0.65rem", textTransform: "uppercase", fontWeight: 600 }}
        />
        <Chip
          label={event.source}
          size="small"
          variant="outlined"
          sx={{ height: 20, fontSize: "0.65rem" }}
        />
        <Typography variant="body2" sx={{ flex: 1, fontWeight: 500, wordBreak: "break-word" }}>
          {event.name}
        </Typography>
        {payload && (
          <Tooltip title="Copy JSON">
            <IconButton size="small" onClick={copy}>
              <ContentCopyIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        )}
        {payload && (
          <IconButton size="small">
            {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        )}
      </Stack>
      <Collapse in={open} unmountOnExit>
        <Box
          component="pre"
          sx={{
            m: 0,
            px: 2,
            py: 1.5,
            fontFamily: "monospace",
            fontSize: "0.75rem",
            backgroundColor: "#0d1117",
            color: "#e6edf3",
            overflow: "auto",
            maxHeight: 320,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {payload}
        </Box>
      </Collapse>
    </Box>
  );
};

interface EventViewerProps {
  bottomOffset?: number;
  leftOffset?: number;
}

const EventViewer: React.FC<EventViewerProps> = ({ bottomOffset = 0, leftOffset = 0 }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { events, clear } = useEventLog();
  const [expanded, setExpanded] = useState(false);
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [kindFilter, setKindFilter] = useState<string>("all");

  const sources = useMemo(() => {
    const set = new Set(events.map((e) => e.source));
    return ["all", ...Array.from(set)];
  }, [events]);

  const filtered = useMemo(
    () =>
      events.filter(
        (e) =>
          (sourceFilter === "all" || e.source === sourceFilter) &&
          (kindFilter === "all" || e.kind === kindFilter)
      ),
    [events, sourceFilter, kindFilter]
  );

  return (
    <Paper
      elevation={6}
      sx={{
        position: "fixed",
        right: 0,
        bottom: bottomOffset,
        left: { xs: 0, md: `${leftOffset}px` },
        zIndex: (t) => t.zIndex.drawer - 1,
        borderRadius: 0,
        borderTop: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          px: 1.5,
          py: 0.75,
          backgroundColor: "#1a237e",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={() => setExpanded((v) => !v)}
      >
        <TimelineIcon sx={{ color: "#64b5f6" }} fontSize="small" />
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          SDK Event Lifecycle
        </Typography>
        <Badge
          badgeContent={events.length}
          color="secondary"
          max={999}
          sx={{ "& .MuiBadge-badge": { fontSize: "0.65rem", height: 16, minWidth: 16 } }}
        />
        <Box sx={{ flex: 1 }} />
        {expanded && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            onClick={(e) => e.stopPropagation()}
          >
            {isDesktop && (
              <>
                <Select
                  size="small"
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  sx={selectSx}
                >
                  {sources.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s === "all" ? "All sources" : s}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  size="small"
                  value={kindFilter}
                  onChange={(e) => setKindFilter(e.target.value)}
                  sx={selectSx}
                >
                  {["all", "request", "response", "event", "error", "info"].map((k) => (
                    <MenuItem key={k} value={k}>
                      {k === "all" ? "All kinds" : k}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
            <Tooltip title="Clear log">
              <IconButton size="small" onClick={clear} sx={{ color: "#fff" }}>
                <ClearAllIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
        <IconButton size="small" sx={{ color: "#fff" }}>
          {expanded ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
        </IconButton>
      </Stack>
      <Collapse in={expanded} unmountOnExit>
        <Divider />
        <Box
          sx={{
            maxHeight: { xs: "40vh", md: "45vh" },
            overflow: "auto",
            backgroundColor: "background.paper",
          }}
        >
          {filtered.length === 0 ? (
            <Stack alignItems="center" sx={{ py: 4 }} spacing={1}>
              <TimelineIcon sx={{ color: "text.disabled", fontSize: 36 }} />
              <Typography variant="body2" color="text.secondary">
                No events captured yet. Trigger an SDK action to see the lifecycle here.
              </Typography>
            </Stack>
          ) : (
            filtered.map((e) => <EventRow key={e.id} event={e} />)
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

const selectSx = {
  color: "#fff",
  height: 28,
  fontSize: "0.75rem",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.6)" },
  "& .MuiSvgIcon-root": { color: "#fff" },
};

export default EventViewer;
