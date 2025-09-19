// src/components/room-modules/laboratoire/ComponentToTest.jsx
// 🧪 COMPOSANT DE TEST - TimeTimer

import TimeTimer from "../../widgets/TimeTimer";

/**
 * Composant de test pour le laboratoire - TimeTimer
 * @renders TimeTimer
 */
const ComponentToTest = () => {
  return (
    <div style={{ width: "100%", padding: "20px", boxSizing: "border-box" }}>
      <TimeTimer diskColor="#FF6B6B" colorSelect={true} maxSize={350} />
    </div>
  );
};

export default ComponentToTest;
