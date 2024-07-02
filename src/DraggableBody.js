// DraggableBody.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './DraggableTitle';

const DraggableBody = ({ content }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BODY,
    item: { type: 'body', content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <p>{content}</p>
    </div>
  );
};

export default DraggableBody;
