import React from 'react';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  const style = {
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    backgroundColor: isUser ? '#ffffff' : '#d2f4d2',
    padding: '12px 16px',
    borderRadius: '16px',
    margin: '8px 0',
    maxWidth: '70%',
    fontWeight: isUser ? 'bold' : 'normal',
    color: isUser ? '#000000' : '#1b4b1b'
  };

  return (
    <div style={style}>
      {message.text}
    </div>
  );
}
