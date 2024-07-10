import React from 'react';

const Card = ({ card }) => (
  <div>
    <h4>{card.title}</h4>
    <p>{card.description}</p>
    <p>Due Date: {new Date(card.dueDate).toLocaleDateString()}</p>
    <p>Attachments: {card.attachments.length}</p>
  </div>
);

export default Card;
