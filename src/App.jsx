import { useState } from 'react';
import './App.css';
import PokemonSelection from './components/PokemonSelection';
import PetScreen from './components/PetScreen';
import ActionMenu from './components/ActionMenu';

function App() {
  // Tela de seleção
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(0);

  // Lista de Pokémon disponíveis
  const availablePokemon = [
    { id: 25, name: 'PIKACHU' },
    { id: 4, name: 'CHARMANDER' },
    { id: 1, name: 'BULBASAUR' },
    { id: 7, name: 'SQUIRTLE' },
    { id: 133, name: 'EEVEE' },
    { id: 39, name: 'JIGGLYPUFF' },
  ];

  const [petName, setPetName] = useState('PIKACHU');
  const [petId, setPetId] = useState(25);
  const [petHunger, setPetHunger] = useState(80);
  const [petHappiness, setPetHappiness] = useState(70);
  const [petEnergy, setPetEnergy] = useState(60);
  const [petHealth, setPetHealth] = useState(90);
  const [petMessage, setPetMessage] = useState('PIKA PIKA!');

  const [currentScreen, setCurrentScreen] = useState('pet');
  const [selectedAction, setSelectedAction] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showEmote, setShowEmote] = useState(false);
  const [currentEmote, setCurrentEmote] = useState('happy');

  const actions = [
    { name: 'FEED', icon: '🍎', desc: 'BERRIES' },
    { name: 'PLAY', icon: '⚡', desc: 'BATTLE' },
    { name: 'SLEEP', icon: '💤', desc: 'REST' },
    { name: 'MEDICINE', icon: '💊', desc: 'POTION' },
  ];

  const getPetSprite = () => {
    const baseUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

    if (petHealth < 30) return `${baseUrl}/back/${petId}.png`;
    if (petHunger < 30) return `${baseUrl}/${petId}.png`;
    if (petEnergy < 20) return `${baseUrl}/${petId}.png`;
    if (petHappiness > 80) return `${baseUrl}/shiny/${petId}.png`;

    return `${baseUrl}/${petId}.png`;
  };

  const showTemporaryMessage = (message, duration = 3000) => {
    setPetMessage(message);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, duration);
  };

  const showEmoteReaction = (emoteType, duration = 2500) => {
    setCurrentEmote(emoteType);
    setShowEmote(true);

    setTimeout(() => {
      setShowEmote(false);
    }, duration);
  };

  const executeAction = () => {
    const action = actions[selectedAction].name;

    switch (action) {
      case 'FEED':
        setPetHunger(Math.min(100, petHunger + 30));
        setPetHealth(Math.min(100, petHealth + 5));
        showTemporaryMessage('PIKA PIKA!');
        showEmoteReaction('happy');
        break;

      case 'PLAY':
        if (petEnergy < 20) {
          showTemporaryMessage('PIKA... CHU...', 2500);
          showEmoteReaction('tired', 3000);
          break;
        }
        setPetHappiness(Math.min(100, petHappiness + 25));
        setPetEnergy(Math.max(0, petEnergy - 15));
        showTemporaryMessage('PIKACHU!');
        showEmoteReaction('excited');
        break;

      case 'SLEEP':
        setPetEnergy(Math.min(100, petEnergy + 40));
        setPetHealth(Math.min(100, petHealth + 10));
        showTemporaryMessage('ZZZ... PIKA...', 4000);
        showEmoteReaction('sleeping', 4500);
        break;

      case 'MEDICINE':
        setPetHealth(Math.min(100, petHealth + 50));
        setPetHappiness(Math.max(0, petHappiness - 10));
        showTemporaryMessage('PIKA! CHU!', 2000);
        showEmoteReaction('sick');
        break;
    }

    setCurrentScreen('pet');
  };

  // Navegação seleção de Pokémon
  const selectPrevPokemon = () => {
    setSelectedPokemon(
      (selectedPokemon - 1 + availablePokemon.length) % availablePokemon.length,
    );
  };

  const selectNextPokemon = () => {
    setSelectedPokemon((selectedPokemon + 1) % availablePokemon.length);
  };

  const confirmPokemon = () => {
    const chosen = availablePokemon[selectedPokemon];
    setPetName(chosen.name);
    setPetId(chosen.id);
    setGameStarted(true);
  };

  // Navegação do jogo
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
        <div className="pokeball-top">
          <div className="pokeball-reflection" />
        </div>

        <div className="pokeball-bottom" />
        <div className="pokeball-line" />

        {/* Tela LCD */}
        <div className="lcd-screen">
          <div className="screen-content">
            {!gameStarted ? (
              <PokemonSelection
                availablePokemon={availablePokemon}
                selectedPokemon={selectedPokemon}
                onPrev={selectPrevPokemon}
                onNext={selectNextPokemon}
                onConfirm={confirmPokemon}
              />
            ) : currentScreen === 'pet' ? (
              <PetScreen
                petName={petName}
                petSprite={getPetSprite()}
                showMessage={showMessage}
                petMessage={petMessage}
                petHunger={petHunger}
                petHappiness={petHappiness}
                petEnergy={petEnergy}
                showEmote={showEmote}
                currentEmote={currentEmote}
              />
            ) : (
              <ActionMenu actions={actions} selectedAction={selectedAction} />
            )}
          </div>
        </div>

        {/* Botões */}
        <div className="button-container">
          {!gameStarted ? (
            <>
              <button className="btn btn-left" onClick={selectPrevPokemon}>
                ◀
              </button>
              <button className="btn btn-center" onClick={confirmPokemon}>
                START
              </button>
              <button className="btn btn-right" onClick={selectNextPokemon}>
                ▶
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-left" onClick={buttonLeft}>
                ◀
              </button>
              <button className="btn btn-center" onClick={buttonCenter}>
                ●
              </button>
              <button className="btn btn-right" onClick={buttonRight}>
                ▶
              </button>
            </>
          )}
        </div>

        <div className="pokeball-center-button" />
      </div>
    </div>
  );
}

export default App;
