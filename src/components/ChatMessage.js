import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

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
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontSize: '16px'
  };

  return (
    <div style={style}>
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h2 style={{fontSize: '18px', marginBottom: '6px'}} {...props} />,
          h2: ({node, ...props}) => <h3 style={{fontSize: '16px', marginBottom: '6px'}} {...props} />,
          li: ({node, ...props}) => <li style={{marginBottom: '4px'}} {...props} />,
          p: ({node, ...props}) => <p style={{margin: '6px 0'}} {...props} />,
          a: ({node, ...props}) => <a style={{color: '#90ee90'}} target="_blank" rel="noopener noreferrer" {...props} />,
          strong: ({node, ...props}) => <strong style={{fontWeight: 'bold'}} {...props} />,
        }}
      >
        {message.text}
      </ReactMarkdown>
    </div>
  );
}
