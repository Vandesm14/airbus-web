serve:
  trunk serve --port 3000

build-styles:
  pnpm sass --watch styles/index.scss dist/styles.css
