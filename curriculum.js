/* Level pathways, runnable concept labs, and primary learning references. */
(() => {
  const courses = window.COURSES || [];
  const projectFor = id => (window.PROJECTS || []).find(project => project.course === id);
  const sources = {
    html:[['MDN: Core web development','https://developer.mozilla.org/en-US/docs/Learn_web_development/Core'],['WHATWG: HTML Living Standard','https://html.spec.whatwg.org/']],
    css:[['MDN: CSS fundamentals','https://developer.mozilla.org/en-US/curriculum/core/css-fundamentals/'],['web.dev: Learn CSS','https://web.dev/learn/css/']],
    javascript:[['MDN: JavaScript Guide','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'],['ECMAScript specification','https://tc39.es/ecma262/']],
    python:[['Python Tutorial','https://docs.python.org/3/tutorial/'],['Python Language Reference','https://docs.python.org/3/reference/']],
    cpp:[['cppreference: C++ language','https://en.cppreference.com/w/cpp/language'],['C++ Core Guidelines','https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines']],
    c:[['cppreference: C language','https://en.cppreference.com/w/c/language'],['GNU C manual','https://www.gnu.org/software/gnu-c-manual/']],
    java:[['Dev.java: Learn Java','https://dev.java/learn/'],['Java language specification','https://docs.oracle.com/javase/specs/']],
    csharp:[['Microsoft Learn: C#','https://learn.microsoft.com/en-us/dotnet/csharp/'],['.NET documentation','https://learn.microsoft.com/en-us/dotnet/']],
    php:[['PHP manual','https://www.php.net/manual/en/'],['PHP: Getting started','https://www.php.net/manual/en/getting-started.php']],
    go:[['Go tutorials','https://go.dev/learn/'],['A Tour of Go','https://go.dev/tour/']],
    rust:[['Rust learning resources','https://www.rust-lang.org/learn'],['The Rust Book','https://doc.rust-lang.org/book/']],
    kotlin:[['Kotlin documentation','https://kotlinlang.org/docs/home.html'],['Kotlin Koans','https://kotlinlang.org/docs/koans.html']],
    swift:[['Swift documentation','https://www.swift.org/documentation/'],['Swift language guide','https://docs.swift.org/swift-book/documentation/the-swift-programming-language/']],
    ruby:[['Ruby documentation','https://www.ruby-lang.org/en/documentation/'],['Ruby reference','https://docs.ruby-lang.org/en/']],
    typescript:[['TypeScript Handbook','https://www.typescriptlang.org/docs/handbook/intro.html'],['TypeScript Playground','https://www.typescriptlang.org/play/']],
    react:[['React Learn','https://react.dev/learn'],['React reference','https://react.dev/reference/react']],
    nextjs:[['Next.js Learn','https://nextjs.org/learn'],['Next.js documentation','https://nextjs.org/docs']],
    nodejs:[['Node.js Learn','https://nodejs.org/en/learn'],['Node.js API reference','https://nodejs.org/api/']],
    express:[['Express guide','https://expressjs.com/en/guide/routing.html'],['Express API reference','https://expressjs.com/en/4x/api.html']],
    sql:[['PostgreSQL tutorial','https://www.postgresql.org/docs/current/tutorial.html'],['SQLite language reference','https://www.sqlite.org/lang.html']],
    database:[['PostgreSQL tutorial','https://www.postgresql.org/docs/current/tutorial.html'],['SQLite documentation','https://www.sqlite.org/docs.html']],
    git:[['Pro Git book','https://git-scm.com/book/en/v2'],['Git reference','https://git-scm.com/docs']],
    security:[['OWASP Top 10','https://owasp.org/www-project-top-ten/'],['OWASP Cheat Sheet Series','https://cheatsheetseries.owasp.org/']],
    data:[['pandas getting started','https://pandas.pydata.org/docs/getting_started/intro_tutorials/'],['NumPy learning','https://numpy.org/learn/']],
    ml:[['scikit-learn user guide','https://scikit-learn.org/stable/user_guide.html'],['Google ML Crash Course','https://developers.google.com/machine-learning/crash-course']],
    ai:[['Google ML Crash Course','https://developers.google.com/machine-learning/crash-course'],['Stanford CS221: AI principles','https://stanford.edu/~shervine/teaching/cs-221/']],
    linux:[['Linux man-pages','https://man7.org/linux/man-pages/'],['GNU Bash manual','https://www.gnu.org/software/bash/manual/']],
    cloud:[['AWS Well-Architected','https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html'],['Google Cloud architecture framework','https://cloud.google.com/architecture/framework']],
    devops:[['Docker getting started','https://docs.docker.com/get-started/'],['Kubernetes learning path','https://kubernetes.io/docs/tutorials/']],
    android:[['Android Developers: Build your first app','https://developer.android.com/get-started'],['Kotlin for Android','https://developer.android.com/kotlin']],
    ios:[['Apple SwiftUI tutorials','https://developer.apple.com/tutorials/swiftui'],['Swift documentation','https://www.swift.org/documentation/']],
    networks:[['MDN: HTTP overview','https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview'],['Cloudflare: What is DNS?','https://www.cloudflare.com/learning/dns/what-is-dns/']],
    algorithms:[['OpenDSA textbook','https://opendsa-server.cs.vt.edu/'],['VisuAlgo','https://visualgo.net/en']],
    software:[['Google Engineering Practices','https://google.github.io/eng-practices/'],['The Twelve-Factor App','https://12factor.net/']],
    accessibility:[['W3C WAI tutorials','https://www.w3.org/WAI/tutorials/'],['WCAG 2.2','https://www.w3.org/TR/WCAG22/']]
  };
  const sourceKey = id => ({'responsive-design':'accessibility','javascript-web':'javascript','database-fundamentals':'database','git-github':'git','machine-learning':'ml','ai-fundamentals':'ai','cybersecurity':'security','linux-cli':'linux','cloud-fundamentals':'cloud','devops-fundamentals':'devops','android-development':'android','ios-development':'ios','data-analysis':'data','computer-networks':'networks','dsa':'algorithms','problem-solving':'algorithms','software-engineering':'software','fullstack':'nodejs'}[id] || id);
  const jsLab = (id, title) => {
    const snippets = {
      react:'function Counter(start = 0) { let count = start; return { click() { count += 1; return count; }, render() { return `Count: ${count}`; } }; }\nconst counter = Counter(0);\nconsole.log(counter.render());\nconsole.log(`After click: ${counter.click()}`);',
      nextjs:'const page = { title: "Learning path", lessons: ["Routes", "Layouts", "Data"] };\nfunction renderPage(data) { return `<h1>${data.title}</h1><p>${data.lessons.length} lessons</p>`; }\nconsole.log(renderPage(page));',
      'rest-apis':'const courses = [{ id: 1, title: "HTML Basics" }];\nfunction handle(method, path) { if (method === "GET" && path === "/courses") return { status: 200, body: courses }; return { status: 404, body: { error: "Not found" } }; }\nconsole.log(handle("GET", "/courses"));\nconsole.log(handle("GET", "/missing"));',
      fullstack:'const learners = [{ name: "Ari", courseIds: [1, 2] }];\nconst courses = [{ id: 1, title: "JavaScript" }, { id: 2, title: "SQL" }];\nconst result = learners[0].courseIds.map(id => courses.find(course => course.id === id)?.title);\nconsole.log(`${learners[0].name} is learning: ${result.join(", ")}`);',
      'operating-systems':'const ready = ["task-A", "task-B", "task-C"];\nconst schedule = ready.map((task, tick) => ({ tick, task }));\nconsole.log(schedule.map(slot => `tick ${slot.tick}: ${slot.task}`).join("\\n"));',
      'computer-networks':'const dns = { "learn.example": "203.0.113.8" };\nfunction request(host, path) { const ip = dns[host]; return ip ? `GET ${path} via ${ip} → 200 OK` : "DNS lookup failed"; }\nconsole.log(request("learn.example", "/courses"));\nconsole.log(request("unknown.example", "/"));',
      'problem-solving':'function solve(values) { if (!values.length) return null; return Math.max(...values); }\nfor (const input of [[3, 5, 8], [-4, -2], []]) console.log(`${JSON.stringify(input)} → ${solve(input)}`);',
      'software-engineering':'function canResume(savedLesson, courseId) { return savedLesson?.courseId === courseId && Number.isInteger(savedLesson.lesson); }\nconst cases = [[{ courseId: "js", lesson: 2 }, "js", true], [{ courseId: "py", lesson: 1 }, "js", false], [null, "js", false]];\nfor (const [saved, course, expected] of cases) console.log(canResume(saved, course) === expected ? "PASS" : "FAIL");',
      'android-development':'let state = { screen: "home", completed: false };\nfunction completeLesson() { state = { ...state, completed: true }; }\nconsole.log(state); completeLesson(); console.log(state);',
      'ios-development':'let completed = false;\nfunction toggle() { completed = !completed; return completed ? "Done" : "Mark done"; }\nconsole.log(toggle()); console.log(toggle());',
      'ai-fundamentals':'const graph = { start: ["A", "B"], A: ["goal"], B: [], goal: [] };\nconst queue = ["start"], visited = [];\nwhile (queue.length) { const node = queue.shift(); visited.push(node); if (node === "goal") break; queue.push(...graph[node]); }\nconsole.log(`Visited: ${visited.join(" → ")}`);',
      'cloud-fundamentals':'const services = [{ name: "web", healthy: true }, { name: "backup", healthy: false }];\nconst healthy = services.filter(service => service.healthy);\nconsole.log(`Available services: ${healthy.map(service => service.name).join(", ")}`);\nconsole.log(`Recovery needed: ${services.some(service => !service.healthy)}`);',
      'data-analysis':'const values = [12, 15, null, 18, 15];\nconst clean = values.filter(Number.isFinite);\nconst mean = clean.reduce((sum, value) => sum + value, 0) / clean.length;\nconsole.log({ count: clean.length, mean, min: Math.min(...clean), max: Math.max(...clean) });'
    };
    return snippets[id] || `const topic = ${JSON.stringify(title)};\nconst observations = ["inspect the input", "handle an edge case", "verify the result"];\nconsole.log(topic);\nobservations.forEach((step, index) => console.log((index + 1) + ". " + step));`;
  };
  const languageFor = id => ({html:'html',css:'css',javascript:'javascript',python:'python',cpp:'cpp',c:'c',java:'java',csharp:'csharp',php:'php',go:'go',rust:'rust',kotlin:'kotlin',swift:'swift',ruby:'ruby',typescript:'typescript',sql:'sql', 'git-github':'bash','linux-cli':'bash','devops-fundamentals':'bash'}[id] || 'javascript');
  const starter = (kind, title, level) => {
    const label = JSON.stringify(`${title} — ${level}`);
    return ({
      html:`<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><title>My learning project</title></head>\n<body>\n  <main><h1>My learning project</h1><p>Replace this with your own idea.</p><button type="button">Try it</button></main>\n</body>\n</html>`,
      css:`body { font-family: system-ui, sans-serif; padding: 2rem; }\nmain { max-width: 42rem; margin: auto; }\nbutton { padding: .7rem 1rem; border: 0; border-radius: .5rem; background: #246a55; color: white; }`,
      javascript:`const challenge = ${label};\nfunction solve(input) {\n  // Change this function to solve the challenge.\n  return input;\n}\nconsole.log(challenge);\nconsole.log(solve([3, 5, 8]));`,
      python:`challenge = ${label}\n\ndef solve(values):\n    # Change this function to solve the challenge.\n    return values\n\nprint(challenge)\nprint(solve([3, 5, 8]))`,
      cpp:`#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> values{3, 5, 8};\n    // Change the program to solve your challenge.\n    for (int value : values) cout << value << "\\n";\n    return 0;\n}`,
      c:`#include <stdio.h>\n\nint main(void) {\n    int values[] = {3, 5, 8};\n    // Change the program to solve your challenge.\n    for (int i = 0; i < 3; i++) printf("%d\\n", values[i]);\n    return 0;\n}`,
      java:`import java.util.*;\n\nclass Main {\n  public static void main(String[] args) {\n    List<Integer> values = List.of(3, 5, 8);\n    // Change the program to solve your challenge.\n    System.out.println(values);\n  }\n}`,
      csharp:`var values = new[] { 3, 5, 8 };\n// Change the program to solve your challenge.\nConsole.WriteLine(string.Join(", ", values));`,
      php:`<?php\n$values = [3, 5, 8];\n// Change the program to solve your challenge.\nprint_r($values);`,
      go:`package main\nimport "fmt"\nfunc main() {\n    values := []int{3, 5, 8}\n    // Change the program to solve your challenge.\n    fmt.Println(values)\n}`,
      rust:`fn main() {\n    let values = vec![3, 5, 8];\n    // Change the program to solve your challenge.\n    println!("{:?}", values);\n}`,
      kotlin:`fun main() {\n    val values = listOf(3, 5, 8)\n    // Change the program to solve your challenge.\n    println(values)\n}`,
      swift:`let values = [3, 5, 8]\n// Change the program to solve your challenge.\nprint(values)`,
      ruby:`values = [3, 5, 8]\n# Change the program to solve your challenge.\nputs values.inspect`,
      typescript:`const values: number[] = [3, 5, 8];\nfunction solve(input: number[]): number[] {\n  // Change this function to solve the challenge.\n  return input;\n}\nconsole.log(solve(values));`,
      sql:`CREATE TABLE items (value INTEGER NOT NULL);\nINSERT INTO items VALUES (3), (5), (8);\n-- Change the query to answer your challenge.\nSELECT value FROM items ORDER BY value;`,
      bash:`values=(3 5 8)\n# Change the script to solve your challenge.\nprintf '%s\\n' "${'${values[@]}'}"`
    })[kind] || `console.log(${label});`;
  };

  const levelSpecs = [
    {name:'Medium',time:'30 min',goal:'Extend the starter into one useful feature',finish:'Add one feature from the project roadmap and make it work for both a typical input and an empty or invalid input.'},
    {name:'Intermediate',time:'45 min',goal:'Combine concepts and handle edge cases',finish:'Build two related project milestones, validate inputs, and demonstrate at least three edge cases.'},
    {name:'Advanced',time:'60 min',goal:'Engineer a complete, dependable solution',finish:'Complete the project milestones, add meaningful tests, handle failures safely, and explain one performance, security, accessibility, or reliability trade-off.'}
  ];
  const levelIds = ['Beginner','Medium','Intermediate','Advanced'];
  for (const course of courses) {
    course.levels = levelIds;
    course.resources = sources[sourceKey(course.id)] || sources.javascript;
    const project = projectFor(course.id);
    const baseLesson = course.stages.at(-1)?.lessons.at(-1);
    // Replace diagram/pseudocode-only entries with a runnable, editable simulation of the same idea.
    for (const stage of course.stages) for (const lesson of stage.lessons) if (lesson.kind === 'text') {
      lesson.kind = 'javascript';
      lesson.code = jsLab(course.id, lesson.title);
      lesson.test = 'Run the simulation, then edit the inputs or behavior and run it again.';
      lesson.explanation = [...(lesson.explanation || []), 'This small JavaScript simulation makes the concept executable in the browser.'];
    }
    for (const spec of levelSpecs) {
      const kind = languageFor(course.id);
      const projectTask = project?.milestones?.[0] || project?.title || `a practical ${course.title} feature`;
      const exercise = spec.name === 'Medium'
        ? `Starting from the runnable scaffold, implement ${projectTask.toLowerCase()}. Add one small test input of your own.`
        : spec.name === 'Intermediate'
          ? `Build on ${projectTask.toLowerCase()}. Validate bad or empty inputs, and add at least three test cases that cover normal and boundary behavior.`
          : `${project?.description || `Build a complete ${course.title} solution.`} ${spec.finish}`;
      const code = kind === 'javascript' ? jsLab(course.id, course.title) : starter(kind, course.title, spec.name);
      course.stages.push({name:`${spec.name} · ${spec.goal}`,level:spec.name,lessons:[{
        title:`${spec.name} practical lab: ${course.short}`,
        time:spec.time,
        intro:`Choose the ${spec.name.toLowerCase()} route for ${course.title}. Learn by changing a working starter, running it, and explaining your decisions.`,
        objectives:[`Turn a concept from ${course.title} into working code`,`Change and run your own solution`,`Check normal and boundary cases`],
        prerequisites:spec.name==='Medium'?'Beginner foundations recommended':`${spec.name} concepts and hands-on practice`,
        concept:`This is a deliberately practical lab rather than a read-only example. Start with a runnable ${kind==='javascript'?'browser JavaScript simulation':kind.toUpperCase()+' program'}, make a change that solves the task, run it, inspect the output, then improve it. ${spec.finish}`,
        code,explanation:[`Read the starter and identify the smallest useful change.`,`Implement this task: ${exercise}`,`Run your edited code. Treat every red diagnostic as feedback, correct it, and run again.`,`Try a typical case, an edge case, and one case you invent.`],
        mistakes:['Clicking Run without changing the starter does not count as your own solution.','Ignoring an error and marking the task done; fix it and run again.','Testing only the happy path; check empty, invalid, or boundary inputs.'],
        check:{q:'What is required to complete this practical lab?',options:['Read the lesson only','Change the code, run it successfully, and inspect the result','Copy the starter without running it'],answer:1,why:'Progress is earned by editing the code yourself and getting a successful run.'},
        exercise,kind,test:`Complete the ${spec.name.toLowerCase()} task, make a personal code change, and run it successfully.`,level:spec.name
      }]});
    }
  }
  for (const project of window.PROJECTS || []) {
    project.kind = languageFor(project.course);
    project.starter = project.kind === 'javascript'
      ? jsLab(project.course, project.title)
      : starter(project.kind, project.title, 'Project');
  }
})();
