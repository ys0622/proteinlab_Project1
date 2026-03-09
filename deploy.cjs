#!/usr/bin/env node
// Windows에서 wrangler의 ?module 파일명 버그를 패치 후 배포
'use strict';
const { spawnSync } = require('child_process');
const path = require('path');

const patchFile = path.resolve(__dirname, 'wrangler-fs-patch.cjs');

const result = spawnSync(
  process.execPath,
  ['--require', patchFile, ...process.argv.slice(2)],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: (process.env.NODE_OPTIONS || '') + ` --require ${patchFile}`,
    },
  }
);

// Actually just spawn wrangler with the patch
const wrangler = spawnSync(
  'npx',
  ['wrangler', 'deploy'],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: `--require ${patchFile}`,
    },
    shell: true,
  }
);

process.exit(wrangler.status ?? 0);
