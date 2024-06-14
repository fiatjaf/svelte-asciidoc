export PATH := "./node_modules/.bin:" + env_var('PATH')

build:
  tsc
  vite build

test:
  vitest run

test-only file:
  bun test {{file}}

publish: build
  npm publish

format:
  eslint --ext .ts --fix *.ts
  prettier --write *.ts

lint:
  eslint --ext .ts *.ts
  prettier --check *.ts
