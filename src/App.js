import React, { useState } from 'react';
import Chat from './components/Chat';
import './App.css';

export default function App() {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Hej! Vad vill du ha hjälp med?",
      role: "bot"
    }
  ]);
  const [input, setInput] = useState('');

  // Simulerat API-anrop (byt ut mot din riktiga backend)
  async function sendToAI(userInput) {
    // Byt ut detta mot din fetch till Render om du vill!
    return new Promise((resolve) =>
      setTimeout(() => resolve(`Här är mitt svar på "${userInput}"`), 1000)
    );
  }

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {
      _id: Date.now(),
      text: input,
      role: "user"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Hämta AI-svar
    const botText = await sendToAI(input);
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
