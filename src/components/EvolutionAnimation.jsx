import { useState, useEffect, useRef } from 'react';

function EvolutionAnimation({ currentPokemon, evolutionData, onComplete }) {
  const [animationStage, setAnimationStage] = useState('starting');
  const [showCurrent, setShowCurrent] = useState(true);
  const [flashCount, setFlashCount] = useState(0);
  const [brightness, setBrightness] = useState(1);
  const completedRef = useRef(false);

  const baseUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  // Resetar a flag quando mudar o Pokémon
  useEffect(() => {
    completedRef.current = false;
    setAnimationStage('starting');
    setShowCurrent(true);
    setFlashCount(0);
    setBrightness(1);
  }, [currentPokemon.id]);

  // Stage 1: Mensagem inicial
  useEffect(() => {
    if (animationStage === 'starting') {
      const startTimer = setTimeout(() => {
        setAnimationStage('flashing');
      }, 1000);

      return () => clearTimeout(startTimer);
    }
  }, [animationStage, currentPokemon.id]);

  // Stage 2: Flashing
  useEffect(() => {
    if (animationStage === 'flashing' && flashCount < 15) {
      const flashTimer = setTimeout(() => {
        setShowCurrent(!showCurrent);
        setFlashCount((prev) => prev + 1);
      }, 150);

      return () => clearTimeout(flashTimer);
    } else if (animationStage === 'flashing' && flashCount >= 15) {
      setAnimationStage('transforming');
      setBrightness(5);
    }
  }, [animationStage, flashCount, showCurrent]);

  // Stage 3: Transform
  useEffect(() => {
    if (animationStage === 'transforming') {
      const transformTimer = setTimeout(() => {
        setAnimationStage('complete');
        setBrightness(1);
      }, 500);

      return () => clearTimeout(transformTimer);
    }
  }, [animationStage]);

  // Stage 4: Complete
  useEffect(() => {
    if (animationStage === 'complete' && !completedRef.current) {
      completedRef.current = true;

      const completeTimer = setTimeout(() => {
        onComplete();
      }, 2000);

      return () => clearTimeout(completeTimer);
    }
  }, [animationStage, onComplete]);

  const getCurrentSprite = () => {
    if (animationStage === 'complete' || animationStage === 'transforming') {
      return `${baseUrl}/${evolutionData.id}.png`;
    }

    if (animationStage === 'flashing') {
      return showCurrent
        ? `${baseUrl}/${currentPokemon.id}.png`
        : `${baseUrl}/${evolutionData.id}.png`;
    }

    return `${baseUrl}/${currentPokemon.id}.png`;
  };

  return (
    <div className="evolution-animation-container">
      <div className={`evolution-bg ${animationStage}`}></div>

      {animationStage !== 'starting' && (
        <>
          <div className="energy-circle circle-1"></div>
          <div className="energy-circle circle-2"></div>
          <div className="energy-circle circle-3"></div>
        </>
      )}

      <div className="evolution-sprite-wrapper">
        <img
          src={getCurrentSprite()}
          alt="Evolving"
          className={`evolution-sprite-animated stage-${animationStage}`}
          style={{
            filter: `brightness(${brightness}) sepia(${
              animationStage === 'transforming' ? 1 : 0
            }) saturate(2) contrast(1.2)`,
          }}
        />
      </div>

      {animationStage === 'starting' && (
        <div className="evolution-message start">
          QUE?
          <br />
          {currentPokemon.name}
          <br />
          ESTA EVOLUINDO!
        </div>
      )}

      {animationStage === 'complete' && (
        <div className="evolution-message complete">
          PARABENS!
          <br />
          {currentPokemon.name} EVOLUIU
          <br />
          PARA {evolutionData.name}!
        </div>
      )}

      {(animationStage === 'flashing' || animationStage === 'transforming') && (
        <div className="particles">
          <div className="particle p1"></div>
          <div className="particle p2"></div>
          <div className="particle p3"></div>
          <div className="particle p4"></div>
          <div className="particle p5"></div>
          <div className="particle p6"></div>
          <div className="particle p7"></div>
          <div className="particle p8"></div>
        </div>
      )}
    </div>
  );
}

export default EvolutionAnimation;
