# Codecraft

## Run the learning app

From this directory, start the bundled local web server and same-origin runner proxy:

```sh
node server.js
```

Open `http://127.0.0.1:8000`. Course content is stored in `content.js` and `catalog.js`; `curriculum.js` adds four level routes, runnable concept labs, and curated references. The app shell and interactions are in `index.html`, `app.js`, and `styles.css`. The server proxies only runtime-list and execute requests to the loopback Piston service, avoiding browser cross-origin issues.

## Run code in Code Studio

JavaScript runs in a sandboxed browser frame. HTML and CSS render in sandboxed previews. Other listed languages use a Piston instance that you configure. The app does not upload learner code to a public compiler. Before sending code to the configured endpoint, the learner must explicitly check **Send code to my configured runner**.

To start a local Piston service, install Docker and run this from the project directory:

```sh
docker compose up -d
```

The Compose file binds Piston to `127.0.0.1:2000`; Code Studio uses the local `/runner/v2` proxy by default. Install the needed language runtimes in the Piston instance before running them. The run button fetches the installed runtimes and displays a red diagnostic if the service or language is unavailable. Keep this privileged sandbox service on loopback; do not expose it to a public network. Piston isolates execution and applies resource limits. Runtime availability and installation steps are described in the [Piston project documentation](https://github.com/engineer-man/piston).

The compiled-language runner is self-hosted because the Piston project says its public API requires authorization and is not freely available to projects like this one. Code is sent only to the endpoint the learner configures and approves. To see available runtime packages, request `http://localhost:2000/api/v2/packages`; use Piston's package installation endpoint or CLI to install a listed language/version. The app's `/runtimes` list shows which languages are currently ready to execute.

## What is included

- 43 courses covering programming languages, web skills, computer science, mobile development, data and AI, security, Linux, cloud, DevOps, and automation.
- Four entry levels in every course: Beginner, Medium, Intermediate, and Advanced. Learners can start at any level.
- 271 lessons, including 129 progressive code labs, plus 43 guided projects, exercises, and knowledge checks.
- Course search, filters, roadmaps, progress, bookmarks, notes, a practice arena, and a same-page Code Studio.
- An animated, clickable black cat study companion in the lower corner, with a speech bubble and reduced-motion support.
- Lesson and project completion requires a learner-authored code change and a successful run. Drafts persist on the device; changing code after a successful run requires another run.
- Red error output and troubleshooting suggestions for runtime and compiler failures.
- Local learner profiles and guest mode. These are device-only profiles, not password authentication or cloud sync.
- Course-level references to maintained language documentation, standards, and learning resources.

Framework concepts that need dependencies are taught through small runnable browser simulations; production framework projects still need their normal package setup. Language labs use complete runnable starters rather than diagram-only samples.

## Add courses

Add programming-language course records to `tracks` in `catalog.js`; add web, computer science, and technology skill records to `skills`. Each track is converted into three ordered stages and lessons. For bespoke multi-lesson courses, add the full `stages` structure to `window.COURSES` in `content.js`. Every lesson should include an introduction, objectives, prerequisites, concept explanation, runnable or clearly marked reference example, line explanations, common mistakes, a knowledge check, and an exercise. Add matching records to `window.PROJECTS` and `window.PROBLEMS` as appropriate.

## Current limits

Code Studio does not provide a compiler service by itself. Compiled languages require a running isolated Piston instance with the corresponding runtime installed. Device-only learner profiles do not sync between browsers or devices. There is no database-backed account system, password recovery, AI tutor, or cloud progress sync.
