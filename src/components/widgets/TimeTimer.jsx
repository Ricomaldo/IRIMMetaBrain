// TimeTimer.jsx - Composant timer visuel style TimeTimer
import React, { useState, useEffect, useRef, useCallback } from "react";

// ========== Configuration ==========
const TIMER_COLORS = [
  "#FF6B6B", // Rouge par défaut
  "#4A5568", // Gris froid
  "#68752C", // Vert succès
  "#8B3A3A", // Rouge danger
  "#FFD700", // Or
  "#B8860B", // Chaud
];

const MIN_SIZE = 200;
const MAX_MINUTES = 60;

/**
 * TimeTimer - Composant de minuterie visuelle
 * @param {string} diskColor - Couleur initiale du disque
 * @param {boolean} colorSelect - Affiche le sélecteur de couleurs
 * @param {number} maxSize - Taille maximale du composant
 */
export default function TimeTimer({
  diskColor = "#FF6B6B",
  colorSelect = false,
  maxSize = 400,
}) {
  // ========== États principaux ==========
  const [duration, setDuration] = useState(4 * 60);
  const [remaining, setRemaining] = useState(duration);
  const [running, setRunning] = useState(false);
  const [color, setColor] = useState(diskColor);
  const [startTime, setStartTime] = useState(null);

  // ========== États de l'interface ==========
  const [customMinutes, setCustomMinutes] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showReparti, setShowReparti] = useState(false);
  const [dimensions, setDimensions] = useState({ size: 300 });

  // ========== Refs ==========
  const intervalRef = useRef(null);
  const isMountedRef = useRef(true);
  const containerRef = useRef(null);

  // ========== Gestion du responsive ==========
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && containerRef.current.parentElement) {
        const parent = containerRef.current.parentElement;
        const { width: parentWidth, height: parentHeight } = parent.getBoundingClientRect();

        // Calculer la taille disponible (prendre le minimum pour garder un carré)
        const availableSize = Math.min(
          parentWidth - 40, // Padding du parent
          parentHeight - 40,
          maxSize
        );

        // Respecter les limites min/max
        const size = Math.max(MIN_SIZE, Math.min(availableSize, maxSize));
        setDimensions({ size });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }

    return () => {
      window.removeEventListener("resize", updateDimensions);
      resizeObserver.disconnect();
    };
  }, [maxSize]);

  // ========== Calculs SVG ==========
  const diskSize = dimensions.size * 0.75;
  const radius = diskSize / 2 - 10;
  const remainingInMinutes = remaining / 60;
  const progressAngle = (remainingInMinutes / MAX_MINUTES) * 360;

  // ========== Gestion du timer ==========
  const updateTimer = useCallback(() => {
    if (!isMountedRef.current || !running || !startTime) return;

    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    const newRemaining = Math.max(0, duration - elapsed);

    setRemaining(newRemaining);

    if (newRemaining > 0 && running) {
      intervalRef.current = requestAnimationFrame(updateTimer);
    } else {
      setRunning(false);
      setStartTime(null);
      if (newRemaining === 0) {
        console.log("⏰ Timer terminé!");
      }
    }
  }, [startTime, duration, running]);

  useEffect(() => {
    if (running && remaining > 0) {
      if (!startTime) {
        const now = Date.now();
        const alreadyElapsed = duration - remaining;
        setStartTime(now - alreadyElapsed * 1000);
      }
      intervalRef.current = requestAnimationFrame(updateTimer);
    } else {
      if (intervalRef.current) {
        cancelAnimationFrame(intervalRef.current);
        intervalRef.current = null;
      }
      if (!running) {
        setStartTime(null);
      }
    }

    return () => {
      if (intervalRef.current) {
        cancelAnimationFrame(intervalRef.current);
      }
    };
  }, [running, remaining, updateTimer, startTime, duration]);

  // Cleanup
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        cancelAnimationFrame(intervalRef.current);
      }
    };
  }, []);

  // Reset quand la durée change
  useEffect(() => {
    setRemaining(duration);
    setRunning(false);
    setStartTime(null);
    setIsPaused(false);
    setHasStarted(false);
    setShowReparti(false);
  }, [duration]);

  // ========== Fonctions utilitaires ==========
  const displayTime = () => {
    if (remaining === 0 && duration > 0) {
      return "C'est fini";
    }
    if (!running && isPaused) {
      return "Pause";
    }
    if (running) {
      if (showReparti) {
        return "C'est reparti";
      }
      if (!hasStarted || remaining >= duration - 2) {
        return "C'est parti";
      }
    }
    return "";
  };

  // ========== Contrôles ==========
  const toggleRunning = useCallback(() => {
    setRunning((prev) => {
      const newRunning = !prev;

      if (newRunning) {
        if (remaining === 0) {
          setRemaining(duration);
          setHasStarted(false);
          setIsPaused(false);
          setShowReparti(false);
        } else if (remaining === duration) {
          setHasStarted(true);
          setIsPaused(false);
          setShowReparti(false);
        } else {
          setIsPaused(false);
          setShowReparti(true);
          setTimeout(() => setShowReparti(false), 2000);
        }
      } else {
        setIsPaused(true);
        setShowReparti(false);
      }

      return newRunning;
    });
  }, [remaining, duration]);

  const resetTimer = useCallback(() => {
    setRemaining(duration);
    setRunning(false);
    setStartTime(null);
    setIsPaused(false);
    setHasStarted(false);
    setShowReparti(false);
  }, [duration]);

  const setPresetDuration = useCallback((minutes) => {
    const newDuration = minutes * 60;
    setDuration(newDuration);
  }, []);

  // ========== Styles dynamiques ==========
  const fontSize = {
    button: dimensions.size > 250 ? "14px" : "12px",
    message: diskSize > 200 ? "18px" : diskSize > 150 ? "14px" : "12px",
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
      padding: "16px",
      backgroundColor: "#F7F4EF",
      borderRadius: "16px",
      border: "2px solid #A0522D",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      width: `${dimensions.size}px`,
      height: `${dimensions.size}px`,
      margin: "0 auto",
      boxSizing: "border-box",
    },
    colorRow: {
      display: "flex",
      gap: "4px",
      flexWrap: "wrap",
      justifyContent: "center",
      flexShrink: 0,
    },
    colorButton: {
      width: dimensions.size > 250 ? "24px" : "20px",
      height: dimensions.size > 250 ? "24px" : "20px",
      borderRadius: "50%",
      border: "2px solid #A0522D",
      cursor: "pointer",
      transition: "transform 0.18s ease",
      flexShrink: 0,
    },
    timerWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: diskSize,
      height: diskSize,
      flex: "1 1 auto",
    },
    timeDisplay: {
      position: "absolute",
      fontSize: fontSize.message,
      fontWeight: "bold",
      fontFamily: "system-ui, sans-serif",
      textAlign: "center",
      textShadow: "0 1px 2px rgba(255,255,255,0.8)",
    },
    controlsRow: {
      display: "flex",
      gap: "6px",
      flexWrap: "nowrap",
      justifyContent: "center",
      width: "100%",
      flexShrink: 0,
    },
    button: {
      backgroundColor: "#D2B48C",
      color: "#2F1B14",
      border: "none",
      padding: dimensions.size > 250 ? "8px 12px" : "6px 10px",
      borderRadius: "6px",
      fontSize: fontSize.button,
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.18s ease",
      minWidth: dimensions.size > 250 ? "45px" : "40px",
      flexShrink: 0,
    },
  };

  // ========== Rendu ==========
  return (
    <>
      <style>{`
        input[type=text]::-webkit-outer-spin-button,
        input[type=text]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=text] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div ref={containerRef} style={styles.container}>
        {/* Contrôles en haut */}
        <div style={styles.controlsRow}>
          <button
            style={{
              ...styles.button,
              backgroundColor: duration === 240 ? "#8B4513" : "#D2B48C",
            }}
            onClick={() => {
              setPresetDuration(4);
              setShowCustomInput(false);
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            4m
          </button>

          <button
            style={{
              ...styles.button,
              backgroundColor: duration === 1200 ? "#8B4513" : "#D2B48C",
            }}
            onClick={() => {
              setPresetDuration(20);
              setShowCustomInput(false);
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            20m
          </button>

          {showCustomInput ? (
            <input
              type="text"
              placeholder=""
              value={customMinutes}
              onChange={(e) => {
                const input = e.target.value.replace(/[^0-9]/g, "");
                if (input === "") {
                  setCustomMinutes("");
                  setDuration(0);
                  setRemaining(0);
                } else {
                  const val = Math.min(60, Math.max(1, parseInt(input)));
                  setCustomMinutes(val);
                  setPresetDuration(val);
                }
              }}
              onBlur={() => setShowCustomInput(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                }
              }}
              style={{
                ...styles.button,
                backgroundColor: "#8B4513",
                width: dimensions.size > 250 ? "50px" : "45px",
                textAlign: "center",
                outline: "none",
              }}
              autoFocus
            />
          ) : (
            <button
              style={{
                ...styles.button,
                backgroundColor: duration !== 240 && duration !== 1200 ? "#8B4513" : "#D2B48C",
                minWidth: dimensions.size > 250 ? "50px" : "45px",
              }}
              onClick={() => {
                setShowCustomInput(true);
                setCustomMinutes("");
                setDuration(0);
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              {duration !== 240 && duration !== 1200 && duration > 0
                ? `${Math.floor(duration / 60)}m`
                : ""}
            </button>
          )}

          <button
            style={styles.button}
            onClick={toggleRunning}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            {running ? "⏸" : "▶️"}
          </button>

          <button
            style={styles.button}
            onClick={resetTimer}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            🔄
          </button>
        </div>

        {/* Timer SVG */}
        <div style={styles.timerWrapper}>
          <svg width={diskSize} height={diskSize}>
            {/* Fond blanc */}
            <circle
              cx={diskSize / 2}
              cy={diskSize / 2}
              r={radius}
              stroke="#E8E2D6"
              strokeWidth="2"
              fill="white"
            />

            {/* Disque coloré */}
            {remaining > 0 &&
              (progressAngle >= 359.9 ? (
                <circle
                  cx={diskSize / 2}
                  cy={diskSize / 2}
                  r={radius}
                  fill={color}
                  opacity="0.9"
                />
              ) : (
                <path
                  d={`
                    M ${diskSize / 2} ${diskSize / 2}
                    L ${diskSize / 2} ${diskSize / 2 - radius}
                    A ${radius} ${radius} 0 ${progressAngle > 180 ? 1 : 0} 1
                      ${diskSize / 2 + radius * Math.sin((progressAngle * Math.PI) / 180)}
                      ${diskSize / 2 - radius * Math.cos((progressAngle * Math.PI) / 180)}
                    Z
                  `}
                  fill={color}
                  opacity="0.9"
                />
              ))}

            {/* Bordure */}
            <circle
              cx={diskSize / 2}
              cy={diskSize / 2}
              r={radius}
              stroke="#A0522D"
              strokeWidth="3"
              fill="none"
            />
          </svg>

          {/* Messages */}
          {displayTime() && (
            <div style={{ ...styles.timeDisplay, color: color }}>
              {displayTime()}
            </div>
          )}
        </div>

        {/* Sélecteur de couleur en bas */}
        {colorSelect && (
          <div style={styles.colorRow}>
            {TIMER_COLORS.map((c) => (
              <button
                key={c}
                style={{
                  ...styles.colorButton,
                  backgroundColor: c,
                  transform: color === c ? "scale(1.2)" : "scale(1)",
                }}
                onClick={() => setColor(c)}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.15)")}
                onMouseLeave={(e) =>
                  (e.target.style.transform = color === c ? "scale(1.2)" : "scale(1)")
                }
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}