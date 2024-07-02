// DroppableItem.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './DraggableTitle';

const DroppableItem = ({ item, index, moveItem }) => {
  const ref = React.useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: [ItemTypes.TITLE, ItemTypes.BODY],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: item.type,
    item: { type: item.type, content: item.content, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} data-handler-id={handlerId}>
      {item.type === 'title' ? <h3>{item.content}</h3> : <p>{item.content}</p>}
    </div>
  );
};

export default DroppableItem;
