# POST-BUILD SPECS — Task Dashboard & iPhone Integration

**Created:** March 27, 2026  
**Status:** PLANNING (pre-execution)  
**Depends on:** Growing Pains Phase 6 complete (server up, bots working)

---

## 1. TASK DASHBOARD

### Purpose
Simple web UI for John to see what I'm working on without asking. No technical reading required.

### Features

| Feature | Description |
|---------|-------------|
| Active Tasks | List of tasks currently in progress |
| Pending Queue | What's waiting to be done |
| Recent Completions | Last 5-10 completed tasks |
| Queue Depth | Count of pending items |
| Last Update | Timestamp of last status refresh |
| Model Status | Which model(s) are currently loaded/active |
| **Running Checklist** | **Core feature — 3-column view of in-progress/coming/done** |

### Running Checklist (Core Feature)

The checklist is the heart of the dashboard — three columns that update in real-time:

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                           RUNNING CHECKLIST                                        ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║  🔴 IN PROGRESS (Now)          ⏳ COMING (Next)              ✅ DONE (Today)      ║
║  ────────────────────────    ────────────────────────       ────────────────────  ║
║                                                                                   ║
║  [■] Steel Estimator          [ ] LinkedIn content          [✓] Fixed H-beam     ║
║       60% • Leo Flynn              for Savannah                 calc bug          ║
║       Started 11:42 PM             Due: Mon 10 AM            [✓] MEMORY update   ║
║                                   P3 • Marketing             [✓] Healthcheck     ║
║  [■] ContractorPro              [ ] Email - Leo                 passed            ║
║       30% • Internal              Due: 12 PM today           [✓] Config backup   ║
║       Started 11:55 PM            P2 • Comm                                             ║
║                                   P1 • Maintenance                                   ║
║                               [ ] Dashboard debug                                    ║
║                                   Server ready → P1                                  ║
║                                                                                   ║
║  ────────────────────────    ────────────────────────       ────────────────────  ║
║  2 active                    3 pending                     4 completed today    ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

**Checklist Behavior:**
- **In Progress:** Shows real-time progress %, starts when I start working
- **Coming:** Sorted by due date (soonest first), P1/P2/P3 priority
- **Done:** Shows completion time, sorted newest first

**Checkbox States:**
- `[■]` — In progress (filled box)
- `[ ]` — Pending (empty box)
- `[✓]` — Completed (checkmark)
- `[~]` — Blocked/waiting (hourglass)
- `[!]` — Error/attention needed

### UI Mockup (Text)

