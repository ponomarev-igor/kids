const letters = [
  { letter: "А", lower: "а", word: "Акула",        acc: "акулу",        emoji: "🦈", color: "#dff0ff" },
  { letter: "Б", lower: "б", word: "Бегемот",      acc: "бегемота",     emoji: "🦛", color: "#f0e0ff" },
  { letter: "В", lower: "в", word: "Волк",         acc: "волка",        emoji: "🐺", color: "#e8e8f8" },
  { letter: "Г", lower: "г", word: "Горилла",      acc: "гориллу",      emoji: "🦍", color: "#e8e0d8" },
  { letter: "Д", lower: "д", word: "Дельфин",      acc: "дельфина",     emoji: "🐬", color: "#d8f0ff" },
  { letter: "Е", lower: "е", word: "Енот",         acc: "енота",        emoji: "🦝", color: "#efe4ff" },
  { letter: "Ё", lower: "ё", word: "Ёжик",         acc: "ёжика",        emoji: "🦔", color: "#ffe7cb" },
  { letter: "Ж", lower: "ж", word: "Жираф",        acc: "жирафа",       emoji: "🦒", color: "#fff3cc" },
  { letter: "З", lower: "з", word: "Зебра",        acc: "зебру",        emoji: "🦓", color: "#e2f0ff" },
  { letter: "И", lower: "и", word: "Индюк",        acc: "индюка",       emoji: "🦃", color: "#f0e0ff" },
  { letter: "Й", lower: "й", word: "Йогурт",       acc: "йогурт",       emoji: "🥛", color: "#e7fff2", noPicture: true },
  { letter: "К", lower: "к", word: "Кот",          acc: "кота",         emoji: "🐱", color: "#ffe3db" },
  { letter: "Л", lower: "л", word: "Лиса",         acc: "лису",         emoji: "🦊", color: "#fff0cc" },
  { letter: "М", lower: "м", word: "Медведь",      acc: "медведя",      emoji: "🐻", color: "#ffe8d8" },
  { letter: "Н", lower: "н", word: "Носорог",      acc: "носорога",     emoji: "🦏", color: "#e8f0e8" },
  { letter: "О", lower: "о", word: "Обезьяна",     acc: "обезьяну",     emoji: "🐒", color: "#fff8e8" },
  { letter: "П", lower: "п", word: "Пингвин",      acc: "пингвина",     emoji: "🐧", color: "#e0f0ff" },
  { letter: "Р", lower: "р", word: "Рак",          acc: "рака",         emoji: "🦞", color: "#ffd8d8" },
  { letter: "С", lower: "с", word: "Слон",         acc: "слона",        emoji: "🐘", color: "#e8e8f0" },
  { letter: "Т", lower: "т", word: "Тигр",         acc: "тигра",        emoji: "🐯", color: "#fff0d8" },
  { letter: "У", lower: "у", word: "Утка",         acc: "утку",         emoji: "🦆", color: "#e4fff0" },
  { letter: "Ф", lower: "ф", word: "Фламинго",     acc: "фламинго",     emoji: "🦩", color: "#ffe0f0" },
  { letter: "Х", lower: "х", word: "Хомяк",        acc: "хомяка",       emoji: "🐹", color: "#fff0d5" },
  { letter: "Ц", lower: "ц", word: "Цыплёнок",     acc: "цыплёнка",     emoji: "🐤", color: "#fff7cc" },
  { letter: "Ч", lower: "ч", word: "Черепаха",     acc: "черепаху",     emoji: "🐢", color: "#d8f0d8" },
  { letter: "Ш", lower: "ш", word: "Шмель",        acc: "шмеля",        emoji: "🐝", color: "#fff8d0" },
  { letter: "Щ", lower: "щ", word: "Щенок",        acc: "щенка",        emoji: "🐶", color: "#e2ffea" },
  { letter: "Ъ", lower: "ъ", word: "Твёрдый знак", acc: "твёрдый знак", emoji: "🔷", color: "#eef1ff", noPicture: true },
  { letter: "Ы", lower: "ы", word: "Мышь",         acc: "мышь",         emoji: "🐭", color: "#fce4ff" },
  { letter: "Ь", lower: "ь", word: "Мягкий знак",  acc: "мягкий знак",  emoji: "🔹", color: "#e3f3ff", noPicture: true },
  { letter: "Э", lower: "э", word: "Эму",          acc: "эму",          emoji: "🦤", color: "#fff0e0" },
  { letter: "Ю", lower: "ю", word: "Юла",          acc: "юлу",          emoji: "🪀", color: "#e9ffe9", noPicture: true },
  { letter: "Я", lower: "я", word: "Ягуар",        acc: "ягуара",       emoji: "🐆", color: "#fff0da" },
];

