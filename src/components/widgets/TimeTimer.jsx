// TimeTimer.jsx - Composant timer visuel style TimeTimer
import React, { useState, useEffect, useRef, useCallback } from "react";

// Configuration des couleurs disponibles
const TIMER_COLORS = [
  "#FF6B6B", // Rouge par défaut
  "#4A5568", // Gris froid
  "#68752C", // Vert succès
  "#8B3A3A", // Rouge danger
  "#FFD700", // Or
  "#B8860B", // Chaud
];

/**
 * TimeTimer - Composant de minuterie visuelle
 * @param {string} diskColor - Couleur initiale du disque
 * @param {boolean} colorSelect - Affiche le sélecteur de couleurs
 * @param {number} maxSize - Taille maximale du conteneur
 */
export default function TimeTimer({
  diskColor = "#FF6B6B",
  colorSelect = false,
  maxSize = 400,
}) {
  // États principaux
  const [duration, setDuration] = useState(4 * 60); // Durée en secondes
  const [remaining, setRemaining] = useState(duration); // Temps restant
  const [running, setRunning] = useState(false); // État de lecture
  const [color, setColor] = useState(diskColor); // Couleur du disque

  // États de l'interface
  const [customMinutes, setCustomMinutes] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  // États pour les messages
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showReparti, setShowReparti] = useState(false);

  // Refs
  const [startTime, setStartTime] = useState(null);
  const intervalRef = useRef(null);
  const isMountedRef = useRef(true);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState(200);

  // Constantes
  const minSize = 100;
  const MAX_MINUTES = 60;

  // ========== Gestion du responsive ==========
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        // Le disque fait 80% de la largeur du conteneur
        const availableWidth = Math.min(width * 0.8, maxSize * 0.8);
        const newSize = Math.max(minSize, availableWidth);
        setContainerSize(newSize);
      }
    };

    setTimeout(updateSize, 0);
    window.addEventListener("resize", updateSize);

    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateSize);
      resizeObserver.disconnect();
    };
  }, [maxSize]);

  // ========== Calculs SVG ==========
  const size = containerSize;
  const radius = size / 2 - 10;
  const durationInMinutes = duration / 60;
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

  // Cleanup on unmount
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
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

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
          // Redémarrage après fin
          setRemaining(duration);
          setHasStarted(false);
          setIsPaused(false);
          setShowReparti(false);
        } else if (remaining === duration) {
          // Premier démarrage
          setHasStarted(true);
          setIsPaused(false);
          setShowReparti(false);
        } else {
          // Reprise après pause
          setIsPaused(false);
          setShowReparti(true);
          setTimeout(() => setShowReparti(false), 2000);
        }
      } else {
        // Mise en pause
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

  // ========== Styles ==========
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      padding: "20px",
      backgroundColor: "#F7F4EF",
      borderRadius: "16px",
      border: "2px solid #A0522D",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      width: "100%",
      maxWidth: `${maxSize}px`,
      margin: "0 auto",
      boxSizing: "border-box",
      minHeight: "320px",
    },
    timerWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      margin: "10px 0",
    },
    timeDisplay: {
      position: "absolute",
      fontSize: size > 250 ? "20px" : size > 150 ? "16px" : "12px",
      fontWeight: "bold",
      fontFamily: "system-ui, sans-serif",
      textAlign: "center",
      textShadow: "0 1px 2px rgba(255,255,255,0.8)",
    },
    controlsRow: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      justifyContent: "center",
      width: "100%",
    },
    button: {
      backgroundColor: "#D2B48C",
      color: "#2F1B14",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.18s ease",
      minWidth: "45px",
    },
    colorRow: {
      display: "flex",
      gap: "6px",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    colorButton: {
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      border: "2px solid #A0522D",
      cursor: "pointer",
      transition: "transform 0.18s ease",
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
        {/* Sélecteur de couleur */}
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

        {/* Timer SVG */}
        <div style={styles.timerWrapper}>
          <svg width={size} height={size}>
            {/* Fond blanc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#E8E2D6"
              strokeWidth="2"
              fill="white"
            />

            {/* Disque coloré */}
            {remaining > 0 &&
              (progressAngle >= 359.9 ? (
                // Cercle complet pour 60 minutes
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill={color}
                  opacity="0.9"
                />
              ) : (
                // Secteur de cercle pour durée partielle
                <path
                  d={`
                    M ${size / 2} ${size / 2}
                    L ${size / 2} ${size / 2 - radius}
                    A ${radius} ${radius} 0 ${progressAngle > 180 ? 1 : 0} 1
                      ${size / 2 + radius * Math.sin((progressAngle * Math.PI) / 180)}
                      ${size / 2 - radius * Math.cos((progressAngle * Math.PI) / 180)}
                    Z
                  `}
                  fill={color}
                  opacity="0.9"
                />
              ))}

            {/* Bordure */}
            <circle
              cx={size / 2}
              cy={size / 2}
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

        {/* Contrôles */}
        <div style={styles.controlsRow}>
          {/* Boutons de durée */}
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

          {/* Input personnalisé ou bouton vide */}
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
              onBlur={() => {
                if (customMinutes === "") {
                  setShowCustomInput(false);
                } else {
                  setShowCustomInput(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                }
              }}
              style={{
                ...styles.button,
                backgroundColor: "#8B4513",
                width: "50px",
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
                minWidth: "50px",
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

          {/* Contrôles de lecture */}
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
      </div>
    </>
  );
}