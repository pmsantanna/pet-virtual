function PetScreen({
  petName,
  petSprite,
  showMessage,
  petMessage,
  petHunger,
  petHappiness,
  petEnergy,
  petAge,
  petHealth,
  showEmote,
  currentEmote,
}) {
  return (
    <>
      <div className="pet-name">
        {petName} • {petAge}D
      </div>

      <div className="pet-sprite">
        <img src={petSprite} alt={petName} className="pokemon-image" />

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

      {showMessage && <div className="pet-message fade-in">{petMessage}</div>}

      <div className="status-bars">
        <div className="status-bar">
          <span>HP</span>
          <div className="bar">
            <div
              className="bar-fill"
              style={{
                width: `${petHealth}%`,
                backgroundColor: petHealth > 50 ? '#7bed9f' : '#ff6b6b',
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
                backgroundColor: petHappiness > 50 ? '#7bed9f' : '#ff6b6b',
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
                backgroundColor: petEnergy > 50 ? '#7bed9f' : '#ff6b6b',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PetScreen;
