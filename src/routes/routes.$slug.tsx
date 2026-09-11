import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/routes/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/runs" });
  },
  component: () => null,
});
