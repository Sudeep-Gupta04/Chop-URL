import React, { useState, useEffect } from 'react';

function ErrorPage({ message = "Something went wrong", errorCode = "500" }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #655DF1 50%, #1e293b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    },
    
    backgroundParticles: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
    },
    
    particle: {
      position: 'absolute',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      animation: 'float 6s ease-in-out infinite',
    },
    
    glowOrb1: {
      position: 'absolute',
      top: '25%',
      left: '33%',
      width: '400px',
      height: '400px',
      background: '#655DF1',
      borderRadius: '50%',
      filter: 'blur(60px)',
      opacity: 0.2,
      animation: 'pulse 4s ease-in-out infinite',
      zIndex: 1,
    },
    
    glowOrb2: {
      position: 'absolute',
      top: '33%',
      right: '33%',
      width: '400px',
      height: '400px',
      background: '#8B7CF6',
      borderRadius: '50%',
      filter: 'blur(60px)',
      opacity: 0.2,
      animation: 'pulse 4s ease-in-out infinite',
      animationDelay: '1s',
      zIndex: 1,
    },
    
    content: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      maxWidth: '600px',
      width: '100%',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 1s ease-out',
    },
    
    errorIcon: {
      marginBottom: '30px',
      position: 'relative',
    },
    
    errorIconGlow: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '120px',
      height: '120px',
      background: '#655DF1',
      borderRadius: '50%',
      filter: 'blur(30px)',
      opacity: 0.3,
      animation: 'pulse 2s ease-in-out infinite',
    },
    
    errorIconSvg: {
      position: 'relative',
      width: '80px',
      height: '80px',
      animation: 'bounce 2s ease-in-out infinite',
    },
    
    errorCode: {
      fontSize: '6rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #655DF1, #8B7CF6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '20px',
      animation: 'pulse 2s ease-in-out infinite',
    },
    
    errorTitle: {
      fontSize: '2.5rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '15px',
    },
    
    errorMessage: {
      fontSize: '1.2rem',
      color: '#d1d5db',
      marginBottom: '10px',
      maxWidth: '400px',
      margin: '0 auto 10px',
      lineHeight: '1.6',
    },
    
    errorSubtext: {
      fontSize: '0.9rem',
      color: '#9ca3af',
      marginBottom: '40px',
    },
    
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      alignItems: 'center',
    },
    
    primaryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 32px',
      background: 'linear-gradient(45deg, #655DF1, #8B7CF6)',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(101, 93, 241, 0.3)',
    },
    
    secondaryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 32px',
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      border: '1px solid rgba(101, 93, 241, 0.3)',
      borderRadius: '50px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
    },
    
    outlineButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 32px',
      background: 'transparent',
      color: '#d1d5db',
      border: '1px solid #655DF1',
      borderRadius: '50px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    
    decorativeDots: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '40px',
    },
    
    dot: {
      width: '12px',
      height: '12px',
      background: 'rgba(101, 93, 241, 0.6)',
      borderRadius: '50%',
      animation: 'bounce 1.5s ease-in-out infinite',
    },
  };

  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    style: {
      ...styles.particle,
      width: `${Math.random() * 6 + 3}px`,
      height: `${Math.random() * 6 + 3}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
    }
  }));

  const handleButtonHover = (e, hoverStyle) => {
    Object.assign(e.target.style, hoverStyle);
  };

  const handleButtonLeave = (e, originalStyle) => {
    Object.assign(e.target.style, originalStyle);
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @media (min-width: 640px) {
          .button-container {
            flex-direction: row;
          }
        }
      `}</style>
      
      <div style={styles.container}>
        {/* Background particles */}
        <div style={styles.backgroundParticles}>
          {particles.map((particle) => (
            <div key={particle.id} style={particle.style} />
          ))}
        </div>

        {/* Glowing orbs */}
        <div style={styles.glowOrb1} />
        <div style={styles.glowOrb2} />

        <div style={styles.content}>
          {/* Error icon */}
          <div style={styles.errorIcon}>
            <div style={styles.errorIconGlow} />
            <svg style={styles.errorIconSvg} fill="#655DF1" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
            </svg>
          </div>

          {/* Error code */}
          <h1 style={styles.errorCode}>{errorCode}</h1>

          {/* Error content */}
          <h2 style={styles.errorTitle}>Oops! Something went wrong</h2>
          <p style={styles.errorMessage}>{message}</p>
          <p style={styles.errorSubtext}>
            Don't worry, our team has been notified and is working on a fix.
          </p>

          {/* Action buttons */}
          <div style={styles.buttonContainer} className="button-container">
            <button
              style={styles.primaryButton}
              onClick={() => window.location.reload()}
              onMouseEnter={(e) => handleButtonHover(e, {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 25px rgba(101, 93, 241, 0.4)'
              })}
              onMouseLeave={(e) => handleButtonLeave(e, {
                transform: 'scale(1)',
                boxShadow: '0 4px 15px rgba(101, 93, 241, 0.3)'
              })}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
              Try Again
            </button>
            
            <button
              style={styles.secondaryButton}
              onClick={() => window.history.back()}
              onMouseEnter={(e) => handleButtonHover(e, {
                background: 'rgba(101, 93, 241, 0.2)',
                borderColor: 'rgba(101, 93, 241, 0.5)',
                transform: 'scale(1.05)'
              })}
              onMouseLeave={(e) => handleButtonLeave(e, {
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(101, 93, 241, 0.3)',
                transform: 'scale(1)'
              })}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              Go Back
            </button>
            
            <button
              style={styles.outlineButton}
              onClick={() => window.location.href = '/'}
              onMouseEnter={(e) => handleButtonHover(e, {
                borderColor: '#8B7CF6',
                color: 'white',
                transform: 'scale(1.05)'
              })}
              onMouseLeave={(e) => handleButtonLeave(e, {
                borderColor: '#655DF1',
                color: '#d1d5db',
                transform: 'scale(1)'
              })}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              Home
            </button>
          </div>

          {/* Decorative dots */}
          <div style={styles.decorativeDots}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  ...styles.dot,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;