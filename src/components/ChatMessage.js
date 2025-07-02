import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function ChatMessage({ text, role }) {
  const isUser = role === 'user';

  const style = {
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    backgroundColor: isUser ? '#ffffff' : '#14532d',
    color: isUser ? '#000000' : '#ffffff',
    padding: '12px 20px',
    borderRadius: '30px',
    margin: '8px 12px',
    maxWidth: '70%',
    fontWeight: isUser ? 'bold' : 'normal',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    lineHeight: '1.4',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  };

  return (
    <div style={style} className="chat-message markdown-content">
      <ReactMarkdown
        children={text}
        components={{
          p: ({ children }) => <p style={{ margin: '4px 0' }}>{children}</p>,
          li: ({ children }) => <li style={{ margin: '2px 0' }}>{children}</li>,
          h1: ({ children }) => <h3 style={{ margin: '4px 0', fontSize: '1.1em' }}>{children}</h3>,
          h2: ({ children }) => <h4 style={{ margin: '4px 0', fontSize: '1.05em' }}>{children}</h4>,
          h3: ({ children }) => <h5 style={{ margin: '4px 0', fontSize: '1em' }}>{children}</h5>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: isUser ? '#197d4f' : '#a1e5c0',
                textDecoration: 'underline',
              }}
            >
              {children}
            </a>
          ),
        }}
      />
    </div>
  );
}
