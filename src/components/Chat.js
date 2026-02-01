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

      // Scrolla när sista meddelandet är assistant
      // (då scrollar vi när "Ett ögonblick..." dyker upp och när svaret kommer)
      if (last && last.role === 'assistant') {
        requestAnimationFrame(() => {
          el.scrollTop = el.scrollHeight;
        });
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

