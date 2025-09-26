import { useState } from 'react';
import './App.css';

function App() {
  const [petName] = useState('PIKACHU');
  const [petHunger, setPetHunger] = useState(80);
  const [petHappiness, setPetHappiness] = useState(70);
  const [petEnergy, setPetEnergy] = useState(60);
  const [petHealth, setPetHealth] = useState(90);
  const [showMessage, setShowMessage] = useState(false);
  const [showEmote, setShowEmote] = useState(false);
  const [currentEmote, setCurrentEmote] = useState('happy');

  const [petMessage, setPetMessage] = useState('PIKA PIKA!');

  const [currentScreen, setCurrentScreen] = useState('pet');
  const [selectedAction, setSelectedAction] = useState(0);

  const actions = [
    { name: 'FEED', icon: '🍎', desc: 'BERRIES' },
    { name: 'PLAY', icon: '⚡', desc: 'BATTLE' },
    { name: 'SLEEP', icon: '💤', desc: 'REST' },
    { name: 'MEDICINE', icon: '💊', desc: 'POTION' },
  ];

  const getPetMood = () => {
    if (petHealth < 30) return '😵';
    if (petHunger < 30) return '😋';
    if (petEnergy < 20) return '😴';
    if (petHappiness > 80) return '😊';
    if (petHappiness > 50) return '🙂';
    return '😐';
  };

  const getPetSprite = () => {
    const baseUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

    if (petHealth < 30) return `${baseUrl}/back/25.png`;
    if (petHunger < 30) return `${baseUrl}/25.png`;
    if (petEnergy < 20) return `${baseUrl}/25.png`;
    if (petHappiness > 80) return `${baseUrl}/shiny/25.png`;

    return `${baseUrl}/25.png`;
  };

  const executeAction = () => {
    const action = actions[selectedAction].name;

    switch (action) {
      case 'FEED':
        setPetHunger(Math.min(100, petHunger + 30));
        setPetHealth(Math.min(100, petHealth + 5));
        showTemporaryMessage('PIKA PIKA!');
        showEmoteReaction('happy'); // Emote feliz
        break;

      case 'PLAY':
        if (petEnergy < 20) {
          showTemporaryMessage('PIKA... CHU...', 2500);
          showEmoteReaction('tired', 3000); // Emote cansado
          break;
        }
        setPetHappiness(Math.min(100, petHappiness + 25));
        setPetEnergy(Math.max(0, petEnergy - 15));
        showTemporaryMessage('PIKACHU!');
        showEmoteReaction('excited'); // Emote animado
        break;

      case 'SLEEP':
        setPetEnergy(Math.min(100, petEnergy + 40));
        setPetHealth(Math.min(100, petHealth + 10));
        showTemporaryMessage('ZZZ... PIKA...', 4000);
        showEmoteReaction('sleeping', 4500); // Emote dormindo
        break;

      case 'MEDICINE':
        setPetHealth(Math.min(100, petHealth + 50));
        setPetHappiness(Math.max(0, petHappiness - 10));
        showTemporaryMessage('PIKA! CHU!', 2000);
        showEmoteReaction('sick'); // Emote doente
        break;
    }

    setCurrentScreen('pet');
  };

  const showEmoteReaction = (emoteType, duration = 2500) => {
    setCurrentEmote(emoteType);
    setShowEmote(true);

    setTimeout(() => {
      setShowEmote(false);
    }, duration);
  };

  const showTemporaryMessage = (message, duration = 3000) => {
    setPetMessage(message);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, duration);
  };

  const buttonLeft = () => {
    if (currentScreen === 'menu') {
      setSelectedAction((selectedAction - 1 + actions.length) % actions.length);
    } else {
      showTemporaryMessage(`HP:${petHealth} EN:${petEnergy}`, 2500);
    }
  };

  const buttonCenter = () => {
    if (currentScreen === 'pet') {
      setCurrentScreen('menu');
    } else {
      executeAction();
    }
  };

  const buttonRight = () => {
    if (currentScreen === 'menu') {
      setSelectedAction((selectedAction + 1) % actions.length);
    } else {
      showTemporaryMessage('TCHAU!', 1500);
    }
  };

  return (
    <div className="game-container">
      <div className="pokeball">
        {/* Metade Superior - Vermelha */}
        <div className="pokeball-top">
          <div className="pokeball-reflection" />
        </div>

        {/* Metade Inferior - Branca */}
        <div className="pokeball-bottom" />

        {/* Linha Central */}
        <div className="pokeball-line" />

        {/* Tela LCD */}
        <div className="lcd-screen">
          <div className="screen-content">
            {currentScreen === 'pet' ? (
              <>
                <div className="pet-name">{petName}</div>
                <div className="pet-sprite">
                  <img
                    src={getPetSprite()}
                    alt="Pikachu"
                    className="pokemon-image"
                  />
                </div>
                <div className="pet-sprite">
                  <img
                    src={getPetSprite()}
                    alt="Pikachu"
                    className="pokemon-image"
                  />
                  {/* Balãozinho com emote */}
                  {showEmote && (
                    <div className="emote-bubble">
                      <img
                        src={`/src/assets/emotes/${currentEmote}.png`}
                        alt={currentEmote}
                        className="emote-image"
                      />
                    </div>
                  )}
                </div>
                {showMessage && (
                  <div className="pet-message fade-in">{petMessage}</div>
                )}

                <div className="status-bars">
                  <div className="status-bar">
                    <span>HP</span>
                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${petHunger}%`,
                          backgroundColor:
                            petHunger > 50 ? '#7bed9f' : '#ff6b6b',
                        }}
                      />
                    </div>
                  </div>

                  <div className="status-bar">
                    <span>JOY</span>
                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${petHappiness}%`,
                          backgroundColor:
                            petHappiness > 50 ? '#7bed9f' : '#ff6b6b',
                        }}
                      />
                    </div>
                  </div>

                  <div className="status-bar">
                    <span>EN</span>
                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${petEnergy}%`,
                          backgroundColor:
                            petEnergy > 50 ? '#7bed9f' : '#ff6b6b',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="menu-header">CHOOSE ACTION</div>

                <div className="carousel">
                  <div className="carousel-prev">
                    {
                      actions[
                        (selectedAction - 1 + actions.length) % actions.length
                      ].icon
                    }
                  </div>

                  <div className="carousel-current">
                    <div className="action-icon">
                      {actions[selectedAction].icon}
                    </div>
                    <div className="action-desc">
                      {actions[selectedAction].desc}
                    </div>
                  </div>

                  <div className="carousel-next">
                    {actions[(selectedAction + 1) % actions.length].icon}
                  </div>
                </div>

                <div className="menu-controls">◀ SELECT ● CONFIRM ▶</div>
              </>
            )}
          </div>
        </div>

        {/* Botões */}
        <div className="button-container">
          <button className="btn btn-left" onClick={buttonLeft}>
            ◀
          </button>
          <button className="btn btn-center" onClick={buttonCenter}>
            ●
          </button>
          <button className="btn btn-right" onClick={buttonRight}>
            ▶
          </button>
        </div>

        {/* Botão central da Pokéball */}
        <div className="pokeball-center-button" />
      </div>
    </div>
  );
}

export default App;
