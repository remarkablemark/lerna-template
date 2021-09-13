#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires, no-console */

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join, resolve } from 'path';

/**
 * Executes command.
 */
const exec = (command: string) => execSync(command, { stdio: 'inherit' });

/**
 * Converts input to JSON string.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringify = (data: any) => JSON.stringify(data, null, 2) + '\n';

const [packageName] = process.argv.slice(2);

if (!packageName) {
  console.error(
    `Please specify a package name:

  $ yarn create-package <name>
`
  );
  process.exit(1);
}

let scope = '';
let directory = packageName;

if (packageName[0] === '@') {
  [scope, directory] = packageName.split('/');

  if (!/^@[\w-]+$/.test(scope) || !/^[\w-]+$/.test(directory)) {
    console.error(`Invalid package name: ${packageName}`);
    process.exit(1);
  }
}

exec('yarn');

const packages = 'packages';
const template = 'template';
const templatePath = join(packages, template);
const directoryPath = join(packages, directory);
console.log(`Copying '${templatePath}' to '${directoryPath}'...`);
exec(`cp -r ${templatePath} ${directoryPath}`);

console.log(
  `Replacing string '${template}' with '${packageName}' in '${directoryPath}'...`
);
exec(
  `grep -rl '${template}' '${directoryPath}' | xargs sed -i '' -e 's|${template}|${packageName}|g'`
);

console.log(`Updating '${packageName}' package.json...`);
const packageJsonPath = resolve(__dirname, '..', directoryPath, 'package.json');
const packageJson = require(packageJsonPath);
delete packageJson.private;
if (!scope) {
  delete packageJson.publishConfig;
}
writeFileSync(packageJsonPath, stringify(packageJson));

const releasePleaseConfigFilename = 'release-please-config.json';
const releasePleaseConfigPath = resolve(
  __dirname,
  '..',
  releasePleaseConfigFilename
);
console.log(
  `Adding package '${directoryPath}' to '${releasePleaseConfigFilename}'...`
);
const releasePleaseConfig = require(releasePleaseConfigPath);
releasePleaseConfig.packages[`${directoryPath}`] = {};
writeFileSync(releasePleaseConfigPath, stringify(releasePleaseConfig));

exec('yarn');
exec(`yarn lerna run clean --scope=${packageName}`);
exec(`yarn lerna run build --scope=${packageName}`);
