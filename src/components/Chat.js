import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function Chat({ messages = [] }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <ChatMessage
          key={msg._id}
          text={msg.text}
          role={msg.role}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
