import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';

const List = ({ list, token }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await axios.get(`/api/cards/${list._id}`, { headers: { Authorization: `Bearer ${token}` } });
      setCards(response.data);
    };
    fetchCards();
  }, [list._id, token]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedCards = Array.from(cards);
    const [movedCard] = updatedCards.splice(result.source.index, 1);
    updatedCards.splice(result.destination.index, 0, movedCard);

    setCards(updatedCards);
  };

  return (
    <div>
      <h3>{list.title}</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={list._id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {cards.map((card, index) => (
                <Draggable key={card._id} draggableId={card._id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Card card={card} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default List;
