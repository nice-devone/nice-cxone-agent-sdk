/**
 * EventLogContext provides a lightweight in-memory event log shared across the
 * Sample SDK App. Components can push request / response / event entries via
 * the `useEventLog()` hook, and the EventViewer renders them in real time.
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

export type EventKind = "request" | "response" | "event" | "error" | "info";

export interface SdkEvent {
  id: string;
  timestamp: number;
  source: string; // e.g. "Auth", "ACD", "Digital"
  kind: EventKind;
  name: string; // short label
  data?: unknown; // payload (will be JSON-formatted in viewer)
}

interface EventLogContextValue {
  events: SdkEvent[];
  logEvent: (entry: Omit<SdkEvent, "id" | "timestamp">) => void;
  clear: () => void;
}

const EventLogContext = createContext<EventLogContextValue | undefined>(undefined);

const MAX_EVENTS = 500;

export const EventLogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<SdkEvent[]>([]);
  const counter = useRef(0);

  const logEvent = useCallback(
    (entry: Omit<SdkEvent, "id" | "timestamp">) => {
      counter.current += 1;
      const next: SdkEvent = {
        ...entry,
        id: `${Date.now()}-${counter.current}`,
        timestamp: Date.now(),
      };
      setEvents((prev) => {
        const updated = [next, ...prev];
        return updated.length > MAX_EVENTS ? updated.slice(0, MAX_EVENTS) : updated;
      });
    },
    []
  );

  const clear = useCallback(() => setEvents([]), []);

  const value = useMemo(() => ({ events, logEvent, clear }), [events, logEvent, clear]);

  return <EventLogContext.Provider value={value}>{children}</EventLogContext.Provider>;
};

export const useEventLog = (): EventLogContextValue => {
  const ctx = useContext(EventLogContext);
  if (!ctx) {
    // Safe fallback so consumers won't crash if provider is missing.
    return {
      events: [],
      logEvent: () => undefined,
      clear: () => undefined,
    };
  }
  return ctx;
};
