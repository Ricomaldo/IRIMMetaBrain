import React, { useState } from 'react';

// Composant ScreenTV prêt pour Panel + PanelContext
const ScreenTVContent = ({
  screenshots = [],
  onUpload,
  onNavigate
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % screenshots.length;
    setCurrentIndex(newIndex);
    onNavigate && onNavigate(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
    setCurrentIndex(newIndex);
    onNavigate && onNavigate(newIndex);
  };

  return (
    <div style={{
      padding: '8px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {screenshots.length === 0 ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📺</div>
          <p style={{ fontSize: '12px', textAlign: 'center', marginBottom: '12px' }}>
            Télé vintage - Ajoutez vos screenshots
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onUpload}
            style={{ fontSize: '10px' }}
          />
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            flex: 1,
            background: '#000',
            borderRadius: '8px',
            position: 'relative',
            overflow: 'hidden',
            maxHeight: '200px'
          }}>
            <img
              src={screenshots[currentIndex]?.url}
              alt={screenshots[currentIndex]?.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
            {screenshots.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  style={{
                    position: 'absolute',
                    left: '4px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer'
                  }}
                >
                  ◀
                </button>
                <button
                  onClick={nextImage}
                  style={{
                    position: 'absolute',
                    right: '4px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer'
                  }}
                >
                  ▶
                </button>
              </>
            )}
          </div>
          <div style={{
            padding: '4px',
            fontSize: '10px',
            textAlign: 'center'
          }}>
            {currentIndex + 1} / {screenshots.length}
          </div>
        </div>
      )}
    </div>
  );
};

// Usage avec Panel :
// <Panel
//   contentType="screentv"
//   gridColumn="1/3" gridRow="4/6"
//   title="ScreenTV" icon="📺"
//   texture="metal" accentColor={cold}
//   collapsed={state} onToggleCollapse={save}
//   badge={screenshots.length}
// >
//   <ScreenTVContent
//     screenshots={screenshots}
//     onUpload={handleUpload}
//     onNavigate={setCurrentIndex}
//   />
// </Panel>

const ScreenTV = ScreenTVContent;

export default ScreenTV;