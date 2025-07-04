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
    padding: '10px 16px',
    borderRadius: '25px',
    margin: '6px 12px',
    maxWidth: '80%',
    fontWeight: isUser ? 'bold' : 'normal',
    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
    lineHeight: '1.4',
    wordWrap: 'break-word',
    fontSize: '15px'
  };

  return (
    <div style={style} className="chat-message">
      <ReactMarkdown className="markdown-content">
        {cleanedText}
      </ReactMarkdown>
    </div>
  );
}
