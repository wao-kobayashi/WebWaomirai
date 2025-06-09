// SCSSの名称と同じJSファイルが生成されてしまうので、そのJSファイルの中身が空であれば削除

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESモジュール用 __dirname の代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distJsDir = path.resolve(__dirname, 'dist/js');

// dist/js 配下の全 .js ファイルを確認
const jsFiles = fs.readdirSync(distJsDir).filter(file => path.extname(file) === '.js');

// 内容が空白・改行だけのJSファイルを削除
jsFiles.forEach(file => {
  const filePath = path.join(distJsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  if (content.trim() === '') {
    fs.unlinkSync(filePath);
    console.log(`Deleted nearly-empty JS file: ${filePath}`);
  }
});