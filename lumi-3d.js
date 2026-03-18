const container = document.getElementById("character-3d-stage");

if (!container) {
  throw new Error("Character stage is missing.");
}

container.innerHTML = `
  <div class="lion-scene lion-scene-home">
    <div class="lion-cloud lion-cloud-left"></div>
    <div class="lion-cloud lion-cloud-right"></div>
    <div class="lion-spark lion-spark-left"></div>
    <div class="lion-spark lion-spark-right"></div>
    <div class="lion-ground"></div>
  </div>
`;

const travelLayer = document.createElement("div");
travelLayer.className = "lion-travel-layer";
travelLayer.innerHTML = `
  <div class="lion-floating-shell is-home" id="lion-floating-shell">
    <div class="lion-reaction" id="lion-reaction">Привет!</div>
    <div class="mascot-scene mascot-scene-home" id="lion-fallback" hidden aria-hidden="true">
      <div class="mascot-cloud mascot-cloud-left"></div>
      <div class="mascot-cloud mascot-cloud-right"></div>
      <div class="mascot-spark mascot-spark-left"></div>
      <div class="mascot-spark mascot-spark-right"></div>
      <div class="mascot-ground"></div>
      <div class="mascot-floating-shell is-home">
        <div class="barry" data-mood="idle">
          <div class="barry-tail"><div class="barry-tail-tip"></div></div>
          <div class="barry-body">
            <div class="barry-shoulder"></div>
            <div class="barry-neck"></div>
            <div class="barry-hip"></div>
            <div class="barry-belly"></div>
            <div class="barry-stripe stripe-body stripe-body-left"></div>
            <div class="barry-stripe stripe-body stripe-body-right"></div>
          </div>
          <div class="barry-leg barry-leg-left"><div class="barry-foot"></div></div>
          <div class="barry-leg barry-leg-right"><div class="barry-foot"></div></div>
          <div class="barry-arm barry-arm-left"><div class="barry-hand"></div></div>
          <div class="barry-arm barry-arm-right"><div class="barry-hand"></div></div>
          <div class="barry-head">
            <div class="barry-ear barry-ear-left"><div class="barry-ear-inner"></div></div>
            <div class="barry-ear barry-ear-right"><div class="barry-ear-inner"></div></div>
            <div class="barry-face">
              <div class="barry-eye barry-eye-left"><div class="barry-eye-shine"></div></div>
              <div class="barry-eye barry-eye-right"><div class="barry-eye-shine"></div></div>
              <div class="barry-cheek barry-cheek-left"></div>
              <div class="barry-cheek barry-cheek-right"></div>
              <div class="barry-stripe stripe-forehead"></div>
              <div class="barry-stripe stripe-brow stripe-brow-left"></div>
              <div class="barry-stripe stripe-brow stripe-brow-right"></div>
              <div class="barry-muzzle"></div>
              <div class="barry-nose"></div>
              <div class="barry-mouth">
                <div class="barry-mouth-smile"></div>
                <div class="barry-mouth-open"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <model-viewer
      id="lion-viewer"
      class="lion-viewer"
      src="assets/models/animal-lion.glb"
      alt="Медвежонок Туня"
      autoplay
      interaction-prompt="none"
      touch-action="pan-y"
      disable-zoom
      shadow-intensity="1"
      shadow-softness="0.8"
      exposure="1.15"
      environment-image="neutral"
      camera-target="0m 0.7m 0m"
      camera-orbit="-12deg 74deg 5.1m"
      min-camera-orbit="auto auto 4.8m"
      max-camera-orbit="auto auto 5.8m"
      field-of-view="36deg"
      scale="0.78 0.78 0.78"
    ></model-viewer>
  </div>
`;
document.body.appendChild(travelLayer);

const shell = document.getElementById("lion-floating-shell");
const viewer = document.getElementById("lion-viewer");
const reaction = document.getElementById("lion-reaction");
const fallbackScene = document.getElementById("lion-fallback");
const fallbackBarry = fallbackScene ? fallbackScene.querySelector(".barry") : null;

let moodResetTimer = null;
let reactionTimer = null;
let homeRect = null;
let dragState = null;
let wasDragged = false;
let currentPosition = { x: 0, y: 0 };
let targetPosition = { x: 0, y: 0 };
let animationFrame = null;
let viewerReady = false;
let viewerTap = null;
let spinFrame = null;
let blinkTimer = null;
let currentOrbit = {
  azimuth: -12,
  polar: 74,
  radius: 5.1,
};

function useFallbackMascot() {
  if (!fallbackScene) return;
  fallbackScene.hidden = false;
  if (viewer) viewer.hidden = true;
}

