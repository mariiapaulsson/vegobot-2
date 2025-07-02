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
    if (!input.trim()) return;

    const userMsg = {
      _id: Date.now(),
      text: input,
      role: "user"
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');

    const botText = await sendToAI(updatedMessages);
    const botMsg = {
      _id: Date.now() + 1,
      text: botText,
      role: "assistant"
    };

    setMessages(prev => [...prev, botMsg]);
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Skriv din fråga här..."
        />
        <button type="submit">
          Skicka
        </button>
      </form>
    </div>
  );
}
