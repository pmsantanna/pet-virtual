function ExpBar({ level, exp, expToNext }) {
  const percentage = (exp / expToNext) * 100;

  return (
    <div className="exp-bar-container">
      <div className="exp-level">
        <span className="level-label">LV</span>
        <span className="level-number">{level}</span>
      </div>

      <div className="exp-bar-wrapper">
        <div className="exp-bar">
          <div className="exp-bar-fill" style={{ height: `${percentage}%` }} />
        </div>

        <div className="exp-text">
          <span className="exp-label">EXP</span>
          <span className="exp-value">
            {exp}/{expToNext}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ExpBar;
