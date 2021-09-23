// eslint-disable-next-line @typescript-eslint/no-var-requires
const syncModules = require('lerna-script-tasks-modules');

/**
 * {@link https://github.com/wix/lerna-script/tree/master/tasks/modules}
 */
exports['sync-modules'] = syncModules({
  transformDependencies: (version) => version,
});
