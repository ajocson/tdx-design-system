# TDX Angular Button Preview

Runnable Angular workspace for previewing the reusable TDX button component.

## Run

```sh
npm install
npm start
```

Open:

```text
http://127.0.0.1:4200/buttons
```

## Structure

```text
src/app/shared/components/button/
  button.component.ts
  button.component.html
  button.component.scss
  button.model.ts
  button.module.ts
  button.spec.ts

src/app/button-preview/
  button-preview.component.ts
  button-preview.component.html
  button-preview.component.scss
  button-preview.module.ts
```

The preview uses Angular routing and renders through `tdx-root`, so Angular template bindings such as `{{ variant }}` are compiled by `ng serve`.

