#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires, no-console */

import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

/**
 * Executes command.
 */
const exec = (command: string) => execSync(command, { stdio: 'inherit' });

/**
 * Converts input to JSON string.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringify = (data: any) => JSON.stringify(data, null, 2) + '\n';

const templateChoices = ['typescript'] as const;

let scope = '';
let directory = '';
let packageName = '';

const path = {
  directory: '',
  packages: resolve(__dirname, '../packages'),
  root: resolve(__dirname, '..'),
  template: '',
  templates: resolve(__dirname, '../templates'),
};

yargs(hideBin(process.argv))
  .usage('Usage: yarn $0 <name> --template=[string]')
  .command('<name>', 'Create package name', (yargs) =>
    yargs.positional('name', {
      describe: 'package name',
      type: 'string',
    })
  )
  .demandCommand(1)
  .option('template', {
    choices: templateChoices,
    describe: 'Template type',
    type: 'string',
    default: 'typescript',
  })
  .check((argv) => {
    [packageName] = argv._ as string[];
    directory = packageName;

    if (packageName[0] === '@') {
      [scope, directory] = packageName.split('/');
      if (!scope || !/^@[\w-]+$/.test(scope)) {
        throw new Error(`Invalid package scope: ${scope}`);
      }
    }

    if (!directory || !/^[\w-]+$/.test(directory)) {
      throw new Error(`Invalid package name: ${packageName}`);
    }

    if (existsSync(resolve(path.packages, directory))) {
      throw new Error(`Package directory exists: ${directory}`);
    }

    return true;
  })
  .parseSync();

exec('yarn');

const packages = 'packages';
const template = 'typescript-template';

path.directory = resolve(path.packages, directory);
path.template = resolve(path.templates, template);

console.log(`Copying '${path.template}' to '${path.directory}'...`);
exec(`cp -r ${path.template} ${path.directory}`);

console.log(
  `Replacing string '${template}' with '${packageName}' in '${path.directory}'...`
);
exec(
  `grep -rl '${template}' '${path.directory}' | xargs sed -i '' -e 's|${template}|${packageName}|g'`
);

console.log(`Updating '${packageName}' package.json...`);
const packageJsonPath = resolve(path.directory, 'package.json');
const packageJson = require(packageJsonPath);
delete packageJson.private;
writeFileSync(packageJsonPath, stringify(packageJson));

const releasePleaseConfigFilename = 'release-please-config.json';
const releasePleaseConfigPath = resolve(path.root, releasePleaseConfigFilename);
console.log(
  `Adding package '${path.directory}' to '${releasePleaseConfigFilename}'...`
);
const releasePleaseConfig = require(releasePleaseConfigPath);
releasePleaseConfig.packages[`${packages}/${directory}`] = {};
writeFileSync(releasePleaseConfigPath, stringify(releasePleaseConfig));

exec('yarn');
exec(`yarn lerna run clean --scope=${packageName}`);
exec(`yarn lerna run build --scope=${packageName}`);
