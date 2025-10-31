I believe all these tests should pass, but one fails:

```
$ pnpm test

> vitest-define-bug@1.0.0 test /home/user/projects/vitest-define-bug
> vitest --run


 RUN  v4.0.5 /home/user/projects/vitest-define-bug

 ✓  node  src/test.ts (1 test) 3ms
 ✓  browser2 (chromium)  src/test2.ts (1 test) 2ms
 ❯  browser (chromium)  src/test.ts (1 test | 1 failed) 3ms
   × process.env.FOO 2ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL   browser (chromium)  src/test.ts > process.env.FOO
ReferenceError: process is not defined
 ❯ src/test.ts:4:9
      2| 
      3| test("process.env.FOO", () => {
      4|   expect(process.env.FOO).toBe("BAR");
       |         ^
      5| });
      6| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed | 2 passed (3)
      Tests  1 failed | 2 passed (3)
   Start at  23:20:46
   Duration  1.14s (transform 24ms, setup 0ms, collect 62ms, tests 7ms, environment 0ms, prepare 237ms)

 ELIFECYCLE  Test failed. See above for more details.
```

`node` and `browser` are running the exact same test, but for some reason this configuration is working for `node` but not for `browser`:

```
            define: {
                "process.env.FOO": JSON.stringify("BAR"),
            },
```

It seems to have something to do with the specific name of the constant, because `browser2` is identical to `browser` except it uses `process.FOO.FOO` instead of `process.env.FOO` and that works.

Also if I isolate the `browser` project into its own file, then it works:

```
$ pnpm test-browser

> vitest-define-bug@1.0.0 test-browser /home/user/projects/vitest-define-bug
> vitest --run --config vitest.config-browser.ts


 RUN  v4.0.5 /home/user/projects/vitest-define-bug

 ✓  browser (chromium)  src/test.ts (1 test) 2ms
   ✓ process.env.FOO 1ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  23:18:40
   Duration  809ms (transform 0ms, setup 0ms, collect 13ms, tests 2ms, environment 0ms, prepare 104ms)
```

So the requirements for the bug are:

- `define` called for a constant named something like `process.env.FOO`
- Run in browser mode
- Configured as a project, not at the root of the vitest config
