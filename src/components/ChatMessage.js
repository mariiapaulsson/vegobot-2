import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  // 👇 Avlägsna överflödiga tomrader
  const cleanedText = message.text
    .split('\n')
    .reduce((acc, line) => {
      if (line.trim() === '' && acc[acc.length - 1] === '') {
        return acc;
      }
      return [...acc, line.trim()];
    }, [])
    .join('\n')
    .trim();

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
    lineHeight: '1.4',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontSize: '16px'
  };

  return (
    <div style={style}>
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h2 style={{fontSize: '18px', margin: '4px 0'}} {...props} />,
          h2: ({node, ...props}) => <h3 style={{fontSize: '16px', margin: '4px 0'}} {...props} />,
          li: ({node, ...props}) => <li style={{margin: '2px 0'}} {...props} />,
          p: ({node, ...props}) => <p style={{margin: '4px 0'}} {...props} />,
          a: ({node, ...props}) => <a style={{color: '#90ee90'}} target="_blank" rel="noopener noreferrer" {...props} />,
          strong: ({node, ...props}) => <strong style={{fontWeight: 'bold'}} {...props} />,
        }}
        breaks={true}
      >
        {cleanedText}
      </ReactMarkdown>
    </div>
  );
}
