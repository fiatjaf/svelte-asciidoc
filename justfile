export PATH := "./node_modules/.bin:" + env_var('PATH')

build:
  vite build
  just package

package:
  svelte-kit sync && svelte-package && publint

dev:
  vite dev --port 3001

publish: build
  npm publish

format:
  eslint --ext .ts --fix *.ts
  prettier --write *.ts

lint:
  eslint --ext .ts *.ts
  prettier --check *.ts
