---
name: skill-finder
description: "Search, install, use, and auto-remove a skill on demand. Call this when the user asks to find a skill for a task, or says 'find a skill for X', 'is there a skill for X', 'search skills for X', or similar."
---

# Skill Finder — Just-in-Time Skill Workflow

Search for a skill by task, install it temporarily, use it for the current
request, then automatically remove it once the task is done.

This is a **disposable skill workflow** — skills are tools that come and go,
not permanent clutter.

## When to use this skill

Trigger this when the user:

- Asks "find a skill for X" / "is there a skill for X" / "search skills for X"
- Says "I need help with X" where X is a specialized task
- Wants a capability that might exist as an installable skill
- Explicitly mentions "skill finder" or "just-in-time skill"

## The workflow (execute in order)

### Step 1: Search

Run `npx skills find <query>` and capture the results. Parse the top matches
(those with the highest install counts are usually best).

```bash
npx skills find <query>
```

Output is lines like:

```
owner/repo@skill-name  NNN installs
```

Extract the `owner/repo@skill-name` identifiers.

### Step 2: Pick the best match

Choose the skill with the **highest install count** that matches the user's
intent. If multiple are tied, prefer:

1. Higher installs
2. Reputable owners (vercel, anthropic, google, etc.)
3. Clear task alignment

### Step 3: Confirm with the user

Tell the user what you found and what it does (from the URL / description).
Ask before installing if there are multiple good options:

```
Found: owner/repo@skill-name (NNN installs) — <brief description>
Install and use this skill?
```

If only one strong match exists, proceed directly.

### Step 4: Install the skill

```bash
npx skills add <owner/repo@skill-name> -y
```

The `-y` flag skips confirmation prompts.

### Step 5: Use the skill

Read the skill's `SKILL.md` to understand its instructions, then execute the
user's original task using that skill's guidance. The skill lives at:

- Project: `.agents/skills/<skill-name>/SKILL.md`
- Or global: `~/.agents/skills/<skill-name>/SKILL.md`

### Step 6: Auto-remove when done

**This is the critical step.** Once the user's task is complete, remove the
skill immediately:

```bash
npx skills remove <skill-name> -y
```

This keeps the environment clean — no leftover skills accumulating.

## Complete example

User: "find a skill for creating presentations"

```
1. Run:  npx skills find presentation
2. Found: googleworkspace/cli@recipe-create-presentation (29K installs)
3. Install: npx skills add googleworkspace/cli@recipe-create-presentation -y
4. Read: .agents/skills/recipe-create-presentation/SKILL.md
5. Execute the user's presentation task using skill instructions
6. Cleanup: npx skills remove recipe-create-presentation -y
```

## Edge cases

- **No skills found:** Tell the user and offer to do it with base capabilities.
- **Install fails:** Report the error; don't retry blindly.
- **Skill already installed:** Skip install, use directly, still remove after.
- **User says "keep it":** Skip the remove step if the user explicitly wants
  to keep the skill.

## Important notes

- Skills run with **full agent permissions** — review before use (the `find`
  command shows Gen / Socket / Snyk risk assessments).
- Always clean up unless the user asks to keep it.
- If the task spans multiple turns, keep the skill installed until the task is
  fully done, then remove.
