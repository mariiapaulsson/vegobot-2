import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  // Ta bort överflödiga tomrader och whitespace
  const cleanedText = message.text
    .split('\n')
    .map(line => line.trim())
    .filter((line, i, arr) => line !== '' || arr[i - 1] !== '')
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
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontSize: '16px'
  };

  // Snygga rubriker utan tomma taggar
  const Heading = ({ level, children }) =>
    children && children.length > 0 ? (
      React.createElement(
        `h${level}`,
        { style: { fontSize: `${20 - level}px`, marginBottom: '6px' } },
        children
      )
    ) : null;

  return (
    <div style={style}>
      <ReactMarkdown
        components={{
          h1: (props) => <Heading level={1} {...props} />,
          h2: (props) => <Heading level={2} {...props} />,
          h3: (props) => <Heading level={3} {...props} />,
          li: ({ node, ...props }) => <li style={{ marginBottom: '4px' }} {...props} />,
          p: ({ node, ...props }) => <p style={{ margin: '6px 0' }} {...props} />,
          a: ({ node, children, ...props }) => {
            const linkText = children && children.length > 0 ? children : props.href;
            return (
              <a
                style={{ color: '#90ee90' }}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {linkText}
              </a>
            );
          },
          strong: ({ node, ...props }) => <strong style={{ fontWeight: 'bold' }} {...props} />,
        }}
        breaks={true}
      >
        {cleanedText}
      </ReactMarkdown>
    </div>
  );
}
