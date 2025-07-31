// スクロール時のフェードイン制御
function handleScrollFadeIn() {
  const elements = document.querySelectorAll(".fade-in-element");
  const windowHeight = window.innerHeight;

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

// スクロールイベントリスナー
window.addEventListener("scroll", handleScrollFadeIn);
window.addEventListener("load", handleScrollFadeIn);

// タッチ・クリック時の星の演出
function createTouchStar(x, y) {
  const star = document.createElement("div");
  star.className = "touch-star";
  star.style.left = x + "px";
  star.style.top = y + "px";
  document.body.appendChild(star);

  // アニメーション終了後に要素を削除
  setTimeout(() => {
    if (star.parentNode) {
      star.parentNode.removeChild(star);
    }
  }, 1500);
}

// タッチイベント（スマホ）
document.addEventListener("touchstart", function (e) {
  const touch = e.touches[0];
  createTouchStar(touch.clientX, touch.clientY);
});

// クリックイベント（PC）
document.addEventListener("click", function (e) {
  // ボタンクリック等の場合は星を出さない
  if (e.target.closest(".hero-image-placeholder")) {
    return;
  }
  createTouchStar(e.clientX, e.clientY);
});

// 画像アップロード機能
function uploadHeroImage() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const heroSection = document.getElementById("heroSection");
        heroSection.style.setProperty("--custom-bg-image", `url(${e.target.result})`);
        heroSection.classList.add("with-custom-image");

        // プレースホルダーを更新
        const placeholder = heroSection.querySelector(".hero-image-placeholder");
        placeholder.style.opacity = "0.7";
        placeholder.innerHTML = "✓ 画像設定済み<br>変更する場合はクリック";
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
}

// スマホでのパフォーマンス最適化
let isTouch = false;
document.addEventListener("touchstart", function () {
  isTouch = true;
});

// タッチデバイスでのスクロール最適化
if ("ontouchstart" in window) {
  document.body.style.webkitOverflowScrolling = "touch";
}
