// Reaction start on the hero lights. Once the intro has turned them green, press them to race:
// the five pods light red one by one, go green after a random hold, and you press again as fast as you can.

(() => {
  const btn = document.getElementById('lights');
  const status = document.getElementById('lights-status');
  if (!btn || !status) return;

  const pods = [...btn.children];
  const verb = matchMedia('(hover: hover) and (pointer: fine)').matches ? 'click' : 'tap';
  const BEST_KEY = 'reaction-best-v1';
  const FIRST = 600, STEP = 800; // ms before the first pod lights, then between pods
  const secs = (ms) => (ms / 1000).toFixed(3);
  const say = (text) => (status.textContent = text);

  let best = 0;
  try { best = +localStorage.getItem(BEST_KEY) || 0; } catch (e) {}

  let state = 'intro', timers = [], goAt = 0;
  const stop = () => { timers.forEach(clearTimeout); timers = []; };

  function start() {
    stop();
    state = 'lighting';
    btn.classList.add('is-game');
    btn.classList.remove('is-go');
    pods.forEach((p) => p.classList.remove('is-on'));
    say('wait for green');
    pods.forEach((p, i) => timers.push(setTimeout(() => p.classList.add('is-on'), FIRST + i * STEP)));
    // Random hold after the last pod, so the start can't be timed
    timers.push(setTimeout(() => requestAnimationFrame(() => {
      if (state !== 'lighting') return;
      state = 'go';
      btn.classList.add('is-go');
      goAt = performance.now();
      say('go!');
    }), FIRST + 4 * STEP + 400 + Math.random() * 2400));
  }

  function jumpStart() {
    stop();
    state = 'done';
    btn.classList.remove('is-go');
    pods.forEach((p) => p.classList.add('is-on'));
    say('jump start · try again');
  }

  function finish(ms) {
    if (ms < 100) return jumpStart(); // quicker than anyone can react: it was a guess
    state = 'done';
    const isBest = !best || ms < best;
    if (isBest) {
      best = ms;
      try { localStorage.setItem(BEST_KEY, ms); } catch (e) {}
    }
    say(`${secs(ms)} s · ${isBest ? 'new best' : `best ${secs(best)}`}`);
  }

  function press(t) {
    if (state === 'go') finish(Math.round(t - goAt));
    else if (state === 'lighting') jumpStart();
    else start();
  }

  // Time presses on pointerdown/keydown, since a click only fires on release. The click that
  // follows is swallowed; a click on its own (e.g. from a screen reader) still counts.
  const at = (e) => (e.timeStamp > 0 && e.timeStamp <= performance.now() ? e.timeStamp : performance.now());
  let swallow = false;
  const onPress = (e) => { swallow = true; press(at(e)); };
  btn.addEventListener('pointerdown', (e) => { if (e.isPrimary && e.button === 0) onPress(e); });
  btn.addEventListener('keydown', (e) => {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    if (e.repeat) return e.preventDefault(); // a held Enter would keep clicking
    onPress(e);
  });
  btn.addEventListener('click', (e) => {
    if (swallow) swallow = false;
    else press(at(e));
  });

  // Playable once the CSS intro has turned the lights green (at 2.9s)
  setTimeout(() => { btn.disabled = false; state = 'ready'; }, 3000);
  setTimeout(() => state === 'ready' && say(`${verb} the lights to race`), 5000);
})();
