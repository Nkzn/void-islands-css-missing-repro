import type { ReactNode } from "react";
import "./global.css";

export function Shell({ children }: { children: ReactNode }) {
  return <div className="shell">{children}</div>;
}
