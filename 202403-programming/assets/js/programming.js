document.addEventListener('DOMContentLoaded', (event) => {
  const circle1 = document.getElementsByClassName("circle")[0];
  const circle2 = document.getElementsByClassName("circle")[1];
  const aspectRatio = 1 / 1;

  function adjustHeight() {
      const width = circle1.offsetWidth;
      const height = width / aspectRatio;
      circle1.style.height = `${height}px`;
      circle2.style.height = `${height}px`;
  }

  window.addEventListener('resize', adjustHeight); // ウィンドウサイズ変更時に高さを調整
  adjustHeight(); // 初期ロード時に高さを設定
});