// Животные для игры с картинками (независимо от алфавитного массива)
const pictureAnimals = [
  { word: "Акула",     acc: "акулу",     letter: "А", emoji: "🦈", color: "#d8f0ff" },
  { word: "Бабочка",   acc: "бабочку",   letter: "Б", emoji: "🦋", color: "#f0e0ff" },
  { word: "Бегемот",   acc: "бегемота",  letter: "Б", emoji: "🦛", color: "#ffe7cb" },
  { word: "Волк",      acc: "волка",     letter: "В", emoji: "🐺", color: "#e8e8f8" },
  { word: "Горилла",   acc: "гориллу",   letter: "Г", emoji: "🦍", color: "#e8e0d8" },
  { word: "Дельфин",   acc: "дельфина",  letter: "Д", emoji: "🐬", color: "#ccf0ff" },
  { word: "Енот",      acc: "енота",     letter: "Е", emoji: "🦝", color: "#efe4ff" },
  { word: "Ёжик",      acc: "ёжика",     letter: "Ё", emoji: "🦔", color: "#ffe7cb" },
  { word: "Жираф",     acc: "жирафа",    letter: "Ж", emoji: "🦒", color: "#fff3cc" },
  { word: "Зебра",     acc: "зебру",     letter: "З", emoji: "🦓", color: "#e2f0ff" },
  { word: "Змея",      acc: "змею",      letter: "З", emoji: "🐍", color: "#dffff0" },
  { word: "Кенгуру",   acc: "кенгуру",   letter: "К", emoji: "🦘", color: "#fff0d8" },
  { word: "Кот",       acc: "кота",      letter: "К", emoji: "🐱", color: "#ffe3db" },
  { word: "Корова",    acc: "корову",    letter: "К", emoji: "🐄", color: "#f0fff0" },
  { word: "Кролик",    acc: "кролика",   letter: "К", emoji: "🐰", color: "#ffeef5" },
  { word: "Лев",       acc: "льва",      letter: "Л", emoji: "🦁", color: "#fff3c0" },
  { word: "Лиса",      acc: "лису",      letter: "Л", emoji: "🦊", color: "#fff0cc" },
  { word: "Лошадь",    acc: "лошадь",    letter: "Л", emoji: "🐴", color: "#f0ece0" },
  { word: "Лягушка",   acc: "лягушку",   letter: "Л", emoji: "🐸", color: "#d8ffe0" },
  { word: "Медведь",   acc: "медведя",   letter: "М", emoji: "🐻", color: "#ffe8d8" },
  { word: "Мышь",      acc: "мышь",      letter: "М", emoji: "🐭", color: "#fce4ff" },
  { word: "Носорог",   acc: "носорога",  letter: "Н", emoji: "🦏", color: "#e8f0e8" },
  { word: "Обезьяна",  acc: "обезьяну",  letter: "О", emoji: "🐒", color: "#fff8e8" },
  { word: "Осьминог",  acc: "осьминога", letter: "О", emoji: "🐙", color: "#f5e0ff" },
  { word: "Пингвин",   acc: "пингвина",  letter: "П", emoji: "🐧", color: "#e0f0ff" },
  { word: "Попугай",   acc: "попугая",   letter: "П", emoji: "🦜", color: "#e0ffee" },
  { word: "Рак",       acc: "рака",      letter: "Р", emoji: "🦞", color: "#ffd8d8" },
  { word: "Слон",      acc: "слона",     letter: "С", emoji: "🐘", color: "#e8e8f0" },
  { word: "Собака",    acc: "собаку",    letter: "С", emoji: "🐕", color: "#fff0e0" },
  { word: "Тигр",      acc: "тигра",     letter: "Т", emoji: "🐯", color: "#fff0d8" },
  { word: "Тюлень",    acc: "тюленя",    letter: "Т", emoji: "🦭", color: "#d8efff" },
  { word: "Утка",      acc: "утку",      letter: "У", emoji: "🦆", color: "#e4fff0" },
  { word: "Фламинго",  acc: "фламинго",  letter: "Ф", emoji: "🦩", color: "#ffe0f0" },
  { word: "Хомяк",     acc: "хомяка",    letter: "Х", emoji: "🐹", color: "#fff0d5" },
  { word: "Цыплёнок",  acc: "цыплёнка",  letter: "Ц", emoji: "🐤", color: "#fff7cc" },
  { word: "Черепаха",  acc: "черепаху",  letter: "Ч", emoji: "🐢", color: "#d8f0d8" },
  { word: "Шмель",     acc: "шмеля",     letter: "Ш", emoji: "🐝", color: "#fff8d0" },
  { word: "Щенок",     acc: "щенка",     letter: "Щ", emoji: "🐶", color: "#e2ffea" },
  { word: "Эму",       acc: "эму",       letter: "Э", emoji: "🦤", color: "#fff0e0" },
  { word: "Ягуар",     acc: "ягуара",    letter: "Я", emoji: "🐆", color: "#fff0da" },
];