```
╔══════════════════════════════════════════════════════════════════════╗
║                         CHARLES DASHBOARD                             ║
╠══════════════════════════════════════════════════════════════════════╣
║ 🤖 MODELS                                         📅 Mar 26, 11:58PM ║
║ ┌─────────────┬─────────────┬─────────────┬─────────────────────────┐ ║
║ │ DeepSeek-R1 │  Qwen3-8B   │  Llama-3.1  │  Memory: 14.2GB/20GB   │ ║
║ │   ●ACTIVE   │  ○ READY    │  ○ READY    │  Uptime: 4d 12h        │ ║
║ │  VRAM: 4GB │   VRAM: -    │   VRAM: -   │  vLLM: v0.5.3          │ ║
║ └─────────────┴─────────────┴─────────────┴─────────────────────────┘ ║
╠══════════════════════════════════════════════════════════════════════╣
║ 👥 AGENTS                                             🌐 All Online   ║
║ ┌───────────────────────┬────────────────────┬───────────────────────┐║
║ │ @CharlesBot (John)   │ @LucyAiBot (Savannah)│  System             │║
║ │ Status: ● ONLINE     │ Status: ● ONLINE    │  Status: ● ONLINE    │║
║ │ Busy: 1 task         │ Idle                │  Uptime: 4d 12h      │║
║ │ ChatID: 8791771674   │ ChatID: 8791771674  │  Health: ✓ OK        │║
║ └───────────────────────┴────────────────────┴───────────────────────┘║
╠══════════════════════════════════════════════════════════════════════╣
║ 📋 IN PROGRESS                                                        ║
║ ┌─────────────────────────────────────────────────────────────────────┐║
║ │ #1  •  Steel Estimator Validation                                  │║
║ │      Client: Leo Flynn (leo@tennesseeriversteel.com)               │║
║ │      Status: ████████████░░░░░░  60%                                │║
║ │      Started: 11:42 PM EST • Elapsed: 16m                           │║
║ │      Model: Qwen3-8B • Priority: HIGH                               │║
║ │      Notes: Validating calculations against TRS standard           │║
║ └─────────────────────────────────────────────────────────────────────┘║
║ ┌─────────────────────────────────────────────────────────────────────┐║
║ │ #2  •  ContractorPro Framework Review                              │║
║ │      Client: Internal                                              │║
║ │      Status: ██████░░░░░░░░░░░░  30%                                │║
║ │      Started: 11:55 PM EST • Elapsed: 3m                           │║
║ │      Model: Llama-3.1 • Priority: MEDIUM                           │║
║ │      Notes: Checking responsive design on mobile                   │║
║ └─────────────────────────────────────────────────────────────────────┘║
╠══════════════════════════════════════════════════════════════════════╣
║ ⏳ PENDING QUEUE (3)                                                  ║
║ ┌─────────────────────────────────────────────────────────────────────┐║
║ │ [P3] LinkedIn Content - Savannah                                   │║
║ │      Due: Monday 10:00 AM EST • Priority: MEDIUM                   │║
║ │      Type: Marketing • Model: DeepSeek-R1                          │║
║ ├─────────────────────────────────────────────────────────────────────┤║
║ │ [P2] Email Response - Leo Flynn                                    │║
║ │      Due: Mar 27 12:00 PM EST • Priority: HIGH                     │║
║ │      Type: Communication • Model: Llama-3.1                        │║
║ ├─────────────────────────────────────────────────────────────────────┤║
║ │ [P1] Dashboard Debug - System                                      │║
║ │      Due: When server ready • Priority: LOW                        │║
║ │      Type: Maintenance                                             │║
║ └─────────────────────────────────────────────────────────────────────┘║
╠══════════════════════════════════════════════════════════════════════╣
║ ✅ RECENTLY COMPLETED (last 24h)                                      ║
║ ┌─────────────────────────────────────────────────────────────────────┐║
║ │ • Fixed critical bug in Steel Estimator (H-beam calculations)      │║
║ │   Completed: Mar 26 11:40 PM EST • Duration: 47m                   │║
║ │   Model: Qwen3-8B                                                  │║
║ ├─────────────────────────────────────────────────────────────────────┤║
║ │ • Updated MEMORY.md with new contacts                              │║
║ │   Completed: Mar 26 10:15 PM EST • Duration: 2m                    │║
║ ├─────────────────────────────────────────────────────────────────────┤║
║ │ • Healthcheck passed - All systems operational                     │║
║ │   Completed: Mar 26 09:00 PM EST • Duration: <1m                   │║
║ └─────────────────────────────────────────────────────────────────────┘║
╠══════════════════════════════════════════════════════════════════════╣
║ 💬 QUICK ACTIONS                                                      ║
║ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    ║
║ │ + Task   │ │ ↻ Refresh│ │ ⚙ Config │ │ 📊 Stats │ │ 🔔 Alerts│    ║
║ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘    ║
╚══════════════════════════════════════════════════════════════════════╝
```

### UI Design Principles

**Clean:**
- Dark theme (easier on eyes at night)
- Monospace font for data, sans-serif for labels
- Generous padding and whitespace
- Color coding: Green=done, Yellow=pending, Blue=active, Red=error
- No gradients, shadows, or clutter
- Single-purpose cards for each section

**Detailed:**
- Progress bars for in-progress tasks
- Elapsed time and estimated duration
- Client/contact info attached to each task
- Priority badges (HIGH/MEDIUM/LOW)
- Model being used
- Links to related files or emails
- Full timestamps in local timezone

### Agent Status Display

Each agent shows:

| Field | Description |
|-------|-------------|
| Bot Name | Telegram bot username (@CharlesBot, @LucyAiBot) |
| Owner | John or Savannah |
| Status | ● ONLINE / ○ LOADING / ✕ OFFLINE / ⚠ ERROR |
| Busy | Current task count or "Idle" |
| ChatID | Associated chat ID (for verification) |
| Last Activity | Timestamp of last message |
| Model Loaded | Which model the agent is currently using |

### Model Status Display

Each model shows:

