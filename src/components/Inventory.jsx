function Inventory({ items, maxSlots = 15, onBack, selectedSlot = 0 }) {
  const slots = Array(maxSlots - 1).fill(null);

  items.forEach((item, index) => {
    if (index < maxSlots - 1) {
      slots[index] = item;
    }
  });

  return (
    <>
      <div className="inventory-header">BAG</div>

      <div className="inventory-grid">
        {/* Primeiro slot - BACK */}
        <div
          className={`inventory-slot back-button ${
            selectedSlot === 0 ? 'selected' : ''
          }`}
          onClick={onBack}
        >
          <div className="item-icon">◀</div>
          <div className="back-text">BACK</div>
        </div>

        {/* Demais slots com itens */}
        {slots.map((item, index) => (
          <div
            key={index}
            className={`inventory-slot ${
              selectedSlot === index + 1 ? 'selected' : ''
            }`}
          >
            {item ? (
              <>
                <div className="item-icon">{item.icon}</div>
                <div className="item-quantity">{item.quantity}</div>
              </>
            ) : (
              <div className="empty-slot">-</div>
            )}
          </div>
        ))}
      </div>

      <div className="inventory-footer">
        {items.length}/{maxSlots - 1} ITEMS • USE: ●
      </div>
    </>
  );
}

export default Inventory;
