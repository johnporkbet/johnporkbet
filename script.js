let balance = 100;

// Atualiza o saldo inicial
document.getElementById('balance').querySelector('span').textContent = balance;

// Eventos de clique para apostar baixo ou alto
document.getElementById('bet-low').addEventListener('click', () => placeBet('low'));
document.getElementById('bet-high').addEventListener('click', () => placeBet('high'));

function placeBet(type) {
  const betAmount = parseInt(document.getElementById('bet-amount').value);

  // Valida a aposta
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
    alert('Por favor, insira um valor válido dentro do saldo disponível.');
    return;
  }

  // Gera número aleatório e calcula o resultado
  const randomNumber = Math.floor(Math.random() * 101);
  const isWin = (type === 'low' && randomNumber < 50) || (type === 'high' && randomNumber >= 50);

  if (isWin) {
    balance += betAmount;
    addHistory(`🎉 Ganhou! Número: ${randomNumber}, ganhou R$${betAmount}.`);
  } else {
    balance -= betAmount;
    addHistory(`💔 Perdeu! Número: ${randomNumber}, perdeu R$${betAmount}.`);
  }

  // Atualiza o saldo
  document.getElementById('balance').querySelector('span').textContent = balance;

  // Fim de jogo
  if (balance <= 0) {
    alert('Você ficou sem saldo! Fim de jogo.');
    document.querySelectorAll('.bet-btn').forEach(btn => btn.disabled = true);
  }
}

function addHistory(message) {
  const historyList = document.getElementById('history-list');
  const listItem = document.createElement('li');
  listItem.textContent = message;
  historyList.prepend(listItem);
}
