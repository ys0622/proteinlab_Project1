#!/usr/bin/env node
// Windows에서 wrangler의 ?module 파일명 버그를 패치 후 배포
'use strict';
const { spawnSync } = require('child_process');
const path = require('path');

const patchFile = path.resolve(__dirname, 'wrangler-fs-patch.cjs');

const wrangler = spawnSync(
  'npx',
  ['wrangler', 'deploy'],
  {
    stdio: ['ignore', 'inherit', 'inherit'],
    env: {
      ...process.env,
      NODE_OPTIONS: `--require ${patchFile}`,
      CI: 'true',
      WRANGLER_SEND_METRICS: 'false',
      FORCE_COLOR: '1',
    },
    shell: true,
  }
);

process.exit(wrangler.status ?? 0);
