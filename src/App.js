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

  // Fokus tillbaka efter AI svar
  useEffect(() => {
    if (!isSending && inputRef.current) {
      inputRef.current.focus();
    }
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

    const userMsg = {
      _id: now,
      text: trimmed,
      role: "user"
    };

    const thinkingId = now + 1;

    const thinkingMsg = {
      _id: thinkingId,
      text: "Ett ögonblick — något gott är på gång!",
      role: "assistant"
    };

    // Viktigt: skicka inte thinking till AI
    const conversation = [...messages, userMsg];

    // Visa direkt i chatten
    setMessages(prev => [...prev, userMsg, thinkingMsg]);
    setInput('');

    const botText = await sendToAI(conversation);

    // Byt ut thinking-raden
    setMessages(prev =>
      prev.map(msg =>
        msg._id === thinkingId
          ? { ...msg, text: botText }
          : msg
      )
    );

    setIsSending(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  // Enter skickar, Shift+Enter = ny rad
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
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
  );
}
