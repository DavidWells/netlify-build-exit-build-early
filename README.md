# Exit Build Early Netlify Build Plugin Example

This is an example of how to programmatically use a Netlify build plugin to early a build early if no HTML files have changed.

See `./plugins/exit-early` for the plugin src code.

```yml
build:
  publish: build
  command: npm run build
  functions: functions

plugins:
  - package: ./plugins/exit-early
```
