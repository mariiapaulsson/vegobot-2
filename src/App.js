import React, { useState } from 'react';
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
  const [isSending, setIsSending] = useState(false); // stoppar dubbelskick

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
    if (!input.trim() || isSending) return;

    setIsSending(true);

    // User message
    const userMsg = {
      _id: Date.now(),
      text: input,
      role: "user"
    };

    // Thinking message
    const thinkingId = Date.now() + 1;
    const thinkingMsg = {
      _id: thinkingId,
      text: "Ett ögonblick — något gott är på gång!",
      role: "assistant"
    };

    // Viktigt: thinking ska INTE skickas till AI
    const conversation = [...messages, userMsg];

    // Visa direkt i chatten
    setMessages(prev => [...prev, userMsg, thinkingMsg]);
    setInput('');

    // Hämta AI-svar
    const botText = await sendToAI(conversation);

    // Ersätt thinking-raden med riktiga svaret
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

  return (
    <div className="app-container">
      <Chat messages={messages} />

      <form onSubmit={handleSubmit} className="input-box">
        <input
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Skriv din fråga här..."
        />

        <button type="submit" disabled={isSending}>
          {isSending ? "Tillagar..." : "Skicka"}
        </button>
      </form>
    </div>
  );
}
