const docEl = document.documentElement;
// 设置 1rem = 屏幕宽度 / 100
function setRemUnit() {
  const rem = docEl.clientWidth / 100;
  docEl.style.fontSize = rem + "px";
}
setRemUnit();
// 当浏览器大小调整或后退时，重新更新字体大小
window.addEventListener("resize", setRemUnit);
window.addEventListener("pageshow", function (e) {
  if (e.persisted) {
    setRemUnit();
  }
});