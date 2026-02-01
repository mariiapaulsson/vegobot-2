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

  // Fokus tillbaka i rutan efter svar
  const inputRef = useRef(null);

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

    // User message
    const userMsg = {
      _id: now,
      text: trimmed,
      role: "user"
    };

    // Thinking message (visas direkt)
    const thinkingId = now + 1;
    const thinkingMsg = {
      _id: thinkingId,
      text: "Ett ögonblick — något gott är på gång!",
      role: "assistant"
    };

    // Viktigt: skicka INTE thinking till AI
    const conversation = [...messages, userMsg];

    // Visa direkt i chatten
    setMessages(prev => [...prev, userMsg,]()

