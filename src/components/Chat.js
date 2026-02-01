import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function Chat({ messages = [] }) {

  const chatContainerRef = useRef(null);
  const prevLength = useRef(0);

  useEffect(() => {

    const el = chatContainerRef.current;
    if (!el) return;

    // Kör bara när ett nytt meddelande lagts till
    if (messages.length > prevLength.current) {

      const last = messages[messages.length - 1];

      // Scrolla endast när assistant svarar
      // (då hoppar vi ner när "Ett ögonblick..." visas
      // och igen när riktiga svaret kommer)
      if (last?.role === 'assistant') {
        requestAnimationFrame(() => {
          el.scrollTop = el.scrollHeight;
        });
      }
    }

    prevLength.current = messages.length;

  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      className={`chat-window ${messages.length <= 1 ? 'chat-start' : ''}`}
    >
      {messages.map((msg) => (
        <ChatMessage
          key={msg._id}
          message={msg}
        />
      ))}
    </div>
  );
}
