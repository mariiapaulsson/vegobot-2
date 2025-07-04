import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function Chat({ messages = [] }) {
  const bottomRef = useRef(null);
  const prevLength = useRef(0);

  useEffect(() => {
    // Scrolla enbart när AI har svarat
    if (messages.length > prevLength.current) {
      const last = messages[messages.length - 1];
      if (last && last.role === 'assistant') {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
      }
    }
    prevLength.current = messages.length;
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <ChatMessage key={msg._id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