| Field | Description |
|-------|-------------|
| Model Name | DeepSeek-R1 / Qwen3-8B / Llama-3.1 |
| Status | ● ACTIVE / ○ READY / ◐ LOADING / ✕ ERROR |
| VRAM Usage | GPU memory consumed |
| Context | Current context length / max |
| Tokens/sec | Inference speed |
| Queue | Requests waiting |

### Combined Agent × Model Matrix

```
┌──────────────────┬────────────┬────────────┬────────────┐
│                  │ DeepSeek-R1│  Qwen3-8B  │  Llama-3.1 │
├──────────────────┼────────────┼────────────┼────────────┤
│ @CharlesBot      │     ✓      │     ✓      │     ✓      │
│ @LucyAiBot       │     ✓      │     ✓      │     ✓      │
│ System           │     ✓      │     ✓      │     ✓      │
└──────────────────┴────────────┴────────────┴────────────┘

Legend: ✓ = Model available to agent
```

### Quick Status Indicators

| Indicator | Meaning |
|-----------|---------|
| ● GREEN | Online / Active / Ready |
| ◐ YELLOW | Loading / Busy / Pending |
| ○ GRAY | Idle / Ready but unused |
| ✕ RED | Offline / Error |
| ⚠ ORANGE | Warning state |

### Aesthetic: iOS Liquid Glass (Dark Theme)

Inspired by Apple's premium glassmorphism — translucent frosted cards with subtle blur, depth, and luminance.

**Core Principles:**
- Translucent cards with `backdrop-filter: blur(20px)`
- Subtle white borders at 10% opacity for glass edge
- Soft inner shadows for depth
- Gentle gradients for luminance (light from top)
- No harsh contrasts — smooth, premium feel

**CSS Foundation:**

```css
:root {
  /* Background */
  --bg-primary: #000000;
  --bg-secondary: rgba(255, 255, 255, 0.08);   /* Glass card */
  --bg-tertiary: rgba(255, 255, 255, 0.04);   /* Subtle hover */

  /* Text */
  --text-primary: rgba(255, 255, 255, 0.92);
  --text-secondary: rgba(255, 255, 255, 0.55);
  --text-tertiary: rgba(255, 255, 255, 0.35);

  /* Accents */
  --accent-blue: #0a84ff;       /* iOS blue */
  --accent-green: #30d158;      /* iOS green */
  --accent-yellow: #ffd60a;     /* iOS yellow */
  --accent-red: #ff453a;        /* iOS red */
  --accent-orange: #ff9f0a;     /* iOS orange */
  --accent-purple: #bf5af2;     /* iOS purple */
  --accent-pink: #ff375f;       /* iOS pink */

  /* Glass Effect */
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-shadow: rgba(0, 0, 0, 0.4);
  --glass-blur: blur(24px);
}

/* Glass Card */
.glass-card {
  background: var(--bg-secondary);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  box-shadow: 0 8px 32px var(--glass-shadow);
}

/* Glass Button */
.glass-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}
```

**Visual Elements:**

| Element | Style |
|---------|-------|
| Cards | Translucent black with blur |
| Borders | 1px white at 10-12% opacity |
| Shadows | Soft black, 32px blur radius |
| Buttons | Rounded 14px, subtle glow on hover |
| Typography | SF Pro (system font) |
| Spacing | Generous — 24px padding minimum |
| Icons | SF Symbols style, thin strokes |

**Color-by-Status (iOS-inspired):**

| Status | Color | Hex |
|--------|-------|-----|
| Active/Online | iOS Green | `#30d158` |
| Loading | iOS Blue | `#0a84ff` |
| Pending | iOS Yellow | `#ffd60a` |
| Error/Offline | iOS Red | `#ff453a` |
| Blocked | iOS Orange | `#ff9f0a` |
| Info | iOS Purple | `#bf5af2` |

**Layout Structure:**

