import React from 'react';

function SOSButton() {
  const handleClick = () => {
    // alert('🚨 SOS Alert Sent!');
    
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding : '1em',
    
  };

  const buttonStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle at top left, #ff4e4e, #cc0000)',
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    border: '10px solid #d0d0d0',
    boxShadow: `
      0 18px 30px rgba(0, 0, 0, 0.3),
      inset 0 4px 10px rgba(255, 255, 255, 0.3),
      inset 0 -4px 10px rgba(0, 0, 0, 0.3)
    `,
    cursor: 'pointer',
    transition: 'transform 0.1s ease',
  };

  const handleMouseDown = (e) => {
    e.currentTarget.style.transform = 'scale(0.95)';
    e.currentTarget.style.boxShadow = `
      0 4px 10px rgba(0, 0, 0, 0.4),
      inset 0 2px 5px rgba(255, 255, 255, 0.2),
      inset 0 -2px 5px rgba(0, 0, 0, 0.4)
    `;
  };

  const handleMouseUp = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = buttonStyle.boxShadow;
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        SOS
      </button>
    </div>
  );
}

export default SOSButton;
