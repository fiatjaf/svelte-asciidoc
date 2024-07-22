export PATH := "./node_modules/.bin:" + env_var('PATH')

build:
  vite build
  just package

package:
  svelte-kit sync && svelte-package && publint

dev:
  vite dev --port 3001

publish: build
  npx downdoc README.adoc
  npm publish

format:
  eslint --fix
  prettier --write *.ts

lint:
  eslint
  prettier --check *.ts
