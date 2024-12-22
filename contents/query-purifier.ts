// content.js
(function () {
  // 現在のURLをクリーンアップする関数
  function cleanYouTubeURL() {
      const url = new URL(window.location.href);
      const queryString = url.search;

      // "&list=WL"が含まれている場合に削除
      if (queryString.includes("&list=WL")) {
          const newQueryString = queryString.split("&list=WL")[0];
          const newURL = url.origin + url.pathname + newQueryString;

          // 履歴を変更してリロードしないようにする
          if (window.location.href !== newURL) {
              window.history.replaceState({}, document.title, newURL);
          }

          // 更新されたURLでページをリロードする
          location.reload()
      }
  }

  // 初回チェック
  cleanYouTubeURL();

  // URL変更を監視 (YouTubeのSPA動作に対応)
  let lastURL = window.location.href;
  const observer = new MutationObserver(() => {
      if (lastURL !== window.location.href) {
          lastURL = window.location.href;
          cleanYouTubeURL();
      }
  });

  // MutationObserverを設定
  observer.observe(document.body, { childList: true, subtree: true });

  // 拡張機能が無効化されてもエラーを防ぐための例外処理
  window.addEventListener("unload", () => {
      observer.disconnect();
  });
})();
