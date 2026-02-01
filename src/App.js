import React, { useEffect, useRef, useState } from 'react';
import Chat from './components/Chat';
import './App.css';

export default function App() {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Hej! Skriv din fråga i fältet nedan så hjälper jag dig!",
      role: "assistant"
    }
  ]);

  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!isSending && inputRef.current) inputRef.current.focus();
  }, [isSending]);

  async function sendToAI(conversation) {
    try {
      const response = await fetch('https://vegobot-backend.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation })
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Fel vid AI-anrop:', error);
      return 'Vego-bot slumrade till, försök igen';
    }
  }

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setIsSending(true);

    const now = Date.now();

    const userMsg = { _id: now, text: trimmed, role: "user" };

    const thinkingId = now + 1;
    const thinkingMsg = {
      _id: thinkingId,
      text: "Ett ögonblick — något gott är på gång!",
      role: "assistant"
    };

    const conversation = [...messages, userMsg];

    setMessages(prev => [...prev, userMsg, thinkingMsg]);
    setInput('');

    const botText = await sendToAI(conversation);

    setMessages(prev =>
      prev.map(m => (m._id === thinkingId ? { ...m, text: botText } : m))
    );

    setIsSending(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isStart = messages.length <= 1;

  return (
    <div className="app-container">
      <div className={`chat-card ${isStart ? 'chat-start' : ''}`}>
        <Chat messages={messages} />

        <form onSubmit={handleSubmit} className="input-box">
          <textarea
            ref={inputRef}
            rows={1}
            inputMode="text"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Skriv din fråga här..."
          />

          <button type="submit" disabled={isSending}>
            {isSending ? "Tillagar..." : "Skicka"}
          </button>
        </form>
      </div>
    </div>
  );
}
