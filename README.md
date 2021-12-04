# Lerna Template

[![build](https://github.com/remarkablemark/lerna-template/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/lerna-template/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/remarkablemark/lerna-template/branch/master/graph/badge.svg?token=1SYU67HOUQ)](https://codecov.io/gh/remarkablemark/lerna-template)
[![Netlify Status](https://api.netlify.com/api/v1/badges/46dc4645-697d-455e-8156-9817213bb13a/deploy-status)](https://app.netlify.com/sites/lerna-template/deploys)

[Lerna](https://github.com/lerna/lerna) template.

## Prerequisites

[Node.js](https://nodejs.org/):

```sh
brew install node
```

[Yarn 1](https://classic.yarnpkg.com/):

```sh
brew install yarn
```

## Install

Clone the repository:

```sh
git clone https://github.com/remarkablemark/lerna-template.git
cd lerna-template
```

Install the dependencies:

```sh
yarn
```

## Available Scripts

In the root directory, you can run:

### `yarn build`

Build all packages:

```sh
yarn build
```

Build a single package:

```sh
yarn build --scope=<package-name>
```

For example:

```sh
yarn build --scope=example-a
```

### `yarn clean`

Delete build artifacts for all packages:

```sh
yarn clean
```

Clean a single package:

```sh
yarn clean --scope=<package-name>
```

For example:

```sh
yarn clean --scope=example-a
```

### `yarn create-package`

Create a package:

```sh
yarn create-package
```

Create a package using the CLI:

```sh
yarn create-package <package-name> --template=<template>
```

Create package `foo` using the TypeScript template (default):

```sh
yarn create-package foo --template=typescript
```

Create package `bar` using the React template:

```sh
yarn create-package bar --template=react
```

### `yarn lint`

Lint all packages:

```sh
yarn lint
```

Lint a single package:

```sh
yarn lint --scope=<package-name>
```

For example:

```sh
yarn lint --scope=example-a
```

### `yarn lint:fix`

Fix lint errors for all packages:

```sh
yarn lint:fix
```

Fix lint errors for a single package:

```sh
yarn lint:fix --scope=<package-name>
```

For example:

```sh
yarn lint:fix --scope=example-a
```

### `yarn storybook`

Start Storybook server:

```sh
yarn storybook
```

### `yarn test`

Run tests for all packages:

```sh
yarn test
```

Run tests for a single package:

```sh
yarn test --scope=<package-name>
```

For example:

```sh
yarn test --scope=example-a
```

## Release

Release is automated with [Lerna](https://lerna.js.org/).

If npm publish failed:

1. Delete the Git tags on remote
2. Rerun the [publish](https://github.com/remarkablemark/lerna-template/actions/workflows/publish.yml) workflow

Because Lerna commits and pushes the release to the remote repository, branch protection rules have been disabled.

To prevent race conditions with Lerna release, don't merge PRs until after the publish workflow is done.

### Canary

To release a canary version for testing, run the [publish](https://github.com/remarkablemark/lerna-template/actions/workflows/publish.yml) workflow with a branch other than `master`.

### Dry Run

To see the to-be-updated versions, run the [publish](https://github.com/remarkablemark/lerna-template/actions/workflows/publish.yml) workflow and change `N` to `y` under **Dry run?**.

## License

[MIT](LICENSE)
