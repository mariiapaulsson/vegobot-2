import React, { useState } from 'react';
import Chat from './components/Chat';
import './App.css';

export default function App() {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Hej! Skriv din fråga i fältet nedan så hjälper jag dig!",
      role: "bot"
    }
  ]);
  const [input, setInput] = useState('');

  // Skicka hela konversationen till backend
  async function sendToAI(allMessages) {
    try {
      const response = await fetch('https://vegobot-backend.onrender.com/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: allMessages }),
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

    // Skapa nytt användarmeddelande
    const userMsg = {
      _id: Date.now(),
      text: input,
      role: "user"
    };

    // Lägg till i historiken direkt
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');

    // Skicka hela historiken till AI
    const botText = await sendToAI(updatedMessages);

    // Skapa och lägg till botsvar
    const botMsg = {
      _id: Date.now() + 1,
      text: botText,
      role: "bot"
    };

    setMessages((prev) => [...prev, botMsg]);
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
