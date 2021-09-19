#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires, no-console */

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

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
  const match = packageName.split('/');
  scope = match[0];
  directory = match[1];

  if (!/^@[\w-]+$/.test(scope) || !/^[\w-]+$/.test(directory)) {
    console.error(`Invalid package name: ${packageName}`);
    process.exit(1);
  }
}

exec('yarn');

const packages = 'packages';
const template = 'typescript-template';
const rootPath = resolve(__dirname, '..');
const templatePath = resolve(rootPath, 'templates', template);
const directoryPath = resolve(rootPath, packages, directory);
console.log(`Copying '${templatePath}' to '${directoryPath}'...`);
exec(`cp -r ${templatePath} ${directoryPath}`);

console.log(
  `Replacing string '${template}' with '${packageName}' in '${directoryPath}'...`
);
exec(
  `grep -rl '${template}' '${directoryPath}' | xargs sed -i '' -e 's|${template}|${packageName}|g'`
);

console.log(`Updating '${packageName}' package.json...`);
const packageJsonPath = resolve(directoryPath, 'package.json');
const packageJson = require(packageJsonPath);
delete packageJson.private;
writeFileSync(packageJsonPath, stringify(packageJson));

const releasePleaseConfigFilename = 'release-please-config.json';
const releasePleaseConfigPath = resolve(rootPath, releasePleaseConfigFilename);
console.log(
  `Adding package '${directoryPath}' to '${releasePleaseConfigFilename}'...`
);
const releasePleaseConfig = require(releasePleaseConfigPath);
releasePleaseConfig.packages[`${packages}/${directory}`] = {};
writeFileSync(releasePleaseConfigPath, stringify(releasePleaseConfig));

exec('yarn');
exec(`yarn lerna run clean --scope=${packageName}`);
exec(`yarn lerna run build --scope=${packageName}`);
