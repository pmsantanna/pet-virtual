function GameOverScreen({ petName, petSprite }) {
  return (
    <>
      <div className="gameover-header">GAME OVER</div>

      <div className="pokemon-preview gameover">
        <img src={petSprite} alt={petName} className="preview-sprite fainted" />
      </div>

      <div className="gameover-name">{petName} DESMAIOU!</div>

      <div className="gameover-options">
        <div className="gameover-option">◀ REVIVER</div>
        <div className="gameover-option">NOVO PET ▶</div>
      </div>
    </>
  );
}

export default GameOverScreen;
