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

### `yarn clean`

Deletes build and test artifacts from all packages:

```sh
yarn clean
```

### `yarn create-package`

Creates a new package from the template. Example:

```sh
yarn create-package my-package
```

### `yarn lint`

Lints all packages:

```sh
yarn lint
```

### `yarn lint:fix`

Fixes lint errors for all packages:

```sh
yarn lint:fix
```

### `yarn storybook`

Runs Storybook:

```sh
yarn storybook
```

#### `yarn sync-modules`

[Syncs dependencies for modules](https://github.com/wix/lerna-script/tree/master/tasks/modules):

```sh
yarn sync-modules
```

Running this step after release is necessary because [Release Please](https://github.com/googleapis/release-please) (not [Lerna](https://github.com/lerna/lerna)) is handling versioning and [Release Please does not update dependent modules](https://github.com/googleapis/release-please/issues/1032).

### `yarn test`

Runs tests for all packages:

```sh
yarn test
```

## Release

Release and publish is automated with [Release Please](https://github.com/googleapis/release-please).

## License

[MIT](LICENSE)
