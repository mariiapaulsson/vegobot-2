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

async function sendToAI(userInput) {
  try {
    const response = await fetch('https://vegobot-backend.onrender.com/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput }),
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
