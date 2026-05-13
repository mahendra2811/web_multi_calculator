const themeInitScript = [
  "(function(){try{",
  "var t=localStorage.getItem('mcw:theme')||'system';",
  "var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);",
  "if(d)document.documentElement.classList.add('dark');",
  "}catch(e){}})();",
].join("");

// App Router has no `_document.tsx`; inlining the no-flash theme script in the
// document <head> via dangerouslySetInnerHTML is the canonical pattern. The script
// body is a static string constant — no user input, no XSS risk.
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