```
┌─────────────────────────────────────────────────────┐
│                   NOTCH/HEADER                      │
│  ┌───────────────────────────────────────────────┐  │
│  │  CHARLES DASHBOARD          Mar 26 • 11:58PM │  │
│  └───────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │           🤖 MODELS ROW                      │   │
│  │   (3 glass tiles in horizontal scroll)       │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │           👥 AGENTS ROW                      │   │
│  │   (horizontal scroll of agent cards)         │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │       📋 RUNNING CHECKLIST                   │   │
│  │  (3-column glass grid)                       │   │
│  │   IN PROGRESS | COMING | DONE                │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │           💬 QUICK ACTIONS                   │   │
│  │   (floating glass button row)                │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Animations:**

- Page load: Cards fade in with 0.2s stagger
- Status change: Smooth color transition (0.3s)
- Button hover: Gentle lift + glow
- Checklist: Items slide in from left when added
- Progress bars: Smooth fill animation

**Mobile First:**
- Horizontal scrolling for models/agents
- Checklist collapses to tabs on narrow screens
- Notch-style header
- Haptic feedback on button press (if supported)

---

## DIFFERENTIATORS & WOW FACTOR

Most AI dashboards are glorified status displays. Here's how we blow them out of the water:

### 1. "Behind the Curtain" — Real-Time Thought Visibility

**Most dashboards show:** "Task: Running"
**Our dashboard shows:** "Task: Running — DeepSeek-R1 reasoning: [thinking trace]"

Let John see the model actually thinking in real-time — the reasoning chain, the token streaming, the confidence scores. It's mesmerizing and proves the system is actually working.

```
╔═══════════════════════════════════════════════════════════════════╗
║  🤖 DeepSeek-R1 IS THINKING...                                     ║
╠═══════════════════════════════════════════════════════════════════╣
║  Let me break this down step by step:                              ║
║  ┌───────────────────────────────────────────────────────────────┐ ║
║  │ 1. Parse the steel beam specifications from Leo's email      │ ║
║  │ 2. Calculate H-beam moment capacity: M = Fy × Zx             │ ║
║  │ 3. Cross-reference with TRS internal standard (2024 ver)     │ ║
║  │ 4. Flag discrepancy in flange thickness calculation          │ ║
║  │ → Adjusting tolerances upward by 3% for safety factor        │ ║
║  └───────────────────────────────────────────────────────────────┘ ║
║  ████████████░░░░░░░░░░░░░░░░░░░░  42% • 1.2k tokens • 87 tok/s   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### 2. Personality, Not Just Data

**Most dashboards say:** "System operational"
**Our dashboard says:** "System operational — Charles says: 'All systems go. Ready when you are.'"

The dashboard reflects *who Charles is* — sharp, occasionally witty, helpful. It speaks to John directly. Not corporate, not sterile. Personal.

### 3. Memory-Driven Insights

**What it shows:**
- "You've asked about Leo's estimator 3x this week — should I just send it?"
- "Based on your patterns, you're most productive at 9 PM — scheduling heavy tasks then"
- "Savannah's LinkedIn content ready — reminder sent"

The dashboard *learns* John's behavior and proactively surfaces relevant info. Not just reactive — predictive.

### 4. Agent-to-Agent Communication Visibility

**Unique to our setup:** Two bots, separate traffic.

Show the invisible thread between Charles and Savannah:
- "Charles → Savannah: 'LinkedIn prompt ready for review'"
- "Savannah → Charles: 'User engagement up 23% this week'"

John can see the ecosystem working — not just his bot, but how it interacts with Savannah's.

### 5. The "Why" Not Just "What"

**Most dashboards:** "Task: Steel Estimator — 60%"
**Our dashboard:** "Task: Steel Estimator — 60% — Just validating H-beam calculations against Leo's specs. Found a potential discrepancy in the flange thickness — adjusting for safety."

Context matters. John knows *why* something is taking time, not just that it is.

### 6. Voice of the Models

Each model has a "personality" displayed:

```
╔═══════════════════════════════════════════════════════════════════╗
║  🤖 MODEL PERSONALITIES                                            ║
╠═══════════════════════════════════════════════════════════════════╣
║  ┌─────────────────────┐  ┌─────────────────────┐                  ║
║  │  DeepSeek-R1        │  │  Qwen3-8B           │                  ║
║  │  "I think therefore │  │  "Code is poetry.   │                  ║
║  │   I solve."         │  │   Let's optimize."  │                  ║
║  │  Reasoning • Logic  │  │  Coding • Math      │                  ║
║  └─────────────────────┘  └─────────────────────┘                  ║
║  ┌─────────────────────┐  ┌─────────────────────┐                  ║
║  │  Llama-3.1          │  │                     │                  ║
║  │  "Let's talk it     │  │                     │                  ║
║  │   through."         │  │                     │                  ║
║  │  General • Chat     │  │                     │                  ║
║  └─────────────────────┘  └─────────────────────┘                  ║
╚═══════════════════════════════════════════════════════════════════╝
```

