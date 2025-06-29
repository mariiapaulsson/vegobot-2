import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

const isFirstBotMessage = message.role === 'bot' && message._id === 1;

const style = {
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  backgroundColor: isUser ? '#ffffff' : '#14532d',
  color: isUser ? '#000000' : '#ffffff',
  padding: '8px 24px',      // 👈 mer luft inuti bubblan
  borderRadius: '30px',
  margin: '8px 0',
  maxWidth: '70%',
  fontWeight: isUser ? 'bold' : 'normal',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  lineHeight: '1.4',
  whiteSpace: 'pre-wrap',
};




  return (
    <div style={style}>
      <ReactMarkdown breaks={true}>
        {message.text}
      </ReactMarkdown>
    </div>
  );
}
