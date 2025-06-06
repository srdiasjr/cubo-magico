let timer = document.getElementById("timer");
let startStopBtn = document.getElementById("startStop"); // pode até esconder depois
let temposDiv = document.getElementById("tempos");

let startTime = null;
let interval = null;
let rodando = false;
let tempos = [];

function formatarTempo(ms) {
  const segundos = Math.floor(ms / 1000);
  const centesimos = Math.floor((ms % 1000) / 10);
  return `${segundos}.${centesimos.toString().padStart(2, '0')}`;
}

document.addEventListener("keydown", () => {
  if (!rodando) {
    startTime = performance.now();
    interval = setInterval(() => {
      const tempoAtual = performance.now() - startTime;
      timer.textContent = formatarTempo(tempoAtual);
    }, 10);
    startStopBtn.textContent = "Parar";
    rodando = true;
  } else {
    clearInterval(interval);
    const tempoFinal = performance.now() - startTime;
    tempos.push(tempoFinal);
    atualizarTempos();
    startStopBtn.textContent = "Iniciar";
    rodando = false;
  }
});

function atualizarTempos() {
  temposDiv.innerHTML = "";
  tempos.forEach((tempo, index) => {
    const tempoFormatado = formatarTempo(tempo);
    const p = document.createElement("p");
    p.textContent = `${index + 1}: ${tempoFormatado}`;
    temposDiv.appendChild(p);
  });
}
