    const symbols = ['🍎', '🍌', '🍇', '🍊', '🍉', '🍒', '🥝', '🍍'];
    const cards = [...symbols, ...symbols].sort(() => 0.5 - Math.random());

    const board = document.getElementById('game-board');
    let flippedCards = [];
    let lockBoard = false;

    cards.forEach(symbol => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.symbol = symbol;
      card.innerText = symbol;

      card.addEventListener('click', () => {
        if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          lockBoard = true;
          const [first, second] = flippedCards;

          if (first.dataset.symbol === second.dataset.symbol) {
            first.classList.add('matched');
            second.classList.add('matched');
          } else {
            setTimeout(() => {
              first.classList.remove('flipped');
              second.classList.remove('flipped');
            }, 1000);
          }

          setTimeout(() => {
            flippedCards = [];
            lockBoard = false;
          }, 1000);
        }
      });

      board.appendChild(card);
    });