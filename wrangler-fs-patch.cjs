// Windows에서 wrangler의 ?module 파일명 버그 패치
// ?는 Windows NTFS에서 사용 불가한 문자 → 제거
'use strict';
const fs = require('fs');
const path = require('path');

function cleanPath(p) {
  if (typeof p === 'string' && p.includes('?module')) {
    return p.replace(/\?module/g, '');
  }
  return p;
}

const _writeFile = fs.writeFile.bind(fs);
const _writeFileSync = fs.writeFileSync.bind(fs);
const _open = fs.open.bind(fs);
const _openSync = fs.openSync.bind(fs);
const _copyFile = fs.copyFile.bind(fs);
const _copyFileSync = fs.copyFileSync.bind(fs);
const _pWriteFile = fs.promises.writeFile.bind(fs.promises);
const _pOpen = fs.promises.open.bind(fs.promises);
const _pCopyFile = fs.promises.copyFile.bind(fs.promises);

fs.writeFile = (p, ...a) => _writeFile(cleanPath(p), ...a);
fs.writeFileSync = (p, ...a) => _writeFileSync(cleanPath(p), ...a);
fs.open = (p, ...a) => _open(cleanPath(p), ...a);
fs.openSync = (p, ...a) => _openSync(cleanPath(p), ...a);
fs.copyFile = (s, d, ...a) => _copyFile(cleanPath(s), cleanPath(d), ...a);
fs.copyFileSync = (s, d, ...a) => _copyFileSync(cleanPath(s), cleanPath(d), ...a);
fs.promises.writeFile = (p, ...a) => _pWriteFile(cleanPath(p), ...a);
fs.promises.open = (p, ...a) => _pOpen(cleanPath(p), ...a);
fs.promises.copyFile = (s, d, ...a) => _pCopyFile(cleanPath(s), cleanPath(d), ...a);
