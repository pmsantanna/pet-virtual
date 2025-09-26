function PokemonSelection({
  availablePokemon,
  selectedPokemon,
  onPrev,
  onNext,
  onConfirm,
}) {
  return (
    <>
      <div className="selection-header">ESCOLHA SEU POKEMON</div>

      <div className="pokemon-preview">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${availablePokemon[selectedPokemon].id}.png`}
          alt={availablePokemon[selectedPokemon].name}
          className="preview-sprite"
        />
      </div>

      <div className="selection-name">
        {availablePokemon[selectedPokemon].name}
      </div>

      <div className="selection-help">◀ PREV • START • NEXT ▶</div>
    </>
  );
}

export default PokemonSelection;
