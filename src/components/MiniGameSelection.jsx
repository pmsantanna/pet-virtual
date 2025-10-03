function MiniGameSelection({ selectedGame, games }) {
  return (
    <>
      <div className="minigame-selection-header">MINI GAMES</div>

      <div className="minigame-list">
        {games.map((game, index) => (
          <div
            key={index}
            className={`minigame-item ${
              selectedGame === index ? 'selected' : ''
            }`}
          >
            <div className="minigame-icon">{game.icon}</div>
            <div className="minigame-info">
              <div className="minigame-name">{game.name}</div>
              <div className="minigame-desc">{game.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="minigame-selection-footer">◀ UP • ▶ DOWN • ● START</div>
    </>
  );
}

export default MiniGameSelection;
