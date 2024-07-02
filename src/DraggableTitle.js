// DraggableTitle.js
import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  TITLE: 'title',
  BODY: 'body',
};

const DraggableTitle = ({ content }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TITLE,
    item: { type: 'title', content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <h3>{content}</h3>
    </div>
  );
};

export default DraggableTitle;
export { ItemTypes };

