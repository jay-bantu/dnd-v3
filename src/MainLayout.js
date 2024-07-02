// MainLayout.js
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './DraggableTitle';
import DroppableItem from './DroppableItem';

const MainLayout = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.TITLE, ItemTypes.BODY],
    drop: (item) => addNewItem(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addNewItem = (item) => {
    setDroppedItems((prevItems) => [...prevItems, item]);
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = droppedItems[dragIndex];
    const updatedItems = [...droppedItems];
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setDroppedItems(updatedItems);
  };

  return (
    <div ref={drop} className="main-layout" style={{ backgroundColor: isOver ? 'lightgrey' : 'white' }}>
      {droppedItems.map((item, index) => (
        <DroppableItem key={index} index={index} item={item} moveItem={moveItem} />
      ))}
    </div>
  );
};

export default MainLayout;