let pictureQueue = [];

function getNextPictureAnimal() {
  if (pictureQueue.length === 0) {
    pictureQueue = shuffle([...pictureAnimals]);
  }
  return pictureQueue.pop();
}

const cheerPhrases = [
  "Молодец! Так держать!",
  "Ура! Получилось!",
  "Отлично! Идём дальше!",
  "Супер! Туня радуется!",
];

const phraseAudio = {
  intro: "assets/audio/intro.mp3",
  chooseLetter: "assets/audio/choose-letter.mp3",
  repeatTry: "assets/audio/repeat-try.mp3",
  alphabetIntro: "assets/audio/alphabet-intro.mp3",
  "cheer-0": "assets/audio/cheer-0.mp3",
  "cheer-1": "assets/audio/cheer-1.mp3",
  "cheer-2": "assets/audio/cheer-2.mp3",
  "cheer-3": "assets/audio/cheer-3.mp3",
  speedChanged: "assets/audio/speed-changed.mp3",
  shuffled: "assets/audio/shuffled.mp3",
  resetOrder: "assets/audio/reset-order.mp3",
  resetProgress: "assets/audio/reset-progress.mp3",
  "page-1": "assets/audio/page-1.mp3",
  "page-2": "assets/audio/page-2.mp3",
  "page-3": "assets/audio/page-3.mp3",
  "page-4": "assets/audio/page-4.mp3",
  startPictureGame: "assets/audio/start-picture-game.mp3",
  startLetterGame: "assets/audio/start-letter-game.mp3",
  findPicture: "assets/audio/find-picture.mp3",
  correct: "assets/audio/correct.mp3",
  eto: "assets/audio/eto.mp3",
};

// DOM
const bubble = document.getElementById("speech-bubble");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const stars = document.getElementById("stars");
const lettersGrid = document.getElementById("letters-grid");
const wordsGrid = document.getElementById("words-grid");
const wordsFrame = document.getElementById("words-frame");
const inlineGame = document.getElementById("inline-game");
const gameTask = document.getElementById("game-task");
const gameOptions = document.getElementById("game-options");
const gameResult = document.getElementById("game-result");
const startButton = document.getElementById("start-button");
const alphabetButton = document.getElementById("alphabet-button");
const repeatButton = document.getElementById("repeat-button");
const shuffleButton = document.getElementById("shuffle-button");
const repeatGameButton = document.getElementById("repeat-game-button");
const stopGameButton = document.getElementById("stop-game-button");
const startPictureGameButton = document.getElementById("start-picture-game");
const startLetterGameButton = document.getElementById("start-letter-game");
const prevPageButton = document.getElementById("prev-page-button");
const nextPageButton = document.getElementById("next-page-button");
const pageIndicator = document.getElementById("page-indicator");
const resetOrderButton = document.getElementById("reset-order-button");
const speedButtons = [...document.querySelectorAll(".speed-button")];
const resetProgressButton = document.getElementById("reset-progress-button");
const progressNote = document.getElementById("progress-note");
const guideAvatar = document.getElementById("guide-avatar");
const gameGuideAvatar = document.getElementById("game-guide-avatar");
const guideText = document.getElementById("guide-text");
const gameGuideText = document.getElementById("game-guide-text");

// State
let learnedLetters = new Set();
let currentRound = null;
let gameMode = null; // null | 'pictures' | 'letters'
let lastPrompt = "Привет! Давай учить буквы!";
let lastQueueSrcs = [];
let currentAudio = null;
let currentPage = 0;
let visibleLetters = [...letters];
let speechRate = 1.0;
let speakTimer = null;
let speakingLocked = false;
let resizeTimer = null;
const storageKey = "bukvik-progress-v1";
const flowerMeadow = document.getElementById("flower-meadow");
const flowerEmojis = ["🌸", "🌼", "🌺", "🌻", "🌷", "🌹", "💐", "🏵️"];

