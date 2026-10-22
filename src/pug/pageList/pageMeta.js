// index.pug（ページ一覧）の手動設定
// ページのURL・並び順・通常/LOYCUSは自動で拾うので、ここには「見せ方」だけ書く。
// 未登録のフォルダもフォルダ名で一覧に出る（「ラベル未設定」表示）。
//
// key: src/pug/pages 直下のフォルダ名
//   label       : 見出し
//   note        : 見出し下の補足（グレー文字）
//   hidden      : true で一覧に出さない
//   order       : 並び順の上書き（未指定はフォルダ先頭の番号。大きいほど上）
//   query       : URL末尾に付けるクエリ（例 '?key=xxx'）
//   subLabels   : サブフォルダ名 → 表示名（例 { 'local': 'ローカル' }）
//   subLabel    : サブフォルダ名 → 表示名 を返す関数（命名規則がある場合）
//   subOrder    : 'desc' でサブフォルダを逆順（新しい月を上に、など）
//   hiddenSubs  : 一覧に出さないサブフォルダ名
//   variantLabels: ファイル名 → 表示名（例 { 'a-finished': 'A日程終了後' }）

const MONTH_JA = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

// 「25_05may」「2026_04april」のような年月表記 → 「2025年5月」
function yearMonthLabel(dir) {
  const match = dir.match(/(\d{2,4})_(\d{2})([a-z]+)$/);
  if (!match) return '';
  const year = match[1].length === 2 ? `20${match[1]}` : match[1];
  return `${year}年${MONTH_JA[match[3]] || parseInt(match[2])}月`;
}

module.exports = {
  '33_lp-event-2026philosophy': { label: '33_哲学4weeks体験(2026年)' },
  '32_lp-family-2026-11november': { label: '32_親子体験(2026年11月)' },
  '31_english-lp-5days-2026winter': { label: '31_5daysチャレンジ 2026年冬' },
  '30_lp-family-2026-10october': { label: '30_親子体験(2026年10月)' },
  '29_lp-family-2026-08august': { label: '29_親子体験(2026年8月)' },
  '28_lp-math-quest-2026summer': { label: '28_2026年夏の数学探究' },
  '27_lp-event-2026summer': { label: '27_夏LP2026' },
  '26_english-lp-5days-2026summer': {
    label: '26_5daysチャレンジ 2026年夏',
    variantLabels: { 'a-finished': 'A日程終了後' },
  },
  '25_english-lp-main-2026': { label: '25_英語LP（メイン）' },
  '24_lp-parent-seminar-single': {
    label: '24_保護者セミナー（１つのテーマ）',
    note: '保護者セミナーが１つのテーマになったバージョン',
  },
  '23_english-lp-100phases-2026spring': { label: '23_100フレーズチャレンジ 2026年春（通常価格）' },
  '23_english-lp-100phases-2026spring-waomember': { label: '23_100フレーズチャレンジ 2026年春（★特別価格：WAO会員向け）' },
  '22_event-lp-2026march': { label: '22_2026年春有料LP3月（通常価格）' },
  '22_event-lp-2026march-waomember': { label: '22_2026年春有料LP3月（★特別価格：WAO会員向け）' },
  '21_lp-how-to-join': { label: '21_入会LP' },
  '20_lp-parent-seminar-2026': { label: '20_保護者セミナー（複数テーマ）' },
  '19_lp-tankyu-week': { label: '19_探究WEEK' },
  '18_lp-family': {
    label: '18_親子オンラインセミナー',
    subLabel: yearMonthLabel,
    subOrder: 'desc',
  },
  '17_lp-family-2025nov': { label: '17_親子オンラインセミナー（2025年11月）' },
  '16_lp-event-2025techseeker': {
    label: '16_TECH SEEKER 2025',
    note: '※画像のリンク先でローカルとサーバーを切り替えています。',
    subLabels: {
      '16_01_phase_one/server': 'phase 1(とりあえずプレオープン) ★サーバー',
      '16_01_phase_one/local': 'phase 1(とりあえずプレオープン) ローカル',
      '16_02_phase_two/server': 'phase 2(9/29後) ★サーバー',
      '16_02_phase_two/local': 'phase 2(9/29後) ローカル',
    },
  },
  '15_lp-campaign-fr-ref': { label: '15_友だち紹介キャンペーン' },
  '14_lp-event-2025summer': { label: '14_夏休み自由研究DAY2025' },
  '13_english-lp-100phases-2025summer': {
    label: '13_100フレーズチャレンジ 2025年夏',
    subLabels: {
      'english-lp-a-not-finished': 'A日程終了前',
      'english-lp-a-finished': 'A日程終了後',
      'english-lp-ab-finished': 'AB日程終了後',
    },
  },
  '12_lp-lesson-from-line': { label: '12_イベントページの動画', query: '?key=2025_may_cheery' },
  '11_lp-about-waomirai': { label: '11_ワオ未来塾とは' },
  '10_lp-firstweek-free': {
    label: '10_1WEEK 授業無料キャンペーン',
    subLabel: yearMonthLabel,
    subOrder: 'desc',
  },
  '09_english-lp-100phases': { label: '09_100フレーズチャレンジ' },
  '08_event-lp-2025march': { label: '08_イベントLP3月' },
  '07_event-lp-2025feb': { label: '07_イベントLP2月' },
  '06_english-lp-main': { label: '06_英語LP' },
  '03_english-portal-form': {
    label: '03_英語無料体験フォーム',
    subLabels: { '202411_marron/english-portal-form-marron': '英語無料体験11月生募集' },
  },
  '02_english-portal': {
    label: '02_英語ポータル',
    subLabels: {
      'english-portal-login': 'ログイン',
      'english-portal-trial-period': '体験期間',
      'howto-payment': '支払い方法',
      '202410_grape/english-portal-tutorial-2410grape': 'チュートリアル10月',
      '202411_marron/english-portal-tutorial-2411marron': 'チュートリアル11月',
      '202410_grape/english-learn-portal-2410grape': '英語体験ページ10月',
      '202411_marron/english-learn-portal-2411marron': '英語体験ページ11月',
    },
  },
  '01_hapitas': {
    label: '01_ハピタスLP',
    subLabels: { 'hapitas-lp': 'ハピタスLP', 'hapitas-thanks-page': 'サンクスページ' },
  },
};
