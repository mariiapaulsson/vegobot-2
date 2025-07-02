import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  // Ta bort flera tomrader i följd
  const cleanedText = (message.text || "")
    .split(/\r?\n/)
    .filter((line, i, arr) => !(line.trim() === '' && arr[i - 1]?.trim() === ''))
    .join('\n');

  const style = {
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    backgroundColor: isUser ? '#ffffff' : '#14532d',
    color: isUser ? '#000000' : '#ffffff',
    padding: '10px 20px',
    borderRadius: '25px',
    margin: '6px 0',
    maxWidth: '80%',
    fontWeight: isUser ? 'bold' : 'normal',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    lineHeight: '1.5',
    wordBreak: 'break-word',
    fontSize: '16px'
  };

  return (
    <div style={style} className="chat-message">
      <ReactMarkdown>
        {cleanedText}
      </ReactMarkdown>
    </div>
  );
}
