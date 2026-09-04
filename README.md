# Skill Finder

> Search, install, use, and auto-remove Claude Code skills on demand.

A **just-in-time skill workflow** — find a skill for your task, use it, then
automatically clean it up. No permanent clutter.

## The problem

Claude Code skills are powerful, but:

- Finding the right skill for a task is manual
- Skills accumulate over time (clutter)
- There's no built-in "use and remove" workflow

## The solution

**Skill Finder** adds a disposable skill workflow to Claude Code:

```
Search → Install → Use → Auto-remove
```

Just say **"Find a skill for X"** and it handles the rest.

## Demo

```
You: Find a skill for creating presentations

Claude:
  1. 🔍 Searching... Found: googleworkspace/cli@recipe-create-presentation (29K installs)
  2. 📥 Installing...
  3. 🛠️ Creating your presentation using the skill's instructions...
  4. 🗑️ Done! Removing the skill to keep things clean.
```

## Install

```bash
npx skills add sanyamk23/skill-finder
```

That's it. The skill is now available in all your Claude Code sessions.

### Options

| Flag | Effect |
|---|---|
| `-g` | Install globally (all projects) — **recommended** |
| `-y` | Skip confirmation prompts |

```bash
# Global install (recommended)
npx skills add sanyamk23/skill-finder -g -y
```

## Usage

Once installed, just tell Claude:

```
Find a skill for presentations
Find a skill for testing
Find a skill for deployment
Find a skill for react
```

Claude will:

1. 🔍 **Search** — Find the best skill for your task (by install count)
2. 📥 **Install** — Install it temporarily
3. �🛠️ **Use** — Execute your task with the skill's guidance
4. 🗑️ **Remove** — Auto-cleanup when done

## What happens behind the scenes

```
User says: "Find a skill for presentations"

1. npx skills find presentation
   → Returns ranked list of skills by installs

2. npx skills add <best-match> -y
   → Installs the skill temporarily

3. Read SKILL.md → Execute task
   → Claude uses the skill's instructions

4. npx remove <skill-name> -y
   → Auto-removes when task is complete
```

## Supported agents

Works with any agent that supports the [skills.sh](https://skills.sh) ecosystem:

- Claude Code
- Cursor
- GitHub Copilot
- Gemini CLI
- Codex
- Continue
- And more...

## Requirements

- [Claude Code](https://docs.claude.com/en/docs/claude-code) or compatible agent
- [npx skills](https://skills.sh) (comes with the Claude Code ecosystem)
- Node.js (for `npx`)

## When to use this

- ✅ "I need help with X" — where X might have a skill
- ✅ "Find a skill for X" — explicit search
- ✅ "Is there a skill for X?" — discovery
- ✅ You want a capability without permanent install

## When NOT to use this

- ❌ You want to keep a skill permanently
- ❌ You already know which skill you want (use `npx skills add` directly)
- ❌ The task has no matching skill (Claude will tell you)

## License

MIT

---

**Made with ❤️ by [sanyamk23](https://github.com/sanyamk23)**
