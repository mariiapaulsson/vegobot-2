import React from 'react';
import ChatMessage from './ChatMessage';

export default function Chat({ messages }) {
  return (
    <div className="chat-window">
      {messages.map(msg => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}
