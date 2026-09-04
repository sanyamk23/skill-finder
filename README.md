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

## Install

```bash
npx skills add sanyamk23/skill-finder
```

That's it. The skill is now available in all your Claude Code sessions.

## Usage

Once installed, just tell Claude:

```
Find a skill for presentations
Find a skill for testing
Find a skill for deployment
```

Claude will:

1. 🔍 **Search** — Find the best skill for your task
2. 📥 **Install** — Install it temporarily
3. 🛠️ **Use** — Execute your task with the skill's guidance
4. 🗑️ **Remove** — Auto-cleanup when done

## Example

```
You: Find a skill for creating presentations

Claude:
  1. Searching... Found: googleworkspace/cli@recipe-create-presentation (29K installs)
  2. Installing...
  3. Creating your presentation using the skill's instructions...
  4. Done! Removing the skill to keep things clean.
```

## Requirements

- [Claude Code](https://docs.claude.com/en/docs/claude-code)
- [npx skills](https://skills.sh) (comes with the Claude Code ecosystem)

## License

MIT