function updateFlowers() {
  const target = learnedLetters.size === 0
    ? 0
    : Math.min(Math.floor((learnedLetters.size - 1) / 4) + 1, 8);
  const current = flowerMeadow.children.length;
  if (target > current) {
    for (let i = current; i < target; i++) {
      const el = document.createElement("div");
      el.className = "flower";
      el.innerHTML = `<div class="flower-bloom">${flowerEmojis[i % flowerEmojis.length]}</div><div class="flower-stem"></div>`;
      flowerMeadow.appendChild(el);
    }
  } else if (target < current) {
    while (flowerMeadow.children.length > target) {
      flowerMeadow.removeChild(flowerMeadow.lastChild);
    }
  }
}

function saveProgress() {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify({
      learnedLetters: [...learnedLetters],
      speechRate,
    }));
  } catch (error) {
    progressNote.textContent = "Прогресс работает только пока открыта эта страница";
  }
}

function applySpeedUI() {
  speedButtons.forEach((button) => {
    const isActive = Number(button.dataset.speed) === speechRate;
    button.classList.toggle("is-active", isActive);
  });
}

function restoreProgress() {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return false;
    const saved = JSON.parse(raw);

    if (Array.isArray(saved.learnedLetters)) {
      learnedLetters = new Set(saved.learnedLetters.filter((letter) =>
        letters.some((item) => item.letter === letter)));
    }

    if (typeof saved.speechRate === "number" && saved.speechRate >= 0.5 && saved.speechRate <= 2.0) {
      speechRate = saved.speechRate;
    }

    applySpeedUI();
    progressNote.textContent = learnedLetters.size
      ? `Прогресс восстановлен: ${learnedLetters.size} букв уже открыто`
      : "Прогресс сохранён, но пока без звёздочек";
    return true;
  } catch (error) {
    progressNote.textContent = "Не удалось восстановить прошлый прогресс";
    return false;
  }
}

function getLettersPerPage() {
  return window.innerWidth <= 560 ? 8 : window.innerWidth <= 820 ? 9 : 12;
}

function getTotalPages() {
  return Math.ceil(letters.length / getLettersPerPage());
}

function setBubble(text) {
  bubble.textContent = text;
}

function setGuideText(text, target = "lesson") {
  if (target === "game") {
    gameGuideText.textContent = text;
    return;
  }
  guideText.textContent = text;
}

function scrollSectionIntoView(element) {
  if (!element) return;
  try {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    element.scrollIntoView(true);
  }
}

function setSpeaking(active) {
  bubble.classList.toggle("is-speaking", active);
  guideAvatar?.classList.toggle("is-speaking", active);
  gameGuideAvatar?.classList.toggle("is-speaking", active);
  window.lumi3d?.setSpeaking(active);
}

function setCharacterMood(mood) {
  guideAvatar?.classList.remove("is-happy", "is-thinking", "is-oops", "is-pointing");
  gameGuideAvatar?.classList.remove("is-happy", "is-thinking", "is-oops", "is-pointing");
  if (!mood) return;
  window.lumi3d?.setMood(mood, mood === "point" ? 1400 : 0);
  if (mood === "celebrate") {
    guideAvatar?.classList.add("is-happy");
    gameGuideAvatar?.classList.add("is-happy");
    return;
  }
  if (mood === "thinking") {
    guideAvatar?.classList.add("is-pointing", "is-thinking");
    gameGuideAvatar?.classList.add("is-thinking");
    return;
  }
  if (mood === "oops") {
    guideAvatar?.classList.add("is-oops");
    gameGuideAvatar?.classList.add("is-oops");
    return;
  }
  if (mood === "happy") {
    guideAvatar?.classList.add("is-happy");
    gameGuideAvatar?.classList.add("is-happy");
  }
}

function moveMascotToElement(element, mood, reactionText, duration = 1800) {
  window.lumi3d?.moveToElement(element, { mood, reactionText, duration });
}

function buildLetterAudioPath(letter) {
  return `assets/audio/letters/${encodeURIComponent(letter)}.mp3`;
}

function buildDetailAudioPath(letter) {
  return `assets/audio/details/${encodeURIComponent(letter)}.mp3`;
}

function buildPromptAudioPath(letter) {
  return `assets/audio/prompts/${encodeURIComponent(letter)}.mp3`;
}

function buildAnimalDetailPath(word) {
  return `assets/audio/animals/${encodeURIComponent(word.toLowerCase())}.mp3`;
}

function buildAnimalPromptPath(word) {
  return `assets/audio/animal-prompts/${encodeURIComponent(word.toLowerCase())}.mp3`;
}