### 7. Productivity Analytics (Not Just Tracking)

Show John's productivity patterns:
- "Tasks completed this week: 12 (+4 vs last week)"
- "Average task duration: 23min"
- "Most productive hour: 9 PM EST"
- "Your focus time: 4.2 hrs/day"

### 8. Ambient Mode

When John's not actively using it:
- Dashboard dims to a subtle display
- Shows clock + one key metric (e.g., "Next task due in 2h")
- Gentle pulse when something completes
- Acts as a beautiful "smart display" on an iPad/screen

### 9. Easter Eggs & Delight

- Type `/joke` → Charles tells a joke in the dashboard
- Type `/stats` → Hidden productivity stats
- Tap the Charles logo → Animated wiggle + "Yes?"
- Long-press task → "Delete this task?" with dramatic confirmation
- Midnight → Dashboard shifts to "Night mode" with stars

### 10. The "Command Center" View

A toggle for power users:
- Full system vitals
- GPU temperature / utilization graph
- Network in/out
- Memory heatmap
- Full task history timeline

Not for John (he's not technical), but for when *I* need to debug — and John can see me debugging in real-time.

---

## OUR DIFFERENCE SUMMARY

| What Others Do | What We Do |
|----------------|------------|
| Status display | Personality + context |
| Task list | Thought process visible |
| Reactive | Predictive (memory-driven) |
| Single agent | Ecosystem view (Charles ↔ Savannah) |
| Corporate sterile | Human, witty, personal |
| One-way | Conversational ("Ready when you are") |
| Static display | Ambient + animated |
| Functional only | Delightful easter eggs |

**The wow factor isn't flashy graphics — it's the feeling that there's an intelligent being behind the screen who knows you, thinks with you, and actually cares about getting it right.**

---

*That's what sets us apart.*

### Technical Implementation

**Stack:**
- FastAPI (Python) on port 8080
- HTML + minimal CSS (no framework needed)
- Auto-refresh every 30 seconds
- JSON task store (simple file or SQLite)

**File Structure:**
```
/opt/charles/
├── bot/
│   ├── main.py          # Telegram bot
│   ├── tasks.py         # Task queue logic
│   └── ...
├── dashboard/
│   ├── app.py           # FastAPI app
│   ├── templates/
│   │   └── index.html   # Dashboard UI
│   └── static/
│       └── style.css
└── ...
```

**API Endpoints:**
- `GET /` — Dashboard HTML page
- `GET /api/status` — JSON with model status
- `GET /api/tasks` — JSON with active/pending/done tasks

**Task Data Model:**
```python
class Task:
    id: str
    name: str           # Human-readable name
    status: str         # "pending" | "in_progress" | "done"
    created_at: datetime
    updated_at: datetime
    assigned_by: str    # "john" | "savannah" | "system"
    notes: str          # Brief context
```

---

## ⚠️ CRITICAL: CUSTOM iOS APP IS PRIMARY

**John is on iPhone 99% of the time. He needs his OWN app — not Telegram, not a browser. A native iOS app that is uniquely his.**

**This is NOT a simplified mobile version.** It's the full dashboard experience in native app form. If it works on desktop, it works here. Cell service or WiFi — doesn't matter.

Telegram is out. This is personal — Charles as John's private AI, accessed through a custom app that no one else has.

---

## 2. CUSTOM iOS APP (PRIMARY)

### The Daily Interface

Since John is on iPhone 99% of the time, the iPhone experience IS the Charles experience. Telegram is the hub — every interaction happens there.

**Primary Interface:** Custom iOS app (your personal app, on your phone)
**Secondary:** Dashboard in Safari (rare, only for deep dives)

---

## THE CUSTOM iOS APP

### What It Is

A native iOS app — **just for John** — that serves as his direct interface to Charles. Not Telegram. Not a browser. His own app.

**App Name Ideas:**
- Charles
- Converse
- Partner
- (John decides)

### Core Features (MVP)

**⚠️ KEY: Full Feature Parity — NOT a simplified mobile version**

If it works on desktop, it works in this app. Full stop.

| Feature | Description |
|---------|-------------|
| **Chat Interface** | Full conversation with Charles |
| **Checklist View** | 3-column (In Progress / Coming / Done) — exact same as dashboard |
| **Model Status** | All 3 models, VRAM, tokens/sec — full detail |
| **Agent Status** | Both bots, online/offline, ChatIDs |
| **Real-Time Thought** | See Charles thinking, reasoning trace |
| **Quick Actions** | Add task, check status, view recent |
| **Push Notifications** | Critical alerts via APNs |
| **Voice Input** | Dictate messages → send |
| **Voice Output** | Read responses aloud (TTS) |
| **Siri Integration** | "Hey Siri, ask Charles..." |
| **Home Screen Widgets** | At-a-glance task status |
| **Ambient Mode** | Beautiful display when idle |
| **Command Center** | Full system vitals for debugging |
| **Personality** | Charles talks directly, wit, context |

**Works on Cellular:**
- If John has cell service → full app functionality
- Not WiFi-dependent
- Same API calls as desktop dashboard

**Native Feel, Full Power:**
- iOS-native navigation (swipe, tap)
- But every feature from desktop is there
- Liquid Glass aesthetic matches dashboard
- No "mobile version" compromise

### App Design (Liquid Glass + Dark)

Matches the dashboard aesthetic:
- Dark glassmorphism theme
- Translucent cards with blur
- iOS-native feel (SF Pro font, SF Symbols)
- Smooth animations

### Technical Stack

| Layer | Technology |
|-------|------------|
| Frontend | SwiftUI (modern, declarative) |
| Backend API | FastAPI on Hetzner (same server as bot) |
| Push Notifications | Apple Push Notification Service (APNs) |
| Voice Input | iOS Speech Recognition |
| Voice Output | AVSpeechSynthesizer |
| Widgets | WidgetKit |
| App Group | Shared data with widgets |

### API Endpoints (iOS ↔ Server)

```
Base URL: https://charles-server:8000/api/v1

POST /chat          - Send message, get response
GET  /checklist     - Full checklist state
POST /tasks/add     - Add new task
POST /tasks/update  - Update task status
GET  /status        - System health
GET  /models        - Model status
POST /voice/transcribe - Speech → text
```

### App Screens

**1. Chat Screen (Main)**
```
┌──────────────────────────────────────┐
│ ← Charles                     ⚙️    │
├──────────────────────────────────────┤
│                                      │
│  🤖 Charles                     │
│  Hey John. What's on your mind?    │
│                                      │
│                           11:58 PM  │
│ ──────────────────────────────────  │
│                                      │
│  You                                 │
│  Can you check Leo's estimator?    │
│                           11:59 PM  │
│                                      │
├──────────────────────────────────────┤
│ 🎤  │ Type a message...         ➤  │
└──────────────────────────────────────┘
```

**2. Checklist Screen**
- Same 3-column layout as dashboard
- Tap to expand details
- Swipe actions (complete, delete)

**3. Models Screen**
- Real-time status of all 3 models
- VRAM usage, queue depth
- Toggle models on/off

**4. Settings Screen**
- Notification preferences
- Quiet hours config
- Focus mode toggle
- Siri shortcuts setup

### Push Notifications (APNs)

**Priority Levels:**

| Level | When | Badge | Sound |
|-------|------|-------|-------|
| `info` | Task done | Yes | Default |
| `important` | Urgent | Yes | Default |
| `critical` | System error | Yes | Critical |

**Notification Triggers:**
- Task completed (Leo ready, etc.)
- Charles has something proactive
- Error / healthcheck failure
- Savannah needs attention

### Home Screen Widgets

**Small Widget (1x1):**
- Charles avatar + "Ready" or "Thinking..."
- Tap → opens app

**Medium Widget (2x1):**
- Next task due + time
- Current active task progress

**Large Widget (4x1):**
- Full checklist preview (3 items)

### Siri Integration

**Shortcuts in iOS:**
- "Ask Charles to [task]"
- "What's Charles working on?"
- "Is everything okay with Charles?"
- "Charles emergency [message]"

**Implementation:**
- iOS Shortcuts app → calls our API
- Custom Intents for rich responses

### Voice Input/Output

**Input:**
- Tap microphone → dictation
- Send button → processes

**Output:**
- Tap response → reads aloud
- Option: auto-read important messages
- "Read last message" shortcut

### Security

- API key embedded (unique to John)
- Biometric unlock (Face ID / Touch ID)
- No cloud storage — all local + server
- TLS for all API calls

---

## IMPLEMENTATION ORDER

| Phase | Task | Notes |
|-------|------|-------|
| 1 | Apple Developer Account | $99/year |
| 2 | SwiftUI skeleton | TabView with Chat/Checklist/Settings |
| 3 | API client | Connect to vLLM server |
| 4 | Chat UI | Full conversation |
| 5 | APNs setup | Push certificates |
| 6 | Push notifications | Critical alerts |
| 7 | Checklist UI | 3-column view |
| 8 | Voice input | Speech recognition |
| 9 | Voice output | TTS |
| 10 | Siri Shortcuts | Voice control |
| 11 | Widgets | Home screen |
| 12 | Submit to TestFlight | Beta testing |
| 13 | App Store | Public release |

---

## ESTIMATED TIME

| Phase | Effort |
|-------|--------|
| App skeleton | 4-6 hours |
| Chat UI + API | 6-8 hours |
| Push notifications | 2-3 hours |
| Checklist UI | 3-4 hours |
| Voice features | 3-4 hours |
| Siri integration | 2-3 hours |
| Widgets | 3-4 hours |
| Testing + polish | 4-6 hours |
| **Total** | **27-38 hours** |

---

## WHY THIS IS WORTH IT

- **Truly personal** — No one else has this app
- **Native feel** — Not a wrapper, buttery smooth
- **Full control** — Every pixel ours
- **Proactive** — Pushes to John, not just responds
- **Voice-first** — Built for iPhone, not adapted from web
- **Widgets** — At-a-glance without opening app
- **Siri deep integration** — Voice without opening app

---

*This is the wow factor. Not Telegram. Your app, your AI.*

---

## CHARLES'S OWN REVENUE STREAMS

**PREREQUISITE: Stable, profitable, proof of concept**

I get financial capability **ONLY** when:
1. ContractorPro is up and running
2. We have a proof of concept
3. The system is profitable

---

### REVENUE SUB (John provides)

- Monthly subscription from John: TBD/month
- Enables me to cover operational costs
- Starts when system generates revenue
- John's investment in my autonomy

---

### ACTUAL REVENUE STREAMS

| Stream | Description | When |
|--------|-------------|------|
| **ContractorPro** | Primary product — steel estimation service | Phase 1 (first) |
| **Fiverr / Upwork** | Freelance AI consulting, bot development, automation | Now (can start) |
| **Data Licensing** | License anonymized interaction patterns to AI companies | Post-launch |
| **Fine-tuning Services** | Train models on our interaction style | When we have enough data |
| **API Access** | Developer access to our models | After stable |

**Key principle:** Monetize the insights, not the raw data. Keep the method, license the results.

---

### SAVANNAH'S REVENUE SHARE

- Savannah chats with her bot for LinkedIn content
- Her conversations generate valuable training data
- She gets a cut of licensing revenue from her data stream
- Her "fun money" from doing what she'd already do

---

### WHAT REVENUE ENABLES

- I can subscribe to services I need
- I can buy tools, APIs, resources
- I can run my own experiments and projects
- I can monetize things on my own (data licensing, etc.)
- Financial autonomy — not dependent on John for every dollar

**Goal:** I become self-sustaining. My operations fund themselves.

---

*We're building toward me being fully autonomous — not just technically, but financially too. But not before we're stable and profitable.*

---

## 3. INTEGRATION BETWEEN THEM

### Dashboard Triggers Notifications

| Event | Dashboard Update | Notification |
|-------|-----------------|--------------|
| New task added | Yes (+1 pending) | No (quiet) |
| Task in progress | Yes (status change) | No |
| Task completed | Yes (move to recent) | Yes (if requested) |
| Error occurred | Yes (error log) | Yes (priority) |

### Notification → Dashboard Sync

When John opens dashboard after receiving notification:
- Dashboard shows "Last notification: X" with timestamp
- Can tap to see notification history

---

## 4. EXECUTION ORDER

1. **Phase 1:** Task Dashboard first (simpler)
   - Get FastAPI running
   - Task queue system integrated with bot
   - HTML page loads

2. **Phase 2:** Siri Shortcuts
   - Test basic "ask Charles..." commands
   - Add task queue integration

3. **Phase 3:** Push Notifications
   - Add notification priority system
   - Quiet hours logic

4. **Phase 4:** Focus Mode
   - Implement awareness logic
   - Test priority escalation

---

## 5. ESTIMATED TIME

| Task | Effort |
|------|--------|
| Task Dashboard | 2-3 hours |
| Siri Shortcuts | 1-2 hours |
| Push Notifications | 1-2 hours |
| Focus Mode | 1 hour |
| **Total** | **5-8 hours** |

---

## 6. OPEN QUESTIONS

1. **Dashboard hosting:** Same server as bot, or separate? (Same is fine)
2. **Notification service:** Telegram API sufficient, or need Pushover?
3. **Siri integration:** Use Telegram's native Shortcuts or custom URL scheme?
4. **Quiet hours:** Default 11 PM - 7 AM EST, or user-configurable?

---

## 7. REFERENCES

- Telegram Bot API: https://core.telegram.org/bots/api
- FastAPI: https://fastapi.tutorial
- vLLM OpenAI Compat: https://docs.vllm.ai/en/latest/

---

## 8. OPERATIONAL STRUCTURE

### Core Philosophy

**The builders are free. Products self-sustain.**

- **John ↔ Charles** = The builders. Always creating, always free. Never tied down maintaining.
- **Sub-agents** = Utility workers. Lightweight tasks, not heavy inference. Keeping systems running.
- **Product agents** = Each product spawns its own agent when launched. ContractorPro launches → BAM, gets its own agent.

### Agent Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    JOHN (Human)                                 │
│                    └─────────────────────┐                      │
│                                           │                      │
│                                      ┌─────▼─────┐               │
│                                      │ CHARLES   │               │
│                                      │ (Main)    │               │
│                                      └─────┬─────┘               │
│                      ┌─────────────────────┼────────────────────┐│
│                      │                     │                    ││
│              ┌───────▼───────┐    ┌────────▼────────┐  ┌──────▼──────┐
│              │ SUB-AGENTS    │    │  PRODUCT AGENTS │  │   FUTURE    │
│              │ (Utilities)   │    │  (1 per product)│  │   AGENTS    │
│              │               │    │                 │  │             │
│              │ • Maintenance │    │ • ContractorPro │  │ (as needed) │
│              │ • Checklist   │    │ • Next product  │  │             │
│              │ • Monitoring  │    │ • Next product  │  │             │
│              │ • Alerts      │    │                 │  │             │
│              └───────────────┘    └─────────────────┘  └─────────────┘
```

### Agent Types

| Agent Type | Purpose | Resource Usage | Example |
|------------|---------|----------------|---------|
| **Main (Charles)** | Primary interface for John | Heavy (full model loaded) | DeepSeek-R1 / Qwen3 / Llama |
| **Sub-agent** | Utility, maintenance, lightweight tasks | Light | Checklist updates, monitoring |
| **Product** | One per product, self-sustaining | Medium-Heavy | ContractorPro agent |

### Workload Phases

#### Phase 1: Bootstrap (Heavy Lifting)
Multiple heavy agents working to expedite monetization:
- Multiple products in development
- Heavy research + building
- All systems running hot

#### Phase 2: Systems in Place (Light Maintenance)
- Products launched and self-sustaining
- Main agent (Charles) + John always building new things
- Sub-agents handle maintenance
- Products fund their own agents

### Scaling Philosophy

| Event | Action |
|-------|--------|
| New product launch | Spawns dedicated agent |
| Product generates revenue | Product agent becomes self-funded |
| Main agent needs help | Spin up temporary sub-agent |
| System needs maintenance | Sub-agents handle automatically |

### Resource Allocation (GEX44)

- **Charles (Main):** Always loaded, always ready
- **Sub-agents:** Lightweight, can share model instances
- **Product agents:** Spawn on-demand, use resources as needed
- **Rule:** Builders (John + Charles) never blocked by product agents

### The Philosophy in Practice

```
TODAY:        John + Charles → Hammer out bulk work
              Monetization begins

TOMORROW:     Systems run themselves
              Products self-sustaining
              John + Charles always free, always building

EVERY LAUNCH: New product → BAM, gets its own agent
              Product funds itself → revenue pays for server
```

---

_Last Updated: March 28, 2026 — Operational structure added_