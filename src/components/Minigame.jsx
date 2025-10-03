import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const MiniGame = forwardRef(({ onComplete, onReward }, ref) => {
  const [gameState, setGameState] = useState('playing');
  const [selectedBush, setSelectedBush] = useState(null);
  const [correctBush, setCorrectBush] = useState(null);
  const [attempts, setAttempts] = useState(2);
  const [hint, setHint] = useState('');
  const [highlightedBush, setHighlightedBush] = useState(0);
  const [wonItem, setWonItem] = useState(null);

  useEffect(() => {
    const randomBush = Math.floor(Math.random() * 6);
    setCorrectBush(randomBush);
  }, []);

  const getDistance = (bush1, bush2) => {
    return Math.abs(bush1 - bush2);
  };

  const getHint = (selected, correct) => {
    const distance = getDistance(selected, correct);

    if (distance === 1) {
      return 'MUITO PERTO!';
    } else {
      return 'MUITO LONGE...';
    }
  };

  const moveBushLeft = () => {
    if (gameState === 'playing') {
      setHighlightedBush((prev) => (prev - 1 + 6) % 6);
    }
  };

  const moveBushRight = () => {
    if (gameState === 'playing') {
      setHighlightedBush((prev) => (prev + 1) % 6);
    }
  };

  const handleBushSelect = () => {
    if (gameState !== 'playing') return;

    const selected = highlightedBush;
    setSelectedBush(selected);

    if (selected === correctBush) {
      setGameState('won');

      const rewards = [
        { icon: '🍎', name: 'BERRY', quantity: 2 },
        { icon: '💊', name: 'POTION', quantity: 1 },
        { icon: '🍬', name: 'CANDY', quantity: 1 },
        { icon: '💉', name: 'VITAMIN', quantity: 1 },
      ];

      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      setWonItem(reward); // NOVO: armazena o item
      onReward(reward.icon, reward.name, reward.quantity);

      setTimeout(() => {
        onComplete();
      }, 3000);
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);

      if (newAttempts > 0) {
        const hintText = getHint(selected, correctBush);
        setHint(hintText);
        setGameState('hint');

        setTimeout(() => {
          setGameState('playing');
          setSelectedBush(null);
        }, 2500);
      } else {
        setGameState('lost');
        setTimeout(() => {
          onComplete();
        }, 3000);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    moveBushLeft,
    moveBushRight,
    handleBushSelect,
  }));

  return (
    <>
      <div className="minigame-header">
        {gameState === 'playing' && `BUSH SEARCH • ${attempts} LEFT`}
        {gameState === 'hint' && hint}
        {gameState === 'won' && 'ENCONTROU!'}
        {gameState === 'lost' && 'NADA AQUI...'}
      </div>

      <div className="minigame-content">
        {gameState === 'won' && wonItem ? (
          <div className="minigame-reward">
            <div className="reward-icon">{wonItem.icon}</div>
            <div className="reward-text">
              GOT {wonItem.quantity}x
              <br />
              {wonItem.name}!
            </div>
          </div>
        ) : (
          <div className="minigame-bushes">
            {[0, 1, 2, 3, 4, 5].map((bushIndex) => (
              <div
                key={bushIndex}
                className={`bush ${
                  highlightedBush === bushIndex ? 'highlighted' : ''
                } ${
                  gameState === 'won' && bushIndex === correctBush
                    ? 'correct'
                    : ''
                } ${
                  gameState === 'hint' && bushIndex === selectedBush
                    ? 'wrong'
                    : ''
                }`}
              >
                {gameState === 'won' && bushIndex === correctBush ? '✨' : '🌳'}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="minigame-instructions">
        {gameState === 'playing' && '◀ ▶ MOVE • ● CHECK'}
        {gameState === 'hint' && 'TRY AGAIN!'}
        {gameState === 'won' && 'ADDED TO BAG!'}
        {gameState === 'lost' && 'BETTER LUCK NEXT TIME'}
      </div>
    </>
  );
});

export default MiniGame;
