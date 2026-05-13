@AGENTS.md
@.claude/PROJECT_CONTEXT.md

## MCP Tools: code-review-graph

**ALWAYS use the `code-review-graph` MCP tools BEFORE Grep/Glob/Read for codebase exploration.** The graph is faster, cheaper (fewer tokens), and gives structural context (callers, dependents, tests) that file scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of / callees_of / imports_of / tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.

## Project-Specific Conventions

See `.claude/PROJECT_CONTEXT.md` for architecture, calculator slugs, design tokens, and do/don't list.