function playAudio(src, rate, onEnded) {
  if (!src) {
    if (onEnded) onEnded();
    return false;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  const audio = new Audio(src);
  audio.playbackRate = rate !== undefined ? rate : speechRate;
  currentAudio = audio;
  setSpeaking(true);
  audio.addEventListener("ended", () => {
    setSpeaking(false);
    if (currentAudio === audio) currentAudio = null;
    if (onEnded) onEnded();
  }, { once: true });
  audio.addEventListener("error", () => {
    setSpeaking(false);
    if (currentAudio === audio) currentAudio = null;
    if (onEnded) onEnded();
  }, { once: true });
  audio.play().catch(() => {
    setSpeaking(false);
    if (onEnded) onEnded();
  });
  return true;
}

function speak(text, phraseKey = null) {
  lastPrompt = text;
  setBubble(text);
  const src = phraseKey ? phraseAudio[phraseKey] : null;
  lastQueueSrcs = src ? [src] : [];
  if (src) playAudio(src);
}

function cancelSpeechQueue() {
  if (speakTimer) {
    clearTimeout(speakTimer);
    speakTimer = null;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  speakingLocked = false;
  setSpeaking(false);
}

function playSequence(srcs, bubbleText, onComplete) {
  cancelSpeechQueue();
  lastQueueSrcs = [...srcs];
  if (bubbleText) {
    lastPrompt = bubbleText;
    setBubble(bubbleText);
  }

  const play = (index) => {
    if (index >= srcs.length) {
      setCharacterMood("happy");
      if (onComplete) window.setTimeout(onComplete, 2000);
      return;
    }
    const audio = new Audio(srcs[index]);
    audio.playbackRate = speechRate;
    if (currentAudio) currentAudio.pause();
    currentAudio = audio;
    setSpeaking(true);
    audio.addEventListener("ended", () => {
      if (currentAudio === audio) {
        currentAudio = null;
        setSpeaking(index < srcs.length - 1);
      }
      play(index + 1);
    }, { once: true });
    audio.addEventListener("error", () => {
      setSpeaking(false);
      if (currentAudio === audio) currentAudio = null;
      play(index + 1);
    }, { once: true });
    audio.play().catch(() => {
      setSpeaking(false);
      play(index + 1);
    });
  };

  play(0);
}

function queueSpeech(items) {
  cancelSpeechQueue();
  const parts = [...items];
  speakingLocked = true;
  lastQueueSrcs = items.filter((i) => i.audioSrc).map((i) => i.audioSrc);

  const run = () => {
    const next = parts.shift();
    if (!next) {
      speakingLocked = false;
      setCharacterMood("happy");
      return;
    }

    if (next.element) {
      moveMascotToElement(
        next.element,
        next.mood || "thinking",
        next.reactionText || next.text,
        next.reactionDuration || next.wait || 1800,
      );
    } else if (next.reactionText) {
      window.lumi3d?.setReaction(next.reactionText, next.reactionDuration || next.wait || 1800);
    }

    const src = next.audioSrc || (next.audioKey && phraseAudio[next.audioKey]);
    if (src) {
      lastPrompt = next.text || lastPrompt;
      setBubble(next.text || lastPrompt);
      playAudio(src);
    }

    const wait = next.wait ?? Math.max(1600, (next.text || "").length * 58);
    speakTimer = window.setTimeout(run, wait);
  };

  run();
}

function speakLetter(item) {
  cancelSpeechQueue();
  setCharacterMood("thinking");
  setGuideText(`Буква ${item.letter}.`, "lesson");
  const activeButton = document.querySelector(".letter-card.is-active");
  if (activeButton) {
    activeButton.classList.add("is-speaking");
    window.setTimeout(() => activeButton.classList.remove("is-speaking"), 1600);
    moveMascotToElement(activeButton, "thinking", item.letter, 1600);
  } else {
    window.lumi3d?.setReaction(item.letter, 1600);
  }
  playAudio(buildLetterAudioPath(item.letter), Math.min(speechRate, 0.82));
}

function speakExampleWord(item, word, element) {
  const text = `${word}. Буква ${item.letter}.`;
  setCharacterMood("point");
  setGuideText(`Слушай слово ${word}.`, "lesson");
  queueSpeech([
    {
      text,
      audioSrc: buildDetailAudioPath(item.letter),
      reactionText: text,
      element,
      mood: "point",
      reactionDuration: 3400,
      wait: 3400,
    },
  ]);
}

function speakAlphabetSequence() {
  setCharacterMood("thinking");
  setGuideText("Сейчас Туня медленно назовёт буквы по порядку.", "lesson");
  const items = [{ text: "Слушай алфавит.", audioKey: "alphabetIntro", wait: 1800 }];
  letters.forEach((item) => {
    items.push({
      text: item.letter,
      audioSrc: buildLetterAudioPath(item.letter),
      wait: 1300,
    });
  });
  queueSpeech(items);
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function updateProgress() {
  progressText.textContent = `${learnedLetters.size} звёздочек`;
  progressFill.style.width = `${(learnedLetters.size / letters.length) * 100}%`;
  stars.innerHTML = "";

  const total = Math.min(learnedLetters.size, 12);
  for (let index = 0; index < total; index += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.textContent = "⭐";
    stars.appendChild(star);
  }

  updateFlowers();
  saveProgress();
}

function createLetterCard(item) {
  const letterButton = document.createElement("button");
  letterButton.type = "button";
  letterButton.className = "letter-card";
  letterButton.style.background = `linear-gradient(180deg, #ffffff, ${item.color})`;
  letterButton.innerHTML = `<span class="letter-symbol">${item.letter}</span>`;

  letterButton.addEventListener("click", () => {
    if (speakingLocked) cancelSpeechQueue();
    learnedLetters.add(item.letter);
    document
      .querySelectorAll(".letter-card")
      .forEach((button) => button.classList.remove("is-active"));
    letterButton.classList.add("is-active");
    updateProgress();
    speakLetter(item);
  });

  return letterButton;
}

function createWordCard(item) {
  const wordButton = document.createElement("button");
  wordButton.type = "button";
  wordButton.className = "word-card";
  wordButton.style.background = `linear-gradient(180deg, #ffffff, ${item.color})`;
  wordButton.innerHTML = `
    <span class="word-picture" aria-hidden="true">${item.emoji}</span>
    <span class="word-title">${item.word}</span>
  `;

  wordButton.addEventListener("click", () => {
    if (speakingLocked) cancelSpeechQueue();
    document
      .querySelectorAll(".word-card")
      .forEach((button) => button.classList.remove("is-active"));
    wordButton.classList.add("is-active");
    speakExampleWord(item, item.word, wordButton);
  });

  return wordButton;
}

function shuffle(source) {
  const cloned = [...source];
  for (let index = cloned.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [cloned[index], cloned[swapIndex]] = [cloned[swapIndex], cloned[index]];
  }
  return cloned;
}

function renderLetters(items = visibleLetters) {
  visibleLetters = [...items];
  lettersGrid.innerHTML = "";
  wordsGrid.innerHTML = "";
  const perPage = getLettersPerPage();
  const totalPages = Math.ceil(items.length / perPage);
  if (currentPage >= totalPages) currentPage = 0;
  const pageItems = items.slice(currentPage * perPage, currentPage * perPage + perPage);
  pageIndicator.textContent = `${currentPage + 1} / ${totalPages}`;
  prevPageButton.disabled = totalPages <= 1;
  nextPageButton.disabled = totalPages <= 1;
  pageItems.forEach((item) => lettersGrid.appendChild(createLetterCard(item)));
  pageItems.forEach((item) => wordsGrid.appendChild(createWordCard(item)));
}

// ── Режимы ──

function showBrowseMode() {
  gameMode = null;
  currentRound = null;
  cancelSpeechQueue();
  wordsFrame.hidden = false;
  inlineGame.hidden = true;
  setCharacterMood("happy");
  window.lumi3d?.moveHome();
}

function showGameMode(mode) {
  cancelSpeechQueue();
  gameMode = mode;
  currentRound = null;
  wordsFrame.hidden = true;
  inlineGame.hidden = false;
  gameResult.textContent = "";
  gameOptions.innerHTML = "";
  setTimeout(() => {
    scrollSectionIntoView(inlineGame);
  }, 80);
}

// ── Игра: картинки ──

function buildPictureRound() {
  if (gameMode !== "pictures") return;
  const answer = getNextPictureAnimal();
  const distractors = shuffle(pictureAnimals.filter((i) => i.word !== answer.word)).slice(0, 3);
  const options = shuffle([answer, ...distractors]);

  currentRound = answer;
  gameTask.textContent = `Найди ${answer.acc}!`;
  setGuideText(`Слушай и найди нужную картинку.`, "game");
  gameResult.textContent = "";
  gameOptions.innerHTML = "";

  options.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "picture-option";
    button.style.background = `linear-gradient(180deg, #ffffff, ${item.color})`;
    button.innerHTML = `
      <span class="picture-emoji">${item.emoji}</span>
      <span class="picture-word">${item.word}</span>
    `;

    button.addEventListener("click", () => {
      const isCorrect = item.word === currentRound.word;
      gameOptions.querySelectorAll(".picture-option").forEach((opt) => opt.classList.remove("is-target"));
      button.classList.add(isCorrect ? "correct" : "wrong");

      if (isCorrect) {
        learnedLetters.add(item.letter);
        updateProgress();
        gameResult.textContent = "Правильно!";
        setCharacterMood("celebrate");
        moveMascotToElement(button, "celebrate", "Правильно!", 3200);
        playSequence(
          [phraseAudio.correct, buildAnimalDetailPath(item.word)],
          `Правильно! Это ${item.word}. ${item.word} начинается на букву ${item.letter}.`,
          buildPictureRound,
        );
      } else {
        gameResult.textContent = "Не то, попробуй ещё!";
        setCharacterMood("oops");
        moveMascotToElement(button, "oops", "Не то!", 1600);
        playSequence(
          [phraseAudio.repeatTry, buildAnimalPromptPath(currentRound.word)],
          `Попробуй ещё! Найди ${currentRound.acc}!`,
        );
        setTimeout(() => button.classList.remove("wrong"), 600);
      }
    });

    gameOptions.appendChild(button);
  });

  setTimeout(() => {
    playSequence(
      [buildAnimalPromptPath(answer.word)],
      `Найди ${answer.acc}!`,
    );
  }, 300);
}

// ── Игра: буквы ──

function buildLetterRound() {
  if (gameMode !== "letters") return;
  const answer = randomItem(letters);
  const distractors = shuffle(letters.filter((item) => item.letter !== answer.letter)).slice(0, 3);
  const options = shuffle([answer, ...distractors]);

  currentRound = answer;
  gameTask.textContent = `Слушай: нужна буква ${answer.letter}`;
  setGuideText(`Найди букву ${answer.letter}. Я подожду твой ответ.`, "game");
  gameResult.textContent = "";
  gameOptions.innerHTML = "";

  options.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "game-option";
    button.textContent = item.letter;
    button.setAttribute("aria-label", `Буква ${item.letter}`);

    button.addEventListener("click", () => {
      const isCorrect = item.letter === currentRound.letter;
      gameOptions.querySelectorAll(".game-option").forEach((opt) => opt.classList.remove("is-target"));
      button.classList.add(isCorrect ? "correct" : "wrong");

      if (isCorrect) {
        learnedLetters.add(item.letter);
        updateProgress();
        const cheerIndex = Math.floor(Math.random() * cheerPhrases.length);
        const phrase = cheerPhrases[cheerIndex];
        gameResult.textContent = phrase;
        setCharacterMood("celebrate");
        setGuideText("Верно! Ты нашёл правильную букву.", "game");
        moveMascotToElement(button, "celebrate", "Молодец!", 3200);
        playSequence(
          [phraseAudio[`cheer-${cheerIndex}`], phraseAudio.eto, buildLetterAudioPath(item.letter)],
          phrase,
          buildLetterRound,
        );
      } else {
        gameResult.textContent = "Попробуй ещё раз";
        setCharacterMood("oops");
        setGuideText(`Пока не та буква. Ищем ${currentRound.letter}.`, "game");
        moveMascotToElement(button, "oops", "Ой, ещё раз", 1600);
        playSequence(
          [phraseAudio.repeatTry, buildLetterAudioPath(currentRound.letter)],
          `Попробуй ещё раз. Нужна буква ${currentRound.letter}`,
        );
        setTimeout(() => button.classList.remove("wrong"), 500);
      }
    });

    gameOptions.appendChild(button);
  });

  setTimeout(() => {
    const hintButton = [...gameOptions.querySelectorAll(".game-option")]
      .find((button) => button.textContent === answer.letter);
    if (hintButton) {
      hintButton.classList.add("is-target");
      moveMascotToElement(hintButton, "point", `Ищем ${answer.letter}`, 1600);
    }
    playSequence(
      [phraseAudio.chooseLetter, buildLetterAudioPath(answer.letter)],
      `Найди букву ${answer.letter}`,
    );
  }, 250);
}

