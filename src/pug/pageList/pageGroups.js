const fs = require('fs');
const path = require('path');

const INCLUDES_DIR = path.resolve(__dirname, '../_includes');

// ファイル名 → 表示名（pageMeta の variantLabels で上書き可）
const VARIANT_LABELS = {
  index: '通常ver',
  loycus: 'LOYCUSver',
};

// サブフォルダ名 → 表示名（pageMeta の subLabels で上書き可）
const SUB_LABELS = {
  local: 'ローカル確認用（local）',
  server: '★本番アップ用（server）',
};

// _includes/<group>/_variables.pug から MetaTitle / baseTitle を拾う（ラベル未設定時のヒント用）
function readMetaTitle(group) {
  const file = path.join(INCLUDES_DIR, group, '_variables.pug');
  if (!fs.existsSync(file)) return '';
  const src = fs.readFileSync(file, 'utf8');
  const match = src.match(/var\s+(?:MetaTitle|baseTitle)\s*=\s*(['"])(.*?)\1/);
  return match ? match[2] : '';
}

function groupNumber(name) {
  const match = name.match(/^(\d+)_/);
  return match ? parseInt(match[1]) : -1;
}

function variantOrder(file) {
  const order = Object.keys(VARIANT_LABELS).indexOf(file);
  return order === -1 ? 99 : order;
}

/**
 * collections.all を「先頭フォルダ → サブフォルダ → ページ」にまとめる
 * 自動：URL・グループ分け・並び順・通常/LOYCUS判定
 * 手動：pageMeta.js（表示名・メモ・非表示など）
 */
module.exports = function pageGroups(pages) {
  // npm run dev 中の pageMeta.js 編集を反映させるため毎回読み直す
  delete require.cache[require.resolve('./pageMeta.js')];
  const pageMeta = require('./pageMeta.js');
  const groups = {};

  pages.forEach((page) => {
    const rel = path.relative('./src/pug/pages', page.inputPath);
    const segs = rel.split(path.sep);
    if (segs.length < 2) return; // index.pug 自身などトップ直下は除外

    const group = segs[0];
    const file = path.basename(rel, '.pug');
    const sub = segs.slice(1, -1).join('/');

    groups[group] = groups[group] || { name: group, subs: {} };
    groups[group].subs[sub] = groups[group].subs[sub] || [];
    groups[group].subs[sub].push({ url: page.url, file });
  });

  return Object.values(groups)
    .map((group) => {
      const meta = pageMeta[group.name] || {};
      if (meta.hidden) return null;

      const subLabels = { ...SUB_LABELS, ...meta.subLabels };
      const variantLabels = { ...VARIANT_LABELS, ...meta.variantLabels };
      const subLabel = (sub) => {
        if (sub === '') return '';
        if (subLabels[sub]) return subLabels[sub];
        if (typeof meta.subLabel === 'function') return meta.subLabel(sub) || sub;
        return sub;
      };

      let subKeys = Object.keys(group.subs).sort();
      if (meta.subOrder === 'desc') subKeys.reverse();
      subKeys = subKeys.filter((sub) => !(meta.hiddenSubs || []).includes(sub));

      const subs = subKeys.map((sub) => ({
        label: subLabel(sub),
        pages: group.subs[sub]
          .sort((a, b) => variantOrder(a.file) - variantOrder(b.file) || a.file.localeCompare(b.file))
          .map((p) => ({ url: p.url + (meta.query || ''), label: variantLabels[p.file] || p.file })),
      }));

      return {
        name: group.name,
        number: groupNumber(group.name),
        label: meta.label || group.name,
        labeled: Boolean(meta.label),
        metaTitle: readMetaTitle(group.name),
        note: meta.note || '',
        order: meta.order,
        subs,
      };
    })
    .filter(Boolean)
    // order 指定があればそれを優先、なければ番号の大きい順（新しい順）
    .sort((a, b) =>
      (b.order ?? b.number) - (a.order ?? a.number) || a.name.localeCompare(b.name)
    );
};
