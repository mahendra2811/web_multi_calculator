"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PrintButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Print this calculator"
      onClick={() => window.print()}
      className="no-print"
      title="Print (Ctrl/Cmd + P)"
    >
      <Printer className="h-5 w-5" />
    </Button>
  );
}
