// src/components/room-modules/laboratoire/ComponentToTest.jsx
// 🧪 COMPOSANT DE TEST - TimeTimer

import TimeTimer from "../../widgets/TimeTimer";

/**
 * Composant de test pour le laboratoire - TimeTimer
 * @renders TimeTimer
 */
const ComponentToTest = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      padding: "20px",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <TimeTimer diskColor="#4A5568" colorSelect={true} maxSize={400} />
    </div>
  );
};

export default ComponentToTest;
