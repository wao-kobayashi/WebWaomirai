const fs = require('fs');
const path = require('path');

const MONTH_JA = {
  january: '1月', february: '2月', march: '3月', april: '4月',
  may: '5月', june: '6月', july: '7月', august: '8月',
  september: '9月', october: '10月', november: '11月', december: '12月',
};

module.exports = function () {
  const baseDir = __dirname;

  const dirs = fs.readdirSync(baseDir).filter((d) => {
    return (
      fs.statSync(path.join(baseDir, d)).isDirectory() &&
      d.startsWith('event-family-')
    );
  });

  const events = dirs
    .map((dir) => {
      // event-family-2026_04april
      const match = dir.match(/^event-family-(\d{4})_(\d{2})([a-z]+)$/);
      if (!match) return null;
      const [, year, month, monthName] = match;
      const hasLoycus = fs.existsSync(path.join(baseDir, dir, 'loycus.pug'));
      return {
        dir,
        year: parseInt(year),
        month: parseInt(month),
        label: `${year}年${MONTH_JA[monthName] || monthName}`,
        hasLoycus,
        basePath: `/18_lp-family/${dir}`,
      };
    })
    .filter(Boolean);

  // 新しい月を先頭に
  events.sort((a, b) => b.year - a.year || b.month - a.month);

  return events;
};
