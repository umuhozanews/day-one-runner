import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/routes/")({
  beforeLoad: () => {
    throw redirect({ to: "/runs" });
  },
  component: () => null,
});
