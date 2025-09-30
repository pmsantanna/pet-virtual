function EvolutionScreen({ currentPokemon, evolutionData }) {
  const baseUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  return (
    <>
      <div className="evolution-header">EVOLUCAO</div>

      <div className="evolution-sprites">
        <div className="evolution-sprite-container">
          <img
            src={`${baseUrl}/${currentPokemon.id}.png`}
            alt={currentPokemon.name}
            className="evolution-sprite"
          />
          <div className="evolution-name-small">{currentPokemon.name}</div>
        </div>

        <div className="evolution-arrow">→</div>

        <div className="evolution-sprite-container">
          <img
            src={`${baseUrl}/${evolutionData.id}.png`}
            alt={evolutionData.name}
            className="evolution-sprite evolution-new"
          />
          <div className="evolution-name-small">{evolutionData.name}</div>
        </div>
      </div>

      <div className="evolution-question">EVOLUIR?</div>

      <div className="evolution-options">
        <div className="evolution-option">◀ SIM</div>
        <div className="evolution-option">NAO ▶</div>
      </div>
    </>
  );
}

export default EvolutionScreen;