function scheduleBlink() {
  if (!fallbackBarry) return;
  if (blinkTimer) window.clearTimeout(blinkTimer);
  blinkTimer = window.setTimeout(() => {
    fallbackBarry.classList.add("is-blinking");
    window.setTimeout(() => {
      fallbackBarry.classList.remove("is-blinking");
      scheduleBlink();
    }, 180);
  }, 1800 + Math.random() * 2200);
}

function setViewerOrbit(orbit) {
  if (!viewerReady || !viewer || viewer.hidden) return;
  const match = /(-?\d+(?:\.\d+)?)deg\s+(-?\d+(?:\.\d+)?)deg\s+(-?\d+(?:\.\d+)?)m/.exec(orbit);
  if (match) {
    currentOrbit = {
      azimuth: Number(match[1]),
      polar: Number(match[2]),
      radius: Number(match[3]),
    };
  }
  viewer.cameraOrbit = orbit;
}

function spinViewerOnce() {
  if (!viewerReady || !viewer || viewer.hidden) return;
  if (spinFrame) cancelAnimationFrame(spinFrame);

  const start = {
    azimuth: currentOrbit.azimuth,
    polar: currentOrbit.polar,
    radius: currentOrbit.radius,
  };
  const duration = 900;
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const azimuth = start.azimuth + 220 * eased;
    const orbit = `${azimuth}deg ${start.polar}deg ${start.radius}m`;
    viewer.cameraOrbit = orbit;

    if (progress < 1) {
      spinFrame = requestAnimationFrame(tick);
      return;
    }

    spinFrame = null;
    setViewerOrbit(`${start.azimuth + 220}deg ${start.polar}deg ${start.radius}m`);
  };

  spinFrame = requestAnimationFrame(tick);
}

function setMood(nextMood, duration = 0) {
  clearTimeout(moodResetTimer);
  shell.dataset.mood = nextMood || "idle";
  if (fallbackBarry) fallbackBarry.dataset.mood = nextMood || "idle";

  if (nextMood === "thinking") setViewerOrbit("-22deg 75deg 5.15m");
  else if (nextMood === "point") setViewerOrbit("-4deg 74deg 4.95m");
  else if (nextMood === "celebrate") setViewerOrbit("-10deg 69deg 4.85m");
  else setViewerOrbit("-12deg 74deg 5.1m");

  if (duration > 0) {
    moodResetTimer = window.setTimeout(() => {
      shell.dataset.mood = "idle";
      if (fallbackBarry) fallbackBarry.dataset.mood = "idle";
      setViewerOrbit("-12deg 74deg 5.1m");
    }, duration);
  }
}

function setSpeaking(active) {
  shell.classList.toggle("is-speaking", Boolean(active));
  if (fallbackBarry) fallbackBarry.classList.toggle("is-speaking", Boolean(active));
}

function setReaction(text = "", duration = 1600) {
  clearTimeout(reactionTimer);
  reaction.textContent = text;
  reaction.classList.toggle("is-visible", Boolean(text));
  if (text && duration > 0) {
    reactionTimer = window.setTimeout(() => {
      reaction.classList.remove("is-visible");
    }, duration);
  }
}

