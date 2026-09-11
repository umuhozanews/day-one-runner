import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/gear")({
  beforeLoad: () => {
    throw redirect({ to: "/merches" });
  },
  component: () => null,
});
