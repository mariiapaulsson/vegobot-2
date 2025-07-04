import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function Chat({ messages = [] }) {
  const bottomRef = useRef(null);
  const isFirstRender = useRef(true);
  const lastMessageCount = useRef(messages.length);

  useEffect(() => {
    if (isFirstRender.current) {
      // Första render – ingen scroll
      isFirstRender.current = false;
      lastMessageCount.current = messages.length;
      return;
    }

    if (messages.length > lastMessageCount.current) {
      // Scrolla bara om vi fått fler meddelanden
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    lastMessageCount.current = messages.length;
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
