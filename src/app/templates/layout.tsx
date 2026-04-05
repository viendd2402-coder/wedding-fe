import type { ReactNode } from "react";
import TemplatesRouteScroll from "./templates-route-scroll";

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TemplatesRouteScroll />
      {children}
    </>
  );
}
