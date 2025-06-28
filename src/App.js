import React, { useState } from 'react';
import Chat from './components/Chat';
import InputBox from './components/InputBox';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: 'Hej! Vad vill du ha hjälp med?' }
  ]);

  const addMessage = (text) => {
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text }]);

    fetch('https://vegobot-backend.onrender.com/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    })
      .then(res => res.json())
      .then(data => {
        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, role: 'bot', text: data.response }
        ]);
      })
      .catch(() => {
        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, role: 'bot', text: 'Serverfel, försök igen.' }
        ]);
      });
  };

  return (
    <div className="app-container">
      <Chat messages={messages} />
      <InputBox onSend={addMessage} />
    </div>
  );
}

export default App;
