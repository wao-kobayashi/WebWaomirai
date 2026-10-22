# ページ一覧（index.pug）の自動生成

`src/pug/pages/index.pug`（トップのページ一覧）は、`src/pug/pages` 配下のページから**自動生成**されます。
リンクを手で書き足す必要はありません。見出しやメモなどの「見せ方」だけを `pageMeta.js` で設定します。

## 仕組み

```
src/pug/pages/**/*.pug
   ↓ Eleventy がビルド時に全ページを collections.all に集める（URL・元ファイルのパス）
src/pug/pageList/pageGroups.js   … 先頭フォルダごとにまとめ、並び順・表示名を決める（自動）
   ↑ 表示名・メモなどを上書き
src/pug/pageList/pageMeta.js     … 手で書く設定
   ↓
src/pug/pages/index.pug          … pageGroups(collections.all) をループして表示
```

- `pageGroups` は `.eleventy.js` で `addGlobalData` によりグローバルに渡しています。
- `pageList/` は `addWatchTarget` 済みなので、`npm run dev` 中に `pageMeta.js` を編集すると一覧も更新されます。

## 新しいページを作ったとき

1. いつもどおり `src/pug/pages/34_xxx/index.pug`（必要なら `loycus.pug`）を作る
2. **それだけで一覧に出ます。**（見出しはフォルダ名のまま、右上に「ラベル未設定」の印が付きます）
3. 見出しを付けるなら `pageMeta.js` に1行足す

```js
'34_lp-event-2027spring': { label: '34_春イベント2027' },
```

`_includes/<フォルダ名>/_variables.pug` に `MetaTitle` か `baseTitle` が文字列で書かれていれば、ラベル未設定の間はそのタイトルが補足としてグレーで表示されます。

## 表示のルール（自動）

| 対象 | ルール |
| --- | --- |
| グループ | `src/pug/pages` 直下のフォルダ1つ = 1グループ（カード1枚） |
| 並び順 | フォルダ先頭の番号の大きい順（新しい順）。同じ番号はフォルダ名順 |
| 見出しの番号 | フォルダ先頭の番号を左に表示。`label` 先頭の `33_` は表示時に外す |
| ページ名 | ファイル名で決まる：`index.pug` → 通常ver、`loycus.pug` → LOYCUSver、それ以外はファイル名そのまま |
| サブフォルダ | `local/` → ローカル確認用（local）、`server/` → ★本番アップ用（server）、それ以外はフォルダ名そのまま |
| 1ページだけのグループ | カードの見出し自体がリンクになる（右に「→」） |

> **注意：** LOYCUS 版の判定はファイル名だけを見ています。`loycus.pug` 以外の名前（例 `loycus-v2.pug`）で作った場合は、`variantLabels` で名前を付けてください。

## pageMeta.js で使える項目

キーは `src/pug/pages` 直下のフォルダ名です。すべて省略可能です。

| 項目 | 内容 | 例 |
| --- | --- | --- |
| `label` | 見出し | `'27_夏LP2026'` |
| `note` | 見出し下の補足（グレー文字） | `'※画像のリンク先で…'` |
| `hidden` | `true` で一覧に出さない | `true` |
| `order` | 並び順の上書き（大きいほど上） | `99` |
| `query` | URL 末尾に付けるクエリ | `'?key=2025_may_cheery'` |
| `subLabels` | サブフォルダ名 → 表示名 | `{ 'local': 'ローカル' }` |
| `subLabel` | サブフォルダ名 → 表示名を返す関数（命名規則がある場合） | `yearMonthLabel` |
| `subOrder` | `'desc'` でサブフォルダを逆順に | `'desc'` |
| `hiddenSubs` | 一覧に出さないサブフォルダ名 | `['old']` |
| `variantLabels` | ファイル名 → 表示名 | `{ 'a-finished': 'A日程終了後' }` |

`subLabels` のキーは、グループ直下からのパスです（例 `'16_01_phase_one/server'`）。

`yearMonthLabel` は `pageMeta.js` 内の関数で、`lp-firstweek-free-26_03march` や `event-family-2026_04april` のような年月入りのフォルダ名を「2026年3月」に変換します。月ごとにサブフォルダを増やすタイプのページで使うと、月が増えても設定を書き足す必要がありません。

## 関連ファイル

- [`pageGroups.js`](./pageGroups.js) — 自動でまとめる処理（通常は触らなくて OK）
- [`pageMeta.js`](./pageMeta.js) — 手で書く設定
- [`../pages/index.pug`](../pages/index.pug) — 一覧の表示とデザイン
- [`../../../.eleventy.js`](../../../.eleventy.js) — `pageGroups` の登録
