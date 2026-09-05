<div align="center">

<!-- Animated SVG Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Skill%20Finder&fontSize=50&fontAlignY=35&animation=fadeIn&fontColor=fff&desc=Just-in-Time%20Skill%20Workflow%20for%20AI%20Agents&descSize=18&descAlignY=55" width="100%" />

<!-- Animated Typing Effect -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=500&color=8B5CF6&center=true&vCenter=true&width=700&lines=Search+%E2%86%92+Install+%E2%86%92+Use+%E2%86%92+Remove;No+permanent+clutter.+Just+results.;Find+the+right+skill+for+any+task.;One+command.+Infinite+possibilities." alt="Typing SVG" />

<!-- Animated Badges -->
<img src="https://img.shields.io/badge/Claude%20Code-6366F1?style=for-the-badge&logo=anthropic&logoColor=white&labelColor=1a1a2e" /> <img src="https://img.shields.io/badge/Skills.sh-8B5CF6?style=for-the-badge&logoColor=white&labelColor=1a1a2e" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1a1a2e" /> <img src="https://img.shields.io/badge/MIT-License-yellow?style=for-the-badge&labelColor=1a1a2e" />

<!-- GitHub Stats -->
<p align="center">
  <img src="https://img.shields.io/github/stars/sanyamk23/skill-finder?style=flat-square&color=F59E0B" />
  <img src="https://img.shields.io/github/forks/sanyamk23/skill-finder?style=flat-square&color=10B981" />
  <img src="https://img.shields.io/github/issues/sanyamk23/skill-finder?style=flat-square&color=EF4444" />
</p>

<!-- Wave Divider -->
<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2&section=header&width=100%"/>

</div>

---

> [!IMPORTANT]
> **Skills are tools, not clutter.** Skill Finder follows a just-in-time workflow: search, install, use, then auto-remove. Your environment stays clean.

## 🎬 See It in Action

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  You: "Find a skill for creating presentations"                         │
│                                                                         │
│  Claude:                                                                │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 1. 🔍 Searching...                                              │   │
│  │    Found: googleworkspace/cli@recipe-create-presentation        │   │
│  │    ↳ 29K installs — Create Google Slides presentations          │   │
│  │                                                                 │   │
│  │ 2. 📥 Installing...                                             │   │
│  │    ↳ npx skills add googleworkspace/cli@recipe-create...        │   │
│  │                                                                 │   │
│  │ 3. 🛠️  Creating your presentation...                            │   │
│  │    ↳ Using skill instructions for professional results          │   │
│  │                                                                 │   │
│  │ 4. 🗑️  Cleaning up...                                           │   │
│  │    ↳ npx skills remove recipe-create-presentation               │   │
│  │    ↳ Environment clean!                                         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Why Skill Finder?

<table>
<tr>
<td width="33%" align="center">

### 🔍 Smart Search
Finds the best skill for your task ranked by installs, reputation, and relevance

</td>
<td width="33%" align="center">

### 🧹 Auto-Cleanup
Removes the skill when the task is done — no leftover clutter

</td>
<td width="33%" align="center">

### ⚡ Just-in-Time
Skills are temporary tools, not permanent baggage

</td>
</tr>
</table>

---

## 🚀 Install

### Quick Install (Recommended)

```bash
npx skills add sanyamk23/skill-finder -g -y
```

> The `-g` flag installs globally — works in **all** your Claude Code sessions.

### Project-Only Install

```bash
npx skills add sanyamk23/skill-finder -y
```

> Installs only for the current project.

---

## 🎮 Usage

Once installed, just tell Claude:

```
Find a skill for presentations
```

Or try these:

```
Find a skill for testing
Find a skill for deployment
Find a skill for react
Is there a skill for design?
Search skills for documentation
```

---

## 🏗 How It Works

<details>
<summary><b>📖 Click to see the full workflow</b></summary>