// ── Кнопки ──

startButton.addEventListener("click", () => {
  setCharacterMood("happy");
  window.lumi3d?.moveHome();
  window.lumi3d?.setReaction("Начнём!", 1400);
  window.lumi3d?.nudge();
  setGuideText("Нажми на любую большую букву. Я буду объяснять.");
  speak("Привет! Я твой львёнок. Нажимай на буквы, и я всё расскажу!", "intro");
  scrollSectionIntoView(document.querySelector(".lesson-card"));
});

alphabetButton.addEventListener("click", () => {
  window.lumi3d?.setMood("point", 2000);
  window.lumi3d?.setReaction("Слушай алфавит", 1800);
  speakAlphabetSequence();
});

startPictureGameButton.addEventListener("click", () => {
  showGameMode("pictures");
  setCharacterMood("happy");
  window.lumi3d?.setReaction("Найди картинку!", 1800);
  setGuideText("Слушай и найди нужную картинку.", "game");
  playAudio(phraseAudio.findPicture, undefined, buildPictureRound);
});

startLetterGameButton.addEventListener("click", () => {
  showGameMode("letters");
  setCharacterMood("happy");
  window.lumi3d?.setReaction("Найди букву!", 1800);
  setGuideText("Слушай и найди правильную букву.", "game");
  playAudio(phraseAudio.startLetterGame, undefined, buildLetterRound);
});

