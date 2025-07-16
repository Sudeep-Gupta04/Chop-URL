import React from 'react';

function Loader() {
  const styles = {
    loaderContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    
    loaderContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    },
    
    spinner: {
      width: '50px',
      height: '50px',
      border: '4px solid rgba(101, 93, 241, 0.2)',
      borderTop: '4px solid #655DF1',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    
    dots: {
      display: 'flex',
      gap: '8px',
    },
    
    dot: {
      width: '12px',
      height: '12px',
      background: '#655DF1',
      borderRadius: '50%',
      animation: 'bounce 1.4s ease-in-out infinite',
    },
    
    loadingText: {
      color: '#655DF1',
      fontSize: '16px',
      fontWeight: '500',
    },
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
            opacity: 0.5;
          } 
          40% { 
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
      
      <div style={styles.loaderContainer}>
        <div style={styles.loaderContent}>
          {/* Spinning circle */}
          <div style={styles.spinner}></div>
          
          {/* Loading text */}
          <div style={styles.loadingText}>Loading...</div>
        </div>
      </div>
    </>
  );
}

export default Loader;