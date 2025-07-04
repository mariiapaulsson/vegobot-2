import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function Chat({ messages = [] }) {
  const chatContainerRef = useRef(null);
  const prevLength = useRef(0);

  useEffect(() => {
    if (!chatContainerRef.current) return;

    // Scrolla bara om AI har svarat
    if (messages.length > prevLength.current) {
      const last = messages[messages.length - 1];
      if (last && last.role === 'assistant') {
        // Snabb men diskret, ingen browser-scroll
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }
    prevLength.current = messages.length;
  }, [messages]);

  return (
    <div className="chat-window" ref={chatContainerRef}>
      {messages.map((msg) => (
        <ChatMessage key={msg._id} message={msg} />
      ))}
    </div>
  );
}
