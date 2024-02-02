//Notify.js and notify.css are from antimatter dimension
const notify = (function() {
    let template = document.createElement("div");
    template.classList.add("o-notification");
    let enterAnimation = "a-notification--enter";
    let leaveAnimation = "a-notification--leave";
    function showNotification(text, elClass, duration = 2000) {
      
      let el = template.cloneNode();
      el.textContent = text;
      el.classList.add(elClass, enterAnimation);
      let container = document.getElementById("notification-container");
      container.appendChild(el);
      let entered = false;
      function stopEnter() {
        if (entered) return;
        entered = true;
        el.classList.remove(enterAnimation);
      }
      setTimeout(() => stopEnter(), 500);
      let leaving = false;
      function leave() {
        if (leaving) return;
        leaving = true;
        stopEnter();
        el.classList.add(leaveAnimation);
        setTimeout(() => el.remove(), 500);
      }
      setTimeout(() => leave(), duration);
      el.onclick = () => leave();
    }
    return {
      success: (text, duration) => showNotification(text, "o-notification--success", duration),
      done: (text,duration) => showNotification(text, "o-notification--done",duration),
      error: (text, duration) => showNotification(text, "o-notification--error", duration),
      info: (text, duration) => showNotification(text, "o-notification--info", duration),
      infinity: (text, duration) => showNotification(text, "o-notification--infinity", duration),
      eternity: (text, duration) => showNotification(text, "o-notification--eternity", duration),
      reality: (text, duration) => showNotification(text, "o-notification--reality", duration),
      automator: (text, duration) => showNotification(text, "o-notification--automator", duration),
      blackHole: (text, duration) => showNotification(text, "o-notification--black-hole", duration),
      strike: (text, duration) => showNotification(text, "o-notification--strike", duration),
      showBlackHoles: true
    };
  }());
function NotifyN(text = "",button_text = undefined) {
  document.getElementById('on-layer').style.display = 'flex';
  document.getElementById("note-content").innerText = text;
  if(button_text === undefined) return;
  document.getElementById("note-button").innerText = button_text;
}
  