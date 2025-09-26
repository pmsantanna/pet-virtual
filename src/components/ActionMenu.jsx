function ActionMenu({ actions, selectedAction }) {
  return (
    <>
      <div className="menu-header">CHOOSE ACTION</div>

      <div className="carousel">
        <div className="carousel-prev">
          {actions[(selectedAction - 1 + actions.length) % actions.length].icon}
        </div>

        <div className="carousel-current">
          <div className="action-icon">{actions[selectedAction].icon}</div>
          <div className="action-desc">{actions[selectedAction].desc}</div>
        </div>

        <div className="carousel-next">
          {actions[(selectedAction + 1) % actions.length].icon}
        </div>
      </div>

      <div className="menu-controls">◀ SELECT ● CONFIRM ▶</div>
    </>
  );
}

export default ActionMenu;
