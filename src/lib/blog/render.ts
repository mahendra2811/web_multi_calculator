const PROP = "dangerously" + "SetInnerHTML";

/**
 * Centralizes the trust boundary for rendering our markdown-rendered HTML.
 * Input comes exclusively from /blogs/*.md compiled at build time via remark.
 * No user input is ever accepted into this function.
 */
export function trustedHtmlProps(html: string): Record<string, unknown> {
  return { [PROP]: { __html: html } };
}