stopGameButton.addEventListener("click", () => {
  showBrowseMode();
  setGuideText("Нажми на букву или картинку. Я расскажу.");
  speak("Возвращаемся к буквам.", "resetOrder");
});

shuffleButton.addEventListener("click", () => {
  currentPage = 0;
  renderLetters(shuffle(letters));
  setCharacterMood("thinking");
  window.lumi3d?.moveHome();
  window.lumi3d?.setReaction("Буквы смешались", 1500);
  setGuideText("Буквы перемешались. Можно искать любую знакомую.");
  speak("Я перемешал все буквы. Найди знакомую букву.", "shuffled");
});

resetOrderButton.addEventListener("click", () => {
  currentPage = 0;
  renderLetters(letters);
  setCharacterMood("happy");
  window.lumi3d?.moveHome();
  window.lumi3d?.setReaction("Снова по порядку", 1500);
  setGuideText("Я вернул буквы по порядку.");
  speak("Я вернул буквы по порядку.", "resetOrder");
});

repeatButton.addEventListener("click", () => {
  setCharacterMood("thinking");
  setBubble(lastPrompt);
  if (lastQueueSrcs.length > 1) {
    playSequence(lastQueueSrcs, lastPrompt);
  } else if (lastQueueSrcs.length === 1) {
    playAudio(lastQueueSrcs[0]);
  }
});

