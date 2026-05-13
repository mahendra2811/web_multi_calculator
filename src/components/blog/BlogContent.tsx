import { cn } from "@/lib/utils";
import { trustedHtmlProps } from "@/lib/blog/render";

interface Props {
  html: string;
  className?: string;
}

export function BlogContent({ html, className }: Props) {
  return (
    <article
      className={cn(
        "prose-blog max-w-none",
        "text-text leading-relaxed",
        "[&_h2]:text-text [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold",
        "[&_h3]:text-text [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold",
        "[&_p]:text-text-secondary [&_p]:mt-4 [&_p]:text-base",
        "[&_ul]:text-text-secondary [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6",
        "[&_ol]:text-text-secondary [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_li]:mt-2",
        "[&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline",
        "[&_strong]:text-text [&_strong]:font-semibold",
        "[&_blockquote]:border-primary [&_blockquote]:bg-surface [&_blockquote]:text-text-secondary [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:py-2 [&_blockquote]:pl-4 [&_blockquote]:italic",
        "[&_code]:bg-surface [&_code]:text-primary [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm",
        "[&_pre]:bg-surface [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:text-sm",
        "[&_pre_code]:text-text [&_pre_code]:bg-transparent [&_pre_code]:p-0",
        "[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
        "[&_th]:bg-surface [&_th]:text-text [&_th]:border-border [&_th]:border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left",
        "[&_td]:border-border [&_td]:text-text-secondary [&_td]:border [&_td]:px-3 [&_td]:py-2",
        "[&_hr]:border-border [&_hr]:my-10",
        "[&_img]:my-6 [&_img]:rounded-xl",
        className,
      )}
      {...trustedHtmlProps(html)}
    />
  );
}
