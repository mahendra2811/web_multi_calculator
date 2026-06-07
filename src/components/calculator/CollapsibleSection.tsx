import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";

interface Props {
  title: ReactNode;
  icon?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Page-level click-to-open block for everything below the calculator widget
 * (related calculators, blog links, FAQs, ...). Collapsed by default on all
 * screen sizes; content stays in the DOM for SEO.
 */
export function CollapsibleSection({
  title,
  icon,
  defaultOpen = false,
  className,
  children,
}: Props) {
  return (
    <section className={cn("container-page py-3 sm:py-4", className)}>
      <Accordion>
        <AccordionItem title={title} icon={icon} defaultOpen={defaultOpen}>
          {children}
        </AccordionItem>
      </Accordion>
    </section>
  );
}
