// src/components/ui/card.jsx
import React from 'react';

// Componente Card para envolver conteúdo
const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};

export { Card, CardContent };
