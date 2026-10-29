/* Friendly corner companion; kept separate from the learning app's route code. */
(() => {
  const button = document.getElementById('catButton');
  const speech = document.getElementById('catSpeech');
  const companion = document.getElementById('catCompanion');
  if (!button || !speech || !companion) return;

  const messages = [
    'Hi! Ready to make something pawsome? 🐾',
    'Tiny steps count. Try one coding challenge!',
    'Stuck? Read the error, then try one small fix.',
    'You have got this. I believe in your code! ✨',
    'Take a stretch break, then come back curious.'
  ];
  let messageIndex = -1;
  let closeTimer;
  let playTimer;
  let playIndex = 0;
  const playMoves = ['is-pounce', 'is-batting', 'is-petted'];

  // Let the cat react immediately to a tap or click; pointer events cover mouse and touch.
  button.addEventListener('pointerdown', () => {
    clearTimeout(playTimer);
    companion.classList.remove(...playMoves);
    const move = playMoves[playIndex++ % playMoves.length];
    companion.classList.add(move);
    playTimer = setTimeout(() => companion.classList.remove(...playMoves), 760);
  });

  button.addEventListener('click', () => {
    messageIndex = (messageIndex + 1) % messages.length;
    speech.textContent = messages[messageIndex];
    speech.hidden = false;
    companion.classList.add('is-talking');
    button.setAttribute('aria-expanded', 'true');
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      speech.hidden = true;
      companion.classList.remove('is-talking');
      button.setAttribute('aria-expanded', 'false');
    }, 5200);
  });
})();
