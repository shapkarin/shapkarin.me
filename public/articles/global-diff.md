
If you’ve ever caught yourself wondering, “What exactly is getting added to the global `window` object in my web app?” you’re not alone. Modern codebases use so many libraries and frameworks that sometimes it’s hard to keep track of what’s sneaking into your global scope. Variables added at runtime—whether from your own code or third-party scripts—can lead to subtle bugs or naming conflicts down the road.

**That’s where `diff-browser-globals` comes in.** This small, handy tool helps you identify which global variables are present beyond the standard set that browsers typically provide. In other words, it shows you what’s different between your current `window` and a known “clean” baseline. This can be a lifesaver when trying to debug unexpected behavior or ensure that libraries aren’t polluting the global scope.

### Why Would You Need This?

Imagine you’re tracking down a naming collision or just want to ensure your code is clean before shipping to production. By comparing the current `window` object with a default environment, `diff-browser-globals` highlights any new global variables that have popped up. This makes it easy to see if a polyfill, a script tag, or a particular library is quietly inserting things you didn’t anticipate.

### How Does It Work?

The concept is simple: it takes a known list of default globals and compares that to what’s currently on `window`. Anything not on the default list shows up in the diff. You get a quick, no-nonsense snapshot of what’s new.

### Getting Started

Install the package as a dev dependency:

```bash
npm i --save-dev diff-browser-globals
```

Once installed, you can run it to see what’s been added to the global scope. The output makes it clear which variables are introduced by your code or included libraries, helping you keep your environment tidy and predictable.

### Contributions Welcome

Open source tools thrive on community input. If you have ideas for improvements, additional checks, or better ways to handle certain environments, feel free to contribute. Your pull requests or issues can help make `diff-browser-globals` even more useful to developers who want to keep their global scopes under control.