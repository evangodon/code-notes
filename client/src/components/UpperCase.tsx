import React from 'react';

const UpperCase: React.FC<{ text: string }> = ({ text }) => {
  if (!text.trim()) {
    return null;
  }
  return <span>{text[0].toUpperCase() + text.slice(1)}</span>;
};

export default UpperCase;
