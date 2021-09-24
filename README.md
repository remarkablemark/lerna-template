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

Install dependencies:

```sh
yarn
```

## Available Scripts

In the root directory, you can run:

### `yarn build`

Builds all packages:

```sh
yarn build
```

To build a single package:

```sh
yarn build --scope=<packageName>
```

For example:

```sh
yarn build --scope=example-a
```

### `yarn clean`

Deletes build and test artifacts from all packages:

```sh
yarn clean
```

To clean a single package:

```sh
yarn clean --scope=<packageName>
```

For example:

```sh
yarn clean --scope=example-a
```

### `yarn create-package`

Creates a new package from the template:

```sh
yarn create-package my-package
```

Create package `foo` using TypeScript template (default):

```sh
yarn create-package foo --template=typescript
```

Create package `bar` using React template:

```sh
yarn create-package bar --template=react
```

### `yarn lint`

Lints all packages:

```sh
yarn lint
```

To lint a single package:

```sh
yarn lint --scope=<packageName>
```

For example:

```sh
yarn lint --scope=example-a
```

### `yarn lint:fix`

Fixes lint errors for all packages:

```sh
yarn lint:fix
```

To fix lint errors for a single package:

```sh
yarn lint:fix --scope=<packageName>
```

For example:

```sh
yarn lint:fix --scope=example-a
```

### `yarn storybook`

Runs Storybook:

```sh
yarn storybook
```

### `yarn test`

Runs tests for all packages:

```sh
yarn test
```

To run tests for a single package:

```sh
yarn test --scope=<packageName>
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
