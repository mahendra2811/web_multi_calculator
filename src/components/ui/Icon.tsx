"use client";

import { type ComponentType } from "react";
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const Lookup = (Icons as unknown as Record<string, ComponentType<LucideProps>>)[name];
  if (!Lookup) {
    const Fallback = Icons.HelpCircle;
    return <Fallback {...props} />;
  }
  return <Lookup {...props} />;
}
