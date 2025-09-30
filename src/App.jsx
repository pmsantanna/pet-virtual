import { useState, useEffect } from 'react';
import './App.css';
import PokemonSelection from './components/PokemonSelection';
import PetScreen from './components/PetScreen';
import ActionMenu from './components/ActionMenu';
import GameOverScreen from './components/GameOverScreen';
import ExpBar from './components/ExpBar';
import EvolutionScreen from './components/EvolutionScreen';
import EvolutionAnimation from './components/EvolutionAnimation';

function App() {
  // Tela de seleção
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showEvolutionAnimation, setShowEvolutionAnimation] = useState(false);

  // Lista de Pokémon disponíveis
  const availablePokemon = [
    { id: 25, name: 'PIKACHU' },
    { id: 4, name: 'CHARMANDER' },
    { id: 1, name: 'BULBASAUR' },
    { id: 7, name: 'SQUIRTLE' },
    { id: 133, name: 'EEVEE' },
    { id: 39, name: 'JIGGLYPUFF' },
  ];

  const evolutionMap = {
    25: { id: 26, name: 'RAICHU' },
    4: { id: 5, name: 'CHARMELEON' },
    5: { id: 6, name: 'CHARIZARD' },
    1: { id: 2, name: 'IVYSAUR' },
    2: { id: 3, name: 'VENUSAUR' },
    7: { id: 8, name: 'WARTORTLE' },
    8: { id: 9, name: 'BLASTOISE' },
    133: { id: 134, name: 'VAPOREON' },
    39: { id: 40, name: 'WIGGLYTUFF' },
  };

  const [petName, setPetName] = useState('PIKACHU');
  const [petId, setPetId] = useState(25);
  const [petHunger, setPetHunger] = useState(80);
  const [petHappiness, setPetHappiness] = useState(70);
  const [petEnergy, setPetEnergy] = useState(60);
  const [petHealth, setPetHealth] = useState(90);
  const [petMessage, setPetMessage] = useState('PIKA PIKA!');
  const [petAge, setPetAge] = useState(0);
  const [petLevel, setPetLevel] = useState(1);
  const [petExp, setPetExp] = useState(0);
  const [expToNextLevel, setExpToNextLevel] = useState(100);
  const [isBattling, setIsBattling] = useState(false);
  const [isEvolving, setIsEvolving] = useState(false);
  const [canEvolve, setCanEvolve] = useState(false);

  const [currentScreen, setCurrentScreen] = useState('pet');
  const [selectedAction, setSelectedAction] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showEmote, setShowEmote] = useState(false);
  const [currentEmote, setCurrentEmote] = useState('happy');

  const getActions = () => {
    const baseActions = [
      { name: 'FEED', icon: '🍎', desc: 'BERRIES' },
      { name: 'PLAY', icon: '⚡', desc: 'BATTLE' },
      { name: 'SLEEP', icon: '💤', desc: 'REST' },
      { name: 'MEDICINE', icon: '💊', desc: 'POTION' },
    ];

    if (canEvolve) {
      baseActions.push({ name: 'EVOLVE', icon: '🔄', desc: 'EVOLVE' });
    }

    return baseActions;
  };

  const getPetSprite = () => {
    const baseUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

    if (petHealth <= 0) return `${baseUrl}/back/${petId}.png`;
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

  // Verifica se pode evoluir
  useEffect(() => {
    const hasEvolution = evolutionMap[petId] !== undefined;
    const hasLevel = petLevel >= 1;
    setCanEvolve(hasEvolution && hasLevel);
  }, [petLevel, petId]);

  // Sistema de EXP
  useEffect(() => {
    if (!gameStarted) return;

    const expInterval = setInterval(() => {
      setPetExp((prev) => {
        const newExp = prev + 2;

        if (newExp >= expToNextLevel) {
          const overflow = newExp - expToNextLevel;
          setPetLevel((prevLevel) => prevLevel + 1);
          setExpToNextLevel((prevExp) => Math.floor(prevExp * 1.5));
          showTemporaryMessage('LEVEL UP!', 3000);
          showEmoteReaction('excited', 3000);
          return overflow;
        }

        return newExp;
      });
    }, 10000);

    return () => clearInterval(expInterval);
  }, [gameStarted, expToNextLevel]);

  // Sistema de tempo - decay automático com idade
  useEffect(() => {
    if (!gameStarted) return;

    let ticks = 0;

    const timeInterval = setInterval(() => {
      ticks++;

      if (ticks % 10 === 0) {
        setPetAge((prev) => prev + 1);
      }

      setPetHunger((prev) => Math.max(0, prev - 2));
      setPetHappiness((prev) => Math.max(0, prev - 1));
      setPetEnergy((prev) => Math.max(0, prev - 1.5));

      setPetHealth((prev) => {
        if (petHunger < 20 || petHappiness < 20) {
          return Math.max(0, prev - 1);
        }
        return prev;
      });
    }, 5000);

    return () => clearInterval(timeInterval);
  }, [gameStarted, petHunger, petHappiness]);

  // Sistema de morte
  useEffect(() => {
    if (!gameStarted || showGameOver) return;

    if (petHealth <= 0) {
      showTemporaryMessage('DESMAIOU!', 3000);
      showEmoteReaction('sad', 3000);

      const gameOverTimer = setTimeout(() => {
        setShowGameOver(true);
      }, 3000);

      return () => clearTimeout(gameOverTimer);
    }
  }, [petHealth, gameStarted, showGameOver]);

  const revivePet = () => {
    setPetHealth(60);
    setPetHunger(70);
    setPetHappiness(70);
    setPetEnergy(70);
    setShowGameOver(false);
    showTemporaryMessage('REVIVEU!', 2000);
    showEmoteReaction('happy', 2000);
  };

  const startNewGame = () => {
    setShowGameOver(false);
    setGameStarted(false);
    setPetHealth(90);
    setPetHunger(80);
    setPetHappiness(70);
    setPetEnergy(60);
    setPetAge(0);
    setPetLevel(1);
    setPetExp(0);
    setExpToNextLevel(100);
  };

  const actions = getActions();

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

        setIsBattling(true);
        showTemporaryMessage('BATALHA!', 2000);

        setTimeout(() => {
          const battleResult = Math.random() < 0.8;

          if (battleResult) {
            const expGained = Math.floor(15 + Math.random() * 10);

            setPetExp((prev) => {
              const newExp = prev + expGained;

              if (newExp >= expToNextLevel) {
                const overflow = newExp - expToNextLevel;
                setPetLevel((prevLevel) => prevLevel + 1);
                setExpToNextLevel((prevExp) => Math.floor(prevExp * 1.5));
                showTemporaryMessage(
                  `VITORIA! +${expGained}EXP! LEVEL UP!`,
                  4000,
                );
                showEmoteReaction('excited', 4000);
                return overflow;
              }

              showTemporaryMessage(`VITORIA! +${expGained}EXP!`, 3000);
              showEmoteReaction('excited', 3000);
              return newExp;
            });

            setPetHappiness(Math.min(100, petHappiness + 30));
            setPetEnergy(Math.max(0, petEnergy - 10));
          } else {
            showTemporaryMessage('PERDEU...', 3000);
            showEmoteReaction('sad', 3000);
            setPetHappiness(Math.max(0, petHappiness - 15));
            setPetEnergy(Math.max(0, petEnergy - 15));
            setPetHealth(Math.max(0, petHealth - 10));
          }

          setIsBattling(false);
        }, 2500);
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

      case 'EVOLVE':
        if (canEvolve) {
          setIsEvolving(true);
        }
        break;
    }

    setCurrentScreen('pet');
  };

  const confirmEvolution = () => {
    const evolution = evolutionMap[petId];

    if (evolution) {
      setIsEvolving(false);
      setShowEvolutionAnimation(true);
    }
  };

  const handleEvolutionComplete = () => {
    const evolution = evolutionMap[petId];

    if (evolution) {
      // Atualiza os dados do Pokémon
      setPetId(evolution.id);
      setPetName(evolution.name);
      setPetHealth(100);
      setPetHappiness(100);
      setPetEnergy(100);
      setPetHunger(100);
      setCanEvolve(false);

      // Desliga as telas de evolução
      setShowEvolutionAnimation(false);
      setIsEvolving(false);
      setCurrentScreen('pet');
    }
  };

  const cancelEvolution = () => {
    setIsEvolving(false);
    setCurrentScreen('pet');
    showTemporaryMessage('CANCELADO', 2000);
  };

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

        <div className="lcd-screen">
          <div className="screen-content">
            {showEvolutionAnimation ? (
              <EvolutionAnimation
                currentPokemon={{ id: petId, name: petName }}
                evolutionData={evolutionMap[petId]}
                onComplete={handleEvolutionComplete}
              />
            ) : isEvolving ? (
              <EvolutionScreen
                currentPokemon={{ id: petId, name: petName }}
                evolutionData={evolutionMap[petId]}
              />
            ) : showGameOver ? (
              <GameOverScreen petName={petName} petSprite={getPetSprite()} />
            ) : !gameStarted ? (
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
                petAge={petAge}
                petSprite={getPetSprite()}
                showMessage={showMessage}
                petMessage={petMessage}
                petHealth={petHealth}
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

          {gameStarted &&
            !showGameOver &&
            !isEvolving &&
            !showEvolutionAnimation && (
              <ExpBar
                level={petLevel}
                exp={petExp}
                expToNext={expToNextLevel}
              />
            )}
        </div>

        <div className="button-container">
          {isEvolving ? (
            <>
              <button className="btn btn-left" onClick={confirmEvolution}>
                ◀
              </button>
              <button
                className="btn btn-center"
                disabled
                style={{ opacity: 0.3, cursor: 'not-allowed' }}
              >
                ●
              </button>
              <button className="btn btn-right" onClick={cancelEvolution}>
                ▶
              </button>
            </>
          ) : showGameOver ? (
            <>
              <button className="btn btn-left" onClick={revivePet}>
                ◀
              </button>
              <button
                className="btn btn-center"
                disabled
                style={{ opacity: 0.3, cursor: 'not-allowed' }}
              >
                ●
              </button>
              <button className="btn btn-right" onClick={startNewGame}>
                ▶
              </button>
            </>
          ) : !gameStarted ? (
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
