import React from 'react';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  const style = {
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    backgroundColor: isUser ? '#ffffff' : '#14532d', // Mörkgrön för AI
    color: isUser ? '#000000' : '#ffffff', // Vit text för AI
    padding: '12px 16px',
    borderRadius: '16px',
    margin: '8px 0',
    maxWidth: '70%',
    fontWeight: isUser ? 'bold' : 'normal',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    lineHeight: '1.4',
  };

  return (
    <div style={style}>
      {message.text}
    </div>
  );
}
