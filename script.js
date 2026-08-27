const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const audio = $("#audio");
const pages = $$(".page");
const navButtons = $$(".nav-btn");

function showPage(id, push = true) {
  const target = $("#" + id) || $("#home");
  pages.forEach((p) => p.classList.remove("active"));
  target.classList.add("active");
  navButtons.forEach((b) => b.classList.toggle("active", b.dataset.page === target.id));
  if (push && history.replaceState) history.replaceState(null, "", "#" + target.id);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navButtons.forEach((b) => b.addEventListener("click", () => showPage(b.dataset.page)));
$$('[data-page]').filter((x) => !x.classList.contains('nav-btn')).forEach((b) => b.addEventListener('click', () => showPage(b.dataset.page)));
window.addEventListener("hashchange", () => showPage(location.hash.slice(1) || "home", false));
if (location.hash) showPage(location.hash.slice(1), false);

const typing = $(".typing-text");
if (typing) {
  const text = "prozpkt";
  let i = 0;
  let deleting = false;
  function type() {
    if (!deleting) {
      i++;
      typing.textContent = text.slice(0, i);
      if (i === text.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      i--;
      typing.textContent = text.slice(0, i);
      if (i === 0) deleting = false;
    }
    setTimeout(type, deleting ? 65 : 130);
  }
  type();
}

document.addEventListener("click", () => {
  if (audio && audio.paused) {
    audio.volume = 0.42;
    audio.play().catch(() => {});
  }
}, { once: true });

document.addEventListener("visibilitychange", () => {
  if (document.hidden && audio) audio.pause();
});
