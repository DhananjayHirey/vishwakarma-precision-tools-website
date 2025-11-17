import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/store")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-white">Hello "/store"!</div>;
}
