function initCountdown(calendar, targetStr) {
  const targetDate = new Date(targetStr);
  const countdown = calendar.querySelector('.countdown');
  const stack = calendar.querySelector('.stack');
  const soundBtn = calendar.querySelector('.sound-toggle');
  const lastKey = calendar.id + '_last';
  let sound = false;
  let audioCtx;

  function playSound() {
    if (!sound) return;
    if (!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = 700;
    gain.gain.value = 0.1;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  }

  soundBtn.addEventListener('click', () => {
    sound = !sound;
    soundBtn.textContent = sound ? '🔊' : '🔈';
    soundBtn.setAttribute('aria-pressed', sound);
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  });

  function tearPage() {
    const page = calendar.querySelector('.page.current');
    const clone = page.cloneNode(true);
    clone.classList.add('tearing');
    stack.appendChild(clone);
    playSound();
    clone.addEventListener('animationend', () => clone.remove());
  }

  function checkAndTearPage() {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Berlin' });
    const last = localStorage.getItem(lastKey);
    if (last && last !== today) {
      const diff = Math.max(1, Math.floor((new Date(today) - new Date(last)) / 86400000));
      for (let i = 0; i < diff; i++) tearPage();
    }
    if (last !== today) localStorage.setItem(lastKey, today);
  }

  function diffTime() {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
    if (now >= targetDate) return [0,0,0,0,0];
    let temp = new Date(now);
    let months = (targetDate.getFullYear() - temp.getFullYear()) * 12 + targetDate.getMonth() - temp.getMonth();
    temp.setMonth(temp.getMonth() + months);
    if (temp > targetDate) {
      months--;
      temp.setMonth(temp.getMonth() - 1);
    }
    let remain = targetDate - temp;
    const days = Math.floor(remain / 86400000);
    remain -= days * 86400000;
    const hours = Math.floor(remain / 3600000);
    remain -= hours * 3600000;
    const minutes = Math.floor(remain / 60000);
    remain -= minutes * 60000;
    const seconds = Math.floor(remain / 1000);
    return [months, days, hours, minutes, seconds];
  }

  function render() {
    checkAndTearPage();
    const [mo, d, h, mi, s] = diffTime();
    countdown.innerHTML = `<span class="num">${mo}</span> <span class="label">месяцев</span> ` +
      `<span class="num">${d}</span> <span class="label">дней</span> ` +
      `<span class="num">${h}</span> <span class="label">часов</span> ` +
      `<span class="num">${mi}</span> <span class="label">минут</span> ` +
      `<span class="num">${s}</span> <span class="label">секунд</span>`;
    if (mo + d + h + mi + s === 0) {
      countdown.textContent = 'Событие наступило!';
      calendar.classList.add('finished');
    }
  }

  render();
  setInterval(render, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.calendar').forEach(cal => {
    initCountdown(cal, cal.dataset.target);
  });
});