function setShellPosition(x, y) {
  currentPosition = { x, y };
  shell.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function animateShell() {
  animationFrame = null;
  const dx = targetPosition.x - currentPosition.x;
  const dy = targetPosition.y - currentPosition.y;
  const ease = dragState ? 1 : 0.2;

  const nextX = Math.abs(dx) < 0.5 ? targetPosition.x : currentPosition.x + dx * ease;
  const nextY = Math.abs(dy) < 0.5 ? targetPosition.y : currentPosition.y + dy * ease;
  setShellPosition(nextX, nextY);

  if (Math.abs(targetPosition.x - nextX) > 0.5 || Math.abs(targetPosition.y - nextY) > 0.5) {
    animationFrame = window.requestAnimationFrame(animateShell);
  }
}

function placeShell(x, y) {
  const width = 236;
  const height = 244;
  const clampedX = Math.min(Math.max(16, x), window.innerWidth - width - 16);
  const clampedY = Math.min(Math.max(56, y), window.innerHeight - height - 12);
  targetPosition = { x: clampedX, y: clampedY };
  if (!animationFrame) {
    animationFrame = window.requestAnimationFrame(animateShell);
  }
}

function updateHomeRect() {
  const rect = container.getBoundingClientRect();
  homeRect = {
    left: rect.left + rect.width * 0.5,
    top: rect.top + rect.height * 0.88,
  };
  if (shell.classList.contains("is-home")) {
    dockHome();
  }
}

function dockHome() {
  if (!homeRect) updateHomeRect();
  shell.classList.add("is-home");
  placeShell(homeRect.left - 118, homeRect.top - 218);
}

function moveToElement(element, options = {}) {
  if (!element) return;
  const { mood = "point", reactionText = "", duration = 1600 } = options;
  const rect = element.getBoundingClientRect();
  const prefersLeft = rect.left > window.innerWidth * 0.56;
  const x = prefersLeft ? rect.left - 184 : rect.right - 42;
  const y = rect.top - 146;
  const lookOrbit = prefersLeft ? "-42deg 74deg 5.05m" : "22deg 74deg 5.05m";

  shell.classList.remove("is-home");
  placeShell(x, y);
  setMood(mood, duration);
  setViewerOrbit(lookOrbit);
  if (reactionText) {
    setReaction(reactionText, duration);
  }

  if (duration > 0) {
    window.setTimeout(() => {
      if (shell.dataset.mood === "idle") {
        setViewerOrbit("-12deg 74deg 5.1m");
      }
    }, duration);
  }
}

function moveHome() {
  dockHome();
  setMood("idle", 0);
}

function nudge() {
  shell.classList.remove("is-nudging");
  void shell.offsetWidth;
  shell.classList.add("is-nudging");
  window.setTimeout(() => {
    shell.classList.remove("is-nudging");
  }, 820);
}


function onPointerDown(event) {
  if (event.button !== undefined && event.button !== 0) return;
  if (event.target && typeof event.target.closest === "function" && event.target.closest("model-viewer")) return;
  const rect = shell.getBoundingClientRect();
  dragState = {
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    startX: event.clientX,
    startY: event.clientY,
  };
  wasDragged = false;
  shell.classList.remove("is-home");
  if (typeof shell.setPointerCapture === "function") {
    shell.setPointerCapture(event.pointerId);
  }
}

function onPointerMove(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  const deltaX = Math.abs(event.clientX - dragState.startX);
  const deltaY = Math.abs(event.clientY - dragState.startY);
  if (deltaX > 4 || deltaY > 4) wasDragged = true;
  placeShell(event.clientX - dragState.offsetX, event.clientY - dragState.offsetY);
}

function endPointer(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  if (typeof shell.releasePointerCapture === "function") {
    shell.releasePointerCapture(event.pointerId);
  }
  dragState = null;
}

function onClick() {
  if (wasDragged) {
    wasDragged = false;
    return;
  }
}

function onDoubleClick() {
  if (wasDragged) {
    wasDragged = false;
    return;
  }
  setMood("happy", 1400);
  setReaction("Я рядом. Давай учить буквы!", 1800);
}

function onViewerPointerDown(event) {
  viewerTap = {
    x: event.clientX,
    y: event.clientY,
  };
}

function onViewerPointerUp(event) {
  if (!viewerTap) return;
  const deltaX = Math.abs(event.clientX - viewerTap.x);
  const deltaY = Math.abs(event.clientY - viewerTap.y);
  viewerTap = null;

  if (deltaX > 8 || deltaY > 8) return;

  event.stopPropagation();
  spinViewerOnce();
  setMood("oops", 1600);
  setReaction("Перестань со мной играть. Давай лучше вернёмся к учёбе!", 2400);
}

shell.addEventListener("pointerdown", onPointerDown);
shell.addEventListener("pointermove", onPointerMove);
shell.addEventListener("pointerup", endPointer);
shell.addEventListener("pointercancel", endPointer);
shell.addEventListener("click", onClick);
shell.addEventListener("dblclick", onDoubleClick);
viewer.addEventListener("pointerdown", onViewerPointerDown);
viewer.addEventListener("pointerup", onViewerPointerUp);
window.addEventListener("resize", updateHomeRect);

if (!window.customElements || !window.customElements.get("model-viewer")) {
  useFallbackMascot();
  setReaction("Привет!", 1400);
  updateHomeRect();
} else {
  viewer.addEventListener("load", () => {
    viewerReady = true;
    setReaction("Привет!", 1400);
    updateHomeRect();
  });

  viewer.addEventListener("error", () => {
    useFallbackMascot();
    setReaction("Загрузился запасной герой", 2200);
    updateHomeRect();
  });
}

setShellPosition(0, 0);
window.setTimeout(() => {
  dockHome();
  setReaction("Привет!", 1400);
}, 60);
scheduleBlink();

window.lumi3d = {
  setMood,
  setSpeaking,
  setReaction,
  moveToElement,
  moveHome,
  nudge,
};