repeatGameButton.addEventListener("click", () => {
  if (!gameMode || !currentRound) return;
  setCharacterMood("thinking");

  if (gameMode === "pictures") {
    playSequence(
      [buildAnimalPromptPath(currentRound.word)],
      `Найди ${currentRound.acc}!`,
    );
  } else {
    const hintButton = [...gameOptions.querySelectorAll(".game-option")]
      .find((button) => button.textContent === currentRound.letter);
    if (hintButton) {
      moveMascotToElement(hintButton, "point", `Вот ${currentRound.letter}`, 1500);
    }
    playSequence(
      [phraseAudio.chooseLetter, buildLetterAudioPath(currentRound.letter)],
      `Найди букву ${currentRound.letter}`,
    );
  }
});

prevPageButton.addEventListener("click", () => {
  const totalPages = getTotalPages();
  currentPage = (currentPage - 1 + totalPages) % totalPages;
  renderLetters(visibleLetters);
  window.lumi3d?.moveHome();
  const pageNum = currentPage + 1;
  setGuideText(`Открылась страница ${pageNum}.`);
  speak(`Страница ${pageNum}.`, `page-${pageNum}`);
});

nextPageButton.addEventListener("click", () => {
  const totalPages = getTotalPages();
  currentPage = (currentPage + 1) % totalPages;
  renderLetters(visibleLetters);
  window.lumi3d?.moveHome();
  const pageNum = currentPage + 1;
  setGuideText(`Открылась страница ${pageNum}.`);
  speak(`Страница ${pageNum}.`, `page-${pageNum}`);
});

window.addEventListener("resize", () => {
  if (resizeTimer) window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    renderLetters(visibleLetters);
  }, 120);
});

speedButtons.forEach((button) => {
  button.addEventListener("click", () => {
    speechRate = Number(button.dataset.speed);
    applySpeedUI();
    saveProgress();
    setCharacterMood("happy");
    setGuideText(`Я буду говорить ${button.textContent.toLowerCase()}.`);
    speak("Скорость изменена.", "speedChanged");
  });
});

resetProgressButton.addEventListener("click", () => {
  learnedLetters = new Set();
  updateProgress();
  progressNote.textContent = "Прогресс сброшен. Можно начинать заново";
  currentPage = 0;
  renderLetters(letters);
  showBrowseMode();
  setGuideText("Все звёздочки очищены. Нажми на букву и начни сначала.");
  speak("Я очистил все звёздочки. Давай начнём сначала.", "resetProgress");
});

restoreProgress();
applySpeedUI();
renderLetters();
updateProgress();
setBubble("Нажми кнопку начать");
setGuideText("Нажми на букву. Я скажу, как она звучит.");
window.lumi3d?.moveHome();
