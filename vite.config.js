import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

// ファイルを走査してエントリを作成するユーティリティ関数
function getEntries(dir, extensions) {
  const fullDirPath = path.resolve(__dirname, dir);
  const entries = {};

  if (!fs.existsSync(fullDirPath)) return entries;

  fs.readdirSync(fullDirPath).forEach(file => {
    const ext = path.extname(file);
    if (extensions.includes(ext)) {
      const name = path.basename(file, ext);
      entries[name] = path.resolve(fullDirPath, file);
    }
  });

  return entries;
}

// SCSSのエントリを取得
const scssEntries = getEntries('src/scss', ['.scss']);

// JSのエントリを取得
const jsEntries = getEntries('src/js', ['.js']);

// 最終的なすべてのエントリ
const allEntries = { ...jsEntries, ...scssEntries };

export default defineConfig({
  root: 'dist', // Eleventy の出力を見る
  base: './',
  server: {
    open: true
  },
  build: {
    outDir: '../dist/',
    emptyOutDir: false, // Eleventyがdist全体を使うのでfalseにする
    sourcemap: false,
    rollupOptions: {
      input: allEntries,
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop();
          if (/(css)$/.test(ext)) {
            return 'css/[name][extname]';
          }
          return '[name][extname]';
        }
      }
    }
  }
});