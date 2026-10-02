# Night Crew — the ADHD edition of the Paperclip fork

Date: 2026-10-02 · Owner: Benn + Friday · Status: DESIGN (approved direction this evening, build next)

Benn's words, preserved: "every task should go into this initial area... they aren't sitting there stagnant. All the agents running locally can work on them... a planning agent whose sole purpose is prepping the idea in all the ways it can... those questions are never put in front of me without me going to look on purpose... context switching should be avoided... linked to the drafting board work station to collaborate on."

## 1. The Lot (parking zone, formalized)

Zone `a` becomes a first-class **lot**, not a graveyard:

- **Everything captures into the lot by default.** New project, new task, new idea → zone `a`, no ceremony, no forms.
- **Invisibility is the contract**: lot items NEVER appear in the dashboard, NEVER in the inbox, NEVER in notifications. Not "collapsed" — absent, on purpose.
- **Deliberate access only**: a "walk the lot" view he opens when he chooses. No badges with counts, no "ready" pings — at most a quiet dot he can choose to look at.
- The active lane (zone `b`) stays platform-enforced single (already shipped in v0.5 zones).

Build: zone-scoped visibility filters across dashboard feeds, inbox, and notification routes (server-side, not CSS hiding).

## 2. The Night Crew (agents that work the lot)

Lot items are worked, not stored:

- **The Planner** (core agent, runs on local models — Strata/Qwen3.8-Flash-Next on Friday, qwen3.8:27b on the Mini):
  1. For each lot item: research the internet for knowledge (domain, parts, prior art, approaches, costs, what it would take).
  2. Learn what's needed; write a living **prep note** on the project (research findings accumulate).
  3. Formulate the questions only Benn can answer (choices, taste, constraints, clarity).
  4. Convert each question into an **answer-task** — a one-tap-answerable task type ("Which motor: A 12mm or B 25mm? 🅰/🅱") that sits in a "questions for you" area — visible ONLY when he opens it on purpose. Never pushed, never in the inbox, never in the DM.
  5. **Re-evaluate loop**: after each pass — more research needed? more clarity needed? or ready? — keep prepping until the item is picked up or promoted.
- **Builders** may also pick lot items for real work (drafts, prototypes, sketches) — stagnant is banned.

## 3. Promotion + pickup

- He walks the lot on purpose → picks an item up (swaps the active lane — the old lane auto-parks with a plan).
- The Planner can mark items **ready** (prep complete, questions answered) — still invisible, but the lot view surfaces readiness the moment he looks.
- Moving to the active workspace = the existing zone-b promotion + a park-with-a-plan for whatever leaves.

## 4. Context-switch guard

- The active workspace is clean: no other projects' tasks, no lot noise, one lane.
- If he drifts (asks about a parked thing mid-lane): capture it to the lot instantly, then one gentle bring-back: "noted to the lot — you're in [lane] right now." Never a second nudge, never a block.
- Flow is never interrupted for organization — that's the crew's job.

## 5. Drafting Table bridge (the maker lane)

- Active-workspace projects of type physical product / 3D model / image / illustration get a **linked Drafting Table room** (typed docs exist: napkin / concept / model3d / pcb — the model types already match).
- Paperclip agents get **read access to the linked room/doc content** via the Drafting Table HTTP API (GET /api/room/{name}) so the planner/builders can analyze in-progress content (current model state, sketches, notes).
- Two-way: agents can drop reference material into the linked doc's Friday feed (POST note), so research lands next to the work.

## 6. Build order (fork features, smallest-first)

1. Zone-scoped visibility contract (dashboard + inbox + notifications honor zones) — the lot becomes real.
2. "Walk the lot" view + ready state.
3. Answer-tasks (question task type + one-tap answers in the deliberate view).
4. Planner agent definition + night-crew routine (local-model lane; research → prep note → answer-tasks → re-evaluate).
5. Context-switch guard nudge.
6. Drafting Table project link + agent read access.

Anti-patterns honored (research-backed): no fake urgency, no streaks/shame, no notification spam, warn-don't-block, narrative-not-analytics.