```
┌──────────────────────────────────────────────────────────────┐
│                  SKILL FINDER WORKFLOW                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  User Query: "Find a skill for X"                            │
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────────────┐                                     │
│  │ 1. 🔍 SEARCH        │  npx skills find <query>            │
│  │                     │  → Returns ranked skill list         │
│  └──────────┬──────────┘                                     │
│             │                                                │
│             ▼                                                │
│  ┌─────────────────────┐                                     │
│  │ 2. 🎯 PICK          │  Choose best match by:              │
│  │                     │  • Highest installs                 │
│  │                     │  • Reputable owner                  │
│  │                     │  • Task alignment                   │
│  └──────────┬──────────┘                                     │
│             │                                                │
│             ▼                                                │
│  ┌─────────────────────┐                                     │
│  │ 3. 📥 INSTALL       │  npx skills add <skill> -y          │
│  │                     │  → Temporary install                │
│  └──────────┬──────────┘                                     │
│             │                                                │
│             ▼                                                │
│  ┌─────────────────────┐                                     │
│  │ 4. 🛠️  USE           │  Read SKILL.md                     │
│  │                     │  Execute user's task                │
│  └──────────┬──────────┘                                     │
│             │                                                │
│             ▼                                                │
│  ┌─────────────────────┐                                     │
│  │ 5. 🗑️  REMOVE        │  npx skills remove <skill> -y       │
│  │                     │  → Environment clean!               │
│  └─────────────────────┘                                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

</details>

---

## 🌟 Example Conversations

### Example 1: Presentation Skill

```
You:  "Find a skill for creating presentations"

Claude:
  🔍 Found: googleworkspace/cli@recipe-create-presentation (29K installs)
  📥 Installing...
  🛠️  Creating your presentation with Google Slides integration...
  🗑️  Done! Skill removed. Environment clean.
```

### Example 2: Testing Skill

```
You:  "Is there a skill for testing?"

Claude:
  🔍 Found: Multiple options —
     • vitest-testing (15K installs)
     • playwright-e2e (12K installs)
     • jest-unit-testing (8K installs)
  📥 Installing vitest-testing...
  🛠️  Setting up your test suite...
  🗑️  Done! Cleaned up.
```

### Example 3: No Skill Found

```
You:  "Find a skill for underwater basket weaving"

Claude:
  🔍 No skills found for this task.
  💡 I'll help you with my base capabilities instead!
```

---

## 🛠 Supported Agents

Skill Finder works with any agent that supports the [skills.sh](https://skills.sh) ecosystem:

<table>
<tr>
<td align="center"><b>Claude Code</b></td>
<td align="center"><b>Cursor</b></td>
<td align="center"><b>GitHub Copilot</b></td>
<td align="center"><b>Gemini CLI</b></td>
</tr>
<tr>
<td align="center"><b>Codex</b></td>
<td align="center"><b>Continue</b></td>
<td align="center"><b>Kimi Code</b></td>
<td align="center"><b>OpenCode</b></td>
</tr>
</table>

---

## 📋 Requirements

- [Claude Code](https://docs.claude.com/en/docs/claude-code) or compatible agent
- [Node.js](https://nodejs.org) (for `npx`)
- [npx skills](https://skills.sh) (comes with the Claude Code ecosystem)

---

## ❓ FAQ

<details>
<summary><b>What if no skill is found?</b></summary>

Claude will tell you and offer to help with its base capabilities. No hard feelings.

</details>

<details>
<summary><b>What if I want to keep a skill?</b></summary>

Just say "keep it" and the auto-remove step is skipped. You're in control.

</details>

<details>
<summary><b>Does this work with other AI agents?</b></summary>

Yes! Any agent supporting the skills.sh ecosystem works. See the Supported Agents section above.

</details>

<details>
<summary><b>Is this safe?</b></summary>

Skills run with full agent permissions. The `find` command shows risk assessments (Gen / Socket / Snyk). Always review before using.

</details>

---

## 🗺 Roadmap

- [x] Just-in-time skill workflow
- [x] Auto-remove on task completion
- [x] Global and project-scoped installs
- [x] Multi-agent support
- [ ] Interactive skill picker UI
- [ ] Skill usage analytics
- [ ] Custom skill ranking preferences
- [ ] Batch skill operations

---

## 🤝 Contributing

We welcome contributions! Feel free to:

- 🐛 [Report bugs](https://github.com/sanyamk23/skill-finder/issues)
- 💡 [Suggest features](https://github.com/sanyamk23/skill-finder/issues)
- 🔧 [Submit pull requests](https://github.com/sanyamk23/skill-finder/pulls)

---

## ⭐ Star History

If this project helps you, please consider giving it a star!

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

<!-- Footer Wave -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer&text=Stop%20cluttering.+Start%20finding.&fontSize=22&fontAlignY=70&fontColor=fff" width="100%" />

<p>
<a href="https://github.com/sanyamk23/skill-finder/issues">Report Bug</a> •
<a href="https://github.com/sanyamk23/skill-finder/issues">Request Feature</a> •
<a href="https://github.com/sanyamk23/skill-finder/discussions">Discussions</a>
</p>

**Made with ❤️ by [sanyamk23](https://github.com/sanyamk23)**

</div>
