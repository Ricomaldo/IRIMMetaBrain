// SANDBOX - Page de test pour les composants isolés
import React from 'react';
import SystemOverview from './dev/SystemOverview/SystemOverview';

const Sandbox = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: '#1a1a2e',
      padding: '20px',
      boxSizing: 'border-box',
      overflow: 'auto'
    }}>
      <h1 style={{
        color: '#ffd700',
        textAlign: 'center',
        marginBottom: '20px',
        fontFamily: 'system-ui, sans-serif'
      }}>
        🧪 SANDBOX - Test SystemOverview (Vanilla)
      </h1>

      {/* Conteneur simple pour le composant */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid rgba(255, 215, 0, 0.3)'
      }}>
        <SystemOverview />
      </div>

      {/* Info debug */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#ffd700',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        URL: /sandbox
      </div>
    </div>
  );
};

export default Sandbox;