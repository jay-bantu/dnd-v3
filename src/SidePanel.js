// SidePanel.js
import React from 'react';
import DraggableTitle from './DraggableTitle';
import DraggableBody from './DraggableBody';

const SidePanel = () => {
  const items = [
    { title: 'Title 1', body: 'Body 1' },
    { title: 'Title 2', body: 'Body 2' },
  ];

  return (
    <div className="side-panel">
      {items.map((item, index) => (
        <div key={index}>
          <DraggableTitle content={item.title} />
          <DraggableBody content={item.body} />
        </div>
      ))}
    </div>
  );
};

export default SidePanel;
