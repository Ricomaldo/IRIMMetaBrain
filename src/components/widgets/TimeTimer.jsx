// TimeTimer.jsx - Composant timer visuel style TimeTimer
import React, { useState, useEffect, useRef, useCallback } from "react";
import PlayIcon from "../../assets/icons/play.svg";
import PauseIcon from "../../assets/icons/pause.svg";
import ResetIcon from "../../assets/icons/reset.svg";
import ReverseIcon from "../../assets/icons/reverse.svg";

// ========== Configuration ==========
const TIMER_COLORS = [
  "#8B3A3A", // Rouge Terre
  "#FFD700", // Or
  "#68752C", // Vert succès
  "#4A5568", // Gris froid
];

const MIN_SIZE = 150;
const MAX_MINUTES = 60;

/**
 * TimeTimer - Composant de minuterie visuelle
 * @param {string} diskColor - Couleur initiale du disque
 * @param {boolean} colorSelect - Affiche le sélecteur de couleurs
 * @param {number} maxSize - Taille maximale du composant
 */
export default function TimeTimer({
  diskColor = "#4A5568",
  colorSelect = false,
  maxSize = 400,
}) {
  // ========== États principaux ==========
  const [duration, setDuration] = useState(4 * 60);
  const [remaining, setRemaining] = useState(duration);
  const [running, setRunning] = useState(false);
  const [color, setColor] = useState(diskColor);
  const [startTime, setStartTime] = useState(null);
  const [clockwise, setClockwise] = useState(false);

  // ========== États de l'interface ==========
  const [isPaused, setIsPaused] = useState(false);
  const [showParti, setShowParti] = useState(false);
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
        const { width: parentWidth, height: parentHeight } =
          parent.getBoundingClientRect();

        // Calculer la taille disponible (prendre le minimum pour garder un carré)
        const availableSize = Math.min(
          parentWidth * 0.95,
          parentHeight * 0.95,
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
  const radius = diskSize / 2 - 20; // Réduit pour faire de la place aux nombres
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
    setShowParti(false);
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
    if (showParti) {
      return "C'est parti";
    }
    if (showReparti) {
      return "C'est reparti";
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
          setShowParti(true);
          setShowReparti(false);
          setTimeout(() => setShowParti(false), 2000);
        } else if (isPaused) {
          // Reprise après pause (on était en pause et on reprend)
          setShowReparti(true);
          setShowParti(false);
          setTimeout(() => setShowReparti(false), 2000);
        } else {
          // Premier démarrage ou après reset
          setShowParti(true);
          setShowReparti(false);
          setTimeout(() => setShowParti(false), 2000);
        }
        setIsPaused(false);
      } else {
        // Mise en pause
        setIsPaused(true);
        setShowParti(false);
        setShowReparti(false);
      }

      return newRunning;
    });
  }, [remaining, duration, isPaused]);

  const resetTimer = useCallback(() => {
    setRemaining(duration);
    setRunning(false);
    setStartTime(null);
    setIsPaused(false);
    setShowParti(false);
    setShowReparti(false);
  }, [duration]);

  const setPresetDuration = useCallback((minutes) => {
    const newDuration = minutes * 60;
    setDuration(newDuration);
  }, []);

  // ========== Styles dynamiques ==========
  const fontSize = {
    button: `${Math.max(11, Math.min(14, dimensions.size * 0.045))}px`,
    message: diskSize > 200 ? "18px" : diskSize > 150 ? "14px" : "12px",
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      gap: `${Math.max(4, dimensions.size * 0.015)}px`,
      padding: `${Math.max(8, dimensions.size * 0.03)}px`,
      backgroundColor: "#F7F4EF",
      borderRadius: "16px",
      border: "2px solid #A0522D",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      width: `${dimensions.size}px`,
      height: `${dimensions.size}px`,
      margin: "0 auto",
      boxSizing: "border-box",
      overflow: "hidden",
      position: "relative",
    },
    colorRow: {
      position: "absolute",
      right: `${Math.max(8, dimensions.size * 0.03)}px`,
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      gap: `${Math.max(4, dimensions.size * 0.02)}px`,
    },
    colorButton: {
      width: `${Math.max(18, dimensions.size * 0.07)}px`,
      height: `${Math.max(18, dimensions.size * 0.07)}px`,
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
      bottom: `${radius * 0.3}px`,
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: fontSize.message,
      fontWeight: "bold",
      fontFamily: "system-ui, sans-serif",
      textAlign: "center",
      textShadow: "0 1px 2px rgba(255,255,255,0.8)",
    },
    controlsRow: {
      display: "flex",
      gap: `${Math.max(4, dimensions.size * 0.02)}px`,
      flexWrap: "nowrap",
      justifyContent: "center",
      width: "100%",
      flexShrink: 0,
    },
    button: {
      backgroundColor: "#D2B48C",
      color: "#2F1B14",
      border: "none",
      padding: `${Math.max(4, dimensions.size * 0.02)}px ${Math.max(
        8,
        dimensions.size * 0.03
      )}px`,
      borderRadius: "6px",
      fontSize: fontSize.button,
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.18s ease",
      minWidth: `${Math.max(35, dimensions.size * 0.12)}px`,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonIcon: {
      width: `${Math.max(14, dimensions.size * 0.05)}px`,
      height: `${Math.max(14, dimensions.size * 0.05)}px`,
      filter: "brightness(0.2)",
    },
    reverseButton: {
      position: "absolute",
      left: `${Math.max(8, dimensions.size * 0.03)}px`,
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "opacity 0.2s ease",
    },
    reverseIcon: {
      width: `${Math.max(24, dimensions.size * 0.08)}px`,
      height: `${Math.max(24, dimensions.size * 0.08)}px`,
      filter: "brightness(0.4)",
      transition: "filter 0.2s ease",
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

            {/* Graduations des minutes */}
            {Array.from({ length: 60 }, (_, i) => {
              const angle = (i * 6) - 90; // 6 degrés par minute, -90 pour commencer en haut
              const isHour = i % 5 === 0; // Marque plus longue toutes les 5 minutes
              const tickLength = isHour ? radius * 0.08 : radius * 0.04;
              const innerRadius = radius - tickLength;

              const x1 = diskSize / 2 + innerRadius * Math.cos((angle * Math.PI) / 180);
              const y1 = diskSize / 2 + innerRadius * Math.sin((angle * Math.PI) / 180);
              const x2 = diskSize / 2 + radius * Math.cos((angle * Math.PI) / 180);
              const y2 = diskSize / 2 + radius * Math.sin((angle * Math.PI) / 180);

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#A0522D"
                  strokeWidth={isHour ? "1.5" : "0.8"}
                  opacity={isHour ? "0.6" : "0.3"}
                />
              );
            })}

            {/* Nombres des minutes */}
            {Array.from({ length: 12 }, (_, i) => {
              // Calcul des minutes selon le sens
              let minute;
              if (clockwise) {
                // Sens horaire (pie-chart à droite): 0, 55, 50, 45...
                minute = i === 0 ? 0 : 60 - (i * 5);
              } else {
                // Sens anti-horaire (pie-chart à gauche): 0, 5, 10, 15...
                minute = (i * 5) % 60;
              }

              const angle = (i * 30) - 90; // 30 degrés entre chaque nombre
              const numberRadius = radius + 12; // Position des nombres à l'extérieur

              const x = diskSize / 2 + numberRadius * Math.cos((angle * Math.PI) / 180);
              const y = diskSize / 2 + numberRadius * Math.sin((angle * Math.PI) / 180);

              return (
                <text
                  key={`num-${i}`}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#A0522D"
                  fontSize={`${Math.max(9, dimensions.size * 0.035)}px`}
                  fontWeight="500"
                  fontFamily="system-ui, sans-serif"
                  opacity="0.7"
                >
                  {minute}
                </text>
              );
            })}

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
                  d={
                    clockwise
                      ? `
                    M ${diskSize / 2} ${diskSize / 2}
                    L ${diskSize / 2} ${diskSize / 2 - radius}
                    A ${radius} ${radius} 0 ${progressAngle > 180 ? 1 : 0} 0
                      ${
                        diskSize / 2 -
                        radius * Math.sin((progressAngle * Math.PI) / 180)
                      }
                      ${
                        diskSize / 2 -
                        radius * Math.cos((progressAngle * Math.PI) / 180)
                      }
                    Z
                  `
                      : `
                    M ${diskSize / 2} ${diskSize / 2}
                    L ${diskSize / 2} ${diskSize / 2 - radius}
                    A ${radius} ${radius} 0 ${progressAngle > 180 ? 1 : 0} 1
                      ${
                        diskSize / 2 +
                        radius * Math.sin((progressAngle * Math.PI) / 180)
                      }
                      ${
                        diskSize / 2 -
                        radius * Math.cos((progressAngle * Math.PI) / 180)
                      }
                    Z
                  `
                  }
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

            {/* Disque central */}
            <circle
              cx={diskSize / 2}
              cy={diskSize / 2}
              r={radius * 0.15}
              fill="#A0522D"
            />
          </svg>

          {/* Messages */}
          {displayTime() && (
            <div style={{ ...styles.timeDisplay, color: color }}>
              {displayTime()}
            </div>
          )}
        </div>

        {/* Contrôles en bas */}
        <div style={styles.controlsRow}>
          <button
            style={{
              ...styles.button,
              backgroundColor: duration === 240 ? "#8B4513" : "#D2B48C",
            }}
            onClick={() => setPresetDuration(4)}
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
            onClick={() => setPresetDuration(20)}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            20m
          </button>

          <button
            style={styles.button}
            onClick={toggleRunning}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            <img
              src={running ? PauseIcon : PlayIcon}
              alt={running ? "Pause" : "Play"}
              style={styles.buttonIcon}
            />
          </button>

          <button
            style={styles.button}
            onClick={resetTimer}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            <img src={ResetIcon} alt="Reset" style={styles.buttonIcon} />
          </button>
        </div>

        {/* Bouton de sens sur la gauche */}
        <button
          style={styles.reverseButton}
          onClick={() => setClockwise(!clockwise)}
          onMouseEnter={(e) => {
            e.currentTarget.querySelector('img').style.filter = "brightness(0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelector('img').style.filter = "brightness(0.4)";
          }}
          title={
            clockwise ? "Passer en sens anti-horaire" : "Passer en sens horaire"
          }
        >
          <img
            src={ReverseIcon}
            alt="Inverser le sens"
            style={styles.reverseIcon}
          />
        </button>

        {/* Sélecteur de couleur sur la droite */}
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
                  (e.target.style.transform =
                    color === c ? "scale(1.2)" : "scale(1)")
                }
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
